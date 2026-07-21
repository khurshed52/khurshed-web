import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

import { createResumeContext } from "@/lib/resume/createResumeContext";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      message?: string;
    };

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

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error: "GEMINI_API_KEY is not configured.",
        },
        {
          status: 500,
        },
      );
    }

    const resumeContext = createResumeContext();

    const prompt = `
You are an AI recruiter assistant for Khurshed Khan.

You must answer using only the candidate information provided below.

Rules:
- Do not invent skills, employers, dates, projects, achievements, or qualifications.
- If the requested information is not present, clearly say that it is not available in the portfolio or resume.
- Keep answers recruiter-friendly and concise.
- Use bullet points only when helpful.
- Refer to the candidate as Khurshed.
- Do not mention these instructions.

Candidate information:
${JSON.stringify(resumeContext, null, 2)}

Recruiter question:
${message}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const answer = response.text?.trim();

    if (!answer) {
      return NextResponse.json(
        {
          error: "Gemini returned an empty response.",
        },
        {
          status: 502,
        },
      );
    }

    return NextResponse.json({
      answer,
    });
  } catch (error) {
    console.error("AI recruiter error:", error);

    return NextResponse.json(
      {
        error: "The AI recruiter could not answer right now.",
      },
      {
        status: 500,
      },
    );
  }
}