export const jobMatchResponseSchema = {
  type: 'object',
  properties: {
    score: {
      type: 'integer',
      description:
        'A conservative compatibility score from 0 to 100 based only on evidence in the candidate data.',
      minimum: 0,
      maximum: 100,
    },

    verdict: {
      type: 'string',
      enum: [
        'Excellent Match',
        'Strong Match',
        'Moderate Match',
        'Low Match',
      ],
    },

    summary: {
      type: 'string',
      description:
        'A concise two or three sentence explanation of the match.',
    },

    matchedSkills: {
      type: 'array',
      description:
        'Requirements from the job description that are supported by the candidate data.',
      items: {
        type: 'object',
        properties: {
          skill: {
            type: 'string',
          },
          evidence: {
            type: 'string',
            description:
              'Brief evidence from the resume, project or experience data.',
          },
        },
        required: ['skill', 'evidence'],
      },
    },

    missingSkills: {
      type: 'array',
      description:
        'Important job requirements that are not explicitly supported by the candidate data.',
      items: {
        type: 'string',
      },
    },

    strengths: {
      type: 'array',
      description:
        'The candidate qualities that are most relevant to this role.',
      items: {
        type: 'string',
      },
    },

    recommendations: {
      type: 'array',
      description:
        'Honest recommendations for positioning the candidate for this role.',
      items: {
        type: 'string',
      },
    },

    disclaimer: {
      type: 'string',
      description:
        'A short statement explaining that this is an AI-assisted comparison and not a hiring decision.',
    },
  },

  required: [
    'score',
    'verdict',
    'summary',
    'matchedSkills',
    'missingSkills',
    'strengths',
    'recommendations',
    'disclaimer',
  ],
} as const