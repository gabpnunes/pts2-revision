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

function Card({ title, children, exam }) {
  return (
    <div className="lm-card">
      <h4 className="lm-card-title">{title}</h4>
      <div className="lm-card-body">{children}</div>
      {exam && (
        <div className="lm-exam-tip">
          <span className="lm-exam-label">Exam tip</span>
          <span>{exam}</span>
        </div>
      )}
    </div>
  )
}

const sections = [
  { id: 'joint-discrete', num: 1, title: 'Joint Discrete Distributions', part: 1 },
  { id: 'joint-continuous', num: 2, title: 'Joint Continuous Distributions', part: 1 },
  { id: 'expected-values', num: 3, title: 'Expected Values (Multivariate)', part: 1 },
  { id: 'independence', num: 4, title: 'Independence, Covariance & Correlation', part: 1 },
  { id: 'conditional', num: 5, title: 'Conditional Distributions', part: 1 },
  { id: 'mgf-bivariate', num: 6, title: 'Joint MGFs & Bivariate Normal', part: 1 },
  { id: 'transformations', num: 7, title: 'Transformations & Sums', part: 2 },
  { id: 'sampling', num: 8, title: 't/F, Samples & Order Statistics', part: 2 },
  { id: 'estimation', num: 9, title: 'Estimation & Confidence Intervals', part: 3 },
  { id: 'hyp-fundamentals', num: 10, title: 'Hypothesis Testing Fundamentals', part: 4 },
  { id: 'single-pop', num: 11, title: 'Single Population Tests', part: 4 },
  { id: 'two-pop', num: 12, title: 'Two Population Tests', part: 4 },
]

const partLabels = {
  1: 'Multivariate Distributions',
  2: 'Transformations & Sampling',
  3: 'Estimation',
  4: 'Hypothesis Testing',
}

