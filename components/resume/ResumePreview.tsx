'use client'

import { useState } from 'react'
import {
  Download,
  ExternalLink,
  FileText,
  Loader2,
} from 'lucide-react'

export function ResumePreview() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <section className="flex h-full min-h-[720px] flex-col bg-[#1e1e1e]">
      <header className="flex min-h-[74px] items-center justify-between border-b border-white/10 px-7">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
            <FileText
              className="text-zinc-300"
              size={21}
            />
          </div>

          <div>
            <h1 className="text-base font-semibold tracking-wide text-zinc-100">
              Resume Preview
            </h1>

            <p className="mt-1 text-xs text-zinc-500">
              Khurshed Khan · Dynamically generated PDF
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/Resume.pdf?download=1"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#0e8fdb] px-5 text-sm font-medium text-white transition hover:bg-[#159ce8]"
          >
            <Download size={16} />
            Save Resume
          </a>

          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/15 bg-white/[0.02] px-5 text-sm font-medium text-zinc-200 transition hover:bg-white/[0.06]"
          >
            <ExternalLink size={16} />
            View Fullscreen
          </a>
        </div>
      </header>

      <div className="relative min-h-0 flex-1 overflow-hidden bg-[#2b2b2b]">
        {isLoading && (
          <div className="absolute inset-0 z-20 flex min-h-[720px] items-center justify-center bg-[#1e1e1e]">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                <FileText
                  size={27}
                  className="text-zinc-300"
                />

                <Loader2
                  size={72}
                  className="absolute animate-spin text-[#0e8fdb]"
                  strokeWidth={1.5}
                />
              </div>

              <h2 className="text-lg font-semibold text-zinc-100">
                Generating Resume PDF
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">
                Preparing the latest version of your resume.
                This may take a few seconds.
              </p>

              <div className="mt-6 h-1 w-64 overflow-hidden rounded-full bg-white/10">
                <div className="resume-loading-progress h-full w-1/3 rounded-full bg-[#0e8fdb]" />
              </div>
            </div>
          </div>
        )}

        {hasError && !isLoading && (
          <div className="absolute inset-0 z-20 flex min-h-[720px] items-center justify-center bg-[#1e1e1e]">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-zinc-100">
                Unable to load resume
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                The PDF could not be generated. Please try again.
              </p>

              <button
                type="button"
                onClick={() => {
                  setHasError(false)
                  setIsLoading(true)

                  const iframe =
                    document.querySelector<HTMLIFrameElement>(
                      '[data-resume-iframe]'
                    )

                  if (iframe) {
                    iframe.src = `/Resume.pdf?t=${Date.now()}`
                  }
                }}
                className="mt-5 rounded-lg bg-[#0e8fdb] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#159ce8]"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        <iframe
          data-resume-iframe
          src="/Resume.pdf"
          title="Khurshed Khan Resume"
          className="h-full min-h-[720px] w-full border-0"
          onLoad={() => {
            setIsLoading(false)
            setHasError(false)
          }}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
        />
      </div>

      <style jsx>{`
        .resume-loading-progress {
          animation: resume-loading 1.3s ease-in-out infinite;
        }

        @keyframes resume-loading {
          0% {
            transform: translateX(-110%);
          }

          50% {
            transform: translateX(110%);
          }

          100% {
            transform: translateX(310%);
          }
        }
      `}</style>
    </section>
  )
}