'use client'

import {
  Download,
  ExternalLink,
  FileText,
} from 'lucide-react'

export default function ResumeViewer() {
  const resumePath = '/Resume.pdf'

  return (
    <section className="flex h-[calc(100vh-2.75rem)] flex-col bg-editor">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-[#1b1b1b] px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800/80 text-zinc-200">
            <FileText size={17} />
          </div>

          <div>
            <p className="text-sm font-medium text-zinc-100">
              Resume Preview
            </p>

            <p className="text-[11px] text-zinc-500">
              Khurshed Khan · Dynamically generated PDF
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`${resumePath}?download=1`}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-110"
          >
            <Download size={15} />
            Save Resume
          </a>

          <a
            href={resumePath}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-200 transition hover:-translate-y-0.5 hover:border-accent hover:text-white"
          >
            <ExternalLink size={15} />
            View Fullscreen
          </a>
        </div>
      </div>

      <iframe
        src={resumePath}
        title="Khurshed Khan Resume"
        className="min-h-0 flex-1 w-full border-0 bg-zinc-900"
      />
    </section>
  )
}