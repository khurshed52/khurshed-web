import CinematicPortfolio from '@/components/storyboard/CinematicPortfolio'

export default function Page() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Khurshed Khan',
    url: 'https://www.khurshedkhan.dev/',
    jobTitle: 'Senior Frontend and Full-Stack Developer',
    address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
    sameAs: ['https://www.linkedin.com/in/khurshedkhandev', 'https://github.com/khurshed52/'],
    knowsAbout: ['React.js', 'Next.js', 'Angular', 'TypeScript', 'Node.js', 'FinTech', 'WebSockets', 'Accessible web applications'],
  }
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Khurshed Khan Portfolio',
    url: 'https://www.khurshedkhan.dev/',
    author: { '@type': 'Person', name: 'Khurshed Khan' },
  }
  const profilePage = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: 'https://www.khurshedkhan.dev/',
    name: 'Khurshed Khan — Senior Frontend and Full-Stack Developer',
    mainEntity: { '@type': 'Person', name: 'Khurshed Khan' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([person, website, profilePage]).replace(/</g, '\\u003c') }} />
      <CinematicPortfolio />
    </>
  )
}
