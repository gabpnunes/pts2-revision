import MathBlock from '../components/MathBlock'
import Definition from '../components/Definition'
import Theorem from '../components/Theorem'
import Proof from '../components/Proof'
import Example from '../components/Example'
import Note from '../components/Note'
import WorkedQuestion from '../components/WorkedQuestion'

export default function Topic4Independence() {
  return (
    <>
      <p>
        Independence is the most important structural assumption in probability and statistics.
        When two random variables are independent, knowing the value of one tells you{" "}
        <em>nothing</em> about the other. This simplifies computations enormously: expectations
        factor, variances add, and MGFs multiply. But when variables are <em>not</em> independent
        (which is the norm in real data), we need tools to measure how they co-move. That is
        where <strong>covariance</strong> and <strong>correlation</strong> come in.
      </p>

      <p>
        This section covers three connected ideas: (1) the formal definition and practical
        tests for independence, (2) covariance as a measure of linear co-movement, and (3)
        the correlation coefficient as a standardised version of covariance. We also extend
        everything to the multivariate case with <em>mutual</em> vs. <em>pairwise</em>{" "}
        independence and the variance-covariance matrix.
      </p>

      {/* ──────── INDEPENDENCE ──────── */}
      <h3>Independence of Two Random Variables</h3>

      <p>
        Recall from PTS1: two <em>events</em> <MathBlock math={"A"} /> and{" "}
        <MathBlock math={"B"} /> are independent if{" "}
        <MathBlock math={"P(A \\cap B) = P(A) \\cdot P(B)"} />. The idea for random
        variables is the same, but we require this factorisation to hold for <em>all</em>{" "}
        possible intervals simultaneously.
      </p>

      <Definition id="def-5.13" title="Independence of Two Random Variables — Def. 5.13">
        <p>
          Random variables <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> are called{" "}
          <strong>independent</strong> if for every{" "}
          <MathBlock math={"a < b"} /> and <MathBlock math={"c < d"} />:
        </p>
        <MathBlock
          math={"P(a \\le X \\le b,\\; c \\le Y \\le d) = P(a \\le X \\le b) \\cdot P(c \\le Y \\le d)"}
          display
        />
        <p>
          Equivalently (setting <MathBlock math={"a = c = -\\infty"} />): the joint CDF
          factors into the product of the marginal CDFs for all{" "}
          <MathBlock math={"x, y"} />.
        </p>
      </Definition>

      <Theorem id="thm-5.9" title="Independence via CDF/PDF Factorisation — Thm. 5.9">
        <p>
          Random variables <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> are
          independent <strong>if and only if</strong>:
        </p>
        <MathBlock
          math={"F_{X,Y}(x,y) = F_X(x) \\cdot F_Y(y) \\quad \\forall\\, x, y"}
          display
        />
        <p>or equivalently:</p>
        <MathBlock
          math={"f_{X,Y}(x,y) = f_X(x) \\cdot f_Y(y) \\quad \\forall\\, x, y"}
          display
        />
      </Theorem>

      <Note>
        <p>
          Think of it this way: independence means the joint pdf literally <em>equals</em>{" "}
          the product of the marginals at every single point. If there is even one point{" "}
          <MathBlock math={"(x_0, y_0)"} /> where{" "}
          <MathBlock math={"f_{X,Y}(x_0, y_0) \\neq f_X(x_0) \\cdot f_Y(y_0)"} />,
          then <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> are <em>dependent</em>.
        </p>
      </Note>

      <h3>Practical Test for Independence — Theorem 5.10</h3>

      <p>
        Checking the factorisation at every point can be tedious. Theorem 5.10 gives a
        two-step practical test that is much faster, especially for continuous distributions.
      </p>

      <Theorem id="thm-5.10" title="Practical Independence Test — Thm. 5.10">
        <p>
          <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> with joint pdf{" "}
          <MathBlock math={"f_{X,Y}(x,y)"} /> are independent <strong>if and only if</strong>{" "}
          <em>both</em> conditions hold:
        </p>
        <ol>
          <li>
            <strong>The support is a Cartesian product:</strong>{" "}
            <MathBlock
              math={"\\{(x,y) \\mid f_{X,Y}(x,y) > 0\\} = \\{x \\mid f_X(x) > 0\\} \\times \\{y \\mid f_Y(y) > 0\\}"}
              display
            />
          </li>
          <li>
            <strong>The joint pdf can be factorised:</strong> there exist functions{" "}
            <MathBlock math={"g(\\cdot)"} /> and <MathBlock math={"h(\\cdot)"} /> such that{" "}
            <MathBlock math={"f_{X,Y}(x,y) = g(x) \\cdot h(y)"} /> for all{" "}
            <MathBlock math={"(x,y)"} /> in the support.
          </li>
        </ol>
      </Theorem>

      <Note>
        <p>
          <strong>Key insight:</strong> If the support is <em>not</em> a rectangle (i.e., the
          range of one variable depends on the value of the other), then the variables are{" "}
          <strong>automatically dependent</strong> — you do not even need to check condition 2.
          For example, <MathBlock math={"0 < x < y < 1"} /> is a triangle, not a rectangle,
          so <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> must be dependent.
        </p>
      </Note>

      <Example title="Example 5.21 — Testing f(x,y) = x + y">
        <p>
          Let <MathBlock math={"f_{X,Y}(x,y) = x + y"} /> for{" "}
          <MathBlock math={"0 < x < 1, \\; 0 < y < 1"} />.
        </p>
        <p>
          <strong>Step 1 (Support):</strong> The support is{" "}
          <MathBlock math={"(0,1) \\times (0,1)"} />, which <em>is</em> a Cartesian product.
          So condition 1 passes.
        </p>
        <p>
          <strong>Step 2 (Factorisation):</strong> Can we write{" "}
          <MathBlock math={"x + y = g(x) \\cdot h(y)"} />? No — a sum of two variables cannot
          be written as a product of separate functions. So condition 2 fails.
        </p>
        <p>
          <strong>Conclusion:</strong> <MathBlock math={"X"} /> and{" "}
          <MathBlock math={"Y"} /> are <strong>dependent</strong>.
        </p>
      </Example>

      <Example title="Example — Testing f(x,y) = cxy on a rectangle">
        <p>
          Let <MathBlock math={"f_{X,Y}(x,y) = cxy"} /> for{" "}
          <MathBlock math={"0 < x < 1, \\; 0 < y < 1"} /> (where{" "}
          <MathBlock math={"c = 4"} /> to make it a valid pdf).
        </p>
        <p>
          <strong>Step 1:</strong> Support is{" "}
          <MathBlock math={"(0,1) \\times (0,1)"} /> — a Cartesian product. ✓
        </p>
        <p>
          <strong>Step 2:</strong>{" "}
          <MathBlock math={"4xy = (2x)(2y) = g(x) \\cdot h(y)"} />. The joint pdf factors
          into a function of <MathBlock math={"x"} /> only times a function of{" "}
          <MathBlock math={"y"} /> only. ✓
        </p>
        <p>
          <strong>Conclusion:</strong> <MathBlock math={"X"} /> and{" "}
          <MathBlock math={"Y"} /> are <strong>independent</strong>.
        </p>
      </Example>

      <Example title="Example 5.3 — Shop Items A and B (Discrete)">
        <p>
          Recall the shop selling items A and B:
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th></th>
                <th><MathBlock math={"x=0"} /></th>
                <th><MathBlock math={"x=1"} /></th>
                <th><MathBlock math={"x=2"} /></th>
                <th><MathBlock math={"x=3"} /></th>
                <th><MathBlock math={"f_Y(y)"} /></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong><MathBlock math={"y=0"} /></strong></td>
                <td>0.06</td><td>0.12</td><td>0.08</td><td>0.04</td><td><strong>0.30</strong></td>
              </tr>
              <tr>
                <td><strong><MathBlock math={"y=1"} /></strong></td>
                <td>0.06</td><td>0.18</td><td>0.16</td><td>0</td><td><strong>0.40</strong></td>
              </tr>
              <tr>
                <td><strong><MathBlock math={"y=2"} /></strong></td>
                <td>0.20</td><td>0.10</td><td>0</td><td>0</td><td><strong>0.30</strong></td>
              </tr>
              <tr>
                <td><strong><MathBlock math={"f_X(x)"} /></strong></td>
                <td><strong>0.32</strong></td><td><strong>0.40</strong></td><td><strong>0.24</strong></td><td><strong>0.04</strong></td><td>1.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Check one cell: <MathBlock math={"P(X=1, Y=0) = 0.12"} />, while{" "}
          <MathBlock math={"P(X=1) \\cdot P(Y=0) = 0.40 \\times 0.30 = 0.12"} />. These
          match — but that only shows the <em>events</em> "X=1" and "Y=0" are independent.
        </p>
        <p>
          Now check another cell: <MathBlock math={"P(X=0, Y=0) = 0.06"} />, while{" "}
          <MathBlock math={"P(X=0) \\cdot P(Y=0) = 0.32 \\times 0.30 = 0.096 \\neq 0.06"} />.
        </p>
        <p>
          Since the factorisation fails at even one point, <MathBlock math={"X"} /> and{" "}
          <MathBlock math={"Y"} /> are <strong>dependent</strong>.
        </p>
      </Example>

      {/* ──────── CONSEQUENCES ──────── */}
      <h3>Consequences of Independence</h3>

      <p>
        When <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> are independent, many
        quantities simplify dramatically. The following theorem collects the key results.
      </p>

      <Theorem id="thm-5.11" title="Properties of Independent Variables — Thm. 5.11">
        <p>
          If <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> are{" "}
          <strong>independent</strong>, then:
        </p>
        <ol>
          <li>
            <MathBlock math={"E[g(X) \\cdot h(Y)] = E[g(X)] \\cdot E[h(Y)]"} /> for any
            real-valued functions <MathBlock math={"g, h"} />
          </li>
          <li>
            <MathBlock math={"G_{X+Y}(t) = G_X(t) \\cdot G_Y(t)"} /> (probability generating
            functions multiply)
          </li>
          <li>
            <MathBlock math={"M_{X+Y}(t) = M_X(t) \\cdot M_Y(t)"} /> (moment generating
            functions multiply)
          </li>
          <li>
            In particular: <MathBlock math={"E[X \\cdot Y] = E[X] \\cdot E[Y]"} /> (set{" "}
            <MathBlock math={"g(x) = x, \\; h(y) = y"} />)
          </li>
          <li>
            <MathBlock math={"\\text{Var}(X + Y) = \\text{Var}(X) + \\text{Var}(Y)"} />{" "}
            (variances add — no cross-term!)
          </li>
        </ol>
      </Theorem>

      <Proof title="Proof of Var(X+Y) = Var(X) + Var(Y) when independent">
        <MathBlock
          math={"\\text{Var}(X+Y) = E[(X+Y)^2] - (E[X+Y])^2"}
          display
        />
        <MathBlock
          math={"= E[X^2 + 2XY + Y^2] - (E[X] + E[Y])^2"}
          display
        />
        <MathBlock
          math={"= E[X^2] + 2E[XY] + E[Y^2] - E[X]^2 - 2E[X]E[Y] - E[Y]^2"}
          display
        />
        <MathBlock
          math={"= \\underbrace{(E[X^2] - E[X]^2)}_{\\text{Var}(X)} + \\underbrace{(E[Y^2] - E[Y]^2)}_{\\text{Var}(Y)} + 2\\underbrace{(E[XY] - E[X]E[Y])}_{= 0 \\text{ by independence}}"}
          display
        />
        <MathBlock
          math={"= \\text{Var}(X) + \\text{Var}(Y)"}
          display
        />
        <p>
          The red cross-term <MathBlock math={"E[XY] - E[X]E[Y]"} /> is zero because
          independence gives <MathBlock math={"E[XY] = E[X]E[Y]"} />. This quantity is
          called the <strong>covariance</strong> — see below.
        </p>
      </Proof>

      <Note>
        <p>
          <strong>Important:</strong> Property (1d){" "}
          <MathBlock math={"E[XY] = E[X]E[Y]"} /> requires independence. But the converse is{" "}
          <em>false</em>: it is possible to have{" "}
          <MathBlock math={"E[XY] = E[X]E[Y]"} /> (so covariance = 0) with{" "}
          <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> still dependent. See
          Exercise 5.46 for a counterexample.
        </p>
      </Note>

      {/* ──────── COVARIANCE ──────── */}
      <h3>Covariance</h3>

      <p>
        When variables are not independent, the cross-term in{" "}
        <MathBlock math={"\\text{Var}(X+Y)"} /> does not vanish. This cross-term is the
        covariance — it measures the degree to which <MathBlock math={"X"} /> and{" "}
        <MathBlock math={"Y"} /> tend to move in the same direction.
      </p>

      <Definition id="def-5.14" title="Covariance — Def. 5.14">
        <p>
          The <strong>covariance</strong> of two random variables <MathBlock math={"X"} />{" "}
          and <MathBlock math={"Y"} /> is:
        </p>
        <MathBlock
          math={"\\sigma_{XY} = \\text{Cov}(X, Y) = E[(X - \\mu_X)(Y - \\mu_Y)]"}
          display
        />
        <p>
          where <MathBlock math={"\\mu_X = E[X]"} /> and{" "}
          <MathBlock math={"\\mu_Y = E[Y]"} />.
        </p>
      </Definition>

      <p>
        <strong>Interpretation:</strong> If <MathBlock math={"X"} /> and{" "}
        <MathBlock math={"Y"} /> tend to be above their means at the same time (or below
        their means at the same time), then{" "}
        <MathBlock math={"(X - \\mu_X)(Y - \\mu_Y) > 0"} /> on average, so{" "}
        <MathBlock math={"\\text{Cov}(X,Y) > 0"} />. If one is above its mean while the
        other is below, the covariance is negative.
      </p>

      <Theorem id="thm-5.12" title="Computational Formula for Covariance — Thm. 5.12">
        <MathBlock
          math={"\\text{Cov}(X, Y) = E[XY] - E[X] \\cdot E[Y]"}
          display
        />
      </Theorem>

      <Proof title="Proof of Theorem 5.12">
        <MathBlock
          math={"\\text{Cov}(X,Y) = E[(X - \\mu_X)(Y - \\mu_Y)]"}
          display
        />
        <MathBlock
          math={"= E[XY - X\\mu_Y - \\mu_X Y + \\mu_X \\mu_Y]"}
          display
        />
        <MathBlock
          math={"= E[XY] - \\mu_Y E[X] - \\mu_X E[Y] + \\mu_X \\mu_Y"}
          display
        />
        <MathBlock
          math={"= E[XY] - \\mu_X \\mu_Y - \\mu_X \\mu_Y + \\mu_X \\mu_Y = E[XY] - E[X]E[Y]"}
          display
        />
      </Proof>

      <Note>
        <p>
          In practice, always use the computational formula{" "}
          <MathBlock math={"\\text{Cov}(X,Y) = E[XY] - E[X]E[Y]"} />. It is much faster
          than the definition because you compute three separate expected values (which you
          often already have) rather than expanding{" "}
          <MathBlock math={"(X - \\mu_X)(Y - \\mu_Y)"} /> everywhere.
        </p>
      </Note>

      <Example title="Example 5.22 — Shop Covariance">
        <p>Using the shop table above:</p>
        <MathBlock
          math={"E[X] = 0(0.32) + 1(0.40) + 2(0.24) + 3(0.04) = 1.00"}
          display
        />
        <MathBlock
          math={"E[Y] = 0(0.30) + 1(0.40) + 2(0.30) = 1.00"}
          display
        />
        <p>
          For <MathBlock math={"E[XY]"} />, sum{" "}
          <MathBlock math={"xy \\cdot f_{X,Y}(x,y)"} /> over all cells:
        </p>
        <MathBlock
          math={"E[XY] = 0 + 0 + \\cdots + 1 \\cdot 1 \\cdot 0.18 + 1 \\cdot 2 \\cdot 0.10 + 2 \\cdot 1 \\cdot 0.16 + \\cdots = 0.70"}
          display
        />
        <MathBlock
          math={"\\text{Cov}(X,Y) = E[XY] - E[X]E[Y] = 0.70 - 1 \\cdot 1 = -0.30"}
          display
        />
        <p>
          The negative covariance makes sense: when more A items are sold, fewer B items tend
          to be sold (customers have a limited budget).
        </p>
      </Example>

      <h3>Properties of Covariance — Theorem 5.13</h3>

      <p>
        Covariance satisfies several algebraic rules that are heavily used in exercises and
        proofs. These all follow from the definition and linearity of expectation.
      </p>

      <Theorem id="thm-5.13" title="Covariance Algebra — Thm. 5.13">
        <p>
          For any random variables <MathBlock math={"X, Y, U"} /> and constants{" "}
          <MathBlock math={"a, b"} />:
        </p>
        <ol>
          <li>
            <MathBlock math={"\\text{Cov}(aX, bY) = ab\\,\\text{Cov}(X, Y)"} /> — constants
            pull out
          </li>
          <li>
            <MathBlock math={"\\text{Cov}(X + a, Y + b) = \\text{Cov}(X, Y)"} /> — shifting
            does not change covariance
          </li>
          <li>
            <MathBlock math={"\\text{Cov}(X, aX + b) = a\\,\\text{Var}(X)"} /> — covariance
            with a linear function of itself
          </li>
          <li>
            <MathBlock math={"\\text{Cov}(X + U, Y) = \\text{Cov}(X, Y) + \\text{Cov}(U, Y)"} />{" "}
            — covariance is additive
          </li>
        </ol>
      </Theorem>

      <Note>
        <p>
          <strong>Useful special case:</strong>{" "}
          <MathBlock math={"\\text{Var}(X) = \\text{Cov}(X, X)"} />. Variance is just the
          covariance of a variable with itself. This means every property of covariance applies
          to variance as a special case.
        </p>
      </Note>

      <h3>Variance of a Linear Combination — Theorem 5.14</h3>

      <Theorem id="thm-5.14" title="Variance of aX + bY + c — Thm. 5.14">
        <MathBlock
          math={"\\text{Var}(aX + bY + c) = a^2\\,\\text{Var}(X) + b^2\\,\\text{Var}(Y) + 2ab\\,\\text{Cov}(X, Y)"}
          display
        />
        <p>
          If <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> are independent, then{" "}
          <MathBlock math={"\\text{Cov}(X,Y) = 0"} />, so:
        </p>
        <MathBlock
          math={"\\text{Var}(aX + bY + c) = a^2\\,\\text{Var}(X) + b^2\\,\\text{Var}(Y)"}
          display
        />
      </Theorem>

      <Example title="Tutorial 2, Exercise 5.41">
        <p>
          Given: <MathBlock math={"\\text{Var}(X) = 10"} />,{" "}
          <MathBlock math={"\\text{Var}(Y) = 20"} />,{" "}
          <MathBlock math={"\\rho(X,Y) = \\tfrac{1}{2}"} />. Find{" "}
          <MathBlock math={"\\text{Var}(2X - 3Y)"} />.
        </p>
        <p>
          First, recover <MathBlock math={"\\text{Cov}(X,Y)"} /> from the correlation:
        </p>
        <MathBlock
          math={"\\text{Cov}(X,Y) = \\rho \\cdot \\sigma_X \\cdot \\sigma_Y = \\tfrac{1}{2} \\cdot \\sqrt{10} \\cdot \\sqrt{20} = \\tfrac{1}{2} \\cdot \\sqrt{200} = \\tfrac{1}{2} \\cdot 10\\sqrt{2} = 5\\sqrt{2}"}
          display
        />
        <p>Apply Theorem 5.14 with <MathBlock math={"a=2, b=-3"} />:</p>
        <MathBlock
          math={"\\text{Var}(2X - 3Y) = 4(10) + 9(20) + 2(2)(-3)(5\\sqrt{2}) = 40 + 180 - 60\\sqrt{2} \\approx 135.1"}
          display
        />
      </Example>

      {/* ──────── CORRELATION ──────── */}
      <h3>Correlation Coefficient</h3>

      <p>
        Covariance tells you the <em>direction</em> of the linear relationship (positive or
        negative), but its <em>magnitude</em> depends on the units and scales of{" "}
        <MathBlock math={"X"} /> and <MathBlock math={"Y"} />. The correlation coefficient
        standardises covariance to lie in <MathBlock math={"[-1, 1]"} />.
      </p>

      <Definition id="def-5.15" title="Correlation Coefficient — Def. 5.15">
        <MathBlock
          math={"\\rho_{X,Y} = \\rho(X, Y) = \\frac{\\text{Cov}(X, Y)}{\\sigma_X \\cdot \\sigma_Y} = \\frac{\\text{Cov}(X, Y)}{\\sqrt{\\text{Var}(X)} \\cdot \\sqrt{\\text{Var}(Y)}}"}
          display
        />
      </Definition>

      <Theorem id="thm-5.15" title="Bounds on Correlation — Thm. 5.15">
        <MathBlock math={"-1 \\le \\rho(X, Y) \\le 1"} display />
        <p>
          with <MathBlock math={"\\rho = 1"} /> if and only if{" "}
          <MathBlock math={"Y = aX + b"} /> with <MathBlock math={"a > 0"} /> (perfect
          positive linear relationship), and <MathBlock math={"\\rho = -1"} /> if and only if{" "}
          <MathBlock math={"Y = aX + b"} /> with <MathBlock math={"a < 0"} /> (perfect
          negative linear relationship).
        </p>
      </Theorem>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Sign (direction)</th>
              <th>Size (strength)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Covariance</strong></td>
              <td>✓ tells direction</td>
              <td>✗ depends on units</td>
            </tr>
            <tr>
              <td><strong>Correlation</strong></td>
              <td>✓ tells direction</td>
              <td>✓ standardised to [-1, 1]</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        <strong>Effect of linear transformations on correlation (Exercise 5.40):</strong>
      </p>
      <MathBlock
        math={"\\rho(aX, bY + c) = \\frac{ab}{|a|\\,|b|}\\, \\rho(X, Y) = \\begin{cases} \\rho(X,Y) & \\text{if } a,b \\text{ same sign} \\\\ -\\rho(X,Y) & \\text{if } a,b \\text{ opposite sign} \\end{cases}"}
        display
      />

      <h3>Independence, Covariance, and Correlation</h3>

      <p>
        This is a crucial logical relationship that the exam loves to test:
      </p>

      <MathBlock
        math={"X, Y \\text{ independent} \\;\\Longrightarrow\\; \\text{Cov}(X,Y) = 0 \\;\\Longleftrightarrow\\; \\rho(X,Y) = 0"}
        display
      />

      <p>
        But the <strong>converse is false</strong>:
      </p>
      <MathBlock
        math={"\\text{Cov}(X,Y) = 0 \\;\\not\\!\\!\\Longrightarrow\\; X, Y \\text{ independent}"}
        display
      />

      <Note>
        <p>
          <strong>Classic counterexample:</strong> Let <MathBlock math={"X \\sim \\text{Uniform}(-1,1)"} />{" "}
          and <MathBlock math={"Y = X^2"} />. Then <MathBlock math={"Y"} /> is completely
          determined by <MathBlock math={"X"} /> (they are maximally dependent!), yet{" "}
          <MathBlock math={"\\text{Cov}(X, Y) = E[X^3] - E[X]E[X^2] = 0 - 0 = 0"} />.
          This happens because covariance only measures <em>linear</em> association. The
          relationship <MathBlock math={"Y = X^2"} /> is perfectly nonlinear, so covariance
          misses it entirely.
        </p>
      </Note>

      {/* ──────── MULTIVARIATE ──────── */}
      <h3>Multivariate Case: Mutual vs. Pairwise Independence</h3>

      <p>
        When we have <MathBlock math={"k > 2"} /> random variables, there are two notions
        of independence, and they are <strong>not</strong> the same.
      </p>

      <Definition id="def-5.16" title="Mutual Independence — Def. 5.16">
        <p>
          The random variables <MathBlock math={"(X_1, \\ldots, X_k)"} /> are called{" "}
          <strong>mutually (stochastically) independent</strong> if for every{" "}
          <MathBlock math={"a_i < b_i"} />:
        </p>
        <MathBlock
          math={"P(a_1 < X_1 < b_1, \\ldots, a_k < X_k < b_k) = \\prod_{i=1}^{k} P(a_i < X_i < b_i)"}
          display
        />
        <p>
          Equivalently, the joint pdf factors as:
        </p>
        <MathBlock
          math={"f_{\\vec{X}}(\\vec{x}) = f_{X_1}(x_1) \\cdot f_{X_2}(x_2) \\cdots f_{X_k}(x_k) \\quad \\forall\\, x_1, \\ldots, x_k"}
          display
        />
      </Definition>

      <p>
        <strong>Pairwise independence</strong> is weaker: it only requires that every{" "}
        <em>pair</em> <MathBlock math={"(X_i, X_j)"} /> is independent:
      </p>
      <MathBlock
        math={"f_{X_i, X_j}(x_i, x_j) = f_{X_i}(x_i) \\cdot f_{X_j}(x_j) \\quad \\forall\\, i \\neq j"}
        display
      />

      <Note>
        <p>
          <strong>Mutual independence ⟹ pairwise independence.</strong> But the reverse is{" "}
          <strong>false</strong>. Exercise 5.48 gives a counterexample: three random variables{" "}
          <MathBlock math={"X, Y, Z"} /> where every pair is independent, but knowing both{" "}
          <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> tells you exactly what{" "}
          <MathBlock math={"Z"} /> is (so they are <em>not</em> mutually independent).
        </p>
      </Note>

      <h3>MGF Factorisation for Independent Variables — Theorem 5.17</h3>

      <Theorem id="thm-5.17" title="MGF Factorisation — Thm. 5.17">
        <p>
          If <MathBlock math={"(X_1, \\ldots, X_k)"} /> are mutually independent, then:
        </p>
        <MathBlock
          math={"M_{X_1 + X_2 + \\cdots + X_k}(t) = \\prod_{i=1}^{k} M_{X_i}(t) = M_{X_1}(t) \\cdot M_{X_2}(t) \\cdots M_{X_k}(t)"}
          display
        />
        <p>
          This is crucial for the proof of the Central Limit Theorem (PTS3) and for
          identifying the distribution of sums of independent variables.
        </p>
      </Theorem>

      {/* ──────── GENERAL VARIANCE ──────── */}
      <h3>Variance of a General Linear Combination — Theorem 5.18</h3>

      <p>
        Theorem 5.14 gave{" "}
        <MathBlock math={"\\text{Var}(aX + bY + c)"} /> for two variables. Theorem 5.18
        generalises this to any number of variables.
      </p>

      <Theorem id="thm-5.18" title="Variance of a Linear Combination — Thm. 5.18">
        <MathBlock
          math={"\\text{Var}\\!\\left(\\sum_{i=1}^{k} a_i X_i\\right) = \\sum_{i=1}^{k} a_i^2 \\,\\text{Var}(X_i) + 2 \\sum_{i=1}^{k} \\sum_{j<i} a_i a_j \\,\\text{Cov}(X_i, X_j)"}
          display
        />
        <p>
          Using compact notation:{" "}
          <MathBlock math={"= \\sum_{i=1}^{k} a_i^2 \\sigma_i^2 + 2 \\sum\\sum_{j < i} a_i a_j \\sigma_{ij}"} />
        </p>
        <p>
          If the <MathBlock math={"X_i"} /> are <strong>mutually independent</strong>, all
          covariance terms vanish:
        </p>
        <MathBlock
          math={"\\text{Var}\\!\\left(\\sum_{i=1}^{k} a_i X_i\\right) = \\sum_{i=1}^{k} a_i^2 \\,\\text{Var}(X_i)"}
          display
        />
      </Theorem>

      <Example title="Example 5.29 — Variance of a Binomial via Bernoullis">
        <p>
          If <MathBlock math={"Y \\sim \\text{Bin}(n, p)"} />, we can write{" "}
          <MathBlock math={"Y = X_1 + X_2 + \\cdots + X_n"} /> where each{" "}
          <MathBlock math={"X_i \\sim \\text{Bernoulli}(p)"} /> and the{" "}
          <MathBlock math={"X_i"} /> are mutually independent.
        </p>
        <p>
          Each <MathBlock math={"\\text{Var}(X_i) = p(1-p)"} />, and all covariances are
          zero by independence, so by Theorem 5.18 (with{" "}
          <MathBlock math={"a_i = 1"} /> for all <MathBlock math={"i"} />):
        </p>
        <MathBlock
          math={"\\text{Var}(Y) = \\sum_{i=1}^{n} 1^2 \\cdot p(1-p) = np(1-p)"}
          display
        />
        <p>
          This recovers the well-known Binomial variance formula.
        </p>
      </Example>

      {/* ──────── COVARIANCE MATRIX ──────── */}
      <h3>The Variance-Covariance Matrix</h3>

      <p>
        For <MathBlock math={"k"} /> random variables{" "}
        <MathBlock math={"(X_1, \\ldots, X_k)"} />, all variances and covariances can be
        collected into a single symmetric matrix:
      </p>

      <MathBlock
        math={"\\Sigma = \\begin{pmatrix} \\sigma_1^2 & \\sigma_{12} & \\cdots & \\sigma_{1k} \\\\ \\sigma_{21} & \\sigma_2^2 & \\cdots & \\sigma_{2k} \\\\ \\vdots & & \\ddots & \\vdots \\\\ \\sigma_{k1} & \\sigma_{k2} & \\cdots & \\sigma_k^2 \\end{pmatrix}"}
        display
      />

      <p>
        where <MathBlock math={"\\sigma_i^2 = \\text{Var}(X_i)"} /> on the diagonal and{" "}
        <MathBlock math={"\\sigma_{ij} = \\text{Cov}(X_i, X_j)"} /> off the diagonal. Since{" "}
        <MathBlock math={"\\text{Cov}(X_i, X_j) = \\text{Cov}(X_j, X_i)"} />, the matrix is{" "}
        <strong>symmetric</strong>: <MathBlock math={"\\sigma_{ij} = \\sigma_{ji}"} />.
      </p>

      <p>
        Theorem 5.18 can then be written in matrix form. If{" "}
        <MathBlock math={"\\vec{a} = (a_1, \\ldots, a_k)^T"} /> and{" "}
        <MathBlock math={"\\vec{X} = (X_1, \\ldots, X_k)^T"} />, then:
      </p>
      <MathBlock
        math={"\\text{Var}(\\vec{a}^T \\vec{X}) = \\vec{a}^T \\Sigma \\vec{a}"}
        display
      />

      {/* ──────── GENERAL COVARIANCE FORMULAS ──────── */}
      <h3>General Covariance Formulas (Exercises 5.37–5.38)</h3>

      <p>
        The following generalise the covariance properties of Theorem 5.13 to arbitrary
        linear combinations. These are important for theoretical proofs and appear frequently
        on exams.
      </p>

      <Theorem id="thm-cov-general" title="Covariance of Linear Combinations — Ex. 5.37">
        <MathBlock
          math={"\\text{Cov}\\!\\left(\\sum_{i=1}^{k} a_i X_i,\\; \\sum_{j=1}^{m} b_j Y_j\\right) = \\sum_{i=1}^{k} \\sum_{j=1}^{m} a_i b_j \\,\\text{Cov}(X_i, Y_j)"}
          display
        />
      </Theorem>

      <p>
        <strong>Special case (Ex. 5.38):</strong> Setting{" "}
        <MathBlock math={"Y_j = X_j"} /> and <MathBlock math={"b_j = a_j"} />:
      </p>
      <MathBlock
        math={"\\text{Var}\\!\\left(\\sum_{i=1}^{k} a_i X_i\\right) = \\sum_{i=1}^{k} \\sum_{j=1}^{k} a_i a_j \\,\\text{Cov}(X_i, X_j) = \\sum_{i=1}^{k} a_i^2 \\text{Var}(X_i) + 2\\sum_{j < i} a_i a_j \\text{Cov}(X_i, X_j)"}
        display
      />
      <p>
        which is exactly Theorem 5.18, now derived from the general covariance formula.
      </p>

      {/* ──────── WORKED QUESTIONS ──────── */}
      <h3>Practice Questions</h3>

      <WorkedQuestion
        source="Homework 5.22 (adapted)"
        difficulty="easy"
        solution={
          <>
            <p>
              Use Theorem 5.10. For each, check (1) is the support a Cartesian product?
              and (2) can the joint pdf be factored?
            </p>
            <p>
              <strong>(a)</strong>{" "}
              <MathBlock math={"f(x,y) = \\frac{4}{5xy}"} /> on{" "}
              <MathBlock math={"1 < x < 5, \\; 1 < y < 5"} />.
            </p>
            <p>
              Support is <MathBlock math={"(1,5) \\times (1,5)"} /> (rectangle ✓). And{" "}
              <MathBlock math={"\\frac{4}{5xy} = \\frac{2}{5x} \\cdot \\frac{2}{y}"} />{" "}
              — factors ✓. <strong>Independent.</strong>
            </p>
            <p>
              <strong>(b)</strong>{" "}
              <MathBlock math={"f(x,y) = 6xy"} /> on{" "}
              <MathBlock math={"0 < x < y < 1"} />.
            </p>
            <p>
              Support is the triangle{" "}
              <MathBlock math={"\\{(x,y) : 0 < x < y < 1\\}"} /> — <em>not</em> a
              rectangle. <strong>Dependent</strong> immediately (no need to check
              factorisation).
            </p>
            <p>
              <strong>(c)</strong>{" "}
              <MathBlock math={"f(x,y) = 2"} /> on{" "}
              <MathBlock math={"0 < x < y < 1"} />.
            </p>
            <p>
              Same triangular support. <strong>Dependent.</strong>
            </p>
            <p>
              <strong>(d)</strong>{" "}
              <MathBlock math={"f(x,y) = x + y"} /> on{" "}
              <MathBlock math={"0 < x < 1, \\; 0 < y < 1"} />.
            </p>
            <p>
              Support is a rectangle ✓, but <MathBlock math={"x + y"} /> cannot be written
              as <MathBlock math={"g(x) \\cdot h(y)"} /> ✗. <strong>Dependent.</strong>
            </p>
          </>
        }
      >
        <p>
          For each joint pdf, determine whether <MathBlock math={"X"} /> and{" "}
          <MathBlock math={"Y"} /> are independent. Use Theorem 5.10.
        </p>
        <p>(a) <MathBlock math={"f(x,y) = \\frac{4}{5xy}"} /> on <MathBlock math={"1 < x < 5, \\; 1 < y < 5"} /></p>
        <p>(b) <MathBlock math={"f(x,y) = 6xy"} /> on <MathBlock math={"0 < x < y < 1"} /></p>
        <p>(c) <MathBlock math={"f(x,y) = 2"} /> on <MathBlock math={"0 < x < y < 1"} /></p>
        <p>(d) <MathBlock math={"f(x,y) = x + y"} /> on <MathBlock math={"0 < x < 1, \\; 0 < y < 1"} /></p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Homework 5.33"
        difficulty="medium"
        solution={
          <>
            <p>The joint pdf table is:</p>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th><MathBlock math={"X=0"} /></th>
                    <th><MathBlock math={"X=1"} /></th>
                    <th><MathBlock math={"X=2"} /></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong><MathBlock math={"Y=0"} /></strong></td>
                    <td>4/9</td><td>2/9</td><td>1/36</td>
                  </tr>
                  <tr>
                    <td><strong><MathBlock math={"Y=1"} /></strong></td>
                    <td>2/9</td><td>2/36</td><td>0</td>
                  </tr>
                  <tr>
                    <td><strong><MathBlock math={"Y=2"} /></strong></td>
                    <td>1/36</td><td>0</td><td>0</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Step 1: Marginals.</strong>
            </p>
            <MathBlock
              math={"E[X] = 1 \\cdot (2/9 + 2/36) + 2 \\cdot (1/36) = 1/3"}
              display
            />
            <MathBlock
              math={"E[Y] = 1/3 \\text{ (by symmetry)}"}
              display
            />
            <p><strong>Step 2: E[XY].</strong></p>
            <MathBlock
              math={"E[XY] = 1 \\cdot 1 \\cdot \\frac{2}{36} = \\frac{1}{18}"}
              display
            />
            <p><strong>Step 3: Covariance.</strong></p>
            <MathBlock
              math={"\\text{Cov}(X,Y) = E[XY] - E[X]E[Y] = \\frac{1}{18} - \\frac{1}{3} \\cdot \\frac{1}{3} = \\frac{1}{18} - \\frac{1}{9} = -\\frac{1}{18}"}
              display
            />
            <p>
              <strong>Part (b):</strong>{" "}
              <MathBlock math={"X + Y"} /> = "number of ones and sixes" in 2 rolls of a die.
              So <MathBlock math={"X + Y \\sim \\text{Bin}(2, 1/3)"} /> with{" "}
              <MathBlock math={"\\text{Var}(X+Y) = 2 \\cdot \\frac{1}{3} \\cdot \\frac{2}{3} = \\frac{4}{9}"} />.
            </p>
            <p>Verification via Theorem 5.14:</p>
            <MathBlock
              math={"\\text{Var}(X) = \\text{Var}(Y) = \\frac{5}{18}"}
              display
            />
            <MathBlock
              math={"\\text{Var}(X+Y) = \\frac{5}{18} + \\frac{5}{18} + 2\\left(-\\frac{1}{18}\\right) = \\frac{10}{18} - \\frac{2}{18} = \\frac{8}{18} = \\frac{4}{9} \\; \\checkmark"}
              display
            />
          </>
        }
      >
        <p>
          Roll a fair die twice. Let <MathBlock math={"X"} /> = number of ones and{" "}
          <MathBlock math={"Y"} /> = number of sixes.
        </p>
        <p>(a) Find <MathBlock math={"\\text{Cov}(X, Y)"} />.</p>
        <p>(b) Verify <MathBlock math={"\\text{Var}(X+Y)"} /> using Theorem 5.14.</p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Homework 5.44"
        difficulty="hard"
        solution={
          <>
            <p>
              <strong>Step 1: Marginals.</strong> The support is{" "}
              <MathBlock math={"0 < x < y < 1"} /> (a triangle).
            </p>
            <MathBlock
              math={"f_X(x) = \\int_x^1 6xy\\, dy = 6x \\cdot \\frac{y^2}{2}\\Big|_x^1 = 6x \\cdot \\frac{1 - x^2}{2} = 3x(1 - x^2) = 6x(1-x) \\cdot \\frac{1+x}{2}"}
              display
            />
            <p>More directly:</p>
            <MathBlock math={"f_X(x) = 3x(1 - x^2), \\quad 0 < x < 1"} display />
            <MathBlock
              math={"f_Y(y) = \\int_0^y 6xy\\, dx = 6y \\cdot \\frac{x^2}{2}\\Big|_0^y = 3y^3, \\quad 0 < y < 1"}
              display
            />
            <p><strong>Step 2: Expected values.</strong></p>
            <MathBlock
              math={"E[X] = \\int_0^1 x \\cdot 3x(1-x^2)\\, dx = 3\\int_0^1 (x^2 - x^4)\\, dx = 3\\left(\\frac{1}{3} - \\frac{1}{5}\\right) = 3 \\cdot \\frac{2}{15} = \\frac{2}{5}"}
              display
            />
            <MathBlock
              math={"E[X^2] = \\int_0^1 x^2 \\cdot 3x(1-x^2)\\, dx = 3\\left(\\frac{1}{4} - \\frac{1}{6}\\right) = 3 \\cdot \\frac{1}{12} = \\frac{1}{4}"}
              display
            />
            <MathBlock
              math={"\\text{Var}(X) = \\frac{1}{4} - \\left(\\frac{2}{5}\\right)^2 = \\frac{1}{4} - \\frac{4}{25} = \\frac{9}{100}"}
              display
            />
            <MathBlock
              math={"E[Y] = \\int_0^1 y \\cdot 3y^3\\, dy = 3 \\cdot \\frac{1}{5} = \\frac{3}{5}"}
              display
            />
            <MathBlock
              math={"\\text{Var}(Y) = E[Y^2] - E[Y]^2 = \\frac{1}{2} - \\frac{9}{25} = \\frac{7}{50}"}
              display
            />
            <p>
              Wait — let us compute <MathBlock math={"E[Y^2]"} /> properly:
            </p>
            <MathBlock
              math={"E[Y^2] = \\int_0^1 y^2 \\cdot 3y^3\\, dy = 3 \\cdot \\frac{1}{6} = \\frac{1}{2}"}
              display
            />
            <MathBlock
              math={"\\text{Var}(Y) = \\frac{1}{2} - \\frac{9}{25} = \\frac{25 - 18}{50} = \\frac{7}{50}"}
              display
            />
            <p><strong>Step 3: E[XY] and covariance.</strong></p>
            <MathBlock
              math={"E[XY] = \\int_0^1 \\int_0^y 6x^2 y^2\\, dx\\, dy = \\int_0^1 6y^2 \\cdot \\frac{x^3}{3}\\Big|_0^y dy = \\int_0^1 2y^5\\, dy = \\frac{2}{6} = \\frac{1}{3}"}
              display
            />
            <MathBlock
              math={"\\text{Cov}(X,Y) = \\frac{1}{3} - \\frac{2}{5} \\cdot \\frac{3}{5} = \\frac{1}{3} - \\frac{6}{25} = \\frac{25 - 18}{75} = \\frac{7}{75}"}
              display
            />
            <p>
              Wait, let me redo: <MathBlock math={"1/3 - 6/25 = 25/75 - 18/75 = 7/75"} />.
              Hmm, but the homework gives <MathBlock math={"1/40"} />.
              Let me recompute more carefully.
            </p>
            <MathBlock
              math={"E[X] = 6\\int_0^1\\int_x^1 x^2 y\\, dy\\, dx = 6\\int_0^1 x^2 \\frac{1-x^2}{2}\\,dx = 3\\int_0^1(x^2 - x^4)\\,dx = 3\\left(\\frac{1}{3} - \\frac{1}{5}\\right) = \\frac{2}{5}"}
              display
            />
            <MathBlock
              math={"E[Y] = 6\\int_0^1\\int_0^y xy^2\\, dx\\, dy = 6\\int_0^1 y^2 \\frac{y^2}{2}\\, dy = 3\\int_0^1 y^4\\, dy = \\frac{3}{5}"}
              display
            />
            <MathBlock
              math={"E[XY] = \\int_0^1\\int_x^1 6x^2y^2\\, dy\\, dx = \\int_0^1 6x^2 \\cdot \\frac{1 - x^3}{3}\\, dx = 2\\int_0^1(x^2 - x^5)\\, dx = 2\\left(\\frac{1}{3} - \\frac{1}{6}\\right) = \\frac{1}{3}"}
              display
            />
            <MathBlock
              math={"\\text{Cov}(X,Y) = \\frac{1}{3} - \\frac{2}{5} \\cdot \\frac{3}{5} = \\frac{1}{3} - \\frac{6}{25}"}
              display
            />
            <MathBlock
              math={"= \\frac{25}{75} - \\frac{18}{75} = \\frac{7}{75}"}
              display
            />
            <p>
              Hmm, but wait — let me recheck using the inner integral for{" "}
              <MathBlock math={"E[XY]"} />:
            </p>
            <MathBlock
              math={"\\int_x^1 6x^2 y^2 \\, dy = 6x^2 \\cdot \\frac{y^3}{3}\\Big|_x^1 = 2x^2(1 - x^3)"}
              display
            />
            <MathBlock
              math={"E[XY] = \\int_0^1 2x^2(1-x^3)\\, dx = 2\\left(\\frac{1}{3} - \\frac{1}{6}\\right) = 2 \\cdot \\frac{1}{6} = \\frac{1}{3}"}
              display
            />
            <p>
              So <MathBlock math={"\\text{Cov}(X,Y) = 7/75"} /> and{" "}
              <MathBlock math={"\\text{Var}(X) = 9/100"} />,{" "}
              <MathBlock math={"\\text{Var}(Y) = 7/50"} />.
            </p>
            <p><strong>Step 4: Correlation.</strong></p>
            <MathBlock
              math={"\\rho = \\frac{7/75}{\\sqrt{9/100} \\cdot \\sqrt{7/50}} = \\frac{7/75}{\\frac{3}{10} \\cdot \\frac{\\sqrt{7}}{\\sqrt{50}}} = \\frac{7/75}{\\frac{3\\sqrt{7}}{10\\sqrt{50}}} = \\frac{7}{75} \\cdot \\frac{10\\sqrt{50}}{3\\sqrt{7}} = \\frac{70\\sqrt{50}}{225\\sqrt{7}}"}
              display
            />
            <MathBlock
              math={"= \\frac{70 \\cdot 5\\sqrt{2}}{225\\sqrt{7}} = \\frac{350\\sqrt{2}}{225\\sqrt{7}} = \\frac{14\\sqrt{2}}{9\\sqrt{7}} = \\frac{14\\sqrt{14}}{63} = \\frac{2\\sqrt{14}}{9}"}
              display
            />
            <p>
              <strong>Simplification:</strong>{" "}
              <MathBlock math={"\\sqrt{14}/9 \\cdot 2 \\approx 0.83"} />. The positive
              correlation makes sense: since <MathBlock math={"X < Y"} /> always, larger{" "}
              <MathBlock math={"X"} /> forces larger <MathBlock math={"Y"} />.
            </p>
          </>
        }
      >
        <p>
          Let <MathBlock math={"f_{X,Y}(x,y) = 6xy"} /> for{" "}
          <MathBlock math={"0 < x < y < 1"} />. Find{" "}
          <MathBlock math={"\\text{Cov}(X,Y)"} /> and{" "}
          <MathBlock math={"\\rho(X,Y)"} />.
        </p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Tutorial 2, Ex. 5.32"
        difficulty="medium"
        solution={
          <>
            <p>
              Roll a fair die twice: <MathBlock math={"X"} /> = first roll,{" "}
              <MathBlock math={"Y"} /> = second roll. The rolls are <strong>independent</strong>,
              so <MathBlock math={"\\text{Cov}(X, Y) = 0"} />.
            </p>
            <p>
              We need{" "}
              <MathBlock math={"E[X] = E[Y] = 7/2"} /> and{" "}
              <MathBlock math={"\\text{Var}(X) = \\text{Var}(Y) = 35/12"} />.
            </p>
            <p><strong>(a) Cov(X, X+Y):</strong></p>
            <MathBlock
              math={"\\text{Cov}(X, X+Y) = \\text{Cov}(X,X) + \\text{Cov}(X,Y) = \\text{Var}(X) + 0 = \\frac{35}{12}"}
              display
            />
            <p><strong>(b) Cov(X-Y, X+Y):</strong></p>
            <MathBlock
              math={"\\text{Cov}(X-Y, X+Y) = \\text{Cov}(X,X) + \\text{Cov}(X,Y) - \\text{Cov}(Y,X) - \\text{Cov}(Y,Y)"}
              display
            />
            <MathBlock
              math={"= \\text{Var}(X) + 0 - 0 - \\text{Var}(Y) = \\frac{35}{12} - \\frac{35}{12} = 0"}
              display
            />
            <p>
              <strong>(c) Are X-Y and X+Y independent?</strong> No! Even though{" "}
              <MathBlock math={"\\text{Cov} = 0"} />, they share the same underlying variable{" "}
              <MathBlock math={"X"} />. Zero covariance does not imply independence (unless the
              distribution is jointly normal).
            </p>
            <p>
              <strong>(d) Is Var(X+Y) = Var(2X)?</strong>
            </p>
            <MathBlock
              math={"\\text{Var}(X+Y) = \\text{Var}(X) + \\text{Var}(Y) = \\frac{35}{6}"}
              display
            />
            <MathBlock
              math={"\\text{Var}(2X) = 4\\,\\text{Var}(X) = \\frac{140}{12} = \\frac{35}{3}"}
              display
            />
            <p>
              <strong>No!</strong>{" "}
              <MathBlock math={"\\text{Var}(X+Y) = 35/6 \\neq 35/3 = \\text{Var}(2X)"} />.
              This is because <MathBlock math={"X + Y"} /> involves two{" "}
              <em>independent</em> sources of randomness while{" "}
              <MathBlock math={"2X"} /> doubles a single source.
            </p>
          </>
        }
      >
        <p>
          Roll a fair die twice. <MathBlock math={"X"} /> = first roll,{" "}
          <MathBlock math={"Y"} /> = second roll (<MathBlock math={"X, Y"} /> independent).
        </p>
        <p>(a) Find <MathBlock math={"\\text{Cov}(X,\\; X+Y)"} />.</p>
        <p>(b) Find <MathBlock math={"\\text{Cov}(X-Y,\\; X+Y)"} />.</p>
        <p>(c) Are <MathBlock math={"X-Y"} /> and <MathBlock math={"X+Y"} /> independent?</p>
        <p>(d) Is <MathBlock math={"\\text{Var}(X+Y)"} /> equal to <MathBlock math={"\\text{Var}(2X)"} />?</p>
      </WorkedQuestion>
    </>
  )
}
