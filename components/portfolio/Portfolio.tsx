'use client'

import { useRef, useState } from 'react'

import { ResumePreview } from '@/components/resume/ResumePreview'

import { CodeFileViewer } from './CodeFileViewer'
import EditorTabs from './EditorTabs'
import { Explorer } from './Explorer'
import { MobileExplorer } from './MobileExplorer'
import { defaultTabs, fileContents, sectionFiles } from './editor-data'
import { AboutSection } from './sections/AboutSection'
import { ContactSection } from './sections/ContactSection'
import { ExperienceSection } from './sections/ExperienceSection'
import { HomeSection } from './sections/HomeSection'
import { ProjectsSection } from './sections/ProjectsSection'
import type { EditorFile, Section } from './types'
import { usePortfolioAnimations } from './usePortfolioAnimations'

export default function Portfolio() {
  const root = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)

  const [activeFile, setActiveFile] =
    useState<EditorFile>('Home.tsx')

  const [openTabs, setOpenTabs] =
    useState<EditorFile[]>(defaultTabs)

  const [mobileNav, setMobileNav] = useState(false)

  usePortfolioAnimations(root, orbitRef)

  const openFile = (file: EditorFile) => {
    setActiveFile(file)

    setOpenTabs((current) =>
      current.includes(file)
        ? current
        : [...current, file]
    )

    setMobileNav(false)
  }

  const navigate = (section: Section) => {
    openFile(sectionFiles[section])

    requestAnimationFrame(() => {
      document
        .getElementById(section)
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
    })
  }

  const activateTab = (file: EditorFile) => {
    const sectionByFile: Partial<
      Record<EditorFile, Section>
    > = {
      'Home.tsx': 'home',
      'About.md': 'about',
      'projects.json': 'projects',
      'experience.json': 'experience',
      'contact.ts': 'contact',
    }

    const section = sectionByFile[file]

    if (section) {
      navigate(section)
      return
    }

    openFile(file)
  }

  const codeContent =
    activeFile !== 'Resume.pdf'
      ? fileContents[activeFile]
      : undefined

  return (
    <div
      ref={root}
      className="min-h-screen bg-editor font-mono text-sm text-zinc-300"
    >
      <EditorTabs
        activeFile={activeFile}
        openTabs={openTabs}
        onActivate={activateTab}
        onOpenMobile={() => setMobileNav(true)}
      />

      <Explorer
        activeFile={activeFile}
        onNavigate={navigate}
        onOpenFile={openFile}
      />

      <MobileExplorer
        open={mobileNav}
        onClose={() => setMobileNav(false)}
        onNavigate={navigate}
      />

      <main className="pt-11 lg:pl-[260px]">
        {activeFile === 'Resume.pdf' ? (
          <ResumePreview />
        ) : codeContent !== undefined ? (
          <CodeFileViewer
            fileName={activeFile}
            content={codeContent}
          />
        ) : (
          <>
            <HomeSection orbitRef={orbitRef} />
            <AboutSection />
            <ProjectsSection />
            <ExperienceSection />
            <ContactSection />
          </>
        )}
      </main>
    </div>
  )
}