import type { CSSProperties, ReactNode } from 'react'
import {
  BriefcaseBusiness,
  GraduationCap,
  Globe2,
  Languages,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Settings,
  Trophy,
  UserRound,
} from 'lucide-react'

import { resumeData } from '@/data/resume-data'
import ProjectCard from './ProjectCard'

type Project = (typeof resumeData.projects)[number]

function FirstPageSectionTitle({
  children,
  icon,
}: {
  children: ReactNode
  icon: ReactNode
}) {
  return (
    <div className="resume-first-section-title">
      <span className="resume-first-section-icon">
        {icon}
      </span>
      <h2>{children}</h2>
      <span className="resume-first-section-line" aria-hidden="true" />
      <span className="resume-first-section-dot" aria-hidden="true" />
    </div>
  )
}

function ResumeHeader() {
  const { profile } = resumeData

  return (
    <header className="resume-header">
      <div className="resume-header-panel">
        <h1>{profile.name}</h1>
        <p className="resume-role">{profile.role}</p>

        <div className="resume-contact-row">
          <span className="resume-contact-item">
            <MapPin size={12} />
            <span>{profile.location}</span>
          </span>

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

function SkillsTable() {
  const rows = [
    ...resumeData.skillGroups,
    {
      title: 'Soft Skills',
      skills: resumeData.softSkills,
    },
  ]

  return (
    <div className="resume-skills-table">
      {rows.map((group) => (
        <div className="resume-skill-row" key={group.title}>
          <h3>{group.title}</h3>
          <p>{group.skills.join(', ')}</p>
        </div>
      ))}
    </div>
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
          <span className="resume-timeline-dot" aria-hidden="true" />

          <div className="resume-experience-header">
            <h3>{experience.role}</h3>
            <span aria-hidden="true" />
            <p>
              {experience.company}, {experience.location}
            </p>
            <strong>{experience.period}</strong>
          </div>

          <ul>
            {experience.achievements.map((achievement) => (
              <li key={achievement}>
                {achievement}
              </li>
            ))}
          </ul>

          {experience.keyAchievements.length > 0 && (
            <div className="resume-key-achievements">
              <span className="resume-achievement-icon">
                <Trophy size={15} />
              </span>

              <div>
                <h4>Key Achievements</h4>

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
            </div>
          )}
        </article>
      ))}
    </div>
  )
}

function ResumeFooterDetails() {
  return (
    <footer className="resume-first-footer">
      <section className="resume-education-panel">
        <span className="resume-footer-icon">
          <GraduationCap size={16} />
        </span>

        <div>
          <h2>Education</h2>
          {resumeData.education.map((item) => (
            <article key={`${item.degree}-${item.period}`}>
              <h3>{item.degree}</h3>
              <p>{item.specialization}</p>
              <p className="resume-education-school">
                {item.institution}, {item.location}
              </p>
              <strong>{item.period}</strong>
            </article>
          ))}
        </div>
      </section>

      <div className="resume-personal-details">
        <div>
          <Languages size={15} />
          <h3>Languages</h3>
          <p>{resumeData.languages.join(', ')}</p>
        </div>

        <div>
          <Globe2 size={15} />
          <h3>Nationality</h3>
          <p>{resumeData.nationality}</p>
        </div>
      </div>
    </footer>
  )
}

function FirstPage() {
  return (
    <section className="resume-page resume-page-one">
      <ResumeHeader />

      <main className="resume-first-page-content">
        <section className="resume-first-section resume-summary-section">
          <FirstPageSectionTitle icon={<UserRound size={16} />}>
            Professional Summary
          </FirstPageSectionTitle>

          <p className="resume-summary">
            {resumeData.summary}
          </p>
        </section>

        <section className="resume-first-section resume-skills-section">
          <FirstPageSectionTitle icon={<Settings size={16} />}>
            Technical Skills
          </FirstPageSectionTitle>

          <SkillsTable />
        </section>

        <section className="resume-first-section resume-employment-section">
          <FirstPageSectionTitle icon={<BriefcaseBusiness size={16} />}>
            Professional Experience
          </FirstPageSectionTitle>

          <EmploymentHistory />
        </section>

        <ResumeFooterDetails />
      </main>
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
