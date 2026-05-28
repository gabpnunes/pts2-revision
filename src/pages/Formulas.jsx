import { Link } from 'react-router-dom'
import { useCallback } from 'react'
import MathBlock from '../components/MathBlock'

function M({ t, d }) {
  return <MathBlock math={t} display={!!d} />
}

function Formula({ math, label, given, note }) {
  return (
    <div className={`fs-formula ${given ? 'fs-given' : 'fs-memorise'}`}>
      <div className="fs-formula-main">
        {label && <span className="fs-formula-label">{label}</span>}
        <M t={math} d />
      </div>
      <div className="fs-formula-badge">
        {given ? (
          <span className="fs-badge-given">On formula sheet</span>
        ) : (
          <span className="fs-badge-memorise">Must know</span>
        )}
      </div>
      {note && <p className="fs-formula-note">{note}</p>}
    </div>
  )
}

function Section({ id, num, title, children }) {
  return (
    <section className="fs-section" id={id}>
      <h2 className="fs-section-title">
        <span className="fs-section-num">{num}</span>
        {title}
      </h2>
      <div className="fs-section-body">{children}</div>
    </section>
  )
}

function SubSection({ title, children }) {
  return (
    <div className="fs-subsection">
      <h3 className="fs-sub-title">{title}</h3>
      {children}
    </div>
  )
}

const sections = [
  { id: 'joint-discrete', num: 1, title: 'Joint Discrete Distributions' },
  { id: 'joint-continuous', num: 2, title: 'Joint Continuous Distributions' },
  { id: 'expected-values', num: 3, title: 'Expected Values (Multivariate)' },
  { id: 'independence', num: 4, title: 'Independence, Covariance & Correlation' },
  { id: 'conditional', num: 5, title: 'Conditional Distributions' },
  { id: 'mgf-bivariate', num: 6, title: 'Joint MGFs & Bivariate Normal' },
  { id: 'transformations', num: 7, title: 'Transformations & Sums' },
  { id: 'sampling', num: 8, title: 'Sampling Distributions & Order Statistics' },
  { id: 'estimation', num: 9, title: 'Point Estimation & Confidence Intervals' },
  { id: 'hyp-fund', num: 10, title: 'Hypothesis Testing Fundamentals' },
  { id: 'single-pop', num: 11, title: 'Single Population Tests' },
  { id: 'two-pop', num: 12, title: 'Two Population Tests' },
  { id: 'distributions', num: 13, title: 'Common Distributions Table' },
]

