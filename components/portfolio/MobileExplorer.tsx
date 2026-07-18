import { X } from 'lucide-react'
import type { Section } from './types'

type Props = {
  open: boolean
  onClose: () => void
  onNavigate: (section: Section) => void
}

export function MobileExplorer({ open, onClose, onNavigate }: Props) {
  if (!open) return null

  const items: Section[] = ['home', 'about', 'projects', 'experience', 'contact']

  return (
    <div className="fixed inset-0 z-[60] bg-black/70 lg:hidden" onClick={onClose}>
      <div className="h-full w-72 border-r border-border bg-sidebar p-5" onClick={(event) => event.stopPropagation()}>
        <div className="mb-8 flex items-center justify-between">
          <span className="uppercase tracking-widest">Explorer</span>
          <button onClick={onClose}><X /></button>
        </div>
        {items.map((item) => (
          <button key={item} onClick={() => onNavigate(item)} className="block w-full border-b border-border py-3 text-left capitalize text-zinc-300">
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}
