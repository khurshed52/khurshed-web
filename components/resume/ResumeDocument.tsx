import type { CSSProperties, ReactNode } from 'react'
import {
  Globe2,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'

import { resumeData } from '@/data/resume-data'
import ProjectCard from './ProjectCard'

type Project = (typeof resumeData.projects)[number]

function SectionTitle({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="resume-section-title">
      <h2>{children}</h2>
      <span aria-hidden="true" />
    </div>
  )
}

function ResumeHeader() {
  const { profile } = resumeData

  return (
    <header className="resume-header">
      <div className="resume-photo-wrapper">
        <img
          src={profile.photo}
          alt={profile.name}
          className="resume-photo"
        />
      </div>

      <div className="resume-header-panel">
        <h1>{profile.name}</h1>
        <p className="resume-role">{profile.role}</p>

        <div className="resume-location">
          <MapPin size={12} />
          <span>{profile.location}</span>
        </div>

        <div className="resume-contact-row">
          <a href={`tel:${profile.phone}`}>
            <Phone size={11} />
            <span>{profile.phone}</span>
          </a>

          <a href={`mailto:${profile.email}`}>
            <Mail size={11} />
            <span>{profile.email}</span>
          </a>

          <a
            href={profile.website.url}
            target="_blank"
            rel="noreferrer"
          >
            <Globe2 size={11} />
            <span>{profile.website.label}</span>
          </a>

          <a
            href={profile.linkedin.url}
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size={11} />
            <span>{profile.linkedin.label}</span>
          </a>
        </div>
      </div>
    </header>
  )
}

function SidebarDivider() {
  return <div className="resume-sidebar-divider" />
}

function ResumeSidebar() {
  return (
    <aside className="resume-sidebar">
      <section>
        <h2 className="resume-sidebar-heading">
          Technical Skills
        </h2>

        <div className="resume-skill-groups">
          {resumeData.skillGroups.map((group) => (
            <article
              key={group.title}
              className="resume-skill-group"
            >
              <h3>{group.title}</h3>
              <p>{group.skills.join(', ')}</p>
              <SidebarDivider />
            </article>
          ))}
        </div>
      </section>

      <section className="resume-sidebar-block">
        <h3>Soft Skills</h3>
        <p>{resumeData.softSkills.join(', ')}</p>
        <SidebarDivider />
      </section>

      <section className="resume-sidebar-block">
        <h3>Languages</h3>
        <p>{resumeData.languages.join(', ')}</p>
        <SidebarDivider />
      </section>

      <section className="resume-sidebar-block">
        <h3>Nationality</h3>
        <p>{resumeData.nationality}</p>
        <SidebarDivider />
      </section>

      <section className="resume-sidebar-block">
        <h3>Education</h3>

        {resumeData.education.map((item) => (
          <article
            key={`${item.degree}-${item.period}`}
            className="resume-education"
          >
            <p>
              {item.degree}, {item.institution},{' '}
              {item.location}
            </p>

            <span>{item.period}</span>
          </article>
        ))}
      </section>
    </aside>
  )
}

function EmploymentHistory() {
  return (
    <div className="resume-experience-list">
      {resumeData.experience.map((experience) => (
        <article
          key={`${experience.company}-${experience.period}`}
          className="resume-experience"
        >
          <h3>
            {experience.role}, {experience.company},{' '}
            {experience.location}
          </h3>

          <p className="resume-period">
            {experience.period}
          </p>

          <ul>
            {experience.achievements.map((achievement) => (
              <li key={achievement}>
                {achievement}
              </li>
            ))}
          </ul>

          {experience.keyAchievements.length > 0 && (
            <div className="resume-key-achievements">
              <h4>Key Achievements:</h4>

              <ul>
                {experience.keyAchievements.map(
                  (achievement) => (
                    <li key={achievement}>
                      {achievement}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </article>
      ))}
    </div>
  )
}

function FirstPage() {
  return (
    <section className="resume-page resume-page-one">
      <ResumeHeader />

      <div className="resume-first-page-grid">
        <ResumeSidebar />

        <main className="resume-main">
          <section className="resume-content-section">
            <SectionTitle>
              Professional Summary
            </SectionTitle>

            <p className="resume-summary">
              {resumeData.summary}
            </p>
          </section>

          <section className="resume-content-section">
            <SectionTitle>
              Employment History
            </SectionTitle>

            <EmploymentHistory />
          </section>
        </main>
      </div>
    </section>
  )
}

function ProjectMeta({
  label,
  value,
}: {
  label: string
  value: ReactNode
}) {
  return (
    <div className="resume-project-meta">
      <span>{label}</span>
      <strong>:</strong>
      <p>{value}</p>
    </div>
  )
}

function SecondPage() {
  return (
    <section className="resume-page resume-page-two">
      <header className="resume-project-page-header">
        <div>
          <h1>Project Summary</h1>
        </div>
      </header>

      <div className="resume-project-card-list">
        {resumeData.projects.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}

export function ResumeDocument() {
  return (
    <div
      className="resume-document"
      data-resume-ready="true"
    >
      <FirstPage />
      <SecondPage />
    </div>
  )
}