import MathBlock from '../components/MathBlock'
import Definition from '../components/Definition'
import Theorem from '../components/Theorem'
import Proof from '../components/Proof'
import Example from '../components/Example'
import Note from '../components/Note'
import WorkedQuestion from '../components/WorkedQuestion'

export default function Topic5Conditional() {
  return (
    <>
      <p>
        So far we have used the <em>joint</em> and <em>marginal</em> distributions. But in
        practice the most useful distribution is often the <strong>conditional</strong> one:
        "given that I already know <MathBlock math={"X = x"} />, what is the distribution
        of <MathBlock math={"Y"} />?" This is the multivariate generalisation of
        conditional probability from PTS1.
      </p>

      <p>
        The central idea: dividing the joint pdf by the marginal "slices" the joint
        distribution along a fixed value of one variable, producing a valid probability
        distribution for the other variable. From this we get conditional expected values,
        conditional variances, and the powerful <strong>law of total expectation</strong>.
      </p>

      {/* ──────── DISCRETE MOTIVATION ──────── */}
      <h3>Motivating Example: The Shop (Discrete)</h3>

      <Example title="Example 5.30 — Conditional Distribution from a Table">
        <p>
          Recall the shop table (X = units of A sold, Y = units of B sold):
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
          <strong>Question:</strong> Suppose I know that <MathBlock math={"X = 1"} /> (one
          unit of A was sold). What is the distribution of <MathBlock math={"Y"} />?
        </p>
        <p>
          Use the conditional probability formula from PTS1:
        </p>
        <MathBlock
          math={"P(Y = 0 \\mid X = 1) = \\frac{P(Y=0, X=1)}{P(X=1)} = \\frac{0.12}{0.40} = 0.30"}
          display
        />
        <MathBlock
          math={"P(Y = 1 \\mid X = 1) = \\frac{0.18}{0.40} = 0.45"}
          display
        />
        <MathBlock
          math={"P(Y = 2 \\mid X = 1) = \\frac{0.10}{0.40} = 0.25"}
          display
        />
        <p>
          Check: <MathBlock math={"0.30 + 0.45 + 0.25 = 1.00"} /> ✓. This is a proper
          probability distribution — the conditional distribution of{" "}
          <MathBlock math={"Y"} /> given <MathBlock math={"X = 1"} />.
        </p>
        <p>
          Notice the pattern: we took the <MathBlock math={"X = 1"} /> column of the joint
          table and divided every entry by the column total{" "}
          <MathBlock math={"f_X(1) = 0.40"} />. This is exactly what the conditional pdf
          formula does.
        </p>
      </Example>

      {/* ──────── DEFINITION ──────── */}
      <h3>Conditional PDF</h3>

      <Definition id="def-5.17" title="Conditional PDF — Def. 5.17">
        <p>
          The <strong>conditional pdf of <MathBlock math={"Y"} /> given{" "}
          <MathBlock math={"X = x"} /></strong> is:
        </p>
        <MathBlock
          math={"f_{Y|X}(y \\mid x) = f_{Y|X=x}(y) := \\frac{f_{X,Y}(x, y)}{f_X(x)}"}
          display
        />
        <p>
          provided <MathBlock math={"f_X(x) > 0"} />. Similarly, the conditional pdf of{" "}
          <MathBlock math={"X"} /> given <MathBlock math={"Y = y"} /> is:
        </p>
        <MathBlock
          math={"f_{X|Y}(x \\mid y) = \\frac{f_{X,Y}(x, y)}{f_Y(y)}"}
          display
        />
      </Definition>

      <Note>
        <p>
          Two notations are common: <MathBlock math={"f_{Y|X}(y|x)"} /> and{" "}
          <MathBlock math={"f_{Y|X=x}(y)"} />. They mean the same thing. In the conditional
          pdf, <MathBlock math={"x"} /> is treated as a fixed <strong>parameter</strong>{" "}
          (not a variable), and <MathBlock math={"y"} /> is the variable.
        </p>
      </Note>

      <h3>Properties of the Conditional PDF</h3>

      <p>
        The conditional pdf behaves like a regular pdf — it satisfies all the properties
        needed to be a valid probability distribution:
      </p>
      <ol>
        <li>
          <MathBlock math={"f_{Y|X}(y \\mid x) \\ge 0"} /> for all{" "}
          <MathBlock math={"y"} />
        </li>
        <li>
          <strong>Discrete:</strong>{" "}
          <MathBlock math={"\\sum_{\\text{all } y} f_{Y|X}(y \\mid x) = 1"} />
          <br />
          <strong>Continuous:</strong>{" "}
          <MathBlock math={"\\int_{-\\infty}^{\\infty} f_{Y|X}(y \\mid x)\\, dy = 1"} />
        </li>
        <li>
          <strong>Conditional probability:</strong>{" "}
          <MathBlock math={"P(a \\le Y \\le b \\mid X = x) = \\int_a^b f_{Y|X}(y \\mid x)\\, dy"} />
        </li>
        <li>
          <strong>Conditional CDF:</strong>{" "}
          <MathBlock math={"F_{Y|X}(y \\mid x) = \\int_{-\\infty}^{y} f_{Y|X}(v \\mid x)\\, dv"} />
        </li>
      </ol>

      {/* ──────── CONTINUOUS EXAMPLE ──────── */}
      <h3>Continuous Example</h3>

      <Example title="Example 5.32 — Exponential Joint Distribution">
        <p>Given:</p>
        <MathBlock math={"f_{X,Y}(x,y) = 2e^{-x-y} \\quad \\text{for } 0 \\le x \\le y"} display />
        <p>
          From Topic 2: <MathBlock math={"f_X(x) = 2e^{-2x}"} /> for{" "}
          <MathBlock math={"x \\ge 0"} /> and{" "}
          <MathBlock math={"f_Y(y) = 2e^{-y}(1 - e^{-y})"} /> for{" "}
          <MathBlock math={"y \\ge 0"} />.
        </p>
        <p><strong>Conditional pdf of Y given X = x</strong> (with <MathBlock math={"x \\ge 0"} />):</p>
        <MathBlock
          math={"f_{Y|X}(y \\mid x) = \\frac{f_{X,Y}(x,y)}{f_X(x)} = \\frac{2e^{-x-y}}{2e^{-2x}} = e^{x-y} \\quad \\text{for } y \\ge x"}
          display
        />
        <p>
          This is an <strong>Exponential(1) distribution shifted to start at x</strong>:
          it is the pdf of <MathBlock math={"x + \\text{Exp}(1)"} />.
        </p>
        <p><strong>Conditional CDF:</strong></p>
        <MathBlock
          math={"F_{Y|X=x}(y) = \\int_x^y e^{x-v}\\, dv = \\left[-e^{x-v}\\right]_x^y = 1 - e^{x-y} \\quad \\text{for } y \\ge x"}
          display
        />
        <p><strong>Conditional pdf of X given Y = y</strong> (with <MathBlock math={"y \\ge 0"} />):</p>
        <MathBlock
          math={"f_{X|Y}(x \\mid y) = \\frac{2e^{-x-y}}{2e^{-y}(1 - e^{-y})} = \\frac{e^{-x}}{1 - e^{-y}} \\quad \\text{for } x \\in [0, y]"}
          display
        />
        <p>
          This is a <strong>truncated exponential</strong> on <MathBlock math={"[0, y]"} />.
        </p>
      </Example>

      {/* ──────── INDEPENDENCE CONNECTION ──────── */}
      <h3>Conditional PDF and Independence</h3>

      <Theorem id="thm-5.19" title="Independence ⟹ Conditional = Marginal — Thm. 5.19">
        <p>
          If <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> are{" "}
          <strong>independent</strong>, then:
        </p>
        <MathBlock math={"f_{Y|X}(y \\mid x) = f_Y(y) \\quad \\forall\\, y"} display />
        <MathBlock math={"f_{X|Y}(x \\mid y) = f_X(x) \\quad \\forall\\, x"} display />
      </Theorem>

      <Proof title="Proof">
        <MathBlock
          math={"f_{Y|X}(y \\mid x) = \\frac{f_{X,Y}(x,y)}{f_X(x)} \\overset{\\text{indep.}}{=} \\frac{f_X(x) \\cdot f_Y(y)}{f_X(x)} = f_Y(y)"}
          display
        />
      </Proof>

      <Note>
        <p>
          <strong>Intuition:</strong> If <MathBlock math={"X"} /> and{" "}
          <MathBlock math={"Y"} /> are independent, then knowing{" "}
          <MathBlock math={"X = x"} /> gives no information about{" "}
          <MathBlock math={"Y"} />, so the conditional distribution of{" "}
          <MathBlock math={"Y"} /> is just its unconditional (marginal) distribution.
        </p>
      </Note>

      {/* ──────── CONDITIONAL EXPECTATION ──────── */}
      <h3>Conditional Expected Value</h3>

      <Definition id="def-5.18" title="Conditional Expected Value — Def. 5.18">
        <p>
          The <strong>conditional expected value</strong> of <MathBlock math={"Y"} />{" "}
          given <MathBlock math={"X = x"} /> is:
        </p>
        <MathBlock
          math={"E[Y \\mid X = x] = \\begin{cases} \\displaystyle\\sum_{\\text{all } y} y \\cdot f_{Y|X}(y \\mid x) & \\text{if } Y \\text{ discrete} \\\\[12pt] \\displaystyle\\int_{-\\infty}^{\\infty} y \\cdot f_{Y|X}(y \\mid x)\\, dy & \\text{if } Y \\text{ continuous} \\end{cases}"}
          display
        />
        <p>
          More generally, the conditional expectation of any function{" "}
          <MathBlock math={"g(X, Y)"} /> given <MathBlock math={"X = x"} /> is:
        </p>
        <MathBlock
          math={"E[g(X,Y) \\mid X = x] = \\begin{cases} \\displaystyle\\sum_{\\text{all } y} g(x,y) \\cdot f_{Y|X}(y \\mid x) & \\text{discrete} \\\\[12pt] \\displaystyle\\int_{-\\infty}^{\\infty} g(x,y) \\cdot f_{Y|X}(y \\mid x)\\, dy & \\text{continuous} \\end{cases}"}
          display
        />
      </Definition>

      <Note>
        <p>
          <strong>Key distinction:</strong> <MathBlock math={"E[Y]"} /> is a{" "}
          <em>number</em> — it averages over all possible values of <MathBlock math={"Y"} />.
          But <MathBlock math={"E[Y \\mid X = x]"} /> is a <strong>function of x</strong>{" "}
          — it gives the average of <MathBlock math={"Y"} /> for each specific value of{" "}
          <MathBlock math={"X"} />. And <MathBlock math={"E[Y \\mid X]"} /> (without the{" "}
          <MathBlock math={"= x"} />) is itself a <strong>random variable</strong>, because{" "}
          <MathBlock math={"X"} /> is random.
        </p>
      </Note>

      <Example title="Example 5.37 — Conditional Expectation (Continuation of 5.32)">
        <p>
          From Example 5.32: <MathBlock math={"f_{Y|X}(y \\mid x) = e^{x-y}"} /> for{" "}
          <MathBlock math={"y \\ge x"} />.
        </p>
        <MathBlock
          math={"E[Y \\mid X = x] = \\int_x^{\\infty} y \\cdot e^{x-y}\\, dy"}
          display
        />
        <p>
          Substituting <MathBlock math={"u = y - x"} /> (so <MathBlock math={"y = u + x"} />,{" "}
          <MathBlock math={"dy = du"} />):
        </p>
        <MathBlock
          math={"= \\int_0^{\\infty} (u + x) e^{-u}\\, du = \\int_0^{\\infty} u e^{-u}\\, du + x\\int_0^{\\infty} e^{-u}\\, du = 1 + x"}
          display
        />
        <p>
          So <MathBlock math={"E[Y \\mid X = x] = x + 1"} />. This is a{" "}
          <strong>function of x</strong>: if <MathBlock math={"X = 3"} />, the conditional
          mean of <MathBlock math={"Y"} /> is 4.
        </p>
        <p>
          As a random variable: <MathBlock math={"E[Y \\mid X] = X + 1"} />.
        </p>
      </Example>

      {/* ──────── CONDITIONAL VARIANCE ──────── */}
      <h3>Conditional Variance</h3>

      <p>
        Just as we define the conditional expectation, we can define the{" "}
        <strong>conditional variance</strong>:
      </p>
      <MathBlock
        math={"\\text{Var}(Y \\mid X = x) = E[Y^2 \\mid X = x] - (E[Y \\mid X = x])^2"}
        display
      />
      <p>
        This measures the spread of <MathBlock math={"Y"} /> around its conditional mean,
        for a specific value of <MathBlock math={"X"} />.
      </p>

      <Example title="Exercise 5.62 — Conditional Mean and Variance">
        <p>
          Let <MathBlock math={"f_{X,Y}(x,y) = 8xy"} /> on the region{" "}
          <MathBlock math={"x^2 + y^2 < 1, \\; x > 0, \\; y > 0"} /> (quarter-circle).
        </p>
        <p>
          Marginal: <MathBlock math={"f_X(x) = 4x(1-x^2)"} /> for{" "}
          <MathBlock math={"0 < x < 1"} />.
        </p>
        <p>Conditional pdf:</p>
        <MathBlock
          math={"f_{Y|X}(y \\mid x) = \\frac{8xy}{4x(1-x^2)} = \\frac{2y}{1-x^2} \\quad \\text{for } 0 < y < \\sqrt{1-x^2}"}
          display
        />
        <p>Conditional expected value:</p>
        <MathBlock
          math={"E[Y \\mid X = x] = \\int_0^{\\sqrt{1-x^2}} y \\cdot \\frac{2y}{1-x^2}\\, dy = \\frac{2}{1-x^2} \\cdot \\frac{(1-x^2)^{3/2}}{3} = \\frac{2}{3}\\sqrt{1-x^2}"}
          display
        />
        <p>Conditional variance:</p>
        <MathBlock
          math={"E[Y^2 \\mid X = x] = \\int_0^{\\sqrt{1-x^2}} \\frac{2y^3}{1-x^2}\\, dy = \\frac{(1-x^2)^2}{2(1-x^2)} = \\frac{1-x^2}{2}"}
          display
        />
        <MathBlock
          math={"\\text{Var}(Y \\mid X = x) = \\frac{1-x^2}{2} - \\frac{4}{9}(1-x^2) = \\frac{1}{18}(1-x^2)"}
          display
        />
      </Example>

      {/* ──────── LAW OF TOTAL EXPECTATION ──────── */}
      <h3>Law of Total Expectation — Theorem 5.21</h3>

      <p>
        The law of total expectation (also called the <em>tower property</em> or{" "}
        <em>iterated expectation</em>) is one of the most powerful results in probability.
        It lets you compute <MathBlock math={"E[Y]"} /> by first conditioning on another
        variable and then averaging over that variable.
      </p>

      <Theorem id="thm-5.21" title="Law of Total Expectation — Thm. 5.21">
        <p>
          Let <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> be random variables.
          Then:
        </p>
        <MathBlock math={"E[Y] = E\\big[E[Y \\mid X]\\big]"} display />
        <p>Written out explicitly:</p>
        <MathBlock
          math={"E[Y] = \\begin{cases} \\displaystyle\\sum_{\\text{all } x} E[Y \\mid X = x] \\cdot f_X(x) & \\text{if } X \\text{ discrete} \\\\[12pt] \\displaystyle\\int_{-\\infty}^{\\infty} E[Y \\mid X = x] \\cdot f_X(x)\\, dx & \\text{if } X \\text{ continuous} \\end{cases}"}
          display
        />
      </Theorem>

      <Note>
        <p>
          <strong>How to read it:</strong> The inner expectation{" "}
          <MathBlock math={"E[Y \\mid X]"} /> gives you a function of{" "}
          <MathBlock math={"X"} /> (i.e., a random variable). The outer expectation averages
          this function over all possible values of <MathBlock math={"X"} />, weighted by
          the marginal pdf of <MathBlock math={"X"} />. The result is a number:{" "}
          <MathBlock math={"E[Y]"} />.
        </p>
      </Note>

      <Example title="Law of Total Expectation — Verifying with Example 5.32">
        <p>
          From earlier: <MathBlock math={"E[Y \\mid X = x] = x + 1"} /> and{" "}
          <MathBlock math={"f_X(x) = 2e^{-2x}"} /> for <MathBlock math={"x \\ge 0"} />.
        </p>
        <MathBlock
          math={"E[Y] = E[E[Y \\mid X]] = \\int_0^{\\infty} (x + 1) \\cdot 2e^{-2x}\\, dx"}
          display
        />
        <MathBlock
          math={"= 2\\int_0^{\\infty} xe^{-2x}\\, dx + 2\\int_0^{\\infty} e^{-2x}\\, dx = 2 \\cdot \\frac{1}{4} + 2 \\cdot \\frac{1}{2} = \\frac{1}{2} + 1 = \\frac{3}{2}"}
          display
        />
        <p>
          We can verify: <MathBlock math={"E[Y] = \\int_0^{\\infty} y \\cdot 2e^{-y}(1-e^{-y})\\, dy"} />.
          Computing directly also gives <MathBlock math={"3/2"} /> ✓.
        </p>
      </Example>

      <Example title="Exercise 5.62c — Law of Total Expectation on Quarter-Circle">
        <p>
          From the quarter-circle example:{" "}
          <MathBlock math={"E[Y \\mid X = x] = \\frac{2}{3}\\sqrt{1-x^2}"} /> and{" "}
          <MathBlock math={"f_X(x) = 4x(1-x^2)"} />.
        </p>
        <MathBlock
          math={"E[Y] = \\int_0^1 \\frac{2}{3}\\sqrt{1-x^2} \\cdot 4x(1-x^2)\\, dx"}
          display
        />
        <p>
          Substituting <MathBlock math={"z = 1 - x^2"} />,{" "}
          <MathBlock math={"dz = -2x\\, dx"} />:
        </p>
        <MathBlock
          math={"= \\frac{8}{3} \\int_0^1 x(1-x^2)^{3/2}\\, dx = \\frac{8}{3} \\cdot \\frac{1}{2} \\int_0^1 z^{3/2}\\, dz = \\frac{4}{3} \\cdot \\frac{2}{5} = \\frac{8}{15}"}
          display
        />
      </Example>

      {/* ──────── DISCRETE CONDITIONAL EXAMPLE ──────── */}
      <h3>Discrete Conditional Distributions</h3>

      <Example title="Exercise 5.60 — Discrete Conditional PDF">
        <p>
          Given the joint pdf <MathBlock math={"f_{X,Y}(x,y) = (x + y)/21"} /> for{" "}
          <MathBlock math={"x = 1, 2, 3"} /> and <MathBlock math={"y = 1, 2"} />.
        </p>
        <p>
          Marginals: <MathBlock math={"f_X(x) = (2x + 3)/21"} /> and{" "}
          <MathBlock math={"f_Y(y) = (6 + 3y)/21"} />.
        </p>
        <p>Conditional pdf of X given Y = y:</p>
        <MathBlock
          math={"f_{X|Y}(x \\mid y) = \\frac{(x+y)/21}{(6+3y)/21} = \\frac{x + y}{6 + 3y} \\quad \\text{for } x = 1, 2, 3"}
          display
        />
        <p>Conditional pdf of Y given X = x:</p>
        <MathBlock
          math={"f_{Y|X}(y \\mid x) = \\frac{(x+y)/21}{(2x+3)/21} = \\frac{x + y}{2x + 3} \\quad \\text{for } y = 1, 2"}
          display
        />
        <p>Conditional expected values:</p>
        <MathBlock
          math={"E[Y \\mid X = x] = \\sum_{y=1}^{2} y \\cdot \\frac{x+y}{2x+3} = \\frac{1 \\cdot (x+1) + 2 \\cdot (x+2)}{2x+3} = \\frac{3x + 5}{2x + 3}"}
          display
        />
        <p>
          For <MathBlock math={"x = 0, 1, 2"} /> this gives{" "}
          <MathBlock math={"5/3, \\; 8/5 = 13/9, \\; 4/3"} /> respectively — wait, let me
          recompute for the actual values <MathBlock math={"x = 1, 2, 3"} />:
        </p>
        <MathBlock
          math={"E[Y \\mid X = 1] = \\frac{8}{5}, \\quad E[Y \\mid X = 2] = \\frac{11}{7}, \\quad E[Y \\mid X = 3] = \\frac{14}{9}"}
          display
        />
      </Example>

      {/* ──────── RECIPE ──────── */}
      <h3>Step-by-Step Recipe for Conditional Problems</h3>

      <p>
        Most exam questions on conditional distributions follow this pattern:
      </p>
      <ol>
        <li>
          <strong>Find the marginal</strong> <MathBlock math={"f_X(x)"} /> (or{" "}
          <MathBlock math={"f_Y(y)"} />) by integrating/summing the joint pdf.
        </li>
        <li>
          <strong>Divide:</strong>{" "}
          <MathBlock math={"f_{Y|X}(y \\mid x) = f_{X,Y}(x,y) / f_X(x)"} />.
        </li>
        <li>
          <strong>Determine the conditional support:</strong> for which values of{" "}
          <MathBlock math={"y"} /> is <MathBlock math={"f_{Y|X}(y|x) > 0"} />? This
          depends on the value of <MathBlock math={"x"} />.
        </li>
        <li>
          <strong>Verify</strong> that the conditional pdf integrates/sums to 1.
        </li>
        <li>
          <strong>Compute</strong> conditional expectations, variances, or probabilities as
          needed.
        </li>
      </ol>

      {/* ──────── WORKED QUESTIONS ──────── */}
      <h3>Practice Questions</h3>

      <WorkedQuestion
        source="Homework 5.54"
        difficulty="easy"
        solution={
          <>
            <p><strong>Step 1: Marginals.</strong></p>
            <MathBlock
              math={"f_X(x) = \\int_0^1 (x+y)\\, dy = xy + \\frac{y^2}{2}\\Big|_0^1 = x + \\frac{1}{2}"}
              display
            />
            <MathBlock
              math={"f_Y(y) = \\int_0^1 (x+y)\\, dx = \\frac{x^2}{2} + xy\\Big|_0^1 = \\frac{1}{2} + y = y + \\frac{1}{2}"}
              display
            />
            <p><strong>Step 2: Conditional pdfs.</strong></p>
            <MathBlock
              math={"f_{X|Y}(x \\mid y) = \\frac{x + y}{y + \\frac{1}{2}} \\quad \\text{for } 0 < x < 1"}
              display
            />
            <MathBlock
              math={"f_{Y|X}(y \\mid x) = \\frac{x + y}{x + \\frac{1}{2}} \\quad \\text{for } 0 < y < 1"}
              display
            />
            <p><strong>Verification for <MathBlock math={"f_{X|Y}"} />:</strong></p>
            <MathBlock
              math={"\\int_0^1 \\frac{x + y}{y + \\frac{1}{2}}\\, dx = \\frac{\\frac{1}{2}x^2 + yx}{y + \\frac{1}{2}}\\bigg|_0^1 = \\frac{\\frac{1}{2} + y}{y + \\frac{1}{2}} = 1 \\; \\checkmark"}
              display
            />
          </>
        }
      >
        <p>
          Let <MathBlock math={"f_{X,Y}(x,y) = x + y"} /> for{" "}
          <MathBlock math={"0 < x < 1, \\; 0 < y < 1"} />. Find the conditional pdfs{" "}
          <MathBlock math={"f_{X|Y}(x|y)"} /> and{" "}
          <MathBlock math={"f_{Y|X}(y|x)"} />.
        </p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Homework 5.52"
        difficulty="medium"
        solution={
          <>
            <p>
              <strong>Step 1: Marginals.</strong> The support is{" "}
              <MathBlock math={"0 \\le x \\le y \\le 1"} />.
            </p>
            <MathBlock
              math={"f_X(x) = 8x \\int_x^1 y\\, dy = 8x \\cdot \\frac{1 - x^2}{2} = 4x(1 - x^2) \\quad 0 \\le x \\le 1"}
              display
            />
            <MathBlock
              math={"f_Y(y) = 8y \\int_0^y x\\, dx = 8y \\cdot \\frac{y^2}{2} = 4y^3 \\quad 0 \\le y \\le 1"}
              display
            />
            <p><strong>Step 2: Conditional pdfs.</strong></p>
            <MathBlock
              math={"f_{Y|X}(y \\mid x) = \\frac{8xy}{4x(1-x^2)} = \\frac{2y}{1 - x^2} \\quad \\text{for } x \\le y \\le 1"}
              display
            />
            <MathBlock
              math={"f_{X|Y}(x \\mid y) = \\frac{8xy}{4y^3} = \\frac{2x}{y^2} \\quad \\text{for } 0 \\le x \\le y"}
              display
            />
            <p><strong>(b) P(X ≤ 0.5 | Y = 0.75):</strong></p>
            <MathBlock
              math={"P(X \\le 0.5 \\mid Y = 0.75) = \\int_0^{0.5} \\frac{2x}{0.75^2}\\, dx = \\frac{x^2}{0.75^2}\\bigg|_0^{0.5} = \\frac{0.25}{0.5625} = \\frac{4}{9}"}
              display
            />
            <p><strong>(c) P(X ≤ 0.5 | Y ≤ 0.75):</strong></p>
            <p>
              Note: this is <em>not</em> a conditional pdf problem — it is a conditional
              probability with an <em>event</em> in the conditioning:
            </p>
            <MathBlock
              math={"P(X \\le 0.5 \\mid Y \\le 0.75) = \\frac{P(X \\le 0.5, Y \\le 0.75)}{P(Y \\le 0.75)}"}
              display
            />
            <MathBlock
              math={"P(Y \\le 0.75) = \\int_0^{0.75} 4y^3\\, dy = 0.75^4 \\approx 0.3164"}
              display
            />
            <MathBlock
              math={"P(X \\le 0.5, Y \\le 0.75) = \\int_0^{0.5}\\int_x^{0.75} 8xy\\, dy\\, dx = \\int_0^{0.5} 8x \\cdot \\frac{0.75^2 - x^2}{2}\\, dx"}
              display
            />
            <MathBlock
              math={"= \\int_0^{0.5} 4x(0.5625 - x^2)\\, dx = \\left[2 \\cdot 0.5625 x^2 - x^4\\right]_0^{0.5}"}
              display
            />
            <MathBlock
              math={"= 2(0.5625)(0.25) - 0.0625 = 0.28125 - 0.0625 = 0.21875"}
              display
            />
            <MathBlock
              math={"P(X \\le 0.5 \\mid Y \\le 0.75) = \\frac{0.21875}{0.3164} = \\frac{56}{81} \\approx 0.691"}
              display
            />
          </>
        }
      >
        <p>
          Let <MathBlock math={"f_{X,Y}(x,y) = 8xy"} /> for{" "}
          <MathBlock math={"0 \\le x \\le y \\le 1"} />.
        </p>
        <p>(a) Find both conditional pdfs.</p>
        <p>(b) Find <MathBlock math={"P(X \\le 0.5 \\mid Y = 0.75)"} />.</p>
        <p>(c) Find <MathBlock math={"P(X \\le 0.5 \\mid Y \\le 0.75)"} />.</p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Homework 5.65"
        difficulty="hard"
        solution={
          <>
            <p>
              <strong>(a) Finding the joint pdf.</strong>
            </p>
            <MathBlock
              math={"f_{X,Y}(x,y) = \\int_y^{\\infty} f_{X,Y,Z}(x,y,z)\\, dz = \\int_y^{\\infty} ce^{-z}\\, dz = ce^{-y} \\quad \\text{for } 0 < x < y"}
              display
            />
            <p>
              where <MathBlock math={"c"} /> is the normalizing constant. Since this must be
              a valid pdf:
            </p>
            <MathBlock
              math={"\\int_0^{\\infty}\\int_0^y ce^{-y}\\, dx\\, dy = c\\int_0^{\\infty} ye^{-y}\\, dy = c \\cdot 1 = c = 1"}
              display
            />
            <p>So <MathBlock math={"c = 1"} /> and <MathBlock math={"f_{X,Y}(x,y) = e^{-y}"} /> for <MathBlock math={"0 < x < y"} />.</p>
            <p><strong>(b) Conditional pdf of X given Y = y:</strong></p>
            <MathBlock
              math={"f_Y(y) = \\int_0^y e^{-y}\\, dx = ye^{-y} \\quad (y > 0)"}
              display
            />
            <MathBlock
              math={"f_{X|Y}(x \\mid y) = \\frac{e^{-y}}{ye^{-y}} = \\frac{1}{y} \\quad \\text{for } 0 < x < y"}
              display
            />
            <p>
              This is <MathBlock math={"\\text{Uniform}(0, y)"} /> — given{" "}
              <MathBlock math={"Y = y"} />, <MathBlock math={"X"} /> is uniformly
              distributed on <MathBlock math={"(0, y)"} />.
            </p>
            <p><strong>(c) E[X | Y = y]:</strong></p>
            <MathBlock
              math={"E[X \\mid Y = y] = \\int_0^y x \\cdot \\frac{1}{y}\\, dx = \\frac{y}{2}"}
              display
            />
            <p><strong>(d) E[X] via law of total expectation:</strong></p>
            <MathBlock
              math={"E[X] = E[E[X \\mid Y]] = E\\left[\\frac{Y}{2}\\right] = \\frac{1}{2}E[Y]"}
              display
            />
            <p>
              Since <MathBlock math={"Y \\sim \\text{Gamma}(2, 1)"} /> (because{" "}
              <MathBlock math={"f_Y(y) = ye^{-y}"} />), we have{" "}
              <MathBlock math={"E[Y] = 2"} />, so{" "}
              <MathBlock math={"E[X] = 1"} />.
            </p>
          </>
        }
      >
        <p>
          The joint pdf of <MathBlock math={"(X, Y, Z)"} /> is{" "}
          <MathBlock math={"f_{X,Y,Z}(x,y,z) = ce^{-z}"} /> for{" "}
          <MathBlock math={"0 < x < y < z"} />.
        </p>
        <p>(a) Find <MathBlock math={"f_{X,Y}(x,y)"} /> and the constant <MathBlock math={"c"} />.</p>
        <p>(b) Find <MathBlock math={"f_{X|Y}(x|y)"} /> and identify the distribution.</p>
        <p>(c) Find <MathBlock math={"E[X \\mid Y = y]"} />.</p>
        <p>(d) Use the law of total expectation to find <MathBlock math={"E[X]"} />.</p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Homework 5.63 (adapted)"
        difficulty="easy"
        solution={
          <>
            <p>
              <strong>(a)</strong> Since <MathBlock math={"E[Y \\mid X = x] = x"} />, by the
              law of total expectation:
            </p>
            <MathBlock
              math={"E[Y] = E[E[Y \\mid X]] = E[X] = 1"}
              display
            />
            <p>
              <strong>(b)</strong> We need the <strong>law of total variance</strong>{" "}
              (which decomposes <MathBlock math={"\\text{Var}(Y)"} /> via conditioning):
            </p>
            <MathBlock
              math={"\\text{Var}(Y) = E[\\text{Var}(Y \\mid X)] + \\text{Var}(E[Y \\mid X])"}
              display
            />
            <MathBlock
              math={"= E[1] + \\text{Var}(X) = 1 + 1 = 2"}
              display
            />
          </>
        }
      >
        <p>
          Suppose <MathBlock math={"E[Y \\mid X = x] = x"} /> and{" "}
          <MathBlock math={"\\text{Var}(Y \\mid X = x) = 1"} /> for all{" "}
          <MathBlock math={"x"} />. Also <MathBlock math={"E[X] = 1"} /> and{" "}
          <MathBlock math={"\\text{Var}(X) = 1"} />.
        </p>
        <p>(a) Find <MathBlock math={"E[Y]"} />.</p>
        <p>(b) Find <MathBlock math={"\\text{Var}(Y)"} />.</p>
      </WorkedQuestion>
    </>
  )
}
