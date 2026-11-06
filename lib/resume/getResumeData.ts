import {
  resumeData,
  type ResumeData,
  type ResumeExperience,
  type ResumeProject,
  type ResumeSkillGroup,
} from '@/data/resume-data'
import {
  resumeTargets,
  type ResumeTarget,
} from '@/data/resume-targets'

export type ResolvedResumeData = Omit<
  ResumeData,
  'profile' | 'summary' | 'skillGroups' | 'experience' | 'projects'
> & {
  profile: Omit<ResumeData['profile'], 'role'> & {
    role: string
  }
  summary: string
  skillGroups: readonly ResumeSkillGroup[]
  experience: readonly ResumeExperience[]
  projects: readonly ResumeProject[]
}

export function getResumeData(
  target: ResumeTarget = 'default',
): ResolvedResumeData {
  if (target === 'default') {
    return resumeData
  }

  if (target === 'angular-frontend') {
    const config = resumeTargets[target]
    const groupsByTitle = new Map(
      resumeData.skillGroups.map((group) => [group.title, group]),
    )

    const skillGroups = config.skillGroupOrder.map((title) => {
      const group = groupsByTitle.get(title)

      if (!group) {
        throw new Error(`Unknown resume skill group: ${title}`)
      }

      const replacement =
        config.skillReplacements[
          title as keyof typeof config.skillReplacements
        ]

      return {
        title: group.title,
        skills: replacement ? [...replacement] : [...group.skills],
      }
    })

    const experience = resumeData.experience.map((item) => {
      const override =
        config.experienceOverrides[
          item.company as keyof typeof config.experienceOverrides
        ]

      if (!override) return item

      return {
        ...item,
        role: override.role,
        achievements: item.achievements.map(
          (achievement, index) =>
            override.achievementReplacements[
              index as keyof typeof override.achievementReplacements
            ] ?? achievement,
        ),
        highlights: [...item.highlights, ...override.highlights],
      }
    })

    const projectsByName = new Map(
      resumeData.projects.map((project) => [project.name, project]),
    )

    const projects = config.projectOrder.map((name) => {
      const project = projectsByName.get(name)

      if (!project) {
        throw new Error(`Unknown resume project: ${name}`)
      }

      const override =
        config.projectOverrides[
          name as keyof typeof config.projectOverrides
        ]

      return override
        ? {
            ...project,
            ...override,
            software: [...override.software],
            responsibilities: [...override.responsibilities],
          }
        : project
    })

    return {
      ...resumeData,
      profile: {
        ...resumeData.profile,
        role: config.role,
      },
      summary: config.summary,
      skillGroups,
      experience,
      projects,
    }
  }

  const config = resumeTargets[target]
  const groupsByTitle = new Map(
    resumeData.skillGroups.map((group) => [group.title, group]),
  )

  const skillGroups = config.skillGroupOrder.map((title) => {
    const group = groupsByTitle.get(title)

    if (!group) {
      throw new Error(`Unknown resume skill group: ${title}`)
    }

    const additions =
      config.skillAdditions[
        title as keyof typeof config.skillAdditions
      ] ?? []

    return {
      title: group.title,
      skills: [...group.skills, ...additions],
    }
  })

  const experience = resumeData.experience.map((item) => {
    const override =
      config.experienceOverrides[
        item.company as keyof typeof config.experienceOverrides
      ]

    if (!override) return item

    const achievements = item.achievements.map(
      (achievement, index) =>
        override.achievementReplacements[
          index as keyof typeof override.achievementReplacements
        ] ?? achievement,
    )

    return {
      ...item,
      role: override.role,
      achievements,
      highlights: [...item.highlights, ...override.highlights],
    }
  })

  return {
    ...resumeData,
    profile: {
      ...resumeData.profile,
      role: config.role,
    },
    summary: config.summary,
    skillGroups,
    experience,
  }
}
