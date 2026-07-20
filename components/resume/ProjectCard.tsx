import {
  ExternalLink,
  Github,
  Globe2,
} from 'lucide-react'

import type { ResumeProject } from '@/data/resume-data'

function ProjectCard({
  project,
  index,
}: {
  project: ResumeProject
  index: number
}) {
  const hasLinks = Boolean(
    project.visitLink || project.githubLink
  )

  return (
    <article className="resume-project-card">
      <header className="resume-project-card-header">
        <div className="resume-project-identity">
          <span className="resume-project-number">
            {String(index + 1).padStart(2, '0')}
          </span>

          <div className="resume-project-heading">
            <h2>{project.name}</h2>
            <p>{project.role}</p>
          </div>
        </div>

        {hasLinks && (
          <nav
            className="resume-project-links"
            aria-label={`${project.name} links`}
          >
            {project.visitLink && (
              <a
                href={project.visitLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe2 aria-hidden="true" />
                <span>Visit Link</span>
                <ExternalLink
                  className="resume-project-external-icon"
                  aria-hidden="true"
                />
              </a>
            )}

            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github aria-hidden="true" />
                <span>GitHub</span>
              </a>
            )}
          </nav>
        )}
      </header>

      <section className="resume-project-section">
        <h3 className="resume-project-section-title">
          Responsibilities
        </h3>

        <ul className="resume-project-responsibility-list">
          {project.responsibilities.map(
            (responsibility) => (
              <li key={responsibility}>
                {responsibility}
              </li>
            ),
          )}
        </ul>
      </section>

      <section className="resume-project-section resume-project-stack-section">
        <h3 className="resume-project-section-title">
          Tech Stack
        </h3>

        <div className="resume-project-stack">
          {project.software.map((technology) => (
            <span key={technology}>
              {technology}
            </span>
          ))}
        </div>
      </section>
    </article>
  )
}

export default ProjectCard