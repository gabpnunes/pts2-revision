import { lazy, Suspense, useState, useEffect } from 'react'
import SidebarNav from '../components/SidebarNav'
import TopicSection from '../components/TopicSection'
import { topics } from '../data/topics'

const topicComponents = {
  'joint-discrete': lazy(() => import('../content/Topic1JointDiscrete')),
  'joint-continuous': lazy(() => import('../content/Topic2JointContinuous')),
  'expected-values': lazy(() => import('../content/Topic3ExpectedValues')),
  'independence': lazy(() => import('../content/Topic4Independence')),
  'conditional': lazy(() => import('../content/Topic5Conditional')),
  'mgf-bivariate': lazy(() => import('../content/Topic6MGFBivariate')),
  'transformations': lazy(() => import('../content/Topic7Transformations')),
  'sampling-distributions': lazy(() => import('../content/Topic8SamplingDistributions')),
  'estimation': lazy(() => import('../content/Topic9Estimation')),
  'hypothesis-fundamentals': lazy(() => import('../content/Topic10HypothesisFundamentals')),
  'single-population': lazy(() => import('../content/Topic11SinglePopulation')),
  'two-populations': lazy(() => import('../content/Topic12TwoPopulations')),
}

function TopicFallback() {
  return <div style={{ padding: '24px 0', color: 'var(--ink-faint)' }}>Loading topic...</div>
}

function PlaceholderTopic({ title }) {
  return (
    <p style={{ color: 'var(--ink-faint)', fontStyle: 'italic', padding: '12px 0' }}>
      {title} — content coming in a future session.
    </p>
  )
}

export default function Content() {
  const [activeId, setActiveId] = useState(topics[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace('topic-', '')
            setActiveId(id)
            break
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px' }
    )

    const sections = document.querySelectorAll('.topic')
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="sg-root">
      <SidebarNav activeId={activeId} />
      <main className="sg-main">
        {topics.map((topic) => {
          const Component = topicComponents[topic.id]
          return (
            <TopicSection key={topic.id} topic={topic}>
              {Component ? (
                <Suspense fallback={<TopicFallback />}>
                  <Component />
                </Suspense>
              ) : (
                <PlaceholderTopic title={topic.title} />
              )}
            </TopicSection>
          )
        })}
      </main>
    </div>
  )
}
