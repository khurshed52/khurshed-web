import type { ReactNode } from 'react'
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

import type { ResolvedResumeData } from '@/lib/resume/getResumeData'
import ProjectCard from './ProjectCard'

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

function ResumeHeader({
  profile,
}: {
  profile: ResolvedResumeData['profile']
}) {

  return (
    <header className="resume-header">
      <div className="resume-header-panel">
        <h1>{profile.name}</h1>
        <p className="resume-role">{profile.role}</p>

        <div className="resume-contact-row">
          <span className="resume-contact-item">
            <MapPin size={12} />
            <span>{profile.location}</span>
            {/* <span className="resume-relocation">
              {profile.relocation}
            </span>  */}
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

function SkillsTable({
  skillGroups,
  softSkills,
}: {
  skillGroups: ResolvedResumeData['skillGroups']
  softSkills: ResolvedResumeData['softSkills']
}) {
  const rows = [
    ...skillGroups,
    {
      title: 'Soft Skills',
      skills: softSkills,
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

function EmploymentHistory({
  experience,
}: {
  experience: ResolvedResumeData['experience']
}) {
  const renderHighlightedText = (
    text: string,
    highlights: string[]
  ) => {
    const matchingHighlights = highlights
      .filter((highlight) => text.includes(highlight))
      .sort((a, b) => text.indexOf(a) - text.indexOf(b))

    if (matchingHighlights.length === 0) return text

    const nodes: ReactNode[] = []
    let cursor = 0

    matchingHighlights.forEach((highlight) => {
      const start = text.indexOf(highlight, cursor)

      if (start === -1) return
      if (start > cursor) nodes.push(text.slice(cursor, start))

      nodes.push(
        <span
          className="resume-experience-emphasis"
          key={`${highlight}-${start}`}
        >
          {highlight}
        </span>
      )
      cursor = start + highlight.length
    })

    if (cursor < text.length) nodes.push(text.slice(cursor))

    return nodes
  }

  return (
    <div className="resume-experience-list">
      {experience.map((experience) => (
        <article
          key={`${experience.company}-${experience.period}`}
          className="resume-experience"
        >
          <span className="resume-timeline-dot" aria-hidden="true" />

          <div className="resume-experience-body">
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
                  {renderHighlightedText(
                    achievement,
                    experience.highlights
                  )}
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
          </div>
        </article>
      ))}
    </div>
  )
}

function ResumeFooterDetails({
  education,
  languages,
  nationality,
}: {
  education: ResolvedResumeData['education']
  languages: ResolvedResumeData['languages']
  nationality: ResolvedResumeData['nationality']
}) {
  return (
    <footer className="resume-first-footer">
      <section className="resume-education-panel">
        <span className="resume-footer-icon">
          <GraduationCap size={16} />
        </span>

        <div>
          <h2>Education</h2>
          {education.map((item) => (
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
          <p>{languages.join(', ')}</p>
        </div>

        <div>
          <Globe2 size={15} />
          <h3>Nationality</h3>
          <p>{nationality}</p>
        </div>
      </div>
    </footer>
  )
}

function FirstPage({ data }: { data: ResolvedResumeData }) {
  return (
    <section className="resume-page resume-page-one">
      <ResumeHeader profile={data.profile} />

      <main className="resume-first-page-content">
        <section className="resume-first-section resume-summary-section">
          <FirstPageSectionTitle icon={<UserRound size={16} />}>
            Professional Summary
          </FirstPageSectionTitle>

          <p className="resume-summary">
            {data.summary}
          </p>
        </section>

        <section className="resume-first-section resume-skills-section">
          <FirstPageSectionTitle icon={<Settings size={16} />}>
            Technical Skills
          </FirstPageSectionTitle>

          <SkillsTable
            skillGroups={data.skillGroups}
            softSkills={data.softSkills}
          />
        </section>

        <section className="resume-first-section resume-employment-section">
          <FirstPageSectionTitle icon={<BriefcaseBusiness size={16} />}>
            Professional Experience
          </FirstPageSectionTitle>

          <EmploymentHistory experience={data.experience} />
        </section>

        <ResumeFooterDetails
          education={data.education}
          languages={data.languages}
          nationality={data.nationality}
        />
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

function SecondPage({ data }: { data: ResolvedResumeData }) {
  return (
    <section className="resume-page resume-page-two">
      <header className="resume-project-page-header">
        <div>
          <h1>Project Summary</h1>
        </div>
      </header>

      <div className="resume-project-card-list">
        {data.projects.map((project, index) => (
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

export function ResumeDocument({
  data,
}: {
  data: ResolvedResumeData
}) {
  return (
    <div
      className="resume-document"
      data-resume-ready="true"
    >
      <FirstPage data={data} />
      <SecondPage data={data} />
    </div>
  )
}
