import MathBlock from '../components/MathBlock'
import Definition from '../components/Definition'
import Theorem from '../components/Theorem'
import Proof from '../components/Proof'
import Example from '../components/Example'
import Note from '../components/Note'
import WorkedQuestion from '../components/WorkedQuestion'

export default function Topic6MGFBivariate() {
  return (
    <>
      <p>
        In PTS1 you met the <strong>moment generating function</strong> (MGF) of a single
        random variable: <MathBlock math={"M_X(t) = E[e^{tX}]"} />. Its derivatives at{' '}
        <MathBlock math={"t=0"} /> give you <MathBlock math={"E[X^k]"} />, and two
        distributions are the same if and only if they have the same MGF (the uniqueness
        property). The <strong>joint MGF</strong> extends this idea to multiple random variables,
        encoding their entire joint distribution in one function. From it you can extract
        joint moments like <MathBlock math={"E[X^r Y^s]"} />, recover marginal MGFs,
        test for independence, and identify joint distributions via uniqueness.
      </p>

      <p>
        The second half of this topic introduces the <strong>bivariate normal distribution</strong> (BVN),
        the single most important parametric family for two continuous random variables.
        It is fully determined by five parameters:{' '}
        <MathBlock math={"\\mu_X, \\mu_Y, \\sigma_X^2, \\sigma_Y^2, \\rho"} />, and has the
        special property that <MathBlock math={"\\rho = 0"} /> is both necessary <em>and</em>{' '}
        sufficient for independence — unlike the general case where zero correlation does
        not guarantee independence.
      </p>

      {/* ════════════════════════════════════════════
          PART 1 — JOINT MGFs (§5.6)
          ════════════════════════════════════════════ */}
      <h3>§5.6 — Joint Moment Generating Functions</h3>

      <h4>Recap: Univariate MGF (PTS1)</h4>
      <p>
        For a single random variable <MathBlock math={"X"} />, the MGF is
      </p>
      <MathBlock math={"M_X(t) = E[e^{tX}]"} display />
      <p>
        provided this expectation exists for <MathBlock math={"t"} /> in some open interval
        around 0. Two key facts:
      </p>
      <ul>
        <li>
          <strong>Moment extraction:</strong>{' '}
          <MathBlock math={"M_X^{(k)}(0) = E[X^k]"} /> — the <MathBlock math={"k"} />-th
          derivative at <MathBlock math={"t=0"} /> gives the <MathBlock math={"k"} />-th moment.
        </li>
        <li>
          <strong>Uniqueness:</strong> If <MathBlock math={"M_X(t) = M_Y(t)"} /> for
          all <MathBlock math={"t"} /> near 0, then <MathBlock math={"X"} /> and{' '}
          <MathBlock math={"Y"} /> have the same distribution.
        </li>
      </ul>

      <Note>
        For example, <MathBlock math={"X \\sim \\text{Exp}(\\lambda)"} /> has{' '}
        <MathBlock math={"M_X(t) = \\frac{\\lambda}{\\lambda - t}"} /> for{' '}
        <MathBlock math={"t < \\lambda"} />.
        And <MathBlock math={"X \\sim N(\\mu, \\sigma^2)"} /> has{' '}
        <MathBlock math={"M_X(t) = e^{\\mu t + \\frac{1}{2}\\sigma^2 t^2}"} />.
      </Note>

      {/* ── Definition 5.20 ── */}
      <Definition id="def-joint-mgf" title="Definition 5.20 — Joint Moment Generating Function">
        <p>
          The <strong>joint moment generating function</strong> of the random
          vector <MathBlock math={"\\mathbf{X} = (X_1, \\ldots, X_k)"} /> is
        </p>
        <MathBlock
          math={"M_{X_1, \\ldots, X_k}(t_1, \\ldots, t_k) = E\\!\\left[\\exp\\!\\left(\\sum_{i=1}^{k} t_i X_i\\right)\\right]"}
          display
        />
        <p>
          provided this expectation exists for all <MathBlock math={"t_i"} /> in some open
          interval around 0, for every <MathBlock math={"i"} />.
        </p>
        <p>
          For the bivariate case <MathBlock math={"(X, Y)"} />, this simplifies to
        </p>
        <MathBlock
          math={"M_{X,Y}(t, u) = E\\!\\left[e^{tX + uY}\\right]"}
          display
        />
        <p>
          <strong>Why it works:</strong> The exponential <MathBlock math={"e^{tX+uY}"} />{' '}
          mixes up all powers of <MathBlock math={"X"} /> and <MathBlock math={"Y"} />{' '}
          (via its Taylor expansion), so by differentiating with respect to{' '}
          <MathBlock math={"t"} /> and <MathBlock math={"u"} /> and then setting them to
          zero, you can isolate any particular joint moment.
        </p>
      </Definition>

      {/* ── Four Properties ── */}
      <h4>Four Properties of the Joint MGF</h4>

      <Theorem id="thm-jmgf-properties" title="Properties of the Joint MGF">
        <p>Let <MathBlock math={"M_{X,Y}(t,u)"} /> be the joint MGF of <MathBlock math={"(X,Y)"} />.</p>
        <p>
          <strong>Property 1 — Moment extraction:</strong>
        </p>
        <MathBlock
          math={"E[X^r Y^s] = \\frac{\\partial^{r+s}}{\\partial t^r \\, \\partial u^s} M_{X,Y}(t,u) \\bigg|_{t=u=0}"}
          display
        />
        <p>
          In particular, <MathBlock math={"E[XY] = \\frac{\\partial^2}{\\partial t \\, \\partial u} M_{X,Y}(t,u)\\big|_{t=u=0}"} />,
          which is key for computing covariance via{' '}
          <MathBlock math={"\\text{Cov}(X,Y) = E[XY] - E[X]E[Y]"} />.
        </p>

        <p>
          <strong>Property 2 — Recovering marginal MGFs:</strong>
        </p>
        <MathBlock
          math={"M_X(t) = M_{X,Y}(t, 0) \\qquad \\text{and} \\qquad M_Y(u) = M_{X,Y}(0, u)"}
          display
        />
        <p>
          <strong>Why:</strong> Setting <MathBlock math={"u=0"} /> in{' '}
          <MathBlock math={"E[e^{tX+uY}]"} /> gives <MathBlock math={"E[e^{tX} \\cdot e^{0}] = E[e^{tX}] = M_X(t)"} />.
          The same logic applies to <MathBlock math={"t=0"} />.
        </p>

        <p>
          <strong>Property 3 — Uniqueness:</strong>
        </p>
        <MathBlock
          math={"(X_1, Y_1) \\sim (X_2, Y_2) \\iff M_{X_1,Y_1}(t,s) = M_{X_2,Y_2}(t,s) \\text{ for all } t,s \\text{ near } 0"}
          display
        />
        <p>
          Two random vectors have the same joint distribution if and only if their joint
          MGFs are identical.
        </p>

        <p>
          <strong>Property 4 — Independence test via factorisation:</strong>
        </p>
        <MathBlock
          math={"X \\text{ and } Y \\text{ are independent} \\iff M_{X,Y}(t,u) = M_X(t) \\cdot M_Y(u)"}
          display
        />
        <p>
          <strong>Why:</strong> If <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> are
          independent, then <MathBlock math={"e^{tX}"} /> and <MathBlock math={"e^{uY}"} />{' '}
          are also independent, so{' '}
          <MathBlock math={"E[e^{tX+uY}] = E[e^{tX}] \\cdot E[e^{uY}]"} />. The converse
          follows from uniqueness: if the joint MGF factors, the joint distribution
          must equal the product of the marginals.
        </p>
      </Theorem>

      <Note>
        Property 4 is extremely useful. Instead of checking the factorisation condition{' '}
        <MathBlock math={"f_{X,Y}(x,y) = f_X(x) f_Y(y)"} /> for <em>all</em>{' '}
        <MathBlock math={"(x,y)"} />, you can just compute the joint MGF and see whether
        it factors into a function of <MathBlock math={"t"} /> alone times a function
        of <MathBlock math={"u"} /> alone.
      </Note>

      {/* ── Example 5.43: Multinomial ── */}
      <Example title="Example 5.43 — Joint MGF of the Multinomial Distribution">
        <p>
          Let <MathBlock math={"(X_1, X_2) \\sim \\text{MULT}(n, p_1, p_2)"} />, meaning{' '}
          <MathBlock math={"X_1"} /> counts outcomes of type 1,{' '}
          <MathBlock math={"X_2"} /> counts type 2, and{' '}
          <MathBlock math={"X_3 = n - X_1 - X_2"} /> counts "the rest" in{' '}
          <MathBlock math={"n"} /> independent trials with probabilities{' '}
          <MathBlock math={"p_1, p_2, p_3 = 1-p_1-p_2"} />.
        </p>
        <p>The joint pmf is:</p>
        <MathBlock
          math={"f_{X_1,X_2}(x_1, x_2) = \\frac{n!}{x_1! \\, x_2! \\, (n-x_1-x_2)!} \\, p_1^{x_1} p_2^{x_2} p_3^{n-x_1-x_2}"}
          display
        />
        <p><strong>Finding the joint MGF:</strong></p>
        <MathBlock
          math={"M_{X_1,X_2}(t,u) = E[e^{tX_1 + uX_2}] = \\sum_{x_1} \\sum_{x_2} e^{tx_1 + ux_2} \\cdot f_{X_1,X_2}(x_1, x_2)"}
          display
        />
        <p>
          Substitute the pmf and collect terms:
        </p>
        <MathBlock
          math={"= \\sum_{x_1=0}^{n} \\sum_{x_2=0}^{n-x_1} \\frac{n!}{x_1! \\, x_2! \\, x_3!} (p_1 e^t)^{x_1} (p_2 e^u)^{x_2} p_3^{x_3}"}
          display
        />
        <p>
          The key trick: recognise the <strong>multinomial theorem</strong>,{' '}
          <MathBlock math={"(a_1 + a_2 + \\cdots + a_k)^n = \\sum_{n_1+\\cdots+n_k=n} \\frac{n!}{n_1! \\cdots n_k!} a_1^{n_1} \\cdots a_k^{n_k}"} />.
          With <MathBlock math={"a_1 = p_1 e^t, \\; a_2 = p_2 e^u, \\; a_3 = p_3"} />, the
          entire double sum collapses:
        </p>
        <MathBlock
          math={"\\boxed{M_{X_1,X_2}(t,u) = (p_1 e^t + p_2 e^u + p_3)^n}"}
          display
        />
        <p>where <MathBlock math={"p_3 = 1 - p_1 - p_2"} />.</p>
      </Example>

      {/* ── Covariance from the Multinomial MGF ── */}
      <Example title="Example 5.43 (continued) — Computing Cov via the Joint MGF">
        <p>
          <strong>Goal:</strong> Use the joint MGF{' '}
          <MathBlock math={"M_{X_1,X_2}(t,u) = (p_1 e^t + p_2 e^u + p_3)^n"} /> to
          find <MathBlock math={"\\text{Cov}(X_1, X_2)"} />.
        </p>

        <p><strong>Step 1 — Find <MathBlock math={"E[X_1 X_2]"} /> using Property 1.</strong></p>
        <p>Differentiate once w.r.t. <MathBlock math={"u"} />:</p>
        <MathBlock
          math={"\\frac{\\partial}{\\partial u} M = n(p_1 e^t + p_2 e^u + p_3)^{n-1} \\cdot p_2 e^u"}
          display
        />
        <p>Now differentiate w.r.t. <MathBlock math={"t"} />:</p>
        <MathBlock
          math={"\\frac{\\partial^2}{\\partial t \\, \\partial u} M = n(n-1)(p_1 e^t + p_2 e^u + p_3)^{n-2} \\cdot p_2 e^u \\cdot p_1 e^t"}
          display
        />
        <p>Set <MathBlock math={"t = u = 0"} />. Since <MathBlock math={"e^0 = 1"} /> and <MathBlock math={"p_1 + p_2 + p_3 = 1"} />:</p>
        <MathBlock
          math={"E[X_1 X_2] = n(n-1) \\cdot 1^{n-2} \\cdot p_1 p_2 = n(n-1) p_1 p_2"}
          display
        />

        <p><strong>Step 2 — Find the means.</strong></p>
        <p>
          By Property 2,{' '}
          <MathBlock math={"M_{X_2}(u) = M_{X_1,X_2}(0, u)"} />. Taking{' '}
          <MathBlock math={"\\frac{\\partial}{\\partial u} M_{X_1,X_2}(0, u)\\big|_{u=0}"} />{' '}
          gives <MathBlock math={"E[X_2] = n p_2"} /> (recognise a Binomial marginal). By
          symmetry, <MathBlock math={"E[X_1] = n p_1"} />.
        </p>

        <p><strong>Step 3 — Covariance.</strong></p>
        <MathBlock
          math={"\\text{Cov}(X_1, X_2) = E[X_1 X_2] - E[X_1] E[X_2] = n(n-1)p_1 p_2 - n p_1 \\cdot n p_2"}
          display
        />
        <MathBlock
          math={"= n^2 p_1 p_2 - n p_1 p_2 - n^2 p_1 p_2 = \\boxed{-n p_1 p_2}"}
          display
        />
        <p>
          The covariance is <strong>always negative</strong> (since{' '}
          <MathBlock math={"n, p_1, p_2 > 0"} />). This makes intuitive sense: in a
          multinomial experiment, if more trials land in category 1, fewer are available
          for category 2.
        </p>
      </Example>

      <Note>
        The fact that <MathBlock math={"\\text{Cov}(X_1, X_2) = -np_1 p_2"} /> also tells
        us the marginals <MathBlock math={"X_1 \\sim \\text{Bin}(n, p_1)"} /> and{' '}
        <MathBlock math={"X_2 \\sim \\text{Bin}(n, p_2)"} /> are <strong>not</strong>{' '}
        independent (they can't be — they share the same <MathBlock math={"n"} /> trials).
        You can also confirm this via Property 4: the joint MGF{' '}
        <MathBlock math={"(p_1 e^t + p_2 e^u + p_3)^n"} /> does <em>not</em> factor as a
        function of <MathBlock math={"t"} /> alone times a function of{' '}
        <MathBlock math={"u"} /> alone.
      </Note>

      {/* ── Example 5.44: Continuous triangle ── */}
      <Example title="Example 5.44 — Joint MGF from a Continuous pdf">
        <p>
          Consider <MathBlock math={"f_{X,Y}(x,y) = 2"} /> for{' '}
          <MathBlock math={"0 < x < y < 1"} /> (a triangular support region — the upper
          triangle of the unit square).
        </p>

        <p><strong>Step 1:</strong> Write out the definition:</p>
        <MathBlock
          math={"M_{X,Y}(t,u) = E[e^{tX+uY}] = \\int_0^1 \\int_0^y 2 \\, e^{tx + uy} \\, dx \\, dy"}
          display
        />
        <p>
          The integration order is important: for a fixed <MathBlock math={"y"} />,{' '}
          <MathBlock math={"x"} /> runs from 0 to <MathBlock math={"y"} />, and then{' '}
          <MathBlock math={"y"} /> runs from 0 to 1.
        </p>

        <p><strong>Step 2:</strong> Inner integral (over <MathBlock math={"x"} />):</p>
        <MathBlock
          math={"\\int_0^y 2 \\, e^{tx+uy} \\, dx = 2 e^{uy} \\cdot \\frac{1}{t}\\left[e^{tx}\\right]_0^y = \\frac{2}{t}\\left(e^{(t+u)y} - e^{uy}\\right)"}
          display
        />

        <p><strong>Step 3:</strong> Outer integral (over <MathBlock math={"y"} />):</p>
        <MathBlock
          math={"M_{X,Y}(t,u) = \\frac{2}{t} \\left[\\frac{1}{t+u} e^{(t+u)y} - \\frac{1}{u} e^{uy}\\right]_0^1"}
          display
        />
        <MathBlock
          math={"= \\frac{2}{t}\\!\\left(\\frac{e^{t+u}}{t+u} - \\frac{e^u}{u} - \\frac{1}{t+u} + \\frac{1}{u}\\right)"}
          display
        />
        <p>
          This doesn't simplify to a "nice" closed form, which is typical for continuous
          distributions with non-rectangular support. The important thing is the
          <em> method</em>: substitute the pdf, set up the integral with correct limits, and
          integrate step by step.
        </p>
      </Example>

      {/* ── Homework Exercise 5.71 ── */}
      <Example title="Exercise 5.71 — Independence Check via Joint MGF">
        <p>
          Suppose <MathBlock math={"f(x,y) = \\frac{1}{10}"} /> on{' '}
          <MathBlock math={"[0,5] \\times [1,3]"} /> (a uniform distribution on a
          rectangle).
        </p>
        <p><strong>Joint MGF:</strong> Since <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> are independent (rectangular support, constant pdf), we can compute each marginal MGF separately:</p>
        <MathBlock
          math={"M_X(t) = \\int_0^5 e^{tx} \\cdot \\tfrac{1}{5} \\, dx = \\frac{e^{5t}-1}{5t}, \\qquad M_Y(u) = \\int_1^3 e^{uy} \\cdot \\tfrac{1}{2} \\, dy = \\frac{e^{3u}-e^{u}}{2u}"}
          display
        />
        <p>
          And indeed the joint MGF factors:{' '}
          <MathBlock math={"M_{X,Y}(t,u) = M_X(t) \\cdot M_Y(u) = \\frac{(e^{5t}-1)(e^{3u}-e^u)}{10tu}"} />,
          confirming independence.
        </p>
      </Example>

      <Example title="Exercise 5.72 — Joint MGF for f(x,y) = 2, 0 < x < y < 1">
        <p>
          This is the same triangle from Example 5.44. The homework solution computes{' '}
          <MathBlock math={"M_{X,Y}(t,u)"} /> step by step:
        </p>
        <MathBlock
          math={"M_{X,Y}(t,u) = 2\\int_0^\\infty\\!\\left\\{\\int_x^\\infty e^{uy-y}\\,dy\\right\\}e^{tx-x}\\,dx"}
          display
        />
        <p>
          With the specific pdf <MathBlock math={"f_{X,Y}(x,y)=2"} /> on the triangle{' '}
          <MathBlock math={"0<x<y<1"} />, we can also express this as:
        </p>
        <MathBlock
          math={"M_{X,Y}(t,u) = \\frac{2}{(2-t-u)(1-u)} \\quad \\text{for } u < 1, \\; t+u < 2"}
          display
        />
        <p>
          <strong>Checking independence:</strong> This does <em>not</em> factor as{' '}
          <MathBlock math={"g(t) \\cdot h(u)"} /> because of the{' '}
          <MathBlock math={"(2-t-u)"} /> term mixing <MathBlock math={"t"} /> and{' '}
          <MathBlock math={"u"} />. So <MathBlock math={"X"} /> and{' '}
          <MathBlock math={"Y"} /> are <strong>not independent</strong> (which makes sense —
          the constraint <MathBlock math={"x < y"} /> links them).
        </p>
      </Example>

      <h4>Step-by-Step Recipe: Joint MGF Problems</h4>
      <div className="recipe-box">
        <ol>
          <li>
            <strong>Write down the definition:</strong>{' '}
            <MathBlock math={"M_{X,Y}(t,u) = E[e^{tX+uY}]"} />.
          </li>
          <li>
            <strong>Substitute:</strong> Replace the expectation with a sum (discrete) or
            integral (continuous) weighted by the joint pdf/pmf.
          </li>
          <li>
            <strong>Evaluate:</strong> For discrete, try to recognise a known power series
            (multinomial theorem, binomial theorem, geometric series). For continuous,
            integrate the inner variable first, then the outer.
          </li>
          <li>
            <strong>Extract moments:</strong> Differentiate w.r.t.{' '}
            <MathBlock math={"t"} /> and/or <MathBlock math={"u"} />, then set both to 0.
          </li>
          <li>
            <strong>Check independence:</strong> Does the result factor as{' '}
            <MathBlock math={"g(t) \\cdot h(u)"} />? If yes → independent. If any term
            mixes <MathBlock math={"t"} /> and <MathBlock math={"u"} /> → not independent.
          </li>
        </ol>
      </div>

      {/* ════════════════════════════════════════════
          PART 2 — BIVARIATE NORMAL (§5.7)
          ════════════════════════════════════════════ */}
      <h3>§5.7 — The Bivariate Normal Distribution</h3>

      <p>
        The bivariate normal (BVN) is the natural two-dimensional extension of the normal
        distribution. It models two continuous variables whose joint behaviour is completely
        described by five parameters: two means, two variances, and one correlation
        coefficient. It appears everywhere — in finance (asset returns), in physics
        (measurement errors), and in statistics (the foundation of linear regression).
      </p>

      {/* ── Definition 5.21 ── */}
      <Definition id="def-bvn" title="Definition 5.21 — Bivariate Normal Distribution">
        <p>
          The two-dimensional random variable <MathBlock math={"(X, Y)"} /> has a{' '}
          <strong>bivariate normal distribution</strong> with parameters{' '}
          <MathBlock math={"\\mu_X, \\mu_Y, \\sigma_X^2, \\sigma_Y^2, \\rho"} />,
          written{' '}
          <MathBlock math={"(X,Y) \\sim \\text{BVN}(\\mu_X, \\mu_Y, \\sigma_X^2, \\sigma_Y^2, \\rho)"} />,
          if the joint pdf is:
        </p>
        <MathBlock
          math={"f_{X,Y}(x,y) = \\frac{1}{2\\pi \\sigma_X \\sigma_Y \\sqrt{1-\\rho^2}} \\, \\exp\\!\\left[-\\frac{1}{2(1-\\rho^2)}\\!\\left(\\left(\\frac{x-\\mu_X}{\\sigma_X}\\right)^{\\!2} - 2\\rho\\!\\left(\\frac{x-\\mu_X}{\\sigma_X}\\right)\\!\\left(\\frac{y-\\mu_Y}{\\sigma_Y}\\right) + \\left(\\frac{y-\\mu_Y}{\\sigma_Y}\\right)^{\\!2}\\right)\\right]"}
          display
        />
        <p>
          where <MathBlock math={"\\sigma_X > 0"} />,{' '}
          <MathBlock math={"\\sigma_Y > 0"} />, and{' '}
          <MathBlock math={"-1 \\leq \\rho \\leq 1"} />.
        </p>
      </Definition>

      <h4>Understanding the Five Parameters</h4>
      <p>
        The formula looks intimidating, but each piece has a clear role. Think of it as the
        univariate normal pdf <MathBlock math={"\\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}"} />{' '}
        extended to two dimensions:
      </p>
      <ul>
        <li>
          <MathBlock math={"\\mu_X, \\mu_Y"} /> — the centre of the distribution (the peak
          of the bell surface).
        </li>
        <li>
          <MathBlock math={"\\sigma_X^2, \\sigma_Y^2"} /> — how spread out the distribution
          is along each axis. Different values stretch the bell into an ellipse.
        </li>
        <li>
          <MathBlock math={"\\rho"} /> — the <strong>correlation coefficient</strong>. It
          controls the <em>tilt</em> of the elliptical contours:
          <ul>
            <li><MathBlock math={"\\rho = 0"} />: circular (or axis-aligned elliptical) contours — no linear dependence.</li>
            <li><MathBlock math={"\\rho > 0"} />: contours tilt toward the positive diagonal — as <MathBlock math={"X"} /> increases, <MathBlock math={"Y"} /> tends to increase.</li>
            <li><MathBlock math={"\\rho < 0"} />: contours tilt toward the negative diagonal — as <MathBlock math={"X"} /> increases, <MathBlock math={"Y"} /> tends to decrease.</li>
            <li><MathBlock math={"\\rho \\to \\pm 1"} />: the ellipse collapses toward a line — perfect linear relationship.</li>
          </ul>
        </li>
      </ul>

      <Note>
        The exponent in the BVN pdf is a <strong>quadratic form</strong>. The expression
        inside the brackets,{' '}
        <MathBlock math={"\\left(\\frac{x-\\mu_X}{\\sigma_X}\\right)^2 - 2\\rho\\left(\\frac{x-\\mu_X}{\\sigma_X}\\right)\\left(\\frac{y-\\mu_Y}{\\sigma_Y}\\right) + \\left(\\frac{y-\\mu_Y}{\\sigma_Y}\\right)^2"} />,
        equals a constant along each elliptical contour of the surface. The normalising
        constant <MathBlock math={"\\frac{1}{2\\pi \\sigma_X \\sigma_Y \\sqrt{1-\\rho^2}}"} />{' '}
        ensures the total volume under the surface is 1.
      </Note>

      {/* ── Theorem 5.26 ── */}
      <Theorem id="thm-bvn-marginals" title="Theorem 5.26 — Marginals of the BVN">
        <p>
          If <MathBlock math={"(X,Y) \\sim \\text{BVN}(\\mu_X, \\mu_Y, \\sigma_X^2, \\sigma_Y^2, \\rho)"} />,
          then the marginal distributions are:
        </p>
        <MathBlock
          math={"X \\sim N(\\mu_X, \\sigma_X^2) \\qquad \\text{and} \\qquad Y \\sim N(\\mu_Y, \\sigma_Y^2)"}
          display
        />
        <p>
          So the parameters <MathBlock math={"\\mu_X, \\sigma_X^2"} /> and{' '}
          <MathBlock math={"\\mu_Y, \\sigma_Y^2"} /> are indeed the means and
          variances of the marginal distributions — exactly what the notation suggests.
        </p>
      </Theorem>

      <Note>
        <strong>Important warning:</strong> The converse is <em>not</em> true. Having{' '}
        <MathBlock math={"X \\sim N(\\mu_X, \\sigma_X^2)"} /> and{' '}
        <MathBlock math={"Y \\sim N(\\mu_Y, \\sigma_Y^2)"} /> does <em>not</em>{' '}
        guarantee that <MathBlock math={"(X,Y)"} /> is bivariate normal. You also need the
        specific structure of the joint pdf (including the cross-term with{' '}
        <MathBlock math={"\\rho"} />). There exist pairs of marginally normal random
        variables whose joint distribution is not bivariate normal.
      </Note>

      {/* ── Theorem 5.27: Conditional ── */}
      <Theorem id="thm-bvn-conditional" title="Theorem 5.27 — Conditional Distribution in the BVN">
        <p>
          If <MathBlock math={"(X,Y) \\sim \\text{BVN}(\\mu_X, \\mu_Y, \\sigma_X^2, \\sigma_Y^2, \\rho)"} />,
          then the conditional distribution of <MathBlock math={"Y"} /> given{' '}
          <MathBlock math={"X = x"} /> is:
        </p>
        <MathBlock
          math={"Y \\mid X = x \\;\\sim\\; N\\!\\left(\\mu_Y + \\rho \\frac{\\sigma_Y}{\\sigma_X}(x - \\mu_X), \\;\\; \\sigma_Y^2(1-\\rho^2)\\right)"}
          display
        />
      </Theorem>

      <p>
        This is one of the most important results in the course. Let's unpack every piece:
      </p>
      <ul>
        <li>
          <strong>The conditional distribution is normal.</strong> Even after conditioning on
          a specific value of <MathBlock math={"X"} />, the distribution of{' '}
          <MathBlock math={"Y"} /> remains normal (just with shifted mean and reduced
          variance).
        </li>
        <li>
          <strong>Conditional mean:</strong>{' '}
          <MathBlock math={"E[Y \\mid X=x] = \\mu_Y + \\rho \\frac{\\sigma_Y}{\\sigma_X}(x - \\mu_X)"} />.
          This is a <em>linear function</em> of <MathBlock math={"x"} />. When{' '}
          <MathBlock math={"x"} /> is above <MathBlock math={"\\mu_X"} />, the conditional
          mean of <MathBlock math={"Y"} /> shifts away from <MathBlock math={"\\mu_Y"} />{' '}
          in the direction determined by <MathBlock math={"\\rho"} />.
          The coefficient <MathBlock math={"\\rho \\frac{\\sigma_Y}{\\sigma_X}"} /> is
          exactly the <em>regression slope</em> of <MathBlock math={"Y"} /> on{' '}
          <MathBlock math={"X"} />.
        </li>
        <li>
          <strong>Conditional variance:</strong>{' '}
          <MathBlock math={"\\text{Var}(Y \\mid X=x) = \\sigma_Y^2(1-\\rho^2)"} />. This
          does <strong>not depend on <MathBlock math={"x"} /></strong> — no matter which
          value of <MathBlock math={"X"} /> you condition on, the spread of{' '}
          <MathBlock math={"Y"} /> is the same. When <MathBlock math={"|\\rho|"} /> is close
          to 1, the conditional variance is much smaller than the marginal variance{' '}
          <MathBlock math={"\\sigma_Y^2"} />: knowing <MathBlock math={"X"} /> is very
          informative about <MathBlock math={"Y"} />.
        </li>
      </ul>

      <Note>
        By symmetry, <MathBlock math={"X \\mid Y = y \\sim N\\!\\left(\\mu_X + \\rho \\frac{\\sigma_X}{\\sigma_Y}(y - \\mu_Y), \\; \\sigma_X^2(1-\\rho^2)\\right)"} />.
        Just swap the roles of <MathBlock math={"X"} /> and <MathBlock math={"Y"} />.
      </Note>

      {/* ── Theorem 5.28: Joint MGF ── */}
      <Theorem id="thm-bvn-mgf" title="Theorem 5.28 — Joint MGF of the BVN">
        <p>
          If <MathBlock math={"(X,Y) \\sim \\text{BVN}(\\mu_X, \\mu_Y, \\sigma_X^2, \\sigma_Y^2, \\rho)"} />, then:
        </p>
        <MathBlock
          math={"M_{X,Y}(t_1, t_2) = \\exp\\!\\left[\\mu_X t_1 + \\mu_Y t_2 + \\tfrac{1}{2}\\!\\left(\\sigma_X^2 t_1^2 + \\sigma_Y^2 t_2^2 + 2\\rho \\sigma_X \\sigma_Y t_1 t_2\\right)\\right]"}
          display
        />
      </Theorem>

      <p>Let's verify Property 2 (recovering marginal MGFs) from this formula:</p>
      <MathBlock
        math={"M_X(t_1) = M_{X,Y}(t_1, 0) = \\exp\\!\\left[\\mu_X t_1 + \\tfrac{1}{2} \\sigma_X^2 t_1^2\\right]"}
        display
      />
      <p>
        This is exactly the MGF of <MathBlock math={"N(\\mu_X, \\sigma_X^2)"} />, confirming
        Theorem 5.26 via the uniqueness property. The same works for{' '}
        <MathBlock math={"M_Y(t_2) = M_{X,Y}(0, t_2)"} />.
      </p>

      {/* ── Interpretation of ρ ── */}
      <h4>Interpretation of ρ: Correlation Coefficient</h4>

      <Example title="Exercise — Determine ρ_XY from the BVN">
        <p>
          <strong>Claim:</strong> For the BVN, the parameter{' '}
          <MathBlock math={"\\rho"} /> is exactly the correlation
          coefficient <MathBlock math={"\\rho_{XY}"} />.
        </p>
        <p><strong>Proof:</strong></p>
        <p>
          First, use the joint MGF to find <MathBlock math={"E[XY]"} />. From the formula
          sheet or direct computation:
        </p>
        <MathBlock
          math={"E[XY] = \\frac{\\partial^2}{\\partial t_1 \\, \\partial t_2} M_{X,Y}(t_1, t_2)\\bigg|_{t_1=t_2=0} = \\mu_X \\mu_Y + \\rho \\sigma_X \\sigma_Y"}
          display
        />
        <p>Then:</p>
        <MathBlock
          math={"\\text{Cov}(X,Y) = E[XY] - E[X]E[Y] = (\\mu_X \\mu_Y + \\rho \\sigma_X \\sigma_Y) - \\mu_X \\mu_Y = \\rho \\sigma_X \\sigma_Y"}
          display
        />
        <p>Therefore:</p>
        <MathBlock
          math={"\\rho_{XY} = \\frac{\\text{Cov}(X,Y)}{\\sigma_X \\sigma_Y} = \\frac{\\rho \\sigma_X \\sigma_Y}{\\sigma_X \\sigma_Y} = \\rho \\; \\checkmark"}
          display
        />
        <p>
          So in the BVN, the parameter <MathBlock math={"\\rho"} /> has a double role:
          it is both a parameter defining the pdf shape <em>and</em> the actual correlation
          coefficient of <MathBlock math={"X"} /> and <MathBlock math={"Y"} />.
        </p>
      </Example>

      {/* ── Independence ⟺ ρ = 0 ── */}
      <h4>Independence in the BVN</h4>

      <Theorem id="thm-bvn-independence" title="BVN: Independence ⟺ ρ = 0">
        <p>
          <strong>In general:</strong>{' '}
          <MathBlock math={"X, Y \\text{ independent} \\;\\Longrightarrow\\; \\rho_{XY} = 0"} />{' '}
          (always true, for any distribution).
        </p>
        <p>
          <strong>For the BVN specifically:</strong>{' '}
          <MathBlock math={"X, Y \\text{ independent} \\;\\Longleftrightarrow\\; \\rho_{XY} = 0"} />{' '}
          (the reverse implication also holds!).
        </p>
      </Theorem>

      <Proof title="Proof that ρ = 0 ⟹ independence in the BVN">
        <p>
          Let <MathBlock math={"(X,Y) \\sim \\text{BVN}(\\mu_X, \\mu_Y, \\sigma_X^2, \\sigma_Y^2, \\rho)"} />{' '}
          and assume <MathBlock math={"\\rho_{XY} = \\rho = 0"} />.
        </p>
        <p>
          Substitute <MathBlock math={"\\rho = 0"} /> into the BVN pdf. The cross-term
          vanishes and the factor <MathBlock math={"\\sqrt{1-\\rho^2} = 1"} />, so:
        </p>
        <MathBlock
          math={"f_{X,Y}(x,y) = \\frac{1}{2\\pi \\sigma_X \\sigma_Y} \\exp\\!\\left[-\\frac{1}{2}\\!\\left(\\left(\\frac{x-\\mu_X}{\\sigma_X}\\right)^{\\!2} + \\left(\\frac{y-\\mu_Y}{\\sigma_Y}\\right)^{\\!2}\\right)\\right]"}
          display
        />
        <p>
          The exponent is now a sum of two separate terms (one in <MathBlock math={"x"} /> only,
          one in <MathBlock math={"y"} /> only), so the exponential factors:
        </p>
        <MathBlock
          math={"= \\underbrace{\\frac{1}{\\sqrt{2\\pi}\\,\\sigma_X} e^{-\\frac{1}{2}\\left(\\frac{x-\\mu_X}{\\sigma_X}\\right)^2}}_{f_X(x)} \\;\\cdot\\; \\underbrace{\\frac{1}{\\sqrt{2\\pi}\\,\\sigma_Y} e^{-\\frac{1}{2}\\left(\\frac{y-\\mu_Y}{\\sigma_Y}\\right)^2}}_{f_Y(y)}"}
          display
        />
        <p>
          Since <MathBlock math={"f_{X,Y}(x,y) = f_X(x) \\cdot f_Y(y)"} />,{' '}
          <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> are independent.{' '}
          <MathBlock math={"\\blacksquare"} />
        </p>
      </Proof>

      <Note>
        <strong>Why is this special?</strong> Remember from Topic 4 that in general,{' '}
        <MathBlock math={"\\text{Cov}(X,Y) = 0"} /> does <em>not</em> imply independence
        (recall the counterexample <MathBlock math={"Y = X^2"} /> with{' '}
        <MathBlock math={"X \\sim N(0,1)"} />). But the BVN is special: its structure forces
        the entire dependence to go through <MathBlock math={"\\rho"} />, so setting{' '}
        <MathBlock math={"\\rho = 0"} /> removes <em>all</em> dependence, not just linear
        dependence. This is a unique feature of the normal family.
      </Note>

      {/* ── Exercise 5.77 ── */}
      <Example title="Exercise 5.77 — Identifying a BVN from Marginal and Conditional">
        <p>
          Suppose <MathBlock math={"f_X(x) = \\frac{1}{\\sqrt{2\\pi}} e^{-\\frac{1}{2}x^2}"} />{' '}
          (i.e., <MathBlock math={"X \\sim N(0,1)"} />) and the conditional pdf is:
        </p>
        <MathBlock
          math={"f_{Y|X}(y \\mid x) = \\frac{1}{\\sqrt{2\\pi}\\,\\sigma} \\exp\\!\\left[-\\frac{1}{2}\\left(\\frac{y-10-2x}{\\sigma}\\right)^{\\!2}\\right]"}
          display
        />
        <p>
          So <MathBlock math={"Y \\mid X = x \\sim N(10 + 2x, \\sigma^2)"} />.
        </p>
        <p>
          The joint pdf is <MathBlock math={"f_{X,Y}(x,y) = f_{Y|X}(y|x) \\cdot f_X(x)"} />.
          We want to verify this is a BVN and identify the parameters.
        </p>
        <p><strong>Matching to Theorem 5.27:</strong></p>
        <p>
          The conditional mean is <MathBlock math={"E[Y|X=x] = 10 + 2x"} />. Comparing
          with <MathBlock math={"\\mu_Y + \\rho \\frac{\\sigma_Y}{\\sigma_X}(x - \\mu_X)"} />,
          and using <MathBlock math={"\\mu_X = 0, \\sigma_X = 1"} />:
        </p>
        <MathBlock
          math={"\\mu_Y + \\rho \\sigma_Y \\cdot x = 10 + 2x \\quad \\Longrightarrow \\quad \\mu_Y = 10, \\;\\; \\rho \\sigma_Y = 2"}
          display
        />
        <p>
          The conditional variance is <MathBlock math={"\\sigma_Y^2(1-\\rho^2) = \\sigma^2"} />.
        </p>
        <p>
          From <MathBlock math={"\\rho \\sigma_Y = 2"} /> we get{' '}
          <MathBlock math={"\\rho = 2/\\sigma_Y"} />, and substituting into the variance
          equation:
        </p>
        <MathBlock
          math={"\\sigma_Y^2\\!\\left(1 - \\frac{4}{\\sigma_Y^2}\\right) = \\sigma^2 \\quad \\Longrightarrow \\quad \\sigma_Y^2 - 4 = \\sigma^2 \\quad \\Longrightarrow \\quad \\sigma_Y^2 = 4 + \\sigma^2"}
          display
        />
        <p>
          And <MathBlock math={"\\rho = \\frac{2}{\\sqrt{4+\\sigma^2}}"} />. So:
        </p>
        <MathBlock
          math={"(X,Y) \\sim \\text{BVN}\\!\\left(0,\\; 10,\\; 1,\\; 4+\\sigma^2,\\; \\frac{2}{\\sqrt{4+\\sigma^2}}\\right)"}
          display
        />
      </Example>

      {/* ── Exercise 5.78 — Deriving marginals from BVN MGF ── */}
      <Example title="Exercise 5.78 — Verifying Marginals from the BVN MGF">
        <p>
          From Theorem 5.28, the BVN joint MGF is:
        </p>
        <MathBlock
          math={"M_{X,Y}(t_1, t_2) = \\exp\\!\\left[\\mu_X t_1 + \\mu_Y t_2 + \\tfrac{1}{2}(\\sigma_X^2 t_1^2 + \\sigma_Y^2 t_2^2 + 2\\rho \\sigma_X \\sigma_Y t_1 t_2)\\right]"}
          display
        />
        <p>Setting <MathBlock math={"t_2 = 0"} />:</p>
        <MathBlock
          math={"M_X(t_1) = M_{X,Y}(t_1, 0) = \\exp\\!\\left[\\mu_X t_1 + \\tfrac{1}{2}\\sigma_X^2 t_1^2\\right]"}
          display
        />
        <p>
          This is the MGF of <MathBlock math={"N(\\mu_X, \\sigma_X^2)"} /> (recall from PTS1:
          if <MathBlock math={"X \\sim N(\\mu, \\sigma^2)"} /> then{' '}
          <MathBlock math={"M_X(t) = e^{\\mu t + \\frac{1}{2}\\sigma^2 t^2}"} />).
          By uniqueness, <MathBlock math={"X \\sim N(\\mu_X, \\sigma_X^2)"} />.
          Analogously for <MathBlock math={"Y"} />.
        </p>
      </Example>

      {/* ── Definition 5.22: Multivariate Normal ── */}
      <h4>Extension: The Multivariate Normal Distribution</h4>

      <Definition id="def-mvn" title="Definition 5.22 — Multivariate Normal Distribution">
        <p>
          The <MathBlock math={"k"} />-dimensional random variable{' '}
          <MathBlock math={"\\mathbf{X} = (X_1, \\ldots, X_k)"} /> has the{' '}
          <strong>multivariate normal distribution</strong> if its joint pdf is:
        </p>
        <MathBlock
          math={"f_{\\mathbf{X}}(x_1, \\ldots, x_k) = \\frac{1}{\\sqrt{(2\\pi)^k |\\boldsymbol{\\Sigma}|}} \\, \\exp\\!\\left[-\\frac{1}{2}(\\vec{x} - \\vec{\\mu})^T \\boldsymbol{\\Sigma}^{-1} (\\vec{x} - \\vec{\\mu})\\right]"}
          display
        />
        <p>where:</p>
        <ul>
          <li>
            <MathBlock math={"\\vec{x} = (x_1, \\ldots, x_k)^T"} /> is a column vector of
            observed values.
          </li>
          <li>
            <MathBlock math={"\\vec{\\mu} = (\\mu_1, \\ldots, \\mu_k)^T"} /> is the mean vector.
          </li>
          <li>
            <MathBlock math={"\\boldsymbol{\\Sigma}"} /> is the{' '}
            <MathBlock math={"k \\times k"} /> <strong>covariance matrix</strong> with entries{' '}
            <MathBlock math={"\\sigma_{ij} = \\text{Cov}(X_i, X_j)"} /> (and{' '}
            <MathBlock math={"\\sigma_{ii} = \\text{Var}(X_i) = \\sigma_i^2"} /> on the
            diagonal).
          </li>
          <li>
            <MathBlock math={"|\\boldsymbol{\\Sigma}|"} /> is the determinant of{' '}
            <MathBlock math={"\\boldsymbol{\\Sigma}"} />, and{' '}
            <MathBlock math={"\\boldsymbol{\\Sigma}^{-1}"} /> is its inverse.
          </li>
        </ul>
      </Definition>

      <p>
        For <MathBlock math={"k = 2"} />, the covariance matrix is:
      </p>
      <MathBlock
        math={"\\boldsymbol{\\Sigma} = \\begin{pmatrix} \\sigma_X^2 & \\rho \\sigma_X \\sigma_Y \\\\ \\rho \\sigma_X \\sigma_Y & \\sigma_Y^2 \\end{pmatrix}"}
        display
      />
      <p>
        with <MathBlock math={"|\\boldsymbol{\\Sigma}| = \\sigma_X^2 \\sigma_Y^2 (1 - \\rho^2)"} />.
        Substituting into Definition 5.22 recovers the BVN pdf from Definition 5.21
        exactly.
      </p>

      <Note>
        The matrix notation is much more compact and generalises naturally. In statistics
        courses beyond PTS2, the multivariate normal notation{' '}
        <MathBlock math={"\\mathbf{X} \\sim N_k(\\vec{\\mu}, \\boldsymbol{\\Sigma})"} /> is
        standard. For this course, you mainly need to recognise it and understand that it
        reduces to the BVN when <MathBlock math={"k = 2"} />.
      </Note>

      {/* ════════════════════════════════════════════
          WORKED QUESTIONS
          ════════════════════════════════════════════ */}
      <h3>Worked Questions</h3>

      {/* ── WQ1: Joint MGF computation + independence ── */}
      <WorkedQuestion
        source="Exercise 5.73 (adapted)"
        difficulty="medium"
        solution={
          <>
            <p><strong>Step 1:</strong> Write the joint MGF definition.</p>
            <MathBlock
              math={"M_{X,Y}(t,u) = E[e^{tX+uY}] = \\int_0^\\infty e^{tx} \\left\\{\\int_x^\\infty e^{uy-y}\\,dy\\right\\} dx"}
              display
            />
            <p>
              The support is <MathBlock math={"0 < x < y < \\infty"} /> with{' '}
              <MathBlock math={"f_{X,Y}(x,y) = e^{-y}"} />, so the inner integral is
              over <MathBlock math={"y"} /> from <MathBlock math={"x"} /> to{' '}
              <MathBlock math={"\\infty"} />.
            </p>

            <p><strong>Step 2:</strong> Evaluate the inner integral.</p>
            <MathBlock
              math={"\\int_x^\\infty e^{(u-1)y}\\,dy = \\frac{1}{1-u} e^{(u-1)x} \\quad \\text{(requires } u < 1\\text{)}"}
              display
            />

            <p><strong>Step 3:</strong> Evaluate the outer integral.</p>
            <MathBlock
              math={"M_{X,Y}(t,u) = \\int_0^\\infty e^{tx} \\cdot \\frac{1}{1-u} e^{(u-1)x}\\,dx = \\frac{1}{1-u} \\int_0^\\infty e^{(t+u-1)x}\\,dx"}
              display
            />
            <MathBlock
              math={"= \\frac{1}{1-u} \\cdot \\frac{1}{1-t-u} = \\frac{1}{(1-t-u)(1-u)}"}
              display
            />
            <p>
              (requires <MathBlock math={"t + u < 1"} /> and <MathBlock math={"u < 1"} />).
            </p>

            <p><strong>Step 4:</strong> Identify marginal distributions using Property 2.</p>
            <MathBlock
              math={"M_X(t) = M_{X,Y}(t,0) = \\frac{1}{1-t} \\quad (t < 1) \\quad \\Longrightarrow \\quad X \\sim \\text{Exp}(1)"}
              display
            />
            <MathBlock
              math={"M_Y(u) = M_{X,Y}(0,u) = \\frac{1}{(1-u)^2} \\quad (u < 1) \\quad \\Longrightarrow \\quad Y \\sim \\text{Gamma}(2,1)"}
              display
            />

            <p><strong>Step 5:</strong> Check independence.</p>
            <p>
              <MathBlock math={"M_X(t) \\cdot M_Y(u) = \\frac{1}{1-t} \\cdot \\frac{1}{(1-u)^2}"} />{' '}
              but <MathBlock math={"M_{X,Y}(t,u) = \\frac{1}{(1-t-u)(1-u)}"} />.
            </p>
            <p>
              These are <strong>not equal</strong> (since{' '}
              <MathBlock math={"(1-t)(1-u)^2 \\neq (1-t-u)(1-u)"} /> in general), so{' '}
              <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> are <strong>not
              independent</strong>.
            </p>
          </>
        }
      >
        <p>
          Let <MathBlock math={"f_{X,Y}(x,y) = e^{-y}"} /> for{' '}
          <MathBlock math={"0 < x < y < \\infty"} />.
        </p>
        <ol>
          <li>Find the joint MGF <MathBlock math={"M_{X,Y}(t,u)"} />.</li>
          <li>Find the marginal distributions of <MathBlock math={"X"} /> and <MathBlock math={"Y"} />.</li>
          <li>Are <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> independent?</li>
        </ol>
      </WorkedQuestion>

      {/* ── WQ2: Multinomial Cov from MGF ── */}
      <WorkedQuestion
        source="Exercise 5.74"
        difficulty="medium"
        solution={
          <>
            <p>
              We are given <MathBlock math={"M_{X,Y}(t,u) = \\frac{1}{(1-2t)(1-3u)}"} />.
            </p>

            <p><strong>(a) Independence:</strong></p>
            <p>
              The joint MGF factors as{' '}
              <MathBlock math={"\\frac{1}{1-2t} \\cdot \\frac{1}{1-3u}"} />, a function of{' '}
              <MathBlock math={"t"} /> alone times a function of{' '}
              <MathBlock math={"u"} /> alone. By Property 4, <MathBlock math={"X"} /> and{' '}
              <MathBlock math={"Y"} /> are <strong>independent</strong>.
            </p>

            <p><strong>(b) MGF of <MathBlock math={"X + Y"} />:</strong></p>
            <p>
              Since <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> are independent:{' '}
            </p>
            <MathBlock
              math={"M_{X+Y}(t) = M_X(t) \\cdot M_Y(t) = \\frac{1}{(1-2t)(1-3t)}"}
              display
            />

            <p><strong>(c) Identify distributions:</strong></p>
            <p>
              <MathBlock math={"M_X(t) = \\frac{1}{1-2t} = \\frac{1/2}{1/2 - t}"} />.
              This is the MGF of <MathBlock math={"\\text{Exp}(1/2)"} />{' '}
              (recall <MathBlock math={"M(t) = \\frac{\\lambda}{\\lambda - t}"} /> for{' '}
              <MathBlock math={"\\text{Exp}(\\lambda)"} />), so{' '}
              <MathBlock math={"X \\sim \\text{Exp}(1/2)"} />.
            </p>
            <p>
              Similarly, <MathBlock math={"M_Y(t) = \\frac{1}{1-3t} = \\frac{1/3}{1/3 - t}"} />,
              so <MathBlock math={"Y \\sim \\text{Exp}(1/3)"} />.
            </p>
          </>
        }
      >
        <p>
          Given <MathBlock math={"M_{X,Y}(t,u) = \\frac{1}{(1-2t)(1-3u)}"} />:
        </p>
        <ol>
          <li>Are <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> independent?</li>
          <li>Find <MathBlock math={"M_{X+Y}(t)"} />.</li>
          <li>Identify the distributions of <MathBlock math={"X"} /> and <MathBlock math={"Y"} />.</li>
        </ol>
      </WorkedQuestion>

      {/* ── WQ3: BVN conditional distribution ── */}
      <WorkedQuestion
        source="BVN Conditional (exam-style)"
        difficulty="medium"
        solution={
          <>
            <p><strong>Step 1:</strong> Read off the five parameters:</p>
            <MathBlock
              math={"\\mu_X = 3, \\; \\mu_Y = 7, \\; \\sigma_X^2 = 4, \\; \\sigma_Y^2 = 9, \\; \\rho = -0.6"}
              display
            />
            <p>So <MathBlock math={"\\sigma_X = 2, \\; \\sigma_Y = 3"} />.</p>

            <p><strong>Step 2:</strong> Apply Theorem 5.27:</p>
            <MathBlock
              math={"Y \\mid X=5 \\;\\sim\\; N\\!\\left(\\mu_Y + \\rho \\frac{\\sigma_Y}{\\sigma_X}(5 - \\mu_X), \\;\\; \\sigma_Y^2(1-\\rho^2)\\right)"}
              display
            />

            <p><strong>Conditional mean:</strong></p>
            <MathBlock
              math={"E[Y \\mid X=5] = 7 + (-0.6) \\cdot \\frac{3}{2} \\cdot (5-3) = 7 + (-0.6)(1.5)(2) = 7 - 1.8 = 5.2"}
              display
            />

            <p><strong>Conditional variance:</strong></p>
            <MathBlock
              math={"\\text{Var}(Y \\mid X=5) = 9(1-0.36) = 9 \\times 0.64 = 5.76"}
              display
            />

            <p>
              So <MathBlock math={"Y \\mid X=5 \\sim N(5.2, 5.76)"} />, with conditional
              standard deviation <MathBlock math={"\\sqrt{5.76} = 2.4"} />.
            </p>

            <p><strong>Step 3:</strong> Find the probability:</p>
            <MathBlock
              math={"P(Y > 8 \\mid X=5) = P\\!\\left(Z > \\frac{8-5.2}{2.4}\\right) = P(Z > 1.167) \\approx 1 - \\Phi(1.17) \\approx 0.121"}
              display
            />

            <p><strong>Step 4:</strong> Covariance:</p>
            <MathBlock
              math={"\\text{Cov}(X,Y) = \\rho \\sigma_X \\sigma_Y = (-0.6)(2)(3) = -3.6"}
              display
            />
          </>
        }
      >
        <p>
          Let <MathBlock math={"(X,Y) \\sim \\text{BVN}(3, 7, 4, 9, -0.6)"} />.
        </p>
        <ol>
          <li>Find the conditional distribution of <MathBlock math={"Y"} /> given <MathBlock math={"X = 5"} />.</li>
          <li>Find <MathBlock math={"P(Y > 8 \\mid X = 5)"} />.</li>
          <li>Find <MathBlock math={"\\text{Cov}(X, Y)"} />.</li>
        </ol>
      </WorkedQuestion>

      {/* ── WQ4: BVN independence ── */}
      <WorkedQuestion
        source="Exercise 5.64 (adapted)"
        difficulty="hard"
        solution={
          <>
            <p><strong>(a) Marginal distributions:</strong></p>
            <p>
              By Theorem 5.26, {' '}
              <MathBlock math={"X \\sim N(0, 1)"} /> and{' '}
              <MathBlock math={"Y \\sim N(10, \\sigma^2)"} /> with the given parameters.
            </p>
            <p>
              We have <MathBlock math={"\\mu_X = 0, \\sigma_X = 1, \\mu_Y = 10, \\sigma_Y = \\sigma, \\rho = 0.5"} />.
            </p>

            <p><strong>(b) Conditional distribution:</strong></p>
            <MathBlock
              math={"Y \\mid X=x \\;\\sim\\; N\\!\\left(10 + 0.5 \\cdot \\frac{\\sigma}{1}(x - 0), \\;\\; \\sigma^2(1-0.25)\\right) = N(10 + 0.5\\sigma x, \\; 0.75\\sigma^2)"}
              display
            />

            <p><strong>(c) When are <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> independent?</strong></p>
            <p>
              For the BVN, independence <MathBlock math={"\\Leftrightarrow \\rho = 0"} />.
              Since <MathBlock math={"\\rho = 0.5 \\neq 0"} />,{' '}
              <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> are{' '}
              <strong>not independent</strong> regardless of the value of{' '}
              <MathBlock math={"\\sigma"} />.
            </p>

            <p><strong>(d) What if <MathBlock math={"\\rho = 0"} />?</strong></p>
            <p>
              If we changed the problem to <MathBlock math={"\\rho = 0"} />,
              then:
            </p>
            <ul>
              <li>The conditional mean becomes <MathBlock math={"E[Y|X=x] = 10"} /> (constant — knowing <MathBlock math={"X"} /> tells you nothing about the mean of <MathBlock math={"Y"} />).</li>
              <li>The conditional variance becomes <MathBlock math={"\\sigma^2(1 - 0) = \\sigma^2"} /> (same as the marginal variance — knowing <MathBlock math={"X"} /> doesn't reduce uncertainty).</li>
              <li><MathBlock math={"X"} /> and <MathBlock math={"Y"} /> are independent.</li>
            </ul>
          </>
        }
      >
        <p>
          Let <MathBlock math={"(X,Y) \\sim \\text{BVN}(0, 10, 1, \\sigma^2, 0.5)"} />{' '}
          for some <MathBlock math={"\\sigma > 0"} />.
        </p>
        <ol>
          <li>What are the marginal distributions?</li>
          <li>Find the conditional distribution <MathBlock math={"Y \\mid X = x"} />.</li>
          <li>Are <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> independent?</li>
          <li>What would change if <MathBlock math={"\\rho = 0"} /> instead?</li>
        </ol>
      </WorkedQuestion>
    </>
  )
}
