import { Link } from 'react-router-dom'
import { useRef, useLayoutEffect } from 'react'
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

const mistakes = [
  {
    category: 'Setup & Reading',
    items: [
      {
        title: 'Not stating the support',
        detail: 'Every PDF answer must include "for (support)" and "0 otherwise." A pdf without its support is incomplete and costs 1–2 marks.',
        fix: 'After every pdf calculation, write the full piecewise: f(x) = ... for ... , 0 otherwise.',
      },
      {
        title: 'Wrong integration limits from support',
        detail: <>For marginal pdfs, the inner limits <strong>depend on the outer variable</strong>. E.g., for <M t="0 < y < \sqrt{x}" />, integrating out y gives limits 0 to <M t="\sqrt{x}" />, not 0 to 1. Drawing the support prevents this.</>,
        fix: 'ALWAYS draw the support region and trace a line (vertical for f_X, horizontal for f_Y) to read off limits.',
      },
      {
        title: 'Reading the wrong table value',
        detail: <>The t-table, <M t="\chi^2" />-table, and F-table use different conventions. The t-table gives <strong>upper-tail</strong> probabilities. The <M t="\chi^2" />-table gives <strong>right-tail</strong> area. For F: <M t="F_{1-\alpha;\,\nu_1,\nu_2} = 1/F_{\alpha;\,\nu_2,\nu_1}" />.</>,
        fix: 'Circle the df row and α column before reading. Double-check: "I need t_{0.025, 29}" not "t_{0.05, 29}" for a 95% two-sided test.',
      },
    ]
  },
  {
    category: 'Hypothesis Testing',
    items: [
      {
        title: 'Forgetting to state hypotheses',
        detail: <>Step 1 is always H₀ and H₁ with α. Writing just the test statistic without hypotheses loses 1–2 points. Also: H₀ must be an <strong>equality</strong> (<M t="\mu = \mu_0" />), never an inequality.</>,
        fix: 'Start every test with: "H₀: [parameter] = [value] vs H₁: [parameter] [>/</ ≠] [value], α = ..."',
      },
      {
        title: 'Forgetting assumptions (Step 3)',
        detail: 'The 6-step recipe has an "assumptions" step worth 1 point. You need: (1) random sample, (2) normality or CLT, (3) σ known/unknown. For F-test and χ²-test: normality is required.',
        fix: 'Write three bullet points: "Random sample ✓. n≥30 so CLT ✓ (or population normal). σ known/unknown ✓."',
      },
      {
        title: 'Conclusion not in context',
        detail: '"Reject H₀" alone is incomplete. You must state what rejection means in the context of the problem. "There is sufficient evidence that the mean delivery time exceeds 5 minutes."',
        fix: 'Template: "At α = ___, we [reject/do not reject] H₀. There is [sufficient/insufficient] evidence that [restate H₁ in words]."',
      },
      {
        title: 'One-tailed vs two-tailed confusion',
        detail: <>Using <M t="z_{{\alpha}/2}" /> (two-tailed) when the test is one-tailed, or vice versa. For "greater than" or "less than" → one-tailed (<M t="z_\alpha" />). For "differs from" or "not equal to" → two-tailed (<M t="z_{{\alpha}/2}" />).</>,
        fix: 'Read H₁ carefully. >, < → one tail (α). ≠ → two tails (α/2).',
      },
      {
        title: 'Wrong df for pooled t-test',
        detail: <>The pooled two-sample t-test has df = <M t="n_1 + n_2 - 2" />, NOT <M t="n_1 + n_2 - 1" /> or <M t="n_1 - 1" />. The single-sample t-test has df = n − 1.</>,
        fix: 'Single sample: df = n−1. Pooled two-sample: df = n₁+n₂−2. Write it explicitly next to the test statistic.',
      },
    ]
  },
  {
    category: 'Confidence Intervals',
    items: [
      {
        title: 'CI for proportion: using p̂ in denominator instead of p₀ for tests',
        detail: <>For a <strong>test</strong>, the z-statistic denominator uses <M t="p_0" /> (null value): <M t="\sqrt{p_0(1-p_0)/n}" />. For a <strong>CI</strong>, use <M t="\hat{p}" />: <M t="\sqrt{\hat{p}(1-\hat{p})/n}" />. Mixing these up changes the answer.</>,
        fix: 'Test → p₀ in denominator. CI → p̂ in denominator. Always check which you\'re doing.',
      },
      {
        title: 'Not checking if μ₀ is inside the CI',
        detail: 'When a CI is used to test a hypothesis, the conclusion is: μ₀ ∈ CI → do not reject. μ₀ ∉ CI → reject. Many students compute the CI correctly but forget to actually check.',
        fix: 'After computing (L, U), write: "Since [value] ∈ (L, U) / ∉ (L, U), we [do not reject / reject] H₀."',
      },
      {
        title: 'Variance CI: dividing by wrong χ² quantile',
        detail: <>The CI for variance is <M t="\left(\frac{(n-1)s^2}{{\chi^2_{{\alpha}/2}}}, \frac{(n-1)s^2}{{\chi^2_{{1-\alpha}/2}}}\right)" />. The <strong>larger</strong> <M t="\chi^2" /> goes in the <strong>denominator of the lower bound</strong>. Swapping them flips the interval.</>,
        fix: 'Lower bound = (n−1)s² / χ²_{α/2} (bigger χ² → smaller bound). Upper = (n−1)s² / χ²_{1−α/2}.',
      },
    ]
  },
  {
    category: 'Transformations',
    items: [
      {
        title: 'CDF method: forgetting the second case',
        detail: <>When using <M t="F_Z(z) = P(g(X,Y) \leq z)" />, the line <M t="y = zx" /> often intersects the support boundary at different points depending on z. This creates <strong>two cases</strong> (e.g., 0 &lt; z &lt; 1 vs z ≥ 1). Missing one case means half the pdf is wrong.</>,
        fix: 'After drawing the support with the line y = zx, ask: "Where does this line exit the support?" If the exit point changes with z → two cases.',
      },
      {
        title: 'Jacobian: forgetting to transform the support',
        detail: 'Finding |J| and substituting is only half the answer. You must also transform every boundary equation from (x,y) to (v,w) and state the new support. This is often worth 3+ points.',
        fix: 'For each boundary (x=0, y=0, x<y, x+y<1, etc.), substitute the inverse transformation and simplify. Draw the new support.',
      },
      {
        title: 'MGF: not stating independence',
        detail: <><M t="M_{X+Y}(t) = M_X(t) \cdot M_Y(t)" /> is ONLY valid when X and Y are <strong>independent</strong>. You must write "Since X₁,...,Xₙ are independent..." before factoring the MGF. Also state "iid" (identically distributed) when using random sample properties.</>,
        fix: 'Before every MGF factorization, write: "Since X₁,...,Xₙ are independent (random sample), M_{sum}(t) = ∏ M_{Xi}(t)."',
      },
    ]
  },
  {
    category: 'Computation',
    items: [
      {
        title: 'Var(X−Y) = Var(X) + Var(Y), not minus',
        detail: <><M t="\text{Var}(X-Y) = \text{Var}(X) + \text{Var}(Y) - 2\text{Cov}(X,Y)" />. The variance of a difference <strong>adds</strong> variances (minus sign only hits the covariance term). If independent: Var(X−Y) = Var(X) + Var(Y).</>,
        fix: 'Remember: variance measures spread. Subtracting two random variables doesn\'t reduce spread — it increases it.',
      },
      {
        title: 'Not rounding sample size UP',
        detail: <>When computing minimum n, you get something like n = 270.6. The answer is n = 271, not 270 or 271. Always <strong>round up</strong> to ensure the margin of error condition is met.</>,
        fix: 'Always ceil(n). Write "Round up: n = [value]."',
      },
      {
        title: 'Verifying f ≥ 0 after normalization',
        detail: <>After finding the normalization constant c, state: "Since <M t="c > 0" /> and <M t="g(x,y) \geq 0" /> on the support, <M t="f \geq 0" />." This is a free point that many students skip.</>,
        fix: 'After every normalization: write "f ≥ 0 ✓" with brief justification.',
      },
    ]
  },
]

