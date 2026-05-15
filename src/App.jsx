import { HashRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import ScrollToTop from './components/ScrollToTop'

const Landing = lazy(() => import('./pages/Landing'))
const Content = lazy(() => import('./pages/Content'))
const Questions = lazy(() => import('./pages/Questions'))

function Loading() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--ink-muted)',
      fontFamily: 'var(--font-body)',
    }}>
      Loading...
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/content" element={<Content />} />
          <Route path="/questions" element={<Questions />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}
