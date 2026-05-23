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

        {/* ── TOPIC 1 ── */}
        <section id="joint-discrete" className="lm-section">
          <div className="lm-section-head">
            <span className="lm-section-num">01</span>
            <h2>Joint Discrete Distributions</h2>
          </div>

          <Card title="Joint PDF" exam="Given a probability table, they'll ask you to find P(X ≤ 1, Y ≥ 2) — just sum the relevant cells.">
            <p>The joint PDF gives the probability of each pair: <M t={"f_{X,Y}(x,y) = P(X=x, Y=y)"} /></p>
            <p>Two rules for a valid joint PDF:</p>
            <ul>
              <li><M t={"f_{X,Y}(x,y) \\geq 0"} /> for all <M t={"(x,y)"} /></li>
              <li><M t={"\\sum_x \\sum_y f_{X,Y}(x,y) = 1"} /></li>
            </ul>
          </Card>

          <Card title="Marginal Distributions" exam="Sum across a row or column in the table to get the marginal. Often needed before computing E[X] or Var(X).">
            <p>To get the distribution of just <M t={"X"} />, sum out <M t={"Y"} />:</p>
            <M t={"f_X(x) = \\sum_{\\text{all } y} f_{X,Y}(x,y)"} d />
            <p>Same idea flipped for <M t={"f_Y(y)"} />. These are the row/column totals in a probability table.</p>
          </Card>

          <Card title="Joint CDF" exam="Rarely asked directly — but understand it factors as F_X · F_Y iff X, Y independent.">
            <M t={"F_{X,Y}(x,y) = P(X \\leq x, Y \\leq y)"} d />
            <p>Accumulates probability from bottom-left. For independence checking: <M t={"F_{X,Y} = F_X \\cdot F_Y"} /> everywhere.</p>
          </Card>

          <Card title="Multinomial Distribution" exam="'n trials, k outcomes' — extend the binomial. They'll give you a scenario and ask for P(N₁=a, N₂=b, ...).">
            <M t={"P(N_1=n_1, \\ldots, N_k=n_k) = \\frac{n!}{n_1! \\cdots n_k!} p_1^{n_1} \\cdots p_k^{n_k}"} d />
            <p>where <M t={"\\sum n_i = n"} /> and <M t={"\\sum p_i = 1"} />. Each <M t={"N_i \\sim \\text{Bin}(n, p_i)"} /> marginally.</p>
          </Card>
        </section>

        {/* ── TOPIC 2 ── */}
        <section id="joint-continuous" className="lm-section">
          <div className="lm-section-head">
            <span className="lm-section-num">02</span>
            <h2>Joint Continuous Distributions</h2>
          </div>

          <Card title="Joint PDF — Continuous" exam="They give you f(x,y) with a region. First task: draw the support. Second: integrate to find probabilities.">
            <p>The density <M t={"f_{X,Y}(x,y)"} /> is NOT a probability — you integrate to get one:</p>
            <M t={"P\\big((X,Y) \\in A\\big) = \\iint_A f_{X,Y}(x,y)\\, dx\\, dy"} d />
            <p>Valid PDF: non-negative everywhere, double integral over all <M t={"(x,y) = 1"} />.</p>
          </Card>

          <Card title="The Support Region" exam="ALWAYS draw this first. Getting the integration limits wrong is the #1 source of errors.">
            <p>The support is where <M t={"f_{X,Y}(x,y) > 0"} />. It determines your integration limits. Common shapes: triangles, rectangles, or regions bounded by curves.</p>
            <p>When integrating, one variable's range is independent (outer integral), the other depends on it (inner integral).</p>
          </Card>

          <Card title="Marginal PDFs — Continuous" exam="Integrate out the other variable over the support. Watch the limits — they change with the outer variable.">
            <M t={"f_X(x) = \\int_{-\\infty}^{\\infty} f_{X,Y}(x,y)\\, dy"} d />
            <p>In practice you integrate over the support bounds for <M t={"y"} /> given <M t={"x"} />. The result is a function of <M t={"x"} /> only.</p>
          </Card>

          <Card title="Finding the constant c" exam="Classic exam opener: 'find c such that f(x,y) = c·g(x,y) is a valid pdf.' Set the double integral = 1 and solve.">
            <M t={"\\int\\!\\!\\int f_{X,Y}(x,y)\\, dx\\, dy = 1 \\quad \\Rightarrow \\quad c = \\frac{1}{\\int\\!\\!\\int g(x,y)\\, dx\\, dy}"} d />
          </Card>
        </section>

        {/* ── TOPIC 3 ── */}
        <section id="expected-values" className="lm-section">
          <div className="lm-section-head">
            <span className="lm-section-num">03</span>
            <h2>Expected Values (Multivariate)</h2>
          </div>

          <Card title="E[g(X,Y)] — LOTUS" exam="They give a joint PDF and ask for E[XY], E[X²+Y], etc. Plug g(x,y) into the double sum/integral with f(x,y).">
            <p>Compute expectations directly from the joint PDF — no need to find the distribution of <M t={"g(X,Y)"} /> first:</p>
            <M t={"E[g(X,Y)] = \\iint g(x,y) \\cdot f_{X,Y}(x,y)\\, dx\\, dy"} d />
            <p>(Use double sums for the discrete case.)</p>
          </Card>

          <Card title="Linearity of Expectation" exam="Works ALWAYS — independent or not. Use it to break complicated expectations into simple pieces.">
            <M t={"E[aX + bY + c] = aE[X] + bE[Y] + c"} d />
            <p>This extends to any number of variables. No independence needed.</p>
          </Card>

          <Card title="Three-Step Method for E[XY]" exam="Continuous joint PDF → draw support → set up limits → integrate xy·f(x,y). Very common exam question.">
            <ol>
              <li><strong>Draw</strong> the support region</li>
              <li><strong>Set limits:</strong> outer variable independent, inner depends on outer</li>
              <li><strong>Integrate</strong> <M t={"\\iint xy \\cdot f_{X,Y}(x,y)\\, dx\\, dy"} /></li>
            </ol>
          </Card>
        </section>

        {/* ── TOPIC 4 ── */}
        <section id="independence" className="lm-section">
          <div className="lm-section-head">
            <span className="lm-section-num">04</span>
            <h2>Independence, Covariance & Correlation</h2>
          </div>

          <Card title="Independence Test" exam="Two-step test from Thm 5.10: (1) Is the support rectangular? (2) Does f(x,y) factor into g(x)·h(y)?">
            <p><M t={"X, Y"} /> independent <M t={"\\iff"} /> <M t={"f_{X,Y}(x,y) = f_X(x) \\cdot f_Y(y)"} /> for all <M t={"(x,y)"} />.</p>
            <p><strong>Practical test (Thm 5.10):</strong></p>
            <ol>
              <li>Support must be a <strong>rectangle</strong> (no variable depends on the other)</li>
              <li><M t={"f_{X,Y}(x,y)"} /> must <strong>factor</strong> as <M t={"g(x) \\cdot h(y)"} /></li>
            </ol>
            <p>If either fails → dependent.</p>
          </Card>

          <Card title="Covariance" exam="Use the shortcut formula. If independent, Cov = 0 (but Cov = 0 does NOT imply independence in general).">
            <M t={"\\text{Cov}(X,Y) = E[XY] - E[X]E[Y]"} d />
            <p>If independent: <M t={"E[XY] = E[X]E[Y]"} />, so <M t={"\\text{Cov} = 0"} />.</p>
            <p>Key property: <M t={"\\text{Var}(aX + bY) = a^2\\text{Var}(X) + b^2\\text{Var}(Y) + 2ab\\,\\text{Cov}(X,Y)"} /></p>
          </Card>

          <Card title="Correlation" exam="Standardised covariance, always in [−1, 1]. ρ = ±1 iff perfect linear relationship.">
            <M t={"\\rho_{X,Y} = \\frac{\\text{Cov}(X,Y)}{\\sqrt{\\text{Var}(X)\\,\\text{Var}(Y)}}"} d />
            <p><M t={"-1 \\leq \\rho \\leq 1"} />. Measures <em>linear</em> association only. <M t={"\\rho = 0"} /> means no linear relationship, not independence.</p>
          </Card>
        </section>

        {/* ── TOPIC 5 ── */}
        <section id="conditional" className="lm-section">
          <div className="lm-section-head">
            <span className="lm-section-num">05</span>
            <h2>Conditional Distributions</h2>
          </div>

          <Card title="Conditional PDF" exam="Given f(x,y), find f(y|x) = f(x,y)/f_X(x). Then compute E[Y|X=x] by integrating y·f(y|x).">
            <M t={"f_{Y|X}(y \\mid x) = \\frac{f_{X,Y}(x,y)}{f_X(x)}"} d />
            <p>Divide joint by marginal. The result is a valid PDF in <M t={"y"} /> (sums/integrates to 1).</p>
          </Card>

          <Card title="Conditional Expectation" exam="Two ways they ask: (1) find E[Y|X=2] (plug in and compute), (2) find E[Y|X] as a function of X.">
            <M t={"E[Y \\mid X=x] = \\int y \\cdot f_{Y|X}(y \\mid x)\\, dy"} d />
            <p>This is a function of <M t={"x"} />. When viewed as a random variable (plug in <M t={"X"} />), it becomes <M t={"E[Y \\mid X]"} />.</p>
          </Card>

          <Card title="Law of Total Expectation" exam="Use this to compute E[Y] when it's hard directly but E[Y|X] is easy. E[Y] = E[E[Y|X]].">
            <M t={"E[Y] = E\\big[E[Y \\mid X]\\big]"} d />
            <p>Take the conditional expectation (a function of <M t={"X"} />) and average it over <M t={"X"} />.</p>
          </Card>

          <Card title="Law of Total Variance" exam="Var(Y) = E[Var(Y|X)] + Var(E[Y|X]). Decompose total variance into 'within' + 'between'.">
            <M t={"\\text{Var}(Y) = E\\big[\\text{Var}(Y \\mid X)\\big] + \\text{Var}\\big(E[Y \\mid X]\\big)"} d />
            <p>First term: average variance within each group. Second term: variance of group means.</p>
          </Card>
        </section>

        {/* ── TOPIC 6 ── */}
        <section id="mgf-bivariate" className="lm-section">
          <div className="lm-section-head">
            <span className="lm-section-num">06</span>
            <h2>Joint MGFs & Bivariate Normal</h2>
          </div>

          <Card title="Joint MGF" exam="Compute M(t,u) = E[e^{tX+uY}]. Extract moments by differentiating and setting t=u=0.">
            <M t={"M_{X,Y}(t,u) = E[e^{tX+uY}]"} d />
            <p>Key uses:</p>
            <ul>
              <li><M t={"\\frac{\\partial^{r+s}}{\\partial t^r \\partial u^s} M(0,0) = E[X^r Y^s]"} /></li>
              <li>Marginal MGF: <M t={"M_X(t) = M_{X,Y}(t, 0)"} /></li>
              <li>Independence <M t={"\\iff M_{X,Y}(t,u) = M_X(t) \\cdot M_Y(u)"} /></li>
            </ul>
          </Card>

          <Card title="Bivariate Normal (BVN)" exam="Know the 5 parameters. The BIG fact: ρ = 0 ⟺ independent. This is UNIQUE to BVN.">
            <p><M t={"(X,Y) \\sim \\text{BVN}(\\mu_X, \\mu_Y, \\sigma_X^2, \\sigma_Y^2, \\rho)"} /></p>
            <p>Five parameters fully determine it. Special property:</p>
            <p><strong>For BVN only:</strong> <M t={"\\rho = 0 \\iff X, Y"} /> independent</p>
            <p>(In general, zero correlation does NOT imply independence — but for BVN it does.)</p>
          </Card>

          <Card title="BVN Conditionals" exam="Given (X,Y) ~ BVN, find distribution of Y|X=x. It's normal with adjusted mean and reduced variance.">
            <p><M t={"Y \\mid X=x \\sim N\\!\\left(\\mu_Y + \\rho\\frac{\\sigma_Y}{\\sigma_X}(x - \\mu_X),\\; \\sigma_Y^2(1-\\rho^2)\\right)"} /></p>
            <p>The conditional mean is linear in <M t={"x"} />, the conditional variance doesn't depend on <M t={"x"} />.</p>
          </Card>
        </section>

        {/* ── TOPIC 7 ── */}
        <section id="transformations" className="lm-section">
          <div className="lm-section-head">
            <span className="lm-section-num">07</span>
            <h2>Transformations & Distributions of Sums</h2>
          </div>

          <Card title="CDF Method" exam="Most general method. Write F_W(w) = P(h(X) ≤ w), translate to an integral, then differentiate.">
            <ol>
              <li>Define <M t={"W = h(X)"} /></li>
              <li>Write <M t={"F_W(w) = P(W \\leq w)"} /></li>
              <li>Express as integral over known PDF</li>
              <li>Differentiate: <M t={"f_W(w) = F_W'(w)"} /></li>
            </ol>
            <p>Works for any transformation. The hard part is getting the integration region right.</p>
          </Card>

          <Card title="Jacobian Method" exam="For 1-to-1 transformations. Faster than CDF method when applicable.">
            <p>If <M t={"W = h(X)"} /> is one-to-one with inverse <M t={"X = h^{-1}(W)"} />:</p>
            <M t={"f_W(w) = f_X(h^{-1}(w)) \\cdot \\left|\\frac{d}{dw}h^{-1}(w)\\right|"} d />
            <p>For 2D: use the Jacobian determinant <M t={"|J| = \\left|\\frac{\\partial(x,y)}{\\partial(w,z)}\\right|"} />.</p>
          </Card>

          <Card title="Sums of Independent RVs" exam="Sum of normals → normal. Sum of gammas (same β) → gamma. Sum of Poissons → Poisson. Know these!">
            <p>For independent <M t={"X, Y"} />: <M t={"M_{X+Y}(t) = M_X(t) \\cdot M_Y(t)"} /></p>
            <p>Key results:</p>
            <ul>
              <li><M t={"X \\sim N(\\mu_1, \\sigma_1^2),\\; Y \\sim N(\\mu_2, \\sigma_2^2) \\Rightarrow X+Y \\sim N(\\mu_1+\\mu_2, \\sigma_1^2+\\sigma_2^2)"} /></li>
              <li><M t={"X \\sim \\text{Gamma}(\\alpha_1, \\beta),\\; Y \\sim \\text{Gamma}(\\alpha_2, \\beta) \\Rightarrow X+Y \\sim \\text{Gamma}(\\alpha_1+\\alpha_2, \\beta)"} /></li>
              <li><M t={"\\chi^2(\\nu_1) + \\chi^2(\\nu_2) = \\chi^2(\\nu_1 + \\nu_2)"} /></li>
            </ul>
          </Card>
        </section>

        {/* ── TOPIC 8 ── */}
        <section id="sampling" className="lm-section">
          <div className="lm-section-head">
            <span className="lm-section-num">08</span>
            <h2>t/F Distributions, Samples & Order Statistics</h2>
          </div>

          <Card title="t-Distribution" exam="Used when σ is unknown and replaced by S. Know: T = (X̄ − μ)/(S/√n) ~ t(n−1).">
            <p>Arises from: <M t={"T = \\frac{Z}{\\sqrt{V/\\nu}} \\sim t(\\nu)"} /> where <M t={"Z \\sim N(0,1)"} />, <M t={"V \\sim \\chi^2(\\nu)"} /> independent.</p>
            <p>Symmetric, bell-shaped, heavier tails than normal. As <M t={"\\nu \\to \\infty"} />, converges to <M t={"N(0,1)"} />.</p>
          </Card>

          <Card title="F-Distribution" exam="Ratio of two chi-squares. Used for comparing variances. F = (S₁²/σ₁²)/(S₂²/σ₂²).">
            <M t={"F = \\frac{V_1/\\nu_1}{V_2/\\nu_2} \\sim F(\\nu_1, \\nu_2)"} d />
            <p>where <M t={"V_1 \\sim \\chi^2(\\nu_1)"} />, <M t={"V_2 \\sim \\chi^2(\\nu_2)"} /> independent. Key: <M t={"F_{1-\\alpha}(\\nu_1, \\nu_2) = 1/F_\\alpha(\\nu_2, \\nu_1)"} />.</p>
          </Card>

          <Card title="Sample Mean & Variance" exam="These sampling distributions are the foundation for ALL inference (CIs and tests).">
            <p>From <M t={"X_1, \\ldots, X_n \\stackrel{\\text{iid}}{\\sim} N(\\mu, \\sigma^2)"} />:</p>
            <ul>
              <li><M t={"\\bar{X} \\sim N(\\mu, \\sigma^2/n)"} /></li>
              <li><M t={"\\frac{(n-1)S^2}{\\sigma^2} \\sim \\chi^2(n-1)"} /></li>
              <li><M t={"\\bar{X}"} /> and <M t={"S^2"} /> are <strong>independent</strong></li>
            </ul>
          </Card>

          <Card title="Central Limit Theorem" exam="For large n (≥30), X̄ is approximately normal regardless of the population. This justifies z-tests on non-normal data.">
            <M t={"\\bar{X} \\approx N\\!\\left(\\mu, \\frac{\\sigma^2}{n}\\right) \\quad \\text{for large } n"} d />
            <p>Equivalently: <M t={"\\frac{\\bar{X} - \\mu}{\\sigma/\\sqrt{n}} \\approx N(0,1)"} />.</p>
          </Card>

          <Card title="Order Statistics" exam="PDF of k-th order statistic or min/max. Know the formula and the special cases.">
            <p>PDF of <M t={"X_{(k)}"} /> (the <M t={"k"} />-th smallest):</p>
            <M t={"f_{X_{(k)}}(x) = \\frac{n!}{(k-1)!(n-k)!} [F(x)]^{k-1}[1-F(x)]^{n-k} f(x)"} d />
            <p>Special: <M t={"F_{\\min}(x) = 1 - [1-F(x)]^n"} />, <M t={"F_{\\max}(x) = [F(x)]^n"} />.</p>
          </Card>
        </section>

        {/* ── TOPIC 9 ── */}
        <section id="estimation" className="lm-section">
          <div className="lm-section-head">
            <span className="lm-section-num">09</span>
            <h2>Point Estimators & Confidence Intervals</h2>
          </div>

          <Card title="Bias & MSE" exam="Check if E[θ̂] = θ (unbiased). MSE = Var + Bias². Compare estimators by MSE or relative efficiency.">
            <ul>
              <li><strong>Unbiased:</strong> <M t={"E[\\hat{\\theta}] = \\theta"} /></li>
              <li><strong>Bias:</strong> <M t={"B(\\hat{\\theta}) = E[\\hat{\\theta}] - \\theta"} /></li>
              <li><strong>MSE:</strong> <M t={"\\text{MSE}(\\hat{\\theta}) = \\text{Var}(\\hat{\\theta}) + [B(\\hat{\\theta})]^2"} /></li>
              <li><strong>Efficiency:</strong> <M t={"e(\\hat{\\theta}_1, \\hat{\\theta}_2) = \\frac{\\text{MSE}(\\hat{\\theta}_2)}{\\text{MSE}(\\hat{\\theta}_1)}"} /></li>
            </ul>
            <p><M t={"\\bar{X}"} /> is unbiased for <M t={"\\mu"} />, <M t={"S^2"} /> is unbiased for <M t={"\\sigma^2"} />.</p>
          </Card>

          <Card title="CI for μ (σ known)" exam="Z-interval. The formula is given but you must know when to use it.">
            <M t={"\\bar{X} \\pm z_{\\alpha/2} \\cdot \\frac{\\sigma}{\\sqrt{n}}"} d />
            <p>Use when: population normal (or <M t={"n \\geq 30"} />) and <M t={"\\sigma"} /> known.</p>
          </Card>

          <Card title="CI for μ (σ unknown)" exam="t-interval. Replace σ with S, use t critical value with n−1 df.">
            <M t={"\\bar{X} \\pm t_{\\alpha/2}(n-1) \\cdot \\frac{S}{\\sqrt{n}}"} d />
            <p>Use when: population normal (or <M t={"n \\geq 30"} />) and <M t={"\\sigma"} /> unknown.</p>
          </Card>

          <Card title="CI for σ²" exam="Chi-square interval. Remember the asymmetry — lower and upper bounds use different chi-square values.">
            <M t={"\\left(\\frac{(n-1)S^2}{\\chi^2_{\\alpha/2}(n-1)},\\; \\frac{(n-1)S^2}{\\chi^2_{1-\\alpha/2}(n-1)}\\right)"} d />
            <p>Requires normal population. <strong>Not symmetric</strong> around <M t={"S^2"} />.</p>
          </Card>

          <Card title="CI for proportion p" exam="Large-sample z-interval. Use p̂ = x/n. Need np̂ ≥ 5 and n(1−p̂) ≥ 5.">
            <M t={"\\hat{p} \\pm z_{\\alpha/2} \\sqrt{\\frac{\\hat{p}(1-\\hat{p})}{n}}"} d />
          </Card>

          <Card title="Sample Size Determination" exam="'How large n for margin of error E?' Solve n = (z·σ/E)² or n = z²p(1−p)/E². Round UP.">
            <p>For mean: <M t={"n = \\left(\\frac{z_{\\alpha/2} \\cdot \\sigma}{E}\\right)^{\\!2}"} /></p>
            <p>For proportion: <M t={"n = \\frac{z_{\\alpha/2}^2 \\cdot p(1-p)}{E^2}"} /> (use <M t={"p=0.5"} /> if unknown, gives largest <M t={"n"} />).</p>
          </Card>
        </section>

        {/* ── TOPIC 10 ── */}
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

          <Card title="Type I & II Errors" exam="α = P(reject H₀ | H₀ true). β = P(fail to reject H₀ | H₁ true). Power = 1 − β.">
            <ul>
              <li><strong>Type I (α):</strong> Reject <M t={"H_0"} /> when it's true (false alarm)</li>
              <li><strong>Type II (β):</strong> Fail to reject <M t={"H_0"} /> when <M t={"H_1"} /> is true (missed detection)</li>
              <li><strong>Power = <M t={"1 - \\beta"} /></strong>: probability of correctly rejecting a false <M t={"H_0"} /></li>
            </ul>
          </Card>

          <Card title="Test Procedure" exam="Five steps: (1) state H₀/H₁, (2) choose α, (3) compute test stat, (4) find critical value/p-value, (5) decide.">
            <ol>
              <li>State <M t={"H_0"} /> and <M t={"H_1"} /></li>
              <li>Choose significance level <M t={"\\alpha"} /></li>
              <li>Compute test statistic from data</li>
              <li>Find critical value(s) or p-value</li>
              <li>Reject <M t={"H_0"} /> if test stat in rejection region (or p-value <M t={"< \\alpha"} />)</li>
            </ol>
          </Card>

          <Card title="Power & Sample Size" exam="Power increases with n, with |θ − θ₀|, and with α. They may ask you to compute β for a specific alternative.">
            <p>To find <M t={"\\beta"} /> at alternative <M t={"\\theta_1"} />: find the rejection region under <M t={"H_0"} />, then compute the probability of NOT being in that region when <M t={"\\theta = \\theta_1"} />.</p>
            <p>More data (larger <M t={"n"} />) → more power → easier to detect real effects.</p>
          </Card>
        </section>

        {/* ── TOPIC 11 ── */}
        <section id="single-pop" className="lm-section">
          <div className="lm-section-head">
            <span className="lm-section-num">11</span>
            <h2>Single Population Hypothesis Tests</h2>
          </div>

          <Card title="z-Test for μ (σ known)" exam="Rarely realistic but frequently tested. Same pivot as the z-interval.">
            <M t={"Z = \\frac{\\bar{X} - \\mu_0}{\\sigma/\\sqrt{n}} \\sim N(0,1)"} d />
            <p>Reject <M t={"H_0"} /> if <M t={"|Z| > z_{\\alpha/2}"} /> (two-sided), <M t={"Z > z_\\alpha"} /> (right), <M t={"Z < -z_\\alpha"} /> (left).</p>
          </Card>

          <Card title="t-Test for μ (σ unknown)" exam="The most common test in practice. Replace σ with S, use t(n−1) distribution.">
            <M t={"T = \\frac{\\bar{X} - \\mu_0}{S/\\sqrt{n}} \\sim t(n-1)"} d />
            <p>Same rejection logic as z-test but with t critical values.</p>
          </Card>

          <Card title="χ²-Test for σ²" exam="Test whether variance equals a specific value. Based on the chi-square sampling distribution of S².">
            <M t={"\\chi^2 = \\frac{(n-1)S^2}{\\sigma_0^2} \\sim \\chi^2(n-1)"} d />
            <p>Two-sided: reject if <M t={"\\chi^2 < \\chi^2_{1-\\alpha/2}"} /> or <M t={"\\chi^2 > \\chi^2_{\\alpha/2}"} />.</p>
            <p><strong>Requires normal population</strong> — sensitive to non-normality.</p>
          </Card>

          <Card title="z-Test for proportion p" exam="Large-sample test. Use p₀ (not p̂) in the standard error under H₀.">
            <M t={"Z = \\frac{\\hat{p} - p_0}{\\sqrt{p_0(1-p_0)/n}} \\sim N(0,1)"} d />
            <p>Note: use <M t={"p_0"} /> (hypothesised value) in the denominator, not <M t={"\\hat{p}"} />.</p>
          </Card>
        </section>

        {/* ── TOPIC 12 ── */}
        <section id="two-pop" className="lm-section">
          <div className="lm-section-head">
            <span className="lm-section-num">12</span>
            <h2>Two Population Hypothesis Tests</h2>
          </div>

          <Card title="z-Test for μ₁ − μ₂ (σ's known)" exam="Two independent samples, both variances known. Same structure as single-sample z-test.">
            <M t={"Z = \\frac{(\\bar{X} - \\bar{Y}) - d_0}{\\sqrt{\\sigma_X^2/n_X + \\sigma_Y^2/n_Y}}"} d />
            <p>Usually test <M t={"d_0 = 0"} /> (no difference).</p>
          </Card>

          <Card title="Pooled t-Test (equal variances)" exam="Pool the variances when you can assume σ₁² = σ₂². df = n₁ + n₂ − 2.">
            <M t={"S_P^2 = \\frac{(n_X-1)S_X^2 + (n_Y-1)S_Y^2}{n_X+n_Y-2}"} d />
            <M t={"T = \\frac{(\\bar{X}-\\bar{Y})-d_0}{\\sqrt{S_P^2(1/n_X + 1/n_Y)}} \\sim t(n_X+n_Y-2)"} d />
          </Card>

          <Card title="Welch t-Test (unequal variances)" exam="When you can't assume equal variances. df is ugly (Satterthwaite) — it'll be given.">
            <M t={"T = \\frac{(\\bar{X}-\\bar{Y})-d_0}{\\sqrt{S_X^2/n_X + S_Y^2/n_Y}}"} d />
            <p>df via Satterthwaite formula (rounded down). Use when <M t={"\\sigma_X^2 \\neq \\sigma_Y^2"} /> or unsure.</p>
          </Card>

          <Card title="Paired t-Test" exam="For PAIRED data (before/after, matched). Compute D_i = X_i − Y_i, then do a one-sample t-test on D.">
            <M t={"T = \\frac{\\bar{D} - d_0}{S_D/\\sqrt{n}} \\sim t(n-1)"} d />
            <p>Key: the observations must be naturally paired. <M t={"n"} /> = number of pairs.</p>
          </Card>

          <Card title="F-Test for σ₁²/σ₂²" exam="Test whether two variances are equal. F = S₁²/S₂². Put the larger variance on top.">
            <M t={"F = \\frac{S_X^2/\\sigma_X^2}{S_Y^2/\\sigma_Y^2} \\sim F(n_X-1, n_Y-1)"} d />
            <p>Under <M t={"H_0: \\sigma_X^2 = \\sigma_Y^2"} />: <M t={"F = S_X^2/S_Y^2"} />. Requires normality.</p>
          </Card>

          <Card title="Two-proportion z-Test" exam="Comparing proportions from two groups. Use the pooled proportion p̂ in the SE.">
            <M t={"Z = \\frac{\\hat{p}_X - \\hat{p}_Y}{\\sqrt{\\hat{p}(1-\\hat{p})(1/n_X + 1/n_Y)}}"} d />
            <p>where <M t={"\\hat{p} = \\frac{x_1 + x_2}{n_X + n_Y}"} /> is the pooled sample proportion.</p>
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
