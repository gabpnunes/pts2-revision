import { useRef, useLayoutEffect, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import katex from 'katex'

function M({ t, d }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    if (ref.current) {
      try { katex.render(t, ref.current, { throwOnError: false, displayMode: !!d }) }
      catch { ref.current.textContent = t }
    }
  }, [t, d])
  return d ? <div ref={ref} className="m-block" /> : <span ref={ref} className="m-inline" />
}

function Prediction({ likelihood }) {
  const labels = { high: 'HIGH LIKELIHOOD', medium: 'MEDIUM-HIGH' }
  const colors = { high: '#ff4d4d', medium: '#ff8c42' }
  return (
    <span className="rb-priority" style={{ '--pri-color': colors[likelihood] || '#ff8c42' }}>
      <span className="rb-priority-label">🔮 {labels[likelihood] || likelihood}</span>
    </span>
  )
}

function Priority({ level }) {
  const labels = { 5: 'EVERY EXAM', 4: 'MOST EXAMS', 3: 'FREQUENT', 2: 'OCCASIONAL', 1: 'RARE' }
  const colors = { 5: '#ff4d4d', 4: '#ff8c42', 3: '#ffd166', 2: '#8B92FF', 1: '#666' }
  return (
    <span className="rb-priority" style={{ '--pri-color': colors[level] }}>
      <span className="rb-priority-dots">
        {[1,2,3,4,5].map(i => <span key={i} className={`rb-dot ${i <= level ? 'rb-dot-filled' : ''}`} />)}
      </span>
      <span className="rb-priority-label">{labels[level]}</span>
      <span className="rb-priority-count">{level}/5 exams</span>
    </span>
  )
}

function Step({ n, children }) {
  return (
    <div className="rb-step">
      <div className="rb-step-num">{n}</div>
      <div className="rb-step-content">{children}</div>
    </div>
  )
}

function useChecked() {
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem('rb-checked') || '{}') } catch { return {} }
  })
  const toggle = (id) => setChecked(prev => {
    const next = { ...prev, [id]: !prev[id] }
    localStorage.setItem('rb-checked', JSON.stringify(next))
    return next
  })
  return [checked, toggle]
}

const CheckedCtx = { current: { checked: {}, toggle: () => {} } }

function Recipe({ id, title, priority, points, children }) {
  const { checked, toggle } = CheckedCtx.current
  const done = !!checked[id]
  return (
    <div className={`rb-recipe ${done ? 'rb-recipe-done' : ''}`} id={id}>
      <div className="rb-recipe-head">
        <button className={`rb-check ${done ? 'rb-check-on' : ''}`} onClick={() => toggle(id)} aria-label={done ? 'Mark incomplete' : 'Mark complete'}>
          {done ? '✓' : ''}
        </button>
        <h3 className="rb-recipe-title">{title}</h3>
        <div className="rb-recipe-meta">
          <Priority level={priority} />
          {points && <span className="rb-points">{points}</span>}
        </div>
      </div>
      <div className="rb-recipe-body">{children}</div>
    </div>
  )
}

function Diagram({ children, label }) {
  return (
    <div className="rb-diagram">
      {label && <div className="rb-diagram-label">{label}</div>}
      <pre className="rb-diagram-content">{children}</pre>
    </div>
  )
}

function Warning({ children }) {
  return <div className="rb-warning">{children}</div>
}

function Tip({ children }) {
  return <div className="rb-tip">{children}</div>
}

/* ── Desmos Graph ── */
let desmosLoad = null
function loadDesmos() {
  if (window.Desmos) return Promise.resolve()
  if (desmosLoad) return desmosLoad
  desmosLoad = new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = 'https://www.desmos.com/api/v1.11/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6'
    s.onload = resolve
    s.onerror = reject
    document.head.appendChild(s)
  })
  return desmosLoad
}

function DesmosGraph({ expressions, bounds, height = 220, label }) {
  const containerRef = useRef(null)
  const calcRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { rootMargin: '400px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    if (!visible || !containerRef.current) return
    let cancelled = false
    loadDesmos().then(() => {
      if (cancelled || !containerRef.current || calcRef.current) return
      const calc = window.Desmos.GraphingCalculator(containerRef.current, {
        expressions: false, settingsMenu: false, zoomButtons: false,
        expressionsTopbar: false, lockViewport: true, border: false,
        keypad: false, invertedColors: true,
      })
      if (bounds) calc.setMathBounds(bounds)
      expressions.forEach((expr, i) => calc.setExpression({ id: `e${i}`, ...expr }))
      calcRef.current = calc
    }).catch(() => { if (!cancelled) setFailed(true) })
    return () => { cancelled = true; calcRef.current?.destroy(); calcRef.current = null }
  }, [visible])
  return (
    <div className="rb-desmos">
      {label && <div className="rb-desmos-label">{label}</div>}
      <div ref={containerRef} style={{ width: '100%', height, borderRadius: 8, overflow: 'hidden', background: '#0a0a1a' }}>
        {!visible && !failed && <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: 12 }}>Graph</div>}
        {failed && <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: 12 }}>Could not load Desmos</div>}
      </div>
    </div>
  )
}

/* ── Worked Example ── */
function WorkedExample({ exam, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`rb-worked ${open ? 'rb-worked-open' : ''}`}>
      <button className="rb-worked-toggle" onClick={() => setOpen(!open)}>
        <span className="rb-worked-badge">{exam}</span>
        <span className="rb-worked-title">Hardest Worked Example</span>
        <span className="rb-worked-chevron">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="rb-worked-body">{children}</div>}
    </div>
  )
}

const recipes = [
  { id: 'joint-pdf', title: 'Joint PDF & Normalization Constant' },
  { id: 'marginal-pdf', title: 'Marginal PDF' },
  { id: 'cond-dist', title: 'Conditional Distribution & E[Y|X]' },
  { id: 'independence', title: 'Independence Check' },
  { id: 'cov-corr', title: 'Covariance & Correlation' },
  { id: 'discrete-joint', title: 'Discrete Joint Distribution Table' },
  { id: 'probs-from-table', title: 'Probabilities from Joint Tables' },
  { id: 'linear-combo', title: 'Mean & Variance of Linear Combinations' },
  { id: 'mgf-method', title: 'MGF Method (Distribution of Sums)' },
  { id: 'cdf-method', title: 'CDF / Transformation Method' },
  { id: 'jacobian', title: 'Jacobian Transformation Method' },
  { id: 'draw-support', title: 'Drawing Support Regions' },
  { id: 'order-stats', title: 'Order Statistics (Min & Max)' },
  { id: 'bvn', title: 'Bivariate Normal Distribution' },
  { id: 'build-stats', title: 'Building Test Statistics from Z_i' },
  { id: 'iterated-exp', title: 'Iterated Expectation & Law of Total Variance' },
  { id: 'ci-mean', title: 'Confidence Interval for Mean' },
  { id: 'ci-proportion', title: 'CI for Proportion' },
  { id: 'ci-variance', title: 'CI for Variance / Variance Ratio' },
  { id: 'ci-diff-means', title: 'CI for Difference in Means' },
  { id: 'sample-size', title: 'Minimum Sample Size' },
  { id: 'z-test', title: 'z-Test for Mean (σ known)' },
  { id: 't-test', title: 't-Test for Mean (σ unknown)' },
  { id: 'chi-sq-var', title: 'χ²-Test for Variance' },
  { id: 'prop-test', title: 'Proportion Test' },
  { id: 'two-sample', title: 'Two-Sample Tests for Means' },
  { id: 'f-test', title: 'F-Test (Equal Variances)' },
  { id: 'power', title: 'Power & Type II Error' },
  { id: 'p-value', title: 'p-Value Method' },
  { id: 'type-i', title: 'Type I Error Computation' },
  { id: 'pred-general-order', title: '🔮 General & Joint Order Statistics' },
  { id: 'pred-pooled-t-delta', title: '🔮 Pooled t-Test with Δ₀ ≠ 0' },
  { id: 'pred-exact-binomial', title: '🔮 Exact Binomial Test' },
  { id: 'pred-welch', title: '🔮 Welch CI (Unequal Variances)' },
  { id: 'pred-two-prop-equal', title: '🔮 Two-Proportion Test (Δ₀ = 0)' },
  { id: 'pred-cov-matrix', title: '🔮 Covariance Matrix & Multivariate Normal' },
  { id: 'pred-joint-mgf', title: '🔮 Joint MGF & Finding Moments' },
  { id: 'pred-multinomial', title: '🔮 Multinomial Distribution' },
  { id: 'pred-mv-hyper', title: '🔮 Multivariate Hypergeometric' },
  { id: 'pred-convolution', title: '🔮 Convolution Formula' },
  { id: 'pred-unbiased', title: '🔮 Unbiased Estimators & E[S²]=σ²' },
]

const sectionGroups = [
  { label: 'Part A · Joint Distributions', ids: ['joint-pdf', 'marginal-pdf', 'cond-dist', 'independence', 'cov-corr', 'discrete-joint', 'probs-from-table', 'linear-combo'] },
  { label: 'Part B · Transformations', ids: ['mgf-method', 'cdf-method', 'jacobian', 'draw-support', 'order-stats', 'bvn', 'build-stats', 'iterated-exp'] },
  { label: 'Part C · Confidence Intervals', ids: ['ci-mean', 'ci-proportion', 'ci-variance', 'ci-diff-means', 'sample-size'] },
  { label: 'Part D · Hypothesis Testing', ids: ['z-test', 't-test', 'chi-sq-var', 'prop-test', 'two-sample', 'f-test', 'power', 'p-value', 'type-i'] },
  { label: '🔮 Predictions', ids: ['pred-general-order', 'pred-pooled-t-delta', 'pred-exact-binomial', 'pred-welch', 'pred-two-prop-equal', 'pred-cov-matrix', 'pred-joint-mgf', 'pred-multinomial', 'pred-mv-hyper', 'pred-convolution', 'pred-unbiased'] },
]

