import MathBlock from '../components/MathBlock'
import Definition from '../components/Definition'
import Theorem from '../components/Theorem'
import Proof from '../components/Proof'
import Example from '../components/Example'
import Note from '../components/Note'
import WorkedQuestion from '../components/WorkedQuestion'

export default function Topic3ExpectedValues() {
  return (
    <>
      <p>
        In PTS1 you computed expected values of functions of a <em>single</em> random variable.
        Now we extend this to functions of <em>two or more</em> variables. The key result is
        Theorem 5.6, which lets you compute{" "}
        <MathBlock math={"E[g(X,Y)]"} /> directly from the joint pdf — without first finding
        the distribution of <MathBlock math={"g(X,Y)"} />. This is enormously useful because
        finding the distribution of a transformed variable is often hard, while plugging into a
        double sum or integral is mechanical.
      </p>

      <p>
        The most important application of this section is <strong>linearity of expectation</strong>{" "}
        (Theorem 5.7*), which holds whether or not the variables are independent. This single
        result is used constantly throughout statistics.
      </p>

      <h3>Expected Value of a Function of Two Variables</h3>

      <p>
        Let <MathBlock math={"X, Y"} /> be two random variables and{" "}
        <MathBlock math={"W = g(X, Y)"} /> be some real-valued function of them. For example,{" "}
        <MathBlock math={"g(X,Y) = XY"} /> or <MathBlock math={"g(X,Y) = X + Y"} /> or{" "}
        <MathBlock math={"g(X,Y) = X^2 - 3Y"} />. How do we compute{" "}
        <MathBlock math={"E[W]"} />?
      </p>

      <Theorem id="thm-5.6" title="Expected Value of g(X,Y) — Thm. 5.6">
        <p>
          If <MathBlock math={"(X, Y)"} /> has joint pdf <MathBlock math={"f_{X,Y}(x,y)"} />{" "}
          and <MathBlock math={"g"} /> is a real-valued function, then:
        </p>
        <MathBlock
          math={"E[g(X,Y)] = \\begin{cases} \\displaystyle\\sum_{\\text{all } x} \\sum_{\\text{all } y} g(x,y) \\cdot f_{X,Y}(x,y) & \\text{if } X, Y \\text{ discrete} \\\\[12pt] \\displaystyle\\int_{-\\infty}^{\\infty} \\int_{-\\infty}^{\\infty} g(x,y) \\cdot f_{X,Y}(x,y)\\, dx\\, dy & \\text{if } X, Y \\text{ continuous} \\end{cases}"}
          display
        />
      </Theorem>

      <Note>
        <p>
          This theorem is the multivariate version of the "Law of the Unconscious Statistician"
          (LOTUS). It says: to find the expected value of <MathBlock math={"g(X,Y)"} />, you
          don't need to derive the pdf of <MathBlock math={"W = g(X,Y)"} /> first. Instead, just
          weight <MathBlock math={"g(x,y)"} /> by the joint density and sum/integrate over all
          possible <MathBlock math={"(x,y)"} />.
        </p>
        <p>
          There is an alternative method: find the pdf{" "}
          <MathBlock math={"f_W(w)"} /> of <MathBlock math={"W = g(X,Y)"} /> using a
          transformation (Chapter 6), then compute{" "}
          <MathBlock math={"E[W] = \\int w \\cdot f_W(w)\\, dw"} />. This is harder in most
          cases.
        </p>
      </Note>

      <h3>Computing E[XY] — The Three-Step Method</h3>

      <p>
        A very common exam task is computing <MathBlock math={"E[XY]"} /> for a continuous joint
        distribution. The lecturer emphasised a systematic three-step approach:
      </p>
      <ol>
        <li><strong>Draw the support.</strong> Sketch the region where <MathBlock math={"f_{X,Y}(x,y) > 0"} />.</li>
        <li>
          <strong>Rewrite the support bounds.</strong> Express one variable's range as
          independent of the other (the outer integral), and the other variable's range as
          dependent (the inner integral).
        </li>
        <li>
          <strong>Compute the double integral</strong> using Theorem 5.6 with{" "}
          <MathBlock math={"g(x,y) = xy"} />.
        </li>
      </ol>

      <Example title="Example 5.16 — E[XY] with Triangular Support">
        <p>
          Given <MathBlock math={"f_{X,Y}(x,y) = \\tfrac{1}{2}"} /> for{" "}
          <MathBlock math={"x > 0, y > 0, x + y < 2"} />.
        </p>
        <p>
          <strong>Step 1:</strong> The support is the triangle with vertices{" "}
          <MathBlock math={"(0,0), (2,0), (0,2)"} />, bounded by the line{" "}
          <MathBlock math={"y = 2 - x"} />.
        </p>
        <p>
          <strong>Step 2:</strong> Rewrite the support. For the outer integral in{" "}
          <MathBlock math={"y"} />: <MathBlock math={"0 < y < 2"} /> (independent). For the
          inner integral in <MathBlock math={"x"} />:{" "}
          <MathBlock math={"0 < x < 2 - y"} /> (depends on <MathBlock math={"y"} />).
        </p>
        <p>
          <strong>Step 3:</strong> Compute:
        </p>
        <MathBlock
          math={"E[XY] = \\int_0^2 \\int_0^{2-y} xy \\cdot \\tfrac{1}{2}\\, dx\\, dy = \\tfrac{1}{2}\\int_0^2 y\\left[\\tfrac{x^2}{2}\\right]_0^{2-y} dy = \\tfrac{1}{4}\\int_0^2 y(2-y)^2\\, dy"}
          display
        />
        <p>Expand <MathBlock math={"y(2-y)^2 = y(4 - 4y + y^2) = 4y - 4y^2 + y^3"} />:</p>
        <MathBlock
          math={"= \\tfrac{1}{4}\\int_0^2 (4y - 4y^2 + y^3)\\, dy = \\tfrac{1}{4}\\left[2y^2 - \\tfrac{4}{3}y^3 + \\tfrac{y^4}{4}\\right]_0^2 = \\tfrac{1}{4}\\left(8 - \\tfrac{32}{3} + 4\\right) = \\tfrac{1}{4} \\cdot \\tfrac{4}{3} = \\tfrac{1}{3}"}
          display
        />
      </Example>

      <Example title="E[XY] with Support 0 {'<'} x {'<'} y {'<'} 1">
        <p>
          Given <MathBlock math={"f_{X,Y}(x,y) = 6x"} /> for{" "}
          <MathBlock math={"0 < x < y < 1"} />.
        </p>
        <p>
          <strong>Step 1:</strong> The support is the triangle below the line{" "}
          <MathBlock math={"y = x"} /> in the unit square (where{" "}
          <MathBlock math={"x < y"} />).
        </p>
        <p>
          <strong>Step 2:</strong> Outer in <MathBlock math={"y"} />:{" "}
          <MathBlock math={"0 < y < 1"} />. Inner in <MathBlock math={"x"} />:{" "}
          <MathBlock math={"0 < x < y"} />.
        </p>
        <p>
          <strong>Step 3:</strong>
        </p>
        <MathBlock
          math={"E[XY] = \\int_0^1 \\int_0^y xy \\cdot 6x\\, dx\\, dy = \\int_0^1 y\\left[2x^3\\right]_0^y dy = \\int_0^1 2y^4\\, dy = \\left[\\tfrac{2}{5}y^5\\right]_0^1 = \\tfrac{2}{5}"}
          display
        />
        <p>
          <strong>Alternative order:</strong> outer in <MathBlock math={"x"} />:{" "}
          <MathBlock math={"0 < x < 1"} />, inner in <MathBlock math={"y"} />:{" "}
          <MathBlock math={"x < y < 1"} />. Same answer.
        </p>
      </Example>

      <h3>Linearity of Expectation</h3>

      <p>
        The most important property of expected values. It holds for <em>any</em> random
        variables — independent or not.
      </p>

      <Theorem id="thm-5.7" title="Linearity of Expectation — Thm. 5.7*">
        <p>
          If <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> are random variables and{" "}
          <MathBlock math={"a, b, c \\in \\mathbb{R}"} />, then:
        </p>
        <MathBlock
          math={"E[aX + bY + c] = a\\, E[X] + b\\, E[Y] + c"}
          display
        />
        <p>
          In particular: <MathBlock math={"E[X + Y] = E[X] + E[Y]"} />.
        </p>
      </Theorem>

      <Proof title="Proof of Linearity (continuous case)">
        <p>
          We prove the continuous case; the discrete case is analogous with sums replacing
          integrals.
        </p>
        <MathBlock
          math={"E[aX + bY + c] = \\int_{-\\infty}^{\\infty}\\int_{-\\infty}^{\\infty} (ax + by + c)\\, f_{X,Y}(x,y)\\, dx\\, dy"}
          display
        />
        <p>Split into three integrals using linearity of integration:</p>
        <MathBlock
          math={"= a\\int_{-\\infty}^{\\infty} x \\underbrace{\\int_{-\\infty}^{\\infty} f_{X,Y}(x,y)\\, dy}_{= f_X(x)} dx + b\\int_{-\\infty}^{\\infty} y \\underbrace{\\int_{-\\infty}^{\\infty} f_{X,Y}(x,y)\\, dx}_{= f_Y(y)} dy + c\\underbrace{\\int_{-\\infty}^{\\infty}\\int_{-\\infty}^{\\infty} f_{X,Y}(x,y)\\, dx\\, dy}_{= 1}"}
          display
        />
        <MathBlock
          math={"= a\\int_{-\\infty}^{\\infty} x\\, f_X(x)\\, dx + b\\int_{-\\infty}^{\\infty} y\\, f_Y(y)\\, dy + c = a\\, E[X] + b\\, E[Y] + c"}
          display
        />
        <p>
          The key steps: (1) the inner integrals produce the marginal pdf's, (2) the remaining
          integrals are just <MathBlock math={"E[X]"} /> and <MathBlock math={"E[Y]"} />, and
          (3) the total double integral of the joint pdf equals 1.
        </p>
      </Proof>

      <Note>
        <p>
          <strong>Why this matters:</strong> Linearity lets you break complex expectations into
          simple pieces. For instance,{" "}
          <MathBlock math={"E[3X^2 - 2Y + 7] = 3E[X^2] - 2E[Y] + 7"} />. You can compute
          each piece separately. This works regardless of whether{" "}
          <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> are independent or dependent.
        </p>
        <p>
          Note that linearity does <em>not</em> extend to products:{" "}
          <MathBlock math={"E[XY] \\neq E[X] \\cdot E[Y]"} /> in general. This equality only
          holds when <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> are independent
          (covered in Topic 4).
        </p>
      </Note>

      <h3>Discrete Examples</h3>

      <Example title="Homework 5.30 — E[X], E[Y] from the Shop Table">
        <p>
          Using the shop example from Topic 1 (items A and B), with marginals{" "}
          <MathBlock math={"f_X(0) = 0.32, f_X(1) = 0.40, f_X(2) = 0.24, f_X(3) = 0.04"} />:
        </p>
        <MathBlock
          math={"E[X] = 0 \\cdot 0.32 + 1 \\cdot 0.40 + 2 \\cdot 0.24 + 3 \\cdot 0.04 = 1.00"}
          display
        />
        <p>
          And <MathBlock math={"f_Y(0) = 0.30, f_Y(1) = 0.40, f_Y(2) = 0.30"} />:
        </p>
        <MathBlock
          math={"E[Y] = 0 \\cdot 0.30 + 1 \\cdot 0.40 + 2 \\cdot 0.30 = 1.00"}
          display
        />
        <p>
          By linearity: <MathBlock math={"E[X + Y] = E[X] + E[Y] = 2.00"} />.
        </p>
      </Example>

      <Example title="Homework 5.21 — E[XY] Continuous">
        <p>
          Given <MathBlock math={"f_{X,Y}(x,y) = 8xy"} /> for{" "}
          <MathBlock math={"0 < x < y < 1"} />.
        </p>
        <MathBlock
          math={"E[X^iY^j] = \\int_0^1 \\int_0^y x^i y^j \\cdot 8xy\\, dx\\, dy = 8\\int_0^1 y^{j+1}\\left[\\frac{x^{i+2}}{i+2}\\right]_0^y dy = \\frac{8}{i+2}\\int_0^1 y^{i+j+3}\\, dy = \\frac{8}{(i+2)(i+j+4)}"}
          display
        />
        <p>Plugging in specific values:</p>
        <ul>
          <li>
            <MathBlock math={"E[X] = \\tfrac{8}{(1+2)(1+0+4)} = \\tfrac{8}{15}"} />
          </li>
          <li>
            <MathBlock math={"E[Y] = \\tfrac{8}{(0+2)(0+1+4)} = \\tfrac{8}{10} = \\tfrac{4}{5}"} />
          </li>
          <li>
            <MathBlock math={"E[XY] = \\tfrac{8}{(1+2)(1+1+4)} = \\tfrac{8}{18} = \\tfrac{4}{9}"} />
          </li>
        </ul>
        <p>
          Check linearity: <MathBlock math={"E[X+Y] = \\tfrac{8}{15} + \\tfrac{4}{5} = \\tfrac{8+12}{15} = \\tfrac{4}{3}"} />.
          We can verify independently:{" "}
          <MathBlock math={"E[X+Y] = 8\\int_0^1 \\int_0^y (x+y) \\cdot xy\\, dx\\, dy"} />.
          Working this out gives the same <MathBlock math={"\\tfrac{4}{3}"} />.
        </p>
      </Example>

      <h3>Special Cases of Theorem 5.6</h3>

      <p>Setting specific choices of <MathBlock math={"g"} /> gives useful results:</p>

      <ul>
        <li>
          <MathBlock math={"g(X,Y) = X"} />: then{" "}
          <MathBlock math={"E[X] = \\sum_x \\sum_y x \\cdot f_{X,Y}(x,y) = \\sum_x x \\cdot f_X(x)"} />{" "}
          — just the ordinary expected value using the marginal.
        </li>
        <li>
          <MathBlock math={"g(X,Y) = X^2"} />: gives{" "}
          <MathBlock math={"E[X^2]"} />, useful for computing variance.
        </li>
        <li>
          <MathBlock math={"g(X,Y) = (X - \\mu_X)(Y - \\mu_Y)"} />: gives the{" "}
          <strong>covariance</strong> <MathBlock math={"\\text{Cov}(X,Y)"} /> (Topic 4).
        </li>
      </ul>

      <WorkedQuestion
        source="Homework 5.36"
        difficulty="easy"
        solution={
          <>
            <p>
              <strong>Using linearity of expectation:</strong>
            </p>
            <p>
              (a) <MathBlock math={"E[5X - Y] = 5E[X] - E[Y] = 5 \\cdot 3 - 8 = 7"} />.
            </p>
            <p>
              (b) <MathBlock math={"\\text{Var}(5X - Y) = 25\\,\\text{Var}(X) + \\text{Var}(Y) = 25 \\cdot 4 + 16 = 116"} />.
            </p>
            <p>
              For part (b), we used the fact that when <MathBlock math={"X"} /> and{" "}
              <MathBlock math={"Y"} /> are independent,{" "}
              <MathBlock math={"\\text{Var}(aX + bY) = a^2\\text{Var}(X) + b^2\\text{Var}(Y)"} />.
              Independence is assumed here (the general formula with covariance is in Topic 4).
            </p>
          </>
        }
      >
        <p>
          Let <MathBlock math={"E[X] = 3, E[Y] = 8, \\text{Var}(X) = 4, \\text{Var}(Y) = 16"} />,
          and assume <MathBlock math={"X, Y"} /> are independent.
        </p>
        <p>
          Find (a) <MathBlock math={"E[5X - Y]"} /> and (b) <MathBlock math={"\\text{Var}(5X - Y)"} />.
        </p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Homework 5.44"
        difficulty="medium"
        solution={
          <>
            <p>
              <strong>Step 1: Find the marginals.</strong>
            </p>
            <MathBlock
              math={"f_X(x) = \\int_x^1 6x\\, dy = 6x(1-x), \\quad 0 < x < 1"}
              display
            />
            <MathBlock
              math={"f_Y(y) = \\int_0^y 6x\\, dx = 3y^2, \\quad 0 < y < 1"}
              display
            />
            <p>
              <strong>Step 2: Compute expectations and variances.</strong>
            </p>
            <MathBlock
              math={"E[X] = \\int_0^1 6x^2(1-x)\\, dx = 6\\left(\\tfrac{1}{3} - \\tfrac{1}{4}\\right) = \\tfrac{1}{2}"}
              display
            />
            <MathBlock
              math={"E[X^2] = \\int_0^1 6x^3(1-x)\\, dx = 6\\left(\\tfrac{1}{4} - \\tfrac{1}{5}\\right) = \\tfrac{3}{10}"}
              display
            />
            <MathBlock
              math={"\\text{Var}(X) = \\tfrac{3}{10} - \\left(\\tfrac{1}{2}\\right)^2 = \\tfrac{3}{10} - \\tfrac{1}{4} = \\tfrac{1}{20}"}
              display
            />
            <MathBlock
              math={"E[Y] = \\int_0^1 3y^3\\, dy = \\tfrac{3}{4}, \\qquad \\text{Var}(Y) = \\tfrac{3}{5} - \\tfrac{9}{16} = \\tfrac{3}{80}"}
              display
            />
            <p>
              <strong>Step 3: Compute E[XY].</strong>
            </p>
            <MathBlock
              math={"E[XY] = \\int_0^1 \\int_0^y 6x^2 y\\, dx\\, dy = \\int_0^1 2y^4\\, dy = \\tfrac{2}{5}"}
              display
            />
            <p>
              <strong>Step 4: Covariance</strong> (preview of Topic 4):
            </p>
            <MathBlock
              math={"\\text{Cov}(X,Y) = E[XY] - E[X]E[Y] = \\tfrac{2}{5} - \\tfrac{1}{2} \\cdot \\tfrac{3}{4} = \\tfrac{2}{5} - \\tfrac{3}{8} = \\tfrac{1}{40}"}
              display
            />
          </>
        }
      >
        <p>
          Let <MathBlock math={"f_{X,Y}(x,y) = 6x"} /> for{" "}
          <MathBlock math={"0 < x < y < 1"} />.
        </p>
        <p>
          Find <MathBlock math={"E[X], E[Y], \\text{Var}(X), \\text{Var}(Y)"} />, and{" "}
          <MathBlock math={"E[XY]"} />.
        </p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Homework 5.33"
        difficulty="medium"
        solution={
          <>
            <p>
              <strong>Step 1:</strong> From the table, compute the marginals by summing
              rows and columns:
            </p>
            <MathBlock
              math={"f_X(0) = \\tfrac{4}{9} + \\tfrac{2}{9} + \\tfrac{1}{36} = \\tfrac{25}{36}, \\quad f_X(1) = \\tfrac{2}{9} + \\tfrac{2}{36} = \\tfrac{10}{36}, \\quad f_X(2) = \\tfrac{1}{36}"}
              display
            />
            <p>
              <strong>Step 2: Expected values.</strong>
            </p>
            <MathBlock
              math={"E[X] = 1 \\cdot \\tfrac{10}{36} + 2 \\cdot \\tfrac{1}{36} = \\tfrac{12}{36} = \\tfrac{1}{3}"}
              display
            />
            <MathBlock
              math={"E[Y] = 1 \\cdot \\tfrac{10}{36} + 2 \\cdot \\tfrac{1}{36} = \\tfrac{1}{3}"}
              display
            />
            <p>
              <strong>Step 3: E[XY].</strong>
            </p>
            <MathBlock
              math={"E[XY] = 1 \\cdot 1 \\cdot \\tfrac{2}{36} + \\text{(other non-zero terms)} = \\tfrac{1}{18}"}
              display
            />
            <p>
              <strong>Step 4: Covariance.</strong>
            </p>
            <MathBlock
              math={"\\text{Cov}(X,Y) = E[XY] - E[X]E[Y] = \\tfrac{1}{18} - \\tfrac{1}{3} \\cdot \\tfrac{1}{3} = \\tfrac{1}{18} - \\tfrac{1}{9} = -\\tfrac{1}{18}"}
              display
            />
            <p>
              The negative covariance means: when more of X is sold, fewer of Y tend to be sold
              (and vice versa).
            </p>
          </>
        }
      >
        <p>
          A shop sells items in two categories. The joint pdf is:
        </p>
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
                <td><MathBlock math={"Y=0"} /></td>
                <td>4/9</td>
                <td>2/9</td>
                <td>1/36</td>
              </tr>
              <tr>
                <td><MathBlock math={"Y=1"} /></td>
                <td>2/9</td>
                <td>2/36</td>
                <td>0</td>
              </tr>
              <tr>
                <td><MathBlock math={"Y=2"} /></td>
                <td>1/36</td>
                <td>0</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Compute <MathBlock math={"E[X], E[Y], E[XY]"} />, and{" "}
          <MathBlock math={"\\text{Cov}(X,Y)"} />.
        </p>
      </WorkedQuestion>
    </>
  )
}