export default function Checklist() {
  return (
    <div className="ck-root">
      <nav className="ck-topbar">
        <Link to="/" className="rb-back">← Home</Link>
        <Link to="/recipes" className="rb-back">→ Recipes</Link>
      </nav>
      <main className="ck-main">
        <header className="ck-header">
          <h1 className="ck-title">Pre-Submit <em>Checklist</em></h1>
          <p className="ck-subtitle">The {mistakes.reduce((a, c) => a + c.items.length, 0)} most common mistakes across 6 past PTS2 exams. Check these before handing in your paper.</p>
        </header>

        {mistakes.map((section) => (
          <div key={section.category} className="ck-section">
            <h2 className="ck-section-title">{section.category}</h2>
            {section.items.map((item, i) => (
              <div key={i} className="ck-card">
                <div className="ck-card-head">
                  <span className="ck-num">{i + 1}</span>
                  <h3 className="ck-card-title">{item.title}</h3>
                </div>
                <div className="ck-card-detail">{item.detail}</div>
                <div className="ck-card-fix"><strong>Fix:</strong> {item.fix}</div>
              </div>
            ))}
          </div>
        ))}

        <div className="ck-final">
          <h2>Last 5 Minutes Routine</h2>
          <ol className="ck-routine">
            <li>Scan every pdf answer: does it have support + "0 otherwise"?</li>
            <li>Every hypothesis test: count your 6 steps (hypotheses, statistic, assumptions, region, compute, conclude).</li>
            <li>Every CI: did you state the interpretation in words?</li>
            <li>Every integration: do the limits match the support drawing?</li>
            <li>Check all table lookups: right df row, right α column, right tail direction.</li>
            <li>Verify f ≥ 0 stated after every normalization constant.</li>
            <li>Sample size answers: rounded UP?</li>
          </ol>
        </div>

        <footer className="ck-footer">
          <p>Compiled from error patterns across 6 PTS2 exams (2022–2025, resit 2024, resit 2025).</p>
          <p>Good luck tomorrow.</p>
        </footer>
      </main>
    </div>
  )
}