export default function RecipeBook() {
  const [activeId, setActiveId] = useState(recipes[0].id)
  const [checked, toggle] = useChecked()
  CheckedCtx.current = { checked, toggle }
  const doneCount = recipes.filter(r => checked[r.id]).length

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { for (const e of entries) { if (e.isIntersecting) setActiveId(e.target.id) } },
      { rootMargin: '-20% 0px -60% 0px' }
    )
    recipes.forEach(r => { const el = document.getElementById(r.id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div className="rb-root">
      <nav className="rb-sidebar">
        <Link to="/" className="rb-back">{'←'} Home</Link>
        <div className="rb-progress">
          <div className="rb-progress-bar"><div className="rb-progress-fill" style={{ width: `${(doneCount / recipes.length) * 100}%` }} /></div>
          <span className="rb-progress-label">{doneCount}/{recipes.length} done</span>
        </div>
        <div className="rb-toc">
          {sectionGroups.map(g => (
            <div key={g.label} className="rb-toc-group">
              <div className="rb-toc-group-label">{g.label}</div>
              {g.ids.map(id => {
                const r = recipes.find(x => x.id === id)
                return r ? <button key={id} className={`rb-toc-item ${activeId === id ? 'active' : ''} ${checked[id] ? 'rb-toc-done' : ''}`} onClick={() => scrollTo(id)}>{checked[id] && <span className="rb-toc-check">{'✓'}</span>}{r.title}</button> : null
              })}
            </div>
          ))}
        </div>
      </nav>

      <main className="rb-main">
        <header className="rb-header">
          <h1 className="rb-title">Recipe <em>Book</em></h1>
          <p className="rb-subtitle">Step-by-step recipes for every exam question type, verified against all 5 past exams and 4 tutorial sets. Each worked example shows the <strong>exact exam question</strong> (verbatim) with the hardest instance.</p>
          <div className="rb-legend">
            <span className="rb-legend-item"><span className="rb-legend-dot" style={{background:'#ff4d4d'}} /> 5/5 Every exam</span>
            <span className="rb-legend-item"><span className="rb-legend-dot" style={{background:'#ff8c42'}} /> 4/5 Most exams</span>
            <span className="rb-legend-item"><span className="rb-legend-dot" style={{background:'#ffd166'}} /> 3/5 Frequent</span>
            <span className="rb-legend-item"><span className="rb-legend-dot" style={{background:'#8B92FF'}} /> 2/5 Occasional</span>
          </div>
        </header>

        {/* ═══════════ PART A ═══════════ */}
        <div className="rb-part-divider">Part A {'·'} Joint Distributions</div>

        <Recipe id="joint-pdf" title="Find Normalization Constant for Joint PDF" priority={5} points="3–5 pts">
          <p>Given <M t="f_{X,Y}(x,y) = c \cdot g(x,y)" /> on some support, find <M t="c" />.</p>
          <Step n={1}><strong>Identify the support region.</strong> Write down the bounds carefully. Draw the region.</Step>
          <Step n={2}><strong>Set up the double integral = 1:</strong> <M t="\iint_{\text{support}} c \cdot g(x,y)\, dx\, dy = 1" d /></Step>
          <Step n={3}><strong>Choose integration order wisely.</strong> Draw the support to decide. For <M t="0 < s < t" />: outer <M t="\int_0^\infty dt" />, inner <M t="\int_0^t ds" />.</Step>
          <Step n={4}><strong>Solve for <M t="c" /></strong>, then verify <M t="f \geq 0" /> everywhere.</Step>
          <Warning>Always state: "Furthermore, <M t="f_{X,Y}(x,y) \geq 0" /> for all <M t="(x,y)" />, so this is a valid pdf." (1 free point!)</Warning>
          <WorkedExample exam="2024 Exam Q1c · 4 pts">
            <div className="rb-exam-q"><strong>Setup:</strong> <em>Let X and Y be continuous random variables with joint pdf <M t="f_{X,Y}(x,y) = c\,x\,y" />, for <M t="0 < x < 1" />, <M t="a\,x < y < b\,x" />, where <M t="c > 0" /> is a normalization constant and <M t="a < b" /> are parameters of the distribution.</em><br/><strong>Question:</strong> <em>Compute c as a function of a and b.</em></div>
            <DesmosGraph label="Support: ax < y < bx, 0 < x < 1 (shown with a=1, b=2)" bounds={{ left: -0.1, right: 1.2, bottom: -0.1, top: 2.2 }} height={220}
              expressions={[
                { latex: 'y > x \\{0 < x < 1\\}\\{y < 2x\\}', color: '#8B92FF', lineWidth: 0 },
                { latex: 'y = x \\{0 \\le x \\le 1\\}', color: '#ff8c42', lineWidth: 2 },
                { latex: 'y = 2x \\{0 \\le x \\le 1\\}', color: '#ff8c42', lineWidth: 2 },
                { latex: '(1, 1)', color: '#ffd166', showLabel: true, label: '(1,a)', pointSize: 7 },
                { latex: '(1, 2)', color: '#ffd166', showLabel: true, label: '(1,b)', pointSize: 7 },
              ]} />
            <Step n={1}><M t="1 = \int_0^1 \int_{ax}^{bx} c\,x\,y\, dy\, dx = c\int_0^1 x \left[\frac{y^2}{2}\right]_{ax}^{bx} dx = c\int_0^1 x \cdot \frac{b^2x^2 - a^2x^2}{2}\, dx" d /></Step>
            <Step n={2}><M t="= \frac{c(b^2 - a^2)}{2}\int_0^1 x^3\, dx = \frac{c(b^2 - a^2)}{2} \cdot \frac{1}{4} = \frac{c(b^2 - a^2)}{8}" d /></Step>
            <p><strong>Answer:</strong> <M t="c = \dfrac{8}{b^2 - a^2}" d /></p>
            <p>Check: <M t="c > 0" /> since <M t="b > a > 0" />, so <M t="b^2 - a^2 > 0" />. {'✓'}</p>
          </WorkedExample>
        </Recipe>

        <Recipe id="marginal-pdf" title="Find Marginal PDF" priority={5} points="3–4 pts">
          <p>Given joint <M t="f_{X,Y}(x,y)" />, find <M t="f_X(x)" /> or <M t="f_Y(y)" />.</p>
          <Step n={1}><strong>Integrate out the OTHER variable:</strong> <M t="f_X(x) = \int f_{X,Y}(x,y)\, dy" d /></Step>
          <Step n={2}><strong>Determine integration limits from the support.</strong> These limits DEPEND on the outer variable. Draw the support and trace a vertical/horizontal line.</Step>
          <Step n={3}><strong>Evaluate the integral.</strong> State the support of the marginal clearly.</Step>
          <Warning>The limits of integration for the inner variable <strong>depend on the outer variable</strong>. This is where most marks are lost. ALWAYS draw the support.</Warning>
          <WorkedExample exam="2024 Exam Q1d · 4 pts">
            <div className="rb-exam-q"><strong>Setup:</strong> <em><M t="f_{X,Y}(x,y) = c\,x\,y" /> for <M t="0 < x < 1" />, <M t="a\,x < y < b\,x" /> with <M t="0 < a < b" />.</em><br/><strong>Question:</strong> <em>Determine the marginal pdf of Y and its support. (If you did not find the normalization constant c previously, you can leave c in your final answer unspecified.)</em></div>
            <p><strong>Key insight:</strong> For <M t="f_Y(y)" />, integrate out x. Given y, x must satisfy <M t="ax < y < bx" />, i.e., <M t="\frac{y}{b} < x < \frac{y}{a}" />. But x is also bounded by <M t="0 < x < 1" />. So the upper limit clips at 1 when <M t="y/a > 1" />, i.e., <M t="y > a" />.</p>
            <Step n={1}><strong>Case 1: <M t="0 < y \leq a" /></strong> {'—'} both <M t="y/b" /> and <M t="y/a" /> are in (0,1):
              <M t="f_Y(y) = \int_{y/b}^{y/a} c\,x\,y\, dx = c\,y \cdot \frac{x^2}{2}\Big|_{y/b}^{y/a} = \frac{c\,y^3}{2}\!\left(\frac{1}{a^2} - \frac{1}{b^2}\right)" d />
            </Step>
            <Step n={2}><strong>Case 2: <M t="a < y < b" /></strong> {'—'} upper limit clips at <M t="x = 1" />:
              <M t="f_Y(y) = \int_{y/b}^{1} c\,x\,y\, dx = \frac{c\,y}{2}\!\left(1 - \frac{y^2}{b^2}\right)" d />
            </Step>
            <Warning>This piecewise marginal is the <strong>hardest marginal</strong> across all 5 exams. The trick is tracing a horizontal line at height y across the support to see where it enters and exits.</Warning>
          </WorkedExample>
        </Recipe>

        <Recipe id="cond-dist" title="Conditional Distribution & E[Y|X=x]" priority={4} points="3–5 pts">
          <p>Find <M t="f_{Y|X}(y|x)" /> and/or <M t="E[Y|X=x]" />.</p>
          <Step n={1}><strong>Find the marginal</strong> <M t="f_X(x)" /> (if not already done).</Step>
          <Step n={2}><strong>Apply:</strong> <M t="f_{Y|X}(y|x) = \frac{f_{X,Y}(x,y)}{f_X(x)}" d /></Step>
          <Step n={3}><strong>State the conditional support.</strong> Given <M t="X = x" />, what values can Y take?</Step>
          <Step n={4}>For <M t="E[Y|X=x]" />: <M t="E[Y|X=x] = \int y \cdot f_{Y|X}(y|x)\, dy" d /></Step>
          <Tip><strong>Shortcut:</strong> If you recognize <M t="f_{Y|X}(y|x)" /> as a known distribution (Uniform, Exponential, etc.), read off E directly.</Tip>
          <WorkedExample exam="2024 Exam Q1e · 5 pts">
            <div className="rb-exam-q"><strong>Question:</strong> <em>Determine the conditional expected value <M t="E[Y|X = x]" /> for <M t="0 < x < 1" />. (If you did not find the normalization constant c previously, you can leave c in your final answer unspecified.)</em></div>
            <Step n={1}><strong>Marginal of X:</strong> <M t="f_X(x) = \int_{ax}^{bx} cxy\, dy = cx \cdot \frac{b^2x^2 - a^2x^2}{2} = \frac{c(b^2-a^2)}{2}x^3" /></Step>
            <Step n={2}><strong>Conditional:</strong> <M t="f_{Y|X}(y|x) = \frac{cxy}{\frac{c(b^2-a^2)}{2}x^3} = \frac{2y}{(b^2-a^2)x^2}" /> for <M t="ax < y < bx" /></Step>
            <Step n={3}><M t="E[Y|X=x] = \int_{ax}^{bx} y \cdot \frac{2y}{(b^2-a^2)x^2}\, dy = \frac{2}{(b^2-a^2)x^2} \cdot \frac{b^3x^3-a^3x^3}{3} = \frac{2(b^3-a^3)}{3(b^2-a^2)}\,x" d /></Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="independence" title="Independence Check" priority={4} points="2 pts">
          <p>Determine whether <M t="X" /> and <M t="Y" /> are independent.</p>
          <Step n={1}><strong>Condition 1:</strong> Support must be a <strong>Cartesian product</strong> (rectangle, not triangle/curve).</Step>
          <Step n={2}><strong>Condition 2:</strong> Joint pdf <strong>factorizes</strong>: <M t="f_{X,Y}(x,y) = g(x) \cdot h(y)" />.</Step>
          <Step n={3}><strong>Conclusion:</strong> Both must hold. Non-rectangular support {'→'} immediately dependent.</Step>
          <DesmosGraph label="Independent (rectangle) vs Dependent (triangle)" bounds={{ left: -0.3, right: 2.5, bottom: -0.3, top: 1.5 }} height={180}
            expressions={[
              { latex: '0 < x < 1 \\{0 < y < 1\\}', color: '#4ade80', lineWidth: 0 },
              { latex: '(0.5, 0.5)', color: '#4ade80', showLabel: true, label: 'Independent', pointSize: 0, labelSize: 1 },
              { latex: 'y < x \\{x > 1.3\\}\\{x < 2.3\\}\\{y > 0\\}', color: '#ff4d4d', lineWidth: 0 },
              { latex: '(1.8, 0.3)', color: '#ff4d4d', showLabel: true, label: 'Dependent', pointSize: 0, labelSize: 1 },
            ]} />
          <Warning>Non-rectangular support {'→'} <strong>immediately</strong> not independent. Write: "Support is not a Cartesian product {'⇒'} X, Y dependent." No further check needed.</Warning>
          <WorkedExample exam="2025 Exam Q2b · 2 pts">
            <div className="rb-exam-q"><strong>Setup:</strong> <em><M t="f_{X,Y}(x,y) = 6xy" /> for <M t="0 < x < 1" /> and <M t="0 < y < \sqrt{x}" />, 0 otherwise.</em><br/><strong>Question:</strong> <em>Are X and Y independent? Explain why/why not.</em></div>
            <p><strong>Answer:</strong> The support <M t="\{(x,y): 0 < y < \sqrt{x},\; 0 < x < 1\}" /> is <strong>not</strong> a Cartesian product (the upper bound on y depends on x). Therefore X and Y are <strong>not independent</strong>.</p>
          </WorkedExample>
        </Recipe>

        <Recipe id="cov-corr" title="Covariance & Correlation" priority={4} points="2–3 pts">
          <Step n={1}><strong>Compute <M t="E[XY]" /></strong> via <M t="\iint xy \cdot f_{X,Y}\, dx\, dy" /> (continuous) or <M t="\sum\sum xy \cdot P(X\!=\!x, Y\!=\!y)" /> (discrete).</Step>
          <Step n={2}><strong>Compute <M t="E[X]" /> and <M t="E[Y]" /></strong> from marginals.</Step>
          <Step n={3}><M t="\text{Cov}(X,Y) = E[XY] - E[X]\cdot E[Y]" d /></Step>
          <Step n={4}>For correlation: <M t="\rho = \frac{\text{Cov}(X,Y)}{\sigma_X \cdot \sigma_Y}" d /></Step>
          <Tip>Independent {'⇒'} Cov = 0. But Cov = 0 does NOT imply independence!</Tip>
          <WorkedExample exam="2025 Exam Q1a · 3 pts">
            <div className="rb-exam-q"><strong>Setup:</strong> <em>In a store three products lie on a shelf, numbered from 1 to 3. A customer randomly picks successively two products from the shelf without replacement. Let X be the number of the first product selected and let Y be the number of the second product selected.</em><br/><strong>Question:</strong> <em>Find the joint pdf and calculate the covariance. (2 decimals). You may use that <M t="E[XY] = \frac{11}{3}" />.</em></div>
            <Step n={1}>Each pair (x,y) with x{'≠'}y has probability 1/6. By symmetry: <M t="E[X] = E[Y] = \frac{1+2+3}{3} = 2" /></Step>
            <Step n={2}><M t="\text{Cov}(X,Y) = \frac{11}{3} - 2 \times 2 = \frac{11}{3} - 4 = -\frac{1}{3} \approx -0.33" d /></Step>
            <p>Negative covariance makes sense: if the first pick is large, the second tends to be smaller (sampling without replacement).</p>
          </WorkedExample>
        </Recipe>

        <Recipe id="discrete-joint" title="Discrete Joint Distribution Table" priority={4} points="3 pts">
          <Step n={1}><strong>List all possible outcomes</strong> and assign probabilities.</Step>
          <Step n={2}><strong>Fill in the table.</strong> Compute marginal row/column sums.</Step>
          <Step n={3}><strong>Verify:</strong> All probs {'≥'} 0 and total = 1.</Step>
          <WorkedExample exam="2025 Exam Q1">
            <div className="rb-exam-q"><em>Now, the customer also takes into account their preferences for the different products when picking the two products, this leads to the following bivariate distribution:</em></div>
            <Diagram label="Given joint PMF table">
{`         X=1    X=2    X=3  | f_Y
  Y=1  |  0    0.11   0.04  | 0.15
  Y=2  | 0.21   0     0.15  | 0.36
  Y=3  | 0.30  0.19    0    | 0.49
  ─────┼─────────────────────┤
  f_X  | 0.51  0.30   0.19  | 1.00`}
            </Diagram>
            <p>Marginals computed by summing rows (for <M t="f_Y" />) and columns (for <M t="f_X" />). Diagonal is 0 because x {'≠'} y (can't pick same product twice).</p>
          </WorkedExample>
        </Recipe>

        <Recipe id="probs-from-table" title="Probabilities from Joint Tables" priority={4} points="3–4 pts">
          <Step n={1}><strong>Marginal probs:</strong> <M t="P(X \leq 2)" /> = sum entries in columns X=1 and X=2.</Step>
          <Step n={2}><strong>Event probs:</strong> <M t="P(X+Y \leq 3)" /> = identify cells satisfying condition, sum them.</Step>
          <Step n={3}><strong>Conditional:</strong> <M t="P(A|B) = P(A \cap B) / P(B)" />. Sum cells satisfying BOTH, divide by cells satisfying the condition.</Step>
          <WorkedExample exam="2025 Exam Q1b · 4 pts">
            <div className="rb-exam-q"><strong>Question:</strong> <em>Find the following probabilities: <M t="P(X \leq 2)" />, <M t="P(X + Y \leq 3)" /> and <M t="P(X \leq 2 \mid X - Y \leq 0)" />. (2 decimals)</em></div>
            <Step n={1}><M t="P(X \leq 2)" /> = sum columns X=1,2: 0+0.21+0.30+0.11+0+0.19 = <strong>0.81</strong></Step>
            <Step n={2}><M t="P(X+Y \leq 3)" />: cells (1,1)=0, (1,2)=0.21, (2,1)=0.11 {'→'} <strong>0.32</strong></Step>
            <Step n={3}><M t="P(X \leq 2 \mid X-Y \leq 0)" />: B = {'{'}X-Y{'≤'}0{'}'} means X{'≤'}Y. Cells: (1,1)=0, (1,2)=0.21, (1,3)=0.30, (2,2)=0, (2,3)=0.19, (3,3)=0. P(B) = 0.70. Among these, X{'≤'}2: all qualify. P(A{'∩'}B)=0.70. Answer: 0.70/0.70 = <strong>1.00</strong></Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="linear-combo" title="Mean & Variance of Linear Combinations" priority={4} points="3–4 pts">
          <Step n={1}><strong>Mean is always linear:</strong> <M t="E[aX + bY] = aE[X] + bE[Y]" d /></Step>
          <Step n={2}><strong>Variance:</strong> <M t="\text{Var}(aX + bY) = a^2\text{Var}(X) + b^2\text{Var}(Y) + 2ab\,\text{Cov}(X,Y)" d /></Step>
          <Step n={3}>If independent: Cov = 0, so just add scaled variances.</Step>
          <Tip><strong>X {'−'} Y:</strong> Var(X{'−'}Y) = Var(X) + Var(Y) {'−'} 2Cov(X,Y). Note the PLUS for variances (minus only hits the covariance term).</Tip>
          <WorkedExample exam="2025 Exam Q1c · 4 pts">
            <div className="rb-exam-q"><strong>Question:</strong> <em>Find the mean and variance of <M t="X - Y" />. (2 decimals)</em></div>
            <Step n={1}><M t="E[X] = 1(0.51)+2(0.30)+3(0.19) = 1.68" />, <M t="E[Y] = 1(0.15)+2(0.36)+3(0.49) = 2.34" /><br/><M t="E[X-Y] = 1.68 - 2.34 = -0.66" /></Step>
            <Step n={2}>Build PMF of D=X{'−'}Y directly. D takes values {'−'}2,{'−'}1,0,1,2.
              <br/>P(D={'−'}2) = P(1,3)=0.30, P(D={'−'}1) = P(1,2)+P(2,3)=0.21+0.19=0.40
              <br/>P(D=0) = 0+0+0=0, P(D=1) = P(2,1)+P(3,2)=0.11+0.15=0.26, P(D=2) = P(3,1)=0.04
              <br/><M t="E[D^2] = 4(0.30)+1(0.40)+0+1(0.26)+4(0.04) = 1.20+0.40+0.26+0.16 = 2.02" />
              <br/><M t="\text{Var}(D) = 2.02 - (-0.66)^2 = 2.02 - 0.4356 = 1.58" /></Step>
          </WorkedExample>
        </Recipe>

        {/* ═══════════ PART B ═══════════ */}
        <div className="rb-part-divider">Part B {'·'} Transformations & Sampling</div>

        <Recipe id="mgf-method" title="MGF Method (Distribution of Sums)" priority={5} points="4–5 pts">
          <p>Find distribution of <M t="W = X_1 + \ldots + X_n" /> using moment generating functions.</p>
          <Step n={1}><strong>State independence explicitly:</strong> "Since <M t="X_1, \ldots, X_n" /> are independent..."</Step>
          <Step n={2}><strong>Factorize:</strong> <M t="M_W(t) = M_{X_1}(t) \cdot M_{X_2}(t) \cdots M_{X_n}(t)" d /></Step>
          <Step n={3}><strong>Look up individual MGFs</strong> from the formula sheet and multiply.</Step>
          <Step n={4}><strong>Recognize the result</strong> as a known distribution's MGF.</Step>
          <Diagram label="Key MGFs to know">{`  Distribution     │  MGF M(t)
  ─────────────────┼──────────────────────
  N(μ, σ²)        │  exp(μt + ½σ²t²)
  Exp(λ)           │  λ/(λ-t),  t < λ
  Gamma(α, β)      │  (1 - t/β)^(-α)
  χ²(n)            │  (1 - 2t)^(-n/2)
  Poisson(λ)       │  exp(λ(eᵗ - 1))`}</Diagram>
          <Tip><strong>Key results:</strong> Sum of n iid Exp({'λ'}) = Gamma(n, {'λ'}). Sum of Normals = Normal. Sum of {'χ²'} = {'χ²'}. Sum of Poissons = Poisson.</Tip>
          <Warning>You MUST state where you use independence and the defining properties of a random sample (iid). Points lost without this.</Warning>
          <WorkedExample exam="2024 Exam Q4 · 4 pts">
            <div className="rb-exam-q"><strong>Question:</strong> <em>Let <M t="X \sim \chi^2(n)" /> and <M t="Y \sim \chi^2(n)" />, with <M t="n > 0" />, be independent random variables. Define <M t="U = \frac{X+Y}{2}" />. Which known distribution does U follow? Hint: use the MGF-method and the table with common distributions.</em></div>
            <Step n={1}><M t="M_{X+Y}(t) = M_X(t) \cdot M_Y(t) = (1-2t)^{-n/2} \cdot (1-2t)^{-n/2} = (1-2t)^{-n}" d />
              This is the MGF of <M t="\chi^2(2n)" />, so <M t="X+Y \sim \chi^2(2n)" />.</Step>
            <Step n={2}>For <M t="U = \frac{X+Y}{2}" />: <M t="M_U(t) = M_{X+Y}(t/2) = (1 - 2 \cdot t/2)^{-n} = (1-t)^{-n}" d />
              This is the MGF of <M t="\text{Gamma}(n, 1)" />.</Step>
            <p><strong>Answer:</strong> <M t="U = \frac{X+Y}{2} \sim \text{Gamma}(n, 1)" /></p>
          </WorkedExample>
        </Recipe>

        <Recipe id="cdf-method" title="CDF / Transformation Method" priority={4} points="5–6 pts">
          <p>Find the pdf of <M t="Z = g(X,Y)" /> (e.g., <M t="Z = Y/X" />) by first finding the CDF then differentiating.</p>
          <Step n={1}><strong>Write the CDF:</strong> <M t="F_Z(z) = P(Z \leq z) = P(g(X,Y) \leq z)" /></Step>
          <Step n={2}><strong>Rewrite as a region in (x,y)-space.</strong> For <M t="Z = Y/X" />: <M t="P(Y/X \leq z) = P(Y \leq zX)" /></Step>
          <Step n={3}><strong>Draw the support and the line <M t="y = zx" /> on it.</strong> Shade the region where <M t="Y \leq zX" />. Check where the line intersects the boundary {'—'} this determines whether you need <strong>two cases</strong>.</Step>
          <Step n={4}><strong>Integrate the joint pdf</strong> over the shaded region to get <M t="F_Z(z)" />.</Step>
          <Step n={5}><strong>Differentiate:</strong> <M t="f_Z(z) = \frac{d}{dz}F_Z(z)" /></Step>
          <Warning><strong>Two cases are almost always needed!</strong> The line <M t="y = zx" /> intersects different boundaries depending on z. Typically Case 1: 0 &lt; z &lt; 1, Case 2: z {'≥'} 1.</Warning>
          <DesmosGraph label="CDF method: Z = Y/X on support 0 < y < √x, 0 < x < 1" bounds={{ left: -0.05, right: 1.1, bottom: -0.05, top: 1.1 }} height={260}
            expressions={[
              { latex: '0 \\le y \\le \\sqrt{x} \\{0 \\le x \\le 1\\}', color: '#333', lineWidth: 0 },
              { latex: 'y = \\sqrt{x} \\{0 \\le x \\le 1\\}', color: '#8B92FF', lineWidth: 2.5 },
              { latex: 'y = 0.6x \\{0 \\le x \\le 1\\}', color: '#ff8c42', lineWidth: 2 },
              { latex: '(0.7, 0.42)', color: '#ff8c42', showLabel: true, label: 'y = zx (z<1)', pointSize: 0, labelSize: 1 },
              { latex: '(1, 1)', color: '#ffd166', showLabel: true, label: '(1,1)', pointSize: 7 },
            ]} />
          <WorkedExample exam="2025 Exam Q2c · 6 pts">
            <div className="rb-exam-q"><strong>Setup:</strong> <em>Consider the random vector <M t="(X,Y)" /> with joint density function <M t="f_{X,Y}(x,y) = 6xy" /> for <M t="0 < x < 1" /> and <M t="0 < y < \sqrt{x}" />, 0 otherwise.</em><br/><strong>Question:</strong> <em>Use the CDF method to determine the pdf of <M t="Z = Y/X" />. Note: You may clarify your solution by editing your drawing in part a).</em></div>
            <Step n={1}><strong>CDF:</strong> <M t="F_Z(z) = P(Y/X \leq z) = P(Y \leq zX)" />. The line <M t="y = zx" /> intersects <M t="y = \sqrt{x}" /> at <M t="zx = \sqrt{x}" />, so <M t="x = 1/z^2" />.</Step>
            <Step n={2}><strong>Case 1: <M t="0 < z < 1" /></strong> {'→'} intersection at <M t="x = 1/z^2 > 1" /> (outside support). The line <M t="y=zx" /> stays below <M t="y=\sqrt{x}" /> on all of [0,1].
              <M t="F_Z(z) = \int_0^1 \int_0^{zx} 6xy\, dy\, dx = \int_0^1 6x \cdot \frac{z^2x^2}{2}\, dx = 3z^2\int_0^1 x^3\, dx = \frac{3z^2}{4}" d /></Step>
            <Step n={3}><strong>Case 2: <M t="z \geq 1" /></strong> {'→'} intersection at <M t="x = 1/z^2 \leq 1" />. Split into two regions:
              <M t="F_Z(z) = \underbrace{\int_0^{1/z^2}\!\int_0^{zx} 6xy\,dy\,dx}_{\text{below line}} + \underbrace{\int_{1/z^2}^1\!\int_0^{\sqrt{x}} 6xy\,dy\,dx}_{\text{entire strip}}" d />
              <p>First integral: <M t="3z^2 \cdot \frac{1}{4z^8} = \frac{3}{4z^6}" /></p>
              <p>Second integral: <M t="\int_{1/z^2}^1 3x^2\, dx = 1 - \frac{1}{z^6}" /></p>
              <p>Total: <M t="F_Z(z) = \frac{3}{4z^6} + 1 - \frac{1}{z^6} = 1 - \frac{1}{4z^6}" /></p></Step>
            <Step n={4}><strong>Differentiate:</strong>
              <M t="f_Z(z) = \begin{cases} \frac{3z}{2} & 0 < z < 1 \\[6pt] \frac{3}{2z^7} & z \geq 1 \end{cases}" d /></Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="jacobian" title="Jacobian Transformation Method" priority={2} points="6 pts">
          <p>Find the joint pdf of <M t="(V,W) = h(X,Y)" /> using the Jacobian determinant. This is <strong>different</strong> from the CDF method {'—'} here you transform BOTH variables at once.</p>
          <Step n={1}><strong>Write the inverse transformation:</strong> express <M t="x" /> and <M t="y" /> in terms of <M t="v" /> and <M t="w" />.
            <p>E.g., if <M t="V = \frac{X+Y}{2},\; W = \frac{X}{2}" />, then <M t="X = 2W,\; Y = 2V - 2W" />.</p></Step>
          <Step n={2}><strong>Compute the Jacobian determinant:</strong>
            <M t="J = \begin{vmatrix} \frac{\partial x}{\partial v} & \frac{\partial x}{\partial w} \\[4pt] \frac{\partial y}{\partial v} & \frac{\partial y}{\partial w} \end{vmatrix}" d />
            <p>Then <M t="|J| = \left|\frac{\partial x}{\partial v}\frac{\partial y}{\partial w} - \frac{\partial x}{\partial w}\frac{\partial y}{\partial v}\right|" /></p></Step>
          <Step n={3}><strong>Apply the formula:</strong>
            <M t="f_{V,W}(v,w) = f_{X,Y}(x(v,w),\; y(v,w)) \cdot |J|" d /></Step>
          <Step n={4}><strong>Find the new support.</strong> Transform all boundary equations from (x,y) to (v,w). Draw the new region.</Step>
          <Warning>The support transformation is worth 3 points on its own. Transform each boundary: e.g., <M t="x = 0 \Rightarrow w = 0" />, <M t="y = 0 \Rightarrow v = w" />, <M t="x = y \Rightarrow 2w = 2v-2w \Rightarrow v = 2w" />, etc.</Warning>
          <WorkedExample exam="2024 Exam Q2 · 6 pts">
            <div className="rb-exam-q"><strong>Setup:</strong> <em>The simultaneous pdf of X and Y is given by <M t="f_{X,Y}(x,y) = 24x(1-y)" /> with support <M t="0 < x < y < 1" />. Also given is the following transformation: <M t="V = \frac{X+Y}{2}" /> and <M t="W = \frac{X}{2}" />.</em><br/><strong>Q2a:</strong> <em>Make a drawing of the support of <M t="f_{V,W}(v,w)" />. Clearly indicate the coordinates of where the edges of the support intersect.</em><br/><strong>Q2b:</strong> <em>Use the transformation method to find a formula for <M t="f_{V,W}(v,w)" />.</em></div>
            <Step n={1}><strong>Inverse:</strong> <M t="X = 2W" /> and <M t="Y = 2V - 2W" />.</Step>
            <Step n={2}><strong>Jacobian:</strong>
              <M t="J = \begin{vmatrix} \partial x/\partial v & \partial x/\partial w \\ \partial y/\partial v & \partial y/\partial w \end{vmatrix} = \begin{vmatrix} 0 & 2 \\ 2 & -2 \end{vmatrix} = 0 \cdot (-2) - 2 \cdot 2 = -4" d />
              So <M t="|J| = 4" />.</Step>
            <Step n={3}><strong>Transform boundaries:</strong>
              <br/>{'•'} <M t="x > 0 \Rightarrow w > 0" />
              <br/>{'•'} <M t="x < y \Rightarrow 2w < 2v-2w \Rightarrow w < v/2 \Rightarrow v > 2w" />
              <br/>{'•'} <M t="y < 1 \Rightarrow 2v-2w < 1 \Rightarrow v < w + 1/2" />
              <br/>{'•'} <M t="y > 0 \Rightarrow v > w" /> (automatically satisfied by <M t="v > 2w" />)
              <br/>New support: <M t="0 < w < v/2" /> and <M t="v < w + 1/2" />. Vertices at (0,0), (1/2,0), (1/2,1/4).</Step>
            <Step n={4}><strong>New pdf:</strong>
              <M t="f_{V,W}(v,w) = 24 \cdot (2w) \cdot (1-(2v-2w)) \cdot 4 = 192\,w\,(1-2v+2w)" d /></Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="draw-support" title="Drawing Support Regions" priority={3} points="2 pts">
          <Step n={1}><strong>Identify all inequalities</strong> from the pdf definition.</Step>
          <Step n={2}><strong>Plot boundary curves.</strong> Label axes, mark key intersection points with coordinates.</Step>
          <Step n={3}><strong>Shade the interior.</strong></Step>
          <DesmosGraph label="Example: 0 < y < √x, 0 < x < 1" bounds={{ left: -0.1, right: 1.2, bottom: -0.1, top: 1.2 }} height={200}
            expressions={[
              { latex: '0 \\le y \\le \\sqrt{x} \\{0 \\le x \\le 1\\}', color: '#8B92FF', lineWidth: 0 },
              { latex: 'y = \\sqrt{x} \\{0 \\le x \\le 1\\}', color: '#8B92FF', lineWidth: 2.5 },
              { latex: '(1, 1)', color: '#ffd166', showLabel: true, label: '(1,1)', pointSize: 8 },
            ]} />
          <Tip>Worth 2 easy points. Label axes, write boundary equations on the curves (y = {'√'}x), shade the region, mark intersection points.</Tip>
        </Recipe>

        <Recipe id="order-stats" title="Order Statistics (Min & Max)" priority={4} points="4–5 pts">
          <p>Given iid <M t="X_1, \ldots, X_n" /> with pdf <M t="f" /> and CDF <M t="F" />.</p>
          <Step n={1}><strong>Maximum <M t="V = \max" />:</strong> <M t="F_V(v) = [F(v)]^n" />, so <M t="f_V(v) = n[F(v)]^{n-1} f(v)" d /></Step>
          <Step n={2}><strong>Minimum <M t="W = \min" />:</strong> <M t="P(W > w) = [1-F(w)]^n" />, so <M t="f_W(w) = n[1-F(w)]^{n-1} f(w)" d /></Step>
          <Step n={3}><strong>Substitute</strong> the specific distribution's F(x) and f(x).</Step>
          <Step n={4}><strong>Always state:</strong> "The X_i are iid (independent and identically distributed), so <M t="P(\text{all } X_i > w) = \prod P(X_i > w) = [1-F(w)]^n" />."</Step>
          <WorkedExample exam="2025 Exam Q3 · 5 pts">
            <div className="rb-exam-q"><strong>Question:</strong> <em>Consider a random sample <M t="X_1, \ldots, X_n" /> from a distribution with pdf <M t="f(x) = 2/x^3" /> for <M t="x \geq 1" />. Determine the pdf of the smallest order statistic <M t="Y_1 = X_{1:n}" />, without using the general formula for the k-th order statistic <M t="f_{Y_k}(y)" />. That is, derive the pdf for <M t="Y_1" /> from scratch. Also mention all relevant properties that you use.</em></div>
            <Step n={1}><strong>CDF of population:</strong> <M t="F(x) = \int_1^x \frac{2}{t^3}\, dt = \left[-\frac{1}{t^2}\right]_1^x = 1 - \frac{1}{x^2}" /> for <M t="x \geq 1" />.</Step>
            <Step n={2}><strong>Survival of minimum:</strong> <M t="P(Y_1 > y) = P(\text{all } X_i > y)" />. Since <M t="X_1,\ldots,X_n" /> are <strong>independent</strong> (random sample property) and <strong>identically distributed</strong>:
              <M t="P(Y_1 > y) = [1 - F(y)]^n = \left(\frac{1}{y^2}\right)^n = \frac{1}{y^{2n}}" d /></Step>
            <Step n={3}><strong>CDF:</strong> <M t="F_{Y_1}(y) = 1 - \frac{1}{y^{2n}}" /> for <M t="y \geq 1" />.</Step>
            <Step n={4}><strong>Differentiate:</strong> <M t="f_{Y_1}(y) = \frac{2n}{y^{2n+1}}" /> for <M t="y \geq 1" />.</Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="bvn" title="Bivariate Normal Distribution" priority={2} points="3–4 pts">
          <p>The BVN has 5 parameters: <M t="\mu_X, \mu_Y, \sigma_X, \sigma_Y, \rho" />.</p>
          <Step n={1}><strong>Recognize the BVN form.</strong> Match the given pdf to the general formula and read off all 5 parameters. For <M t="f = \frac{1}{2\pi}e^{-\frac{1}{2}(x^2+y^2)}" />: this is <M t="\mu_X=0, \mu_Y=0, \sigma_X=1, \sigma_Y=1, \rho=0" />.</Step>
          <Step n={2}><strong>Marginals are normal:</strong> <M t="X \sim N(\mu_X, \sigma_X^2)" />, <M t="Y \sim N(\mu_Y, \sigma_Y^2)" />.</Step>
          <Step n={3}><strong>Conditional is normal:</strong> <M t="Y|X=x \sim N\!\left(\mu_Y + \rho\frac{\sigma_Y}{\sigma_X}(x-\mu_X),\; \sigma_Y^2(1-\rho^2)\right)" />.</Step>
          <Step n={4}><strong>Special property:</strong> If <M t="\rho = 0" /> then X and Y are <strong>independent</strong>. (Only true for BVN, not in general!)</Step>
          <WorkedExample exam="Resit 2024 Q1 · 20 pts">
            <div className="rb-exam-q"><strong>Setup:</strong> <em><M t="f_{X,Y}(x,y) = \frac{1}{2\pi} e^{-\frac{1}{2}(x^2 + y^2)}" /> for <M t="-\infty < x < \infty" />, <M t="-\infty < y < \infty" />.</em></div>
            <Step n={1}><strong>1a: Marginal of X?</strong> Since {'ρ'}=0, {'σ_X'}=1, {'μ_X'}=0: <M t="X \sim N(0,1)" />.</Step>
            <Step n={2}><strong>1b: Conditional Y|X?</strong> Since {'ρ'}=0: <M t="f_{Y|X}(y|x) = f_Y(y) = \frac{1}{\sqrt{2\pi}}e^{-y^2/2}" />. So Y|X ~ N(0,1).</Step>
            <Step n={3}><strong>1c: E[X+Y]</strong> = E[X]+E[Y] = 0+0 = <strong>0</strong>.</Step>
            <Step n={4}><strong>1d: Var[X+Y]</strong> = Var(X)+Var(Y)+2Cov(X,Y) = 1+1+0 = <strong>2</strong> (independent since {'ρ'}=0).</Step>
            <Step n={5}><strong>1e: MGF of W=X+Y?</strong> <M t="M_W(t) = M_X(t) \cdot M_Y(t) = e^{t^2/2} \cdot e^{t^2/2} = e^{t^2}" />. This is the MGF of <M t="N(0,2)" />. So <M t="W \sim N(0,2)" />.</Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="build-stats" title="Building Test Statistics from Standard Normals" priority={2} points="5 pts">
          <p>Given <M t="X_i" /> with different normal distributions, construct <M t="\chi^2" /> and <M t="t" /> statistics.</p>
          <Step n={1}><strong>Standardize each:</strong> <M t="Z_i = \frac{X_i - \mu_i}{\sigma_i} \sim N(0,1)" />. These are independent because the <M t="X_i" /> are independent.</Step>
          <Step n={2}><strong>Chi-squared:</strong> A sum of k independent squared standard normals:
            <M t="V = Z_1^2 + Z_2^2 + \ldots + Z_k^2 \sim \chi^2(k)" d /></Step>
          <Step n={3}><strong>t-distribution:</strong> A standard normal divided by the root of an independent chi-squared over its df:
            <M t="T = \frac{Z}{\sqrt{U/\nu}} \sim t(\nu) \quad\text{where } Z \sim N(0,1),\; U \sim \chi^2(\nu),\; Z \perp U" d /></Step>
          <Step n={4}><strong>State independence explicitly.</strong> "Z{'₁'} is independent of (Z{'₃'}{'²'}+Z{'₄'}{'²'}) because they are functions of independent random variables."</Step>
          <WorkedExample exam="2025 Exam Q4 · 5 pts">
            <div className="rb-exam-q"><strong>Question:</strong> <em>Let <M t="X_1, X_2, X_3, X_4" /> be independent random variables such that <M t="X_i \sim N(i, i^2)" /> for <M t="i = 1,2,3,4" />. Use the <M t="X_i" />'s to construct a statistic with a <M t="\chi^2" /> distribution with 4 degrees of freedom and a statistic with a <M t="t" /> distribution with 2 degrees of freedom. Justify why each statistic has the stated distribution. Hint: Use the technique of standardization.</em></div>
            <Step n={1}><strong>Standardize:</strong> <M t="Z_i = \frac{X_i - i}{i} \sim N(0,1)" /> for each i. These are independent because the <M t="X_i" /> are independent.</Step>
            <Step n={2}><strong>Chi-squared(4):</strong> <M t="V = Z_1^2 + Z_2^2 + Z_3^2 + Z_4^2 \sim \chi^2(4)" /> because it is the sum of 4 independent <M t="N(0,1)^2" /> random variables.</Step>
            <Step n={3}><strong>t(2):</strong> We need <M t="Z \sim N(0,1)" /> independent of <M t="U \sim \chi^2(2)" />. Take <M t="Z = Z_1" /> and <M t="U = Z_3^2 + Z_4^2 \sim \chi^2(2)" />.
              <M t="T = \frac{Z_1}{\sqrt{(Z_3^2 + Z_4^2)/2}} \sim t(2)" d />
              Valid because <M t="Z_1 \perp (Z_3, Z_4)" /> (functions of independent <M t="X_i" />'s).</Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="iterated-exp" title="Iterated Expectation & Law of Total Variance" priority={2} points="3–5 pts">
          <p>Use <M t="E[Y] = E_X[E[Y|X]]" /> to find E[Y] when direct computation is hard.</p>
          <Step n={1}><strong>Find <M t="E[Y|X=x]" /></strong> as a function of x. If <M t="Y|X=x \sim \text{Unif}(a(x), b(x))" /> then <M t="E[Y|X=x] = \frac{a(x)+b(x)}{2}" />.</Step>
          <Step n={2}><strong>Take expectation over X:</strong>
            <M t="E[Y] = E_X[E[Y|X]] = \int E[Y|X=x] \cdot f_X(x)\, dx \quad\text{(or } \sum \text{ for discrete X)}" d /></Step>
          <Step n={3}><strong>Law of total variance</strong> (if asked for Var[Y]):
            <M t="\text{Var}(Y) = E[\text{Var}(Y|X)] + \text{Var}(E[Y|X])" d />
            <p>First term: average of conditional variances. Second term: variance of conditional means.</p></Step>
          <Tip>This is a powerful shortcut when the conditional distribution of Y|X is a known distribution, making E[Y|X] easy, while the direct joint integral would be messy.</Tip>
          <WorkedExample exam="2022 Exam Q1c–d · 9 pts">
            <div className="rb-exam-q"><strong>Setup:</strong> <em><M t="f_{X,Y}(x,y) = kx(x+y)" /> for <M t="0 < x < 1" />, <M t="0 < y < 2x" />.</em><br/><strong>Q1c:</strong> <em>Compute <M t="E[Y|X=x]" /> for any x in (0,1).</em><br/><strong>Q1d:</strong> <em>Use the result of the previous subquestion to determine E[Y].</em></div>
            <Step n={1}><strong>Marginal:</strong> <M t="f_X(x) = \int_0^{2x} kx(x+y)\, dy = kx[xy + y^2/2]_0^{2x} = kx(2x^2+2x^2) = 4kx^3" /></Step>
            <Step n={2}><strong>Conditional:</strong> <M t="f_{Y|X}(y|x) = \frac{kx(x+y)}{4kx^3} = \frac{x+y}{4x^2}" /> for <M t="0 < y < 2x" /></Step>
            <Step n={3}><M t="E[Y|X=x] = \int_0^{2x} y \cdot \frac{x+y}{4x^2}\, dy = \frac{1}{4x^2}\int_0^{2x}(xy+y^2)\, dy = \frac{1}{4x^2}\left[2x^3+\frac{8x^3}{3}\right] = \frac{1}{4x^2}\cdot\frac{14x^3}{3} = \frac{7x}{6}" d /></Step>
            <Step n={4}><strong>Iterated expectation:</strong> <M t="E[Y] = E[E[Y|X]] = E\!\left[\frac{7X}{6}\right] = \frac{7}{6}E[X]" />. With <M t="E[X] = \int_0^1 x \cdot 4kx^3\, dx = 4k/5" />. From normalization <M t="k = 1" /> (since <M t="\int_0^1 4x^3\, dx = 1" />). So <M t="E[Y] = \frac{7}{6} \cdot \frac{4}{5} = \frac{14}{15}" />.</Step>
          </WorkedExample>
        </Recipe>

        {/* ═══════════ PART C ═══════════ */}
        <div className="rb-part-divider">Part C {'·'} Confidence Intervals</div>

        <Recipe id="ci-mean" title="CI for Mean" priority={5} points="3–4 pts">
          <p>Choose z-interval or t-interval based on whether {'σ'} is known and sample size.</p>
          <Diagram label="Decision flowchart">{`  Is σ known?
  ├── YES → z-interval: x̄ ± z_{α/2} · σ/√n
  │
  └── NO → Is n ≥ 30?
            ├── YES → z-interval (use s for σ)
            └── NO → t-interval: x̄ ± t_{α/2, n-1} · s/√n
                      ⚠ Requires normality assumption`}</Diagram>
          <Step n={1}><strong>Identify:</strong> Is {'σ'} known or unknown? What is n? What confidence level <M t="100(1-\alpha)\%" />?</Step>
          <Step n={2}><strong>Find critical value</strong> from tables. For 95%: <M t="z_{0.025} = 1.96" />. For 90%: <M t="z_{0.05} = 1.645" />.</Step>
          <Step n={3}><strong>Compute:</strong> <M t="\bar{x} \pm (\text{critical value}) \times \frac{\sigma \text{ or } s}{\sqrt{n}}" d /></Step>
          <Step n={4}><strong>State assumptions:</strong> (1) random sample, (2) normality or CLT (n{'≥'}30), (3) {'σ'} known/unknown.</Step>
          <Step n={5}><strong>Interpret:</strong> "We are 95% confident that the true mean is between [L, U]."</Step>
          <Warning>If using a CI to test H{'₀'}: {'μ'} = {'μ₀'}, check if {'μ₀'} is inside the interval. If yes {'→'} do not reject. If no {'→'} reject.</Warning>
        </Recipe>

        <Recipe id="ci-proportion" title="CI for Proportion" priority={4} points="3–5 pts">
          <Step n={1}><strong>Compute</strong> <M t="\hat{p} = x/n" /> where x = number of successes.</Step>
          <Step n={2}><strong>Check conditions:</strong> <M t="n\hat{p} \geq 5" /> and <M t="n(1-\hat{p}) \geq 5" /> (needed for normal approximation).</Step>
          <Step n={3}><strong>Compute the interval:</strong>
            <M t="\hat{p} \pm z_{\alpha/2} \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}" d /></Step>
          <Step n={4}><strong>Interpret.</strong> If testing <M t="p > p_0" />: check if <M t="p_0" /> is in the interval. If yes {'→'} "cannot prove conjecture."</Step>
          <WorkedExample exam="2025 Exam Q7a · 5 pts">
            <div className="rb-exam-q"><strong>Setup:</strong> <em>A stock trader considers investing in a stock listed on the AEX index. [...] Unilever: 128 [positive return days out of 245 business days].</em><br/><strong>Question:</strong> <em>Use a two-sided 95% confidence interval to draw a conclusion about the conjecture that the population proportion of days that Unilever has a positive daily return is more than 50% of the days in a given year (<M t="p_U > 0.5" />). Write down the interval estimator (formula), the interval obtained for this sample and carefully draw your conclusion. (2 decimals)</em></div>
            <Step n={1}><M t="\hat{p}_U = 128/245 = 0.5224" /></Step>
            <Step n={2}>Check: <M t="n\hat{p} = 245 \times 0.5224 = 128 \geq 5" /> {'✓'}, <M t="n(1-\hat{p}) = 117 \geq 5" /> {'✓'}</Step>
            <Step n={3}><M t="0.5224 \pm 1.96\sqrt{\frac{0.5224 \times 0.4776}{245}} = 0.5224 \pm 1.96(0.0319) = 0.5224 \pm 0.0625" d />
              <strong>CI: (0.46, 0.58)</strong></Step>
            <Step n={4}>Since <M t="0.5 \in (0.46, 0.58)" />, the value 0.5 is inside the interval. We <strong>cannot conclude</strong> that <M t="p_U > 0.5" /> at the 95% confidence level.</Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="ci-variance" title="CI for Variance / Variance Ratio" priority={3} points="3–5 pts">
          <p>Two types: single variance (using <M t="\chi^2" />) and variance ratio (using F).</p>
          <Step n={1}><strong>Single variance <M t="\sigma^2" />:</strong> The pivotal quantity is <M t="\frac{(n-1)S^2}{\sigma^2} \sim \chi^2(n-1)" />, giving:
            <M t="\left(\frac{(n-1)s^2}{\chi^2_{\alpha/2,\,n-1}},\;\; \frac{(n-1)s^2}{\chi^2_{1-\alpha/2,\,n-1}}\right)" d />
            For a CI for <M t="\sigma" /> (standard deviation): take square roots of both bounds.</Step>
          <Step n={2}><strong>Variance ratio <M t="\sigma_1^2/\sigma_2^2" />:</strong> The pivotal quantity is <M t="\frac{S_1^2/\sigma_1^2}{S_2^2/\sigma_2^2} \sim F(n_1-1, n_2-1)" />, giving:
            <M t="\left(\frac{s_1^2}{s_2^2} \cdot \frac{1}{F_{\alpha/2;\,n_1-1,\,n_2-1}},\;\;\; \frac{s_1^2}{s_2^2} \cdot F_{\alpha/2;\,n_2-1,\,n_1-1}\right)" d /></Step>
          <Step n={3}><strong>Interpret:</strong> For ratio, if 1 {'∈'} CI {'→'} cannot conclude variances differ. For single variance, check if <M t="\sigma_0" /> is in the CI.</Step>
          <Warning><strong>Both require normality assumption.</strong> Always state: "This CI is valid under the assumption that both populations are normally distributed."</Warning>
          <Tip><strong>F-table trick:</strong> <M t="F_{1-\alpha;\,\nu_1,\nu_2} = 1/F_{\alpha;\,\nu_2,\nu_1}" />. Use this when the lower quantile isn't in your table.</Tip>
          <WorkedExample exam="2025 Exam Q5a · 5 pts">
            <div className="rb-exam-q"><strong>Setup:</strong> <em>A manufacturer produces tiles for bathrooms. [...] Machine A: random sample of 41 tiles, standard deviation of 2 cm. Machine B: random sample of 61 tiles, standard deviation of 2.5 cm.</em><br/><strong>Question:</strong> <em>Use a two-sided 90% confidence interval to draw a conclusion about the statement that machine A is more accurate than machine B (has a lower standard deviation). Write down the general formula, the interval obtained for this sample and carefully draw your conclusion. (2 decimals)</em></div>
            <Step n={1}><M t="\frac{s_A^2}{s_B^2} = \frac{4}{6.25} = 0.64" /></Step>
            <Step n={2}>{'α'}=0.10, so {'α/2'}=0.05. <M t="F_{0.05;\,40,60} = 1.53" />, <M t="F_{0.05;\,60,40} = 1.57" /> from tables.</Step>
            <Step n={3}><M t="\text{CI}: \left(\frac{0.64}{1.53},\;\; 0.64 \times 1.57\right) = (0.42,\; 1.00)" d />
              Since 1 is on the boundary of the CI {'→'} barely cannot conclude Machine A is more precise.</Step>
            <Step n={4}><strong>5b: Normality required?</strong> YES. The F-distribution CI requires both populations to be normally distributed. This must be stated for full marks.</Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="ci-diff-means" title="CI for Difference in Means" priority={3} points="3–7 pts">
          <p>Three cases depending on what's known about the variances.</p>
          <Step n={1}><strong>{'σ₁'}, {'σ₂'} known {'→'} z-interval:</strong>
            <M t="(\bar{x}_1 - \bar{x}_2) \pm z_{\alpha/2} \sqrt{\frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2}}" d /></Step>
          <Step n={2}><strong>{'σ'} unknown, assumed equal {'→'} pooled t-interval:</strong>
            <p>Pooled variance: <M t="s_p^2 = \frac{(n_1-1)s_1^2 + (n_2-1)s_2^2}{n_1+n_2-2}" /></p>
            <M t="(\bar{x}_1 - \bar{x}_2) \pm t_{\alpha/2,\,n_1+n_2-2} \cdot s_p\sqrt{\frac{1}{n_1} + \frac{1}{n_2}}" d /></Step>
          <Step n={3}><strong>{'σ'} unknown, large n {'→'} z-interval</strong> (use <M t="s_1, s_2" /> in place of <M t="\sigma_1, \sigma_2" />).</Step>
          <Step n={4}><strong>Interpret:</strong> If 0 {'∉'} CI {'→'} means are significantly different.</Step>
          <Warning><strong>Pooled t-test requires equal variances.</strong> You should first test this with an F-test or F-CI before using the pooled procedure.</Warning>
          <WorkedExample exam="2023 Exam Q4c · 7 pts">
            <div className="rb-exam-q"><strong>Setup:</strong> <em>VeryFast: n=21, <M t="\bar{x}=5" />, <M t="s_X = \sqrt{100/21}" />. NeverLate: n=16, <M t="\sum y_i = 56" />, <M t="\sum y_i^2 = 300" />.</em><br/><strong>Question:</strong> <em>Now assume equal variances for the waiting times of VeryFast and NeverLate. Construct a 90% confidence interval for the difference between the two mean delivery times, <M t="\mu_X - \mu_Y" />.</em></div>
            <Step n={1}><M t="\bar{y} = 56/16 = 3.5" />, <M t="s_Y^2 = \frac{300 - 16(3.5)^2}{15} = \frac{300-196}{15} = \frac{104}{15}" /></Step>
            <Step n={2}>Pooled: <M t="s_p^2 = \frac{20 \cdot 100/21 + 15 \cdot 104/15}{35} = \frac{2000/21 + 104}{35} = \frac{95.24 + 104}{35} = 5.69" /></Step>
            <Step n={3}><M t="(5 - 3.5) \pm t_{0.05,35} \cdot \sqrt{5.69}\sqrt{\frac{1}{21}+\frac{1}{16}} = 1.5 \pm 1.690 \cdot 2.386 \cdot 0.328 = 1.5 \pm 1.32" d />
              <strong>CI: (0.18, 2.82)</strong>. Since 0 {'∉'} CI {'→'} mean delivery times differ significantly.</Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="sample-size" title="Minimum Sample Size" priority={2} points="2–4 pts">
          <Step n={1}><strong>For mean:</strong> From margin of error E: <M t="n = \left(\frac{z_{\alpha/2} \cdot \sigma}{E}\right)^2" d /></Step>
          <Step n={2}><strong>For proportion:</strong> <M t="n = \frac{z_{\alpha/2}^2 \cdot \hat{p}(1-\hat{p})}{E^2}" d />
            If no prior estimate of p, use <M t="\hat{p} = 0.5" /> (worst case, maximizes n).</Step>
          <Step n={3}><strong>From CI width:</strong> If given interval width W = 2E, then E = W/2. Alternatively, derive from <M t="\hat{p} - L = z_{\alpha/2}\sqrt{\hat{p}(1-\hat{p})/n}" /> and solve for n.</Step>
          <Step n={4}><strong>Always round UP</strong> to the nearest integer.</Step>
          <WorkedExample exam="2024 Exam Q7d · 4 pts">
            <div className="rb-exam-q"><strong>Question:</strong> <em>We are interested in the proportion of Biology professors who believe that consciousness plays an essential role in Quantum Mechanics. What is the minimal sample size n for a 90%-confidence interval, if the interval width should not be larger than 10%?</em></div>
            <Step n={1}>Width {'≤'} 0.10, so margin E {'≤'} 0.05. For 90%: <M t="z_{0.05} = 1.645" />.</Step>
            <Step n={2}>No prior estimate {'→'} use <M t="\hat{p} = 0.5" />:
              <M t="n = \frac{1.645^2 \times 0.5 \times 0.5}{0.05^2} = \frac{0.6765}{0.0025} = 270.6" d /></Step>
            <Step n={3}>Round up: <strong>n = 271</strong>.</Step>
          </WorkedExample>
        </Recipe>

        {/* ═══════════ PART D ═══════════ */}
        <div className="rb-part-divider">Part D {'·'} Hypothesis Testing</div>

        <Recipe id="z-test" title="z-Test for Mean (σ known)" priority={5} points="5–6 pts">
          <p>The most common test. Follow the <strong>6-step recipe</strong> exactly {'—'} the exam gives you fill-in boxes for each step.</p>
          <Step n={1}><strong>1. Hypotheses:</strong> <M t="H_0: \mu = \mu_0" /> vs <M t="H_1: \mu > \mu_0" /> (or &lt; or {'≠'}). State <M t="\alpha" />.</Step>
          <Step n={2}><strong>2. Test statistic & distribution:</strong> <M t="Z = \frac{\bar{X} - \mu_0}{\sigma/\sqrt{n}} \sim N(0,1) \text{ under } H_0" d /></Step>
          <Step n={3}><strong>3. Assumptions:</strong> (1) Random sample {'✓'}, (2) n{'≥'}30 so CLT applies {'✓'} (or population normal), (3) {'σ'} is known {'✓'}.</Step>
          <Step n={4}><strong>4. Rejection region:</strong>
            <br/>{'•'} H{'₁'}: {'μ'} &gt; {'μ₀'} {'→'} Reject if z {'≥'} z{'_α'} (right-tailed)
            <br/>{'•'} H{'₁'}: {'μ'} &lt; {'μ₀'} {'→'} Reject if z {'≤'} {'−'}z{'_α'} (left-tailed)
            <br/>{'•'} H{'₁'}: {'μ'} {'≠'} {'μ₀'} {'→'} Reject if |z| {'≥'} z{'_{α/2}'} (two-tailed)</Step>
          <Step n={5}><strong>5. Compute & compare:</strong> <M t="z_{\text{obs}} = \frac{\bar{x} - \mu_0}{\sigma/\sqrt{n}}" />. Is <M t="z_{\text{obs}}" /> in the rejection region?</Step>
          <Step n={6}><strong>6. Conclusion in words:</strong> "At significance level {'α'}, we [reject/do not reject] H{'₀'}. There is [sufficient/insufficient] evidence that..."</Step>
          <Warning>Don't forget step 3 (assumptions)! Worth 1 point. Always write the conclusion <strong>in context</strong>, not just "reject."</Warning>
          <WorkedExample exam="2025 Exam Q6a · 6 pts">
            <div className="rb-exam-q"><strong>Setup:</strong> <em>A random sample of 30 observation is drawn from an unknown distribution. It turns out that the sample mean is 20. Furthermore it is known that the population standard deviation is 2.</em><br/><strong>Question:</strong> <em>Perform a hypothesis test, to test if the population mean is greater than 19. Use <M t="\alpha = 5\%" />. Explicitly write down: (1) the hypotheses, (2) the test statistic with distribution, (3) the assumptions, (4) the critical region, (5) the sample outcome and comparison with rejection region (6) the conclusion about the rejection. (2 decimals)</em></div>
            <Step n={1}><M t="H_0: \mu = 19 \quad\text{vs}\quad H_1: \mu > 19,\quad \alpha = 0.05" /></Step>
            <Step n={2}><M t="Z = \frac{\bar{X} - 19}{2/\sqrt{30}} \sim N(0,1)" /> under H{'₀'}.</Step>
            <Step n={3}>Random sample {'✓'}. n=30, CLT applies {'✓'}. {'σ'}=2 known {'✓'}.</Step>
            <Step n={4}>Reject if <M t="z \geq z_{0.05} = 1.645" />.</Step>
            <Step n={5}><M t="z_{\text{obs}} = \frac{20 - 19}{2/\sqrt{30}} = \frac{1}{0.3651} = 2.74" />. Since 2.74 {'≥'} 1.645: <strong>in rejection region</strong>.</Step>
            <Step n={6}>At 5% significance, we <strong>reject H{'₀'}</strong>. There is sufficient evidence that the population mean is greater than 19.</Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="t-test" title="t-Test for Mean (σ unknown)" priority={3} points="3–4 pts">
          <p>Same 6-step recipe as z-test, but use the <strong>t-distribution</strong> because {'σ'} is estimated by s.</p>
          <Step n={1}><strong>Test statistic:</strong> <M t="T = \frac{\bar{X} - \mu_0}{S/\sqrt{n}} \sim t(n-1) \text{ under } H_0" d />
            The key difference: we divide by <M t="S/\sqrt{n}" /> (sample SD) instead of <M t="\sigma/\sqrt{n}" />.</Step>
          <Step n={2}><strong>Critical values from t-table</strong> with df = n{'−'}1. For small n, these are larger than z-values.</Step>
          <Step n={3}><strong>Extra assumption:</strong> When n is small, the population must be approximately normally distributed. For n{'≥'}30, CLT kicks in.</Step>
          <Step n={4}><strong>p-value from t-table:</strong> You can only <strong>bracket</strong> the p-value between two table columns. E.g., if <M t="t_{\text{obs}}" /> falls between <M t="t_{0.01}" /> and <M t="t_{0.005}" />, then <M t="0.005 < p < 0.01" />.</Step>
          <Tip>The t-test is the z-test's cautious sibling. It accounts for the extra uncertainty from estimating {'σ'}. As n{'→∞'}, t(n{'−'}1) {'→'} N(0,1).</Tip>
          <WorkedExample exam="2025 Exam Q6c · 4 pts">
            <div className="rb-exam-q"><strong>Question:</strong> <em>Now assume the population standard deviation is unknown, but the sample standard deviation of the sample above is 2.2. Determine the p-value of the test in part a) and use it to draw a conclusion about the rejection of the null hypothesis. Now use <M t="\alpha = 1\%" />. (2 decimals)</em></div>
            <Step n={1}><M t="t_{\text{obs}} = \frac{20 - 19}{2.2/\sqrt{30}} = \frac{1}{0.4017} = 2.49" /> with df = 29.</Step>
            <Step n={2}>From t-table, df=29 row: <M t="t_{0.01} = 2.462" /> and <M t="t_{0.005} = 2.756" />.
              <br/>Since <M t="2.462 < 2.49 < 2.756" />: <strong><M t="0.005 < p < 0.01" /></strong>.</Step>
            <Step n={3}>Since p &lt; 0.01 = {'α'}: <strong>reject H{'₀'}</strong> at the 1% significance level. Sufficient evidence {'μ'} &gt; 19.</Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="chi-sq-var" title="χ²-Test for Variance" priority={2} points="5 pts">
          <p>Test whether the population variance (or standard deviation) equals a specific value.</p>
          <Step n={1}><strong>Hypotheses:</strong> <M t="H_0: \sigma = \sigma_0" /> (or <M t="\sigma^2 = \sigma_0^2" />) vs <M t="H_1: \sigma < \sigma_0" /> (or &gt; or {'≠'}).</Step>
          <Step n={2}><strong>Test statistic:</strong> <M t="\chi^2 = \frac{(n-1)S^2}{\sigma_0^2} \sim \chi^2(n-1) \text{ under } H_0" d /></Step>
          <Step n={3}><strong>Rejection region:</strong>
            <br/>{'•'} H{'₁'}: {'σ'} &lt; {'σ₀'} {'→'} Reject if <M t="\chi^2 \leq \chi^2_{1-\alpha,\,n-1}" /> (left tail)
            <br/>{'•'} H{'₁'}: {'σ'} &gt; {'σ₀'} {'→'} Reject if <M t="\chi^2 \geq \chi^2_{\alpha,\,n-1}" /> (right tail)
            <br/>{'•'} H{'₁'}: {'σ'} {'≠'} {'σ₀'} {'→'} Reject if <M t="\chi^2 \leq \chi^2_{1-\alpha/2}" /> or <M t="\chi^2 \geq \chi^2_{\alpha/2}" /></Step>
          <Step n={4}><strong>Assumption:</strong> Population must be normally distributed. <strong>Always state this.</strong></Step>
          <Warning>The <M t="\chi^2" /> distribution is <strong>not symmetric</strong>, so for two-sided tests you need both tails from the table.</Warning>
          <WorkedExample exam="2024 Exam Q6a · 5 pts">
            <div className="rb-exam-q"><strong>Setup:</strong> <em>A machine that cuts tiles in a tile factory is inspected for quality control purposes. A random sample of 101 tiles is drawn. [...] sample mean <M t="\bar{x} = 13.1" /> cm, standard deviation <M t="s = 0.18" /> cm. [...] normally distributed.</em><br/><strong>Question:</strong> <em>Perform a hypothesis test, to test if the standard deviation of the tiles is less than 0.2 cm. Use <M t="\alpha = 5\%" />.</em></div>
            <Step n={1}><M t="H_0: \sigma = 0.2 \quad\text{vs}\quad H_1: \sigma < 0.2,\quad \alpha = 0.05" /></Step>
            <Step n={2}><M t="\chi^2 = \frac{(101-1)(0.18)^2}{(0.2)^2} = \frac{100 \times 0.0324}{0.04} = \frac{3.24}{0.04} = 81.0" d /></Step>
            <Step n={3}>Left-tailed: reject if <M t="\chi^2 \leq \chi^2_{0.95,\,100}" />. From table: <M t="\chi^2_{0.95,\,100} = 77.93" />.</Step>
            <Step n={4}>Since 81.0 &gt; 77.93: <strong>not in rejection region</strong>. Do not reject H{'₀'}. Insufficient evidence that {'σ'} &lt; 0.2.</Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="prop-test" title="Proportion Test" priority={4} points="5–7 pts">
          <p>Test whether a population proportion equals a specific value, or compare two proportions.</p>
          <Step n={1}><strong>Single proportion:</strong> <M t="H_0: p = p_0" /> vs <M t="H_1: p > p_0" />.
            <M t="Z = \frac{\hat{p} - p_0}{\sqrt{p_0(1-p_0)/n}} \sim N(0,1)" d /></Step>
          <Step n={2}><strong>Two proportions with offset <M t="\Delta_0" />:</strong>
            <M t="H_0: p_1 - p_2 = \Delta_0 \quad\text{vs}\quad H_1: p_1 - p_2 > \Delta_0" d />
            <M t="Z = \frac{(\hat{p}_1 - \hat{p}_2) - \Delta_0}{\sqrt{\frac{\hat{p}_1(1-\hat{p}_1)}{n_1} + \frac{\hat{p}_2(1-\hat{p}_2)}{n_2}}}" d /></Step>
          <Step n={3}><strong>Check conditions:</strong> <M t="n\hat{p} \geq 5" /> and <M t="n(1-\hat{p}) \geq 5" /> for each sample.</Step>
          <Step n={4}>Follow the standard 6-step procedure.</Step>
          <Warning>When <M t="\Delta_0 \neq 0" />: use <strong>individual</strong> <M t="\hat{p}" />'s in the denominator, NOT the pooled proportion. Subtract <M t="\Delta_0" /> in the numerator.</Warning>
          <WorkedExample exam="2025 Exam Q7b · 7 pts">
            <div className="rb-exam-q"><strong>Question:</strong> <em>A fellow trader conjectures that the population proportion of days that Unilever has a positive daily return is more than 0.10 more than the population proportion of days that Galapagos has a positive daily return (<M t="p_U - p_G > 0.1" />). Assume that the stocks move independently. Perform a hypothesis test to draw a conclusion about this conjecture. Use <M t="\alpha = 1\%" />. Use a test statistic of the form <M t="\frac{\hat{P}_U - \hat{P}_G - \Delta_0}{\sqrt{\hat{P}_U(1-\hat{P}_U)/n_U + \hat{P}_G(1-\hat{P}_G)/n_G}}" />.</em></div>
            <Step n={1}><M t="H_0: p_U - p_G = 0.1 \quad\text{vs}\quad H_1: p_U - p_G > 0.1,\quad \alpha = 0.01" /></Step>
            <Step n={2}><M t="\hat{p}_U = 128/245 = 0.5224,\quad \hat{p}_G = 63/245 = 0.2571" /></Step>
            <Step n={3}><M t="Z = \frac{(0.5224 - 0.2571) - 0.1}{\sqrt{\frac{0.5224 \times 0.4776}{245} + \frac{0.2571 \times 0.7429}{245}}} = \frac{0.1653}{\sqrt{0.001018 + 0.000780}} = \frac{0.1653}{0.0424} = 3.90" d /></Step>
            <Step n={4}>Reject if <M t="z \geq z_{0.01} = 2.33" />. Since 3.90 {'≥'} 2.33: <strong>reject H{'₀'}</strong>. Sufficient evidence that <M t="p_U - p_G > 0.1" />.</Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="two-sample" title="Two-Sample Tests for Means" priority={3} points="5–7 pts">
          <p>Compare means of two populations. Choose the right test based on what's known.</p>
          <Diagram label="Which two-sample test?">{`  σ₁, σ₂ known? → Two-sample z-test
  σ unknown, equal variances? → Pooled t-test (df = n₁+n₂-2)
  σ unknown, unequal variances? → Welch t-test (approx df)`}</Diagram>
          <Step n={1}><strong>Two-sample z-test (σ known):</strong>
            <M t="Z = \frac{(\bar{X}_1 - \bar{X}_2) - \Delta_0}{\sqrt{\sigma_1^2/n_1 + \sigma_2^2/n_2}} \sim N(0,1)" d /></Step>
          <Step n={2}><strong>Pooled t-test (σ unknown, equal):</strong>
            <p>First compute pooled variance: <M t="s_p^2 = \frac{(n_1-1)s_1^2 + (n_2-1)s_2^2}{n_1+n_2-2}" /></p>
            <M t="T = \frac{(\bar{X}_1 - \bar{X}_2) - \Delta_0}{s_p\sqrt{1/n_1 + 1/n_2}} \sim t(n_1+n_2-2)" d /></Step>
          <Step n={3}>Follow the standard 6-step procedure. State assumptions: independent samples, normality (for t), equal variances (for pooled).</Step>
          <Warning>Before using a pooled t-test, verify equal variances with an F-test or F-CI first!</Warning>
          <WorkedExample exam="Resit 2024 Q4b · 5 pts">
            <div className="rb-exam-q"><strong>Setup:</strong> <em>RareExtract extracts rare metal from ores. Two suppliers: Ore.com (<M t="\sigma_1 = 2.4" />, <M t="n_1 = 50" />, <M t="\bar{x}_1 = 10.0" />) and OreToGo (<M t="\sigma_2 = 2.1" />, <M t="n_2 = 50" />, <M t="\bar{x}_2 = 8.4" />).</em><br/><strong>Question:</strong> <em>Ore.com advertises that their ore contains on average at least 0.2 gram more rare metal than any other ore. Use a rejection/critical region to perform a hypothesis test to test this claim. Use a test statistic of the form <M t="\frac{\bar{X}_1 - \bar{X}_2 - \Delta}{\sqrt{\sigma_1^2/n_1 + \sigma_2^2/n_2}}" /> and confidence level of <M t="\alpha = 0.005" />.</em></div>
            <Step n={1}><M t="H_0: \mu_1 - \mu_2 = 0.2 \quad\text{vs}\quad H_1: \mu_1 - \mu_2 > 0.2,\quad \alpha = 0.005" /></Step>
            <Step n={2}><M t="z_{\text{obs}} = \frac{(10.0-8.4)-0.2}{\sqrt{2.4^2/50 + 2.1^2/50}} = \frac{1.4}{\sqrt{0.1152+0.0882}} = \frac{1.4}{0.4513} = 3.10" d /></Step>
            <Step n={3}><M t="z_{0.005} = 2.576" />. Since 3.10 {'≥'} 2.576: <strong>reject H{'₀'}</strong>. The difference exceeds 0.2 grams.</Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="f-test" title="F-Test for Equal Variances" priority={3} points="3–7 pts">
          <p>Test <M t="H_0: \sigma_1^2 = \sigma_2^2" /> or equivalently use a CI for the variance ratio.</p>
          <Step n={1}><strong>Test statistic:</strong> <M t="F = \frac{S_1^2}{S_2^2} \sim F(n_1-1,\, n_2-1) \text{ under } H_0" d /></Step>
          <Step n={2}><strong>Two-sided rejection region:</strong> Reject if <M t="F > F_{\alpha/2;\,n_1-1,\,n_2-1}" /> or <M t="F < 1/F_{\alpha/2;\,n_2-1,\,n_1-1}" />.</Step>
          <Step n={3}><strong>CI approach</strong> (more common on this exam): Build CI for <M t="\sigma_1^2/\sigma_2^2" />. If 1 {'∈'} CI {'→'} do not reject. If 1 {'∉'} CI {'→'} reject.</Step>
          <Step n={4}><strong>Assumptions:</strong> Both populations must be <strong>normally distributed</strong>. Always state this.</Step>
          <Warning>You often need to do the F-test FIRST to decide whether you can use a pooled t-test for the means.</Warning>
          <WorkedExample exam="2023 Exam Q4b · 7 pts">
            <div className="rb-exam-q"><strong>Setup:</strong> <em>VeryFast: n{'₁'}=21, s{'₁'}{'²'}=100/21. NeverLate: n{'₂'}=16, s{'₂'}{'²'}=104/15.</em><br/><strong>Question:</strong> <em>Test <M t="H_0: \sigma_X^2 = \sigma_Y^2" /> against <M t="H_a: \sigma_X^2 \neq \sigma_Y^2" />, with significance level <M t="\alpha = 0.10" />.</em></div>
            <Step n={1}><M t="F = \frac{s_X^2}{s_Y^2} = \frac{100/21}{104/15} = \frac{100 \times 15}{21 \times 104} = \frac{1500}{2184} = 0.687" /></Step>
            <Step n={2}><M t="F_{0.05;\,20,15} = 2.33" /> and <M t="1/F_{0.05;\,15,20} = 1/2.20 = 0.455" />. Rejection region: F &lt; 0.455 or F &gt; 2.33.</Step>
            <Step n={3}>Since 0.455 &lt; 0.687 &lt; 2.33: <strong>do not reject H{'₀'}</strong>. Cannot conclude variances differ {'→'} pooled t-test is valid.</Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="power" title="Power & Type II Error" priority={4} points="4–5 pts">
          <p><M t="\text{Power} = \pi(\mu_1) = P(\text{reject } H_0 \mid \mu = \mu_1)" />. Type II error: <M t="\beta = 1 - \text{Power}" />.</p>
          <Step n={1}><strong>Convert rejection region to <M t="\bar{X}" /> scale.</strong> For right-tailed z-test rejecting when <M t="Z \geq z_\alpha" />:
            <M t="\text{Reject when } \bar{X} \geq \mu_0 + z_\alpha \cdot \frac{\sigma}{\sqrt{n}} = \text{cutoff}" d /></Step>
          <Step n={2}><strong>Compute the cutoff value</strong> by plugging in {'μ₀'}, z{'_α'}, {'σ'}, n.</Step>
          <Step n={3}><strong>Under <M t="\mu = \mu_1" /></strong>, compute the probability of exceeding the cutoff:
            <M t="\pi(\mu_1) = P\!\left(\bar{X} \geq \text{cutoff} \mid \mu = \mu_1\right) = P\!\left(Z \geq \frac{\text{cutoff} - \mu_1}{\sigma/\sqrt{n}}\right)" d />
            Then look up from the standard normal table.</Step>
          <Step n={4}><strong>Type II error:</strong> <M t="\beta(\mu_1) = 1 - \pi(\mu_1)" /></Step>
          <DesmosGraph label="Power visualization: H₀ (left) vs H₁ (right)" bounds={{ left: 16, right: 22, bottom: -0.1, top: 1.3 }} height={200}
            expressions={[
              { latex: 'y = \\frac{1}{0.365\\sqrt{2\\pi}}e^{-\\frac{(x-19)^2}{2\\cdot 0.365^2}}', color: '#8B92FF', lineWidth: 2 },
              { latex: 'y = \\frac{1}{0.365\\sqrt{2\\pi}}e^{-\\frac{(x-19.5)^2}{2\\cdot 0.365^2}}', color: '#ff8c42', lineWidth: 2 },
              { latex: 'x = 19.6 \\{0 \\le y \\le 1.2\\}', color: '#ff4d4d', lineWidth: 2 },
              { latex: '(19, 1.15)', color: '#8B92FF', showLabel: true, label: 'H₀: μ=19', pointSize: 0, labelSize: 1 },
              { latex: '(19.5, 1.15)', color: '#ff8c42', showLabel: true, label: 'H₁: μ=19.5', pointSize: 0, labelSize: 1 },
            ]} />
          <Tip>Ways to increase power: (1) increase n, (2) increase {'α'}, (3) true {'μ'} further from {'μ₀'}, (4) decrease {'σ'}.</Tip>
          <WorkedExample exam="2025 Exam Q6b · 4 pts">
            <div className="rb-exam-q"><strong>Question:</strong> <em>Determine the power of the test in part a) if the actual mean is 19.5. (2 decimals)</em><br/><em>[From part a: n=30, {'σ'}=2, H{'₁'}: {'μ'} &gt; 19, {'α'}=5%]</em></div>
            <Step n={1}>Cutoff: <M t="\bar{X} \geq 19 + 1.645 \cdot \frac{2}{\sqrt{30}} = 19 + 1.645 \times 0.3651 = 19 + 0.601 = 19.601" /></Step>
            <Step n={2}>Under <M t="\mu = 19.5" />:
              <M t="\pi(19.5) = P\!\left(Z \geq \frac{19.601 - 19.5}{2/\sqrt{30}}\right) = P\!\left(Z \geq \frac{0.101}{0.365}\right) = P(Z \geq 0.28)" d />
              <M t="= 1 - \Phi(0.28) = 1 - 0.6103 = 0.39" /></Step>
            <p><strong>Answer:</strong> Power = 0.39. <M t="\beta = 1 - 0.39 = 0.61" />. (61% chance of failing to detect the true mean of 19.5 {'—'} quite low power.)</p>
          </WorkedExample>
        </Recipe>

        <Recipe id="p-value" title="p-Value Method" priority={3} points="3–4 pts">
          <p>Alternative to the rejection region approach. The p-value is the probability of getting a test statistic as extreme as (or more extreme than) the observed value, assuming H{'₀'} is true.</p>
          <Step n={1}><strong>Compute the observed test statistic</strong> (z{'_obs'} or t{'_obs'}).</Step>
          <Step n={2}><strong>Find the p-value:</strong>
            <br/>{'•'} Right-tailed: <M t="p = P(T \geq t_{\text{obs}})" />
            <br/>{'•'} Left-tailed: <M t="p = P(T \leq t_{\text{obs}})" />
            <br/>{'•'} Two-tailed: <M t="p = 2 \cdot P(T \geq |t_{\text{obs}}|)" /></Step>
          <Step n={3}><strong>From the t-table:</strong> find the df row, scan across the columns to bracket <M t="t_{\text{obs}}" />. The column headers give the tail probabilities, so you bracket p between two values.</Step>
          <Step n={4}><strong>Decision:</strong> <M t="p \leq \alpha" /> {'→'} reject H{'₀'}. <M t="p > \alpha" /> {'→'} do not reject.</Step>
          <Tip>For z-tests, you can find the exact p-value from the standard normal table. For t-tests, you can only bracket it.</Tip>
          <WorkedExample exam="2024 Exam Q7c · 3 pts">
            <div className="rb-exam-q"><strong>Setup:</strong> <em>[From Q7b: testing whether proportion of Psychology professors believing in consciousness in QM is at least 20% greater than Chemistry professors, z{'_obs'}=2.22]</em><br/><strong>Question:</strong> <em>Compute the p-value for the hypothesis test in the previous subquestion.</em></div>
            <Step n={1}>Right-tailed test, <M t="z_{\text{obs}} = 2.22" />.</Step>
            <Step n={2}><M t="p = P(Z \geq 2.22) = 1 - \Phi(2.22) = 1 - 0.9868 = 0.0132" /></Step>
            <Step n={3}>Since p = 0.0132 &lt; 0.025 = {'α'}: <strong>reject H{'₀'}</strong>.</Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="type-i" title="Type I Error Computation" priority={2} points="4 pts">
          <p><M t="\alpha = P(\text{reject } H_0 \mid H_0 \text{ true})" />. Given a rejection region, compute the probability of falling in it under H{'₀'}.</p>
          <Step n={1}><strong>Identify the rejection region</strong> from the problem. E.g., "reject if <M t="|X+Y| > 3" />".</Step>
          <Step n={2}><strong>Find the distribution of the test statistic under H{'₀'}.</strong> E.g., if H{'₀'} says <M t="W = X+Y \sim N(0,2)" />.</Step>
          <Step n={3}><strong>Standardize:</strong> <M t="Z = \frac{W}{\sqrt{\text{Var}(W)}} = \frac{W}{\sqrt{2}} \sim N(0,1)" /></Step>
          <Step n={4}><strong>Compute:</strong> For two-sided, use symmetry:
            <M t="P(|W| > 3) = 2P(W > 3) = 2P\!\left(Z > \frac{3}{\sqrt{2}}\right) = 2P(Z > 2.121) = 2(1 - 0.9830) = 0.034" d /></Step>
          <WorkedExample exam="Resit 2024 Q1f · 4 pts">
            <div className="rb-exam-q"><strong>Setup:</strong> <em><M t="f_{X,Y}(x,y) = \frac{1}{2\pi}e^{-\frac{1}{2}(x^2+y^2)}" />.</em><br/><strong>Question:</strong> <em>For this subquestion, suppose the distribution of (X,Y) is unknown and we do a hypothesis test for the distribution of (X,Y). According to the null hypothesis, the distribution of (X,Y) is the distribution used in the previous subquestions. We draw a sample of size one, i.e., a single observation of the pair (X,Y), and the rejection region is <M t="|X + Y| > 3" />. Compute the probability of a type I error.</em></div>
            <Step n={1}>Under H{'₀'}: X {'⊥'} Y, both N(0,1), so <M t="W = X+Y \sim N(0,2)" />.</Step>
            <Step n={2}><M t="\alpha = P(|W| > 3) = 2P(W > 3) = 2P\!\left(Z > \frac{3}{\sqrt{2}}\right) = 2P(Z > 2.121)" /></Step>
            <Step n={3}><M t="= 2(1 - \Phi(2.12)) = 2(1 - 0.9830) = 2 \times 0.0170 = 0.034" /></Step>
          </WorkedExample>
        </Recipe>

        {/* ═══════════ PREDICTIONS ═══════════ */}
        <div className="rb-part-divider rb-pred-divider">{'🔮'} Predictions {'·'} Never-Before-Tested Question Types</div>

        <div className="rb-pred-banner">
          <p><strong>These question types are on the formula sheet and in lectures/tutorials but have NEVER appeared on any of the 6 past exams.</strong> They are the most likely wildcards for tomorrow.</p>
        </div>

        <Recipe id="pred-general-order" title="General & Joint Order Statistics" priority={0} points="4–6 pts">
          <Prediction likelihood="high" />
          <p><strong>Why it{'\''}s likely:</strong> The formula sheet has the full general order statistic formula <M t="f_{Y_k}(y)" /> AND the joint order statistic formula <M t="f_{Y_i,Y_j}(y_i,y_j)" />, but every exam has only tested min/max. The median or range is overdue.</p>
          <Step n={1}><strong>k-th order statistic:</strong> For iid sample of size n with pdf f and CDF F:
            <M t="f_{Y_k}(y) = \frac{n!}{(k-1)!(n-k)!}\,[F(y)]^{k-1}\,[1-F(y)]^{n-k}\,f(y)" d /></Step>
          <Step n={2}><strong>Joint order statistic</strong> <M t="(Y_i, Y_j)" /> with <M t="i < j" />:
            <M t="f_{Y_i,Y_j}(y_i,y_j) = \frac{n!}{(i\!-\!1)!(j\!-\!i\!-\!1)!(n\!-\!j)!}\,f(y_i)f(y_j)\,[F(y_i)]^{i-1}[F(y_j)-F(y_i)]^{j-i-1}[1-F(y_j)]^{n-j}" d />
            for <M t="y_i < y_j" />.</Step>
          <Step n={3}><strong>Special cases:</strong>
            <br/>{'•'} <strong>Median:</strong> k = (n+1)/2 for odd n
            <br/>{'•'} <strong>Range:</strong> <M t="R = Y_n - Y_1" />, find via joint pdf of <M t="(Y_1, Y_n)" />
            <br/>{'•'} <strong>Min & Max joint:</strong> i=1, j=n simplifies nicely</Step>
          <Step n={4}><strong>After applying the formula,</strong> simplify and state the support. For Uniform(0,1): <M t="F(y)=y" />, <M t="f(y)=1" />, so the formula reduces to powers of y.</Step>
          <WorkedExample exam="Predicted Question">
            <div className="rb-exam-q"><em>Let <M t="X_1, \ldots, X_5" /> be a random sample from Uniform(0, 1).<br/>(a) Find the pdf of the sample median <M t="Y_3" />.<br/>(b) Find the joint pdf of <M t="(Y_1, Y_5)" /> and compute <M t="E[Y_5 - Y_1]" />.</em></div>
            <Step n={1}><strong>(a) Median:</strong> n=5, k=3, <M t="F(y)=y" />, <M t="f(y)=1" />:
              <M t="f_{Y_3}(y) = \frac{5!}{2!\,2!}\,y^2\,(1-y)^2 \cdot 1 = 30\,y^2(1-y)^2" d />
              for <M t="0 < y < 1" />.</Step>
            <Step n={2}><strong>(b) Joint (Y{'₁'}, Y{'₅'}):</strong> i=1, j=5, n=5:
              <M t="f_{Y_1,Y_5}(y_1,y_5) = \frac{5!}{0!\,3!\,0!}\cdot 1 \cdot 1 \cdot 1 \cdot (y_5-y_1)^3 \cdot 1 = 20(y_5-y_1)^3" d />
              for <M t="0 < y_1 < y_5 < 1" />.</Step>
            <Step n={3}><strong>E[Range]:</strong>
              <M t="E[Y_5-Y_1] = 20\int_0^1\!\int_0^{y_5}(y_5-y_1)^4\,dy_1\,dy_5 = 20\int_0^1\frac{y_5^5}{5}\,dy_5 = 4\cdot\frac{1}{6} = \frac{2}{3}" d /></Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="pred-pooled-t-delta" title="Pooled Two-Sample t-Test with Δ₀ ≠ 0" priority={0} points="5–7 pts">
          <Prediction likelihood="high" />
          <p><strong>Why it{'\''}s likely:</strong> Lecture 12 dedicates a full example to this (pay gap, {'Δ₀'}=10). The formula sheet has the pooled CI. Past exams tested the CI version but never a full 6-step hypothesis test with {'Δ₀'} {'≠'} 0 using pooled variance.</p>
          <Step n={1}><strong>Hypotheses:</strong> <M t="H_0: \mu_1 - \mu_2 = \Delta_0" /> vs <M t="H_1: \mu_1 - \mu_2 > \Delta_0" /> (or &lt; or {'≠'}).</Step>
          <Step n={2}><strong>Pooled variance:</strong> <M t="s_p^2 = \frac{(n_1-1)s_1^2 + (n_2-1)s_2^2}{n_1+n_2-2}" d /></Step>
          <Step n={3}><strong>Test statistic:</strong>
            <M t="T = \frac{(\bar{X}_1 - \bar{X}_2) - \Delta_0}{s_p\sqrt{1/n_1 + 1/n_2}} \sim t(n_1+n_2-2) \text{ under } H_0" d /></Step>
          <Step n={4}><strong>Assumptions:</strong> (1) Two independent random samples, (2) Both populations normal, (3) <M t="\sigma_1 = \sigma_2" /> (unknown). Verify (3) with F-test first if asked.</Step>
          <Step n={5}><strong>Rejection region from t-table</strong> with df = <M t="n_1 + n_2 - 2" />.</Step>
          <Warning>The <M t="\Delta_0" /> goes in the <strong>numerator</strong>, not the denominator. Common mistake: forgetting to subtract <M t="\Delta_0" /> from <M t="\bar{X}_1 - \bar{X}_2" />.</Warning>
          <WorkedExample exam="Predicted Question">
            <div className="rb-exam-q"><em>A company tests whether a new training program improves employee productivity by more than 5 units. Old method: <M t="n_1=16" />, <M t="\bar{x}_1=47.3" />, <M t="s_1=8.2" />. New method: <M t="n_2=21" />, <M t="\bar{x}_2=55.8" />, <M t="s_2=7.5" />. Assume equal variances and normality. Test at <M t="\alpha = 5\%" />.</em></div>
            <Step n={1}><M t="H_0: \mu_2 - \mu_1 = 5 \quad\text{vs}\quad H_1: \mu_2 - \mu_1 > 5,\quad \alpha = 0.05" /></Step>
            <Step n={2}><M t="s_p^2 = \frac{15 \times 67.24 + 20 \times 56.25}{35} = \frac{1008.6 + 1125.0}{35} = \frac{2133.6}{35} = 60.96" /></Step>
            <Step n={3}><M t="T = \frac{(55.8 - 47.3) - 5}{\sqrt{60.96}\sqrt{1/16 + 1/21}} = \frac{3.5}{7.808 \times 0.333} = \frac{3.5}{2.598} = 1.35" /></Step>
            <Step n={4}>df = 35. <M t="t_{0.05;\,35} \approx 1.690" />. Since 1.35 &lt; 1.690: <strong>not in rejection region</strong>.</Step>
            <Step n={5}><strong>Conclusion:</strong> Do not reject H{'₀'}. Insufficient evidence that the new program improves productivity by more than 5 units.</Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="pred-exact-binomial" title="Exact Binomial Test (Small Sample Proportion)" priority={0} points="4–6 pts">
          <Prediction likelihood="medium" />
          <p><strong>Why it{'\''}s likely:</strong> Lecture 12 explicitly teaches this as the small-sample alternative to the z-test for proportions. The darts example (n=25, X=17) is worked in full. Every past exam used the z-approximation {'—'} the exact test has never appeared.</p>
          <Step n={1}><strong>When to use:</strong> When <M t="n\hat{p} < 5" /> or <M t="n(1-\hat{p}) < 5" />, the normal approximation fails. Use the exact binomial.</Step>
          <Step n={2}><strong>Test statistic:</strong> <M t="X = \text{number of successes} \sim \text{Bin}(n, p_0) \text{ under } H_0" d />
            (X itself is the test statistic, not a z-score!)</Step>
          <Step n={3}><strong>p-value computation:</strong>
            <br/>{'•'} Right-tailed (<M t="H_1: p > p_0" />): <M t="p\text{-value} = P(X \geq x_{\text{obs}}) = \sum_{k=x_{\text{obs}}}^{n} \binom{n}{k} p_0^k (1-p_0)^{n-k}" />
            <br/>{'•'} Left-tailed (<M t="H_1: p < p_0" />): <M t="p\text{-value} = P(X \leq x_{\text{obs}}) = \sum_{k=0}^{x_{\text{obs}}} \binom{n}{k} p_0^k (1-p_0)^{n-k}" /></Step>
          <Step n={4}><strong>Decision:</strong> If p-value {'≤'} {'α'} {'→'} reject H{'₀'}.</Step>
          <Warning>You must compute the binomial probabilities <strong>term by term</strong> and sum them. Show each term for full marks.</Warning>
          <Tip>The complement can save work: <M t="P(X \geq k) = 1 - P(X \leq k-1)" />. Use whichever side has fewer terms.</Tip>
          <WorkedExample exam="Predicted Question">
            <div className="rb-exam-q"><em>A dart player claims to hit the bullseye more than 60% of the time. In 10 throws, they hit 8. Test this claim at <M t="\alpha = 5\%" />. Note: <M t="n(1-p_0) = 10 \times 0.4 = 4 < 5" />, so use the exact binomial test.</em></div>
            <Step n={1}><M t="H_0: p = 0.6 \quad\text{vs}\quad H_1: p > 0.6,\quad \alpha = 0.05" /></Step>
            <Step n={2}>Test statistic: <M t="X \sim \text{Bin}(10, 0.6)" /> under H{'₀'}. Observed: x = 8.</Step>
            <Step n={3}>p-value = <M t="P(X \geq 8) = P(X=8) + P(X=9) + P(X=10)" />
              <br/><M t="P(X=8) = \binom{10}{8}(0.6)^8(0.4)^2 = 45 \times 0.01680 \times 0.16 = 0.1209" />
              <br/><M t="P(X=9) = \binom{10}{9}(0.6)^9(0.4)^1 = 10 \times 0.01008 \times 0.4 = 0.0403" />
              <br/><M t="P(X=10) = (0.6)^{10} = 0.00605" />
              <br/>p-value = 0.1209 + 0.0403 + 0.0061 = <strong>0.1673</strong></Step>
            <Step n={4}>Since 0.1673 &gt; 0.05 = {'α'}: <strong>do not reject H{'₀'}</strong>. Insufficient evidence the bullseye rate exceeds 60%.</Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="pred-welch" title="Welch CI for Difference in Means (Unequal Variances)" priority={0} points="5–7 pts">
          <Prediction likelihood="medium" />
          <p><strong>Why it{'\''}s likely:</strong> The Welch formula with its complex df calculation is <strong>explicitly on the formula sheet</strong> but has never been tested. Every past exam that tested CI for difference in means used either known {'σ'} or assumed equal variances. This is the natural next step.</p>
          <Step n={1}><strong>When to use:</strong> {'σ₁'}, {'σ₂'} unknown and <strong>not assumed equal</strong> (e.g., F-test rejected, or problem says "do not assume equal variances").</Step>
          <Step n={2}><strong>Compute the Welch degrees of freedom:</strong>
            <M t="\nu = \frac{\left(\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}\right)^2}{\frac{(s_1^2/n_1)^2}{n_1-1} + \frac{(s_2^2/n_2)^2}{n_2-1}}" d />
            <strong>Round down</strong> to the nearest integer.</Step>
          <Step n={3}><strong>CI formula:</strong>
            <M t="(\bar{x}_1 - \bar{x}_2) \pm t_{\alpha/2,\,\nu} \cdot \sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}}" d /></Step>
          <Step n={4}><strong>Interpret:</strong> If 0 {'∉'} CI {'→'} means differ significantly.</Step>
          <Warning>The Welch df formula is messy {'—'} label each intermediate calculation clearly. <M t="s_1^2/n_1" /> and <M t="s_2^2/n_2" /> appear in both numerator and denominator.</Warning>
          <WorkedExample exam="Predicted Question">
            <div className="rb-exam-q"><em>Brand A batteries: <M t="n_A=10" />, <M t="\bar{x}_A=48.2" /> hrs, <M t="s_A=4.5" />. Brand B: <M t="n_B=15" />, <M t="\bar{x}_B=44.8" /> hrs, <M t="s_B=7.1" />. Variances may differ. Construct a 95% CI for <M t="\mu_A - \mu_B" />.</em></div>
            <Step n={1}><strong>Intermediate values:</strong>
              <br/><M t="s_A^2/n_A = 20.25/10 = 2.025" />, <M t="s_B^2/n_B = 50.41/15 = 3.361" /></Step>
            <Step n={2}><strong>Welch df:</strong>
              <M t="\nu = \frac{(2.025 + 3.361)^2}{\frac{(2.025)^2}{9} + \frac{(3.361)^2}{14}} = \frac{(5.386)^2}{\frac{4.101}{9} + \frac{11.296}{14}} = \frac{29.01}{0.456 + 0.807} = \frac{29.01}{1.263} = 22.97" d />
              Round down: <M t="\nu = 22" />.</Step>
            <Step n={3}><M t="t_{0.025;\,22} = 2.074" />, <M t="SE = \sqrt{5.386} = 2.321" />
              <M t="48.2 - 44.8 \pm 2.074 \times 2.321 = 3.4 \pm 4.81" d />
              <strong>CI: ({'−'}1.41, 8.21)</strong></Step>
            <Step n={4}>Since 0 {'∈'} CI: cannot conclude mean lifetimes differ at 95% level.</Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="pred-two-prop-equal" title="Two-Proportion Test with Δ₀ = 0" priority={0} points="5–6 pts">
          <Prediction likelihood="medium" />
          <p><strong>Why it{'\''}s likely:</strong> The resit 2025 tested {'Δ₀'} = 0.1 for proportions. A simpler version testing <M t="p_1 = p_2" /> (equality) has never appeared as a full 6-step test. Tutorial 12 exercise 8.24 practices exactly this.</p>
          <Step n={1}><strong>Hypotheses:</strong> <M t="H_0: p_1 - p_2 = 0" /> vs <M t="H_1: p_1 - p_2 \neq 0" /> (or one-sided).</Step>
          <Step n={2}><strong>Test statistic (same form as {'Δ₀'} {'≠'} 0):</strong>
            <M t="Z = \frac{\hat{p}_1 - \hat{p}_2}{\sqrt{\frac{\hat{p}_1(1-\hat{p}_1)}{n_1} + \frac{\hat{p}_2(1-\hat{p}_2)}{n_2}}}" d /></Step>
          <Step n={3}><strong>Check conditions:</strong> <M t="n_i\hat{p}_i \geq 5" /> and <M t="n_i(1-\hat{p}_i) \geq 5" /> for <strong>each</strong> sample.</Step>
          <Step n={4}>Standard 6-step procedure. State assumptions: independent samples, normal approximation valid.</Step>
          <Tip>When <M t="\Delta_0 = 0" />, the numerator simplifies to just <M t="\hat{p}_1 - \hat{p}_2" />. Much cleaner than the {'Δ₀'} {'≠'} 0 case.</Tip>
          <WorkedExample exam="Predicted Question">
            <div className="rb-exam-q"><em>A university compares pass rates: morning section: 72 out of 120 passed. Evening section: 58 out of 110 passed. Test whether pass rates differ at <M t="\alpha = 10\%" />.</em></div>
            <Step n={1}><M t="H_0: p_M - p_E = 0 \quad\text{vs}\quad H_1: p_M - p_E \neq 0,\quad \alpha = 0.10" /></Step>
            <Step n={2}><M t="\hat{p}_M = 72/120 = 0.600" />, <M t="\hat{p}_E = 58/110 = 0.527" />
              <br/>Check: <M t="120 \times 0.6 = 72 \geq 5" /> {'✓'}, <M t="120 \times 0.4 = 48 \geq 5" /> {'✓'}, <M t="110 \times 0.527 = 58 \geq 5" /> {'✓'}, <M t="110 \times 0.473 = 52 \geq 5" /> {'✓'}</Step>
            <Step n={3}><M t="Z = \frac{0.600 - 0.527}{\sqrt{\frac{0.6 \times 0.4}{120} + \frac{0.527 \times 0.473}{110}}} = \frac{0.073}{\sqrt{0.002000 + 0.002266}} = \frac{0.073}{0.0653} = 1.12" d /></Step>
            <Step n={4}>Two-tailed: reject if <M t="|z| \geq z_{0.05} = 1.645" />. Since |1.12| &lt; 1.645: <strong>do not reject H{'₀'}</strong>. Insufficient evidence that pass rates differ.</Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="pred-cov-matrix" title="Covariance Matrix & Multivariate Normal" priority={0} points="4–6 pts">
          <Prediction likelihood="medium" />
          <p><strong>Why it{'\''}s likely:</strong> The multivariate normal pdf with <M t="\Sigma^{-1}" /> is <strong>on the formula sheet</strong>. The covariance matrix appears in reader {'§'}5.4 and {'§'}5.7. It was on the midterm. The formula <M t="\text{Var}(\mathbf{a}\mathbf{X}^T) = \mathbf{a}\Sigma\mathbf{a}^T" /> connects linear combinations to matrix form.</p>
          <Step n={1}><strong>Covariance matrix <M t="\Sigma" /> for <M t="(X_1, \ldots, X_k)" />:</strong>
            <M t="\Sigma = \begin{pmatrix} \sigma_1^2 & \sigma_{12} & \cdots & \sigma_{1k} \\ \sigma_{21} & \sigma_2^2 & \cdots & \sigma_{2k} \\ \vdots & \vdots & \ddots & \vdots \\ \sigma_{k1} & \sigma_{k2} & \cdots & \sigma_k^2 \end{pmatrix}" d />
            where <M t="\sigma_{ij} = \text{Cov}(X_i, X_j)" /> and <M t="\sigma_{ii} = \text{Var}(X_i)" />.</Step>
          <Step n={2}><strong>Multivariate normal pdf:</strong>
            <M t="f_{\vec{X}}(\vec{x}) = \frac{1}{\sqrt{(2\pi)^k |\Sigma|}}\,\exp\!\left[-\tfrac{1}{2}(\vec{x}-\vec{\mu})^T \Sigma^{-1}(\vec{x}-\vec{\mu})\right]" d /></Step>
          <Step n={3}><strong>Variance of a linear combination:</strong> For <M t="W = a_1 X_1 + \ldots + a_k X_k" />:
            <M t="\text{Var}(W) = \mathbf{a}\,\Sigma\,\mathbf{a}^T = \sum_i a_i^2 \sigma_i^2 + 2\sum_{i<j} a_i a_j \sigma_{ij}" d /></Step>
          <Step n={4}><strong>For bivariate case (k=2):</strong> <M t="\Sigma = \begin{pmatrix} \sigma_X^2 & \rho\sigma_X\sigma_Y \\ \rho\sigma_X\sigma_Y & \sigma_Y^2 \end{pmatrix}" />, <M t="|\Sigma| = \sigma_X^2\sigma_Y^2(1-\rho^2)" /></Step>
          <Warning>If asked to "write down the covariance matrix": compute <M t="\text{Var}(X_i)" /> and <M t="\text{Cov}(X_i,X_j)" /> for each pair, then assemble the matrix. It{'\''}s symmetric: <M t="\sigma_{ij} = \sigma_{ji}" />.</Warning>
          <WorkedExample exam="Predicted Question">
            <div className="rb-exam-q"><em>Let <M t="(X,Y)" /> have BVN distribution with <M t="\mu_X=1, \mu_Y=3, \sigma_X=2, \sigma_Y=4, \rho=0.5" />.<br/>(a) Write down the covariance matrix <M t="\Sigma" />.<br/>(b) Find <M t="\text{Var}(2X - Y + 3)" />.</em></div>
            <Step n={1}><strong>(a)</strong> <M t="\text{Cov}(X,Y) = \rho\sigma_X\sigma_Y = 0.5 \times 2 \times 4 = 4" />
              <M t="\Sigma = \begin{pmatrix} 4 & 4 \\ 4 & 16 \end{pmatrix}" d /></Step>
            <Step n={2}><strong>(b)</strong> <M t="W = 2X - Y + 3" />, so <M t="\mathbf{a} = (2, -1)" />:
              <M t="\text{Var}(W) = 4(4) + 1(16) + 2(2)(-1)(4) = 16 + 16 - 16 = 16" d /></Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="pred-joint-mgf" title="Joint MGF & Finding Moments by Differentiation" priority={0} points="3–5 pts">
          <Prediction likelihood="medium" />
          <p><strong>Why it{'\''}s likely:</strong> Reader {'§'}5.6 teaches extracting E[X], E[XY], Cov(X,Y) from the joint MGF by partial differentiation. The joint MGF of BVN is on the formula sheet. Never tested as a standalone question.</p>
          <Step n={1}><strong>Joint MGF definition:</strong>
            <M t="M_{X,Y}(t_1, t_2) = E[e^{t_1 X + t_2 Y}]" d /></Step>
          <Step n={2}><strong>Extract moments by differentiation:</strong>
            <br/>{'•'} <M t="E[X] = \frac{\partial}{\partial t_1} M_{X,Y}(t_1, t_2)\Big|_{t_1=t_2=0}" />
            <br/>{'•'} <M t="E[Y] = \frac{\partial}{\partial t_2} M_{X,Y}(t_1, t_2)\Big|_{t_1=t_2=0}" />
            <br/>{'•'} <M t="E[XY] = \frac{\partial^2}{\partial t_1 \partial t_2} M_{X,Y}(t_1, t_2)\Big|_{t_1=t_2=0}" />
            <br/>{'•'} <M t="E[X^2] = \frac{\partial^2}{\partial t_1^2} M_{X,Y}(t_1, t_2)\Big|_{t_1=t_2=0}" /></Step>
          <Step n={3}><strong>Get marginal MGFs:</strong> <M t="M_X(t) = M_{X,Y}(t, 0)" /> and <M t="M_Y(t) = M_{X,Y}(0, t)" /></Step>
          <Step n={4}><strong>Independence test via MGF:</strong> X, Y independent <M t="\iff M_{X,Y}(t_1,t_2) = M_X(t_1) \cdot M_Y(t_2)" /></Step>
          <Tip><strong>BVN joint MGF:</strong> <M t="M_{X,Y}(t_1,t_2) = \exp\!\left[\mu_X t_1 + \mu_Y t_2 + \tfrac{1}{2}(\sigma_X^2 t_1^2 + \sigma_Y^2 t_2^2 + 2\rho\sigma_X\sigma_Y t_1 t_2)\right]" /></Tip>
          <WorkedExample exam="Predicted Question">
            <div className="rb-exam-q"><em>The joint MGF of (X,Y) is <M t="M_{X,Y}(t_1,t_2) = \frac{1}{(1-t_1)(1-t_2)(1-t_1-t_2)}" /> for <M t="t_1+t_2 < 1" />.<br/>Find E[X], E[Y], E[XY], and Cov(X,Y).</em></div>
            <Step n={1}><M t="\frac{\partial M}{\partial t_1} = \frac{1}{(1-t_1)^2(1-t_2)(1-t_1-t_2)} + \frac{1}{(1-t_1)(1-t_2)(1-t_1-t_2)^2}" />
              <br/>At <M t="t_1=t_2=0" />: <M t="E[X] = 1 + 1 = 2" /></Step>
            <Step n={2}>By symmetry: <M t="E[Y] = 2" /></Step>
            <Step n={3}><M t="\frac{\partial^2 M}{\partial t_1 \partial t_2}\Big|_{0,0}" />: differentiate again w.r.t. <M t="t_2" /> and evaluate. Result: <M t="E[XY] = 5" /></Step>
            <Step n={4}><M t="\text{Cov}(X,Y) = E[XY] - E[X]E[Y] = 5 - 4 = 1" /></Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="pred-multinomial" title="Multinomial Distribution" priority={0} points="3–5 pts">
          <Prediction likelihood="medium" />
          <p><strong>Why it{'\''}s likely:</strong> The multinomial PMF is <strong>on the formula sheet</strong> (first formula!). Reader {'§'}5.1 covers it. It extends the Binomial to k+1 categories. Never tested on any of the 6 exams.</p>
          <Step n={1}><strong>Setup:</strong> n independent trials, each has k+1 possible outcomes with probabilities <M t="p_1, \ldots, p_{k+1}" /> where <M t="\sum p_i = 1" />.</Step>
          <Step n={2}><strong>PMF:</strong> <M t="X_i" /> = count of outcome i:
            <M t="f(x_1,\ldots,x_k) = \frac{n!}{x_1!\,x_2!\,\cdots\,x_{k+1}!}\,p_1^{x_1}\,p_2^{x_2}\cdots p_{k+1}^{x_{k+1}}" d />
            where <M t="x_{k+1} = n - \sum_{i=1}^{k} x_i" />.</Step>
          <Step n={3}><strong>Key property:</strong> Each marginal is Binomial: <M t="X_j \sim \text{Bin}(n, p_j)" />.
            <br/>So <M t="E[X_j] = np_j" /> and <M t="\text{Var}(X_j) = np_j(1-p_j)" /></Step>
          <Step n={4}><strong>Covariance:</strong> <M t="\text{Cov}(X_i, X_j) = -np_i p_j" /> for <M t="i \neq j" /> (always negative!).</Step>
          <WorkedExample exam="Predicted Question">
            <div className="rb-exam-q"><em>A die is rolled 180 times. Let <M t="X_1" /> = number of 1{'\''}s, <M t="X_2" /> = number of 2{'\''}s, <M t="X_3" /> = number of other outcomes. Find <M t="P(X_1=30, X_2=28)" /> and <M t="\text{Cov}(X_1, X_2)" />.</em></div>
            <Step n={1}><M t="n=180" />, <M t="p_1=p_2=1/6" />, <M t="p_3=4/6" />. <M t="x_3 = 180-30-28 = 122" />.</Step>
            <Step n={2}><M t="P = \frac{180!}{30!\,28!\,122!}\left(\frac{1}{6}\right)^{30}\left(\frac{1}{6}\right)^{28}\left(\frac{4}{6}\right)^{122}" /></Step>
            <Step n={3}><M t="\text{Cov}(X_1,X_2) = -np_1 p_2 = -180 \cdot \frac{1}{6} \cdot \frac{1}{6} = -5" /></Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="pred-mv-hyper" title="Multivariate Hypergeometric Distribution" priority={0} points="3–4 pts">
          <Prediction likelihood="medium" />
          <p><strong>Why it{'\''}s likely:</strong> The multivariate hypergeometric PMF is <strong>on the formula sheet</strong> (second formula!). Reader {'§'}5.1 covers it. It extends the Hypergeometric to k+1 categories. Sampling without replacement from a categorized population.</p>
          <Step n={1}><strong>Setup:</strong> Population of N items in k+1 categories with <M t="M_1, \ldots, M_{k+1}" /> items each. Draw n items <strong>without replacement</strong>.</Step>
          <Step n={2}><strong>PMF:</strong>
            <M t="f(x_1,\ldots,x_k) = \frac{\binom{M_1}{x_1}\binom{M_2}{x_2}\cdots\binom{M_{k+1}}{x_{k+1}}}{\binom{N}{n}}" d />
            where <M t="x_{k+1} = n - \sum x_i" /> and <M t="M_{k+1} = N - \sum M_i" />.</Step>
          <Step n={3}><strong>Marginals:</strong> Each <M t="X_j \sim \text{Hyp}(n, M_j, N)" /> with <M t="E[X_j] = \frac{nM_j}{N}" />.</Step>
          <Tip>This is the "Multinomial but without replacement." If n/N is small, it approximates the Multinomial.</Tip>
          <WorkedExample exam="Predicted Question">
            <div className="rb-exam-q"><em>A box contains 20 balls: 8 red, 7 blue, 5 green. You draw 6 without replacement. Find <M t="P(X_R=3, X_B=2, X_G=1)" />.</em></div>
            <Step n={1}><M t="N=20,\; n=6,\; M_R=8,\; M_B=7,\; M_G=5" />.</Step>
            <Step n={2}><M t="P = \frac{\binom{8}{3}\binom{7}{2}\binom{5}{1}}{\binom{20}{6}} = \frac{56 \times 21 \times 5}{38760} = \frac{5880}{38760} = 0.1517" /></Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="pred-convolution" title="Convolution Formula for Sums" priority={0} points="4–5 pts">
          <Prediction likelihood="medium" />
          <p><strong>Why it{'\''}s likely:</strong> Reader {'§'}6.2 teaches the convolution as an alternative to the MGF method for finding the pdf of <M t="S = X + Y" />. When neither CDF nor MGF works cleanly, convolution is the go-to.</p>
          <Step n={1}><strong>Formula:</strong> For independent continuous X, Y with pdfs <M t="f_X" /> and <M t="f_Y" />:
            <M t="f_S(s) = \int_{-\infty}^{\infty} f_X(t)\,f_Y(s-t)\,dt" d />
            or equivalently <M t="f_S(s) = \int_{-\infty}^{\infty} f_X(s-u)\,f_Y(u)\,du" /></Step>
          <Step n={2}><strong>Limits:</strong> The integrand is nonzero only where <strong>both</strong> <M t="f_X(t) > 0" /> and <M t="f_Y(s-t) > 0" />. Use the supports to determine limits.</Step>
          <Step n={3}><strong>When to use:</strong> When you need the pdf of a sum but the MGF doesn{'\''}t simplify to a recognizable form (e.g., sum of Uniforms, or non-identical distributions).</Step>
          <Warning>The integration limits depend on s! You often get a <strong>piecewise</strong> answer.</Warning>
          <WorkedExample exam="Predicted Question">
            <div className="rb-exam-q"><em>Let <M t="X \sim \text{Unif}(0,1)" /> and <M t="Y \sim \text{Unif}(0,1)" /> be independent. Find the pdf of <M t="S = X + Y" /> using convolution.</em></div>
            <Step n={1}><M t="f_S(s) = \int_{-\infty}^{\infty} f_X(t)\,f_Y(s-t)\,dt = \int f_X(t)\,f_Y(s-t)\,dt" />
              <br/>Need <M t="0 \leq t \leq 1" /> AND <M t="0 \leq s-t \leq 1" />, i.e., <M t="s-1 \leq t \leq s" />.</Step>
            <Step n={2}><strong>Case 1: <M t="0 \leq s \leq 1" /></strong>: limits are <M t="0 \leq t \leq s" />.
              <M t="f_S(s) = \int_0^s 1 \cdot 1\, dt = s" d /></Step>
            <Step n={3}><strong>Case 2: <M t="1 < s \leq 2" /></strong>: limits are <M t="s-1 \leq t \leq 1" />.
              <M t="f_S(s) = \int_{s-1}^1 1\, dt = 2 - s" d /></Step>
            <Step n={4}><strong>Answer:</strong> <M t="f_S(s) = \begin{cases} s & 0 \leq s \leq 1 \\ 2-s & 1 < s \leq 2 \end{cases}" d />
              This is the <strong>triangular distribution</strong> on (0, 2).</Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="pred-unbiased" title="Unbiased Estimators & E[S²] = σ²" priority={0} points="3–6 pts">
          <Prediction likelihood="high" />
          <p><strong>Why it{'\''}s likely:</strong> Reader {'§'}7.2 covers unbiased estimation. The result <M t="E[S^2] = \sigma^2" /> (Theorem 6.10) is fundamental. Appeared on 2023 Q3c (constructing unbiased estimator). Also tested on midterm.</p>
          <Step n={1}><strong>Unbiased:</strong> An estimator <M t="\hat{\theta}" /> is <strong>unbiased</strong> for <M t="\theta" /> if <M t="E[\hat{\theta}] = \theta" />.</Step>
          <Step n={2}><strong>Key unbiased estimators:</strong>
            <br/>{'•'} <M t="E[\bar{X}] = \mu" /> {'→'} <M t="\bar{X}" /> is unbiased for <M t="\mu" />
            <br/>{'•'} <M t="E[S^2] = \sigma^2" /> {'→'} <M t="S^2 = \frac{1}{n-1}\sum(X_i - \bar{X})^2" /> is unbiased for <M t="\sigma^2" />
            <br/>{'•'} <M t="E[\hat{P}] = p" /> {'→'} <M t="\hat{P} = X/n" /> is unbiased for p
            <br/>{'•'} <M t="E[S] \neq \sigma" /> {'→'} S is <strong>biased</strong> for {'σ'}!</Step>
          <Step n={3}><strong>Computing S{'²'} from raw data:</strong>
            <M t="S^2 = \frac{1}{n-1}\left(\sum X_i^2 - n\bar{X}^2\right) = \frac{\sum X_i^2 - (\sum X_i)^2/n}{n-1}" d /></Step>
          <Step n={4}><strong>Constructing an unbiased estimator:</strong> If <M t="E[g(X)] = c\theta" />, then <M t="\hat{\theta} = g(X)/c" /> is unbiased.</Step>
          <Warning>The <M t="n-1" /> in <M t="S^2" /> is what makes it unbiased. If you divide by n instead, you get a <strong>biased</strong> estimator. This is why degrees of freedom = n{'−'}1.</Warning>
          <WorkedExample exam="Predicted Question">
            <div className="rb-exam-q"><em>Let <M t="X_1, \ldots, X_n" /> be a random sample from <M t="\text{Exp}(\lambda)" />. <br/>(a) Show that <M t="\bar{X}" /> is an unbiased estimator for <M t="1/\lambda" />.<br/>(b) Construct an unbiased estimator for <M t="\lambda" /> using <M t="S^2" /> and <M t="\bar{X}" />.</em></div>
            <Step n={1}><strong>(a)</strong> <M t="E[\bar{X}] = E[X_1] = 1/\lambda" />. Since <M t="E[\bar{X}] = 1/\lambda" />, <M t="\bar{X}" /> is unbiased for <M t="1/\lambda" />.</Step>
            <Step n={2}><strong>(b)</strong> For Exp({'λ'}): <M t="\text{Var}(X) = 1/\lambda^2" /> and <M t="E[X] = 1/\lambda" />, so <M t="E[X]^2 = 1/\lambda^2 = \text{Var}(X)" />.
              <br/>Since <M t="E[S^2] = \sigma^2 = 1/\lambda^2" /> and <M t="E[\bar{X}^2] = \text{Var}(\bar{X}) + (E[\bar{X}])^2 = \frac{1}{n\lambda^2} + \frac{1}{\lambda^2}" />:
              <br/>We know <M t="E[\bar{X}] = 1/\lambda" />, so <M t="1/\bar{X}" /> estimates {'λ'} but is <strong>biased</strong>.
              <br/>Instead: <M t="E[S^2] = 1/\lambda^2" /> and <M t="E[\bar{X}^2]" /> involves {'λ'}. A clean unbiased estimator for <M t="\lambda" /> is harder {'—'} but <M t="\bar{X}" /> being unbiased for <M t="1/\lambda" /> is the key result to show.</Step>
          </WorkedExample>
        </Recipe>

        {/* ═══════════ QUICK REFERENCE ═══════════ */}
        <div className="rb-part-divider">Quick Reference {'·'} Decision Flowchart</div>

        <div className="rb-recipe" id="flowchart">
          <div className="rb-recipe-head">
            <h3 className="rb-recipe-title">Which Test / CI Do I Use?</h3>
          </div>
          <div className="rb-recipe-body">
            <Diagram label="Master decision tree">{`  What are you testing?
  │
  ├── MEAN (μ)
  │   ├── σ known? → z-test / z-interval
  │   ├── σ unknown, n ≥ 30? → z-test (use s for σ)
  │   └── σ unknown, n < 30? → t-test (df = n-1)
  │       ⚠ Needs normality
  │
  ├── PROPORTION (p)
  │   ├── One proportion → z-test for p
  │   │   ⚠ Check np̂ ≥ 5
  │   └── Two proportions → z-test for p₁-p₂
  │       ⚠ Check np̂ ≥ 5 for EACH sample
  │
  ├── VARIANCE (σ²)
  │   ├── One variance → χ²-test
  │   └── Two variances → F-test
  │       ⚠ Both populations must be normal
  │
  └── DIFFERENCE IN MEANS (μ₁ - μ₂)
      ├── σ₁, σ₂ known → two-sample z-test
      ├── σ unknown, equal → pooled t-test (df = n₁+n₂-2)
      │   ⚠ First verify equal variances with F-test!
      └── σ unknown, unequal → Welch t-test`}</Diagram>

            <Diagram label="Transformation decision">{`  Want pdf of Z = g(X,Y)?
  │
  ├── Only ONE new variable (e.g., Z = Y/X)?
  │   └── CDF method: F_Z(z) = P(Z ≤ z), then differentiate
  │
  ├── TWO new variables (e.g., V = (X+Y)/2, W = X/2)?
  │   └── Jacobian method: f_{V,W} = f_{X,Y} · |J|
  │
  └── Sum of independent RVs (W = X₁ + ... + Xₙ)?
      └── MGF method: M_W(t) = ∏ M_{Xi}(t), recognize`}</Diagram>
          </div>
        </div>

        <footer className="rb-footer">
          <p>Verified against 5 exams (2022, 2023, 2024, 2025, resit 2024) and 4 tutorial sets (Ch. 5{'–'}8).</p>
          <p>Good luck tomorrow, Gabriel. You've got this.</p>
        </footer>
      </main>
    </div>
  )
}
