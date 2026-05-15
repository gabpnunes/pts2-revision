import MathBlock from '../components/MathBlock'
import Definition from '../components/Definition'
import Theorem from '../components/Theorem'
import Proof from '../components/Proof'
import Example from '../components/Example'
import Note from '../components/Note'
import WorkedQuestion from '../components/WorkedQuestion'

export default function Topic7Transformations() {
  return (
    <>
      <p>
        A fundamental question in probability: if you know the distribution of{' '}
        <MathBlock math={"X_1, \\ldots, X_k"} />, what is the distribution of some
        function <MathBlock math={"h(X_1, \\ldots, X_k)"} />? For example, if{' '}
        <MathBlock math={"X \\sim \\text{Exp}(1)"} />, what is the distribution of{' '}
        <MathBlock math={"W = \\theta\\sqrt{X}"} />? If{' '}
        <MathBlock math={"X, Y \\stackrel{\\text{iid}}{\\sim} \\text{Exp}(\\lambda)"} />,
        what is the distribution of <MathBlock math={"X + Y"} />?
      </p>
      <p>
        This topic covers three methods for answering such questions, each suited to
        different situations, plus the important special case of <strong>distributions of
        sums</strong> of independent random variables.
      </p>

      {/* ════════════════════════════════════════════
          METHOD 1 — CDF METHOD (§6.1)
          ════════════════════════════════════════════ */}
      <h3>Method 1: The CDF Method</h3>

      <p>
        The CDF method is the most general approach — it works for <em>any</em>{' '}
        transformation, whether or not the function is one-to-one, and in any number of
        dimensions. The idea is simple:
      </p>
      <ol>
        <li>
          Define <MathBlock math={"W = h(X_1, \\ldots, X_k)"} />.
        </li>
        <li>
          Write the CDF of <MathBlock math={"W"} /> directly:{' '}
          <MathBlock math={"F_W(w) = P(W \\leq w) = P(h(X_1,\\ldots,X_k) \\leq w)"} />.
        </li>
        <li>
          Translate this probability into an integral over the joint pdf of{' '}
          <MathBlock math={"(X_1, \\ldots, X_k)"} />.
        </li>
        <li>
          Differentiate: <MathBlock math={"f_W(w) = \\frac{d}{dw} F_W(w)"} />.
        </li>
      </ol>

      <Note>
        The hardest part is usually step 3: figuring out the correct integration region.
        Drawing a picture of the support and the region{' '}
        <MathBlock math={"\\{(x_1,\\ldots,x_k) : h(x_1,\\ldots,x_k) \\leq w\\}"} /> is
        essential.
      </Note>

      <Example title="Example 6.1 — Univariate CDF Method (PTS1 recap)">
        <p>
          Let <MathBlock math={"X \\sim \\text{Exp}(1)"} /> and{' '}
          <MathBlock math={"\\theta > 0"} />. Find the distribution of{' '}
          <MathBlock math={"W = \\theta\\sqrt{X}"} />.
        </p>
        <p><strong>Step 1 — Support:</strong> Since <MathBlock math={"X \\geq 0"} />, we have <MathBlock math={"W \\geq 0"} />.</p>
        <p><strong>Step 2 — CDF:</strong> For <MathBlock math={"w \\geq 0"} />:</p>
        <MathBlock
          math={"F_W(w) = P(W \\leq w) = P(\\theta\\sqrt{X} \\leq w) = P\\!\\left(X \\leq \\left(\\frac{w}{\\theta}\\right)^{\\!2}\\right) = F_X\\!\\left(\\left(\\frac{w}{\\theta}\\right)^{\\!2}\\right)"}
          display
        />
        <p>
          Since <MathBlock math={"X \\sim \\text{Exp}(1)"} />, we have{' '}
          <MathBlock math={"F_X(x) = 1 - e^{-x}"} />, so:
        </p>
        <MathBlock
          math={"F_W(w) = 1 - \\exp\\!\\left(-\\left(\\frac{w}{\\theta}\\right)^{\\!2}\\right), \\quad w \\geq 0"}
          display
        />
        <p><strong>Step 3 — Differentiate:</strong></p>
        <MathBlock
          math={"f_W(w) = \\frac{d}{dw} F_W(w) = \\frac{2w}{\\theta^2} \\exp\\!\\left(-\\left(\\frac{w}{\\theta}\\right)^{\\!2}\\right), \\quad w \\geq 0"}
          display
        />
        <p>
          This is a <strong>Rayleigh</strong>-type distribution (or Weibull with shape 2).
        </p>
      </Example>

      <Example title="Example 6.2 — CDF Method for a Sum (Bivariate)">
        <p>
          Let <MathBlock math={"X, Y \\stackrel{\\text{iid}}{\\sim} \\text{Exp}(\\lambda)"} />.
          Find the distribution of <MathBlock math={"W = X + Y"} />.
        </p>
        <p>
          <strong>Joint pdf:</strong> Since <MathBlock math={"X"} /> and{' '}
          <MathBlock math={"Y"} /> are independent:{' '}
          <MathBlock math={"f_{X,Y}(x,y) = \\lambda e^{-\\lambda x} \\cdot \\lambda e^{-\\lambda y} = \\lambda^2 e^{-\\lambda(x+y)}"} />{' '}
          for <MathBlock math={"x, y \\geq 0"} />.
        </p>
        <p><strong>Support:</strong> <MathBlock math={"W \\geq 0"} />.</p>
        <p>
          <strong>CDF:</strong> We need <MathBlock math={"P(X + Y \\leq w)"} />, which
          means integrating over the triangle{' '}
          <MathBlock math={"\\{(x,y) : x \\geq 0, y \\geq 0, x+y \\leq w\\}"} />:
        </p>
        <MathBlock
          math={"F_W(w) = \\int_0^w \\int_0^{w-x} \\lambda^2 e^{-\\lambda(x+y)}\\,dy\\,dx"}
          display
        />
        <p>
          Evaluating the inner integral, then the outer, and differentiating:
        </p>
        <MathBlock
          math={"F_W(w) = 1 - e^{-\\lambda w} - \\lambda w e^{-\\lambda w}, \\quad w \\geq 0"}
          display
        />
        <MathBlock
          math={"f_W(w) = \\frac{d}{dw}F_W(w) = \\lambda^2 w \\, e^{-\\lambda w}, \\quad w \\geq 0"}
          display
        />
        <p>
          This is the pdf of <MathBlock math={"\\text{Gamma}(1/\\lambda, 2)"} />{' '}
          (or equivalently <MathBlock math={"\\text{Gamma}(\\theta = 1/\\lambda, r = 2)"} />).
          So the sum of two independent <MathBlock math={"\\text{Exp}(\\lambda)"} />{' '}
          variables is Gamma with shape 2.
        </p>
      </Example>

      <Example title="Example 6.3 — CDF Method for a Product">
        <p>
          Let <MathBlock math={"X, Y \\stackrel{\\text{iid}}{\\sim} \\text{Unif}(0,1)"} />.
          Find the distribution of <MathBlock math={"W = XY"} />.
        </p>
        <p>
          <strong>Support:</strong> <MathBlock math={"0 < W \\leq 1"} />.
        </p>
        <p>
          <strong>CDF:</strong> For <MathBlock math={"0 < w \\leq 1"} />:
        </p>
        <MathBlock
          math={"F_W(w) = P(XY \\leq w) = \\iint_{xy \\leq w} 1\\,dx\\,dy"}
          display
        />
        <p>
          The region <MathBlock math={"\\{(x,y) \\in [0,1]^2 : xy \\leq w\\}"} /> is
          bounded by the hyperbola <MathBlock math={"y = w/x"} />. Splitting the integral
          at <MathBlock math={"x = w"} /> (where the hyperbola exits through the top of the
          unit square):
        </p>
        <MathBlock
          math={"F_W(w) = \\int_0^w \\int_0^1 1\\,dy\\,dx + \\int_w^1 \\int_0^{w/x} 1\\,dy\\,dx = w + \\int_w^1 \\frac{w}{x}\\,dx = w - w\\ln w"}
          display
        />
        <p><strong>Differentiate:</strong></p>
        <MathBlock
          math={"f_W(w) = 1 - \\ln w - 1 = -\\ln w, \\quad 0 < w \\leq 1"}
          display
        />
        <p>
          <strong>Sanity check:</strong>{' '}
          <MathBlock math={"\\int_0^1 (-\\ln w)\\,dw = [w - w\\ln w]_0^1 = 1"} /> ✓
        </p>
      </Example>

      <h4>When to Use the CDF Method</h4>
      <ul>
        <li>The transformation is <strong>not</strong> one-to-one (e.g., <MathBlock math={"W = X^2"} />, <MathBlock math={"W = |X|"} />).</li>
        <li>You want the distribution of a <strong>single</strong> function of multiple variables (e.g., <MathBlock math={"W = X + Y"} />, <MathBlock math={"W = XY"} />, <MathBlock math={"W = \\max(X,Y)"} />).</li>
        <li>The support region has a complicated shape.</li>
        <li>You are comfortable setting up double integrals.</li>
      </ul>

      {/* ════════════════════════════════════════════
          METHOD 2 — TRANSFORMATION METHOD (§6.1)
          ════════════════════════════════════════════ */}
      <h3>Method 2: The Transformation Method</h3>

      <p>
        When the transformation is <strong>one-to-one</strong>, there is a shortcut that avoids
        computing the CDF and differentiating. The idea: substitute the inverse
        transformation directly into the pdf and multiply by a correction factor (the
        Jacobian) that accounts for how the transformation stretches or compresses
        probability.
      </p>

      <Theorem id="thm-transformation-discrete" title="Theorem 6.1 — Transformation Method (Discrete)">
        <p>
          If <MathBlock math={"\\mathbf{X}"} /> is a <MathBlock math={"k"} />-dimensional{' '}
          <strong>discrete</strong> random variable with joint pmf{' '}
          <MathBlock math={"f_{\\mathbf{X}}(\\mathbf{x})"} />, and{' '}
          <MathBlock math={"\\mathbf{Y} = \\mathbf{u}(\\mathbf{X})"} /> is a 1-to-1
          transformation, then:
        </p>
        <MathBlock
          math={"f_{\\mathbf{Y}}(y_1, \\ldots, y_k) = f_{\\mathbf{X}}(x_1, \\ldots, x_k)"}
          display
        />
        <p>
          where <MathBlock math={"x_1, \\ldots, x_k"} /> are obtained by solving{' '}
          <MathBlock math={"\\mathbf{y} = \\mathbf{u}(\\mathbf{x})"} /> for{' '}
          <MathBlock math={"\\mathbf{x}"} /> (the inverse transformation).
        </p>
        <p>
          <strong>Why no Jacobian?</strong> Discrete probabilities are point masses — there is
          no stretching/compression to correct for.
        </p>
      </Theorem>

      <Example title="Example 6.3 (Lecture) — Discrete Transformation">
        <p>
          Let <MathBlock math={"X_1, X_2 \\stackrel{\\text{iid}}{\\sim} \\text{Geo}(p)"} /> with{' '}
          <MathBlock math={"f_{X_1,X_2}(x_1,x_2) = p^2(1-p)^{x_1+x_2-2}"} /> for{' '}
          <MathBlock math={"x_i = 1, 2, 3, \\ldots"} />
        </p>
        <p>
          Define <MathBlock math={"Y_1 = X_1"} /> and <MathBlock math={"Y_2 = X_1 + X_2"} />.
          <strong> Inverse:</strong> <MathBlock math={"X_1 = Y_1, \\; X_2 = Y_2 - Y_1"} />.
        </p>
        <MathBlock
          math={"f_{Y_1,Y_2}(y_1, y_2) = f_{X_1,X_2}(y_1, y_2 - y_1) = p^2(1-p)^{y_2 - 2}"}
          display
        />
        <p>
          for <MathBlock math={"y_1 = 1, 2, 3, \\ldots"} /> and{' '}
          <MathBlock math={"y_2 = y_1 + 1, y_1 + 2, \\ldots"} /> (i.e.,{' '}
          <MathBlock math={"y_2 > y_1 \\geq 1"} />).
        </p>
      </Example>

      <Theorem id="thm-transformation-continuous" title="Theorem 6.2 — Transformation Method (Continuous)">
        <p>
          If <MathBlock math={"\\mathbf{X}"} /> is a <MathBlock math={"k"} />-dimensional{' '}
          <strong>continuous</strong> random variable with joint pdf{' '}
          <MathBlock math={"f_{\\mathbf{X}}(\\mathbf{x})"} /> on support set{' '}
          <MathBlock math={"A"} />, and{' '}
          <MathBlock math={"\\mathbf{Y} = \\mathbf{u}(\\mathbf{X})"} /> defines a 1-to-1
          transformation from <MathBlock math={"A"} /> to its range, then:
        </p>
        <MathBlock
          math={"f_{\\mathbf{Y}}(y_1, \\ldots, y_k) = f_{\\mathbf{X}}(x_1, \\ldots, x_k) \\cdot |J|"}
          display
        />
        <p>
          where <MathBlock math={"x_1, \\ldots, x_k"} /> are the solutions (in terms of{' '}
          <MathBlock math={"y_1, \\ldots, y_k"} />) of{' '}
          <MathBlock math={"\\mathbf{y} = \\mathbf{u}(\\mathbf{x})"} />, and{' '}
          <MathBlock math={"J"} /> is the <strong>Jacobian determinant</strong>:
        </p>
        <MathBlock
          math={"J = \\det\\begin{pmatrix} \\frac{\\partial x_1}{\\partial y_1} & \\frac{\\partial x_1}{\\partial y_2} & \\cdots & \\frac{\\partial x_1}{\\partial y_k} \\\\ \\frac{\\partial x_2}{\\partial y_1} & \\frac{\\partial x_2}{\\partial y_2} & \\cdots & \\frac{\\partial x_2}{\\partial y_k} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ \\frac{\\partial x_k}{\\partial y_1} & \\frac{\\partial x_k}{\\partial y_2} & \\cdots & \\frac{\\partial x_k}{\\partial y_k} \\end{pmatrix}"}
          display
        />
        <p>
          The Jacobian must be continuous and non-zero over the range of the transformation.
        </p>
      </Theorem>

      <Note>
        <strong>What is the Jacobian doing?</strong> When you change variables in a
        single-variable integral, you write <MathBlock math={"dx = |dx/dy|\\,dy"} />. The
        Jacobian is the multivariate generalisation of this: <MathBlock math={"|J|"} />{' '}
        measures how much the transformation stretches or compresses volumes of probability.
        We take the absolute value because probability density cannot be negative.
      </Note>

      <h4>Step-by-Step Recipe: Transformation Method</h4>
      <div className="recipe-box">
        <ol>
          <li>
            <strong>Write down the transformation</strong>{' '}
            <MathBlock math={"\\mathbf{y} = \\mathbf{u}(\\mathbf{x})"} /> and verify it
            is 1-to-1.
          </li>
          <li>
            <strong>Find the inverse:</strong> solve for{' '}
            <MathBlock math={"x_1, \\ldots, x_k"} /> in terms of{' '}
            <MathBlock math={"y_1, \\ldots, y_k"} />.
          </li>
          <li>
            <strong>Compute the Jacobian:</strong> build the matrix of partial derivatives
            of the <em>inverse</em> (i.e., <MathBlock math={"\\partial x_i / \\partial y_j"} />)
            and take its determinant.
          </li>
          <li>
            <strong>Determine the new support:</strong> translate the constraints on{' '}
            <MathBlock math={"\\mathbf{x}"} /> into constraints on{' '}
            <MathBlock math={"\\mathbf{y}"} />.
          </li>
          <li>
            <strong>Substitute:</strong>{' '}
            <MathBlock math={"f_{\\mathbf{Y}}(\\mathbf{y}) = f_{\\mathbf{X}}(\\mathbf{u}^{-1}(\\mathbf{y})) \\cdot |J|"} />.
          </li>
          <li>
            <strong>If needed, marginalise:</strong> If you only want the pdf of one of the{' '}
            <MathBlock math={"Y_i"} />, integrate out the others.
          </li>
        </ol>
      </div>

      {/* ── Univariate example: Gamma → Chi-squared ── */}
      <Example title="Example 6.7 — Gamma to Chi-squared">
        <p>
          Let <MathBlock math={"X \\sim \\text{Gamma}(\\theta, r)"} /> with pdf{' '}
          <MathBlock math={"f_X(x) = \\frac{1}{\\theta^r \\Gamma(r)} x^{r-1} e^{-x/\\theta}"} />{' '}
          for <MathBlock math={"x \\geq 0"} />.
        </p>
        <p>
          Define <MathBlock math={"Y = \\frac{2X}{\\theta}"} />.{' '}
          <strong>Inverse:</strong> <MathBlock math={"X = \\frac{\\theta Y}{2}"} />,{' '}
          <MathBlock math={"\\frac{dx}{dy} = \\frac{\\theta}{2}"} />.
        </p>
        <MathBlock
          math={"f_Y(y) = f_X\\!\\left(\\frac{\\theta y}{2}\\right) \\cdot \\left|\\frac{\\theta}{2}\\right| = \\frac{1}{\\theta^r \\Gamma(r)} \\left(\\frac{\\theta y}{2}\\right)^{r-1} e^{-y/2} \\cdot \\frac{\\theta}{2}"}
          display
        />
        <MathBlock
          math={"= \\frac{1}{2^r \\Gamma(r)} y^{r-1} e^{-y/2}, \\quad y \\geq 0"}
          display
        />
        <p>
          This is a <MathBlock math={"\\text{Gamma}(2, r)"} /> pdf. If{' '}
          <MathBlock math={"r"} /> is a half-integer (i.e.,{' '}
          <MathBlock math={"r = k/2"} /> for some positive integer{' '}
          <MathBlock math={"k"} />), this is exactly the{' '}
          <MathBlock math={"\\chi^2(k)"} /> distribution. So:
        </p>
        <MathBlock
          math={"X \\sim \\text{Gamma}(\\theta, r) \\quad \\Longrightarrow \\quad \\frac{2X}{\\theta} \\sim \\chi^2(2r)"}
          display
        />
      </Example>

      {/* ── Bivariate Example 6.6: Exp sum ── */}
      <Example title="Example 6.6 — Sum of Exponentials via Transformation">
        <p>
          Let <MathBlock math={"X_1, X_2 \\stackrel{\\text{iid}}{\\sim} \\text{Exp}(1)"} /> with{' '}
          <MathBlock math={"f_{X_1,X_2}(x_1,x_2) = e^{-x_1 - x_2}"} /> for{' '}
          <MathBlock math={"x_1, x_2 \\geq 0"} />.
        </p>
        <p>
          <strong>Transformation:</strong>{' '}
          <MathBlock math={"Y_1 = X_1, \\; Y_2 = X_1 + X_2"} />.{' '}
          <strong>Inverse:</strong>{' '}
          <MathBlock math={"X_1 = Y_1, \\; X_2 = Y_2 - Y_1"} />.
        </p>
        <p><strong>Jacobian:</strong></p>
        <MathBlock
          math={"J = \\det\\begin{pmatrix} \\partial x_1/\\partial y_1 & \\partial x_1/\\partial y_2 \\\\ \\partial x_2/\\partial y_1 & \\partial x_2/\\partial y_2 \\end{pmatrix} = \\det\\begin{pmatrix} 1 & 0 \\\\ -1 & 1 \\end{pmatrix} = 1"}
          display
        />
        <p><strong>Support:</strong> <MathBlock math={"x_1 \\geq 0"} /> and <MathBlock math={"x_2 \\geq 0"} /> become <MathBlock math={"0 \\leq y_1 \\leq y_2"} />.</p>
        <p><strong>Joint pdf of <MathBlock math={"(Y_1, Y_2)"} />:</strong></p>
        <MathBlock
          math={"f_{Y_1,Y_2}(y_1, y_2) = e^{-y_1 - (y_2-y_1)} \\cdot |1| = e^{-y_2}, \\quad 0 \\leq y_1 \\leq y_2"}
          display
        />
        <p><strong>Marginal of <MathBlock math={"Y_2 = X_1 + X_2"} />:</strong></p>
        <MathBlock
          math={"f_{Y_2}(y_2) = \\int_0^{y_2} e^{-y_2}\\,dy_1 = y_2 \\, e^{-y_2}, \\quad y_2 \\geq 0"}
          display
        />
        <p>
          This is <MathBlock math={"\\text{Gamma}(1, 2)"} />, confirming Example 6.2.
        </p>
      </Example>

      {/* ── Example 6.9: Difference and Sum ── */}
      <Example title="Example 6.9 — Difference and Sum of Exponentials">
        <p>
          Same setup: <MathBlock math={"X_1, X_2 \\stackrel{\\text{iid}}{\\sim} \\text{Exp}(1)"} />.
          Now define <MathBlock math={"Y_1 = X_1 - X_2"} /> and{' '}
          <MathBlock math={"Y_2 = X_1 + X_2"} />.
        </p>
        <p>
          <strong>Inverse:</strong>{' '}
          <MathBlock math={"X_1 = \\tfrac{1}{2}(Y_1 + Y_2), \\; X_2 = \\tfrac{1}{2}(Y_2 - Y_1)"} />.
        </p>
        <p><strong>Jacobian:</strong></p>
        <MathBlock
          math={"J = \\det\\begin{pmatrix} 1/2 & 1/2 \\\\ -1/2 & 1/2 \\end{pmatrix} = \\frac{1}{4} + \\frac{1}{4} = \\frac{1}{2}"}
          display
        />
        <p>
          <strong>Support:</strong> From <MathBlock math={"x_1 \\geq 0, x_2 \\geq 0"} />:{' '}
          <MathBlock math={"y_1 + y_2 \\geq 0"} /> and <MathBlock math={"y_2 - y_1 \\geq 0"} />,
          so <MathBlock math={"y_2 \\geq 0"} /> and <MathBlock math={"-y_2 \\leq y_1 \\leq y_2"} />.
        </p>
        <MathBlock
          math={"f_{Y_1,Y_2}(y_1,y_2) = e^{-\\frac{1}{2}(y_1+y_2)-\\frac{1}{2}(y_2-y_1)} \\cdot \\frac{1}{2} = \\frac{1}{2}e^{-y_2}, \\quad -y_2 \\leq y_1 \\leq y_2"}
          display
        />
        <p>
          Marginalising out <MathBlock math={"y_1"} />:{' '}
          <MathBlock math={"f_{Y_2}(y_2) = \\int_{-y_2}^{y_2} \\frac{1}{2}e^{-y_2}\\,dy_1 = y_2 e^{-y_2}"} />{' '}
          — again <MathBlock math={"\\text{Gamma}(1,2)"} />.
        </p>
      </Example>

      {/* ── Example 6.10: Product of Uniforms ── */}
      <Example title="Example 6.10 — Product of Uniforms via Auxiliary Variable">
        <p>
          Let <MathBlock math={"X_1, X_2 \\stackrel{\\text{iid}}{\\sim} \\text{Unif}(0,1)"} />.
          Find the pdf of <MathBlock math={"Y = X_1 X_2"} />.
        </p>
        <p>
          <strong>Problem:</strong> The transformation <MathBlock math={"Y = X_1 X_2"} />{' '}
          maps two variables to one — the transformation method requires equal dimensions.{' '}
          <strong>Solution:</strong> introduce an <strong>auxiliary variable</strong>{' '}
          <MathBlock math={"V = X_1"} />.
        </p>
        <p>
          <strong>Transformation:</strong>{' '}
          <MathBlock math={"Y = X_1 X_2, \\; V = X_1"} />.{' '}
          <strong>Inverse:</strong>{' '}
          <MathBlock math={"X_1 = V, \\; X_2 = Y/V"} />.
        </p>
        <p><strong>Jacobian:</strong></p>
        <MathBlock
          math={"J = \\det\\begin{pmatrix} 0 & 1 \\\\ 1/v & -y/v^2 \\end{pmatrix} = -\\frac{1}{v}"}
          display
        />
        <p>
          <strong>Support:</strong> <MathBlock math={"0 \\leq v \\leq 1"} /> and{' '}
          <MathBlock math={"0 \\leq y/v \\leq 1"} />, i.e.,{' '}
          <MathBlock math={"0 \\leq y \\leq v \\leq 1"} />.
        </p>
        <MathBlock
          math={"f_{Y,V}(y,v) = f_{X_1,X_2}(v, y/v) \\cdot \\frac{1}{v} = 1 \\cdot \\frac{1}{v} = \\frac{1}{v}, \\quad 0 \\leq y \\leq v \\leq 1"}
          display
        />
        <p><strong>Marginalise out <MathBlock math={"V"} />:</strong></p>
        <MathBlock
          math={"f_Y(y) = \\int_y^1 \\frac{1}{v}\\,dv = -\\ln y, \\quad 0 < y \\leq 1"}
          display
        />
        <p>This matches the CDF-method result from Example 6.3.</p>
      </Example>

      <Note>
        <strong>When to use auxiliary variables:</strong> Whenever your transformation maps{' '}
        <MathBlock math={"k"} /> variables to fewer than <MathBlock math={"k"} /> variables
        (e.g., you want the distribution of <MathBlock math={"X_1 + X_2"} /> but the
        transformation method needs a 2-to-2 mapping). Choose any convenient auxiliary
        variable that makes the mapping invertible, apply the transformation method, then
        integrate out the auxiliary variable at the end.
      </Note>

      {/* ════════════════════════════════════════════
          METHOD 3 — MGF METHOD (§6.1)
          ════════════════════════════════════════════ */}
      <h3>Method 3: The MGF Method</h3>

      <p>
        If you can compute the MGF of the transformed variable, the uniqueness property
        identifies the distribution without any integration or differentiation. This is
        especially powerful for <strong>sums of independent</strong> random variables.
      </p>

      <Theorem id="thm-mgf-sum" title="MGF of a Sum of Independent Variables">
        <p>
          If <MathBlock math={"X_1, \\ldots, X_k"} /> are <strong>independent</strong>, then
          the MGF of <MathBlock math={"S = \\sum_{i=1}^k X_i"} /> is:
        </p>
        <MathBlock
          math={"M_S(t) = \\prod_{i=1}^k M_{X_i}(t)"}
          display
        />
        <p>
          <strong>Why:</strong>{' '}
          <MathBlock math={"M_S(t) = E[e^{tS}] = E[e^{t(X_1 + \\cdots + X_k)}] = E[\\prod e^{tX_i}] \\stackrel{\\text{indep}}{=} \\prod E[e^{tX_i}] = \\prod M_{X_i}(t)"} />.
        </p>
      </Theorem>

      <Example title="PTS1 Example — Z² ~ χ²(1)">
        <p>
          Let <MathBlock math={"Z \\sim N(0,1)"} />. What is the distribution of{' '}
          <MathBlock math={"X = Z^2"} />?
        </p>
        <MathBlock
          math={"M_X(t) = E[e^{tZ^2}] = \\int_{-\\infty}^{\\infty} \\frac{1}{\\sqrt{2\\pi}} e^{-(1-2t)z^2/2}\\,dz"}
          display
        />
        <p>
          Substituting <MathBlock math={"u = \\sqrt{1-2t}\\,z"} /> (requires{' '}
          <MathBlock math={"t < 1/2"} />):
        </p>
        <MathBlock
          math={"M_X(t) = \\frac{1}{\\sqrt{1-2t}} \\underbrace{\\int_{-\\infty}^{\\infty} \\frac{1}{\\sqrt{2\\pi}} e^{-u^2/2}\\,du}_{=1} = (1-2t)^{-1/2}"}
          display
        />
        <p>
          Recognise this as the MGF of <MathBlock math={"\\text{Gamma}(2, 1/2) = \\chi^2(1)"} />.
          So <MathBlock math={"Z^2 \\sim \\chi^2(1)"} />.
        </p>
      </Example>

      <Example title="Example 6.12 — Joint Distribution of U = X+Y and W = X−Y via MGF">
        <p>
          Let <MathBlock math={"X, Y \\stackrel{\\text{iid}}{\\sim} N(0,1)"} />.
          What is the joint distribution of <MathBlock math={"U = X+Y"} /> and{' '}
          <MathBlock math={"W = X-Y"} />?
        </p>
        <p>
          Compute the joint MGF of <MathBlock math={"(U, W)"} />:
        </p>
        <MathBlock
          math={"M_{U,W}(t_1,t_2) = E[e^{t_1 U + t_2 W}] = E[e^{(t_1+t_2)X + (t_1-t_2)Y}]"}
          display
        />
        <p>
          Since <MathBlock math={"X, Y"} /> are independent:
        </p>
        <MathBlock
          math={"= M_X(t_1+t_2) \\cdot M_Y(t_1-t_2) = e^{\\frac{1}{2}(t_1+t_2)^2} \\cdot e^{\\frac{1}{2}(t_1-t_2)^2}"}
          display
        />
        <MathBlock
          math={"= \\exp\\!\\left(t_1^2 + t_2^2\\right) = \\exp\\!\\left(\\frac{1}{2}(2t_1^2 + 2t_2^2 + 2 \\cdot 0 \\cdot t_1 t_2)\\right)"}
          display
        />
        <p>
          This is the BVN joint MGF with <MathBlock math={"\\mu_U = \\mu_W = 0"} />,{' '}
          <MathBlock math={"\\sigma_U^2 = \\sigma_W^2 = 2"} />, and{' '}
          <MathBlock math={"\\rho = 0"} />. So:
        </p>
        <MathBlock
          math={"(U, W) \\sim \\text{BVN}(0, 0, 2, 2, 0)"}
          display
        />
        <p>
          Since <MathBlock math={"\\rho = 0"} /> in a BVN, <MathBlock math={"U"} /> and{' '}
          <MathBlock math={"W"} /> are <strong>independent</strong>, each{' '}
          <MathBlock math={"\\sim N(0, 2)"} />. So <MathBlock math={"X+Y"} /> and{' '}
          <MathBlock math={"X-Y"} /> are independent — a remarkable fact that is unique to
          the normal distribution.
        </p>
      </Example>

      <h4>Comparison of the Three Methods</h4>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Method</th>
              <th>When to use</th>
              <th>Key requirement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>CDF</strong></td>
              <td>Always works; best for non-invertible transforms or when you want a single function of multiple variables</td>
              <td>Must set up integration region correctly</td>
            </tr>
            <tr>
              <td><strong>Transformation</strong></td>
              <td>1-to-1 transformation; gives the full joint pdf directly</td>
              <td>Must be invertible; Jacobian must be non-zero</td>
            </tr>
            <tr>
              <td><strong>MGF</strong></td>
              <td>Sums of independent r.v.s; identifying known distributions</td>
              <td>Must recognise the resulting MGF</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ════════════════════════════════════════════
          §6.2 — DISTRIBUTIONS OF SUMS
          ════════════════════════════════════════════ */}
      <h3>§6.2 — Distributions of Sums of Random Variables</h3>

      <p>
        In statistics, we constantly work with sums: sample means, totals, test statistics.
        This section establishes what happens when you add independent random variables
        from known families.
      </p>

      <Definition id="def-iid" title="Definition — i.i.d. Random Variables">
        <p>
          Random variables <MathBlock math={"X_1, X_2, \\ldots, X_k"} /> are{' '}
          <strong>independent and identically distributed (i.i.d.)</strong> if:
        </p>
        <ol>
          <li>
            They are <strong>mutually independent</strong>.
          </li>
          <li>
            They all have the <strong>same distribution</strong>:{' '}
            <MathBlock math={"f_{X_i}(x) = f_X(x)"} /> for all <MathBlock math={"i"} />.
          </li>
        </ol>
        <p>
          In this case, every <MathBlock math={"X_i"} /> has the same mean{' '}
          <MathBlock math={"\\mu"} />, variance <MathBlock math={"\\sigma^2"} />, and MGF{' '}
          <MathBlock math={"M_X(t)"} />.
        </p>
      </Definition>

      <h4>Mean and Variance of Sums</h4>
      <p>
        For <MathBlock math={"S = \\sum_{i=1}^k X_i"} />:
      </p>
      <MathBlock
        math={"E[S] = \\sum_{i=1}^k E[X_i] \\quad \\text{(always, no independence needed)}"}
        display
      />
      <MathBlock
        math={"\\text{Var}(S) = \\sum_{i=1}^k \\text{Var}(X_i) + 2\\sum_{i<j} \\text{Cov}(X_i, X_j)"}
        display
      />
      <p>If the <MathBlock math={"X_i"} /> are <strong>independent</strong>, the covariance terms vanish:</p>
      <MathBlock
        math={"\\text{Var}(S) = \\sum_{i=1}^k \\text{Var}(X_i)"}
        display
      />
      <p>If additionally <strong>identically distributed</strong>:</p>
      <MathBlock
        math={"E[S] = k\\mu, \\qquad \\text{Var}(S) = k\\sigma^2"}
        display
      />

      <h4>Key Results: Sums from Common Families</h4>

      <p>
        The MGF method makes proving these results straightforward. If{' '}
        <MathBlock math={"X_1, \\ldots, X_k"} /> are independent, then{' '}
        <MathBlock math={"M_S(t) = \\prod M_{X_i}(t)"} />. If the product simplifies to
        a recognisable MGF, the uniqueness property identifies the distribution.
      </p>

      <Theorem id="thm-sum-normal" title="Sum of Independent Normals">
        <p>
          If <MathBlock math={"X_i \\sim N(\\mu_i, \\sigma_i^2)"} /> independently, then:
        </p>
        <MathBlock
          math={"\\sum_{i=1}^k X_i \\sim N\\!\\left(\\sum_{i=1}^k \\mu_i, \\; \\sum_{i=1}^k \\sigma_i^2\\right)"}
          display
        />
      </Theorem>

      <Proof title="Proof via MGF">
        <MathBlock
          math={"M_S(t) = \\prod_{i=1}^k e^{\\mu_i t + \\frac{1}{2}\\sigma_i^2 t^2} = \\exp\\!\\left(\\left(\\sum \\mu_i\\right)t + \\frac{1}{2}\\left(\\sum \\sigma_i^2\\right)t^2\\right)"}
          display
        />
        <p>
          This is the MGF of <MathBlock math={"N(\\sum \\mu_i, \\sum \\sigma_i^2)"} />.
          By uniqueness, <MathBlock math={"S"} /> has this distribution.{' '}
          <MathBlock math={"\\blacksquare"} />
        </p>
      </Proof>

      <Note>
        <strong>Important consequence:</strong> If{' '}
        <MathBlock math={"X_1, \\ldots, X_n \\stackrel{\\text{iid}}{\\sim} N(\\mu, \\sigma^2)"} />,
        then <MathBlock math={"\\bar{X} = \\frac{1}{n}\\sum X_i \\sim N(\\mu, \\sigma^2/n)"} />.
        The sample mean is still normal, with variance shrinking as{' '}
        <MathBlock math={"1/n"} />.
      </Note>

      <Theorem id="thm-sum-gamma" title="Sum of Independent Gammas (same θ)">
        <p>
          If <MathBlock math={"X_i \\sim \\text{Gamma}(\\theta, r_i)"} /> independently
          (same scale <MathBlock math={"\\theta"} />), then:
        </p>
        <MathBlock
          math={"\\sum_{i=1}^k X_i \\sim \\text{Gamma}\\!\\left(\\theta, \\; \\sum_{i=1}^k r_i\\right)"}
          display
        />
      </Theorem>

      <Proof title="Proof via MGF">
        <MathBlock
          math={"M_S(t) = \\prod_{i=1}^k \\left(\\frac{1}{1-\\theta t}\\right)^{r_i} = (1-\\theta t)^{-\\sum r_i}"}
          display
        />
        <p>
          which is the MGF of <MathBlock math={"\\text{Gamma}(\\theta, \\sum r_i)"} />.{' '}
          <MathBlock math={"\\blacksquare"} />
        </p>
      </Proof>

      <Note>
        <strong>Special cases:</strong>
        <ul>
          <li>
            <MathBlock math={"\\text{Exp}(\\lambda) = \\text{Gamma}(1/\\lambda, 1)"} />, so
            the sum of <MathBlock math={"k"} /> independent{' '}
            <MathBlock math={"\\text{Exp}(\\lambda)"} /> variables is{' '}
            <MathBlock math={"\\text{Gamma}(1/\\lambda, k)"} />.
          </li>
          <li>
            <MathBlock math={"\\chi^2(n) = \\text{Gamma}(2, n/2)"} />, so the sum of
            independent <MathBlock math={"\\chi^2(n_i)"} /> variables is{' '}
            <MathBlock math={"\\chi^2(\\sum n_i)"} />.
          </li>
        </ul>
      </Note>

      <Theorem id="thm-sum-chisq" title="Sum of Independent Chi-squareds">
        <p>
          If <MathBlock math={"X_i \\sim \\chi^2(n_i)"} /> independently, then:
        </p>
        <MathBlock
          math={"\\sum_{i=1}^k X_i \\sim \\chi^2\\!\\left(\\sum_{i=1}^k n_i\\right)"}
          display
        />
        <p>
          <strong>Fundamental consequence:</strong> If{' '}
          <MathBlock math={"Z_1, \\ldots, Z_n \\stackrel{\\text{iid}}{\\sim} N(0,1)"} />,
          then <MathBlock math={"\\sum_{i=1}^n Z_i^2 \\sim \\chi^2(n)"} />, since each{' '}
          <MathBlock math={"Z_i^2 \\sim \\chi^2(1)"} />.
        </p>
      </Theorem>

      <Theorem id="thm-sum-poisson" title="Sum of Independent Poissons">
        <p>
          If <MathBlock math={"X_i \\sim \\text{Poi}(\\lambda_i)"} /> independently, then:
        </p>
        <MathBlock
          math={"\\sum_{i=1}^k X_i \\sim \\text{Poi}\\!\\left(\\sum_{i=1}^k \\lambda_i\\right)"}
          display
        />
      </Theorem>

      <Proof title="Proof via MGF">
        <MathBlock
          math={"M_S(t) = \\prod_{i=1}^k e^{\\lambda_i(e^t-1)} = e^{(\\sum \\lambda_i)(e^t-1)}"}
          display
        />
        <p>
          This is the MGF of <MathBlock math={"\\text{Poi}(\\sum \\lambda_i)"} />.{' '}
          <MathBlock math={"\\blacksquare"} />
        </p>
      </Proof>

      <Theorem id="thm-sum-binomial" title="Sum of Independent Binomials (same p)">
        <p>
          If <MathBlock math={"X_i \\sim \\text{Bin}(n_i, p)"} /> independently
          (same <MathBlock math={"p"} />), then:
        </p>
        <MathBlock
          math={"\\sum_{i=1}^k X_i \\sim \\text{Bin}\\!\\left(\\sum_{i=1}^k n_i, \\; p\\right)"}
          display
        />
      </Theorem>

      <Example title="Exercise 6.17 — Application: Sum of Gammas">
        <p>
          Let <MathBlock math={"T_i \\sim \\text{Gamma}(100, s_i)"} /> be the time for task{' '}
          <MathBlock math={"i"} /> (with common scale <MathBlock math={"\\theta = 100"} />
          and shape <MathBlock math={"s_i"} />). The total time for 5 tasks is{' '}
          <MathBlock math={"T = \\sum_{i=1}^5 T_i"} />.
        </p>
        <p><strong>(a)</strong> By the Gamma sum theorem:</p>
        <MathBlock
          math={"M_T(t) = \\prod_{i=1}^5 \\left(\\frac{1}{1-100t}\\right)^{s_i} = \\left(\\frac{1}{1-100t}\\right)^{\\sum s_i}"}
          display
        />
        <p>
          If all <MathBlock math={"s_i"} /> are equal to some <MathBlock math={"s"} />,
          then <MathBlock math={"T \\sim \\text{Gamma}(100, 5s)"} />.
        </p>
        <p>
          <strong>(b)</strong> If <MathBlock math={"T \\sim \\text{Gamma}(100, 20)"} />, then{' '}
          <MathBlock math={"W = \\frac{T}{50} \\sim \\chi^2(40)"} /> (by the
          Gamma-to-chi-squared relationship).
        </p>
        <MathBlock
          math={"P[T < 2600] = P[W < 52] = P[\\chi^2(40) < 52] \\approx 0.9"}
          display
        />
      </Example>

      <Example title="Exercise 6.24 — Difference of Independent Normals">
        <p>
          Let <MathBlock math={"X_1 \\sim N(5000, 28^2)"} /> and{' '}
          <MathBlock math={"X_2 \\sim N(5000, 45^2)"} />, independent.
        </p>
        <p>
          Since a linear combination of independent normals is normal:
        </p>
        <MathBlock
          math={"X_1 - X_2 \\sim N(5000 - 5000, \\; 28^2 + 45^2) = N(0, \\; 2809)"}
          display
        />
        <MathBlock
          math={"P(X_1 > X_2 + 18) = P(X_1 - X_2 > 18) = P\\!\\left(Z > \\frac{18}{\\sqrt{2809}}\\right) = P(Z > 0.34) \\approx 0.367"}
          display
        />
      </Example>

      <h4>Summary Table: Which Families Are Closed Under Summation?</h4>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Family</th>
              <th>Condition</th>
              <th>Sum distribution</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><MathBlock math={"N(\\mu_i, \\sigma_i^2)"} /></td>
              <td>Independent</td>
              <td><MathBlock math={"N(\\sum \\mu_i, \\sum \\sigma_i^2)"} /></td>
            </tr>
            <tr>
              <td><MathBlock math={"\\text{Gamma}(\\theta, r_i)"} /></td>
              <td>Independent, same <MathBlock math={"\\theta"} /></td>
              <td><MathBlock math={"\\text{Gamma}(\\theta, \\sum r_i)"} /></td>
            </tr>
            <tr>
              <td><MathBlock math={"\\text{Exp}(\\lambda)"} /></td>
              <td>i.i.d.</td>
              <td><MathBlock math={"\\text{Gamma}(1/\\lambda, k)"} /></td>
            </tr>
            <tr>
              <td><MathBlock math={"\\chi^2(n_i)"} /></td>
              <td>Independent</td>
              <td><MathBlock math={"\\chi^2(\\sum n_i)"} /></td>
            </tr>
            <tr>
              <td><MathBlock math={"\\text{Poi}(\\lambda_i)"} /></td>
              <td>Independent</td>
              <td><MathBlock math={"\\text{Poi}(\\sum \\lambda_i)"} /></td>
            </tr>
            <tr>
              <td><MathBlock math={"\\text{Bin}(n_i, p)"} /></td>
              <td>Independent, same <MathBlock math={"p"} /></td>
              <td><MathBlock math={"\\text{Bin}(\\sum n_i, p)"} /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <Note>
        The <strong>Exponential family is not closed</strong> under summation of variables
        with different rates. If <MathBlock math={"X \\sim \\text{Exp}(\\lambda_1)"} /> and{' '}
        <MathBlock math={"Y \\sim \\text{Exp}(\\lambda_2)"} /> with{' '}
        <MathBlock math={"\\lambda_1 \\neq \\lambda_2"} />, their sum is{' '}
        <em>not</em> Gamma (because the scale parameters differ).
      </Note>

      {/* ════════════════════════════════════════════
          WORKED QUESTIONS
          ════════════════════════════════════════════ */}
      <h3>Worked Questions</h3>

      <WorkedQuestion
        source="Exercise 6.1 (parts a–c)"
        difficulty="easy"
        solution={
          <>
            <p><strong>(a)</strong> <MathBlock math={"Y = X^4"} />, where <MathBlock math={"X \\sim \\text{Unif}(0,1)"} /> with <MathBlock math={"f_X(x) = 1"} /> for <MathBlock math={"0 < x < 1"} />.</p>
            <MathBlock
              math={"P[Y \\leq y] = P[X^4 \\leq y] = P[X \\leq y^{1/4}] = y^{1/4}"}
              display
            />
            <MathBlock
              math={"f_Y(y) = \\frac{1}{4}y^{-3/4}, \\quad 0 < y < 1"}
              display
            />

            <p><strong>(b)</strong> <MathBlock math={"W = e^X"} />, where <MathBlock math={"X \\sim \\text{Unif}(0,1)"} />.</p>
            <MathBlock
              math={"P[W \\leq w] = P[e^X \\leq w] = P[X \\leq \\ln w] = \\ln w, \\quad 1 < w < e"}
              display
            />
            <MathBlock
              math={"f_W(w) = \\frac{1}{w}, \\quad 1 < w < e"}
              display
            />

            <p><strong>(c)</strong> <MathBlock math={"Z = \\log X"} />, where <MathBlock math={"X \\sim \\text{Exp}(1)"} />.</p>
            <p>
              Since <MathBlock math={"X > 0"} />, we have <MathBlock math={"Z \\in (-\\infty, \\infty)"} />.{' '}
              Inverse: <MathBlock math={"X = e^Z"} />, <MathBlock math={"dx/dz = e^z"} />.
            </p>
            <MathBlock
              math={"f_Z(z) = f_X(e^z) \\cdot e^z = e^{-e^z} \\cdot e^z = e^{z} e^{-e^z} = 4e^{4z}, \\quad -\\infty < z < \\infty"}
              display
            />
            <p>
              Wait — let's redo this carefully. <MathBlock math={"f_X(x) = e^{-x}"} /> for <MathBlock math={"x > 0"} />.
            </p>
            <MathBlock
              math={"f_Z(z) = f_X(e^z) \\cdot |e^z| = e^{-e^z} \\cdot e^z, \\quad -\\infty < z < \\infty"}
              display
            />
            <p>This is a Gumbel distribution (Type I extreme value).</p>
          </>
        }
      >
        <p>
          Use the CDF method or transformation method to find the pdf of the following:
        </p>
        <ol type="a">
          <li><MathBlock math={"Y = X^4"} /> where <MathBlock math={"X \\sim \\text{Unif}(0,1)"} /></li>
          <li><MathBlock math={"W = e^X"} /> where <MathBlock math={"X \\sim \\text{Unif}(0,1)"} /></li>
          <li><MathBlock math={"Z = \\log X"} /> where <MathBlock math={"X \\sim \\text{Exp}(1)"} /></li>
        </ol>
      </WorkedQuestion>

      <WorkedQuestion
        source="Exercise 6.11 (adapted)"
        difficulty="medium"
        solution={
          <>
            <p>
              We want the pdf of <MathBlock math={"W = X + Y"} /> where{' '}
              <MathBlock math={"X, Y \\stackrel{\\text{iid}}{\\sim} \\text{Exp}(1)"} />.
            </p>
            <p><strong>Using auxiliary variable:</strong> Let <MathBlock math={"V = X"} /> and <MathBlock math={"W = X + Y"} />.</p>
            <p><strong>Inverse:</strong> <MathBlock math={"X = V, \\; Y = W - V"} />.</p>
            <MathBlock
              math={"J = \\det\\begin{pmatrix} 1 & 0 \\\\ -1 & 1 \\end{pmatrix} = 1"}
              display
            />
            <p><strong>Support:</strong> <MathBlock math={"0 \\leq V \\leq W"} /> (since <MathBlock math={"Y = W-V \\geq 0"} />).</p>
            <MathBlock
              math={"f_{V,W}(v,w) = e^{-v} \\cdot e^{-(w-v)} \\cdot 1 = e^{-w}, \\quad 0 \\leq v \\leq w"}
              display
            />
            <p><strong>Marginalise out <MathBlock math={"V"} />:</strong></p>
            <MathBlock
              math={"f_W(w) = \\int_0^w e^{-w}\\,dv = we^{-w}, \\quad w \\geq 0 \\quad \\Longrightarrow \\quad W \\sim \\text{Gamma}(1, 2)"}
              display
            />

            <p><strong>Alternative: MGF method.</strong></p>
            <MathBlock
              math={"M_W(t) = M_X(t) \\cdot M_Y(t) = \\frac{1}{1-t} \\cdot \\frac{1}{1-t} = \\frac{1}{(1-t)^2}"}
              display
            />
            <p>
              This is the MGF of <MathBlock math={"\\text{Gamma}(1, 2)"} />. ✓
            </p>
          </>
        }
      >
        <p>
          Let <MathBlock math={"X, Y \\stackrel{\\text{iid}}{\\sim} \\text{Exp}(1)"} />.
          Find the distribution of <MathBlock math={"W = X + Y"} /> using{' '}
          (a) the transformation method with an auxiliary variable, and{' '}
          (b) the MGF method.
        </p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Exercise 6.4 (CDF method with split cases)"
        difficulty="hard"
        solution={
          <>
            <p>
              We have <MathBlock math={"f_{X,Y}(x,y) = \\frac{1}{2}"} /> on{' '}
              <MathBlock math={"\\{(x,y) : 0 \\leq x \\leq 1, 0 \\leq y \\leq 1-\\frac{1}{4}x\\}"} />,
              and <MathBlock math={"W = Y/X"} />.
            </p>
            <p>
              <strong>Support of <MathBlock math={"W"} />:</strong> Since{' '}
              <MathBlock math={"Y"} /> can be up to <MathBlock math={"1-x/4"} /> and{' '}
              <MathBlock math={"X"} /> ranges from 0 to 1, <MathBlock math={"W"} /> ranges
              from 0 to <MathBlock math={"\\infty"} /> (when <MathBlock math={"x"} /> is
              near 0, <MathBlock math={"y/x"} /> can be very large).
            </p>
            <p><strong>CDF method:</strong> <MathBlock math={"F_W(w) = P(Y \\leq wX)"} />.</p>
            <p>
              The line <MathBlock math={"y = wx"} /> intersects the boundary{' '}
              <MathBlock math={"y = 1-x/4"} /> at{' '}
              <MathBlock math={"x = \\frac{4}{4w+1}"} />. The integration splits into cases depending
              on where this intersection falls relative to the support:
            </p>
            <MathBlock
              math={"F_W(w) = 1 - \\frac{1}{4w+1}, \\quad w \\geq 0"}
              display
            />
            <p>Differentiating:</p>
            <MathBlock
              math={"f_W(w) = \\frac{4}{(4w+1)^2}, \\quad w > 0"}
              display
            />
          </>
        }
      >
        <p>
          Let <MathBlock math={"f_{X,Y}(x,y) = \\frac{1}{2}"} /> on{' '}
          <MathBlock math={"\\{0 \\leq x \\leq 1, \\; 0 \\leq y \\leq 1 - \\frac{1}{4}x\\}"} />.
          Find the pdf of <MathBlock math={"W = Y/X"} />.
        </p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Exercise 6.14 (MGF identification)"
        difficulty="medium"
        solution={
          <>
            <p>
              <strong>(a)</strong> Let <MathBlock math={"X_1, X_2 \\stackrel{\\text{iid}}{\\sim} \\chi^2(1)"} />.
              Then <MathBlock math={"U = X_1 + X_2"} /> has MGF:
            </p>
            <MathBlock
              math={"M_U(t) = (1-2t)^{-1/2} \\cdot (1-2t)^{-1/2} = (1-2t)^{-1}"}
              display
            />
            <p>
              This is the MGF of <MathBlock math={"\\text{Gamma}(2, 1) = \\text{Exp}(1/2)"} />.
              So <MathBlock math={"U \\sim \\text{Gamma}(2, 1)"} />, which is the same as{' '}
              <MathBlock math={"\\chi^2(2) \\sim \\text{Exp}(1/2)"} />.
            </p>
            <p>
              Alternatively, using the CDF method: <MathBlock math={"f_U(u) = \\frac{1}{2}e^{-u/2}"} /> for <MathBlock math={"u > 0"} />.
            </p>

            <p>
              <strong>(b)</strong> Define <MathBlock math={"Y = \\sqrt{U}"} />.
              Inverse: <MathBlock math={"U = Y^2"} />,{' '}
              <MathBlock math={"du/dy = 2y"} />.
            </p>
            <MathBlock
              math={"f_Y(y) = f_U(y^2) \\cdot 2y = \\frac{1}{2}e^{-y^2/2} \\cdot 2y = ye^{-y^2/2}, \\quad y > 0"}
              display
            />
            <p>This is a <strong>Rayleigh distribution</strong>.</p>
          </>
        }
      >
        <p>
          Let <MathBlock math={"X_1, X_2 \\stackrel{\\text{iid}}{\\sim} \\chi^2(1)"} />.
        </p>
        <ol type="a">
          <li>
            Find the distribution of <MathBlock math={"U = X_1 + X_2"} />.
          </li>
          <li>
            Find the pdf of <MathBlock math={"Y = \\sqrt{U} = \\sqrt{X_1^2 + X_2^2}"} />{' '}
            (where <MathBlock math={"X_i = Z_i^2"} /> for <MathBlock math={"Z_i \\sim N(0,1)"} />).
          </li>
        </ol>
      </WorkedQuestion>
    </>
  )
}
