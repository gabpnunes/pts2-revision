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
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveId(e.target.id)
        }
      },
      { rootMargin: '-20% 0px -60% 0px' }
    )
    recipes.forEach(r => {
      const el = document.getElementById(r.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="rb-root">
      <nav className="rb-sidebar">
        <Link to="/" className="rb-back">← Home</Link>
        <div className="rb-toc">
          {sectionGroups.map(g => (
            <div key={g.label} className="rb-toc-group">
              <div className="rb-toc-group-label">{g.label}</div>
              {g.ids.map(id => {
                const r = recipes.find(x => x.id === id)
                return (
                  <button
                    key={id}
                    className={`rb-toc-item ${activeId === id ? 'active' : ''}`}
                    onClick={() => scrollTo(id)}
                  >
                    {r.title}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </nav>

      <main className="rb-main">
        <header className="rb-header">
          <h1 className="rb-title">Recipe <em>Book</em></h1>
          <p className="rb-subtitle">
            Step-by-step recipes for every exam question type. Prioritized by frequency across 5 past exams (2022–2025 + resit 2024).
          </p>
          <div className="rb-legend">
            <span className="rb-legend-item"><span className="rb-legend-dot" style={{background:'#ff4d4d'}} /> 5/5 Every exam</span>
            <span className="rb-legend-item"><span className="rb-legend-dot" style={{background:'#ff8c42'}} /> 4/5 Most exams</span>
            <span className="rb-legend-item"><span className="rb-legend-dot" style={{background:'#ffd166'}} /> 3/5 Frequent</span>
            <span className="rb-legend-item"><span className="rb-legend-dot" style={{background:'#8B92FF'}} /> 2/5 Occasional</span>
          </div>
        </header>

        {/* ============ PART A: JOINT DISTRIBUTIONS ============ */}
        <div className="rb-part-divider">Part A · Joint Distributions</div>

        <Recipe id="joint-pdf" title="Find Normalization Constant for Joint PDF" priority={5} points="3–5 pts">
          <p>Given <M t="f_{X,Y}(x,y) = c \cdot g(x,y)" /> on some support, find <M t="c" />.</p>
          <Step n={1}>
            <strong>Identify the support region.</strong> Write down the bounds carefully.
            <Diagram label="Common support: triangle 0 < x < y">
{`  y
  │╱
  │╱  f > 0
  │╱
  └──────── x
  0 < s < t < ∞`}
            </Diagram>
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
            <strong>Solve for <M t="c" />.</strong> Then verify <M t="f \geq 0" /> everywhere (mention this for full marks).
          </Step>
          <Warning>
            Always state: "Furthermore, <M t="f_{X,Y}(x,y) \geq 0" /> for all <M t="(x,y)" />, so this is a valid pdf." (1 free point!)
          </Warning>
          <Tip>
            <strong>2025 Exam:</strong> <M t="f_{S,T}(s,t) = c\lambda e^{-\lambda(s+t)}" /> for <M t="0 < s < t" />. Integrate inner <M t="\int_0^t ds" />, then outer <M t="\int_0^\infty dt" />. Answer: <M t="c = 2\lambda" />.
          </Tip>
        </Recipe>

        <Recipe id="marginal-pdf" title="Find Marginal PDF" priority={5} points="3–4 pts">
          <p>Given joint <M t="f_{X,Y}(x,y)" />, find <M t="f_X(x)" /> or <M t="f_Y(y)" />.</p>
          <Step n={1}>
            <strong>Integrate out the OTHER variable.</strong>
            <M t="f_X(x) = \int_{-\infty}^{\infty} f_{X,Y}(x,y)\, dy" d />
          </Step>
          <Step n={2}>
            <strong>Determine integration limits from the support.</strong> These depend on <M t="x" />!
            <Diagram label="Example: support 0 < y < x, 0 < x < 1">
{`  To find f_X(x): integrate y from 0 to x
  To find f_Y(y): integrate x from y to 1

  ┌─────────┐ x=1
  │ ╱        │
  │╱  f > 0  │
  └──────────┘
  0     y=x    `}
            </Diagram>
          </Step>
          <Step n={3}>
            <strong>Evaluate the integral.</strong> State the support of the marginal.
          </Step>
          <Warning>
            The limits of integration for the inner variable <strong>depend on the outer variable</strong>. Draw the support to get them right. This is where most marks are lost.
          </Warning>
          <Tip>
            <strong>Quick check:</strong> Your marginal should integrate to 1 over its support. If it doesn't, your limits are wrong.
          </Tip>
        </Recipe>

        <Recipe id="cond-dist" title="Conditional Distribution & E[Y|X=x]" priority={4} points="3–5 pts">
          <p>Find <M t="f_{Y|X}(y|x)" /> and/or <M t="E[Y|X=x]" />.</p>
          <Step n={1}>
            <strong>Find the marginal</strong> <M t="f_X(x)" /> (if not already done).
          </Step>
          <Step n={2}>
            <strong>Apply the formula:</strong>
            <M t="f_{Y|X}(y|x) = \frac{f_{X,Y}(x,y)}{f_X(x)}" d />
          </Step>
          <Step n={3}>
            <strong>State the conditional support.</strong> Given <M t="X = x" />, what values can <M t="Y" /> take?
          </Step>
          <Step n={4}>
            For <M t="E[Y|X=x]" />, compute:
            <M t="E[Y|X=x] = \int y \cdot f_{Y|X}(y|x)\, dy" d />
          </Step>
          <Tip>
            <strong>Shortcut:</strong> If you recognize <M t="f_{Y|X}(y|x)" /> as a known distribution (e.g., Uniform), you can read off <M t="E[Y|X=x]" /> directly without integrating.
          </Tip>
        </Recipe>

        <Recipe id="independence" title="Independence Check" priority={4} points="2 pts">
          <p>Determine whether <M t="X" /> and <M t="Y" /> are independent.</p>
          <Step n={1}>
            <strong>Check TWO conditions</strong> (both must hold):
          </Step>
          <Step n={2}>
            <strong>Condition 1:</strong> Support is a <strong>Cartesian product</strong> (rectangle, not a triangle/curve).
            <Diagram label="Independent vs Dependent support">
{`  INDEPENDENT          DEPENDENT
  ┌──────────┐         ╱│
  │          │        ╱ │
  │  rect    │       ╱  │ (triangle)
  │          │      ╱   │
  └──────────┘     └────┘
  support = A × B   support ≠ A × B`}
            </Diagram>
          </Step>
          <Step n={3}>
            <strong>Condition 2:</strong> Joint pdf <strong>factorizes</strong>: <M t="f_{X,Y}(x,y) = g(x) \cdot h(y)" />.
          </Step>
          <Step n={4}>
            <strong>Write the conclusion:</strong>
            <ul>
              <li>"The support is [not] the Cartesian product of the marginal supports, so X and Y are [not] independent."</li>
              <li>If support is Cartesian: also verify <M t="f_{X,Y} = f_X \cdot f_Y" /></li>
            </ul>
          </Step>
          <Warning>
            Non-rectangular support → <strong>immediately</strong> not independent. Don't need to check factorization. Write: "Support is not a Cartesian product ⇒ X, Y are dependent."
          </Warning>
        </Recipe>

        <Recipe id="cov-corr" title="Covariance & Correlation" priority={4} points="2–3 pts">
          <Step n={1}>
            <strong>Compute <M t="E[XY]" />:</strong>
            <M t="E[XY] = \iint xy \cdot f_{X,Y}(x,y)\, dx\, dy" d />
            <p>(or <M t="\sum\sum xy \cdot P(X=x, Y=y)" /> for discrete)</p>
          </Step>
          <Step n={2}>
            <strong>Compute <M t="E[X]" /> and <M t="E[Y]" /></strong> from marginals.
          </Step>
          <Step n={3}>
            <strong>Apply:</strong>
            <M t="\text{Cov}(X,Y) = E[XY] - E[X] \cdot E[Y]" d />
          </Step>
          <Step n={4}>
            For correlation:
            <M t="\rho_{X,Y} = \frac{\text{Cov}(X,Y)}{\sigma_X \cdot \sigma_Y}" d />
          </Step>
          <Tip>
            If <M t="X, Y" /> are independent, then <M t="\text{Cov}(X,Y) = 0" />. But <M t="\text{Cov} = 0" /> does NOT imply independence!
          </Tip>
        </Recipe>

        <Recipe id="discrete-joint" title="Discrete Joint Distribution Table" priority={4} points="3 pts">
          <p>Build a joint PMF table from a word problem.</p>
          <Step n={1}>
            <strong>List all possible outcomes.</strong> E.g., for "pick 2 from {1,2,3} without replacement": all ordered pairs (x,y) where x ≠ y.
          </Step>
          <Step n={2}>
            <strong>Count outcomes and assign probabilities.</strong>
            <p>Without replacement from {1,2,3}: 3×2 = 6 outcomes, each with probability 1/6.</p>
          </Step>
          <Step n={3}>
            <strong>Fill in the table:</strong>
            <Diagram label="Example: X = first pick, Y = second pick">
{`         X=1    X=2    X=3   | f_Y(y)
  Y=1  |  0     1/6    1/6   |  2/6
  Y=2  | 1/6     0     1/6   |  2/6
  Y=3  | 1/6    1/6     0    |  2/6
  ─────┼─────────────────────┤
  f(x) | 2/6    2/6    2/6   |   1`}
            </Diagram>
          </Step>
          <Step n={4}>
            <strong>Verify:</strong> All probabilities ≥ 0 and sum to 1.
          </Step>
          <Tip>
            The marginals (row/column sums) give <M t="f_X(x)" /> and <M t="f_Y(y)" />. Always compute them — you'll need them for E[X], Var[X], Cov.
          </Tip>
        </Recipe>

        <Recipe id="probs-from-table" title="Probabilities from Joint Tables" priority={4} points="3–4 pts">
          <p>Compute P(X ≤ 2), P(X + Y ≤ 3), P(X ≤ 2 | X − Y ≤ 0) from a given table.</p>
          <Step n={1}>
            <strong>For marginal probabilities</strong> like <M t="P(X \leq 2)" />: sum all entries in columns where <M t="X \leq 2" />.
          </Step>
          <Step n={2}>
            <strong>For event probabilities</strong> like <M t="P(X + Y \leq 3)" />: identify all cells (x,y) satisfying the condition, sum their probabilities.
          </Step>
          <Step n={3}>
            <strong>For conditional probabilities:</strong>
            <M t="P(A|B) = \frac{P(A \cap B)}{P(B)}" d />
            <p>Sum cells satisfying <em>both</em> conditions, divide by sum of cells satisfying the condition.</p>
          </Step>
          <Warning>
            For <M t="P(X \leq 2 | X - Y \leq 0)" />: first find all (x,y) where X−Y ≤ 0, then among those, count where X ≤ 2. Divide.
          </Warning>
        </Recipe>

        <Recipe id="linear-combo" title="Mean & Variance of Linear Combinations" priority={4} points="3–4 pts">
          <p>Find <M t="E[aX + bY]" /> and <M t="\text{Var}(aX + bY)" />.</p>
          <Step n={1}>
            <strong>Mean is always linear:</strong>
            <M t="E[aX + bY] = aE[X] + bE[Y]" d />
            <p>(Works regardless of independence!)</p>
          </Step>
          <Step n={2}>
            <strong>Variance formula:</strong>
            <M t="\text{Var}(aX + bY) = a^2\text{Var}(X) + b^2\text{Var}(Y) + 2ab\,\text{Cov}(X,Y)" d />
          </Step>
          <Step n={3}>
            If independent: <M t="\text{Cov}(X,Y) = 0" />, so:
            <M t="\text{Var}(aX + bY) = a^2\text{Var}(X) + b^2\text{Var}(Y)" d />
          </Step>
          <Tip>
            <strong>For X − Y:</strong> Use <M t="a=1, b=-1" />: Var(X−Y) = Var(X) + Var(Y) − 2Cov(X,Y). Note the PLUS for variances — variance of a difference still adds variances (minus the covariance term).
          </Tip>
          <Warning>
            If given a discrete distribution table for X−Y, you can compute E[X−Y] and Var(X−Y) directly from that table's PMF without the formula. This was the 2025 exam approach.
          </Warning>
        </Recipe>

        {/* ============ PART B: TRANSFORMATIONS ============ */}
        <div className="rb-part-divider">Part B · Transformations & Sampling</div>

        <Recipe id="mgf-method" title="MGF Method (Distribution of Sums)" priority={5} points="4–5 pts">
          <p>Find the distribution of <M t="W = X_1 + X_2 + \ldots + X_n" /> when independent.</p>
          <Step n={1}>
            <strong>Write the MGF of the sum:</strong>
            <M t="M_W(t) = E[e^{tW}] = E[e^{t(X_1 + \ldots + X_n)}]" d />
          </Step>
          <Step n={2}>
            <strong>Use independence to factorize:</strong>
            <M t="M_W(t) = M_{X_1}(t) \cdot M_{X_2}(t) \cdot \ldots \cdot M_{X_n}(t)" d />
          </Step>
          <Step n={3}>
            <strong>Look up individual MGFs</strong> from the formula sheet:
            <Diagram label="Key MGFs to know">
{`  Distribution     │  MGF M(t)
  ─────────────────┼──────────────────────
  N(μ, σ²)        │  exp(μt + ½σ²t²)
  Exp(λ)           │  λ/(λ-t),  t < λ
  Gamma(α, β)      │  (1 - t/β)^(-α)
  Poisson(λ)       │  exp(λ(eᵗ - 1))
  Binomial(n,p)    │  (1-p+peᵗ)ⁿ`}
            </Diagram>
          </Step>
          <Step n={4}>
            <strong>Multiply and recognize the resulting MGF.</strong>
            <p>Example: <M t="X \sim N(\mu_1, \sigma_1^2),\; Y \sim N(\mu_2, \sigma_2^2)" /> independent:</p>
            <M t="M_W(t) = e^{\mu_1 t + \frac{1}{2}\sigma_1^2 t^2} \cdot e^{\mu_2 t + \frac{1}{2}\sigma_2^2 t^2} = e^{(\mu_1+\mu_2)t + \frac{1}{2}(\sigma_1^2 + \sigma_2^2)t^2}" d />
            <p>This is the MGF of <M t="N(\mu_1+\mu_2,\; \sigma_1^2+\sigma_2^2)" />. ✓</p>
          </Step>
          <Warning>
            You MUST state "X and Y are independent, therefore <M t="M_W(t) = M_X(t) \cdot M_Y(t)" />" — independence is required for the factorization. Points are lost without this.
          </Warning>
          <Tip>
            <strong>Key results:</strong> Normal + Normal = Normal. Gamma + Gamma (same β) = Gamma. Poisson + Poisson = Poisson. Binomial + Binomial (same p) = Binomial.
          </Tip>
        </Recipe>

        <Recipe id="cdf-method" title="CDF / Transformation Method" priority={4} points="5–6 pts">
          <p>Find the distribution of <M t="Z = g(X,Y)" />, e.g., <M t="Z = Y/X" />.</p>
          <Step n={1}>
            <strong>Write the CDF:</strong> <M t="F_Z(z) = P(Z \leq z) = P(g(X,Y) \leq z)" />
          </Step>
          <Step n={2}>
            <strong>Rewrite as a region in (x,y)-space.</strong> For <M t="Z = Y/X" />:
            <M t="P(Y/X \leq z) = P(Y \leq zX)" d />
          </Step>
          <Step n={3}>
            <strong>Draw the support and shade the region</strong> where <M t="Y \leq zX" />. Check if multiple cases are needed.
            <Diagram label="CDF method: Z = Y/X with support 0 < y < √x, 0 < x < 1">
{`  Case 1: 0 < z < 1         Case 2: z ≥ 1

  y                         y
  │  y=√x                   │  y=√x
  │ ╱    y=zx crosses       │ ╱   y=zx is steep
  │╱▒▒▒▒ inside support     │╱▓▓▓▓ covers most
  └──────── x               └──────── x

  Integrate f over           Use complement:
  shaded region              1 - ∫∫ unshaded`}
            </Diagram>
          </Step>
          <Step n={4}>
            <strong>Integrate the joint pdf over the shaded region</strong> to get <M t="F_Z(z)" />.
          </Step>
          <Step n={5}>
            <strong>Differentiate to get the pdf:</strong> <M t="f_Z(z) = F_Z'(z)" />
          </Step>
          <Warning>
            <strong>Two cases are almost always needed!</strong> Where the line <M t="y = zx" /> intersects the boundary determines the split. Typically case 1: 0 &lt; z &lt; 1 and case 2: z ≥ 1.
          </Warning>
          <Tip>
            <strong>2025 Exam:</strong> <M t="f_{X,Y} = 6xy" /> on <M t="0<x<1, 0<y<\sqrt{x}" />, find CDF of <M t="Z=Y/X" />. Case 1 (0&lt;z&lt;1): <M t="F_Z(z)=\frac{3}{4}z^2" />. Case 2 (z≥1): <M t="F_Z(z)=1-\frac{1}{4z^6}" />. Then differentiate.
          </Tip>
        </Recipe>

        <Recipe id="draw-support" title="Drawing Support Regions" priority={3} points="2 pts">
          <p>Draw the region where <M t="f_{X,Y}(x,y) > 0" />.</p>
          <Step n={1}>
            <strong>Identify all inequalities</strong> from the pdf definition. E.g., <M t="0 < x < 1" /> and <M t="0 < y < \sqrt{x}" />.
          </Step>
          <Step n={2}>
            <strong>Plot boundary curves.</strong> Label axes, mark key points.
            <Diagram label="Example supports">
{`  0 < y < √x, 0 < x < 1     │  0 < s < t < ∞
                              │
  y                           │  t
  1│                          │  │╱ t = s
   │  y = √x                 │  │╱
   │ ╱╱╱╱╱╱╱                 │  │╱╱╱╱╱╱╱
   │╱╱╱╱╱╱╱╱                 │  │╱╱╱╱╱╱╱╱ f > 0
   └──────────x               │  └──────────s
   0        1                 │  0`}
            </Diagram>
          </Step>
          <Step n={3}>
            <strong>Shade the interior.</strong> Mark the axes and key intersection points with coordinates.
          </Step>
          <Tip>
            Worth 2 easy points. Label axes clearly, mark boundary equations (y = √x, y = x), and shade the region. Include at least one labeled point on each boundary.
          </Tip>
        </Recipe>

        <Recipe id="order-stats" title="Order Statistics (Min & Max)" priority={4} points="4–5 pts">
          <p>Given iid sample <M t="X_1, \ldots, X_n" /> with pdf <M t="f" /> and CDF <M t="F" />, find the pdf of <M t="V = \max" /> or <M t="W = \min" />.</p>
          <Step n={1}>
            <strong>For the maximum <M t="V = \max(X_1,\ldots,X_n)" />:</strong>
            <M t="F_V(v) = P(\max \leq v) = P(\text{all } X_i \leq v) = [F(v)]^n" d />
            <M t="f_V(v) = n[F(v)]^{n-1} f(v)" d />
          </Step>
          <Step n={2}>
            <strong>For the minimum <M t="W = \min(X_1,\ldots,X_n)" />:</strong>
            <M t="F_W(w) = 1 - P(\min > w) = 1 - [1-F(w)]^n" d />
            <M t="f_W(w) = n[1-F(w)]^{n-1} f(w)" d />
          </Step>
          <Step n={3}>
            <strong>Substitute the specific distribution.</strong> E.g., for <M t="X_i \sim \text{Unif}(0,b)" />:
            <p><M t="F(x) = x/b" />, <M t="f(x) = 1/b" />, so <M t="f_V(v) = n(v/b)^{n-1} \cdot (1/b) = nv^{n-1}/b^n" /></p>
          </Step>
          <Step n={4}>
            <strong>E[V] and E[W]:</strong> Integrate or use symmetry.
            <p>For Unif(0,b): <M t="E[V] = \frac{n}{n+1}b" />, <M t="E[W] = \frac{1}{n+1}b" /> (by symmetry: <M t="E[W] = b - E[V]" />)</p>
          </Step>
          <Tip>
            <strong>Symmetry shortcut:</strong> For symmetric distributions on [0, b], the min is as far from 0 (on average) as the max is from b. So <M t="E[W] = b - E[V]" />. The 2024 resit explicitly asked for this argument.
          </Tip>
          <Warning>
            For Pareto distribution <M t="f(y) = 2/y^3" /> for <M t="y \geq 1" />: <M t="F(y) = 1 - 1/y^2" />. Plug into min formula: <M t="f_{Y_1}(y) = 2n/y^{2n+1}" />.
          </Warning>
        </Recipe>

        <Recipe id="bvn" title="Bivariate Normal Distribution" priority={2} points="3–4 pts">
          <p>Recognize and work with the BVN pdf.</p>
          <Step n={1}>
            <strong>Recognize the BVN form:</strong>
            <M t="f_{X,Y}(x,y) = \frac{1}{2\pi\sigma_X\sigma_Y\sqrt{1-\rho^2}} \exp\!\left(-\frac{1}{2(1-\rho^2)}\left[\left(\frac{x-\mu_X}{\sigma_X}\right)^2 - 2\rho\frac{(x-\mu_X)(y-\mu_Y)}{\sigma_X\sigma_Y} + \left(\frac{y-\mu_Y}{\sigma_Y}\right)^2\right]\right)" d />
          </Step>
          <Step n={2}>
            <strong>Read off parameters.</strong> For <M t="f = \frac{1}{2\pi}e^{-\frac{1}{2}(x^2+y^2)}" />: this is BVN with <M t="\mu_X=0, \mu_Y=0, \sigma_X=1, \sigma_Y=1, \rho=0" />.
          </Step>
          <Step n={3}>
            <strong>Marginals are normal:</strong> <M t="X \sim N(\mu_X, \sigma_X^2)" />, <M t="Y \sim N(\mu_Y, \sigma_Y^2)" />.
          </Step>
          <Step n={4}>
            <strong>Key property:</strong> If <M t="\rho = 0" />, then X and Y are <strong>independent</strong> (only for BVN!). This means <M t="f_{Y|X}(y|x) = f_Y(y)" />.
          </Step>
          <Tip>
            On the resit 2024: they gave <M t="f = \frac{1}{2\pi}e^{-\frac{1}{2}(x^2+y^2)}" /> and asked for marginal, conditional, E[X+Y], Var[X+Y], and MGF. Key: recognize ρ=0 → independent → everything simplifies.
          </Tip>
        </Recipe>

        <Recipe id="build-stats" title="Building Test Statistics from Standard Normals" priority={2} points="5 pts">
          <p>Given <M t="X_i \sim N(i, i)" />, construct valid chi-squared, t, and F test statistics.</p>
          <Step n={1}>
            <strong>Standardize:</strong> <M t="Z_i = \frac{X_i - i}{\sqrt{i}} \sim N(0,1)" />
          </Step>
          <Step n={2}>
            <strong>Chi-squared:</strong> Sum of squared standard normals:
            <M t="V = Z_1^2 + Z_2^2 + \ldots + Z_k^2 \sim \chi^2(k)" d />
          </Step>
          <Step n={3}>
            <strong>t-distribution:</strong>
            <M t="T = \frac{Z}{\sqrt{U/\nu}} \sim t(\nu)" d />
            <p>where <M t="Z \sim N(0,1)" /> and <M t="U \sim \chi^2(\nu)" /> are independent.</p>
          </Step>
          <Step n={4}>
            <strong>State independence.</strong> The Z_i's from different X_i's are independent because the X_i's are independent.
          </Step>
          <Warning>
            Always verify that V and T are <strong>valid</strong> test statistics by confirming the Z_i components are independent. Say: "V and T are valid test statistics since the Z_i's are independent."
          </Warning>
        </Recipe>

        {/* ============ PART C: CONFIDENCE INTERVALS ============ */}
        <div className="rb-part-divider">Part C · Confidence Intervals</div>

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
          <Step n={1}>
            <strong>Identify:</strong> σ known or unknown? Sample size n? Confidence level <M t="100(1-\alpha)\%" />?
          </Step>
          <Step n={2}>
            <strong>Find critical value:</strong> <M t="z_{\alpha/2}" /> or <M t="t_{\alpha/2, n-1}" /> from tables.
          </Step>
          <Step n={3}>
            <strong>Compute the interval:</strong>
            <M t="\bar{x} \pm (\text{critical value}) \times \frac{\sigma \text{ or } s}{\sqrt{n}}" d />
          </Step>
          <Step n={4}>
            <strong>State assumptions:</strong>
            <ul>
              <li>Random sample</li>
              <li>If using z: σ known OR n ≥ 30 (CLT)</li>
              <li>If using t: population is normal (or approximately normal)</li>
            </ul>
          </Step>
        </Recipe>

        <Recipe id="ci-proportion" title="CI for Proportion" priority={4} points="3–5 pts">
          <Step n={1}>
            <strong>Compute <M t="\hat{p} = x/n" /></strong> where x = number of successes.
          </Step>
          <Step n={2}>
            <strong>Check conditions:</strong> <M t="n\hat{p} \geq 5" /> and <M t="n(1-\hat{p}) \geq 5" />
          </Step>
          <Step n={3}>
            <strong>Compute:</strong>
            <M t="\hat{p} \pm z_{\alpha/2} \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}" d />
          </Step>
          <Step n={4}>
            <strong>Interpret:</strong> "We are 95% confident that the true proportion is between [L, U]."
            <p>If testing <M t="p > 0.5" />: check if 0.5 is in the interval. If yes → "cannot be proven."</p>
          </Step>
          <Tip>
            <strong>2025 Exam:</strong> 128/245 voters → <M t="\hat{p}_U = 0.5224" />, 95% CI: (0.4599, 0.5849). Since 0.5 ∈ CI → cannot prove <M t="p_U > 0.5" />.
          </Tip>
        </Recipe>

        <Recipe id="ci-variance" title="CI for Variance / Variance Ratio" priority={3} points="3–5 pts">
          <Step n={1}>
            <strong>For single variance</strong> <M t="\sigma^2" />:
            <M t="\left(\frac{(n-1)s^2}{\chi^2_{\alpha/2, n-1}}, \; \frac{(n-1)s^2}{\chi^2_{1-\alpha/2, n-1}}\right)" d />
          </Step>
          <Step n={2}>
            <strong>For variance ratio</strong> <M t="\sigma_1^2/\sigma_2^2" />:
            <M t="\left(\frac{s_1^2}{s_2^2} \cdot \frac{1}{F_{\alpha/2; n_1-1, n_2-1}}, \; \frac{s_1^2}{s_2^2} \cdot F_{\alpha/2; n_2-1, n_1-1}\right)" d />
          </Step>
          <Step n={3}>
            <strong>Interpret:</strong> If 1 is inside the CI for <M t="\sigma_1^2/\sigma_2^2" /> → cannot conclude variances differ.
          </Step>
          <Warning>
            <strong>Assumption:</strong> Both populations must be normally distributed. Always state this! "The construction of this CI requires normality of both populations."
          </Warning>
          <Tip>
            <strong>F-table trick:</strong> <M t="F_{1-\alpha; \nu_1, \nu_2} = 1/F_{\alpha; \nu_2, \nu_1}" />. Use this when the lower quantile isn't in your table.
          </Tip>
        </Recipe>

        <Recipe id="ci-diff-means" title="CI for Difference in Means" priority={3} points="3–4 pts">
          <Diagram label="Which CI to use?">
{`  Two samples: are σ₁, σ₂ known?
  ├── YES → z-interval for μ₁ - μ₂
  │         (x̄₁ - x̄₂) ± z_{α/2} √(σ₁²/n₁ + σ₂²/n₂)
  │
  └── NO → Are n₁, n₂ both ≥ 30?
            ├── YES → z-interval (use s₁, s₂)
            └── NO → pooled t-interval
                      (requires equal variances)`}
          </Diagram>
          <Step n={1}>
            <strong>Compute</strong> <M t="\bar{x}_1 - \bar{x}_2" />
          </Step>
          <Step n={2}>
            <strong>Compute SE:</strong> <M t="\sqrt{\frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2}}" />
          </Step>
          <Step n={3}>
            <strong>Build interval:</strong> <M t="(\bar{x}_1 - \bar{x}_2) \pm z_{\alpha/2} \cdot SE" />
          </Step>
          <Tip>
            <strong>Resit 2024:</strong> 99% CI with σ known: (10.0 − 8.4) ± 2.576 · √(2.4²/50 + 2.1²/50) = 1.6 ± 1.16 = (0.44, 2.76).
          </Tip>
        </Recipe>

        <Recipe id="sample-size" title="Minimum Sample Size" priority={2} points="2–3 pts">
          <p>Derive or use formula for minimum n given desired CI width or margin of error.</p>
          <Step n={1}>
            <strong>Start from the CI formula.</strong> The half-width (margin of error) E is:
            <M t="E = z_{\alpha/2} \cdot \frac{\sigma}{\sqrt{n}}" d />
          </Step>
          <Step n={2}>
            <strong>Solve for n:</strong>
            <M t="n = \left(\frac{z_{\alpha/2} \cdot \sigma}{E}\right)^2" d />
          </Step>
          <Step n={3}>
            <strong>For proportions:</strong> From the CI lower limit L:
            <M t="n = \frac{z_{\alpha/2}^2 \cdot \hat{p}(1-\hat{p})}{(\hat{p} - L)^2}" d />
          </Step>
          <Step n={4}>
            <strong>Always round UP</strong> to the nearest integer.
          </Step>
        </Recipe>

        {/* ============ PART D: HYPOTHESIS TESTING ============ */}
        <div className="rb-part-divider">Part D · Hypothesis Testing</div>

        <Recipe id="z-test" title="z-Test for Mean (σ known)" priority={5} points="5–6 pts">
          <p>The most common hypothesis test on the exam. Follow the 6-step recipe exactly.</p>
          <Step n={1}>
            <strong>State hypotheses:</strong>
            <M t="H_0: \mu = \mu_0 \quad \text{vs} \quad H_1: \mu > \mu_0 \;\text{(or } < \text{ or } \neq\text{)}" d />
            <p>State <M t="\alpha" />.</p>
          </Step>
          <Step n={2}>
            <strong>Test statistic and distribution:</strong>
            <M t="Z = \frac{\bar{X} - \mu_0}{\sigma / \sqrt{n}} \sim N(0,1) \quad \text{under } H_0" d />
          </Step>
          <Step n={3}>
            <strong>Check assumptions:</strong>
            <ul>
              <li>Random sample ✓</li>
              <li><M t="n \geq 30" /> (CLT) or population normal ✓</li>
              <li><M t="\sigma" /> is known ✓</li>
            </ul>
          </Step>
          <Step n={4}>
            <strong>Rejection region:</strong>
            <Diagram label="Rejection regions by H₁ type">
{`  H₁: μ > μ₀  →  Reject if z ≥ z_α
  H₁: μ < μ₀  →  Reject if z ≤ -z_α
  H₁: μ ≠ μ₀  →  Reject if |z| ≥ z_{α/2}`}
            </Diagram>
          </Step>
          <Step n={5}>
            <strong>Compute observed value:</strong>
            <M t="z_{\text{obs}} = \frac{\bar{x} - \mu_0}{\sigma/\sqrt{n}}" d />
            <p>State whether <M t="z_{\text{obs}}" /> is in the rejection region.</p>
          </Step>
          <Step n={6}>
            <strong>Conclusion (in words):</strong>
            <p>"Given the sample and a significance level of α%, H₀ is [rejected / not rejected]."</p>
          </Step>
          <Warning>
            <strong>Don't forget step 3!</strong> Assumptions are worth 1 point. And always write the conclusion in context — not just "reject" but explain what it means.
          </Warning>
        </Recipe>

        <Recipe id="t-test" title="t-Test for Mean (σ unknown)" priority={3} points="3–4 pts">
          <Step n={1}>
            <strong>Same 6-step recipe</strong> as z-test, but use:
            <M t="T = \frac{\bar{X} - \mu_0}{S/\sqrt{n}} \sim t(n-1) \quad \text{under } H_0" d />
          </Step>
          <Step n={2}>
            <strong>Critical values from t-table</strong> with <M t="df = n-1" />.
          </Step>
          <Step n={3}>
            <strong>Extra assumption:</strong> Population must be (approximately) normally distributed when n is small.
          </Step>
          <Tip>
            <strong>p-value from t-table:</strong> If <M t="t_{\text{obs}} = 2.490" /> with df = 29, look across the df = 29 row. If 2.490 falls between the 1% and 0.5% columns → 0.005 &lt; p &lt; 0.01. Then: p &lt; α ⇒ reject H₀.
          </Tip>
        </Recipe>

        <Recipe id="prop-test" title="Proportion Test" priority={4} points="5–7 pts">
          <Step n={1}>
            <strong>Hypotheses:</strong>
            <M t="H_0: p = p_0 \quad \text{vs} \quad H_1: p > p_0" d />
          </Step>
          <Step n={2}>
            <strong>Test statistic:</strong>
            <M t="Z = \frac{\hat{p} - p_0}{\sqrt{p_0(1-p_0)/n}} \sim N(0,1)" d />
          </Step>
          <Step n={3}>
            <strong>Check:</strong> <M t="np_0 \geq 5" /> and <M t="n(1-p_0) \geq 5" />
          </Step>
          <Step n={4}>
            <strong>For two proportions</strong> <M t="H_0: p_1 - p_2 = \Delta_0" />:
            <M t="Z = \frac{\hat{p}_1 - \hat{p}_2 - \Delta_0}{\sqrt{\frac{\hat{p}_1(1-\hat{p}_1)}{n_1} + \frac{\hat{p}_2(1-\hat{p}_2)}{n_2}}}" d />
          </Step>
          <Warning>
            <strong>When Δ₀ ≠ 0</strong> (offset test): the denominator uses individual <M t="\hat{p}" />'s, NOT the pooled proportion. Check conditions for <strong>each</strong> sample separately: <M t="n_1\hat{p}_1 \geq 5" />, <M t="n_1(1-\hat{p}_1) \geq 5" />, same for sample 2.
          </Warning>
          <Tip>
            <strong>2025 Exam:</strong> Test <M t="p_U - p_G > 0.1" /> at α = 1%. <M t="z_{\text{obs}} = 3.8984" />, <M t="z_{0.01} = 2.33" /> → reject. Key: subtract 0.1 in numerator.
          </Tip>
        </Recipe>

        <Recipe id="two-sample" title="Two-Sample z-Test (σ known)" priority={3} points="5 pts">
          <Step n={1}>
            <strong>Hypotheses</strong> (with optional offset Δ):
            <M t="H_0: \mu_1 - \mu_2 = \Delta_0 \quad \text{vs} \quad H_1: \mu_1 - \mu_2 > \Delta_0" d />
          </Step>
          <Step n={2}>
            <strong>Test statistic:</strong>
            <M t="Z = \frac{(\bar{X}_1 - \bar{X}_2) - \Delta_0}{\sqrt{\sigma_1^2/n_1 + \sigma_2^2/n_2}} \sim N(0,1)" d />
          </Step>
          <Step n={3}>
            Follow the standard 6-step procedure: assumptions, rejection region, compute <M t="z_{\text{obs}}" />, decide, conclude.
          </Step>
          <Tip>
            <strong>Resit 2024:</strong> Ore.com claims Δ ≥ 0.2. Test H₀: μ₁ − μ₂ = 0.2 vs H₁: μ₁ − μ₂ &gt; 0.2. z_obs = (10.0 − 8.4 − 0.2)/√(2.4²/50 + 2.1²/50) = 2.22. Compare to z₀.₀₀₅ = 2.576. Not in rejection region → do not reject.
          </Tip>
        </Recipe>

        <Recipe id="f-test" title="F-Test for Equal Variances" priority={3} points="3–5 pts">
          <Step n={1}>
            <strong>CI approach</strong> (most common on this exam):
            <p>Build CI for <M t="\sigma_1^2/\sigma_2^2" /> (see CI for Variance Ratio recipe).</p>
          </Step>
          <Step n={2}>
            <strong>Decision:</strong> If 1 ∈ CI → no evidence variances differ. If 1 ∉ CI → variances significantly different.
          </Step>
          <Step n={3}>
            <strong>If hypothesis test form:</strong>
            <M t="F = \frac{S_1^2}{S_2^2} \sim F(n_1-1, n_2-1)" d />
            <p>Two-sided: reject if <M t="F > F_{\alpha/2; n_1-1, n_2-1}" /> or <M t="F < F_{1-\alpha/2; n_1-1, n_2-1}" /></p>
          </Step>
          <Warning>
            <strong>Always state the assumption:</strong> "Both populations must be normally distributed for the F-CI / F-test to be valid." This is worth points!
          </Warning>
        </Recipe>

        <Recipe id="power" title="Power & Type II Error" priority={4} points="4 pts">
          <p><M t="\text{Power} = \pi(\mu_1) = P(\text{reject } H_0 \mid \mu = \mu_1)" /></p>
          <Step n={1}>
            <strong>Find the rejection region boundary in terms of <M t="\bar{X}" />:</strong>
            <p>For right-tailed z-test: reject when <M t="z \geq z_\alpha" />, so reject when:</p>
            <M t="\bar{X} \geq \mu_0 + z_\alpha \cdot \frac{\sigma}{\sqrt{n}}" d />
          </Step>
          <Step n={2}>
            <strong>Compute the cutoff value.</strong> E.g., <M t="\bar{X} \geq 19 + 1.645 \cdot \frac{2}{\sqrt{30}} = 19.601" />
          </Step>
          <Step n={3}>
            <strong>Under the alternative <M t="\mu = \mu_1" />, find:</strong>
            <M t="\pi(\mu_1) = P\!\left(\bar{X} \geq \text{cutoff} \mid \mu = \mu_1\right) = P\!\left(Z \geq \frac{\text{cutoff} - \mu_1}{\sigma/\sqrt{n}}\right)" d />
          </Step>
          <Step n={4}>
            <strong>Look up the probability</strong> from the standard normal table.
          </Step>
          <Diagram label="Power visualized">
{`  Under H₀ (μ₀)          Under H₁ (μ₁)
     ╱╲                      ╱╲
    ╱  ╲                    ╱  ╲
   ╱    ╲                  ╱    ╲
  ╱      ╲   ┃           ╱  ▓▓▓▓╲▓▓▓
 ╱        ╲  ┃  α       ╱▓▓▓▓▓▓▓▓╲▓▓
────────────┃─────  ──────▓▓▓▓▓▓▓▓▓──
           cutoff        Power = shaded`}
          </Diagram>
          <Tip>
            <strong>Type II error:</strong> <M t="\beta = 1 - \text{Power}" />. Ways to increase power: (1) increase n, (2) increase α, (3) decrease σ.
          </Tip>
        </Recipe>

        <Recipe id="p-value" title="p-Value Method" priority={3} points="3–4 pts">
          <Step n={1}>
            <strong>Compute the test statistic</strong> <M t="t_{\text{obs}}" /> or <M t="z_{\text{obs}}" />.
          </Step>
          <Step n={2}>
            <strong>Find the p-value:</strong>
            <Diagram label="p-value by test type">
{`  Right-tailed: p = P(T ≥ t_obs)
  Left-tailed:  p = P(T ≤ t_obs)
  Two-tailed:   p = 2·P(T ≥ |t_obs|)`}
            </Diagram>
          </Step>
          <Step n={3}>
            <strong>From t-table:</strong> Find df row, scan across to bracket <M t="t_{\text{obs}}" /> between two columns.
            <p>E.g., df = 29, <M t="t_{\text{obs}} = 2.490" /> falls between <M t="t_{0.01} = 2.462" /> and <M t="t_{0.005} = 2.756" /></p>
            <p>→ 0.005 &lt; p &lt; 0.01</p>
          </Step>
          <Step n={4}>
            <strong>Decision:</strong> If <M t="p \leq \alpha" /> → reject H₀. If <M t="p > \alpha" /> → do not reject.
          </Step>
        </Recipe>

        <Recipe id="type-i" title="Type I Error Computation" priority={2} points="4 pts">
          <p>Compute <M t="\alpha = P(\text{reject } H_0 \mid H_0 \text{ true})" />.</p>
          <Step n={1}>
            <strong>Identify the rejection region</strong> (given in the problem). E.g., reject if <M t="|X+Y| > 3" />.
          </Step>
          <Step n={2}>
            <strong>Find the distribution under H₀.</strong> E.g., if H₀ says <M t="W = X + Y \sim N(0,2)" />.
          </Step>
          <Step n={3}>
            <strong>Compute the probability:</strong>
            <M t="P(|W| > 3) = 2P(W > 3) = 2P\!\left(Z > \frac{3}{\sqrt{2}}\right) = 2P(Z > 2.121)" d />
          </Step>
          <Step n={4}>
            Look up and compute: <M t="= 2(1 - 0.9830) = 0.034" />
          </Step>
          <Tip>
            Use symmetry for two-tailed: <M t="P(|W| > c) = 2P(W > c)" />. Standardize W by dividing by its standard deviation.
          </Tip>
        </Recipe>

        <Recipe id="iterated-exp" title="Iterated Expectation E[E[Y|X]]" priority={2} points="3 pts">
          <p>Use <M t="E[Y] = E[E[Y|X]]" /> to find E[Y] when direct computation is hard.</p>
          <Step n={1}>
            <strong>Find <M t="E[Y|X=x]" /></strong> as a function of x.
          </Step>
          <Step n={2}>
            <strong>Take expectation over X:</strong>
            <M t="E[Y] = E_X[E[Y|X]] = \int E[Y|X=x] \cdot f_X(x)\, dx" d />
          </Step>
          <Step n={3}>
            Or for discrete X: <M t="E[Y] = \sum_x E[Y|X=x] \cdot P(X=x)" />
          </Step>
          <Tip>
            This is a powerful shortcut when the conditional distribution of Y|X is a known distribution (e.g., Uniform), making E[Y|X] easy, while the joint integral would be messy.
          </Tip>
        </Recipe>

        {/* ============ DECISION TREE ============ */}
        <div className="rb-part-divider">Quick Reference · Test Selection Flowchart</div>

        <div className="rb-recipe" id="flowchart">
          <div className="rb-recipe-head">
            <h3 className="rb-recipe-title">Which Test Do I Use?</h3>
          </div>
          <div className="rb-recipe-body">
            <Diagram label="Master decision tree for hypothesis tests">
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
  │   │   Z = (p̂ - p₀) / √(p₀(1-p₀)/n)
  │   └── Two proportions → z-test for p₁-p₂
  │       ⚠ Check np̂ ≥ 5 for EACH sample
  │
  ├── VARIANCE (σ²)
  │   ├── One variance → χ² test
  │   └── Two variances → F-test
  │       F = S₁²/S₂²
  │       ⚠ Both populations must be normal
  │
  └── DIFFERENCE IN MEANS (μ₁ - μ₂)
      ├── σ₁, σ₂ known → two-sample z-test
      ├── σ unknown, large n → z-test (use s)
      └── σ unknown, small n → pooled t-test
          ⚠ Needs equal variances + normality`}
            </Diagram>

            <Diagram label="Which CI formula?">
{`  ┌─────────────────┬────────────────────────────┐
  │ Parameter        │ Formula                    │
  ├─────────────────┼────────────────────────────┤
  │ μ (σ known)     │ x̄ ± z_{α/2} · σ/√n       │
  │ μ (σ unknown)   │ x̄ ± t_{α/2,n-1} · s/√n   │
  │ p               │ p̂ ± z_{α/2}·√(p̂q̂/n)     │
  │ μ₁ - μ₂        │ (x̄₁-x̄₂) ± z·√(σ²₁/n₁ +  │
  │                 │            σ²₂/n₂)          │
  │ σ₁²/σ₂²       │ Use F-distribution bounds   │
  │ σ²             │ Use χ² distribution bounds  │
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
