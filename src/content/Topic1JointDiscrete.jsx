import MathBlock from '../components/MathBlock'
import Definition from '../components/Definition'
import Theorem from '../components/Theorem'
import Proof from '../components/Proof'
import Example from '../components/Example'
import Note from '../components/Note'
import WorkedQuestion from '../components/WorkedQuestion'

export default function Topic1JointDiscrete() {
  return (
    <>
      <p>
        In PTS1 you studied single random variables — one variable, one distribution, one set of
        probabilities. But in practice, we almost always care about <em>several</em> variables at
        once. Think about households: income <MathBlock math={"X"} /> and average IQ{" "}
        <MathBlock math={"Y"} /> are both random, and the interesting questions involve them{" "}
        <em>together</em>. What is <MathBlock math={"P(X > 100 \\text{ and } Y < 90)"} />? Is
        there a statistical relationship between them? To answer these, we need a{" "}
        <strong>joint distribution</strong> — a single function that assigns probabilities to every
        combination of values that <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> can take
        simultaneously.
      </p>

      <p>
        This section develops the theory for the <strong>discrete</strong> case: both{" "}
        <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> take values from countable sets.
        We define the joint pdf, recover individual (marginal) distributions from it, introduce the
        joint CDF, and meet two important named distributions — the multinomial and the
        multivariate hypergeometric.
      </p>

      <h3>Joint Probability Distribution Function</h3>

      <p>
        When we have two discrete random variables, their joint behaviour is fully described by the
        probability of every possible pair of outcomes. This is the joint pdf.
      </p>

      <Definition id="def-5.1" title="Joint PDF (Def. 5.1)">
        <p>
          The <strong>joint (simultaneous / bivariate) probability distribution function</strong>{" "}
          (pdf) for the 2-dimensional discrete random variable{" "}
          <MathBlock math={"(X, Y)"} /> is defined as:
        </p>
        <MathBlock math={"f_{X,Y}(x, y) = P(X = x,\\, Y = y)"} display />
        <p>
          for all possible values <MathBlock math={"(x, y)"} /> of{" "}
          <MathBlock math={"(X, Y)"} />.
        </p>
      </Definition>

      <Note>
        <p>
          The notation <MathBlock math={"P(X = x,\\, Y = y)"} /> is shorthand for{" "}
          <MathBlock math={"P(X = x \\text{ and } Y = y)"} />. The comma means "and" — both
          events happen simultaneously. This function tells you: if you were to repeat the
          experiment many times, what fraction of the time would you see <em>exactly</em> the
          combination <MathBlock math={"(x, y)"} />?
        </p>
      </Note>

      <Example title="Example 5.1 — Rolling Two Dice">
        <p>
          Let <MathBlock math={"X"} /> = number of dots on the first die,{" "}
          <MathBlock math={"Y"} /> = number of dots on the second die. The dice are
          independent, so:
        </p>
        <MathBlock
          math={"P(X = 3, Y = 1) = P(X = 3) \\cdot P(Y = 1) = \\tfrac{1}{6} \\cdot \\tfrac{1}{6} = \\tfrac{1}{36}"}
          display
        />
        <p>
          In general, <MathBlock math={"f_{X,Y}(x,y) = \\tfrac{1}{36}"} /> for all{" "}
          <MathBlock math={"x, y \\in \\{1, 2, 3, 4, 5, 6\\}"} />. Every pair is equally likely.
        </p>
      </Example>

      <Example title="Example 5.2 — Shop Selling Items A and B">
        <p>
          A shop sells two items A and B. Let <MathBlock math={"X"} /> = number of units of A
          sold per day, <MathBlock math={"Y"} /> = number of units of B sold per day. The joint
          pdf is given by the following probability table:
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th></th>
                <th colSpan={4} style={{ textAlign: 'center' }}>
                  <MathBlock math={"X"} /> = Units of A sold
                </th>
              </tr>
              <tr>
                <th></th>
                <th>0</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><MathBlock math={"Y = 0"} /></td>
                <td>0.06</td>
                <td>0.12</td>
                <td>0.08</td>
                <td>0.04</td>
              </tr>
              <tr>
                <td><MathBlock math={"Y = 1"} /></td>
                <td>0.06</td>
                <td>0.18</td>
                <td>0.16</td>
                <td>0</td>
              </tr>
              <tr>
                <td><MathBlock math={"Y = 2"} /></td>
                <td>0.20</td>
                <td>0.10</td>
                <td>0</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          For instance, <MathBlock math={"f_{X,Y}(0,0) = P(X=0, Y=0) = 0.06"} />. This means
          there is a 6% chance that the shop sells zero units of both A and B on a given day.
          Notice that <MathBlock math={"f_{X,Y}(3,1) = 0"} /> — it is impossible to sell 3 of A
          and 1 of B on the same day (perhaps due to inventory constraints).
        </p>
      </Example>

      <p>
        Not every function can serve as a joint pdf. It must satisfy two conditions, analogous to
        the single-variable case:
      </p>

      <Theorem id="thm-5.1" title="Valid Joint PDF (Thm. 5.1)">
        <p>
          A function <MathBlock math={"f_{X,Y}(x, y)"} /> is the joint pdf for some
          two-dimensional discrete random variable <MathBlock math={"(X, Y)"} /> if and only if:
        </p>
        <MathBlock
          math={"\\text{1. } f_{X,Y}(x, y) \\geq 0 \\quad \\text{for all possible } (x, y)"}
          display
        />
        <MathBlock
          math={"\\text{2. } \\sum_{\\text{all } x} \\sum_{\\text{all } y} f_{X,Y}(x, y) = 1"}
          display
        />
      </Theorem>

      <Note>
        <p>
          Condition 1 says probabilities cannot be negative. Condition 2 says the total probability
          across all possible outcomes must equal 1 — something has to happen. You can verify
          condition 2 for the shop example: adding all 12 entries in the table gives{" "}
          <MathBlock math={"0.06 + 0.12 + 0.08 + 0.04 + 0.06 + 0.18 + 0.16 + 0 + 0.20 + 0.10 + 0 + 0 = 1.00"} />.
        </p>
      </Note>

      <h3>Marginal PDFs</h3>

      <p>
        Given the joint pdf of <MathBlock math={"(X, Y)"} />, we can recover the distribution of{" "}
        <MathBlock math={"X"} /> alone (or <MathBlock math={"Y"} /> alone) by summing out the
        other variable. The result is called a <strong>marginal pdf</strong> because, historically,
        these sums were written in the margins of the probability table.
      </p>

      <Definition id="def-5.2" title="Marginal PDFs (Def. 5.2)">
        <p>
          If <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> are discrete random
          variables with joint pdf <MathBlock math={"f_{X,Y}(x, y)"} />, then the{" "}
          <strong>marginal pdf's</strong> of <MathBlock math={"X"} /> and{" "}
          <MathBlock math={"Y"} /> are:
        </p>
        <MathBlock
          math={"f_X(x) = \\sum_{\\text{all } y} f_{X,Y}(x, y)"}
          display
        />
        <MathBlock
          math={"f_Y(y) = \\sum_{\\text{all } x} f_{X,Y}(x, y)"}
          display
        />
      </Definition>

      <Note>
        <p>
          Think of it this way: <MathBlock math={"f_X(x) = P(X = x)"} /> means "the probability
          that <MathBlock math={"X = x"} /> regardless of what <MathBlock math={"Y"} /> is."
          To get this, you add up the probabilities for <MathBlock math={"X = x"} /> paired with
          every possible value of <MathBlock math={"Y"} />:
        </p>
        <MathBlock
          math={"P(X = x) = P(X = x, Y = 0) + P(X = x, Y = 1) + P(X = x, Y = 2) + \\cdots"}
          display
        />
        <p>
          You are "summing out" or "marginalising over" the variable you don't care about.
        </p>
      </Note>

      <Example title="Marginals from the Shop Example">
        <p>
          From Example 5.2, let's compute <MathBlock math={"f_X(1) = P(X = 1)"} />. We sum
          column <MathBlock math={"x = 1"} /> across all rows:
        </p>
        <MathBlock
          math={"f_X(1) = f_{X,Y}(1,0) + f_{X,Y}(1,1) + f_{X,Y}(1,2) = 0.12 + 0.18 + 0.10 = 0.40"}
          display
        />
        <p>Computing all marginals and appending them to the table:</p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>0</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th><MathBlock math={"f_Y(y)"} /></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><MathBlock math={"Y=0"} /></td>
                <td>0.06</td>
                <td>0.12</td>
                <td>0.08</td>
                <td>0.04</td>
                <td><strong>0.30</strong></td>
              </tr>
              <tr>
                <td><MathBlock math={"Y=1"} /></td>
                <td>0.06</td>
                <td>0.18</td>
                <td>0.16</td>
                <td>0</td>
                <td><strong>0.40</strong></td>
              </tr>
              <tr>
                <td><MathBlock math={"Y=2"} /></td>
                <td>0.20</td>
                <td>0.10</td>
                <td>0</td>
                <td>0</td>
                <td><strong>0.30</strong></td>
              </tr>
              <tr>
                <td><MathBlock math={"f_X(x)"} /></td>
                <td><strong>0.32</strong></td>
                <td><strong>0.40</strong></td>
                <td><strong>0.24</strong></td>
                <td><strong>0.04</strong></td>
                <td><strong>1.00</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Row sums give <MathBlock math={"f_Y(y)"} />, column sums give{" "}
          <MathBlock math={"f_X(x)"} />. Both marginal distributions sum to 1, as they should —
          each one is a valid pdf on its own.
        </p>
      </Example>

      <h3>Joint Cumulative Distribution Function</h3>

      <p>
        Just as a single variable has a CDF <MathBlock math={"F_X(x) = P(X \\leq x)"} />, a
        pair of variables has a joint CDF that accumulates probability in two dimensions — the
        probability that <MathBlock math={"X"} /> is at most <MathBlock math={"x"} />{" "}
        <em>and</em> <MathBlock math={"Y"} /> is at most <MathBlock math={"y"} />.
      </p>

      <Definition id="def-5.3" title="Joint CDF (Def. 5.3)">
        <p>
          The <strong>joint cumulative distribution function</strong> (CDF) of the 2-dimensional
          random variable <MathBlock math={"(X, Y)"} /> is defined as:
        </p>
        <MathBlock
          math={"F_{X,Y}(x, y) = P(X \\leq x,\\, Y \\leq y)"}
          display
        />
      </Definition>

      <Example title="Example 5.5 — CDF from the Shop Example">
        <p>
          Continuing with Example 5.2, let's compute{" "}
          <MathBlock math={"F_{X,Y}(1, 2)"} />:
        </p>
        <MathBlock
          math={"F_{X,Y}(1, 2) = P(X \\leq 1, Y \\leq 2)"}
          display
        />
        <p>
          We need to sum all entries where <MathBlock math={"x \\leq 1"} /> and{" "}
          <MathBlock math={"y \\leq 2"} />. That's the first two columns (x = 0, 1) and all
          three rows (y = 0, 1, 2):
        </p>
        <MathBlock
          math={
            "F_{X,Y}(1,2) = 0.06 + 0.12 + 0.06 + 0.18 + 0.20 + 0.10 = 0.72"
          }
          display
        />
        <p>
          Notice that for any non-integer point in the support region, the CDF takes the same
          value as the nearest integer point below it. For example,{" "}
          <MathBlock math={"F_{X,Y}(1.4,\\, 2.8) = F_{X,Y}(1, 2) = 0.72"} /> because{" "}
          <MathBlock math={"X"} /> and <MathBlock math={"Y"} /> only take integer values.
        </p>
      </Example>

      <p>
        The joint CDF must satisfy certain properties to be a valid CDF. These generalise the
        univariate CDF conditions you know from PTS1:
      </p>

      <Theorem id="thm-5.2" title="Properties of Bivariate CDF (Thm. 5.2)">
        <p>
          A function <MathBlock math={"F_{X,Y}(x, y)"} /> is a bivariate CDF for some pair{" "}
          <MathBlock math={"(X, Y)"} /> if and only if:
        </p>
        <MathBlock
          math={
            "\\text{1. } \\lim_{x \\to -\\infty} F_{X,Y}(x, y) = 0 \\quad \\text{for all } y"
          }
          display
        />
        <MathBlock
          math={
            "\\text{2. } \\lim_{y \\to -\\infty} F_{X,Y}(x, y) = 0 \\quad \\text{for all } x"
          }
          display
        />
        <MathBlock
          math={
            "\\text{3. } \\lim_{x \\to \\infty,\\, y \\to \\infty} F_{X,Y}(x, y) = 1"
          }
          display
        />
        <MathBlock
          math={
            "\\text{4. } F_{X,Y}(b,d) - F_{X,Y}(b,c) - F_{X,Y}(a,d) + F_{X,Y}(a,c) \\geq 0 \\quad \\text{for all } a < b,\\, c < d"
          }
          display
        />
        <MathBlock
          math={
            "\\text{5. } \\lim_{h \\downarrow 0} F_{X,Y}(x+h, y) = \\lim_{h \\downarrow 0} F_{X,Y}(x, y+h) = F_{X,Y}(x, y)"
          }
          display
        />
      </Theorem>

      <Note>
        <p>
          Conditions 1-3 are intuitive: as either variable goes to{" "}
          <MathBlock math={"-\\infty"} />, the probability of being below that threshold is 0;
          when both go to <MathBlock math={"\\infty"} />, everything is captured so the total
          is 1. Condition 4 ensures that the probability of any rectangle{" "}
          <MathBlock math={"P(a < X \\leq b,\\, c < Y \\leq d)"} /> is non-negative — this
          is the 2D version of "the CDF is non-decreasing." Condition 5 is right-continuity in
          both arguments.
        </p>
      </Note>

      <h3>Multivariate Extension</h3>

      <p>
        Everything above generalises naturally from 2 variables to{" "}
        <MathBlock math={"k"} /> variables. Instead of a pair{" "}
        <MathBlock math={"(X, Y)"} />, we work with a{" "}
        <MathBlock math={"k"} />-dimensional random vector{" "}
        <MathBlock math={"\\vec{X} = (X_1, X_2, \\ldots, X_k)"} />.
      </p>

      <p>The definitions carry over with sums/products running over more indices:</p>

      <ul>
        <li>
          <strong>Joint pdf:</strong>{" "}
          <MathBlock math={"f_{\\vec{X}}(\\vec{x}) = P(X_1 = x_1, X_2 = x_2, \\ldots, X_k = x_k)"} />
        </li>
        <li>
          <strong>Validity:</strong>{" "}
          <MathBlock math={"f_{\\vec{X}}(\\vec{x}) \\geq 0"} /> for all{" "}
          <MathBlock math={"\\vec{x}"} />, and the sum over all possible{" "}
          <MathBlock math={"\\vec{x}"} /> equals 1.
        </li>
        <li>
          <strong>Marginal of <MathBlock math={"X_j"} />:</strong> sum the joint pdf over all
          variables except <MathBlock math={"X_j"} />.{" "}
          <MathBlock math={"f_{X_j}(x_j) = \\sum_{\\text{all } x_i,\\, i \\neq j} f_{\\vec{X}}(\\vec{x})"} />
        </li>
        <li>
          <strong>Joint CDF:</strong>{" "}
          <MathBlock math={"F_{\\vec{X}}(\\vec{x}) = P(X_1 \\leq x_1, \\ldots, X_k \\leq x_k)"} />
        </li>
      </ul>

      <h3>The Multinomial Distribution</h3>

      <p>
        You know the <strong>binomial distribution</strong> from PTS1: repeat an experiment{" "}
        <MathBlock math={"n"} /> times, each trial has two outcomes (Success / Failure), and{" "}
        <MathBlock math={"X"} /> counts the number of successes. The{" "}
        <strong>multinomial distribution</strong> is its natural generalisation to more than two
        outcomes.
      </p>

      <Definition id="def-multinomial" title="Multinomial Distribution">
        <p>
          Suppose we perform <MathBlock math={"n"} /> independent trials, and each trial results
          in exactly one of <MathBlock math={"k+1"} /> possible outcomes{" "}
          <MathBlock math={"E_1, E_2, \\ldots, E_{k+1}"} />, with probabilities:
        </p>
        <MathBlock
          math={"p_j = P(E_j), \\quad j = 1, \\ldots, k+1, \\qquad \\text{where } p_{k+1} = 1 - \\sum_{j=1}^{k} p_j"}
          display
        />
        <p>
          Let <MathBlock math={"X_j"} /> = number of times outcome{" "}
          <MathBlock math={"E_j"} /> occurs. Then{" "}
          <MathBlock math={"\\vec{X} = (X_1, \\ldots, X_k) \\sim \\text{Mult}(n,\\, p_1, \\ldots, p_k)"} />{" "}
          with joint pdf:
        </p>
        <MathBlock
          math={
            "f_{\\vec{X}}(\\vec{x}) = \\frac{n!}{x_1!\\, x_2!\\, \\cdots\\, x_k!\\, x_{k+1}!} \\, p_1^{x_1}\\, p_2^{x_2}\\, \\cdots\\, p_k^{x_k}\\, p_{k+1}^{x_{k+1}}"
          }
          display
        />
        <p>
          where <MathBlock math={"x_{k+1} = n - \\sum_{j=1}^{k} x_j"} /> and each{" "}
          <MathBlock math={"x_j \\geq 0"} />.
        </p>
      </Definition>

      <Note>
        <p>
          Why <MathBlock math={"k+1"} /> outcomes but only <MathBlock math={"k"} />{" "}
          variables? Because once you know how many times the first <MathBlock math={"k"} />{" "}
          outcomes occurred, the count for the last outcome is determined:{" "}
          <MathBlock math={"x_{k+1} = n - x_1 - \\cdots - x_k"} />. So{" "}
          <MathBlock math={"\\vec{X}"} /> has <MathBlock math={"k"} /> components, not{" "}
          <MathBlock math={"k+1"} />.
        </p>
        <p>
          The multinomial coefficient <MathBlock math={"\\frac{n!}{x_1! \\cdots x_{k+1}!}"} />{" "}
          counts the number of ways to arrange <MathBlock math={"n"} /> trials into groups of
          sizes <MathBlock math={"x_1, \\ldots, x_{k+1}"} />. The product of powers{" "}
          <MathBlock math={"p_1^{x_1} \\cdots p_{k+1}^{x_{k+1}}"} /> is the probability of any
          one specific arrangement.
        </p>
      </Note>

      <Example title="Example 5.8 — Rolling a Fair Die 20 Times">
        <p>
          Throw a fair die 20 times. Compute the probability of getting 2 ones, 2 twos, 2 threes,
          5 fours, and 5 fives.
        </p>
        <p>
          Here <MathBlock math={"n = 20"} />, <MathBlock math={"k + 1 = 6"} /> outcomes (the
          six faces), each with probability <MathBlock math={"p_j = \\tfrac{1}{6}"} />.
        </p>
        <p>
          We need <MathBlock math={"x_1 = 2, x_2 = 2, x_3 = 2, x_4 = 5, x_5 = 5"} />, which
          means <MathBlock math={"x_6 = 20 - 2 - 2 - 2 - 5 - 5 = 4"} /> sixes.
        </p>
        <MathBlock
          math={
            "f_{\\vec{X}}(2,2,2,5,5) = \\frac{20!}{2!\\cdot 2!\\cdot 2!\\cdot 5!\\cdot 5!\\cdot 4!} \\cdot \\left(\\tfrac{1}{6}\\right)^{2} \\cdot \\left(\\tfrac{1}{6}\\right)^{2} \\cdot \\left(\\tfrac{1}{6}\\right)^{2} \\cdot \\left(\\tfrac{1}{6}\\right)^{5} \\cdot \\left(\\tfrac{1}{6}\\right)^{5} \\cdot \\left(\\tfrac{1}{6}\\right)^{4}"
          }
          display
        />
        <MathBlock
          math={
            "= \\frac{20!}{2!\\cdot 2!\\cdot 2!\\cdot 5!\\cdot 5!\\cdot 4!} \\cdot \\left(\\tfrac{1}{6}\\right)^{20} \\approx 0.00024"
          }
          display
        />
      </Example>

      <h3>The Multivariate Hypergeometric Distribution</h3>

      <p>
        The multinomial distribution models sampling <em>with</em> replacement (each trial is
        independent, probabilities stay constant). The{" "}
        <strong>multivariate hypergeometric distribution</strong> models sampling{" "}
        <em>without</em> replacement from a finite population with more than two types of items.
      </p>

      <Definition id="def-mv-hypergeometric" title="Multivariate Hypergeometric Distribution">
        <p>
          A population of <MathBlock math={"N"} /> items contains{" "}
          <MathBlock math={"N_1"} /> items of type 1, <MathBlock math={"N_2"} /> of type 2, …,{" "}
          <MathBlock math={"N_{k+1}"} /> of type <MathBlock math={"k+1"} />, where{" "}
          <MathBlock math={"N_1 + N_2 + \\cdots + N_{k+1} = N"} />. Draw{" "}
          <MathBlock math={"n"} /> items without replacement. Let{" "}
          <MathBlock math={"X_j"} /> = number of type-<MathBlock math={"j"} /> items drawn.
          Then:
        </p>
        <MathBlock
          math={
            "f_{\\vec{X}}(x_1, \\ldots, x_k) = \\frac{\\binom{N_1}{x_1} \\binom{N_2}{x_2} \\cdots \\binom{N_{k+1}}{x_{k+1}}}{\\binom{N}{n}}"
          }
          display
        />
        <p>
          where <MathBlock math={"x_{k+1} = n - \\sum_{j=1}^{k} x_j"} />.
        </p>
      </Definition>

      <Note>
        <p>
          The structure mirrors the univariate hypergeometric from PTS1 (drawing red and black
          balls), but now the population has more than two categories. The numerator counts
          favourable outcomes by choosing <MathBlock math={"x_j"} /> items from each type; the
          denominator counts the total number of ways to choose <MathBlock math={"n"} /> items.
        </p>
      </Note>

      <WorkedQuestion
        source="Tutorial 1"
        difficulty="medium"
        solution={
          <>
            <p>
              <strong>Step 1: Identify the setup.</strong> We need to verify that the given
              function satisfies the two conditions of Theorem 5.1.
            </p>
            <p>
              <strong>Step 2: Check non-negativity.</strong> All probabilities{" "}
              <MathBlock math={"c, 2c, 3c, 4c, 5c, 6c, 7c"} /> are non-negative as long as{" "}
              <MathBlock math={"c \\geq 0"} />.
            </p>
            <p>
              <strong>Step 3: Use the sum-to-one condition.</strong> Sum all entries:
            </p>
            <MathBlock
              math={"c + 2c + 3c + 4c + 5c + 6c + 7c = 28c = 1 \\implies c = \\tfrac{1}{28}"}
              display
            />
            <p>
              <strong>Step 4: Find the marginal of <MathBlock math={"X"} />.</strong> Sum each
              column across all rows of <MathBlock math={"Y"} />.
            </p>
            <MathBlock
              math={"f_X(0) = \\tfrac{1}{28}(1 + 2) = \\tfrac{3}{28}, \\quad f_X(1) = \\tfrac{1}{28}(3 + 4) = \\tfrac{7}{28} = \\tfrac{1}{4}"}
              display
            />
            <MathBlock
              math={"f_X(2) = \\tfrac{1}{28}(5 + 6) = \\tfrac{11}{28}, \\quad f_X(3) = \\tfrac{7}{28} = \\tfrac{1}{4}"}
              display
            />
            <p>Check: <MathBlock math={"\\tfrac{3}{28} + \\tfrac{7}{28} + \\tfrac{11}{28} + \\tfrac{7}{28} = \\tfrac{28}{28} = 1"} />. Correct.</p>
          </>
        }
      >
        <p>
          The joint pdf of <MathBlock math={"(X, Y)"} /> is given by{" "}
          <MathBlock math={"f_{X,Y}(x, y) = c(2x + y + 1)"} /> for{" "}
          <MathBlock math={"x = 0, 1, 2, 3"} /> and <MathBlock math={"y = 0, 1"} />.
        </p>
        <p>
          (a) Find the value of <MathBlock math={"c"} />.
          <br />
          (b) Find the marginal pdf of <MathBlock math={"X"} />.
        </p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Reader §5.1"
        difficulty="easy"
        solution={
          <>
            <p>
              <strong>Step 1:</strong> <MathBlock math={"P(X \\geq 2, Y \\leq 1)"} /> means we
              sum all entries where <MathBlock math={"x \\geq 2"} /> and{" "}
              <MathBlock math={"y \\leq 1"} />.
            </p>
            <p>
              <strong>Step 2:</strong> From the table, the relevant entries are:
            </p>
            <MathBlock
              math={"f(2,0) + f(2,1) + f(3,0) + f(3,1) = 0.08 + 0.16 + 0.04 + 0 = 0.28"}
              display
            />
            <p>
              There is a 28% chance that at least 2 of A and at most 1 of B are sold.
            </p>
          </>
        }
      >
        <p>
          Using the shop example (Example 5.2), find{" "}
          <MathBlock math={"P(X \\geq 2, Y \\leq 1)"} />.
        </p>
      </WorkedQuestion>
    </>
  )
}
