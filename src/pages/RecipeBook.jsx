import { useRef, useLayoutEffect, useState, useEffect, useCallback } from 'react'
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

function Recipe({ id, title, priority, points, children }) {
  return (
    <div className="rb-recipe" id={id}>
      <div className="rb-recipe-head">
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
  { id: 'draw-support', title: 'Drawing Support Regions' },
  { id: 'order-stats', title: 'Order Statistics (Min & Max)' },
  { id: 'bvn', title: 'Bivariate Normal Distribution' },
  { id: 'build-stats', title: 'Building Test Statistics from Z_i' },
  { id: 'ci-mean', title: 'Confidence Interval for Mean' },
  { id: 'ci-proportion', title: 'CI for Proportion' },
  { id: 'ci-variance', title: 'CI for Variance / Variance Ratio' },
  { id: 'ci-diff-means', title: 'CI for Difference in Means' },
  { id: 'sample-size', title: 'Minimum Sample Size' },
  { id: 'z-test', title: 'z-Test (σ known)' },
  { id: 't-test', title: 't-Test (σ unknown)' },
  { id: 'prop-test', title: 'Proportion Test' },
  { id: 'two-sample', title: 'Two-Sample z-Test' },
  { id: 'f-test', title: 'F-Test (Equal Variances)' },
  { id: 'power', title: 'Power & Type II Error' },
  { id: 'p-value', title: 'p-Value Method' },
  { id: 'type-i', title: 'Type I Error Computation' },
  { id: 'iterated-exp', title: 'Iterated Expectation' },
]

const sectionGroups = [
  { label: 'Part A · Joint Distributions', ids: ['joint-pdf', 'marginal-pdf', 'cond-dist', 'independence', 'cov-corr', 'discrete-joint', 'probs-from-table', 'linear-combo'] },
  { label: 'Part B · Transformations', ids: ['mgf-method', 'cdf-method', 'draw-support', 'order-stats', 'bvn', 'build-stats'] },
  { label: 'Part C · Confidence Intervals', ids: ['ci-mean', 'ci-proportion', 'ci-variance', 'ci-diff-means', 'sample-size'] },
  { label: 'Part D · Hypothesis Testing', ids: ['z-test', 't-test', 'prop-test', 'two-sample', 'f-test', 'power', 'p-value', 'type-i', 'iterated-exp'] },
]

export default function RecipeBook() {
  const [activeId, setActiveId] = useState(recipes[0].id)

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
        <div className="rb-toc">
          {sectionGroups.map(g => (
            <div key={g.label} className="rb-toc-group">
              <div className="rb-toc-group-label">{g.label}</div>
              {g.ids.map(id => {
                const r = recipes.find(x => x.id === id)
                return <button key={id} className={`rb-toc-item ${activeId === id ? 'active' : ''}`} onClick={() => scrollTo(id)}>{r.title}</button>
              })}
            </div>
          ))}
        </div>
      </nav>

      <main className="rb-main">
        <header className="rb-header">
          <h1 className="rb-title">Recipe <em>Book</em></h1>
          <p className="rb-subtitle">Step-by-step recipes for every exam question type. Prioritized by frequency across 5 past exams (2022{'–'}2025 + resit 2024). Each recipe includes the hardest worked example from actual exams.</p>
          <div className="rb-legend">
            <span className="rb-legend-item"><span className="rb-legend-dot" style={{background:'#ff4d4d'}} /> 5/5 Every exam</span>
            <span className="rb-legend-item"><span className="rb-legend-dot" style={{background:'#ff8c42'}} /> 4/5 Most exams</span>
            <span className="rb-legend-item"><span className="rb-legend-dot" style={{background:'#ffd166'}} /> 3/5 Frequent</span>
            <span className="rb-legend-item"><span className="rb-legend-dot" style={{background:'#8B92FF'}} /> 2/5 Occasional</span>
          </div>
        </header>

        {/* ═══════════ PART A: JOINT DISTRIBUTIONS ═══════════ */}
        <div className="rb-part-divider">Part A {'·'} Joint Distributions</div>

        <Recipe id="joint-pdf" title="Find Normalization Constant for Joint PDF" priority={5} points="3–5 pts">
          <p>Given <M t="f_{X,Y}(x,y) = c \cdot g(x,y)" /> on some support, find <M t="c" />.</p>
          <Step n={1}>
            <strong>Identify the support region.</strong> Write down the bounds carefully.
            <DesmosGraph
              label="Common support: triangle 0 < s < t"
              bounds={{ left: -0.3, right: 3, bottom: -0.3, top: 3 }}
              height={200}
              expressions={[
                { latex: 'y > x \\{x > 0\\}', color: '#8B92FF', lineWidth: 0 },
                { latex: 'y = x', color: '#8B92FF', lineWidth: 2 },
                { latex: '(0, 0)', color: '#ff8c42', showLabel: true, label: 'Origin', pointSize: 8 },
              ]}
            />
          </Step>
          <Step n={2}>
            <strong>Set up the double integral = 1.</strong>
            <M t="\iint_{\text{support}} c \cdot g(x,y)\, dx\, dy = 1" d />
          </Step>
          <Step n={3}>
            <strong>Choose integration order wisely.</strong> Draw the support to decide which order is easier.
            <p>For <M t="0 < s < t" />: outer <M t="\int_0^\infty dt" />, inner <M t="\int_0^t ds" /></p>
          </Step>
          <Step n={4}>
            <strong>Solve for <M t="c" />.</strong> Then verify <M t="f \geq 0" /> everywhere.
          </Step>
          <Warning>
            Always state: "Furthermore, <M t="f_{X,Y}(x,y) \geq 0" /> for all <M t="(x,y)" />, so this is a valid pdf." (1 free point!)
          </Warning>

          <WorkedExample exam="2024 Exam Q1">
            <p><strong>Problem:</strong> <M t="f_{X,Y}(x,y) = cxy" /> for <M t="0 < x < 1" />, <M t="ax < y < bx" /> where <M t="0 < a < b" />. Find <M t="c" />.</p>
            <DesmosGraph
              label="Support: ax < y < bx, 0 < x < 1 (shown with a=1, b=2)"
              bounds={{ left: -0.1, right: 1.2, bottom: -0.1, top: 2.2 }}
              height={220}
              expressions={[
                { latex: 'y > x \\{0 < x < 1\\}\\{y < 2x\\}', color: '#8B92FF', lineWidth: 0 },
                { latex: 'y = x \\{0 \\le x \\le 1\\}', color: '#ff8c42', lineWidth: 2 },
                { latex: 'y = 2x \\{0 \\le x \\le 1\\}', color: '#ff8c42', lineWidth: 2 },
                { latex: 'x = 1 \\{1 \\le y \\le 2\\}', color: '#ff8c42', lineWidth: 2, lineStyle: 'DASHED' },
                { latex: '(1, 1)', color: '#ffd166', showLabel: true, label: '(1,a)', pointSize: 7 },
                { latex: '(1, 2)', color: '#ffd166', showLabel: true, label: '(1,b)', pointSize: 7 },
              ]}
            />
            <Step n={1}>
              <M t="1 = \int_0^1 \int_{ax}^{bx} cxy\, dy\, dx = c\int_0^1 x \left[\frac{y^2}{2}\right]_{ax}^{bx} dx" d />
            </Step>
            <Step n={2}>
              <M t="= c\int_0^1 x \cdot \frac{b^2 x^2 - a^2 x^2}{2}\, dx = \frac{c(b^2 - a^2)}{2}\int_0^1 x^3\, dx" d />
            </Step>
            <Step n={3}>
              <M t="= \frac{c(b^2 - a^2)}{2} \cdot \frac{1}{4} = \frac{c(b^2 - a^2)}{8}" d />
            </Step>
            <p><strong>Answer:</strong> <M t="c = \dfrac{8}{b^2 - a^2}" d /></p>
          </WorkedExample>
        </Recipe>

        <Recipe id="marginal-pdf" title="Find Marginal PDF" priority={5} points="3–4 pts">
          <p>Given joint <M t="f_{X,Y}(x,y)" />, find <M t="f_X(x)" /> or <M t="f_Y(y)" />.</p>
          <Step n={1}>
            <strong>Integrate out the OTHER variable.</strong>
            <M t="f_X(x) = \int_{-\infty}^{\infty} f_{X,Y}(x,y)\, dy" d />
          </Step>
          <Step n={2}>
            <strong>Determine integration limits from the support.</strong> These depend on <M t="x" />!
            <DesmosGraph
              label="Support 0 < y < √x: to find f_X, integrate y from 0 to √x"
              bounds={{ left: -0.1, right: 1.2, bottom: -0.1, top: 1.2 }}
              height={200}
              expressions={[
                { latex: '0 \\le y \\le \\sqrt{x} \\{0 \\le x \\le 1\\}', color: '#8B92FF', lineWidth: 0 },
                { latex: 'y = \\sqrt{x} \\{0 \\le x \\le 1\\}', color: '#8B92FF', lineWidth: 2.5 },
                { latex: '(1, 1)', color: '#ffd166', showLabel: true, label: '(1,1)', pointSize: 7 },
              ]}
            />
          </Step>
          <Step n={3}>
            <strong>Evaluate the integral.</strong> State the support of the marginal.
          </Step>
          <Warning>
            The limits of integration for the inner variable <strong>depend on the outer variable</strong>. Draw the support to get them right. This is where most marks are lost.
          </Warning>

          <WorkedExample exam="2024 Exam Q1d">
            <p><strong>Problem:</strong> <M t="f_{X,Y} = cxy" /> on <M t="ax < y < bx,\; 0 < x < 1" />. Find <M t="f_Y(y)" />.</p>
            <p><strong>Key insight:</strong> The marginal has <strong>two cases</strong> because the integration limits for <M t="x" /> change depending on whether <M t="y" /> is small or large.</p>
            <Step n={1}>
              <strong>For <M t="f_Y(y)" />: integrate out x.</strong> Given <M t="y" />, x ranges where <M t="ax < y < bx" />, i.e., <M t="\frac{y}{b} < x < \frac{y}{a}" />.
            </Step>
            <Step n={2}>
              <strong>Case 1: <M t="0 < y \leq a" /></strong> {'—'} both limits <M t="y/b" /> and <M t="y/a" /> are in <M t="(0,1)" />:
              <M t="f_Y(y) = \int_{y/b}^{y/a} cxy\, dx = cy\left[\frac{x^2}{2}\right]_{y/b}^{y/a} = \frac{cy^3}{2}\left(\frac{1}{a^2} - \frac{1}{b^2}\right)" d />
            </Step>
            <Step n={3}>
              <strong>Case 2: <M t="a < y < b" /></strong> {'—'} upper limit clips at 1:
              <M t="f_Y(y) = \int_{y/b}^{1} cxy\, dx = \frac{cy}{2}\left(1 - \frac{y^2}{b^2}\right)" d />
            </Step>
            <Warning>This piecewise marginal is the <strong>hardest marginal</strong> across all 5 exams. Draw the support and trace a horizontal line at height y to see where it enters/exits.</Warning>
          </WorkedExample>
        </Recipe>

        <Recipe id="cond-dist" title="Conditional Distribution & E[Y|X=x]" priority={4} points="3–5 pts">
          <p>Find <M t="f_{Y|X}(y|x)" /> and/or <M t="E[Y|X=x]" />.</p>
          <Step n={1}><strong>Find the marginal</strong> <M t="f_X(x)" /> (if not already done).</Step>
          <Step n={2}>
            <strong>Apply the formula:</strong>
            <M t="f_{Y|X}(y|x) = \frac{f_{X,Y}(x,y)}{f_X(x)}" d />
          </Step>
          <Step n={3}><strong>State the conditional support.</strong> Given <M t="X = x" />, what values can <M t="Y" /> take?</Step>
          <Step n={4}>
            For <M t="E[Y|X=x]" />, compute:
            <M t="E[Y|X=x] = \int y \cdot f_{Y|X}(y|x)\, dy" d />
          </Step>
          <Tip><strong>Shortcut:</strong> If you recognize <M t="f_{Y|X}(y|x)" /> as a known distribution (e.g., Uniform), read off <M t="E[Y|X=x]" /> directly.</Tip>

          <WorkedExample exam="2024 Exam Q1e">
            <p><strong>Problem:</strong> With <M t="f_{X,Y} = cxy" /> on <M t="ax < y < bx" />, find <M t="E[Y|X=x]" />.</p>
            <Step n={1}>
              <strong>Marginal:</strong> <M t="f_X(x) = \int_{ax}^{bx} cxy\, dy = \frac{cx(b^2-a^2)x^2}{2} = \frac{c(b^2-a^2)}{2}x^3" />
            </Step>
            <Step n={2}>
              <strong>Conditional:</strong> <M t="f_{Y|X}(y|x) = \frac{cxy}{c(b^2-a^2)x^3/2} = \frac{2y}{(b^2-a^2)x^2}" /> for <M t="ax < y < bx" />
            </Step>
            <Step n={3}>
              <M t="E[Y|X=x] = \int_{ax}^{bx} y \cdot \frac{2y}{(b^2-a^2)x^2}\, dy = \frac{2}{(b^2-a^2)x^2} \cdot \frac{b^3x^3-a^3x^3}{3} = \frac{2(b^3-a^3)}{3(b^2-a^2)}x" d />
            </Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="independence" title="Independence Check" priority={4} points="2 pts">
          <p>Determine whether <M t="X" /> and <M t="Y" /> are independent.</p>
          <Step n={1}><strong>Check TWO conditions</strong> (both must hold):</Step>
          <Step n={2}>
            <strong>Condition 1:</strong> Support is a <strong>Cartesian product</strong> (rectangle).
            <DesmosGraph
              label="Independent (rectangle) vs Dependent (triangle)"
              bounds={{ left: -0.3, right: 2.5, bottom: -0.3, top: 1.5 }}
              height={180}
              expressions={[
                { latex: '0 < x < 1 \\{0 < y < 1\\}', color: '#4ade80', lineWidth: 0 },
                { latex: '(0.5, 0.5)', color: '#4ade80', showLabel: true, label: 'Independent', pointSize: 0, labelSize: 1 },
                { latex: 'y < x \\{x > 1.3\\}\\{x < 2.3\\}\\{y > 0\\}', color: '#ff4d4d', lineWidth: 0 },
                { latex: '(1.8, 0.3)', color: '#ff4d4d', showLabel: true, label: 'Dependent', pointSize: 0, labelSize: 1 },
                { latex: 'y = x \\{1.3 < x < 2.3\\}', color: '#ff4d4d', lineWidth: 2 },
              ]}
            />
          </Step>
          <Step n={3}><strong>Condition 2:</strong> Joint pdf <strong>factorizes</strong>: <M t="f_{X,Y}(x,y) = g(x) \cdot h(y)" />.</Step>
          <Step n={4}>
            <strong>Write the conclusion:</strong> "The support is [not] a Cartesian product {'⇒'} X and Y are [not] independent."
          </Step>
          <Warning>Non-rectangular support {'→'} <strong>immediately</strong> not independent. No further check needed.</Warning>

          <WorkedExample exam="2025 Exam Q2b">
            <p><strong>Problem:</strong> <M t="f_{X,Y} = 6xy" /> on <M t="0 < x < 1,\; 0 < y < \sqrt{x}" />. Independent?</p>
            <p><strong>Answer:</strong> The support <M t="\{(x,y): 0 < y < \sqrt{x},\; 0 < x < 1\}" /> is <strong>not</strong> a Cartesian product (it's bounded by a curve, not a rectangle). Therefore X and Y are <strong>not independent</strong>.</p>
          </WorkedExample>
        </Recipe>

        <Recipe id="cov-corr" title="Covariance & Correlation" priority={4} points="2–3 pts">
          <Step n={1}>
            <strong>Compute <M t="E[XY]" />:</strong>
            <M t="E[XY] = \iint xy \cdot f_{X,Y}(x,y)\, dx\, dy" d />
          </Step>
          <Step n={2}><strong>Compute <M t="E[X]" /> and <M t="E[Y]" /></strong> from marginals.</Step>
          <Step n={3}>
            <M t="\text{Cov}(X,Y) = E[XY] - E[X] \cdot E[Y]" d />
          </Step>
          <Step n={4}>
            <M t="\rho_{X,Y} = \frac{\text{Cov}(X,Y)}{\sigma_X \cdot \sigma_Y}" d />
          </Step>
          <Tip>If <M t="X, Y" /> are independent, then <M t="\text{Cov}(X,Y) = 0" />. But <M t="\text{Cov} = 0" /> does NOT imply independence!</Tip>

          <WorkedExample exam="2025 Exam Q1a">
            <p><strong>Problem:</strong> Products {'{'}1,2,3{'}'}, pick 2 without replacement. X = first, Y = second. Given <M t="E[XY] = \frac{11}{3}" />. Find Cov(X,Y).</p>
            <Step n={1}>By symmetry: <M t="E[X] = E[Y] = \frac{1+2+3}{3} = 2" /></Step>
            <Step n={2}><M t="\text{Cov}(X,Y) = E[XY] - E[X]E[Y] = \frac{11}{3} - 2 \cdot 2 = \frac{11}{3} - 4 = -\frac{1}{3} \approx -0.33" d /></Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="discrete-joint" title="Discrete Joint Distribution Table" priority={4} points="3 pts">
          <p>Build a joint PMF table or work with a given one.</p>
          <Step n={1}><strong>List all possible outcomes.</strong> For "pick 2 from {'{'}1,2,3{'}'} without replacement": all pairs (x,y) where x {'≠'} y.</Step>
          <Step n={2}><strong>Count outcomes and assign probabilities.</strong> Each pair has prob 1/6.</Step>
          <Step n={3}><strong>Fill in the table</strong> and compute marginal row/column sums.</Step>
          <Step n={4}><strong>Verify:</strong> All probabilities {'≥'} 0 and sum to 1.</Step>

          <WorkedExample exam="2025 Exam Q1">
            <p><strong>Given table</strong> (with preferences):</p>
            <Diagram label="Joint PMF table">
{`         X=1    X=2    X=3  | f_Y
  Y=1  |  0    0.11   0.04  | 0.15
  Y=2  | 0.21   0     0.15  | 0.36
  Y=3  | 0.30  0.19    0    | 0.49
  ─────┼─────────────────────┤
  f_X  | 0.51  0.30   0.19  | 1.00`}
            </Diagram>
            <p>Marginals: <M t="f_X(1)=0.51,\; f_X(2)=0.30,\; f_X(3)=0.19" /></p>
            <p><M t="f_Y(1)=0.15,\; f_Y(2)=0.36,\; f_Y(3)=0.49" /></p>
          </WorkedExample>
        </Recipe>

        <Recipe id="probs-from-table" title="Probabilities from Joint Tables" priority={4} points="3–4 pts">
          <p>Compute probabilities like <M t="P(X \leq 2)" />, <M t="P(X+Y \leq 3)" />, <M t="P(X \leq 2 | X-Y \leq 0)" />.</p>
          <Step n={1}><strong>Marginal:</strong> <M t="P(X \leq 2)" /> = sum all entries in columns X=1 and X=2.</Step>
          <Step n={2}><strong>Event:</strong> <M t="P(X+Y \leq 3)" /> = identify all cells where x+y {'≤'} 3, sum them.</Step>
          <Step n={3}>
            <strong>Conditional:</strong> <M t="P(A|B) = \frac{P(A \cap B)}{P(B)}" />
          </Step>

          <WorkedExample exam="2025 Exam Q1b">
            <p><strong>Using the table above:</strong></p>
            <Step n={1}><M t="P(X \leq 2) = 0 + 0.11 + 0.21 + 0 + 0.30 + 0.19 = 0.81" /></Step>
            <Step n={2}><M t="P(X+Y \leq 3)" />: cells where x+y{'≤'}3: (1,1)=0, (1,2)=0.21, (2,1)=0.11. Sum = <strong>0.32</strong></Step>
            <Step n={3}>
              <M t="P(X \leq 2 | X-Y \leq 0)" />: cells where X-Y{'≤'}0: (1,1),(1,2),(1,3),(2,2),(2,3). Sum = 0+0.21+0.30+0+0.19 = 0.70.
              Among those, X{'≤'}2: all of them! So P = 0.70/0.70 = <strong>1.00</strong>
            </Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="linear-combo" title="Mean & Variance of Linear Combinations" priority={4} points="3–4 pts">
          <Step n={1}>
            <strong>Mean is always linear:</strong>
            <M t="E[aX + bY] = aE[X] + bE[Y]" d />
          </Step>
          <Step n={2}>
            <strong>Variance formula:</strong>
            <M t="\text{Var}(aX + bY) = a^2\text{Var}(X) + b^2\text{Var}(Y) + 2ab\,\text{Cov}(X,Y)" d />
          </Step>
          <Step n={3}>If independent: <M t="\text{Cov} = 0" />, so just add the variances (scaled).</Step>
          <Tip><strong>For X {'−'} Y:</strong> Var(X{'−'}Y) = Var(X) + Var(Y) {'−'} 2Cov(X,Y). Note PLUS for variances.</Tip>

          <WorkedExample exam="2025 Exam Q1c">
            <p><strong>Problem:</strong> Find E[X{'−'}Y] and Var(X{'−'}Y) from the preference table.</p>
            <Step n={1}>
              <M t="E[X] = 1(0.51)+2(0.30)+3(0.19) = 1.68" />
              <br/><M t="E[Y] = 1(0.15)+2(0.36)+3(0.49) = 2.34" />
              <br/><M t="E[X-Y] = 1.68 - 2.34 = -0.66" />
            </Step>
            <Step n={2}>
              Build the PMF of D = X{'−'}Y directly: D takes values {'−'}2,{'−'}1,0,1,2.
              <br/><M t="E[D^2] = 4(0.04+0.30) + 1(0.11+0.15+0.19+0.21) + 0 = 1.36+0.66 = 2.02" />
              <br/><M t="\text{Var}(D) = E[D^2] - (E[D])^2 = 2.02 - (-0.66)^2 = 2.02 - 0.4356 = 1.58" />
            </Step>
          </WorkedExample>
        </Recipe>

        {/* ═══════════ PART B: TRANSFORMATIONS ═══════════ */}
        <div className="rb-part-divider">Part B {'·'} Transformations & Sampling</div>

        <Recipe id="mgf-method" title="MGF Method (Distribution of Sums)" priority={5} points="4–5 pts">
          <p>Find the distribution of <M t="W = X_1 + X_2 + \ldots + X_n" /> when independent.</p>
          <Step n={1}>
            <strong>Write the MGF of the sum:</strong>
            <M t="M_W(t) = E[e^{tW}] = \prod_{i=1}^n M_{X_i}(t)" d />
          </Step>
          <Step n={2}>
            <strong>State independence explicitly!</strong> "Since <M t="X_1, \ldots, X_n" /> are independent, <M t="M_W(t) = M_{X_1}(t) \cdots M_{X_n}(t)" />."
          </Step>
          <Step n={3}>
            <strong>Look up individual MGFs</strong> and multiply:
            <Diagram label="Key MGFs">
{`  Distribution     │  MGF M(t)
  ─────────────────┼──────────────────────
  N(μ, σ²)        │  exp(μt + ½σ²t²)
  Exp(λ)           │  λ/(λ-t),  t < λ
  Gamma(α, β)      │  (1 - t/β)^(-α)
  χ²(n)            │  (1 - 2t)^(-n/2)
  Poisson(λ)       │  exp(λ(eᵗ - 1))
  Binomial(n,p)    │  (1-p+peᵗ)ⁿ`}
            </Diagram>
          </Step>
          <Step n={4}><strong>Recognize the resulting MGF</strong> as a known distribution.</Step>
          <Warning>You MUST state "X and Y are independent, therefore the MGFs multiply." Points are lost without this.</Warning>

          <WorkedExample exam="2024 Exam Q4">
            <p><strong>Problem:</strong> <M t="X \sim \chi^2(n)" /> and <M t="Y \sim \chi^2(n)" /> independent. Define <M t="U = \frac{X+Y}{2}" />. Find distribution of U.</p>
            <Step n={1}>
              <M t="M_{X+Y}(t) = M_X(t) \cdot M_Y(t) = (1-2t)^{-n/2} \cdot (1-2t)^{-n/2} = (1-2t)^{-n}" d />
              <p>This is the MGF of <M t="\chi^2(2n)" />, so <M t="X + Y \sim \chi^2(2n)" />.</p>
            </Step>
            <Step n={2}>
              <M t="M_U(t) = M_{(X+Y)/2}(t) = M_{X+Y}(t/2) = (1 - 2 \cdot t/2)^{-n} = (1-t)^{-n}" d />
              <p>This is the MGF of <M t="\text{Gamma}(n, 1)" />.</p>
            </Step>
            <p><strong>Answer:</strong> <M t="U \sim \text{Gamma}(n, 1)" /></p>
          </WorkedExample>
        </Recipe>

        <Recipe id="cdf-method" title="CDF / Transformation Method" priority={4} points="5–6 pts">
          <p>Find the distribution of <M t="Z = g(X,Y)" />, e.g., <M t="Z = Y/X" />.</p>
          <Step n={1}><strong>Write the CDF:</strong> <M t="F_Z(z) = P(Z \leq z) = P(g(X,Y) \leq z)" /></Step>
          <Step n={2}><strong>Rewrite as a region in (x,y)-space.</strong> For <M t="Z = Y/X" />: <M t="P(Y \leq zX)" /></Step>
          <Step n={3}>
            <strong>Draw the support and shade the region.</strong> Check if multiple cases are needed.
            <DesmosGraph
              label="CDF method: Z = Y/X on support 0 < y < √x, 0 < x < 1"
              bounds={{ left: -0.05, right: 1.1, bottom: -0.05, top: 1.1 }}
              height={260}
              expressions={[
                { latex: '0 \\le y \\le \\sqrt{x} \\{0 \\le x \\le 1\\}', color: '#333', lineWidth: 0 },
                { latex: 'y = \\sqrt{x} \\{0 \\le x \\le 1\\}', color: '#8B92FF', lineWidth: 2.5 },
                { latex: 'y = 0.6x \\{0 \\le x \\le 1\\}', color: '#ff8c42', lineWidth: 2 },
                { latex: 'y \\le 0.6x \\{0 \\le y\\}\\{y \\le \\sqrt{x}\\}\\{0 \\le x \\le 1\\}', color: '#ff8c42', lineWidth: 0 },
                { latex: '(0.7, 0.42)', color: '#ff8c42', showLabel: true, label: 'y = zx (Case 1: z<1)', pointSize: 0, labelSize: 1 },
                { latex: '(1, 1)', color: '#ffd166', showLabel: true, label: '(1,1)', pointSize: 7 },
              ]}
            />
          </Step>
          <Step n={4}><strong>Integrate the joint pdf over the shaded region</strong> to get <M t="F_Z(z)" />.</Step>
          <Step n={5}><strong>Differentiate:</strong> <M t="f_Z(z) = F_Z'(z)" /></Step>
          <Warning><strong>Two cases are almost always needed!</strong> Where line <M t="y=zx" /> intersects the boundary determines the split.</Warning>

          <WorkedExample exam="2025 Exam Q2c">
            <p><strong>Problem:</strong> <M t="f_{X,Y} = 6xy" /> on <M t="0 < x < 1,\; 0 < y < \sqrt{x}" />. Find pdf of <M t="Z = Y/X" />.</p>
            <Step n={1}>
              <strong>Case 1: <M t="0 < z < 1" />.</strong> Line <M t="y = zx" /> intersects <M t="y = \sqrt{x}" /> at <M t="x = 1/z^2" /> (outside [0,1] when z &lt; 1).
              <M t="F_Z(z) = \int_0^1 \int_0^{zx} 6xy\, dy\, dx = \int_0^1 6x \cdot \frac{z^2 x^2}{2}\, dx = 3z^2 \int_0^1 x^3\, dx = \frac{3z^2}{4}" d />
            </Step>
            <Step n={2}>
              <strong>Case 2: <M t="z \geq 1" />.</strong> Line <M t="y = zx" /> intersects <M t="y = \sqrt{x}" /> at <M t="x = 1/z^2 \leq 1" />. Need to split:
              <M t="F_Z(z) = \int_0^{1/z^2}\!\int_0^{zx} 6xy\,dy\,dx + \int_{1/z^2}^1\!\int_0^{\sqrt{x}} 6xy\,dy\,dx = \frac{3}{4z^4} + \left(1 - \frac{1}{z^4} + \frac{1}{4z^4}\right) = 1 - \frac{1}{4z^4}" d />
            </Step>
            <Step n={3}>
              <strong>Differentiate:</strong>
              <M t="f_Z(z) = \begin{cases} \frac{3z}{2} & 0 < z < 1 \\ \frac{1}{z^5} & z \geq 1 \end{cases}" d />
            </Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="draw-support" title="Drawing Support Regions" priority={3} points="2 pts">
          <p>Draw the region where <M t="f_{X,Y}(x,y) > 0" />.</p>
          <Step n={1}><strong>Identify all inequalities</strong> from the pdf definition.</Step>
          <Step n={2}><strong>Plot boundary curves.</strong> Label axes, mark key points.</Step>
          <Step n={3}><strong>Shade the interior.</strong></Step>
          <DesmosGraph
            label="Example: 0 < y < √x, 0 < x < 1"
            bounds={{ left: -0.1, right: 1.2, bottom: -0.1, top: 1.2 }}
            height={220}
            expressions={[
              { latex: '0 \\le y \\le \\sqrt{x} \\{0 \\le x \\le 1\\}', color: '#8B92FF', lineWidth: 0 },
              { latex: 'y = \\sqrt{x} \\{0 \\le x \\le 1\\}', color: '#8B92FF', lineWidth: 2.5 },
              { latex: '(1, 1)', color: '#ffd166', showLabel: true, label: '(1,1)', pointSize: 8 },
              { latex: '(0.5, 0)', color: '#8B92FF', showLabel: true, label: 'f > 0', pointSize: 0, labelSize: 2 },
            ]}
          />
          <Tip>Worth 2 easy points. Label axes, mark boundary equations, shade the region, label at least one boundary point.</Tip>
        </Recipe>

        <Recipe id="order-stats" title="Order Statistics (Min & Max)" priority={4} points="4–5 pts">
          <p>Given iid <M t="X_1, \ldots, X_n" /> with CDF <M t="F" />, find pdf of max or min.</p>
          <Step n={1}>
            <strong>Maximum <M t="V = \max" />:</strong>
            <M t="F_V(v) = [F(v)]^n \quad\Rightarrow\quad f_V(v) = n[F(v)]^{n-1} f(v)" d />
          </Step>
          <Step n={2}>
            <strong>Minimum <M t="W = \min" />:</strong>
            <M t="F_W(w) = 1 - [1-F(w)]^n \quad\Rightarrow\quad f_W(w) = n[1-F(w)]^{n-1} f(w)" d />
          </Step>
          <Step n={3}><strong>Substitute the specific distribution's F and f.</strong></Step>
          <Step n={4}><strong>E[V] and E[W]:</strong> Integrate or use symmetry.</Step>

          <WorkedExample exam="2025 Exam Q3">
            <p><strong>Problem:</strong> <M t="f(x) = 2/x^3" /> for <M t="x \geq 1" /> (Pareto). Find pdf of <M t="Y_1 = \min(X_1,\ldots,X_n)" />.</p>
            <DesmosGraph
              label="Pareto pdf: f(x) = 2/x³ for x ≥ 1"
              bounds={{ left: 0, right: 4, bottom: -0.1, top: 2.5 }}
              height={180}
              expressions={[
                { latex: 'y = \\frac{2}{x^3} \\{x \\ge 1\\}', color: '#8B92FF', lineWidth: 2.5 },
                { latex: '(1, 2)', color: '#ffd166', showLabel: true, label: '(1, 2)', pointSize: 7 },
              ]}
            />
            <Step n={1}>
              <strong>CDF:</strong> <M t="F(x) = \int_1^x \frac{2}{t^3}\, dt = 1 - \frac{1}{x^2}" /> for <M t="x \geq 1" />.
            </Step>
            <Step n={2}>
              <strong>Min formula:</strong> <M t="P(Y_1 > y) = P(\text{all } X_i > y) = [1-F(y)]^n = \left(\frac{1}{y^2}\right)^n = \frac{1}{y^{2n}}" />
            </Step>
            <Step n={3}>
              <M t="F_{Y_1}(y) = 1 - \frac{1}{y^{2n}}" />, so <M t="f_{Y_1}(y) = \frac{2n}{y^{2n+1}}" /> for <M t="y \geq 1" />
            </Step>
            <p><strong>Answer:</strong> <M t="f_{Y_1}(y) = \dfrac{2n}{y^{2n+1}}" /> for <M t="y \geq 1" /> {'—'} still Pareto-type!</p>
          </WorkedExample>
        </Recipe>

        <Recipe id="bvn" title="Bivariate Normal Distribution" priority={2} points="3–4 pts">
          <Step n={1}>
            <strong>Recognize the BVN form</strong> and read off <M t="\mu_X, \mu_Y, \sigma_X, \sigma_Y, \rho" />.
          </Step>
          <Step n={2}><strong>Marginals are normal:</strong> <M t="X \sim N(\mu_X, \sigma_X^2)" />, <M t="Y \sim N(\mu_Y, \sigma_Y^2)" />.</Step>
          <Step n={3}><strong>If <M t="\rho = 0" />{'→'} X, Y independent</strong> (special BVN property).</Step>
          <Tip><strong>Resit 2024:</strong> <M t="f = \frac{1}{2\pi}e^{-\frac{1}{2}(x^2+y^2)}" />{'→'} standard BVN with {'ρ'}=0 {'→'} X{'⊥'}Y {'→'} everything simplifies.</Tip>
        </Recipe>

        <Recipe id="build-stats" title="Building Test Statistics from Standard Normals" priority={2} points="5 pts">
          <p>Given <M t="X_i \sim N(i, i^2)" />, construct chi-squared and t statistics.</p>
          <Step n={1}>
            <strong>Standardize:</strong> <M t="Z_i = \frac{X_i - i}{\sqrt{i^2}} = \frac{X_i - i}{i} \sim N(0,1)" />
          </Step>
          <Step n={2}>
            <strong>Chi-squared:</strong> <M t="V = Z_1^2 + Z_2^2 + Z_3^2 + Z_4^2 \sim \chi^2(4)" />
          </Step>
          <Step n={3}>
            <strong>t-distribution:</strong> Split into Z (numerator) and U/{'ν'} (denominator):
            <M t="T = \frac{Z_1}{\sqrt{(Z_3^2 + Z_4^2)/2}} \sim t(2)" d />
          </Step>
          <Step n={4}><strong>State independence.</strong> "Z{'₁'} and (Z{'₃'},Z{'₄'}) are independent since they come from independent X{'ᵢ'}'s."</Step>

          <WorkedExample exam="2025 Exam Q4">
            <p><strong>Problem:</strong> <M t="X_i \sim N(i, i^2)" /> for i=1,2,3,4 independent. Build <M t="\chi^2(4)" /> and <M t="t(2)" />.</p>
            <Step n={1}>
              <M t="Z_i = \frac{X_i - i}{i} \sim N(0,1)" /> for each i. These are independent.
            </Step>
            <Step n={2}>
              <M t="\chi^2(4): \quad V = Z_1^2 + Z_2^2 + Z_3^2 + Z_4^2 = \left(\frac{X_1-1}{1}\right)^2 + \left(\frac{X_2-2}{2}\right)^2 + \left(\frac{X_3-3}{3}\right)^2 + \left(\frac{X_4-4}{4}\right)^2" d />
            </Step>
            <Step n={3}>
              <M t="t(2): \quad T = \frac{Z_1}{\sqrt{(Z_3^2+Z_4^2)/2}}" /> since <M t="Z_1 \sim N(0,1)" /> and <M t="Z_3^2+Z_4^2 \sim \chi^2(2)" /> are independent.
            </Step>
          </WorkedExample>
        </Recipe>

        {/* ═══════════ PART C: CONFIDENCE INTERVALS ═══════════ */}
        <div className="rb-part-divider">Part C {'·'} Confidence Intervals</div>

        <Recipe id="ci-mean" title="CI for Mean" priority={5} points="3–4 pts">
          <Diagram label="Decision flowchart">
{`  Is σ known?
  ├── YES → z-interval
  │         x̄ ± z_{α/2} · σ/√n
  │
  └── NO → Is n ≥ 30?
            ├── YES → z-interval (use s for σ)
            │         x̄ ± z_{α/2} · s/√n
            └── NO → t-interval (df = n-1)
                      x̄ ± t_{α/2, n-1} · s/√n
                      ⚠ Requires normality assumption`}
          </Diagram>
          <Step n={1}><strong>Identify:</strong> {'σ'} known or unknown? Sample size n? Confidence level?</Step>
          <Step n={2}><strong>Find critical value:</strong> <M t="z_{\alpha/2}" /> or <M t="t_{\alpha/2, n-1}" /></Step>
          <Step n={3}>
            <M t="\bar{x} \pm (\text{critical value}) \times \frac{\sigma \text{ or } s}{\sqrt{n}}" d />
          </Step>
          <Step n={4}><strong>State assumptions:</strong> random sample, normality (for t) or CLT (for z with n{'≥'}30).</Step>

          <WorkedExample exam="2025 Exam Q6">
            <p><strong>Context:</strong> n=30, <M t="\bar{x}=20" />, {'σ'}=2. The z-test framework gives the CI:</p>
            <p><M t="95\%\text{ CI}: 20 \pm 1.96 \cdot \frac{2}{\sqrt{30}} = 20 \pm 0.72 = (19.28, 20.72)" d /></p>
          </WorkedExample>
        </Recipe>

        <Recipe id="ci-proportion" title="CI for Proportion" priority={4} points="3–5 pts">
          <Step n={1}><strong>Compute <M t="\hat{p} = x/n" /></strong></Step>
          <Step n={2}><strong>Check:</strong> <M t="n\hat{p} \geq 5" /> and <M t="n(1-\hat{p}) \geq 5" /></Step>
          <Step n={3}>
            <M t="\hat{p} \pm z_{\alpha/2} \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}" d />
          </Step>
          <Step n={4}><strong>Interpret:</strong> If testing <M t="p > 0.5" />, check if 0.5 is in the interval.</Step>

          <WorkedExample exam="2025 Exam Q7a">
            <p><strong>Problem:</strong> Unilever: 128 positive days out of 245. Test if <M t="p_U > 0.5" /> using 95% CI.</p>
            <Step n={1}><M t="\hat{p} = 128/245 = 0.5224" /></Step>
            <Step n={2}>
              <M t="95\%\text{ CI}: 0.5224 \pm 1.96\sqrt{\frac{0.5224 \cdot 0.4776}{245}} = 0.5224 \pm 0.0625 = (0.4599,\; 0.5849)" d />
            </Step>
            <Step n={3}>
              Since <M t="0.5 \in (0.4599, 0.5849)" />, we <strong>cannot conclude</strong> that <M t="p_U > 0.5" />.
            </Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="ci-variance" title="CI for Variance / Variance Ratio" priority={3} points="3–5 pts">
          <Step n={1}>
            <strong>Single variance:</strong>
            <M t="\left(\frac{(n-1)s^2}{\chi^2_{\alpha/2}},\; \frac{(n-1)s^2}{\chi^2_{1-\alpha/2}}\right)" d />
          </Step>
          <Step n={2}>
            <strong>Variance ratio</strong> <M t="\sigma_1^2/\sigma_2^2" />:
            <M t="\left(\frac{s_1^2}{s_2^2} \cdot \frac{1}{F_{\alpha/2;\, n_1-1,\, n_2-1}},\;\; \frac{s_1^2}{s_2^2} \cdot F_{\alpha/2;\, n_2-1,\, n_1-1}\right)" d />
          </Step>
          <Step n={3}>If 1 {'∈'} CI for ratio {'→'} cannot conclude variances differ.</Step>
          <Warning><strong>Assumption:</strong> Both populations must be normally distributed. Always state this!</Warning>

          <WorkedExample exam="2025 Exam Q5a">
            <p><strong>Problem:</strong> Machine A: <M t="s_A=2, n_A=41" />. Machine B: <M t="s_B=2.5, n_B=61" />. 90% CI for <M t="\sigma_A^2/\sigma_B^2" />.</p>
            <Step n={1}>
              <M t="\frac{s_A^2}{s_B^2} = \frac{4}{6.25} = 0.64" />
            </Step>
            <Step n={2}>
              <M t="F_{0.05;\,40,60} = 1.53" /> and <M t="F_{0.05;\,60,40} = 1.57" /> from tables.
            </Step>
            <Step n={3}>
              <M t="\text{CI}: \left(\frac{0.64}{1.53},\; 0.64 \times 1.57\right) = (0.42,\; 1.00)" d />
              <p>Since 1 is <em>just barely</em> in the CI {'→'} cannot conclude Machine A is more precise at 90% level.</p>
            </Step>
            <Warning>The question says "do we need normality?" {'—'} <strong>YES</strong>, F-distribution CI requires both populations to be normal.</Warning>
          </WorkedExample>
        </Recipe>

        <Recipe id="ci-diff-means" title="CI for Difference in Means" priority={3} points="3–4 pts">
          <Diagram label="Which CI to use?">
{`  σ₁, σ₂ known? → z-interval
    (x̄₁ - x̄₂) ± z_{α/2} √(σ₁²/n₁ + σ₂²/n₂)

  σ unknown, large n → z-interval (use s)

  σ unknown, small n → pooled t-interval
    (requires equal variances + normality)`}
          </Diagram>
          <Step n={1}><strong>Point estimate:</strong> <M t="\bar{x}_1 - \bar{x}_2" /></Step>
          <Step n={2}><strong>SE:</strong> <M t="\sqrt{\sigma_1^2/n_1 + \sigma_2^2/n_2}" /></Step>
          <Step n={3}><M t="(\bar{x}_1 - \bar{x}_2) \pm z_{\alpha/2} \cdot SE" d /></Step>

          <WorkedExample exam="2024 Exam Q7a">
            <p><strong>Problem:</strong> Psychology: 39/50 Yes. Chemistry: 16/40 Yes (24/40 No). 95% CI for <M t="p_P - p_C" />.</p>
            <Step n={1}><M t="\hat{p}_P = 39/50 = 0.78" />, <M t="\hat{p}_C = 16/40 = 0.40" />, diff = 0.38</Step>
            <Step n={2}>
              <M t="SE = \sqrt{\frac{0.78 \cdot 0.22}{50} + \frac{0.40 \cdot 0.60}{40}} = \sqrt{0.003432 + 0.006} = \sqrt{0.009432} = 0.0971" d />
            </Step>
            <Step n={3}><M t="0.38 \pm 1.96 \cdot 0.0971 = (0.19,\; 0.57)" /></Step>
            <p>Since 0 {'∉'} CI {'→'} significant difference in proportions.</p>
          </WorkedExample>
        </Recipe>

        <Recipe id="sample-size" title="Minimum Sample Size" priority={2} points="2–3 pts">
          <Step n={1}>
            <strong>From CI half-width E:</strong>
            <M t="n = \left(\frac{z_{\alpha/2} \cdot \sigma}{E}\right)^2" d />
          </Step>
          <Step n={2}>
            <strong>For proportions:</strong>
            <M t="n = \frac{z_{\alpha/2}^2 \cdot \hat{p}(1-\hat{p})}{E^2}" d />
          </Step>
          <Step n={3}><strong>Always round UP</strong> to the nearest integer.</Step>
        </Recipe>

        {/* ═══════════ PART D: HYPOTHESIS TESTING ═══════════ */}
        <div className="rb-part-divider">Part D {'·'} Hypothesis Testing</div>

        <Recipe id="z-test" title="z-Test for Mean (σ known)" priority={5} points="5–6 pts">
          <p>The most common test. Follow the <strong>6-step recipe</strong> exactly.</p>
          <Step n={1}>
            <strong>1. Hypotheses:</strong>
            <M t="H_0: \mu = \mu_0 \quad \text{vs} \quad H_1: \mu > \mu_0" d />
            <p>State <M t="\alpha" />.</p>
          </Step>
          <Step n={2}>
            <strong>2. Test statistic:</strong>
            <M t="Z = \frac{\bar{X} - \mu_0}{\sigma/\sqrt{n}} \sim N(0,1) \text{ under } H_0" d />
          </Step>
          <Step n={3}>
            <strong>3. Assumptions:</strong> random sample, <M t="n \geq 30" /> (CLT) or population normal, {'σ'} known.
          </Step>
          <Step n={4}>
            <strong>4. Rejection region:</strong>
            <Diagram label="By alternative type">
{`  H₁: μ > μ₀  →  Reject if z ≥ z_α        (right-tailed)
  H₁: μ < μ₀  →  Reject if z ≤ -z_α       (left-tailed)
  H₁: μ ≠ μ₀  →  Reject if |z| ≥ z_{α/2}  (two-tailed)`}
            </Diagram>
          </Step>
          <Step n={5}>
            <strong>5. Compute:</strong> <M t="z_{\text{obs}} = \frac{\bar{x} - \mu_0}{\sigma/\sqrt{n}}" />. Is it in rejection region?
          </Step>
          <Step n={6}>
            <strong>6. Conclusion in words:</strong> "At significance level {'α'}, we [reject/do not reject] H{'₀'}."
          </Step>
          <Warning>Don't forget step 3 (assumptions)! Worth 1 point. And always write the conclusion <strong>in context</strong>.</Warning>

          <WorkedExample exam="2025 Exam Q6a">
            <p><strong>Problem:</strong> n=30, <M t="\bar{x}=20" />, {'σ'}=2. Test <M t="H_1: \mu > 19" /> at {'α'}=5%.</p>
            <Step n={1}><M t="H_0: \mu = 19 \quad\text{vs}\quad H_1: \mu > 19, \quad \alpha = 0.05" /></Step>
            <Step n={2}><M t="Z = \frac{\bar{X} - 19}{2/\sqrt{30}} \sim N(0,1)" /> under H{'₀'}.</Step>
            <Step n={3}>Assumptions: random sample {'✓'}, n=30 so CLT applies {'✓'}, {'σ'}=2 known {'✓'}.</Step>
            <Step n={4}>Reject if <M t="z \geq z_{0.05} = 1.645" /></Step>
            <Step n={5}><M t="z_{\text{obs}} = \frac{20 - 19}{2/\sqrt{30}} = \frac{1}{0.3651} = 2.74" />. Since 2.74 {'≥'} 1.645 {'→'} <strong>in rejection region</strong>.</Step>
            <Step n={6}>At 5% significance, we <strong>reject H{'₀'}</strong>. There is sufficient evidence that {'μ'} &gt; 19.</Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="t-test" title="t-Test for Mean (σ unknown)" priority={3} points="3–4 pts">
          <Step n={1}>
            <strong>Same 6-step recipe</strong>, but use:
            <M t="T = \frac{\bar{X} - \mu_0}{S/\sqrt{n}} \sim t(n-1)" d />
          </Step>
          <Step n={2}><strong>Critical values from t-table</strong> with df = n{'−'}1.</Step>
          <Step n={3}><strong>Extra assumption:</strong> population approximately normal when n is small.</Step>

          <WorkedExample exam="2025 Exam Q6c">
            <p><strong>Problem:</strong> Same setup but {'σ'} unknown, s=2.2. Find p-value and conclude at {'α'}=1%.</p>
            <Step n={1}><M t="t_{\text{obs}} = \frac{20 - 19}{2.2/\sqrt{30}} = \frac{1}{0.4017} = 2.490" /></Step>
            <Step n={2}>
              df = 29. From t-table: <M t="t_{0.01, 29} = 2.462" /> and <M t="t_{0.005, 29} = 2.756" />.
              <br/>Since 2.462 &lt; 2.490 &lt; 2.756 {'→'} <M t="0.005 < p < 0.01" />.
            </Step>
            <Step n={3}>Since p &lt; 0.01 = {'α'} {'→'} <strong>reject H{'₀'}</strong>.</Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="prop-test" title="Proportion Test" priority={4} points="5–7 pts">
          <Step n={1}>
            <M t="H_0: p = p_0 \quad\text{vs}\quad H_1: p > p_0" d />
          </Step>
          <Step n={2}>
            <M t="Z = \frac{\hat{p} - p_0}{\sqrt{p_0(1-p_0)/n}} \sim N(0,1)" d />
          </Step>
          <Step n={3}><strong>Check:</strong> <M t="np_0 \geq 5" /> and <M t="n(1-p_0) \geq 5" /></Step>
          <Step n={4}>
            <strong>Two proportions</strong> with offset <M t="\Delta_0" />:
            <M t="Z = \frac{(\hat{p}_1 - \hat{p}_2) - \Delta_0}{\sqrt{\frac{\hat{p}_1(1-\hat{p}_1)}{n_1} + \frac{\hat{p}_2(1-\hat{p}_2)}{n_2}}}" d />
          </Step>
          <Warning>When <M t="\Delta_0 \neq 0" />: use individual <M t="\hat{p}" />'s in the denominator, NOT the pooled proportion.</Warning>

          <WorkedExample exam="2025 Exam Q7b">
            <p><strong>Problem:</strong> Test <M t="H_1: p_U - p_G > 0.1" /> at {'α'}=1%. Unilever: 128/245, Galapagos: 63/245.</p>
            <Step n={1}>
              <M t="\hat{p}_U = 0.5224,\; \hat{p}_G = 0.2571" />
              <br/><M t="\hat{p}_U - \hat{p}_G = 0.2653" />
            </Step>
            <Step n={2}>
              <M t="Z = \frac{0.2653 - 0.1}{\sqrt{\frac{0.5224 \cdot 0.4776}{245} + \frac{0.2571 \cdot 0.7429}{245}}} = \frac{0.1653}{\sqrt{0.001018 + 0.000780}} = \frac{0.1653}{0.04239} = 3.90" d />
            </Step>
            <Step n={3}>
              <M t="z_{0.01} = 2.33" />. Since 3.90 {'≥'} 2.33 {'→'} <strong>reject H{'₀'}</strong>. Sufficient evidence that <M t="p_U - p_G > 0.1" />.
            </Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="two-sample" title="Two-Sample z-Test (σ known)" priority={3} points="5 pts">
          <Step n={1}>
            <M t="H_0: \mu_1 - \mu_2 = \Delta_0 \quad\text{vs}\quad H_1: \mu_1 - \mu_2 > \Delta_0" d />
          </Step>
          <Step n={2}>
            <M t="Z = \frac{(\bar{X}_1 - \bar{X}_2) - \Delta_0}{\sqrt{\sigma_1^2/n_1 + \sigma_2^2/n_2}}" d />
          </Step>
          <Step n={3}>Follow the standard 6-step procedure.</Step>

          <WorkedExample exam="Resit 2024">
            <p><strong>Problem:</strong> Ore.com claims <M t="\mu_1 - \mu_2 \geq 0.2" />. <M t="\bar{x}_1=10.0, \bar{x}_2=8.4, \sigma_1=2.4, \sigma_2=2.1, n_1=n_2=50" />. Test at {'α'}=0.5%.</p>
            <Step n={1}><M t="z_{\text{obs}} = \frac{(10.0-8.4)-0.2}{\sqrt{2.4^2/50 + 2.1^2/50}} = \frac{1.4}{0.4505} = 3.11" /></Step>
            <Step n={2}><M t="z_{0.005} = 2.576" />. Since 3.11 {'≥'} 2.576 {'→'} reject H{'₀'}. The difference exceeds 0.2.</Step>
          </WorkedExample>
        </Recipe>

        <Recipe id="f-test" title="F-Test for Equal Variances" priority={3} points="3–5 pts">
          <Step n={1}>
            <strong>CI approach</strong> (most common on this exam):
            Build CI for <M t="\sigma_1^2/\sigma_2^2" />. If 1 {'∈'} CI {'→'} no evidence variances differ.
          </Step>
          <Step n={2}>
            <strong>Test approach:</strong>
            <M t="F = \frac{S_1^2}{S_2^2} \sim F(n_1-1, n_2-1)" d />
          </Step>
          <Warning>Always state: "Both populations must be normally distributed." This is worth points!</Warning>
        </Recipe>

        <Recipe id="power" title="Power & Type II Error" priority={4} points="4 pts">
          <p><M t="\text{Power} = \pi(\mu_1) = P(\text{reject } H_0 \mid \mu = \mu_1)" /></p>
          <Step n={1}>
            <strong>Find the cutoff in terms of <M t="\bar{X}" />:</strong>
            <M t="\text{Reject when } \bar{X} \geq \mu_0 + z_\alpha \cdot \frac{\sigma}{\sqrt{n}}" d />
          </Step>
          <Step n={2}><strong>Compute the cutoff value.</strong></Step>
          <Step n={3}>
            <strong>Under <M t="\mu = \mu_1" />:</strong>
            <M t="\pi(\mu_1) = P\!\left(Z \geq \frac{\text{cutoff} - \mu_1}{\sigma/\sqrt{n}}\right)" d />
          </Step>
          <DesmosGraph
            label="Power visualization: H₀ (left) vs H₁ (right)"
            bounds={{ left: 16, right: 22, bottom: -0.1, top: 1.3 }}
            height={200}
            expressions={[
              { latex: 'y = \\frac{1}{0.365\\sqrt{2\\pi}}e^{-\\frac{(x-19)^2}{2\\cdot 0.365^2}}', color: '#8B92FF', lineWidth: 2 },
              { latex: 'y = \\frac{1}{0.365\\sqrt{2\\pi}}e^{-\\frac{(x-19.5)^2}{2\\cdot 0.365^2}}', color: '#ff8c42', lineWidth: 2 },
              { latex: 'x = 19.6 \\{0 \\le y \\le 1.2\\}', color: '#ff4d4d', lineWidth: 2 },
              { latex: '(19, 1.15)', color: '#8B92FF', showLabel: true, label: 'H₀: μ=19', pointSize: 0, labelSize: 1 },
              { latex: '(19.5, 1.15)', color: '#ff8c42', showLabel: true, label: 'H₁: μ=19.5', pointSize: 0, labelSize: 1 },
              { latex: '(19.6, 0.05)', color: '#ff4d4d', showLabel: true, label: 'cutoff', pointSize: 0, labelSize: 1 },
            ]}
          />
          <Tip><M t="\beta = 1 - \text{Power}" />. Increase power by: (1) increase n, (2) increase {'α'}, (3) true {'μ'} further from {'μ₀'}.</Tip>

          <WorkedExample exam="2025 Exam Q6b">
            <p><strong>Problem:</strong> From Q6a (n=30, {'σ'}=2, {'α'}=5%), find power at <M t="\mu_1 = 19.5" />.</p>
            <Step n={1}>
              Cutoff: <M t="\bar{X} \geq 19 + 1.645 \cdot \frac{2}{\sqrt{30}} = 19 + 0.601 = 19.601" />
            </Step>
            <Step n={2}>
              Under <M t="\mu = 19.5" />:
              <M t="\pi(19.5) = P\!\left(Z \geq \frac{19.601 - 19.5}{2/\sqrt{30}}\right) = P(Z \geq 0.28) = 1 - 0.6103 = 0.39" d />
            </Step>
            <p><strong>Answer:</strong> Power = 0.39 (quite low {'—'} 39% chance of detecting the difference). <M t="\beta = 0.61" />.</p>
          </WorkedExample>
        </Recipe>

        <Recipe id="p-value" title="p-Value Method" priority={3} points="3–4 pts">
          <Step n={1}><strong>Compute</strong> <M t="t_{\text{obs}}" /> or <M t="z_{\text{obs}}" />.</Step>
          <Step n={2}>
            <strong>p-value:</strong>
            <Diagram label="p-value by test type">
{`  Right-tailed: p = P(T ≥ t_obs)
  Left-tailed:  p = P(T ≤ t_obs)
  Two-tailed:   p = 2·P(T ≥ |t_obs|)`}
            </Diagram>
          </Step>
          <Step n={3}>
            <strong>From t-table:</strong> Scan across the df row to bracket <M t="t_{\text{obs}}" />.
          </Step>
          <Step n={4}><strong>Decision:</strong> <M t="p \leq \alpha" /> {'→'} reject. <M t="p > \alpha" /> {'→'} do not reject.</Step>

          <WorkedExample exam="2025 Exam Q6c">
            <p>With df=29, <M t="t_{\text{obs}}=2.490" />:</p>
            <p><M t="t_{0.01,29}=2.462 < 2.490 < 2.756 = t_{0.005,29}" /></p>
            <p>So <M t="0.005 < p < 0.01" />. At {'α'}=1%: p &lt; 0.01 {'→'} <strong>reject H{'₀'}</strong>.</p>
          </WorkedExample>
        </Recipe>

        <Recipe id="type-i" title="Type I Error Computation" priority={2} points="4 pts">
          <p><M t="\alpha = P(\text{reject } H_0 \mid H_0 \text{ true})" /></p>
          <Step n={1}><strong>Identify the rejection region</strong> (given in the problem).</Step>
          <Step n={2}><strong>Find the distribution under H{'₀'}.</strong></Step>
          <Step n={3}><strong>Compute</strong> <M t="P(\text{rejection region})" /> under H{'₀'}.</Step>
          <Tip>Use symmetry for two-tailed: <M t="P(|W| > c) = 2P(W > c)" />.</Tip>
        </Recipe>

        <Recipe id="iterated-exp" title="Iterated Expectation E[E[Y|X]]" priority={2} points="3 pts">
          <p><M t="E[Y] = E_X[E[Y|X]]" /></p>
          <Step n={1}><strong>Find <M t="E[Y|X=x]" /></strong> as a function of x.</Step>
          <Step n={2}>
            <strong>Take expectation over X:</strong>
            <M t="E[Y] = \int E[Y|X=x] \cdot f_X(x)\, dx" d />
          </Step>
          <Tip>Powerful shortcut when the conditional distribution is recognized (e.g., Uniform {'→'} E = midpoint).</Tip>
        </Recipe>

        {/* ═══════════ QUICK REFERENCE ═══════════ */}
        <div className="rb-part-divider">Quick Reference {'·'} Test Selection Flowchart</div>

        <div className="rb-recipe" id="flowchart">
          <div className="rb-recipe-head">
            <h3 className="rb-recipe-title">Which Test Do I Use?</h3>
          </div>
          <div className="rb-recipe-body">
            <Diagram label="Master decision tree">
{`  What are you testing?
  │
  ├── MEAN (μ)
  │   ├── σ known? → z-test
  │   ├── σ unknown, n ≥ 30? → z-test (use s)
  │   └── σ unknown, n < 30? → t-test (df = n-1)
  │       ⚠ Needs normality
  │
  ├── PROPORTION (p)
  │   ├── One proportion → z-test for p
  │   └── Two proportions → z-test for p₁-p₂
  │       ⚠ Check np̂ ≥ 5 for EACH sample
  │
  ├── VARIANCE (σ²)
  │   ├── One variance → χ² test
  │   └── Two variances → F-test
  │       ⚠ Both populations must be normal
  │
  └── DIFFERENCE IN MEANS (μ₁ - μ₂)
      ├── σ₁, σ₂ known → two-sample z-test
      └── σ unknown → pooled t-test
          ⚠ Needs equal variances + normality`}
            </Diagram>

            <Diagram label="CI formula quick reference">
{`  ┌─────────────────┬────────────────────────────┐
  │ Parameter        │ Formula                    │
  ├─────────────────┼────────────────────────────┤
  │ μ (σ known)     │ x̄ ± z_{α/2} · σ/√n       │
  │ μ (σ unknown)   │ x̄ ± t_{α/2,n-1} · s/√n   │
  │ p               │ p̂ ± z_{α/2}·√(p̂q̂/n)     │
  │ μ₁ - μ₂        │ (x̄₁-x̄₂) ± z·SE           │
  │ σ₁²/σ₂²       │ F-distribution bounds       │
  │ σ²             │ χ² distribution bounds      │
  └─────────────────┴────────────────────────────┘`}
            </Diagram>
          </div>
        </div>

        <footer className="rb-footer">
          <p>Based on analysis of 5 exams: 2022, 2023, 2024, 2025, and resit 2024.</p>
          <p>Good luck tomorrow, Gabriel. You've got this.</p>
        </footer>
      </main>
    </div>
  )
}