export default function Formulas() {
  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <div className="fs-root">
      <aside className="fs-sidebar">
        <Link to="/" className="back-home">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Home
        </Link>

        <nav className="fs-toc">
          {sections.map(s => (
            <button key={s.id} className="fs-toc-item" onClick={() => scrollTo(s.id)}>
              <span className="fs-toc-num">{s.num}</span>
              <span className="fs-toc-label">{s.title}</span>
            </button>
          ))}
        </nav>

        <div className="fs-legend">
          <div className="fs-legend-item"><span className="fs-dot fs-dot-given" /> On official formula sheet</div>
          <div className="fs-legend-item"><span className="fs-dot fs-dot-memorise" /> Must know / memorise</div>
        </div>
      </aside>

      <main className="fs-main">
        <header className="fs-header">
          <p className="sg-eyebrow">Reference</p>
          <h1 className="sg-title" style={{ fontSize: 52 }}>Formula Sheet</h1>
          <p className="sg-lede">
            Every formula, theorem and identity across Chapters 5–8 needed for the exam.
            Green means it appears on the official exam formula sheet; amber means you must memorise it.
          </p>
        </header>

        {/* ─── TOPIC 1: Joint Discrete ─── */}
        <Section id="joint-discrete" num={1} title="Joint Discrete Distributions">
          <Formula
            label="Joint PMF"
            math={"p(x,y) = P(X = x, Y = y)"}
            note="Must satisfy p(x,y) >= 0 and the sum over all (x,y) equals 1."
          />
          <Formula
            label="Marginal PMF"
            math={"p_X(x) = \\sum_{\\text{all } y} p(x,y), \\qquad p_Y(y) = \\sum_{\\text{all } x} p(x,y)"}
          />
          <Formula
            label="Joint CDF (discrete)"
            math={"F_{X,Y}(x,y) = P(X \\le x, Y \\le y) = \\sum_{s \\le x} \\sum_{t \\le y} p(s,t)"}
          />
          <Formula
            label="Probability from joint PMF"
            math={"P((X,Y) \\in A) = \\sum_{(x,y) \\in A} p(x,y)"}
          />
          <Formula
            label="Multinomial PMF"
            math={"f_{\\vec{X}}(x_1, \\ldots, x_k) = \\frac{n!}{x_1! \\cdots x_{k+1}!}\\, p_1^{x_1} \\cdots p_{k+1}^{x_{k+1}}"}
            given
            note="Where x_{k+1} = n - x_1 - ... - x_k and p_{k+1} = 1 - p_1 - ... - p_k."
          />
          <Formula
            label="Multinomial marginals & covariance"
            math={"X_j \\sim \\text{Bin}(n, p_j), \\quad E[X_j] = np_j, \\quad \\operatorname{Var}(X_j) = np_j(1-p_j), \\quad \\operatorname{Cov}(X_i, X_j) = -np_i p_j"}
            note="Covariance is always negative (i ≠ j). Each marginal is Binomial."
          />
          <Formula
            label="Multivariate Hypergeometric PMF"
            math={"f_{\\vec{X}}(x_1, \\ldots, x_k) = \\frac{\\binom{M_1}{x_1}\\binom{M_2}{x_2}\\cdots\\binom{M_k}{x_k}\\binom{M_{k+1}}{x_{k+1}}}{\\binom{N}{n}}"}
            given
          />
        </Section>

        {/* ─── TOPIC 2: Joint Continuous ─── */}
        <Section id="joint-continuous" num={2} title="Joint Continuous Distributions">
          <Formula
            label="Joint PDF condition"
            math={"f_{X,Y}(x,y) \\ge 0 \\quad \\text{and} \\quad \\int_{-\\infty}^{\\infty}\\int_{-\\infty}^{\\infty} f_{X,Y}(x,y)\\,dx\\,dy = 1"}
          />
          <Formula
            label="Probability from joint PDF"
            math={"P((X,Y) \\in A) = \\iint_A f_{X,Y}(x,y)\\,dx\\,dy"}
          />
          <Formula
            label="Joint CDF"
            math={"F_{X,Y}(x,y) = \\int_{-\\infty}^{x}\\int_{-\\infty}^{y} f_{X,Y}(s,t)\\,dt\\,ds"}
          />
          <Formula
            label="PDF from CDF"
            math={"f_{X,Y}(x,y) = \\frac{\\partial^2}{\\partial x\\, \\partial y} F_{X,Y}(x,y)"}
          />
          <Formula
            label="Marginal PDF"
            math={"f_X(x) = \\int_{-\\infty}^{\\infty} f_{X,Y}(x,y)\\,dy, \\qquad f_Y(y) = \\int_{-\\infty}^{\\infty} f_{X,Y}(x,y)\\,dx"}
          />
        </Section>

        {/* ─── TOPIC 3: Expected Values ─── */}
        <Section id="expected-values" num={3} title="Expected Values (Multivariate)">
          <Formula
            label="E[g(X,Y)] — discrete"
            math={"E[g(X,Y)] = \\sum_x \\sum_y g(x,y)\\, p(x,y)"}
          />
          <Formula
            label="E[g(X,Y)] — continuous"
            math={"E[g(X,Y)] = \\int_{-\\infty}^{\\infty}\\int_{-\\infty}^{\\infty} g(x,y)\\, f_{X,Y}(x,y)\\,dx\\,dy"}
          />
          <Formula
            label="Linearity of expectation"
            math={"E[aX + bY + c] = a\\,E[X] + b\\,E[Y] + c"}
          />
          <Formula
            label="Variance of a linear combination"
            math={"\\operatorname{Var}(aX + bY) = a^2\\operatorname{Var}(X) + b^2\\operatorname{Var}(Y) + 2ab\\operatorname{Cov}(X,Y)"}
            note="If X and Y are independent, the covariance term vanishes."
          />
          <Formula
            label="Variance of a general sum"
            math={"\\operatorname{Var}\\!\\left(\\sum_{i=1}^n X_i\\right) = \\sum_{i=1}^n \\operatorname{Var}(X_i) + 2\\sum_{i<j}\\operatorname{Cov}(X_i, X_j)"}
            note="For any random variables. If independent, all Cov terms vanish."
          />
          <Formula
            label="Variance of a sum of n independent r.v.'s"
            math={"\\operatorname{Var}\\!\\left(\\sum_{i=1}^n a_i X_i\\right) = \\sum_{i=1}^n a_i^2 \\operatorname{Var}(X_i)"}
            note="Only when X_1, ..., X_n are independent."
          />
        </Section>

        {/* ─── TOPIC 4: Independence, Covariance & Correlation ─── */}
        <Section id="independence" num={4} title="Independence, Covariance & Correlation">
          <SubSection title="Independence">
            <Formula
              label="Independence condition (discrete)"
              math={"p(x,y) = p_X(x) \\cdot p_Y(y) \\quad \\text{for all } (x,y)"}
            />
            <Formula
              label="Independence condition (continuous)"
              math={"f_{X,Y}(x,y) = f_X(x) \\cdot f_Y(y) \\quad \\text{for all } (x,y)"}
              note="Equivalently: support must be rectangular and PDF must factor."
            />
            <Formula
              label="Independence implies"
              math={"E[g(X)\\,h(Y)] = E[g(X)]\\,E[h(Y)]"}
            />
          </SubSection>
          <SubSection title="Covariance">
            <Formula
              label="Covariance (definition)"
              math={"\\operatorname{Cov}(X,Y) = E[(X - \\mu_X)(Y - \\mu_Y)]"}
            />
            <Formula
              label="Covariance (computational)"
              math={"\\operatorname{Cov}(X,Y) = E[XY] - E[X]\\,E[Y]"}
            />
            <Formula
              label="Covariance properties"
              math={"\\operatorname{Cov}(aX+b,\\, cY+d) = ac\\,\\operatorname{Cov}(X,Y)"}
            />
            <Formula
              label="Independence ⟹ Cov = 0"
              math={"X \\perp Y \\implies \\operatorname{Cov}(X,Y) = 0"}
              note="The converse is NOT true in general."
            />
          </SubSection>
          <SubSection title="Correlation">
            <Formula
              label="Correlation coefficient"
              math={"\\rho_{X,Y} = \\frac{\\operatorname{Cov}(X,Y)}{\\sigma_X \\sigma_Y}, \\qquad -1 \\le \\rho \\le 1"}
            />
          </SubSection>
        </Section>

        {/* ─── TOPIC 5: Conditional ─── */}
        <Section id="conditional" num={5} title="Conditional Distributions">
          <Formula
            label="Conditional PMF"
            math={"p_{Y|X}(y|x) = \\frac{p(x,y)}{p_X(x)}, \\qquad p_X(x) > 0"}
          />
          <Formula
            label="Conditional PDF"
            math={"f_{Y|X}(y|x) = \\frac{f_{X,Y}(x,y)}{f_X(x)}, \\qquad f_X(x) > 0"}
          />
          <Formula
            label="Conditional expectation"
            math={"E[Y|X=x] = \\sum_y y\\, p_{Y|X}(y|x) \\quad \\text{or} \\quad \\int_{-\\infty}^{\\infty} y\\, f_{Y|X}(y|x)\\,dy"}
          />
          <Formula
            label="Law of total expectation"
            math={"E[Y] = E\\big[E[Y|X]\\big]"}
          />
          <Formula
            label="Conditional variance"
            math={"\\operatorname{Var}(Y|X=x) = E[Y^2|X=x] - \\big(E[Y|X=x]\\big)^2"}
          />
          <Formula
            label="Law of total variance"
            math={"\\operatorname{Var}(Y) = E\\big[\\operatorname{Var}(Y|X)\\big] + \\operatorname{Var}\\big(E[Y|X]\\big)"}
          />
          <Formula
            label="Joint PDF decomposition"
            math={"f_{X,Y}(x,y) = f_X(x)\\, f_{Y|X}(y|x) = f_Y(y)\\, f_{X|Y}(x|y)"}
            note="Useful for constructing joint distributions from marginal and conditional."
          />
        </Section>

        {/* ─── TOPIC 6: MGFs & Bivariate Normal ─── */}
        <Section id="mgf-bivariate" num={6} title="Joint MGFs & Bivariate Normal">
          <SubSection title="Moment Generating Functions">
            <Formula
              label="MGF (single variable)"
              math={"M_X(t) = E[e^{tX}]"}
            />
            <Formula
              label="Joint MGF"
              math={"M_{X,Y}(t_1,t_2) = E\\!\\left[e^{t_1 X + t_2 Y}\\right]"}
            />
            <Formula
              label="MGF of a sum (independent)"
              math={"X \\perp Y \\implies M_{X+Y}(t) = M_X(t) \\cdot M_Y(t)"}
              note="Key technique: find MGF of sum, match to known distribution."
            />
            <Formula
              label="MGF uniqueness theorem"
              math={"M_X(t) = M_Y(t) \\text{ for all } t \\in (-h,h) \\implies X \\stackrel{d}{=} Y"}
            />
            <Formula
              label="Moments from MGF"
              math={"E[X^n] = M_X^{(n)}(0) = \\frac{d^n}{dt^n} M_X(t)\\Big|_{t=0}"}
            />
            <Formula
              label="Moments from joint MGF"
              math={"E[X] = \\frac{\\partial M}{\\partial t_1}\\bigg|_{\\mathbf{0}}, \\quad E[XY] = \\frac{\\partial^2 M}{\\partial t_1\\,\\partial t_2}\\bigg|_{\\mathbf{0}}, \\quad E[X^2] = \\frac{\\partial^2 M}{\\partial t_1^2}\\bigg|_{\\mathbf{0}}"}
              note="Evaluate all partial derivatives at t₁ = t₂ = 0."
            />
            <Formula
              label="Marginal MGF from joint"
              math={"M_X(t) = M_{X,Y}(t, 0), \\qquad M_Y(t) = M_{X,Y}(0, t)"}
            />
            <Formula
              label="Independence via joint MGF"
              math={"X \\perp Y \\iff M_{X,Y}(t_1, t_2) = M_X(t_1) \\cdot M_Y(t_2) \\quad \\text{for all } t_1, t_2"}
            />
            <Formula
              label="MGF of linear transform"
              math={"M_{aX+b}(t) = e^{bt}\\, M_X(at)"}
            />
          </SubSection>
          <SubSection title="Bivariate Normal">
            <Formula
              label="Bivariate Normal PDF"
              math={"f_{X,Y}(x,y) = \\frac{1}{2\\pi\\sigma_X\\sigma_Y\\sqrt{1-\\rho^2}}\\exp\\!\\left[-\\frac{1}{2(1-\\rho^2)}\\left(\\frac{(x-\\mu_X)^2}{\\sigma_X^2} + \\frac{(y-\\mu_Y)^2}{\\sigma_Y^2} - 2\\rho\\frac{(x-\\mu_X)(y-\\mu_Y)}{\\sigma_X\\sigma_Y}\\right)\\right]"}
              given
            />
            <Formula
              label="Bivariate Normal — conditional"
              math={"Y|X=x \\sim N\\!\\left(\\mu_Y + \\rho\\frac{\\sigma_Y}{\\sigma_X}(x-\\mu_X),\\; \\sigma_Y^2(1-\\rho^2)\\right)"}
              given
            />
            <Formula
              label="Bivariate Normal — joint MGF"
              math={"M_{X,Y}(t_1,t_2) = \\exp\\!\\left[\\mu_X t_1 + \\mu_Y t_2 + \\tfrac{1}{2}(\\sigma_X^2 t_1^2 + \\sigma_Y^2 t_2^2 + 2\\rho\\sigma_X\\sigma_Y t_1 t_2)\\right]"}
              given
            />
            <Formula
              label="Bivariate Normal — independence"
              math={"X \\perp Y \\iff \\rho = 0 \\quad \\text{(only for bivariate normal!)}"}
              note="For bivariate normal ONLY, uncorrelated implies independent."
            />
            <Formula
              label="Multivariate Normal PDF (k dimensions)"
              math={"f_{\\vec{X}}(\\vec{x}) = \\frac{1}{\\sqrt{(2\\pi)^k |\\Sigma|}}\\exp\\!\\left[-\\tfrac{1}{2}(\\vec{x}-\\vec{\\mu})^T \\Sigma^{-1}(\\vec{x}-\\vec{\\mu})\\right]"}
              given
            />
            <Formula
              label="Variance of linear combination (matrix form)"
              math={"W = \\mathbf{a}\\mathbf{X}^T \\implies \\operatorname{Var}(W) = \\mathbf{a}\\,\\Sigma\\,\\mathbf{a}^T = \\sum_i a_i^2 \\sigma_i^2 + 2\\sum_{i<j} a_i a_j \\sigma_{ij}"}
              note="Where Σ is the covariance matrix and a = (a₁, ..., aₖ)."
            />
          </SubSection>
        </Section>

        {/* ─── TOPIC 7: Transformations ─── */}
        <Section id="transformations" num={7} title="Transformations & Distributions of Sums">
          <SubSection title="CDF Method">
            <Formula
              label="CDF method (univariate)"
              math={"F_Y(y) = P(Y \\le y) = P(g(X) \\le y) \\quad \\Rightarrow \\quad f_Y(y) = F_Y'(y)"}
              note="Works for any transformation. Find CDF first, then differentiate."
            />
            <Formula
              label="CDF method (bivariate)"
              math={"F_Z(z) = P(g(X,Y) \\le z) = \\iint_{\\{(x,y): g(x,y) \\le z\\}} f_{X,Y}(x,y)\\,dx\\,dy"}
            />
          </SubSection>
          <SubSection title="Transformation Method (Jacobian)">
            <Formula
              label="1-to-1 bivariate transformation"
              math={"f_{U,V}(u,v) = f_{X,Y}\\big(x(u,v),\\, y(u,v)\\big) \\cdot |J|"}
            />
            <Formula
              label="Jacobian"
              math={"J = \\det\\begin{pmatrix} \\frac{\\partial x}{\\partial u} & \\frac{\\partial x}{\\partial v} \\\\ \\frac{\\partial y}{\\partial u} & \\frac{\\partial y}{\\partial v} \\end{pmatrix}"}
              note="Take the absolute value: multiply by |J|, not J."
            />
            <Formula
              label="Univariate monotone transformation"
              math={"f_Y(y) = f_X\\big(g^{-1}(y)\\big) \\cdot \\left|\\frac{d}{dy}g^{-1}(y)\\right|"}
            />
          </SubSection>
          <SubSection title="Sums of Independent Random Variables">
            <Formula
              label="Convolution formula"
              math={"f_{X+Y}(z) = \\int_{-\\infty}^{\\infty} f_X(x)\\, f_Y(z-x)\\,dx"}
            />
            <Formula
              label="Sum of independent Normals"
              math={"X \\sim N(\\mu_1,\\sigma_1^2),\\; Y \\sim N(\\mu_2,\\sigma_2^2) \\implies X+Y \\sim N(\\mu_1+\\mu_2,\\, \\sigma_1^2+\\sigma_2^2)"}
              note="Can be proved via MGFs. Also: aX + bY is Normal."
            />
            <Formula
              label="Sum of independent Chi-squares"
              math={"X \\sim \\chi^2(m),\\; Y \\sim \\chi^2(n) \\implies X+Y \\sim \\chi^2(m+n)"}
            />
            <Formula
              label="Sum of independent Gammas (same θ)"
              math={"X_i \\sim \\text{Gamma}(\\theta, r_i) \\implies \\sum X_i \\sim \\text{Gamma}(\\theta, \\sum r_i)"}
            />
            <Formula
              label="Sum of independent Poissons"
              math={"X \\sim \\text{Poi}(\\lambda_1),\\; Y \\sim \\text{Poi}(\\lambda_2) \\implies X+Y \\sim \\text{Poi}(\\lambda_1+\\lambda_2)"}
            />
            <Formula
              label="Sum of independent Binomials (same p)"
              math={"X_i \\sim \\text{Bin}(m_i, p) \\implies \\sum X_i \\sim \\text{Bin}\\!\\left(\\sum m_i,\\, p\\right)"}
            />
            <Formula
              label="Sum of independent Negative Binomials (same p)"
              math={"X_i \\sim \\text{NegBin}(r_i, p) \\implies \\sum X_i \\sim \\text{NegBin}\\!\\left(\\sum r_i,\\, p\\right)"}
            />
          </SubSection>
        </Section>

        {/* ─── TOPIC 8: Sampling Distributions ─── */}
        <Section id="sampling" num={8} title="Sampling Distributions & Order Statistics">
          <SubSection title="Sample Statistics">
            <Formula
              label="Sample mean"
              math={"\\bar{X} = \\frac{1}{n}\\sum_{i=1}^n X_i"}
            />
            <Formula
              label="Sample variance"
              math={"S^2 = \\frac{1}{n-1}\\sum_{i=1}^n (X_i - \\bar{X})^2"}
            />
            <Formula
              label="S² computational formula"
              math={"S^2 = \\frac{\\sum_{i=1}^n X_i^2 - n\\bar{X}^2}{n-1} = \\frac{\\sum X_i^2 - (\\sum X_i)^2/n}{n-1}"}
              note="Equivalent form — often faster when given ΣXᵢ and ΣXᵢ²."
            />
            <Formula
              label="E[X̄] and Var(X̄)"
              math={"E[\\bar{X}] = \\mu, \\qquad \\operatorname{Var}(\\bar{X}) = \\frac{\\sigma^2}{n}"}
              note="For any random sample (iid) with mean μ and variance σ²."
            />
            <Formula
              label="E[S²]"
              math={"E[S^2] = \\sigma^2"}
              note="S² is an unbiased estimator of σ²."
            />
            <Formula
              label="Sample proportion"
              math={"\\hat{P} = \\frac{Y}{n}, \\quad Y = \\sum_{i=1}^n X_i \\sim \\text{Bin}(n,p)"}
            />
            <Formula
              label="E[P̂] and Var(P̂)"
              math={"E[\\hat{P}] = p, \\qquad \\operatorname{Var}(\\hat{P}) = \\frac{p(1-p)}{n}"}
            />
          </SubSection>
          <SubSection title="Key Results">
            <Formula
              label="Standardization"
              math={"X \\sim N(\\mu, \\sigma^2) \\implies Z = \\frac{X - \\mu}{\\sigma} \\sim N(0,1)"}
            />
            <Formula
              label="Central Limit Theorem (CLT)"
              math={"\\bar{X} \\approx N\\!\\left(\\mu,\\, \\frac{\\sigma^2}{n}\\right) \\text{ for large } n"}
              note="Holds for any population with finite variance. Rule of thumb: n ≥ 30."
            />
            <Formula
              label="CLT — standardized form"
              math={"Z = \\frac{\\bar{X} - \\mu}{\\sigma / \\sqrt{n}} \\xrightarrow{\\;d\\;} N(0,1) \\text{ as } n \\to \\infty"}
            />
            <Formula
              label="Sample proportion (large n)"
              math={"\\hat{P} \\approx N\\!\\left(p,\\, \\frac{p(1-p)}{n}\\right)"}
              note="By CLT. Valid when np ≥ 5 and n(1−p) ≥ 5."
            />
          </SubSection>
          <SubSection title="Normal Sampling Distributions">
            <Formula
              label="Standardized sample mean (σ known)"
              math={"Z = \\frac{\\bar{X} - \\mu}{\\sigma / \\sqrt{n}} \\sim N(0,1)"}
            />
            <Formula
              label="Sum of squared standard normals"
              math={"\\sum_{i=1}^n \\frac{(X_i - \\mu)^2}{\\sigma^2} \\sim \\chi^2(n)"}
              note="When μ is known. Uses n degrees of freedom, not n−1."
            />
            <Formula
              label="Chi-square from sample variance"
              math={"\\frac{(n-1)S^2}{\\sigma^2} \\sim \\chi^2(n-1)"}
              note="Requires X_i ~ N(μ, σ²). Also: X̄ and S² are independent."
            />
            <Formula
              label="t-distribution definition"
              math={"T = \\frac{Z}{\\sqrt{V/\\nu}} \\sim t(\\nu), \\quad Z \\sim N(0,1),\\; V \\sim \\chi^2(\\nu),\\; Z \\perp V"}
            />
            <Formula
              label="t-statistic from sample"
              math={"T = \\frac{\\bar{X} - \\mu}{S / \\sqrt{n}} \\sim t(n-1)"}
              note="Requires X_i ~ N(μ, σ²) and σ unknown."
            />
            <Formula
              label="t-distribution mean & variance"
              math={"E[T] = 0 \\;(\\nu > 1), \\qquad \\operatorname{Var}(T) = \\frac{\\nu}{\\nu - 2} \\;(\\nu > 2)"}
            />
            <Formula
              label="t-distribution PDF"
              math={"f_T(x) = \\frac{\\Gamma((\\nu+1)/2)}{\\Gamma(\\nu/2)\\sqrt{\\pi\\nu}}\\left(1 + \\frac{x^2}{\\nu}\\right)^{-(\\nu+1)/2}"}
              given
            />
            <Formula
              label="F-distribution definition"
              math={"F = \\frac{U/\\nu_1}{V/\\nu_2} \\sim F(\\nu_1,\\nu_2), \\quad U \\sim \\chi^2(\\nu_1),\\; V \\sim \\chi^2(\\nu_2),\\; U \\perp V"}
            />
            <Formula
              label="F-distribution mean"
              math={"E[F] = \\frac{\\nu_2}{\\nu_2 - 2} \\quad (\\nu_2 > 2)"}
              note="Derived from E[U₁/ν₁] · E[ν₂/U₂] using independence."
            />
            <Formula
              label="F-distribution PDF"
              math={"f_F(x) = \\frac{\\Gamma((\\nu_1+\\nu_2)/2)}{\\Gamma(\\nu_1/2)\\Gamma(\\nu_2/2)}\\sqrt{\\frac{\\nu_1^{\\nu_1}\\nu_2^{\\nu_2} x^{\\nu_1-2}}{(\\nu_2+\\nu_1 x)^{\\nu_1+\\nu_2}}}"}
              given
            />
            <Formula
              label="Ratio of sample variances"
              math={"\\frac{S_X^2 / \\sigma_X^2}{S_Y^2 / \\sigma_Y^2} \\sim F(n_X-1, n_Y-1)"}
            />
            <Formula
              label="F reciprocal property"
              math={"\\frac{1}{F_{\\nu_1,\\nu_2;\\alpha}} = F_{\\nu_2,\\nu_1;1-\\alpha}"}
            />
          </SubSection>
          <SubSection title="Order Statistics">
            <Formula
              label="PDF of k-th order statistic"
              math={"f_{Y_k}(y) = \\frac{n!}{(k-1)!(n-k)!}[F(y)]^{k-1}[1-F(y)]^{n-k}f(y)"}
              given
            />
            <Formula
              label="Joint PDF of (Yᵢ, Yⱼ)"
              math={"f_{Y_i,Y_j}(y_i,y_j) = \\frac{n!}{(i-1)!(j-i-1)!(n-j)!}f(y_i)f(y_j)[F(y_i)]^{i-1}[F(y_j)-F(y_i)]^{j-i-1}[1-F(y_j)]^{n-j}"}
              given
              note="For i < j, on the region y_i < y_j."
            />
            <Formula
              label="CDF of minimum Y₁ = X_{(1)}"
              math={"F_{Y_1}(y) = 1 - [1 - F(y)]^n"}
              note="Derives from P(Y₁ > y) = P(all Xᵢ > y) = [1 - F(y)]^n."
            />
            <Formula
              label="CDF of maximum Yₙ = X_{(n)}"
              math={"F_{Y_n}(y) = [F(y)]^n"}
            />
            <Formula
              label="PDF of maximum"
              math={"f_{Y_n}(y) = n\\,[F(y)]^{n-1}\\, f(y)"}
            />
            <Formula
              label="PDF of minimum"
              math={"f_{Y_1}(y) = n\\,[1 - F(y)]^{n-1}\\, f(y)"}
            />
          </SubSection>
        </Section>

        {/* ─── TOPIC 9: Estimation ─── */}
        <Section id="estimation" num={9} title="Point Estimation & Confidence Intervals">
          <SubSection title="Point Estimators">
            <Formula
              label="Bias"
              math={"\\operatorname{Bias}(\\hat{\\theta}) = E[\\hat{\\theta}] - \\theta"}
            />
            <Formula
              label="Mean Squared Error"
              math={"\\text{MSE}(\\hat{\\theta}) = \\operatorname{Var}(\\hat{\\theta}) + [\\operatorname{Bias}(\\hat{\\theta})]^2"}
            />
            <Formula
              label="Unbiased ⟺"
              math={"\\hat{\\theta} \\text{ is unbiased} \\iff E[\\hat{\\theta}] = \\theta"}
            />
            <Formula
              label="Relative efficiency"
              math={"\\text{eff}(\\hat{\\theta}_1, \\hat{\\theta}_2) = \\frac{\\operatorname{Var}(\\hat{\\theta}_2)}{\\operatorname{Var}(\\hat{\\theta}_1)}"}
              note="Efficiency > 1 means θ̂₁ is better."
            />
          </SubSection>
          <SubSection title="Confidence Intervals — Single Population">
            <Formula
              label="CI for μ (σ known)"
              math={"\\bar{X} \\pm z_{\\alpha/2} \\cdot \\frac{\\sigma}{\\sqrt{n}}"}
            />
            <Formula
              label="CI for μ (σ unknown, normal pop.)"
              math={"\\bar{X} \\pm t_{n-1;\\,\\alpha/2} \\cdot \\frac{S}{\\sqrt{n}}"}
            />
            <Formula
              label="Large-sample CI for μ (via CLT)"
              math={"\\bar{X} \\pm z_{\\alpha/2} \\cdot \\frac{S}{\\sqrt{n}}"}
              note="When n ≥ 30 and population is non-normal. Uses S (not σ) with z (not t)."
            />
            <Formula
              label="CI for σ² (normal population)"
              math={"\\left[\\frac{(n-1)S^2}{\\chi^2_{n-1;\\,\\alpha/2}},\\; \\frac{(n-1)S^2}{\\chi^2_{n-1;\\,1-\\alpha/2}}\\right]"}
            />
            <Formula
              label="CI for σ"
              math={"\\left[\\sqrt{\\frac{(n-1)S^2}{\\chi^2_{n-1;\\,\\alpha/2}}},\\; \\sqrt{\\frac{(n-1)S^2}{\\chi^2_{n-1;\\,1-\\alpha/2}}}\\right]"}
            />
            <Formula
              label="CI for proportion p"
              math={"\\hat{p} \\pm z_{\\alpha/2}\\sqrt{\\frac{\\hat{p}(1-\\hat{p})}{n}}"}
              note="Large sample approximation. Use p̂ = x/n."
            />
            <Formula
              label="Sample size for proportion"
              math={"n \\ge \\left(\\frac{z_{\\alpha/2}}{w}\\right)^2 \\hat{p}(1-\\hat{p})"}
              note="Where w is the desired half-width. Conservative: use p̂ = 0.5."
            />
            <Formula
              label="Sample size for mean"
              math={"n \\ge \\left(\\frac{z_{\\alpha/2}\\, \\sigma}{w}\\right)^2"}
            />
          </SubSection>
        </Section>

        {/* ─── TOPIC 10: Hypothesis Testing Fundamentals ─── */}
        <Section id="hyp-fund" num={10} title="Hypothesis Testing Fundamentals">
          <Formula
            label="Type I error"
            math={"\\alpha = P(\\text{reject } H_0 \\mid H_0 \\text{ true})"}
          />
          <Formula
            label="Type II error"
            math={"\\beta = P(\\text{fail to reject } H_0 \\mid H_1 \\text{ true})"}
          />
          <Formula
            label="Power of a test"
            math={"\\text{Power} = 1 - \\beta = P(\\text{reject } H_0 \\mid H_1 \\text{ true})"}
          />
          <Formula
            label="p-value"
            math={"\\text{p-value} = P(\\text{test statistic at least as extreme as observed} \\mid H_0)"}
            note="Reject H₀ if p-value < α."
          />
          <SubSection title="Test Statistics — Single Population">
            <Formula
              label="Z-test for μ (σ known)"
              math={"Z = \\frac{\\bar{X} - \\mu_0}{\\sigma / \\sqrt{n}} \\sim N(0,1) \\text{ under } H_0"}
            />
            <Formula
              label="t-test for μ (σ unknown)"
              math={"T = \\frac{\\bar{X} - \\mu_0}{S / \\sqrt{n}} \\sim t(n-1) \\text{ under } H_0"}
              note="Requires normal population or large n (CLT)."
            />
            <Formula
              label="Chi-square test for σ²"
              math={"\\chi^2 = \\frac{(n-1)S^2}{\\sigma_0^2} \\sim \\chi^2(n-1) \\text{ under } H_0"}
              note="Requires normal population."
            />
            <Formula
              label="Z-test for proportion p"
              math={"Z = \\frac{\\hat{p} - p_0}{\\sqrt{p_0(1-p_0)/n}} \\sim N(0,1) \\text{ under } H_0"}
            />
          </SubSection>
          <SubSection title="Power Computation">
            <Formula
              label="Power of Z-test (right-tailed)"
              math={"\\text{Power}(\\mu_1) = P\\!\\left(Z > z_{\\alpha} - \\frac{\\mu_1 - \\mu_0}{\\sigma/\\sqrt{n}}\\right)"}
              note="Shift the critical value to the true distribution."
            />
            <Formula
              label="Type II error of Z-test (right-tailed)"
              math={"\\beta(\\mu_1) = \\Phi\\!\\left(z_{\\alpha} - \\frac{\\mu_1 - \\mu_0}{\\sigma/\\sqrt{n}}\\right)"}
            />
          </SubSection>
        </Section>

        {/* ─── TOPIC 11: Single Population ─── */}
        <Section id="single-pop" num={11} title="Single Population Hypothesis Tests">
          <SubSection title="Critical Regions">
            <Formula
              label="Right-tailed test"
              math={"H_1: \\theta > \\theta_0 \\implies \\text{reject if } T > t_{\\alpha}"}
            />
            <Formula
              label="Left-tailed test"
              math={"H_1: \\theta < \\theta_0 \\implies \\text{reject if } T < -t_{\\alpha}"}
            />
            <Formula
              label="Two-tailed test"
              math={"H_1: \\theta \\ne \\theta_0 \\implies \\text{reject if } |T| > t_{\\alpha/2}"}
            />
          </SubSection>
          <SubSection title="Hypothesis Test Step-by-Step">
            <div className="fs-note">
              <p><strong>Six-step procedure for every hypothesis test:</strong></p>
              <ol className="fs-steps">
                <li>State <M t={"H_0"} /> and <M t={"H_1"} /></li>
                <li>Choose test statistic and state its distribution under <M t={"H_0"} /></li>
                <li>State assumptions (normality, independence, σ known/unknown)</li>
                <li>Determine critical region at level <M t={"\\alpha"} /></li>
                <li>Compute observed test statistic from sample data</li>
                <li>Conclude: reject or fail to reject <M t={"H_0"} /></li>
              </ol>
            </div>
          </SubSection>
        </Section>

        {/* ─── TOPIC 12: Two Populations ─── */}
        <Section id="two-pop" num={12} title="Two Population Tests">
          <SubSection title="Difference of Means">
            <Formula
              label="Z-test for μ_X − μ_Y (σ's known)"
              math={"Z = \\frac{\\bar{X} - \\bar{Y} - \\Delta_0}{\\sqrt{\\frac{\\sigma_X^2}{n_X} + \\frac{\\sigma_Y^2}{n_Y}}} \\sim N(0,1) \\text{ under } H_0"}
            />
            <Formula
              label="CI for μ_X − μ_Y (σ's known)"
              math={"\\bar{X} - \\bar{Y} \\pm z_{\\alpha/2}\\sqrt{\\frac{\\sigma_X^2}{n_X} + \\frac{\\sigma_Y^2}{n_Y}}"}
              given
            />
            <Formula
              label="Pooled t-test for μ_X − μ_Y"
              math={"T = \\frac{\\bar{X} - \\bar{Y} - \\Delta_0}{\\sqrt{S_p^2\\left(\\frac{1}{n_X}+\\frac{1}{n_Y}\\right)}} \\sim t(n_X+n_Y-2) \\text{ under } H_0"}
            />
            <Formula
              label="CI for μ_X − μ_Y (σ's unknown, equal)"
              math={"\\bar{X} - \\bar{Y} \\pm t_{n_X+n_Y-2;\\,\\alpha/2}\\sqrt{S_p^2\\left(\\frac{1}{n_X}+\\frac{1}{n_Y}\\right)}"}
              given
            />
            <Formula
              label="Pooled variance"
              math={"S_p^2 = \\frac{(n_X-1)S_X^2 + (n_Y-1)S_Y^2}{n_X + n_Y - 2}"}
              given
            />
            <Formula
              label="CI for μ_X − μ_Y (Welch's, σ's unknown, unequal)"
              math={"\\bar{X} - \\bar{Y} \\pm t_{\\nu;\\,\\alpha/2}\\sqrt{\\frac{S_X^2}{n_X}+\\frac{S_Y^2}{n_Y}}"}
              given
            />
            <Formula
              label="Welch's degrees of freedom"
              math={"\\nu = \\frac{\\left(\\frac{S_X^2}{n_X}+\\frac{S_Y^2}{n_Y}\\right)^2}{\\frac{(S_X^2/n_X)^2}{n_X-1}+\\frac{(S_Y^2/n_Y)^2}{n_Y-1}}"}
              given
            />
          </SubSection>
          <SubSection title="Paired Samples">
            <Formula
              label="Paired t-test"
              math={"T = \\frac{\\bar{D} - \\Delta_0}{S_D / \\sqrt{n}} \\sim t(n-1), \\quad D_i = X_i - Y_i"}
              note="Reduces to a single-sample t-test on the differences D_i."
            />
            <Formula
              label="CI for μ_D (paired)"
              math={"\\bar{D} \\pm t_{n-1;\\,\\alpha/2} \\cdot \\frac{S_D}{\\sqrt{n}}"}
            />
          </SubSection>
          <SubSection title="Ratio of Variances">
            <Formula
              label="CI for σ²_X / σ²_Y"
              math={"\\left(\\frac{S_X^2}{S_Y^2}\\cdot\\frac{1}{F_{n_X-1,n_Y-1;\\,\\alpha/2}},\\;\\; \\frac{S_X^2}{S_Y^2}\\cdot F_{n_Y-1,n_X-1;\\,\\alpha/2}\\right)"}
              given
            />
            <Formula
              label="F-test for equal variances"
              math={"F = \\frac{S_X^2}{S_Y^2} \\sim F(n_X-1,\\, n_Y-1) \\text{ under } H_0: \\sigma_X^2 = \\sigma_Y^2"}
            />
          </SubSection>
          <SubSection title="Difference of Proportions">
            <Formula
              label="CI for p_X − p_Y"
              math={"\\hat{p}_X - \\hat{p}_Y \\pm z_{\\alpha/2}\\sqrt{\\frac{\\hat{p}_X(1-\\hat{p}_X)}{n_X}+\\frac{\\hat{p}_Y(1-\\hat{p}_Y)}{n_Y}}"}
              given
            />
            <Formula
              label="Z-test for p_X − p_Y = 0"
              math={"Z = \\frac{\\hat{p}_X - \\hat{p}_Y}{\\sqrt{\\hat{p}(1-\\hat{p})\\left(\\frac{1}{n_X}+\\frac{1}{n_Y}\\right)}}, \\quad \\hat{p} = \\frac{n_X \\hat{p}_X + n_Y \\hat{p}_Y}{n_X + n_Y}"}
              note="Under H₀: p_X = p_Y, use pooled proportion p̂."
            />
            <Formula
              label="Z-test for p_X − p_Y = Δ₀"
              math={"Z = \\frac{\\hat{p}_X - \\hat{p}_Y - \\Delta_0}{\\sqrt{\\frac{\\hat{p}_X(1-\\hat{p}_X)}{n_X}+\\frac{\\hat{p}_Y(1-\\hat{p}_Y)}{n_Y}}}"}
              note="When testing H₀: p_X − p_Y = Δ₀ (nonzero), use individual p̂'s."
            />
          </SubSection>
        </Section>

        {/* ─── TOPIC 13: Common Distributions ─── */}
        <Section id="distributions" num={13} title="Common Distributions Table">
          <p className="sg-prose" style={{ marginBottom: 12 }}>
            The table of common distributions is <strong>provided during the exam</strong> as a separate document.
            You should know the parameters, mean, variance, and MGF for each distribution.
          </p>
          <SubSection title="Discrete Distributions">
            <Formula
              label="Binomial(n, p)"
              math={"P(X=x) = \\binom{n}{x}p^x(1-p)^{n-x}, \\quad E[X]=np, \\quad \\operatorname{Var}(X)=np(1-p), \\quad M(t)=(pe^t+q)^n"}
              given
            />
            <Formula
              label="Negative Binomial(r, p)"
              math={"P(X=x)=\\binom{x-1}{r-1}p^r(1-p)^{x-r}, \\quad E[X]=\\frac{r}{p}, \\quad \\operatorname{Var}(X)=\\frac{r(1-p)}{p^2}"}
              given
            />
            <Formula
              label="Geometric(p)"
              math={"P(X=x)=p(1-p)^{x-1}, \\quad E[X]=\\frac{1}{p}, \\quad \\operatorname{Var}(X)=\\frac{1-p}{p^2}"}
              given
            />
            <Formula
              label="Poisson(λ)"
              math={"P(X=x)=e^{-\\lambda}\\frac{\\lambda^x}{x!}, \\quad E[X]=\\lambda, \\quad \\operatorname{Var}(X)=\\lambda, \\quad M(t)=e^{\\lambda(e^t-1)}"}
              given
            />
            <Formula
              label="Hypergeometric(n, M, N)"
              math={"P(X=x)=\\frac{\\binom{M}{x}\\binom{N-M}{n-x}}{\\binom{N}{n}}, \\quad E[X]=\\frac{nM}{N}, \\quad \\operatorname{Var}(X)=n\\frac{M}{N}\\frac{N-M}{N}\\frac{N-n}{N-1}"}
              given
            />
          </SubSection>
          <SubSection title="Continuous Distributions">
            <Formula
              label="Uniform(a, b)"
              math={"f(x)=\\frac{1}{b-a}, \\quad E[X]=\\frac{a+b}{2}, \\quad \\operatorname{Var}(X)=\\frac{(b-a)^2}{12}"}
              given
            />
            <Formula
              label="Normal(μ, σ²)"
              math={"f(x)=\\frac{1}{\\sigma\\sqrt{2\\pi}}e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}, \\quad M(t)=e^{\\mu t + \\sigma^2 t^2/2}"}
              given
            />
            <Formula
              label="Exponential(λ)"
              math={"f(x)=\\lambda e^{-\\lambda x}, \\quad E[X]=\\frac{1}{\\lambda}, \\quad \\operatorname{Var}(X)=\\frac{1}{\\lambda^2}, \\quad M(t)=\\frac{\\lambda}{\\lambda-t}"}
              given
            />
            <Formula
              label="Gamma(θ, r)"
              math={"f(x)=\\frac{x^{r-1}e^{-x/\\theta}}{\\theta^r \\Gamma(r)}, \\quad E[X]=r\\theta, \\quad \\operatorname{Var}(X)=r\\theta^2, \\quad M(t)=\\left(\\frac{1}{1-\\theta t}\\right)^r"}
              given
            />
            <Formula
              label="Chi-square(ν)"
              math={"\\text{Gamma}(2,\\, \\nu/2): \\quad E[X]=\\nu, \\quad \\operatorname{Var}(X)=2\\nu, \\quad M(t)=(1-2t)^{-\\nu/2}"}
              given
            />
            <Formula
              label="Standard Normal → Chi-square"
              math={"Z \\sim N(0,1) \\implies Z^2 \\sim \\chi^2(1)"}
              note="Sum of n independent Z² ~ χ²(n). Fundamental building block."
            />
          </SubSection>
        </Section>
      </main>
    </div>
  )
}
