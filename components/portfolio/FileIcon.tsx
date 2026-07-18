import {
  ContactRound,
  FileCode2,
  FileJson2,
  FileText,
  Settings,
} from 'lucide-react'

import type { EditorFile } from './types'

type FileIconProps = {
  file: EditorFile
}

export default function FileIcon({ file }: FileIconProps) {
  if (file === 'contact.ts') {
    return <FileCode2 size={14} className="text-sky-400" />
    } 

  if (file.endsWith('.tsx')) {
    return <FileCode2 size={14} className="text-sky-400" />
  }

  if (file.endsWith('.json')) {
    return <FileJson2 size={14} className="text-yellow-300" />
  }

  if (file.endsWith('.md')) {
    return <FileText size={14} className="text-purple" />
  }

  if (file.endsWith('.pdf')) {
    return <FileText size={14} className="text-zinc-300" />
  }

  if (file.includes('env')) {
    return <Settings size={14} className="text-yellow-500" />
  }

  return <FileText size={14} className="text-zinc-400" />
}