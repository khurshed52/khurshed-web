'use client'

import { Code2, Menu } from 'lucide-react'
import FileIcon from './FileIcon'
import type { EditorFile } from './types'
import ThemeToggle from '../theme/ThemeToggle'

type EditorTabsProps = {
  activeFile: EditorFile
  openTabs: EditorFile[]
  onActivate: (file: EditorFile) => void
  onOpenMobile: () => void
}

export default function EditorTabs({
  activeFile,
  openTabs,
  onActivate,
  onOpenMobile,
}: EditorTabsProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-11 items-center border-b border-border bg-panel-strong/95 shadow-[0_1px_10px_rgba(15,23,42,0.06)] backdrop-blur-xl">
      <button
        type="button"
        onClick={onOpenMobile}
        className="flex h-full w-11 shrink-0 items-center justify-center border-r border-border text-zinc-400 transition hover:bg-panel hover:text-zinc-100 lg:hidden"
        aria-label="Open navigation"
      >
        <Menu size={19} />
      </button>

      <div className="hidden h-full w-[260px] shrink-0 items-center gap-2.5 border-r border-border px-4 lg:flex">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/10 text-accent">
          <Code2 size={16} strokeWidth={2.25} />
        </span>

        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
          Khurshed.dev
        </span>
      </div>

      <nav
        className="flex h-full min-w-0 flex-1 items-center gap-1 overflow-x-auto px-2"
        aria-label="Open files"
      >
        {openTabs.map((file) => {
          const isActive = activeFile === file
          const isResume = file === 'Resume.pdf'

          return (
            <button
              key={file}
              type="button"
              onClick={() => onActivate(file)}
              className={`relative flex h-8 shrink-0 items-center gap-2 rounded-md border px-3 text-xs transition-all duration-200 ${
                isResume
                  ? isActive
                    ? 'border-sky-400/35 bg-sky-500/10 text-sky-500 shadow-sm'
                    : 'border-transparent text-sky-500/80 hover:border-sky-400/20 hover:bg-sky-500/[0.07] hover:text-sky-500'
                  : isActive
                    ? 'border-accent/25 bg-accent/10 text-zinc-100 shadow-sm'
                    : 'border-transparent text-zinc-500 hover:border-border hover:bg-panel hover:text-zinc-300'
              }`}
            >
              <FileIcon file={file} />

              {isResume && (
                <span
                  className="h-2 w-2 animate-pulse rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.9)]"
                  aria-hidden="true"
                />
              )}

              <span className={isResume ? 'font-semibold' : undefined}>
                {file}
              </span>
            </button>
          )
        })}
      </nav>

      <div className="flex h-full shrink-0 items-center border-l border-border px-2">
        <ThemeToggle />
      </div>
    </header>
  )
}
