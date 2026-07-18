'use client'

import { Menu } from 'lucide-react'
import FileIcon from './FileIcon'
import type { EditorFile } from './types'

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
    <div className="fixed inset-x-0 top-0 z-50 flex h-11 items-center border-b border-border bg-[#181818]">
      <button
        type="button"
        onClick={onOpenMobile}
        className="flex h-full w-11 shrink-0 items-center justify-center border-r border-border text-zinc-400 lg:hidden"
        aria-label="Open navigation"
      >
        <Menu size={19} />
      </button>

      <div className="hidden h-full w-11 shrink-0 border-r border-border lg:block" />

      <div className="flex h-full min-w-0 flex-1 items-center overflow-x-auto">
        {openTabs.map((file) => {
          const isActive = activeFile === file
          const isResume = file === 'Resume.pdf'

          return (
            <button
              key={file}
              type="button"
              onClick={() => onActivate(file)}
              className={`relative flex h-full shrink-0 items-center gap-2 border-r border-border px-4 text-xs transition-all duration-200 ${
                isResume
                  ? isActive
                    ? 'border-t-2 border-t-sky-400 bg-sky-500/10 text-sky-200 shadow-[inset_0_-2px_0_rgba(56,189,248,0.9)]'
                    : 'border-t-2 border-t-transparent bg-sky-500/[0.04] text-sky-300 hover:bg-sky-500/10 hover:text-sky-100'
                  : isActive
                    ? 'border-t-2 border-t-accent bg-editor text-zinc-100'
                    : 'border-t-2 border-t-transparent text-zinc-500 hover:bg-[#202020] hover:text-zinc-300'
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
      </div>
    </div>
  )
}