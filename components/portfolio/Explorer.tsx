import {
  ChevronDown,
  ChevronRight,
  ContactRound,
  FileCode2,
  FileJson2,
  FileText,
  Folder,
  FolderOpen,
  Github,
  Search,
  Settings,
} from 'lucide-react'

import type { EditorFile, Section } from './types'

type Props = {
  activeFile: EditorFile
  onNavigate: (section: Section) => void
  onOpenFile: (file: EditorFile) => void
}

export function Explorer({
  activeFile,
  onNavigate,
  onOpenFile,
}: Props) {
  return (
    <aside
      data-animate="chrome"
      className="fixed bottom-0 left-0 top-11 hidden w-[260px] border-r border-border bg-sidebar lg:flex"
    >
      <div className="flex w-12 flex-col items-center border-r border-border py-4 text-zinc-500">
        <FileCode2 className="mb-6 text-zinc-200" />
        <Search className="mb-6" />
        <Github className="mb-6" />

        <div className="mt-auto">
          <Settings />
        </div>
      </div>

      <div className="flex-1 py-3">
        <p className="px-5 pb-3 text-[11px] uppercase tracking-widest text-zinc-500">
          Explorer
        </p>

        <div className="px-2">
          <div className="mb-2 flex items-center gap-1 px-2 font-semibold text-zinc-300">
            <ChevronDown size={14} />
            KHURSHED.DEV
          </div>

          <TreeItem label="data" icon={<FolderOpen size={15} />}>
            <TreeButton
              label="experience.json"
              active={activeFile === 'experience.json'}
              onClick={() => onNavigate('experience')}
              icon={
                <FileJson2
                  size={14}
                  className="text-yellow-300"
                />
              }
            />

            <TreeButton
              label="projects.json"
              active={activeFile === 'projects.json'}
              onClick={() => onNavigate('projects')}
              icon={
                <FileJson2
                  size={14}
                  className="text-yellow-300"
                />
              }
            />
          </TreeItem>

          <TreeItem label="public" icon={<Folder size={15} />}>
            <TreeButton
              label="Resume.pdf"
              active={activeFile === 'Resume.pdf'}
              onClick={() => onNavigate('about')}
              icon={<FileText size={14} />}
            />
          </TreeItem>

          <TreeItem label="src" icon={<FolderOpen size={15} />}>
            <TreeItem
              label="components"
              icon={<FolderOpen size={15} />}
              inset
            >
              <TreeButton
                label="Home.tsx"
                active={activeFile === 'Home.tsx'}
                onClick={() => onNavigate('home')}
                icon={
                  <FileCode2
                    size={14}
                    className="text-sky-400"
                  />
                }
              />
            </TreeItem>

            <TreeItem
              label="pages"
              icon={<FolderOpen size={15} />}
              inset
            >
              <TreeButton
                label="About.md"
                active={activeFile === 'About.md'}
                onClick={() => onNavigate('about')}
                icon={
                  <FileText
                    size={14}
                    className="text-purple"
                  />
                }
              />
            </TreeItem>
          </TreeItem>

          <TreeItem
            label="connect"
            icon={
              <FolderOpen
                size={15}
                className="text-sky-400"
              />
            }
          >
           <TreeButton
            label="contact.ts"
            active={activeFile === 'contact.ts'}
            onClick={() => onOpenFile('contact.ts')}
            icon={<FileCode2 size={14} className="text-sky-400" />}
          />
          </TreeItem>

          <TreeButton
            label="package.json"
            active={activeFile === 'package.json'}
            onClick={() => onOpenFile('package.json')}
            icon={
              <FileJson2
                size={14}
                className="text-yellow-300"
              />
            }
          />

          <TreeButton
            label=".gitignore"
            active={activeFile === '.gitignore'}
            onClick={() => onOpenFile('.gitignore')}
            icon={
              <FileText
                size={14}
                className="text-zinc-400"
              />
            }
          />

          <TreeButton
            label=".env.local"
            active={activeFile === '.env.local'}
            onClick={() => onOpenFile('.env.local')}
            icon={
              <Settings
                size={14}
                className="text-yellow-500"
              />
            }
          />
        </div>
      </div>
    </aside>
  )
}

function TreeItem({
  label,
  icon,
  children,
  inset = false,
}: {
  label: string
  icon: React.ReactNode
  children: React.ReactNode
  inset?: boolean
}) {
  return (
    <div className={inset ? 'pl-4' : ''}>
      <div className="flex items-center gap-1 px-2 py-1 text-zinc-400">
        <ChevronDown size={13} />
        {icon}
        <span>{label}</span>
      </div>

      <div className="pl-4">{children}</div>
    </div>
  )
}

function TreeButton({
  label,
  icon,
  onClick,
  active = false,
}: {
  label: string
  icon: React.ReactNode
  onClick: () => void
  active?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2 px-3 py-1.5 text-left ${
        active
          ? 'bg-[#37373d] text-zinc-100'
          : 'text-zinc-400 hover:bg-[#2a2d2e]'
      }`}
    >
      <ChevronRight
        size={12}
        className="opacity-0"
      />

      {icon}

      <span>{label}</span>
    </button>
  )
}