import MathBlock from '../components/MathBlock'
import Definition from '../components/Definition'
import Theorem from '../components/Theorem'
import Proof from '../components/Proof'
import Example from '../components/Example'
import Note from '../components/Note'
import WorkedQuestion from '../components/WorkedQuestion'

export default function Topic2JointContinuous() {
  return (
    <>
      <p>
        In Topic 1 we handled pairs of <em>discrete</em> random variables — variables that take
        values from countable sets. Now we move to the <strong>continuous</strong> case, where{" "}
        <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> can take any value in some region
        of <MathBlock math={"\\mathbb{R}^2"} />. The key ideas are the same (joint pdf, marginals,
        CDF), but sums become integrals and probability tables become density functions over
        regions of the plane.
      </p>

      <h3>Joint PDF for Continuous Random Variables</h3>

      <p>
        For a single continuous variable, the pdf <MathBlock math={"f_X(x)"} /> is not a
        probability itself — it is a <em>density</em>, and you integrate it to get probabilities.
        The same holds in two dimensions: the joint pdf{" "}
        <MathBlock math={"f_{X,Y}(x,y)"} /> gives the density of probability at the point{" "}
        <MathBlock math={"(x,y)"} />, and you integrate over a region to get the probability of
        landing in that region.
      </p>

      <Definition id="def-joint-continuous-pdf" title="Joint PDF — Continuous Case (Def. 5.4)">
        <p>
          The random variables <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> are{" "}
          <strong>jointly continuous</strong> if there exists a function{" "}
          <MathBlock math={"f_{X,Y}(x, y)"} /> such that for every region{" "}
          <MathBlock math={"A \\subseteq \\mathbb{R}^2"} />:
        </p>
        <MathBlock
          math={"P\\big((X,Y) \\in A\\big) = \\iint_A f_{X,Y}(x,y)\\, dx\\, dy"}
          display
        />
        <p>
          The function <MathBlock math={"f_{X,Y}"} /> is called the{" "}
          <strong>joint probability density function</strong>.
        </p>
      </Definition>

      <Note>
        <p>
          Unlike the discrete case, <MathBlock math={"f_{X,Y}(x,y)"} /> is <em>not</em> a
          probability. It can even be greater than 1 at some points. What matters is that when you
          integrate it over any region, the result is a valid probability between 0 and 1.
        </p>
      </Note>

      <Theorem id="thm-valid-continuous-pdf" title="Valid Joint PDF — Continuous (Thm. 5.3)">
        <p>
          A function <MathBlock math={"f_{X,Y}(x,y)"} /> is a valid joint pdf if and only if:
        </p>
        <MathBlock
          math={"\\text{1. } f_{X,Y}(x,y) \\geq 0 \\quad \\text{for all } (x,y)"}
          display
        />
        <MathBlock
          math={"\\text{2. } \\int_{-\\infty}^{\\infty} \\int_{-\\infty}^{\\infty} f_{X,Y}(x,y)\\, dx\\, dy = 1"}
          display
        />
      </Theorem>

      <Note>
        <p>
          These are the continuous analogues of Theorem 5.1 from the discrete case. Non-negativity
          and total probability equals 1. To verify a given function is a valid pdf, check both
          conditions. Often you are given <MathBlock math={"f_{X,Y}(x,y) = c \\cdot g(x,y)"} />{" "}
          and asked to find <MathBlock math={"c"} /> — set the double integral equal to 1 and
          solve.
        </p>
      </Note>

      <h3>The Support Region</h3>

      <p>
        The <strong>support</strong> of the joint pdf is the set of{" "}
        <MathBlock math={"(x,y)"} /> values where{" "}
        <MathBlock math={"f_{X,Y}(x,y) > 0"} />. Outside the support, the density is zero.
        When computing probabilities or expectations via double integrals, the support determines
        the limits of integration. <strong>Always draw the support first</strong> — this is the
        single most important step in any continuous joint distribution problem.
      </p>

      <Example title="Triangular Support">
        <p>
          Consider <MathBlock math={"f_{X,Y}(x,y) = \\tfrac{1}{2}"} /> for{" "}
          <MathBlock math={"x > 0, y > 0, x + y < 2"} />.
        </p>
        <p>
          The support is the triangle with vertices{" "}
          <MathBlock math={"(0,0), (2,0), (0,2)"} />. The density is constant (uniform) over this
          triangle. The area of the triangle is{" "}
          <MathBlock math={"\\tfrac{1}{2} \\cdot 2 \\cdot 2 = 2"} />, so the total integral
          is <MathBlock math={"\\tfrac{1}{2} \\cdot 2 = 1"} />. Valid pdf.
        </p>
      </Example>

      <h3>Relationship Between CDF and PDF</h3>

      <p>
        In the univariate case, you know that{" "}
        <MathBlock math={"F_X(x) = \\int_{-\\infty}^{x} f_X(t)\\, dt"} /> and{" "}
        <MathBlock math={"f_X(x) = F_X'(x)"} />. In two dimensions, the relationship uses
        double integrals and partial derivatives:
      </p>

      <Definition id="def-joint-continuous-cdf" title="Joint CDF — Continuous (Def. 5.5)">
        <p>
          The <strong>joint CDF</strong> of continuous random variables{" "}
          <MathBlock math={"(X,Y)"} /> is:
        </p>
        <MathBlock
          math={"F_{X,Y}(x,y) = P(X \\leq x, Y \\leq y) = \\int_{-\\infty}^{y} \\int_{-\\infty}^{x} f_{X,Y}(s,t)\\, ds\\, dt"}
          display
        />
        <p>Conversely, the pdf can be recovered from the CDF by differentiating:</p>
        <MathBlock
          math={"f_{X,Y}(x,y) = \\frac{\\partial^2 F_{X,Y}(x,y)}{\\partial x\\, \\partial y}"}
          display
        />
      </Definition>

      <Note>
        <p>
          The CDF accumulates probability from <MathBlock math={"-\\infty"} /> up to the point{" "}
          <MathBlock math={"(x,y)"} />. Integration goes "up to" the point (CDF → accumulate);
          differentiation "unpeels" the accumulated probability (CDF → pdf). These two operations
          are inverses of each other, just as in the single-variable case.
        </p>
      </Note>

      <h3>Marginal PDFs — Continuous Case</h3>

      <p>
        To get the distribution of <MathBlock math={"X"} /> alone, integrate out{" "}
        <MathBlock math={"Y"} /> (and vice versa). This is the continuous analogue of summing
        rows/columns in a probability table.
      </p>

      <Definition id="def-marginal-continuous" title="Marginal PDFs — Continuous (Def. 5.6)">
        <p>
          If <MathBlock math={"(X,Y)"} /> is a continuous pair with joint pdf{" "}
          <MathBlock math={"f_{X,Y}(x,y)"} />, the <strong>marginal pdf's</strong> are:
        </p>
        <MathBlock
          math={"f_X(x) = \\int_{-\\infty}^{\\infty} f_{X,Y}(x,y)\\, dy"}
          display
        />
        <MathBlock
          math={"f_Y(y) = \\int_{-\\infty}^{\\infty} f_{X,Y}(x,y)\\, dx"}
          display
        />
      </Definition>

      <Note>
        <p>
          The limits of integration depend on the support. In practice, the density is zero outside
          the support, so you only integrate over the values of <MathBlock math={"y"} /> (or{" "}
          <MathBlock math={"x"} />) for which the density is non-zero. This is why drawing the
          support is essential — it tells you the actual integration bounds.
        </p>
      </Note>

      <Example title="Example — Uniform on a Triangle (§5.2)">
        <p>
          Let <MathBlock math={"f_{X,Y}(x,y) = \\tfrac{1}{2}"} /> for{" "}
          <MathBlock math={"0 < x < 2,\\, 0 < y < 2 - x"} /> (the triangle below the line{" "}
          <MathBlock math={"y = 2 - x"} /> in the first quadrant).
        </p>
        <p>To find <MathBlock math={"f_X(x)"} />, integrate over the valid range of <MathBlock math={"y"} />:</p>
        <MathBlock
          math={"f_X(x) = \\int_0^{2-x} \\tfrac{1}{2}\\, dy = \\tfrac{1}{2}(2 - x) = 1 - \\tfrac{x}{2}, \\quad 0 < x < 2"}
          display
        />
        <p>
          Similarly, for any fixed <MathBlock math={"y"} />, <MathBlock math={"x"} /> ranges
          from 0 to <MathBlock math={"2 - y"} />:
        </p>
        <MathBlock
          math={"f_Y(y) = \\int_0^{2-y} \\tfrac{1}{2}\\, dx = \\tfrac{1}{2}(2 - y) = 1 - \\tfrac{y}{2}, \\quad 0 < y < 2"}
          display
        />
        <p>
          Both marginals are valid pdf's (non-negative, integrate to 1 over their support). Notice
          these are <em>not</em> uniform — even though the joint distribution is uniform over the
          triangle, the marginals are triangular.
        </p>
      </Example>

      <Example title="Homework 5.9 — Finding k and Marginals">
        <p>
          Given <MathBlock math={"f_{X,Y}(x,y) = kxy"} /> for{" "}
          <MathBlock math={"0 < y < \\tfrac{x}{2}"} /> and{" "}
          <MathBlock math={"0 < x < 2"} />.
        </p>
        <p>
          <strong>Find k:</strong> The support is the triangle with vertices{" "}
          <MathBlock math={"(0,0), (2,0), (2,1)"} />. Set the total integral to 1:
        </p>
        <MathBlock
          math={"\\int_0^2 \\int_0^{x/2} kxy\\, dy\\, dx = k \\int_0^2 x \\left[\\tfrac{1}{2}y^2\\right]_0^{x/2} dx = k \\int_0^2 \\tfrac{x^3}{8}\\, dx = k \\cdot \\tfrac{1}{8} \\cdot \\tfrac{x^4}{4}\\Big|_0^2 = \\tfrac{k}{2} = 1"}
          display
        />
        <p>
          So <MathBlock math={"k = 2"} />.
        </p>
      </Example>

      <h3>Computing Probabilities</h3>

      <p>
        To find <MathBlock math={"P\\big((X,Y) \\in A\\big)"} />, integrate the joint pdf over
        region <MathBlock math={"A"} />. The tricky part is setting up the integration limits
        correctly. The procedure:
      </p>
      <ol>
        <li><strong>Draw the support</strong> of <MathBlock math={"f_{X,Y}"} />.</li>
        <li><strong>Draw the region</strong> <MathBlock math={"A"} /> you want the probability of.</li>
        <li><strong>Find the intersection</strong> — you only integrate where both the support and <MathBlock math={"A"} /> overlap.</li>
        <li><strong>Choose integration order</strong> and determine bounds.</li>
      </ol>

      <Example title="Homework 5.13 — P(X {'<'} Y)">
        <p>
          Given <MathBlock math={"f_{X,Y}(x,y) = k"} /> for{" "}
          <MathBlock math={"\\sqrt{y} \\leq x \\leq 5"} /> and{" "}
          <MathBlock math={"0 \\leq y \\leq 9"} />.
        </p>
        <p>
          After finding <MathBlock math={"k = \\tfrac{1}{27}"} /> (from the total integral), to
          compute <MathBlock math={"P(X < Y)"} />:
        </p>
        <MathBlock
          math={"P(X < Y) = \\frac{1}{27}\\left[\\int_1^{5} \\int_x^9 dy\\, dx + \\int_5^9 \\int_{\\sqrt{y}}^5 \\cdots \\right]"}
          display
        />
        <p>
          The key insight: draw the support, draw the line <MathBlock math={"y = x"} />,
          and find where they intersect. Split the integral accordingly. The answer is{" "}
          <MathBlock math={"\\tfrac{44}{81}"} />.
        </p>
      </Example>

      <h3>Multivariate Continuous Distributions</h3>

      <p>
        Everything extends to <MathBlock math={"k"} /> dimensions. For a{" "}
        <MathBlock math={"k"} />-dimensional continuous random vector{" "}
        <MathBlock math={"\\vec{X} = (X_1, \\ldots, X_k)"} />:
      </p>
      <ul>
        <li>
          <strong>Joint pdf:</strong>{" "}
          <MathBlock math={"f_{\\vec{X}}(\\vec{x}) \\geq 0"} /> and{" "}
          <MathBlock math={"\\int \\cdots \\int f_{\\vec{X}}(\\vec{x})\\, dx_1 \\cdots dx_k = 1"} />
        </li>
        <li>
          <strong>Marginal of <MathBlock math={"X_j"} />:</strong> integrate the joint pdf over
          all other variables.
        </li>
        <li>
          <strong>Joint CDF:</strong>{" "}
          <MathBlock math={"F_{\\vec{X}}(\\vec{x}) = P(X_1 \\leq x_1, \\ldots, X_k \\leq x_k)"} />
        </li>
      </ul>

      <WorkedQuestion
        source="Homework 5.15"
        difficulty="easy"
        solution={
          <>
            <p>
              <strong>Step 1: Find k.</strong> Integrate the joint pdf over the support{" "}
              <MathBlock math={"1 < x < 2,\\, 2 < y < 4"} />:
            </p>
            <MathBlock
              math={"\\int_1^2 \\int_2^4 k\\, dy\\, dx = k \\cdot 1 \\cdot 2 = 2k = 1 \\implies k = \\tfrac{1}{2}"}
              display
            />
            <p>
              <strong>Step 2: Find <MathBlock math={"f_X(x)"} />.</strong> Integrate out{" "}
              <MathBlock math={"y"} />:
            </p>
            <MathBlock
              math={"f_X(x) = \\int_2^4 \\tfrac{1}{2}\\, dy = 1 \\quad \\text{for } 1 < x < 2"}
              display
            />
            <p>
              So <MathBlock math={"X \\sim \\text{Unif}(1,2)"} />.
            </p>
            <p>
              <strong>Step 3: Find <MathBlock math={"f_Y(y)"} />.</strong> Integrate out{" "}
              <MathBlock math={"x"} />:
            </p>
            <MathBlock
              math={"f_Y(y) = \\int_1^2 \\tfrac{1}{2}\\, dx = \\tfrac{1}{2} \\quad \\text{for } 2 < y < 4"}
              display
            />
            <p>
              So <MathBlock math={"Y \\sim \\text{Unif}(2,4)"} />.
            </p>
          </>
        }
      >
        <p>
          Let <MathBlock math={"f_{X,Y}(x,y) = k"} /> for{" "}
          <MathBlock math={"1 < x < 2"} /> and <MathBlock math={"2 < y < 4"} />, and 0
          otherwise.
        </p>
        <p>
          (a) Find <MathBlock math={"k"} />.{" "}
          (b) Find the marginal pdf's of <MathBlock math={"X"} /> and{" "}
          <MathBlock math={"Y"} />.
        </p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Homework 5.11"
        difficulty="medium"
        solution={
          <>
            <p>
              <strong>Step 1: Verify it's a valid pdf.</strong> On{" "}
              <MathBlock math={"0 < x < 1, 0 < y < 1"} /> we have{" "}
              <MathBlock math={"f(x,y) = x + y \\geq 0"} />.
            </p>
            <MathBlock
              math={"\\int_0^1 \\int_0^1 (x+y)\\, dx\\, dy = \\int_0^1 \\left[\\tfrac{x^2}{2} + xy\\right]_0^1 dy = \\int_0^1 (\\tfrac{1}{2} + y)\\, dy = \\tfrac{1}{2} + \\tfrac{1}{2} = 1 \\; \\checkmark"}
              display
            />
            <p>
              <strong>Step 2: Compute the probability.</strong>
            </p>
            <MathBlock
              math={"P(X \\leq 0.5, Y \\leq 0.5) = \\int_0^{0.5} \\int_0^{0.5} (x+y)\\, dx\\, dy"}
              display
            />
            <MathBlock
              math={"= \\int_0^{0.5} \\left[\\tfrac{x^2}{2} + xy\\right]_0^{0.5} dy = \\int_0^{0.5} (\\tfrac{1}{8} + \\tfrac{y}{2})\\, dy = \\left[\\tfrac{y}{8} + \\tfrac{y^2}{4}\\right]_0^{0.5} = \\tfrac{1}{16} + \\tfrac{1}{16} = \\tfrac{1}{8} = 0.125"}
              display
            />
          </>
        }
      >
        <p>
          Let <MathBlock math={"f_{X,Y}(x,y) = x + y"} /> for{" "}
          <MathBlock math={"0 < x < 1, 0 < y < 1"} />.
        </p>
        <p>
          (a) Verify this is a valid joint pdf.{" "}
          (b) Find <MathBlock math={"P(X \\leq 0.5, Y \\leq 0.5)"} />.
        </p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Homework 5.10"
        difficulty="hard"
        solution={
          <>
            <p>
              <strong>Step 1: Draw the support.</strong> The support is the triangle{" "}
              <MathBlock math={"0 \\leq x \\leq y \\leq 1"} /> (below the line{" "}
              <MathBlock math={"y = x"} /> in the unit square).
            </p>
            <p>
              <strong>Step 2: Compute the CDF.</strong> For{" "}
              <MathBlock math={"0 \\leq x \\leq y \\leq 1"} />:
            </p>
            <MathBlock
              math={"F_{X,Y}(x,y) = P(X \\leq x, Y \\leq y) = \\int_0^y \\int_0^{\\min(x,v)} 4uv\\cdot 8\\, du\\, dv"}
              display
            />
            <p>
              We split into cases. When <MathBlock math={"x \\leq y"} /> (the typical exam case):
            </p>
            <MathBlock
              math={"F_{X,Y}(x,y) = 8\\int_0^x \\int_v^y uv\\, du\\, dv + \\text{(boundary terms)} = 2y^2x^2 - x^4"}
              display
            />
            <p>
              The CDF must be built piecewise for the different regions of the{" "}
              <MathBlock math={"(x,y)"} /> plane (including{" "}
              <MathBlock math={"x > y"} />, <MathBlock math={"x > 1"} />,{" "}
              <MathBlock math={"y > 1"} />, and the region outside the support).
            </p>
          </>
        }
      >
        <p>
          Let <MathBlock math={"f_{X,Y}(x,y) = 8xy"} /> for{" "}
          <MathBlock math={"0 < x < y < 1"} />. Find the joint CDF{" "}
          <MathBlock math={"F_{X,Y}(x,y)"} />.
        </p>
      </WorkedQuestion>
    </>
  )
}
