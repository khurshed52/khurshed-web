"use client";

import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const INITIAL_MESSAGE: ChatMessage = {
  id: "welcome-message",
  role: "assistant",
  content:
    "Hello 👋\n\nI'm trained only on Khurshed's portfolio and resume.\n\nI can help you understand his experience, projects, and compare his skills to your job.",
};

export default function AIRecruiterChat() {
  const router = useRouter();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      window.setTimeout(() => {
        textareaRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  function createMessage(
    role: ChatMessage["role"],
    content: string,
  ): ChatMessage {
    return {
      id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      role,
      content,
    };
  }

  async function sendQuestion(message: string) {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    const userMessage = createMessage("user", trimmedMessage);

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
    ]);

    setQuestion("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai-recruiter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedMessage,
        }),
      });

      const data: {
        answer?: string;
        error?: string;
      } = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "The AI recruiter could not answer right now.",
        );
      }

      const assistantMessage = createMessage(
        "assistant",
        data.answer || "I could not generate a response.",
      );

      setMessages((currentMessages) => [
        ...currentMessages,
        assistantMessage,
      ]);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage("assistant", errorMessage),
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await sendQuestion(question);
  }

  function handleTextareaKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendQuestion(question);
    }
  }

  function handleReactExperience() {
    void sendQuestion(
      "Tell me about Khurshed's React, Next.js, and frontend architecture experience.",
    );
  }

  function handleMatchMyJob() {
    setIsOpen(false);
    router.push("/job-match");
  }

  function handleResetChat() {
    setMessages([INITIAL_MESSAGE]);
    setQuestion("");
  }

  return (
    <>
    <div className="ai-recruiter-widget"> 
      {!isOpen && (
       <button
  type="button"
  onClick={() => setIsOpen(true)}
  aria-label="Open AI Recruiter"
  className="
    group fixed bottom-6 right-6 z-[9999]
    flex items-center gap-3
    rounded-full border border-cyan-400/30
    bg-neutral-950/95 px-4 py-3
    text-white shadow-[0_12px_45px_rgba(0,0,0,0.55)]
    backdrop-blur-xl
    transition-all duration-300
    hover:-translate-y-1
    hover:border-cyan-400/60
    hover:shadow-[0_15px_50px_rgba(14,165,233,0.25)]
    focus:outline-none focus:ring-2 focus:ring-cyan-400/60
  "
>
  <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-xl shadow-lg">
    🤖

    <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
      <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-neutral-950 bg-emerald-400" />
    </span>
  </span>

  <span className="hidden text-left sm:block">
    <span className="block text-sm font-semibold leading-tight">
      Ask AI Recruiter
    </span>

    <span className="mt-0.5 block text-xs text-neutral-400">
      Explore Khurshed&apos;s experience
    </span>
  </span>

  <span className="hidden text-neutral-500 transition-transform duration-300 group-hover:translate-x-1 sm:block">
    →
  </span>
</button>
      )}

      {isOpen && (
        <section
          aria-label="AI Recruiter chat"
          className="fixed bottom-3 right-3 z-[100] flex h-[min(700px,calc(100dvh-24px))] w-[420px] max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d0d] shadow-[0_24px_80px_rgba(0,0,0,0.65)]"
        >
          <header className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#111111] px-5 py-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-xl">
                🤖
              </div>

              <div className="min-w-0">
                <p className="truncate text-base font-semibold text-white">
                  AI Recruiter
                </p>

                <p className="truncate text-xs text-zinc-400">
                  Powered by Khurshed&apos;s portfolio
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                aria-label="Reset conversation"
                className="rounded-lg px-3 py-2 text-xs text-zinc-400 transition hover:bg-white/5 hover:text-white"
              >
                Reset
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close AI Recruiter"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-zinc-400 transition hover:bg-white/5 hover:text-white"
              >
                ×
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-4 py-5">
            <div className="space-y-4">
              {messages.map((message) => {
                const isUser = message.role === "user";

                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={[
                        "max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6",
                        isUser
                          ? "rounded-br-md bg-cyan-600 text-white"
                          : "rounded-bl-md border border-white/5 bg-zinc-800 text-zinc-100",
                      ].join(" ")}
                    >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                    </ReactMarkdown>
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-white/5 bg-zinc-800 px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && (
              <div className="mt-6">
                <div className="mb-4 border-t border-white/10" />

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleMatchMyJob}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm text-zinc-200 transition hover:border-cyan-500/40 hover:bg-white/[0.07] hover:text-white"
                  >
                    Match my job
                  </button>

                  <button
                    type="button"
                    onClick={handleReactExperience}
                    disabled={isLoading}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm text-zinc-200 transition hover:border-cyan-500/40 hover:bg-white/[0.07] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    React experience
                  </button>

                  <a
                    href="/Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm text-zinc-200 transition hover:border-cyan-500/40 hover:bg-white/[0.07] hover:text-white"
                  >
                    Download resume
                  </a>
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="shrink-0 border-t border-white/10 bg-[#111111] p-3"
          >
            <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-[#18181b] p-2 transition focus-within:border-cyan-500/50">
              <textarea
                ref={textareaRef}
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                onKeyDown={handleTextareaKeyDown}
                rows={1}
                placeholder="Type your question..."
                disabled={isLoading}
                aria-label="Ask the AI recruiter a question"
                className="max-h-32 min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm leading-5 text-white outline-none placeholder:text-zinc-500 disabled:cursor-not-allowed"
              />

              <button
                type="submit"
                disabled={!question.trim() || isLoading}
                aria-label="Send question"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ↑
              </button>
            </div>

            <p className="mt-2 px-2 text-center text-[11px] text-zinc-600">
              Press Enter to send · Shift + Enter for a new line
            </p>
          </form>
        </section>
      )}
      </div>
    </>
  );
}