export default function LastMin() {
  const [activeId, setActiveId] = useState(sections[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveId(e.target.id)
        }
      },
      { rootMargin: '-20% 0px -60% 0px' }
    )
    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  let lastPart = 0

  return (
    <div className="lm-root">
      <nav className="lm-sidebar">
        <Link to="/" className="lm-back">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Home
        </Link>
        <div className="lm-toc">
          {sections.map(s => {
            const showPart = s.part !== lastPart
            lastPart = s.part
            return (
              <div key={s.id}>
                {showPart && <div className="lm-toc-part">{partLabels[s.part]}</div>}
                <button
                  className={`lm-toc-item ${activeId === s.id ? 'active' : ''}`}
                  onClick={() => scrollTo(s.id)}
                >
                  <span className="lm-toc-num">{s.num}</span>
                  {s.title}
                </button>
              </div>
            )
          })}
        </div>
        <Link to="/content" className="lm-link-full">
          Full Study Guide
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </Link>
      </nav>

      <main className="lm-main">
        <div className="lm-header">
          <div className="eyebrow" style={{ color: 'var(--accent)' }}>Last Minute Revision</div>
          <h1 className="lm-title">Everything You Need,<br /><em>Nothing You Don't</em></h1>
          <p className="lm-subtitle">Every concept on the exam — one card each. What it is, the key formula, and how it gets asked.</p>
        </div>

        {/* ══════════════════════════════════════════════
            TOPIC 1 — JOINT DISCRETE DISTRIBUTIONS
            ══════════════════════════════════════════════ */}
        <section id="joint-discrete" className="lm-section">
          <div className="lm-section-head">
            <span className="lm-section-num">01</span>
            <h2>Joint Discrete Distributions</h2>
          </div>

          <Card title="Joint PDF (Def 5.1)" exam="Given a probability table, they'll ask you to find P(X ≤ 1, Y ≥ 2) — just sum the relevant cells.">
            <p>The joint PDF gives the probability of each pair: <M t={"f_{X,Y}(x,y) = P(X=x, Y=y)"} /></p>
            <p>Two rules for a valid joint PDF (Thm 5.1):</p>
            <ul>
              <li><M t={"f_{X,Y}(x,y) \\geq 0"} /> for all <M t={"(x,y)"} /></li>
              <li><M t={"\\sum_x \\sum_y f_{X,Y}(x,y) = 1"} /></li>
            </ul>
          </Card>

          <Card title="Marginal Distributions (Def 5.2)" exam="Sum across a row or column in the table to get the marginal. Often needed before computing E[X] or Var(X).">
            <p>To get the distribution of just <M t={"X"} />, sum out <M t={"Y"} />:</p>
            <M t={"f_X(x) = \\sum_{\\text{all } y} f_{X,Y}(x,y)"} d />
            <p>Same idea flipped for <M t={"f_Y(y)"} />. These are the row/column totals in a probability table.</p>
          </Card>

          <Card title="Joint CDF (Def 5.3)" exam="Rarely asked directly — but understand it factors as F_X · F_Y iff X, Y independent.">
            <M t={"F_{X,Y}(x,y) = P(X \\leq x, Y \\leq y)"} d />
            <p>Properties (Thm 5.2):</p>
            <ul>
              <li>Non-decreasing in each argument</li>
              <li><M t={"F_{X,Y}(\\infty, \\infty) = 1"} /></li>
              <li>Marginals: <M t={"F_X(x) = F_{X,Y}(x, \\infty)"} /></li>
            </ul>
          </Card>

          <Card title="Multinomial Distribution" exam="'n trials, k outcomes' — extend the binomial. They'll give you a scenario and ask for P(N₁=a, N₂=b, ...).">
            <M t={"P(N_1=n_1, \\ldots, N_k=n_k) = \\frac{n!}{n_1! \\cdots n_k!} p_1^{n_1} \\cdots p_k^{n_k}"} d />
            <p>where <M t={"\\sum n_i = n"} /> and <M t={"\\sum p_i = 1"} />. Each <M t={"N_i \\sim \\text{Bin}(n, p_i)"} /> marginally.</p>
          </Card>

          <Card title="Multivariate Hypergeometric" exam="Sampling WITHOUT replacement from k categories. Like multinomial but without replacement.">
            <M t={"P(X_1=x_1, \\ldots, X_k=x_k) = \\frac{\\binom{K_1}{x_1} \\cdots \\binom{K_k}{x_k}}{\\binom{N}{n}}"} d />
            <p>where <M t={"N = \\sum K_i"} /> total items, <M t={"n = \\sum x_i"} /> drawn. Each <M t={"X_i \\sim \\text{Hyp}(N, K_i, n)"} /> marginally.</p>
          </Card>

          <Card title="Multivariate Extension" exam="Everything extends from 2 to k variables. Joint PDF needs k-fold sum = 1. Marginals sum out all other variables.">
            <p>For <M t={"k"} /> variables: <M t={"f_{X_1,\\ldots,X_k}(x_1,\\ldots,x_k)"} /> satisfies:</p>
            <ul>
              <li>Non-negative everywhere</li>
              <li><M t={"\\sum_{x_1} \\cdots \\sum_{x_k} f = 1"} /></li>
              <li>Marginal of <M t={"X_1"} />: sum out <M t={"X_2, \\ldots, X_k"} /></li>
            </ul>
            <p><strong>3D → 2D:</strong> To get the joint of <M t={"(X,Y)"} /> from a 3D joint, integrate out <M t={"Z"} />: <M t={"f_{X,Y}(x,y) = \\int f_{X,Y,Z}(x,y,z)\\, dz"} />.</p>
          </Card>
        </section>

        {/* ══════════════════════════════════════════════
            TOPIC 2 — JOINT CONTINUOUS DISTRIBUTIONS
            ══════════════════════════════════════════════ */}
        <section id="joint-continuous" className="lm-section">
          <div className="lm-section-head">
            <span className="lm-section-num">02</span>
            <h2>Joint Continuous Distributions</h2>
          </div>

          <Card title="Joint PDF — Continuous (Def 5.4)" exam="They give you f(x,y) with a region. First task: draw the support. Second: integrate to find probabilities.">
            <p>The density <M t={"f_{X,Y}(x,y)"} /> is NOT a probability — you integrate to get one:</p>
            <M t={"P\\big((X,Y) \\in A\\big) = \\iint_A f_{X,Y}(x,y)\\, dx\\, dy"} d />
            <p>Valid PDF (Thm 5.3): non-negative everywhere, double integral over all <M t={"(x,y) = 1"} />.</p>
          </Card>

          <Card title="The Support Region" exam="ALWAYS draw this first. Getting the integration limits wrong is the #1 source of errors.">
            <p>The support is where <M t={"f_{X,Y}(x,y) > 0"} />. It determines your integration limits. Common shapes: triangles, rectangles, or regions bounded by curves.</p>
            <p>When integrating, one variable's range is independent (outer integral), the other depends on it (inner integral).</p>
          </Card>

          <Card title="CDF-PDF Relationship (Def 5.5)" exam="Differentiate CDF → PDF. Integrate PDF → CDF. For non-rectangular supports, the CDF integral needs case-splitting.">
            <M t={"f_{X,Y}(x,y) = \\frac{\\partial^2}{\\partial x\\, \\partial y} F_{X,Y}(x,y)"} d />
            <p>And going the other way: <M t={"F_{X,Y}(x,y) = \\int_{-\\infty}^x \\int_{-\\infty}^y f(s,t)\\, dt\\, ds"} /></p>
            <p><strong>Piecewise CDF:</strong> For non-rectangular supports (e.g. triangles), the integration limits change depending on where <M t={"(x,y)"} /> falls — split into cases by region.</p>
          </Card>

          <Card title="Marginal PDFs — Continuous (Def 5.6)" exam="Integrate out the other variable over the support. Watch the limits — they change with the outer variable.">
            <M t={"f_X(x) = \\int_{-\\infty}^{\\infty} f_{X,Y}(x,y)\\, dy"} d />
            <p>In practice you integrate over the support bounds for <M t={"y"} /> given <M t={"x"} />. The result is a function of <M t={"x"} /> only.</p>
          </Card>

          <Card title="Finding the Constant c" exam="Classic exam opener: 'find c such that f(x,y) = c·g(x,y) is a valid pdf.' Set the double integral = 1 and solve.">
            <M t={"\\int\\!\\!\\int f_{X,Y}(x,y)\\, dx\\, dy = 1 \\quad \\Rightarrow \\quad c = \\frac{1}{\\int\\!\\!\\int g(x,y)\\, dx\\, dy}"} d />
          </Card>

          <Card title="Computing Probabilities" exam="Draw support, identify the overlap with the region asked, set up double integral with correct limits.">
            <p>Recipe for <M t={"P((X,Y) \\in A)"} />:</p>
            <ol>
              <li><strong>Draw</strong> the support and the region <M t={"A"} /></li>
              <li><strong>Find overlap</strong> of support and <M t={"A"} /></li>
              <li><strong>Set limits</strong>: outer variable independent, inner depends on outer</li>
              <li><strong>Integrate</strong> <M t={"f_{X,Y}"} /> over the overlap</li>
            </ol>
          </Card>
        </section>

        {/* ══════════════════════════════════════════════
            TOPIC 3 — EXPECTED VALUES (MULTIVARIATE)
            ══════════════════════════════════════════════ */}
        <section id="expected-values" className="lm-section">
          <div className="lm-section-head">
            <span className="lm-section-num">03</span>
            <h2>Expected Values (Multivariate)</h2>
          </div>

          <Card title="E[g(X,Y)] — LOTUS (Thm 5.6)" exam="They give a joint PDF and ask for E[XY], E[X²+Y], etc. Plug g(x,y) into the double sum/integral with f(x,y).">
            <p>Compute expectations directly from the joint PDF — no need to find the distribution of <M t={"g(X,Y)"} /> first:</p>
            <M t={"E[g(X,Y)] = \\iint g(x,y) \\cdot f_{X,Y}(x,y)\\, dx\\, dy"} d />
            <p>(Use double sums for the discrete case.)</p>
          </Card>

          <Card title="Linearity of Expectation (Thm 5.7*)" exam="Works ALWAYS — independent or not. Use it to break complicated expectations into simple pieces.">
            <M t={"E[aX + bY + c] = aE[X] + bE[Y] + c"} d />
            <p>Extends to any number of variables and any constants. No independence needed. This is the most powerful expectation tool.</p>
          </Card>

          <Card title="Three-Step Method for E[XY]" exam="Continuous joint PDF → draw support → set up limits → integrate xy·f(x,y). Very common exam question.">
            <ol>
              <li><strong>Draw</strong> the support region</li>
              <li><strong>Set limits:</strong> outer variable independent, inner depends on outer</li>
              <li><strong>Integrate</strong> <M t={"\\iint xy \\cdot f_{X,Y}(x,y)\\, dx\\, dy"} /></li>
            </ol>
          </Card>

          <Card title="Special Cases of LOTUS" exam="These are just LOTUS with specific choices of g(x,y).">
            <ul>
              <li><M t={"g(x,y) = x"} /> → <M t={"E[X] = \\iint x \\cdot f_{X,Y}\\, dx\\, dy"} /> (same as using marginal)</li>
              <li><M t={"g(x,y) = xy"} /> → <M t={"E[XY]"} /> (needed for covariance)</li>
              <li><M t={"g(x,y) = (x - \\mu_X)^2"} /> → <M t={"\\text{Var}(X)"} /></li>
              <li><M t={"g(x,y) = ax + by + c"} /> → use linearity instead</li>
            </ul>
          </Card>

          <Card title="Variance Shortcut Formula" exam="Use both directions: Var = E[X²]−(E[X])², and reverse: E[X²] = Var + (E[X])². E.g. for Poi(λ): E[X²] = λ + λ².">
            <M t={"\\text{Var}(X) = E[X^2] - (E[X])^2"} d />
            <p><strong>Reverse:</strong> <M t={"E[X^2] = \\text{Var}(X) + (E[X])^2"} />. Use when you know a distribution's moments (e.g. Poisson: <M t={"E[X^2] = \\lambda + \\lambda^2"} />).</p>
          </Card>
        </section>

        {/* ══════════════════════════════════════════════
            TOPIC 4 — INDEPENDENCE, COVARIANCE & CORRELATION
            ══════════════════════════════════════════════ */}
        <section id="independence" className="lm-section">
          <div className="lm-section-head">
            <span className="lm-section-num">04</span>
            <h2>Independence, Covariance & Correlation</h2>
          </div>

          <Card title="Independence Definition (Def 5.13)" exam="Two-step test from Thm 5.10: (1) Is the support rectangular? (2) Does f(x,y) factor into g(x)·h(y)?">
            <p><M t={"X, Y"} /> independent <M t={"\\iff"} /> <M t={"f_{X,Y}(x,y) = f_X(x) \\cdot f_Y(y)"} /> for all <M t={"(x,y)"} />.</p>
            <p><strong>Practical test (Thm 5.10):</strong></p>
            <ol>
              <li>Support must be a <strong>rectangle</strong> (no variable depends on the other)</li>
              <li><M t={"f_{X,Y}(x,y)"} /> must <strong>factor</strong> as <M t={"g(x) \\cdot h(y)"} /></li>
            </ol>
            <p>If either fails → dependent. Both must hold for independence.</p>
          </Card>

          <Card title="Consequences of Independence (Thm 5.11)" exam="If independent, expectations factor, variances add, MGFs multiply. Know all five.">
            <p>If <M t={"X, Y"} /> are independent:</p>
            <ol>
              <li><M t={"E[g(X) \\cdot h(Y)] = E[g(X)] \\cdot E[h(Y)]"} /></li>
              <li>PGFs multiply: <M t={"G_{X+Y}(t) = G_X(t) \\cdot G_Y(t)"} /></li>
              <li>MGFs multiply: <M t={"M_{X+Y}(t) = M_X(t) \\cdot M_Y(t)"} /></li>
              <li><M t={"E[XY] = E[X] \\cdot E[Y]"} /></li>
              <li><M t={"\\text{Var}(X + Y) = \\text{Var}(X) + \\text{Var}(Y)"} /></li>
            </ol>
          </Card>

          <Card title="Covariance (Def 5.14)" exam="Use the computational formula Cov = E[XY] − E[X]E[Y]. Sampling without replacement always gives negative covariance.">
            <p><strong>Definition:</strong> <M t={"\\text{Cov}(X,Y) = E[(X - \\mu_X)(Y - \\mu_Y)]"} /></p>
            <p><strong>Computational formula (Thm 5.12):</strong></p>
            <M t={"\\text{Cov}(X,Y) = E[XY] - E[X]E[Y]"} d />
            <p>If independent: <M t={"E[XY] = E[X]E[Y]"} />, so <M t={"\\text{Cov} = 0"} />.</p>
            <p><strong>Symmetry shortcut:</strong> If the support is symmetric and <M t={"xy \\cdot f(x,y)"} /> is an odd function, then <M t={"E[XY] = 0"} /> by symmetry — no integral needed.</p>
          </Card>

          <Card title="Covariance Algebra (Thm 5.13)" exam="These four rules let you expand covariance of any linear combination. Used heavily in variance calculations.">
            <ol>
              <li><M t={"\\text{Cov}(X, X) = \\text{Var}(X)"} /></li>
              <li><M t={"\\text{Cov}(X, Y) = \\text{Cov}(Y, X)"} /> (symmetric)</li>
              <li><M t={"\\text{Cov}(aX + b, Y) = a\\,\\text{Cov}(X, Y)"} /> (linear in each argument)</li>
              <li><M t={"\\text{Cov}(X_1 + X_2, Y) = \\text{Cov}(X_1, Y) + \\text{Cov}(X_2, Y)"} /></li>
            </ol>
            <p><strong>General formula (Ex 5.37):</strong></p>
            <M t={"\\text{Cov}\\!\\left(\\sum a_i X_i,\\; \\sum b_j Y_j\\right) = \\sum_i \\sum_j a_i b_j\\, \\text{Cov}(X_i, Y_j)"} d />
          </Card>

          <Card title="Var(aX + bY + c) (Thm 5.14)" exam="Classic trap: Var(X+Y) ≠ Var(2X) even when X,Y are i.i.d.! Two sources of randomness vs one doubled.">
            <M t={"\\text{Var}(aX + bY + c) = a^2\\text{Var}(X) + b^2\\text{Var}(Y) + 2ab\\,\\text{Cov}(X,Y)"} d />
            <p>Constants don't affect variance. If independent, the covariance term vanishes.</p>
            <p><strong>Exam trap:</strong> <M t={"\\text{Var}(X+Y) = 2\\sigma^2"} /> but <M t={"\\text{Var}(2X) = 4\\sigma^2"} /> (for i.i.d.). Two independent sources ≠ one source doubled.</p>
          </Card>

          <Card title="Correlation Coefficient (Def 5.15)" exam="Know both directions: ρ = Cov/(σ_Xσ_Y), and Cov = ρσ_Xσ_Y. Exams often give ρ and ask for Var(aX+bY).">
            <M t={"\\rho_{X,Y} = \\frac{\\text{Cov}(X,Y)}{\\sigma_X \\sigma_Y}"} d />
            <p><strong>Reverse:</strong> <M t={"\\text{Cov}(X,Y) = \\rho \\cdot \\sigma_X \\cdot \\sigma_Y"} />. Use this to recover Cov when given <M t={"\\rho"} />.</p>
            <p><M t={"-1 \\leq \\rho \\leq 1"} /> (Thm 5.15). <M t={"\\rho = \\pm 1 \\iff Y = aX + b"} />. Exception: for BVN, <M t={"\\rho = 0 \\iff"} /> independent.</p>
          </Card>

          <Card title="Uncorrelated ≠ Independent" exam="Two classic counterexamples: (1) X vs X², (2) X−Y vs X+Y. Both have Cov=0 but are dependent.">
            <p>Independence → <M t={"\\text{Cov} = 0"} /> (always true).</p>
            <p><M t={"\\text{Cov} = 0"} /> → independence (FALSE in general).</p>
            <p><strong>Example 1:</strong> <M t={"X \\sim \\text{Uniform}(-1,1)"} />, <M t={"Y = X^2"} />. <M t={"\\text{Cov} = 0"} /> but <M t={"Y"} /> is determined by <M t={"X"} />.</p>
            <p><strong>Example 2:</strong> <M t={"U = X-Y"} />, <M t={"V = X+Y"} />. <M t={"\\text{Cov}(U,V) = \\text{Var}(X) - \\text{Var}(Y) = 0"} /> when <M t={"\\text{Var}(X) = \\text{Var}(Y)"} />, but <M t={"U,V"} /> share <M t={"X"} /> and <M t={"Y"} /> so are dependent.</p>
            <p>Exception: for <strong>BVN</strong>, <M t={"\\rho = 0 \\iff"} /> independent.</p>
          </Card>

          <Card title="Mutual vs Pairwise Independence (Def 5.16)" exam="Three variables can be pairwise independent without being mutually independent. Know the difference.">
            <p><strong>Pairwise:</strong> every pair is independent: <M t={"f_{X_i,X_j} = f_{X_i} \\cdot f_{X_j}"} /> for all <M t={"i \\neq j"} />.</p>
            <p><strong>Mutual:</strong> the full joint factors: <M t={"f_{X_1,\\ldots,X_n} = f_{X_1} \\cdots f_{X_n}"} />.</p>
            <p>Mutual → pairwise, but pairwise ↛ mutual.</p>
          </Card>

          <Card title="Variance of General Linear Combination (Thm 5.18)" exam="For sums of n variables. Expands to n variance terms + n(n−1) covariance terms.">
            <M t={"\\text{Var}\\!\\left(\\sum_{i=1}^n a_i X_i\\right) = \\sum_{i=1}^n a_i^2 \\text{Var}(X_i) + 2\\sum_{i<j} a_i a_j \\text{Cov}(X_i, X_j)"} d />
            <p>If all independent, the double sum vanishes and variances just scale by <M t={"a_i^2"} />.</p>
          </Card>

          <Card title="Covariance Matrix Σ" exam="Matrix form of covariance. Diagonal = variances, off-diagonal = covariances. Used in MVN and quadratic forms.">
            <M t={"\\Sigma = \\begin{pmatrix} \\text{Var}(X_1) & \\text{Cov}(X_1,X_2) & \\cdots \\\\ \\text{Cov}(X_2,X_1) & \\text{Var}(X_2) & \\cdots \\\\ \\vdots & \\vdots & \\ddots \\end{pmatrix}"} d />
            <p>Symmetric (<M t={"\\Sigma_{ij} = \\Sigma_{ji}"} />). Key formula for quadratic forms:</p>
            <M t={"\\text{Var}(\\mathbf{a}^T \\mathbf{X}) = \\mathbf{a}^T \\Sigma \\, \\mathbf{a}"} d />
          </Card>
        </section>

        {/* ══════════════════════════════════════════════
            TOPIC 5 — CONDITIONAL DISTRIBUTIONS
            ══════════════════════════════════════════════ */}
        <section id="conditional" className="lm-section">
          <div className="lm-section-head">
            <span className="lm-section-num">05</span>
            <h2>Conditional Distributions</h2>
          </div>

          <Card title="Conditional PDF (Def 5.17)" exam="Given f(x,y), find f(y|x) = f(x,y)/f_X(x). Then compute E[Y|X=x] by integrating y·f(y|x).">
            <M t={"f_{Y|X}(y \\mid x) = \\frac{f_{X,Y}(x,y)}{f_X(x)}, \\quad f_X(x) > 0"} d />
            <p>Divide joint by marginal. The result is a valid PDF in <M t={"y"} /> (sums/integrates to 1).</p>
          </Card>

          <Card title="Properties of Conditional Distributions" exam="These properties let you verify your answer and use conditional distributions like regular distributions.">
            <ol>
              <li><M t={"f_{Y|X}(y \\mid x) \\geq 0"} /> for all <M t={"y"} /></li>
              <li><M t={"\\sum_y f_{Y|X}(y \\mid x) = 1"} /> (or <M t={"\\int = 1"} />)</li>
              <li><M t={"P(Y \\in A \\mid X = x) = \\sum_{y \\in A} f_{Y|X}(y \\mid x)"} /></li>
              <li>All expectation rules apply: <M t={"E[g(Y) \\mid X=x] = \\sum g(y) f_{Y|X}(y \\mid x)"} /></li>
            </ol>
          </Card>

          <Card title="Independence ↔ Conditional = Marginal (Thm 5.19)" exam="If X,Y independent, conditioning on X doesn't change Y's distribution. Quick check for independence.">
            <M t={"X, Y \\text{ independent} \\iff f_{Y|X}(y \\mid x) = f_Y(y) \\text{ for all } x, y"} d />
            <p>Knowing <M t={"X"} /> tells you nothing new about <M t={"Y"} />.</p>
          </Card>

          <Card title="Conditional Expectation (Def 5.18)" exam="Two ways they ask: (1) find E[Y|X=2] (plug in and compute), (2) find E[Y|X] as a function of X.">
            <M t={"E[Y \\mid X=x] = \\int y \\cdot f_{Y|X}(y \\mid x)\\, dy"} d />
            <p>This is a function of <M t={"x"} />. When viewed as a random variable (plug in <M t={"X"} />), it becomes <M t={"E[Y \\mid X]"} />.</p>
          </Card>

          <Card title="Conditional Variance" exam="Same idea as conditional expectation. The conditional variance is also a function of x.">
            <M t={"\\text{Var}(Y \\mid X=x) = E[Y^2 \\mid X=x] - \\big(E[Y \\mid X=x]\\big)^2"} d />
            <p>Equivalently: <M t={"\\text{Var}(Y \\mid X=x) = \\int (y - E[Y|X=x])^2 f_{Y|X}(y|x)\\, dy"} /></p>
          </Card>

          <Card title="Law of Total Expectation (Thm 5.21)" exam="Use this to compute E[Y] when it's hard directly but E[Y|X] is easy. E[Y] = E[E[Y|X]].">
            <M t={"E[Y] = E\\big[E[Y \\mid X]\\big]"} d />
            <p>Take the conditional expectation (a function of <M t={"X"} />) and average it over <M t={"X"} />. The outer E uses the distribution of <M t={"X"} />.</p>
          </Card>

          <Card title="Law of Total Variance" exam="Var(Y) = E[Var(Y|X)] + Var(E[Y|X]). Decompose total variance into 'within' + 'between'.">
            <M t={"\\text{Var}(Y) = E\\big[\\text{Var}(Y \\mid X)\\big] + \\text{Var}\\big(E[Y \\mid X]\\big)"} d />
            <p>First term: average variance within each group. Second term: variance of group means.</p>
          </Card>

          <Card title="Tower Property for E[XY]" exam="When you can't compute E[XY] directly via LOTUS, use the tower property: condition on one variable, pull it out.">
            <M t={"E[XY] = E\\big[E[XY \\mid X]\\big] = E\\big[X \\cdot E[Y \\mid X]\\big]"} d />
            <p><strong>Key rule:</strong> <M t={"E[g(X) \\cdot Y \\mid X] = g(X) \\cdot E[Y \\mid X]"} /> — known functions of <M t={"X"} /> pull out of <M t={"E[\\cdot \\mid X]"} />.</p>
            <p>Use when the conditional relationship is given but the joint PDF is not.</p>
          </Card>

          <Card title="Conditioning on Events vs Values" exam="Don't confuse P(A | B) with f(y|x). Events use Bayes' rule with double integrals; values use the conditional PDF.">
            <p><strong>On a value:</strong> <M t={"f_{Y|X}(y|x) = f_{X,Y}(x,y)/f_X(x)"} /> — gives a conditional PDF.</p>
            <p><strong>On an event:</strong> <M t={"P(X \\leq a \\mid Y \\leq b) = \\frac{P(X \\leq a, Y \\leq b)}{P(Y \\leq b)}"} /> — uses Bayes' rule with double integral in numerator, marginal CDF in denominator.</p>
          </Card>

          <Card title="Five-Step Conditional Recipe" exam="Follow this recipe whenever you see a conditional distribution question on the exam.">
            <ol>
              <li><strong>Find marginal</strong> <M t={"f_X(x)"} /> by integrating out <M t={"y"} /></li>
              <li><strong>Compute conditional</strong> <M t={"f_{Y|X}(y|x) = f_{X,Y}/f_X"} /></li>
              <li><strong>Recognise</strong> the form (is it a known distribution?)</li>
              <li><strong>Conditional expectation</strong>: <M t={"E[Y|X=x] = \\int y f_{Y|X}\\, dy"} /></li>
              <li><strong>Total expectation</strong>: <M t={"E[Y] = E[E[Y|X]]"} /></li>
            </ol>
          </Card>
        </section>

        {/* ══════════════════════════════════════════════
            TOPIC 6 — JOINT MGFs & BIVARIATE NORMAL
            ══════════════════════════════════════════════ */}
        <section id="mgf-bivariate" className="lm-section">
          <div className="lm-section-head">
            <span className="lm-section-num">06</span>
            <h2>Joint MGFs & Bivariate Normal</h2>
          </div>

          <Card title="Joint MGF (Def 5.20)" exam="Compute M(t,u) = E[e^{tX+uY}]. Extract moments by differentiating and setting t=u=0.">
            <M t={"M_{X,Y}(t,u) = E[e^{tX+uY}]"} d />
            <p>Four key properties:</p>
            <ul>
              <li><strong>Moments:</strong> <M t={"\\frac{\\partial^{r+s}}{\\partial t^r \\partial u^s} M(0,0) = E[X^r Y^s]"} /></li>
              <li><strong>Marginals:</strong> <M t={"M_X(t) = M_{X,Y}(t, 0)"} />, <M t={"M_Y(u) = M_{X,Y}(0, u)"} /></li>
              <li><strong>Uniqueness:</strong> the joint MGF uniquely determines the joint distribution</li>
              <li><strong>Independence:</strong> <M t={"M_{X,Y}(t,u) = M_X(t) \\cdot M_Y(u) \\iff"} /> independent</li>
            </ul>
          </Card>

          <Card title="Multinomial MGF" exam="Extension of binomial MGF. Know how to extract marginals by setting all but one parameter to 0.">
            <p>For <M t={"(N_1, \\ldots, N_k) \\sim \\text{Multinomial}(n, p_1, \\ldots, p_k)"} />:</p>
            <M t={"M(t_1, \\ldots, t_k) = \\left(\\sum_{i=1}^k p_i e^{t_i}\\right)^{\\!n}"} d />
          </Card>

          <Card title="Bivariate Normal — Definition (Def 5.21)" exam="Know the 5 parameters. The BIG fact: ρ = 0 ⟺ independent. This is UNIQUE to BVN.">
            <p><M t={"(X,Y) \\sim \\text{BVN}(\\mu_X, \\mu_Y, \\sigma_X^2, \\sigma_Y^2, \\rho)"} /></p>
            <p>Five parameters: two means, two variances, one correlation <M t={"\\rho"} />.</p>
          </Card>

          <Card title="BVN Marginals (Thm 5.26)" exam="Each component of a BVN is individually normal. But two normals are NOT necessarily BVN together.">
            <p><M t={"X \\sim N(\\mu_X, \\sigma_X^2)"} /> and <M t={"Y \\sim N(\\mu_Y, \\sigma_Y^2)"} /></p>
            <p>The marginals are normal with the first four parameters. But two individually normal RVs don't form a BVN unless jointly normal.</p>
          </Card>

          <Card title="BVN Conditionals (Thm 5.27)" exam="Given (X,Y) ~ BVN, find distribution of Y|X=x. It's normal with adjusted mean and reduced variance.">
            <M t={"Y \\mid X=x \\sim N\\!\\left(\\mu_Y + \\rho\\frac{\\sigma_Y}{\\sigma_X}(x - \\mu_X),\\; \\sigma_Y^2(1-\\rho^2)\\right)"} d />
            <p>Conditional mean is linear in <M t={"x"} />. Conditional variance doesn't depend on <M t={"x"} /> and is always <M t={"\\leq \\sigma_Y^2"} />.</p>
          </Card>

          <Card title="BVN Independence (Thm 5.28)" exam="UNIQUE to BVN: ρ = 0 ⟺ independent. In general, uncorrelated ≠ independent, but for BVN it does.">
            <p>For <M t={"(X,Y) \\sim \\text{BVN}"} />:</p>
            <M t={"\\rho = 0 \\iff X, Y \\text{ independent}"} d />
            <p>This is because the BVN joint MGF factors when <M t={"\\rho = 0"} />:</p>
            <M t={"M_{X,Y}(t,u) = \\exp\\!\\left(\\mu_X t + \\mu_Y u + \\tfrac{1}{2}\\sigma_X^2 t^2 + \\tfrac{1}{2}\\sigma_Y^2 u^2 + \\rho \\sigma_X \\sigma_Y tu\\right)"} d />
          </Card>

          <Card title="Multivariate Normal (Def 5.22)" exam="Matrix form. Know that Σ is the covariance matrix and μ is the mean vector.">
            <p><M t={"\\mathbf{X} \\sim N_k(\\boldsymbol{\\mu}, \\Sigma)"} /> where <M t={"\\boldsymbol{\\mu}"} /> is the mean vector and <M t={"\\Sigma"} /> is the <M t={"k \\times k"} /> covariance matrix.</p>
            <p>Joint MGF: <M t={"M(\\mathbf{t}) = \\exp\\!\\left(\\boldsymbol{\\mu}^T \\mathbf{t} + \\frac{1}{2}\\mathbf{t}^T \\Sigma\\, \\mathbf{t}\\right)"} /></p>
            <p>Any linear combination of MVN components is also normal.</p>
          </Card>

          <Card title="Joint MGF of Linear Combinations" exam="To test if V=aX+bY, W=cX+dY are independent: compute M_{V,W}(s,t), check if it factors.">
            <p>Write <M t={"M_{V,W}(s,t) = E[e^{sV+tW}]"} />, substitute the linear definitions, group terms by original variable:</p>
            <M t={"= E[e^{(sa+tc)X}] \\cdot E[e^{(sb+td)Y}] = M_X(sa+tc) \\cdot M_Y(sb+td)"} d />
            <p>If the result factors as <M t={"g(s) \\cdot h(t)"} /> → independent. If not (e.g. cross-term <M t={"st"} /> appears) → dependent.</p>
            <p><strong>Proving BVN:</strong> If the exponent matches the BVN quadratic form, the pair is BVN — read off all 5 parameters.</p>
          </Card>

          <Card title="T² ~ F(1, ν)" exam="Squaring a t gives an F. Connects t-tests to F-tests.">
            <M t={"T \\sim t(\\nu) \\implies T^2 \\sim F(1, \\nu)"} d />
            <p>Proof: <M t={"T^2 = Z^2/(V/\\nu)"} />, and <M t={"Z^2 \\sim \\chi^2(1)"} />, so <M t={"T^2 = (\\chi^2(1)/1)/(\\chi^2(\\nu)/\\nu) = F(1,\\nu)"} />.</p>
          </Card>
        </section>

        {/* ══════════════════════════════════════════════
            TOPIC 7 — TRANSFORMATIONS & SUMS
            ══════════════════════════════════════════════ */}
        <section id="transformations" className="lm-section">
          <div className="lm-section-head">
            <span className="lm-section-num">07</span>
            <h2>Transformations & Distributions of Sums</h2>
          </div>

          <Card title="CDF Method" exam="Most general method. For ratios W=Y/X, the line y=wx intersects the support differently for different w — split into cases.">
            <ol>
              <li>Define <M t={"W = h(X, Y)"} /></li>
              <li>Write <M t={"F_W(w) = P(W \\leq w)"} /></li>
              <li>Express as integral over known PDF</li>
              <li>Differentiate: <M t={"f_W(w) = F_W'(w)"} /></li>
            </ol>
            <p><strong>Ratio W=Y/X:</strong> The region <M t={"\\{Y/X \\leq w\\}"} /> changes shape depending on <M t={"w"} />. Draw how the line <M t={"y = wx"} /> sweeps through the support — case-split where it crosses a boundary.</p>
          </Card>

          <Card title="Transformation — Discrete (Thm 6.1)" exam="For discrete RVs, just collect all (x,y) pairs that map to the same w and sum their probabilities.">
            <M t={"f_W(w) = \\sum_{(x,y):\\, h(x,y)=w} f_{X,Y}(x,y)"} d />
            <p>List all input pairs giving each output value. No calculus needed.</p>
          </Card>

          <Card title="Jacobian Method — Continuous (Thm 6.2)" exam="For 1-to-1 transformations. Works in any dimension — 1D, 2D, or 3D. Compute the determinant of the inverse-derivative matrix.">
            <p>If <M t={"W = h(X)"} /> is one-to-one with inverse <M t={"X = h^{-1}(W)"} />:</p>
            <M t={"f_W(w) = f_X(h^{-1}(w)) \\cdot \\left|\\frac{d}{dw}h^{-1}(w)\\right|"} d />
            <p>For 2D: Jacobian <M t={"|J| = \\left|\\frac{\\partial(x,y)}{\\partial(w,z)}\\right|"} />. For 3D: compute the <M t={"3 \\times 3"} /> determinant <M t={"|J| = \\left|\\frac{\\partial(x,y,z)}{\\partial(u,v,w)}\\right|"} />.</p>
          </Card>

          <Card title="Auxiliary Variable Technique" exam="When you want f_W but have two variables. Introduce Z = Y (or something simple), find joint of (W,Z), then integrate out Z.">
            <ol>
              <li>Set <M t={"W = h(X,Y)"} /> (target) and <M t={"Z = Y"} /> (auxiliary)</li>
              <li>Find inverse: express <M t={"X, Y"} /> in terms of <M t={"W, Z"} /></li>
              <li>Compute the Jacobian <M t={"|J|"} /></li>
              <li>Joint PDF: <M t={"f_{W,Z}(w,z) = f_{X,Y}(x(w,z),\\, y(w,z)) \\cdot |J|"} /></li>
              <li>Marginalise: <M t={"f_W(w) = \\int f_{W,Z}(w,z)\\, dz"} /></li>
            </ol>
          </Card>

          <Card title="MGF Method for Sums" exam="For sum of independent RVs: multiply MGFs, recognise the resulting distribution. Cleanest method when it works.">
            <p>If <M t={"X, Y"} /> independent:</p>
            <M t={"M_{X+Y}(t) = M_X(t) \\cdot M_Y(t)"} d />
            <p>Compute the product, recognise the form → identify the distribution by uniqueness of MGFs.</p>
          </Card>

          <Card title="i.i.d. and Sums" exam="For i.i.d. X₁,...,Xₙ: E[sum] = nμ, Var(sum) = nσ². Used everywhere in sampling theory.">
            <p><strong>i.i.d.</strong> = independent and identically distributed. If <M t={"X_1, \\ldots, X_n"} /> are i.i.d.:</p>
            <ul>
              <li><M t={"E\\left[\\sum X_i\\right] = n\\mu"} /></li>
              <li><M t={"\\text{Var}\\left(\\sum X_i\\right) = n\\sigma^2"} /></li>
              <li><M t={"M_{\\sum X_i}(t) = [M_X(t)]^n"} /></li>
            </ul>
          </Card>

          <Card title="Closure Under Summation" exam="Know which distributions are closed under sums. They WILL test this. Same rate/scale parameter required for Gamma/Binomial.">
            <ul>
              <li><M t={"N(\\mu_1, \\sigma_1^2) + N(\\mu_2, \\sigma_2^2) = N(\\mu_1+\\mu_2, \\sigma_1^2+\\sigma_2^2)"} /></li>
              <li><M t={"\\text{Gamma}(\\alpha_1, \\beta) + \\text{Gamma}(\\alpha_2, \\beta) = \\text{Gamma}(\\alpha_1+\\alpha_2, \\beta)"} /> (same <M t={"\\beta"} />!)</li>
              <li><M t={"\\chi^2(\\nu_1) + \\chi^2(\\nu_2) = \\chi^2(\\nu_1+\\nu_2)"} /></li>
              <li><M t={"\\text{Poi}(\\lambda_1) + \\text{Poi}(\\lambda_2) = \\text{Poi}(\\lambda_1+\\lambda_2)"} /></li>
              <li><M t={"\\text{Bin}(n_1, p) + \\text{Bin}(n_2, p) = \\text{Bin}(n_1+n_2, p)"} /> (same <M t={"p"} />!)</li>
            </ul>
          </Card>

          <Card title="PDF Recognition Checklist" exam="After deriving a PDF, always check if it matches a named distribution. This often simplifies the rest of the question.">
            <ul>
              <li><M t={"ye^{-y}"} /> on <M t={"[0,\\infty)"} /> → <M t={"\\text{Gamma}(2,1)"} /></li>
              <li><M t={"e^{-y}"} /> on <M t={"[0,\\infty)"} /> → <M t={"\\text{Exp}(1)"} /></li>
              <li><M t={"\\lambda e^{-\\lambda y}"} /> → <M t={"\\text{Exp}(\\lambda)"} /></li>
              <li><M t={"y^{\\alpha-1}e^{-y/\\beta}"} /> → <M t={"\\text{Gamma}(\\alpha, \\beta)"} /></li>
              <li><M t={"ye^{-y^2/2}"} /> on <M t={"[0,\\infty)"} /> → Rayleigh</li>
              <li><M t={"e^{-e^{-y}} \\cdot e^{-y}"} /> → Gumbel (standard)</li>
            </ul>
            <p>Always check: does your derived PDF match one of these? If so, use known moments/properties.</p>
          </Card>

          <Card title="Comparison of Three Methods" exam="Choose the right method: CDF = most general; Jacobian = 1-to-1 transforms; MGF = sums of independents.">
            <ul>
              <li><strong>CDF method:</strong> always works, can be tedious. Best for non-monotone transforms or when regions are tricky.</li>
              <li><strong>Jacobian/transformation:</strong> elegant for 1-to-1 continuous transforms. Must compute inverse and derivative.</li>
              <li><strong>MGF method:</strong> cleanest for sums of independent RVs. Requires recognising the resulting MGF.</li>
            </ul>
          </Card>
        </section>

        {/* ══════════════════════════════════════════════
            TOPIC 8 — t/F, SAMPLES & ORDER STATISTICS
            ══════════════════════════════════════════════ */}
        <section id="sampling" className="lm-section">
          <div className="lm-section-head">
            <span className="lm-section-num">08</span>
            <h2>t/F Distributions, Samples & Order Statistics</h2>
          </div>

          <Card title="t-Distribution (Def 6.1)" exam="Used when σ is unknown and replaced by S. Know: T = (X̄ − μ)/(S/√n) ~ t(n−1).">
            <p>Arises from: <M t={"T = \\frac{Z}{\\sqrt{V/\\nu}} \\sim t(\\nu)"} /> where <M t={"Z \\sim N(0,1)"} />, <M t={"V \\sim \\chi^2(\\nu)"} /> independent.</p>
            <p>Symmetric, bell-shaped, heavier tails than normal. As <M t={"\\nu \\to \\infty"} />, converges to <M t={"N(0,1)"} />.</p>
            <p>Moments (Thm 6.5): <M t={"E[T] = 0"} /> (<M t={"\\nu > 1"} />), <M t={"\\text{Var}(T) = \\nu/(\\nu-2)"} /> (<M t={"\\nu > 2"} />).</p>
          </Card>

          <Card title="t Critical Values" exam="t tables give t_{ν,α} where P(T > t_{ν,α}) = α. Symmetry: t_{ν,1−α} = −t_{ν,α}.">
            <p><M t={"t_{\\nu;\\,\\alpha}"} /> = value where upper-tail probability is <M t={"\\alpha"} />.</p>
            <p>Symmetry property: <M t={"t_{\\nu;\\,1-\\alpha} = -t_{\\nu;\\,\\alpha}"} /></p>
            <p>Key fact: <M t={"t_{\\nu;\\,\\alpha} > z_\\alpha"} /> always (t is wider than z), but <M t={"t \\to z"} /> as <M t={"\\nu \\to \\infty"} />.</p>
          </Card>

          <Card title="F-Distribution (Def 6.2)" exam="Ratio of two chi-squares. Used for comparing variances. F = (S₁²/σ₁²)/(S₂²/σ₂²).">
            <M t={"F = \\frac{V_1/\\nu_1}{V_2/\\nu_2} \\sim F(\\nu_1, \\nu_2)"} d />
            <p>where <M t={"V_1 \\sim \\chi^2(\\nu_1)"} />, <M t={"V_2 \\sim \\chi^2(\\nu_2)"} /> independent.</p>
            <p>Moments (Thm 6.7): <M t={"E[F] = \\nu_2/(\\nu_2 - 2)"} /> for <M t={"\\nu_2 > 2"} />.</p>
          </Card>

          <Card title="F Reciprocal Property" exam="Don't need a separate lower critical value — just flip numerator/denominator and swap df.">
            <M t={"\\frac{1}{F(\\nu_1, \\nu_2)} \\sim F(\\nu_2, \\nu_1)"} d />
            <p>So <M t={"f_{\\nu_1,\\nu_2;\\,1-\\alpha} = \\frac{1}{f_{\\nu_2,\\nu_1;\\,\\alpha}}"} />. This lets you compute lower critical values from upper ones.</p>
            <p><strong>Algebra tip:</strong> For expressions like <M t={"P(Y/(1+Y) > c)"} />, rearrange to <M t={"P(Y > c/(1-c))"} /> before looking up the F-table.</p>
          </Card>

          <Card title="Distribution of X̄ (Thm 6.12)" exam="This is the foundation for ALL inference. Know it cold.">
            <p>From <M t={"X_1, \\ldots, X_n \\stackrel{\\text{iid}}{\\sim} N(\\mu, \\sigma^2)"} />:</p>
            <M t={"\\bar{X} \\sim N\\!\\left(\\mu,\\, \\frac{\\sigma^2}{n}\\right)"} d />
            <p>Standardised: <M t={"Z = \\frac{\\bar{X} - \\mu}{\\sigma/\\sqrt{n}} \\sim N(0,1)"} /></p>
          </Card>

          <Card title="Central Limit Theorem" exam="For large n (≥30), X̄ is approximately normal regardless of the population. This justifies z-tests on non-normal data.">
            <M t={"\\bar{X} \\approx N\\!\\left(\\mu, \\frac{\\sigma^2}{n}\\right) \\quad \\text{for large } n"} d />
            <p>Equivalently: <M t={"\\frac{\\bar{X} - \\mu}{\\sigma/\\sqrt{n}} \\approx N(0,1)"} />. Works for <em>any</em> population with finite mean and variance.</p>
          </Card>

          <Card title="Distribution of S² (Thm 6.14)" exam="(n−1)S²/σ² ~ χ²(n−1). Use Var(χ²(k))=2k to derive Var(S²)=2σ⁴/(n−1).">
            <p>From a normal population:</p>
            <M t={"\\frac{(n-1)S^2}{\\sigma^2} \\sim \\chi^2(n-1)"} d />
            <p>Crucially: <M t={"\\bar{X}"} /> and <M t={"S^2"} /> are <strong>independent</strong>. This independence is what makes the t-distribution work.</p>
            <p><strong>Variance of S²:</strong> Since <M t={"\\text{Var}(\\chi^2(k)) = 2k"} />, scaling gives <M t={"\\text{Var}(S^2) = \\frac{2\\sigma^4}{n-1}"} />.</p>
          </Card>

          <Card title="Sum of Squared Normals (Thm 6.13)" exam="Sum of n squared standard normals = χ²(n). Connects normal to chi-squared.">
            <p>If <M t={"Z_1, \\ldots, Z_n \\stackrel{\\text{iid}}{\\sim} N(0,1)"} />:</p>
            <M t={"\\sum_{i=1}^n Z_i^2 \\sim \\chi^2(n)"} d />
          </Card>

          <Card title="χ² ↔ Gamma ↔ Exponential" exam="Convert Exp data to χ² to use tables. E.g. P(2λΣX_i ≤ c) can be looked up directly from the χ²(2n) table.">
            <ul>
              <li><M t={"\\chi^2(n) = \\text{Gamma}(n/2,\\; 2)"} /></li>
              <li><M t={"\\chi^2(2) = \\text{Exp}(1/2)"} /> (special case)</li>
              <li>If <M t={"X \\sim \\text{Exp}(\\lambda)"} />, then <M t={"2\\lambda X \\sim \\chi^2(2)"} /></li>
              <li><M t={"\\sum_{i=1}^n \\text{Exp}(\\lambda) = \\text{Gamma}(n, \\lambda)"} />, so <M t={"2\\lambda \\sum X_i \\sim \\chi^2(2n)"} /></li>
            </ul>
            <p><strong>Table lookup:</strong> Rearrange probability inequalities involving Exp sums into <M t={"\\chi^2"} /> form, then use the chi-squared table for critical values/quantiles.</p>
          </Card>

          <Card title="Prediction Intervals" exam="Different from CI! A CI estimates the mean, a prediction interval covers a future observation.">
            <p>A <M t={"100(1-\\alpha)\\%"} /> prediction interval for a future observation <M t={"X_{n+1}"} />:</p>
            <M t={"\\bar{X} \\pm t_{n-1;\\,\\alpha/2} \\cdot S\\sqrt{1 + \\frac{1}{n}}"} d />
            <p>Always wider than the CI because it accounts for both estimation uncertainty and individual variability.</p>
          </Card>

          <Card title="Standardising Non-i.i.d. Normals" exam="When X_i ~ N(μ_i, σ_i²) with different params, standardise each individually then assemble χ² or t stats.">
            <p>Given <M t={"X_i \\sim N(\\mu_i, \\sigma_i^2)"} /> (not identically distributed):</p>
            <ol>
              <li>Standardise each: <M t={"Z_i = (X_i - \\mu_i)/\\sigma_i \\sim N(0,1)"} /></li>
              <li><M t={"\\sum Z_i^2 \\sim \\chi^2(n)"} /></li>
              <li>Build t-stats: <M t={"T = Z_j / \\sqrt{(\\sum_{i \\neq j} Z_i^2)/(n-1)}"} /></li>
            </ol>
          </Card>

          <Card title="Order Statistics (Thm 6.15–6.16)" exam="Know both the formula AND how to derive from first principles (exams may forbid using the formula directly).">
            <p>PDF of <M t={"X_{(k)}"} /> (the <M t={"k"} />-th smallest from i.i.d. sample):</p>
            <M t={"f_{X_{(k)}}(x) = \\frac{n!}{(k-1)!(n-k)!} [F(x)]^{k-1}[1-F(x)]^{n-k} f(x)"} d />
            <p>Special cases:</p>
            <ul>
              <li>Min: <M t={"F_{X_{(1)}}(x) = 1 - [1-F(x)]^n"} /></li>
              <li>Max: <M t={"F_{X_{(n)}}(x) = [F(x)]^n"} /></li>
            </ul>
            <p><strong>First-principles derivation:</strong> Find population CDF <M t={"F(x)"} />, use independence (<M t={"P(\\text{all } X_i > x) = [1-F(x)]^n"} />), then differentiate.</p>
          </Card>

          <Card title="Range and Median" exam="To find distribution of R=max−min, use auxiliary variable method on the joint order-statistic PDF.">
            <p><strong>Range:</strong> <M t={"R = X_{(n)} - X_{(1)}"} /> (max minus min)</p>
            <p><strong>Sample median:</strong></p>
            <ul>
              <li>Odd <M t={"n"} />: <M t={"\\tilde{X} = X_{((n+1)/2)}"} /></li>
              <li>Even <M t={"n"} />: <M t={"\\tilde{X} = \\frac{X_{(n/2)} + X_{(n/2+1)}}{2}"} /></li>
            </ul>
            <p>Joint PDF of all order statistics: <M t={"f_{X_{(1)},\\ldots,X_{(n)}}(x_1,\\ldots,x_n) = n! \\prod f(x_i)"} /> for <M t={"x_1 < \\cdots < x_n"} />.</p>
            <p><strong>Range distribution:</strong> Transform <M t={"(X_{(1)}, X_{(n)})"} /> → <M t={"(R, Z)"} /> where <M t={"R = X_{(n)} - X_{(1)}"} /> and <M t={"Z = X_{(1)}"} /> (auxiliary). Apply the Jacobian method to the joint PDF of <M t={"(X_{(1)}, X_{(n)})"} />, then integrate out <M t={"Z"} />.</p>
          </Card>
        </section>

        {/* ══════════════════════════════════════════════
            TOPIC 9 — ESTIMATION & CONFIDENCE INTERVALS
            ══════════════════════════════════════════════ */}
        <section id="estimation" className="lm-section">
          <div className="lm-section-head">
            <span className="lm-section-num">09</span>
            <h2>Point Estimators & Confidence Intervals</h2>
          </div>

          <Card title="Estimator vs Estimate (Def 7.1)" exam="An estimator is a formula (random variable). An estimate is the number you get after plugging in data.">
            <p><strong>Estimator:</strong> a function of the sample <M t={"\\hat{\\theta} = g(X_1, \\ldots, X_n)"} /> — a random variable.</p>
            <p><strong>Estimate:</strong> the realised value <M t={"\\hat{\\theta} = g(x_1, \\ldots, x_n)"} /> — a number.</p>
          </Card>

          <Card title="Bias, MSE & Efficiency" exam="Check if E[θ̂] = θ (unbiased). MSE = Var + Bias². Compare estimators by MSE or relative efficiency.">
            <ul>
              <li><strong>Unbiased:</strong> <M t={"E[\\hat{\\theta}] = \\theta"} /></li>
              <li><strong>Bias:</strong> <M t={"B(\\hat{\\theta}) = E[\\hat{\\theta}] - \\theta"} /></li>
              <li><strong>MSE:</strong> <M t={"\\text{MSE}(\\hat{\\theta}) = \\text{Var}(\\hat{\\theta}) + [B(\\hat{\\theta})]^2"} /></li>
              <li><strong>Relative efficiency:</strong> <M t={"e(\\hat{\\theta}_1, \\hat{\\theta}_2) = \\frac{\\text{MSE}(\\hat{\\theta}_2)}{\\text{MSE}(\\hat{\\theta}_1)}"} /> (<M t={"> 1"} /> means <M t={"\\hat{\\theta}_1"} /> is better)</li>
            </ul>
          </Card>

          <Card title="Common Point Estimators" exam="Know which estimator goes with which parameter and which are unbiased.">
            <ul>
              <li><M t={"\\hat{\\mu} = \\bar{X}"} />: unbiased for <M t={"\\mu"} />, <M t={"\\text{Var}(\\bar{X}) = \\sigma^2/n"} /></li>
              <li><M t={"\\hat{\\sigma}^2 = S^2 = \\frac{1}{n-1}\\sum(X_i - \\bar{X})^2"} />: unbiased for <M t={"\\sigma^2"} /></li>
              <li><M t={"\\hat{p} = X/n"} />: unbiased for <M t={"p"} />, <M t={"\\text{Var}(\\hat{p}) = p(1-p)/n"} /></li>
            </ul>
            <p>Caution: <M t={"S"} /> is NOT unbiased for <M t={"\\sigma"} /> (Jensen's inequality).</p>
          </Card>

          <Card title="s² from Summary Statistics" exam="When the exam gives Σx_i and Σx_i², use this shortcut instead of computing each (x_i − x̄)².">
            <M t={"S^2 = \\frac{\\sum x_i^2 - n\\bar{x}^2}{n - 1} = \\frac{\\sum x_i^2 - (\\sum x_i)^2/n}{n - 1}"} d />
            <p>Exams frequently provide data as <M t={"\\sum x_i"} /> and <M t={"\\sum x_i^2"} /> rather than raw values. This formula avoids computing each deviation.</p>
          </Card>

          <Card title="Custom Unbiased Estimators" exam="Given order statistics, find E[Y_(k)] from the PDF, then scale to make unbiased: c·Y_(k) where c = 1/E[Y_(k)/θ].">
            <p>To build an unbiased estimator of <M t={"\\theta"} /> from <M t={"Y_{(k)}"} />:</p>
            <ol>
              <li>Derive <M t={"E[Y_{(k)}]"} /> using the order-statistic PDF</li>
              <li>Express as <M t={"E[Y_{(k)}] = c \\cdot \\theta"} /></li>
              <li>Unbiased estimator: <M t={"\\hat{\\theta} = Y_{(k)}/c"} /></li>
            </ol>
            <p>Common: <M t={"E[Y_{(1)}] = \\theta/n"} /> for Uniform<M t={"(0,\\theta)"} />, so <M t={"\\hat{\\theta} = nY_{(1)}"} /> is unbiased.</p>
          </Card>

          <Card title="Confidence Interval Definition (Def 7.2)" exam="Know the correct interpretation. A CI is about the procedure, not about this particular interval.">
            <p><M t={"P(L < \\theta < U) = 1 - \\alpha"} /> where <M t={"L, U"} /> are random (depend on sample).</p>
            <p><strong>Correct:</strong> "If we repeated sampling many times, <M t={"100(1-\\alpha)\\%"} /> of CIs would contain <M t={"\\theta"} />."</p>
            <p><strong>Wrong:</strong> "There's a <M t={"(1-\\alpha)"} /> probability <M t={"\\theta"} /> is in this interval."</p>
          </Card>

          <Card title="CI for μ (σ known)" exam="Z-interval. Use z_{α/2}. Exact for normal populations, approximate for n ≥ 30 (CLT).">
            <M t={"\\bar{X} \\pm z_{\\alpha/2} \\cdot \\frac{\\sigma}{\\sqrt{n}}"} d />
            <p>Margin of error: <M t={"E = z_{\\alpha/2} \\cdot \\sigma/\\sqrt{n}"} />.</p>
            <p>Common: <M t={"z_{0.025} = 1.96"} /> (95%), <M t={"z_{0.005} = 2.576"} /> (99%), <M t={"z_{0.05} = 1.645"} /> (90%).</p>
          </Card>

          <Card title="CI for μ (σ unknown)" exam="t-interval. Replace σ with S, use t critical value with n−1 df. Always wider than z-interval.">
            <M t={"\\bar{X} \\pm t_{n-1;\\,\\alpha/2} \\cdot \\frac{S}{\\sqrt{n}}"} d />
            <p>Use when <M t={"\\sigma"} /> unknown. <M t={"t_{n-1;\\,\\alpha/2} > z_{\\alpha/2}"} /> always, so the interval is wider — price for estimating <M t={"\\sigma"} />.</p>
          </Card>

          <Card title="CI for σ²" exam="Chi-square interval. NOT symmetric! Lower and upper bounds use different chi-square critical values.">
            <M t={"\\left(\\frac{(n-1)S^2}{\\chi^2_{n-1;\\,\\alpha/2}},\\; \\frac{(n-1)S^2}{\\chi^2_{n-1;\\,1-\\alpha/2}}\\right)"} d />
            <p>Requires normal population — no CLT rescue. For CI of <M t={"\\sigma"} />, take square root of both endpoints.</p>
            <p>Remember: <M t={"\\chi^2_{n;\\alpha}"} /> = upper-tail probability <M t={"\\alpha"} />, so <M t={"\\chi^2_{n;\\alpha/2}"} /> is the <em>larger</em> value.</p>
          </Card>

          <Card title="CI for Proportion p" exam="Large-sample z-interval. Use p̂ = x/n. Need np̂ ≥ 5 and n(1−p̂) ≥ 5.">
            <M t={"\\hat{p} \\pm z_{\\alpha/2} \\sqrt{\\frac{\\hat{p}(1-\\hat{p})}{n}}"} d />
            <p>Condition: <M t={"n\\hat{p} \\geq 5"} /> and <M t={"n(1-\\hat{p}) \\geq 5"} /> (normal approximation to binomial).</p>
          </Card>

          <Card title="One-Sided CIs" exam="Use z_α (not z_{α/2}) because all α goes into one tail. Lower bound or upper bound only.">
            <ul>
              <li><strong>Upper bound for <M t={"\\mu"} />:</strong> <M t={"\\left(-\\infty,\\; \\bar{X} + z_\\alpha \\frac{\\sigma}{\\sqrt{n}}\\right)"} /></li>
              <li><strong>Lower bound for <M t={"\\mu"} />:</strong> <M t={"\\left(\\bar{X} - z_\\alpha \\frac{\\sigma}{\\sqrt{n}},\\; \\infty\\right)"} /></li>
            </ul>
          </Card>

          <Card title="Sample Size Determination" exam="'How large n for margin of error B?' Solve and round UP. Use p = 0.5 if unknown (conservative).">
            <p><strong>For the mean</strong> (<M t={"\\sigma"} /> known):</p>
            <M t={"n \\geq \\left(\\frac{z_{\\alpha/2} \\cdot \\sigma}{B}\\right)^{\\!2}"} d />
            <p><strong>For a proportion:</strong></p>
            <M t={"n \\geq \\left(\\frac{z_{\\alpha/2}}{B}\\right)^{\\!2} \\hat{p}(1-\\hat{p})"} d />
            <p>Use <M t={"\\hat{p} = 0.5"} /> if no prior estimate (maximises <M t={"\\hat{p}(1-\\hat{p}) = 0.25"} />).</p>
          </Card>

          <Card title="CI for μ_X − μ_Y (σ's known)" exam="Two independent samples, variances known. Z-interval for the difference.">
            <M t={"(\\bar{X} - \\bar{Y}) \\pm z_{\\alpha/2}\\sqrt{\\frac{\\sigma_X^2}{n_X} + \\frac{\\sigma_Y^2}{n_Y}}"} d />
          </Card>

          <Card title="CI for μ_X − μ_Y (pooled, σ's equal)" exam="Assume σ_X = σ_Y. Pool sample variances. df = n_X + n_Y − 2.">
            <p>Pooled variance: <M t={"S_P^2 = \\frac{(n_X-1)S_X^2 + (n_Y-1)S_Y^2}{n_X + n_Y - 2}"} /></p>
            <M t={"(\\bar{X} - \\bar{Y}) \\pm t_{n_X+n_Y-2;\\,\\alpha/2}\\sqrt{S_P^2\\left(\\frac{1}{n_X} + \\frac{1}{n_Y}\\right)}"} d />
          </Card>

          <Card title="CI for μ_X − μ_Y (Welch)" exam="Don't assume equal variances. Use Satterthwaite df formula (round down).">
            <M t={"(\\bar{X} - \\bar{Y}) \\pm t_{\\nu;\\,\\alpha/2}\\sqrt{\\frac{S_X^2}{n_X} + \\frac{S_Y^2}{n_Y}}"} d />
            <p>Satterthwaite df:</p>
            <M t={"\\nu = \\frac{\\left(S_X^2/n_X + S_Y^2/n_Y\\right)^2}{\\frac{(S_X^2/n_X)^2}{n_X-1} + \\frac{(S_Y^2/n_Y)^2}{n_Y-1}}"} d />
          </Card>

          <Card title="CI for σ²_X/σ²_Y" exam="F-based interval. If CI contains 1, no evidence variances differ. Used to decide pooled vs Welch.">
            <M t={"\\left(\\frac{S_X^2}{S_Y^2} \\cdot \\frac{1}{f_{n_X-1,n_Y-1;\\,\\alpha/2}},\\;\\; \\frac{S_X^2}{S_Y^2} \\cdot f_{n_Y-1,n_X-1;\\,\\alpha/2}\\right)"} d />
            <p>Both populations must be normal. For <M t={"\\sigma_X/\\sigma_Y"} />, take square roots.</p>
          </Card>

          <Card title="CI for p_X − p_Y" exam="Two independent proportions. Each sample uses its own p̂ in the SE (unlike the test!).">
            <M t={"(\\hat{p}_X - \\hat{p}_Y) \\pm z_{\\alpha/2}\\sqrt{\\frac{\\hat{p}_X(1-\\hat{p}_X)}{n_X} + \\frac{\\hat{p}_Y(1-\\hat{p}_Y)}{n_Y}}"} d />
            <p>Need all four of <M t={"n\\hat{p} \\geq 5"} /> and <M t={"n(1-\\hat{p}) \\geq 5"} />.</p>
          </Card>

          <Card title="Paired Samples CI" exam="Same subjects measured twice. Compute differences W_i = X_i − Y_i, then one-sample t-interval on W.">
            <p>Given paired <M t={"(X_i, Y_i)"} />, let <M t={"W_i = X_i - Y_i"} />:</p>
            <M t={"\\bar{W} \\pm t_{n-1;\\,\\alpha/2} \\cdot \\frac{S_W}{\\sqrt{n}}"} d />
            <p><strong>Recognise paired data:</strong> same subjects tested twice, before/after, matched pairs, equal <M t={"n"} />'s with natural pairing.</p>
          </Card>
        </section>

        {/* ══════════════════════════════════════════════
            TOPIC 10 — HYPOTHESIS TESTING FUNDAMENTALS
            ══════════════════════════════════════════════ */}
        <section id="hyp-fundamentals" className="lm-section">
          <div className="lm-section-head">
            <span className="lm-section-num">10</span>
            <h2>Hypothesis Testing Fundamentals</h2>
          </div>

          <Card title="H₀ vs H₁" exam="H₀ always has the =. You test whether to reject H₀. Never 'accept' H₀ — you 'fail to reject'.">
            <ul>
              <li><M t={"H_0"} />: null (status quo, no effect, contains <M t={"="} />)</li>
              <li><M t={"H_1"} />: alternative (what you want evidence for)</li>
            </ul>
            <p>Two-sided: <M t={"H_1: \\theta \\neq \\theta_0"} />. One-sided: <M t={"\\theta > \\theta_0"} /> or <M t={"\\theta < \\theta_0"} />.</p>
          </Card>

          <Card title="Test Procedure (5 Steps)" exam="Follow this recipe on EVERY test question. Missing a step costs marks.">
            <ol>
              <li>State <M t={"H_0"} /> and <M t={"H_1"} /></li>
              <li>Choose significance level <M t={"\\alpha"} /></li>
              <li>Compute test statistic from data</li>
              <li>Find critical value(s) or p-value</li>
              <li>Reject <M t={"H_0"} /> if test stat in rejection region (or p-value <M t={"\\leq \\alpha"} />)</li>
            </ol>
          </Card>

          <Card title="p-Value" exam="p-value is NOT the probability H₀ is true. It's the probability of data this extreme assuming H₀.">
            <ul>
              <li><strong>Two-sided:</strong> <M t={"p = 2 \\cdot P(|Z| \\geq |z_{\\text{obs}}| \\mid H_0)"} /></li>
              <li><strong>Right-sided:</strong> <M t={"p = P(Z \\geq z_{\\text{obs}} \\mid H_0)"} /></li>
              <li><strong>Left-sided:</strong> <M t={"p = P(Z \\leq z_{\\text{obs}} \\mid H_0)"} /></li>
            </ul>
            <p>Decision: reject <M t={"H_0"} /> iff <M t={"p \\leq \\alpha"} />. The p-value is the smallest <M t={"\\alpha"} /> at which you'd still reject.</p>
          </Card>

          <Card title="Type I & II Errors" exam="α = P(reject H₀ | H₀ true). β = P(fail to reject H₀ | H₁ true). Power = 1 − β.">
            <ul>
              <li><strong>Type I (α):</strong> Reject <M t={"H_0"} /> when it's true (false alarm / "crying wolf")</li>
              <li><strong>Type II (β):</strong> Fail to reject <M t={"H_0"} /> when <M t={"H_1"} /> is true (missed detection)</li>
            </ul>
            <p><M t={"\\alpha"} /> and <M t={"\\beta"} /> are inversely related. Only increasing <M t={"n"} /> reduces both.</p>
          </Card>

          <Card title="Power of a Test" exam="Power = 1 − β. For two-sided tests, compute both tail probabilities under the alternative and sum them.">
            <M t={"\\text{Power}(\\theta_1) = 1 - \\beta(\\theta_1) = P(\\text{reject } H_0 \\mid \\theta = \\theta_1)"} d />
            <p><strong>One-sided</strong> (right-tail): <M t={"\\text{Power} = 1 - \\Phi\\!\\left(z_\\alpha - \\frac{\\mu_1 - \\mu_0}{\\sigma/\\sqrt{n}}\\right)"} /></p>
            <p><strong>Two-sided:</strong> Find critical values <M t={"c_L, c_U"} /> on the <M t={"\\bar{X}"} /> scale, then:</p>
            <M t={"\\beta(\\mu_1) = \\Phi\\!\\left(\\frac{c_U - \\mu_1}{\\sigma/\\sqrt{n}}\\right) - \\Phi\\!\\left(\\frac{c_L - \\mu_1}{\\sigma/\\sqrt{n}}\\right)"} d />
          </Card>

          <Card title="Sample Size for Desired Power" exam="Solve for n given desired power 1−β and specific alternative μ₁.">
            <p>One-sided z-test:</p>
            <M t={"n \\geq \\left(\\frac{(z_\\alpha + z_\\beta) \\cdot \\sigma}{\\mu_1 - \\mu_0}\\right)^{\\!2}"} d />
            <p>Two-sided: replace <M t={"z_\\alpha"} /> with <M t={"z_{\\alpha/2}"} />. Always round up.</p>
          </Card>

          <Card title="Power for Two-Sample Tests" exam="Same idea as single-sample, but use the two-sample SE in the shift. Tested in Resit 2024.">
            <p>For a two-sample z-test at alternative <M t={"\\delta_1 = \\mu_X - \\mu_Y"} />:</p>
            <M t={"\\text{Power} = 1 - \\Phi\\!\\left(z_\\alpha - \\frac{\\delta_1 - d_0}{\\text{SE}}\\right)"} d />
            <p>where <M t={"\\text{SE} = \\sqrt{\\sigma_X^2/n_X + \\sigma_Y^2/n_Y}"} />. For two-sided, use both tails as in the single-sample case.</p>
          </Card>

          <Card title="CI–HT Duality" exam="A 95% CI and a two-sided test at α = 0.05 always agree. If θ₀ is outside the CI, reject H₀.">
            <p>Reject <M t={"H_0: \\theta = \\theta_0"} /> at level <M t={"\\alpha"} /> <M t={"\\iff"} /> <M t={"\\theta_0"} /> lies <strong>outside</strong> the <M t={"100(1-\\alpha)\\%"} /> CI.</p>
            <p>Example: if 95% CI for <M t={"\\mu"} /> is <M t={"(3.2, 7.8)"} />, then reject <M t={"H_0: \\mu = 2"} /> at <M t={"\\alpha = 0.05"} /> (2 is outside), but fail to reject <M t={"H_0: \\mu = 5"} /> (5 is inside).</p>
          </Card>

          <Card title="Power Function & OC Curve" exam="To sketch the OC curve, compute β(μ₁) at several alternative values by converting critical values to z-scores under each μ₁.">
            <M t={"\\pi(\\theta) = P(\\text{reject } H_0 \\mid \\theta)"} d />
            <ul>
              <li>At <M t={"\\theta = \\theta_0"} />: <M t={"\\pi(\\theta_0) = \\alpha"} /></li>
              <li>At <M t={"\\theta \\neq \\theta_0"} />: <M t={"\\pi(\\theta) = 1 - \\beta(\\theta) = \\text{Power}"} /></li>
            </ul>
            <p><strong>To compute β(μ₁):</strong> convert rejection boundaries to the <M t={"\\bar{X}"} /> scale (<M t={"c = \\mu_0 \\pm z_{\\alpha/2} \\cdot \\sigma/\\sqrt{n}"} />), then compute <M t={"P(c_L < \\bar{X} < c_U \\mid \\mu_1)"} /> using z-scores centred at <M t={"\\mu_1"} />.</p>
          </Card>
        </section>

        {/* ══════════════════════════════════════════════
            TOPIC 11 — SINGLE POPULATION TESTS
            ══════════════════════════════════════════════ */}
        <section id="single-pop" className="lm-section">
          <div className="lm-section-head">
            <span className="lm-section-num">11</span>
            <h2>Single Population Hypothesis Tests</h2>
          </div>

          <Card title="z-Test for μ (σ known)" exam="Same pivot as the z-interval. σ known is rare in practice but common on exams.">
            <M t={"Z = \\frac{\\bar{X} - \\mu_0}{\\sigma/\\sqrt{n}} \\sim N(0,1) \\text{ under } H_0"} d />
            <p>Reject <M t={"H_0"} /> if:</p>
            <ul>
              <li>Two-sided: <M t={"|Z| > z_{\\alpha/2}"} /></li>
              <li>Right-sided: <M t={"Z > z_\\alpha"} /></li>
              <li>Left-sided: <M t={"Z < -z_\\alpha"} /></li>
            </ul>
          </Card>

          <Card title="t-Test for μ (σ unknown)" exam="The most common test in practice. Replace σ with S, use t(n−1) distribution.">
            <M t={"T = \\frac{\\bar{X} - \\mu_0}{S/\\sqrt{n}} \\sim t(n-1) \\text{ under } H_0"} d />
            <p>Same rejection logic as z-test but with t critical values. Need normal population or <M t={"n \\geq 30"} />.</p>
          </Card>

          <Card title="χ²-Test for σ²" exam="Test whether variance equals a specific value. NOT symmetric rejection region. Requires normality.">
            <M t={"\\chi^2 = \\frac{(n-1)S^2}{\\sigma_0^2} \\sim \\chi^2(n-1) \\text{ under } H_0"} d />
            <p>Rejection regions:</p>
            <ul>
              <li>Two-sided: reject if <M t={"\\chi^2 > \\chi^2_{n-1;\\,\\alpha/2}"} /> or <M t={"\\chi^2 < \\chi^2_{n-1;\\,1-\\alpha/2}"} /></li>
              <li>Right-sided: reject if <M t={"\\chi^2 > \\chi^2_{n-1;\\,\\alpha}"} /></li>
              <li>Left-sided: reject if <M t={"\\chi^2 < \\chi^2_{n-1;\\,1-\\alpha}"} /></li>
            </ul>
            <p><strong>Requires normal population.</strong> Sensitive to non-normality — CLT doesn't help here.</p>
          </Card>

          <Card title="z-Test for Proportion p" exam="Large-sample test. Use p₀ (not p̂!) in the standard error. This differs from the CI formula.">
            <M t={"Z = \\frac{\\hat{p} - p_0}{\\sqrt{p_0(1-p_0)/n}} \\sim N(0,1) \\text{ under } H_0"} d />
            <p>Use <M t={"p_0"} /> (hypothesised value) in denominator because under <M t={"H_0"} /> we know <M t={"p = p_0"} />.</p>
            <p>Condition: <M t={"np_0 \\geq 5"} /> and <M t={"n(1-p_0) \\geq 5"} />.</p>
          </Card>

          <Card title="Exact Discrete Tests" exam="When np < 5 (normal approx. fails), compute the p-value directly from the pmf. Also applies to Poisson tests.">
            <p><strong>Exact binomial:</strong> If <M t={"np_0 < 5"} />, compute <M t={"p\\text{-value} = \\sum_{k=0}^{x} \\binom{n}{k} p_0^k (1-p_0)^{n-k}"} /> (left-tail).</p>
            <p><strong>Poisson test:</strong> For a single observation <M t={"X \\sim \\text{Poi}(\\lambda_0)"} />: <M t={"p\\text{-value} = P(X \\leq x_{\\text{obs}}) = \\sum_{k=0}^{x} e^{-\\lambda_0}\\lambda_0^k/k!"} /></p>
            <p>Power for discrete tests: sum the pmf over the rejection region under the alternative.</p>
          </Card>

          <Card title="Bracketing p-values from Tables" exam="Without a calculator, bound the p-value between two table entries. The exam expects this — not an exact value.">
            <p>For a t-test: find where <M t={"|t_{\\text{obs}}|"} /> falls between consecutive table entries:</p>
            <p>If <M t={"t_{\\nu,0.025} < |t_{\\text{obs}}| < t_{\\nu,0.01}"} />, then for a two-sided test: <M t={"0.02 < p < 0.05"} />.</p>
            <p>For one-sided: halve the column headers. Same idea for <M t={"\\chi^2"} /> and F tables.</p>
          </Card>

          <Card title="Choosing the Right Test" exam="Decision tree: (1) What parameter? (2) Is σ known? This determines the test statistic and distribution.">
            <ul>
              <li><strong>Testing <M t={"\\mu"} />, <M t={"\\sigma"} /> known</strong> → z-test (<M t={"N(0,1)"} />)</li>
              <li><strong>Testing <M t={"\\mu"} />, <M t={"\\sigma"} /> unknown</strong> → t-test (<M t={"t(n-1)"} />)</li>
              <li><strong>Testing <M t={"\\sigma^2"} /></strong> → χ²-test (<M t={"\\chi^2(n-1)"} />, normality required)</li>
              <li><strong>Testing <M t={"p"} /></strong> → z-test for proportions (<M t={"N(0,1)"} />, large sample)</li>
            </ul>
          </Card>
        </section>

        {/* ══════════════════════════════════════════════
            TOPIC 12 — TWO POPULATION TESTS
            ══════════════════════════════════════════════ */}
        <section id="two-pop" className="lm-section">
          <div className="lm-section-head">
            <span className="lm-section-num">12</span>
            <h2>Two Population Hypothesis Tests</h2>
          </div>

          <Card title="z-Test for μ_X − μ_Y (σ's known)" exam="Two independent samples, both variances known. Same structure as single-sample z-test.">
            <M t={"Z = \\frac{(\\bar{X} - \\bar{Y}) - d_0}{\\sqrt{\\sigma_X^2/n_X + \\sigma_Y^2/n_Y}} \\sim N(0,1)"} d />
            <p>Usually test <M t={"d_0 = 0"} /> (no difference).</p>
          </Card>

          <Card title="Pooled t-Test (equal variances)" exam="Pool the variances when you can assume σ₁² = σ₂². df = n₁ + n₂ − 2.">
            <p>Pooled variance:</p>
            <M t={"S_P^2 = \\frac{(n_X-1)S_X^2 + (n_Y-1)S_Y^2}{n_X+n_Y-2}"} d />
            <M t={"T = \\frac{(\\bar{X}-\\bar{Y})-d_0}{\\sqrt{S_P^2(1/n_X + 1/n_Y)}} \\sim t(n_X+n_Y-2)"} d />
          </Card>

          <Card title="Welch t-Test (unequal variances)" exam="Use when you can't assume equal variances. Default choice when unsure. Satterthwaite df rounded down.">
            <M t={"T = \\frac{(\\bar{X}-\\bar{Y})-d_0}{\\sqrt{S_X^2/n_X + S_Y^2/n_Y}} \\sim t(\\nu)"} d />
            <p>Satterthwaite degrees of freedom:</p>
            <M t={"\\nu = \\frac{\\left(S_X^2/n_X + S_Y^2/n_Y\\right)^2}{\\frac{(S_X^2/n_X)^2}{n_X-1} + \\frac{(S_Y^2/n_Y)^2}{n_Y-1}}"} d />
          </Card>

          <Card title="Decision Flowchart: Which Mean Test?" exam="Common exam pattern: part (a) = F-test for variances, part (b) = choose pooled/Welch based on (a). Do them in order.">
            <ol>
              <li><strong>Are samples paired?</strong> Yes → paired t-test</li>
              <li><strong>Are variances known?</strong> Yes → z-test</li>
              <li><strong>Can we assume equal variances?</strong> Yes → pooled t-test. No (or unsure) → Welch t-test</li>
            </ol>
            <p><strong>Quick heuristic:</strong> if <M t={"s_1^2/s_2^2 > 3"} /> (or <M t={"< 1/3"} />), suspect unequal variances → use Welch.</p>
            <p><strong>Full workflow:</strong> (1) F-test for <M t={"\\sigma_1^2 = \\sigma_2^2"} />, (2) if not rejected → pooled t-test, if rejected → Welch t-test. Exams often test this as a sequential two-part question.</p>
          </Card>

          <Card title="Paired t-Test" exam="For PAIRED data (before/after, matched). Compute W_i = X_i − Y_i, then do a one-sample t-test on W.">
            <p>Given paired <M t={"(X_i, Y_i)"} />, let <M t={"W_i = X_i - Y_i"} />:</p>
            <M t={"T = \\frac{\\bar{W} - d_0}{S_W/\\sqrt{n}} \\sim t(n-1) \\text{ under } H_0"} d />
            <p><M t={"n"} /> = number of pairs. Usually <M t={"d_0 = 0"} />.</p>
            <p><strong>Recognise paired data:</strong> same subjects twice, before/after, matched controls, same time period.</p>
          </Card>

          <Card title="F-Test for σ²_X/σ²_Y" exam="Test whether two variances are equal. F = S₁²/S₂². Put the larger variance on top. Very sensitive to non-normality.">
            <p><M t={"H_0: \\sigma_X^2 = \\sigma_Y^2"} /> → under <M t={"H_0"} />:</p>
            <M t={"F = \\frac{S_X^2}{S_Y^2} \\sim F(n_X-1, n_Y-1)"} d />
            <p>Two-sided: reject if <M t={"F > f_{n_X-1,n_Y-1;\\,\\alpha/2}"} /> or <M t={"F < 1/f_{n_Y-1,n_X-1;\\,\\alpha/2}"} />.</p>
            <p>Convention: put larger <M t={"S^2"} /> on top so <M t={"F \\geq 1"} />, then only check upper tail.</p>
          </Card>

          <Card title="Two-Proportion z-Test (d₀ = 0)" exam="When H₀: p_X = p_Y, use the POOLED proportion p̂ in the SE (differs from CI!).">
            <p>Pooled proportion under <M t={"H_0: p_X = p_Y"} />:</p>
            <M t={"\\hat{p} = \\frac{x_1 + x_2}{n_X + n_Y}"} d />
            <M t={"Z = \\frac{\\hat{p}_X - \\hat{p}_Y}{\\sqrt{\\hat{p}(1-\\hat{p})(1/n_X + 1/n_Y)}} \\sim N(0,1)"} d />
            <p><strong>Key difference from CI:</strong> The CI uses each sample's own <M t={"\\hat{p}"} /> in the SE. The test uses the pooled <M t={"\\hat{p}"} /> because under <M t={"H_0"} /> both samples estimate the same <M t={"p"} />.</p>
          </Card>

          <Card title="Two-Proportion Test (d₀ ≠ 0)" exam="When H₀: p_X − p_Y = d₀ with d₀ ≠ 0, do NOT pool! Use individual p̂'s in SE — same formula as CI. Tested 2024 & 2025 finals.">
            <M t={"Z = \\frac{(\\hat{p}_X - \\hat{p}_Y) - d_0}{\\sqrt{\\frac{\\hat{p}_X(1-\\hat{p}_X)}{n_X} + \\frac{\\hat{p}_Y(1-\\hat{p}_Y)}{n_Y}}}"} d />
            <p>Cannot pool because under <M t={"H_0"} /> the two proportions are not equal (they differ by <M t={"d_0"} />), so each sample estimates a different <M t={"p"} />.</p>
          </Card>

          <Card title="Two-Population Tests Summary" exam="Know which test statistic, which distribution, and which assumptions for each scenario.">
            <ul>
              <li><M t={"\\mu_X - \\mu_Y"} /> (<M t={"\\sigma"} />'s known): <M t={"Z \\sim N(0,1)"} /></li>
              <li><M t={"\\mu_X - \\mu_Y"} /> (equal <M t={"\\sigma"} />): <M t={"T \\sim t(n_X+n_Y-2)"} /></li>
              <li><M t={"\\mu_X - \\mu_Y"} /> (unequal <M t={"\\sigma"} />): <M t={"T \\sim t(\\nu)"} /> (Welch)</li>
              <li><M t={"\\mu_X - \\mu_Y"} /> (paired): <M t={"T \\sim t(n-1)"} /></li>
              <li><M t={"\\sigma_X^2/\\sigma_Y^2"} />: <M t={"F \\sim F(n_X-1, n_Y-1)"} /></li>
              <li><M t={"p_X - p_Y"} />: <M t={"Z \\sim N(0,1)"} /> (pooled <M t={"\\hat{p}"} />)</li>
            </ul>
          </Card>
        </section>

        <div className="lm-footer-cta">
          <p>Want the full deep-dive?</p>
          <Link to="/content" className="lm-btn-full">Open Study Guide</Link>
          <Link to="/questions" className="lm-btn-full lm-btn-secondary">Practice Questions</Link>
        </div>
      </main>
    </div>
  )
}
