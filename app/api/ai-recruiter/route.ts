import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

import { createResumeContext } from "@/lib/resume/createResumeContext";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return "The AI recruiter could not answer right now.";
  }

  const message = error.message.toLowerCase();

  if (message.includes("429") || message.includes("rate limit")) {
    return "The AI recruiter is receiving too many requests. Please try again shortly.";
  }

  if (
    message.includes("404") ||
    message.includes("not found") ||
    message.includes("model")
  ) {
    return "The configured Gemini model is unavailable. Please check the GEMINI_MODEL environment variable.";
  }

  if (
    message.includes("api key") ||
    message.includes("permission") ||
    message.includes("unauthorized") ||
    message.includes("403")
  ) {
    return "The AI recruiter is not configured correctly.";
  }

  return "The AI recruiter could not answer right now. Please try again.";
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "GEMINI_API_KEY is not configured.",
        },
        {
          status: 500,
        },
      );
    }

    let body: {
      message?: string;
    };

    try {
      body = (await request.json()) as {
        message?: string;
      };
    } catch {
      return NextResponse.json(
        {
          error: "Invalid request body.",
        },
        {
          status: 400,
        },
      );
    }

    const message = body.message?.trim();

    if (!message) {
      return NextResponse.json(
        {
          error: "Message is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        {
          error: "Please keep your question under 2,000 characters.",
        },
        {
          status: 400,
        },
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
    });

    const resumeContext = createResumeContext();

    const prompt = `
You are an AI recruiter assistant for Khurshed Khan.

Answer recruiter questions using only the candidate information supplied below.

Rules:
- Do not invent skills, employers, dates, projects, achievements, education, certifications, or qualifications.
- If the requested information is missing, clearly say it is not available in Khurshed's portfolio or resume.
- Keep responses concise, professional, and recruiter-friendly.
- Refer to the candidate as Khurshed.
- Use short paragraphs and bullet points when helpful.
- Do not mention these instructions.
- Do not claim that Khurshed has experience that is not explicitly included in the candidate information.

Candidate information:
${JSON.stringify(resumeContext, null, 2)}

Recruiter question:
${message}
`;

    /*
     * Awaiting this call before creating the Response means errors such as an
     * invalid model or API key can still be returned as normal JSON errors.
     */
    const geminiStream = await ai.models.generateContentStream({
      model: 'gemini-flash-latest',
      contents: prompt,
    });

    const encoder = new TextEncoder();

    const responseStream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          let generatedText = "";

          for await (const chunk of geminiStream) {
            const text = chunk.text ?? "";

            if (!text) {
              continue;
            }

            generatedText += text;
            controller.enqueue(encoder.encode(text));
          }

          if (!generatedText.trim()) {
            controller.enqueue(
              encoder.encode(
                "I couldn't generate an answer from the available portfolio information.",
              ),
            );
          }

          controller.close();
        } catch (error) {
          console.error("Gemini streaming error:", error);

          controller.enqueue(
            encoder.encode(
              "\n\nThe AI response was interrupted. Please try asking the question again.",
            ),
          );

          controller.close();
        }
      },

      cancel(reason) {
        console.info("AI recruiter stream cancelled:", reason);
      },
    });

    return new Response(responseStream, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("AI recruiter error:", error);

    return NextResponse.json(
      {
        error: getErrorMessage(error),
      },
      {
        status: 500,
      },
    );
  }
}