import MathBlock from '../components/MathBlock'
import Definition from '../components/Definition'
import Theorem from '../components/Theorem'
import Example from '../components/Example'
import Note from '../components/Note'
import WorkedQuestion from '../components/WorkedQuestion'

export default function Topic10HypothesisFundamentals() {
  return (
    <>
      <p>
        Confidence intervals tell us <em>where</em> a parameter might be. But often
        we want to answer a yes-or-no question: &ldquo;Is the mean really 50?&rdquo;
        &ldquo;Does the new drug work better than the old one?&rdquo; This is the
        domain of <strong>hypothesis testing</strong>. We set up two competing
        statements about the population, collect data, and decide which statement is
        better supported. This topic covers the general framework, the two types of
        errors we can make, and the concept of <strong>power</strong> — the
        probability that a test correctly detects a real effect.
      </p>

      {/* ════════════════════════════════════════════
          §8.1 — GENERAL FRAMEWORK
          ════════════════════════════════════════════ */}
      <h3>The Framework of Hypothesis Testing (§8.1)</h3>

      <Definition id="def-hypotheses" title="Null and Alternative Hypotheses">
        <p>
          A <strong>statistical hypothesis</strong> is a statement about a population
          parameter. A hypothesis test always involves two hypotheses:
        </p>
        <ul>
          <li>
            <MathBlock math={"H_0"} /> (the <strong>null hypothesis</strong>): the
            &ldquo;default&rdquo; or &ldquo;status quo&rdquo; claim — typically a
            statement of no effect, no difference, or a specific parameter value.
          </li>
          <li>
            <MathBlock math={"H_1"} /> (or <MathBlock math={"H_a"} />, the{' '}
            <strong>alternative hypothesis</strong>): the claim we want to find
            evidence <em>for</em> — typically a statement that something has changed,
            differs, or has an effect.
          </li>
        </ul>
        <p>
          The null hypothesis always contains an equality: e.g.,{' '}
          <MathBlock math={"H_0: \\theta = \\theta_0"} /> (or{' '}
          <MathBlock math={"\\leq"} />, <MathBlock math={"\\geq"} />).
        </p>
      </Definition>

      <p>
        The logic of hypothesis testing is analogous to a criminal trial: the
        defendant is presumed innocent (<MathBlock math={"H_0"} />) until the
        evidence is strong enough to convict (reject <MathBlock math={"H_0"} /> in
        favour of <MathBlock math={"H_1"} />). We never &ldquo;prove&rdquo;{' '}
        <MathBlock math={"H_0"} /> — we either reject it or fail to reject it (just
        as a &ldquo;not guilty&rdquo; verdict is not the same as &ldquo;innocent&rdquo;).
      </p>

      <p><strong>Types of alternative hypotheses:</strong></p>
      <ul>
        <li>
          <strong>Two-sided:</strong>{' '}
          <MathBlock math={"H_0: \\theta = \\theta_0"} /> vs.{' '}
          <MathBlock math={"H_1: \\theta \\neq \\theta_0"} /> — reject if the
          parameter is significantly different in <em>either</em> direction.
        </li>
        <li>
          <strong>One-sided (right):</strong>{' '}
          <MathBlock math={"H_0: \\theta \\leq \\theta_0"} /> vs.{' '}
          <MathBlock math={"H_1: \\theta > \\theta_0"} /> — reject only if the
          parameter is significantly <em>larger</em>.
        </li>
        <li>
          <strong>One-sided (left):</strong>{' '}
          <MathBlock math={"H_0: \\theta \\geq \\theta_0"} /> vs.{' '}
          <MathBlock math={"H_1: \\theta < \\theta_0"} /> — reject only if the
          parameter is significantly <em>smaller</em>.
        </li>
      </ul>

      <h4>Test Statistics and Rejection Regions</h4>

      <Definition id="def-test-stat" title="Test Statistic and Rejection Region">
        <p>
          A <strong>test statistic</strong> is a function of the sample data that
          measures how far the observed data deviates from what{' '}
          <MathBlock math={"H_0"} /> predicts. Under <MathBlock math={"H_0"} />,
          the test statistic follows a known distribution (e.g., standard normal,
          t, chi-squared, or F).
        </p>
        <p>
          The <strong>rejection region</strong> (or <strong>critical region</strong>)
          is the set of values of the test statistic for which we reject{' '}
          <MathBlock math={"H_0"} />. It is determined by the{' '}
          <strong>significance level</strong> <MathBlock math={"\\alpha"} />.
        </p>
      </Definition>

      <p><strong>General procedure:</strong></p>
      <ol>
        <li>State <MathBlock math={"H_0"} /> and <MathBlock math={"H_1"} />.</li>
        <li>Choose the significance level <MathBlock math={"\\alpha"} /> (commonly 0.05, 0.01, or 0.10).</li>
        <li>Compute the test statistic from the sample data.</li>
        <li>
          Find the rejection region (critical values) or the p-value. Compare and
          decide: reject <MathBlock math={"H_0"} /> or fail to reject{' '}
          <MathBlock math={"H_0"} />.
        </li>
      </ol>

      <h4>The p-Value</h4>

      <Definition id="def-p-value" title="p-Value">
        <p>
          The <strong>p-value</strong> is the probability, computed under{' '}
          <MathBlock math={"H_0"} />, of observing a test statistic as extreme as
          (or more extreme than) the one actually obtained:
        </p>
        <ul>
          <li>
            <strong>Two-sided:</strong>{' '}
            <MathBlock math={"p = 2 \\cdot P(|Z| \\geq |z_{\\text{obs}}| \\mid H_0)"} />.
          </li>
          <li>
            <strong>Right-sided:</strong>{' '}
            <MathBlock math={"p = P(Z \\geq z_{\\text{obs}} \\mid H_0)"} />.
          </li>
          <li>
            <strong>Left-sided:</strong>{' '}
            <MathBlock math={"p = P(Z \\leq z_{\\text{obs}} \\mid H_0)"} />.
          </li>
        </ul>
        <p>
          <strong>Decision rule:</strong> Reject <MathBlock math={"H_0"} /> if and
          only if <MathBlock math={"p \\leq \\alpha"} />.
        </p>
      </Definition>

      <Note>
        <p>
          The p-value is <strong>not</strong> the probability that{' '}
          <MathBlock math={"H_0"} /> is true. It is the probability of seeing data
          at least as extreme as what we observed, <em>assuming</em>{' '}
          <MathBlock math={"H_0"} /> is true. A small p-value means the observed
          data would be surprising under <MathBlock math={"H_0"} />, which is
          evidence against it.
        </p>
      </Note>

      <Example title="Intuition: Critical Region Approach vs. p-Value Approach">
        <p>
          Both approaches are equivalent and always give the same conclusion. The
          critical region approach asks: &ldquo;Is the test statistic in the rejection
          region?&rdquo; The p-value approach asks: &ldquo;Is the p-value &le;{' '}
          <MathBlock math={"\\alpha"} />?&rdquo; They are two sides of the same coin:
        </p>
        <ul>
          <li>
            <MathBlock math={"z_{\\text{obs}}"} /> falls in the rejection region{' '}
            <MathBlock math={"\\Longleftrightarrow"} /> <MathBlock math={"p \\leq \\alpha"} />.
          </li>
        </ul>
        <p>
          Think of the p-value as the <em>smallest significance level at which we
          would still reject</em> <MathBlock math={"H_0"} />.
        </p>
      </Example>

      {/* ════════════════════════════════════════════
          §8.2 — ERRORS IN HYPOTHESIS TESTING
          ════════════════════════════════════════════ */}
      <h3>Errors in Hypothesis Testing (§8.2)</h3>

      <p>
        When we make a decision, we can be right or wrong. There are exactly two
        types of errors:
      </p>

      <Definition id="def-errors" title="Type I and Type II Errors">
        <ul>
          <li>
            <strong>Type I error</strong> (false positive): rejecting{' '}
            <MathBlock math={"H_0"} /> when <MathBlock math={"H_0"} /> is actually
            true. Probability: <MathBlock math={"\\alpha = P(\\text{reject } H_0 \\mid H_0 \\text{ true})"} />.
          </li>
          <li>
            <strong>Type II error</strong> (false negative): failing to reject{' '}
            <MathBlock math={"H_0"} /> when <MathBlock math={"H_0"} /> is actually
            false. Probability: <MathBlock math={"\\beta = P(\\text{fail to reject } H_0 \\mid H_0 \\text{ false})"} />.
          </li>
        </ul>
      </Definition>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th></th>
              <th><MathBlock math={"H_0"} /> True</th>
              <th><MathBlock math={"H_0"} /> False</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Reject <MathBlock math={"H_0"} /></strong></td>
              <td>Type I error (<MathBlock math={"\\alpha"} />)</td>
              <td>Correct! (<MathBlock math={"1 - \\beta"} /> = Power)</td>
            </tr>
            <tr>
              <td><strong>Fail to reject <MathBlock math={"H_0"} /></strong></td>
              <td>Correct! (<MathBlock math={"1 - \\alpha"} />)</td>
              <td>Type II error (<MathBlock math={"\\beta"} />)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Note>
        <p>
          <MathBlock math={"\\alpha"} /> and <MathBlock math={"\\beta"} /> are
          inversely related: decreasing <MathBlock math={"\\alpha"} /> (demanding
          stronger evidence to reject) increases <MathBlock math={"\\beta"} /> (makes
          it harder to detect real effects), and vice versa. The only way to
          reduce <em>both</em> simultaneously is to increase the sample size{' '}
          <MathBlock math={"n"} />.
        </p>
        <p>
          A helpful mnemonic: <MathBlock math={"\\alpha"} /> is &ldquo;crying
          wolf&rdquo; (claiming an effect that isn&rsquo;t there), while{' '}
          <MathBlock math={"\\beta"} /> is &ldquo;missing the wolf&rdquo; (failing
          to detect a real effect).
        </p>
      </Note>

      <p>
        We <em>choose</em> <MathBlock math={"\\alpha"} /> (it is the significance
        level we specify before the test). We then <em>calculate</em>{' '}
        <MathBlock math={"\\beta"} /> for a specific value of the parameter under{' '}
        <MathBlock math={"H_1"} />. This is because{' '}
        <MathBlock math={"\\beta"} /> depends on how far the true parameter is from
        the null value — a large deviation is easier to detect (smaller{' '}
        <MathBlock math={"\\beta"} />) than a small one.
      </p>

      {/* ════════════════════════════════════════════
          §8.3 — POWER OF A TEST
          ════════════════════════════════════════════ */}
      <h3>Power of a Test (§8.3)</h3>

      <Definition id="def-power" title="Power">
        <p>
          The <strong>power</strong> of a test against a specific alternative value{' '}
          <MathBlock math={"\\theta_1"} /> is the probability of correctly rejecting{' '}
          <MathBlock math={"H_0"} /> when <MathBlock math={"\\theta = \\theta_1"} />:
        </p>
        <MathBlock
          math={"\\text{Power}(\\theta_1) = 1 - \\beta(\\theta_1) = P(\\text{reject } H_0 \\mid \\theta = \\theta_1)"}
          display
        />
        <p>
          Higher power means a better test — it is more likely to detect a real
          departure from <MathBlock math={"H_0"} />.
        </p>
      </Definition>

      <p><strong>Factors that increase power:</strong></p>
      <ul>
        <li>
          <strong>Larger sample size <MathBlock math={"n"} /></strong> — more data
          means the test statistic is more sensitive to deviations.
        </li>
        <li>
          <strong>Larger significance level <MathBlock math={"\\alpha"} /></strong>{' '}
          — a wider rejection region catches more alternatives (but at the cost of
          more Type I errors).
        </li>
        <li>
          <strong>Larger true effect size</strong> — the further{' '}
          <MathBlock math={"\\theta_1"} /> is from <MathBlock math={"\\theta_0"} />,
          the easier it is to detect.
        </li>
        <li>
          <strong>Smaller population variance <MathBlock math={"\\sigma^2"} /></strong>{' '}
          — less noise makes the signal easier to spot.
        </li>
      </ul>

      <h4>Computing Power for a z-Test (Step by Step)</h4>

      <p>
        Consider <MathBlock math={"H_0: \\mu = \\mu_0"} /> vs.{' '}
        <MathBlock math={"H_1: \\mu = \\mu_1 > \\mu_0"} /> (right-sided), with{' '}
        <MathBlock math={"\\sigma"} /> known and sample size{' '}
        <MathBlock math={"n"} />.
      </p>

      <p><strong>Step 1:</strong> Find the critical value under <MathBlock math={"H_0"} />.</p>
      <p>
        Reject <MathBlock math={"H_0"} /> when{' '}
        <MathBlock math={"\\bar{X} > c"} />, where{' '}
        <MathBlock math={"c = \\mu_0 + z_\\alpha \\cdot \\frac{\\sigma}{\\sqrt{n}}"} />.
      </p>

      <p>
        <strong>Step 2:</strong> Compute <MathBlock math={"P(\\bar{X} > c)"} />{' '}
        when the true mean is <MathBlock math={"\\mu_1"} />.
      </p>
      <MathBlock
        math={"\\text{Power} = P(\\bar{X} > c \\mid \\mu = \\mu_1) = P\\!\\left(Z > \\frac{c - \\mu_1}{\\sigma/\\sqrt{n}}\\right) = 1 - \\Phi\\!\\left(\\frac{c - \\mu_1}{\\sigma/\\sqrt{n}}\\right)"}
        display
      />
      <p>
        Substituting <MathBlock math={"c = \\mu_0 + z_\\alpha \\cdot \\sigma / \\sqrt{n}"} />:
      </p>
      <MathBlock
        math={"\\text{Power} = 1 - \\Phi\\!\\left(z_\\alpha - \\frac{\\mu_1 - \\mu_0}{\\sigma/\\sqrt{n}}\\right)"}
        display
      />

      <Note>
        For a <strong>two-sided</strong> test (<MathBlock math={"H_1: \\mu \\neq \\mu_0"} />),
        the power has contributions from both tails:
        <MathBlock
          math={"\\text{Power} = P(\\bar{X} > c_U \\mid \\mu_1) + P(\\bar{X} < c_L \\mid \\mu_1)"}
          display
        />
        where <MathBlock math={"c_U = \\mu_0 + z_{\\alpha/2} \\cdot \\sigma/\\sqrt{n}"} /> and{' '}
        <MathBlock math={"c_L = \\mu_0 - z_{\\alpha/2} \\cdot \\sigma/\\sqrt{n}"} />. In
        practice, for a specific <MathBlock math={"\\mu_1 > \\mu_0"} />, the lower-tail
        probability is negligible and the power is approximately{' '}
        <MathBlock math={"1 - \\Phi(z_{\\alpha/2} - (\\mu_1 - \\mu_0)/(\\sigma/\\sqrt{n}))"} />.
      </Note>

      <h4>The Power Function and OC Curve</h4>

      <p>
        The <strong>power function</strong> <MathBlock math={"\\pi(\\theta)"} /> gives the
        probability of rejecting <MathBlock math={"H_0"} /> as a function of the
        true parameter value:
      </p>
      <MathBlock
        math={"\\pi(\\theta) = P(\\text{reject } H_0 \\mid \\theta)"}
        display
      />
      <ul>
        <li>
          When <MathBlock math={"\\theta = \\theta_0"} /> (i.e., <MathBlock math={"H_0"} />{' '}
          is true): <MathBlock math={"\\pi(\\theta_0) = \\alpha"} />.
        </li>
        <li>
          When <MathBlock math={"\\theta \\neq \\theta_0"} /> (i.e., <MathBlock math={"H_0"} />{' '}
          is false): <MathBlock math={"\\pi(\\theta) = 1 - \\beta(\\theta)"} />.
        </li>
      </ul>
      <p>
        The <strong>operating characteristic (OC) curve</strong> plots{' '}
        <MathBlock math={"\\beta(\\theta) = 1 - \\pi(\\theta)"} /> — the probability
        of <em>failing</em> to reject. It is simply the mirror image of the power
        function.
      </p>

      <h4>Sample Size Determination for a Desired Power</h4>

      <p>
        In practice, we often want to choose <MathBlock math={"n"} /> so that the
        test has power at least <MathBlock math={"1 - \\beta"} /> at a specific
        alternative <MathBlock math={"\\mu_1"} />. For a one-sided z-test:
      </p>
      <MathBlock
        math={"n \\geq \\left(\\frac{(z_\\alpha + z_\\beta)\\,\\sigma}{\\mu_1 - \\mu_0}\\right)^{\\!2}"}
        display
      />
      <p>
        For a two-sided z-test, replace <MathBlock math={"z_\\alpha"} /> with{' '}
        <MathBlock math={"z_{\\alpha/2}"} />.
      </p>

      <Example title="Example — Power of a One-Sided z-Test">
        <p>
          Test <MathBlock math={"H_0: \\mu = 20"} /> vs.{' '}
          <MathBlock math={"H_1: \\mu > 20"} /> at{' '}
          <MathBlock math={"\\alpha = 0.05"} />, with{' '}
          <MathBlock math={"\\sigma = 4"} /> and <MathBlock math={"n = 16"} />.
          What is the power when <MathBlock math={"\\mu_1 = 22"} />?
        </p>
        <p>
          <strong>Step 1:</strong> Critical value on the{' '}
          <MathBlock math={"\\bar{X}"} /> scale:
        </p>
        <MathBlock
          math={"c = 20 + 1.645 \\cdot \\frac{4}{\\sqrt{16}} = 20 + 1.645 = 21.645"}
          display
        />
        <p>
          <strong>Step 2:</strong> Under{' '}
          <MathBlock math={"\\mu_1 = 22"} />:
        </p>
        <MathBlock
          math={"\\text{Power} = P\\!\\left(Z > \\frac{21.645 - 22}{4/\\sqrt{16}}\\right) = P(Z > -0.355) = \\Phi(0.355) \\approx 0.639"}
          display
        />
        <p>
          Alternatively using the formula:{' '}
          <MathBlock math={"\\text{Power} = 1 - \\Phi\\!\\left(1.645 - \\frac{22-20}{4/4}\\right) = 1 - \\Phi(-0.355) = 0.639"} />.
        </p>
        <p>
          So there is a 63.9% chance of correctly rejecting{' '}
          <MathBlock math={"H_0"} /> when the true mean is 22. This is moderate
          power — if we needed 80% power, we could compute the required{' '}
          <MathBlock math={"n"} />:
        </p>
        <MathBlock
          math={"n \\geq \\left(\\frac{(1.645 + 0.842) \\times 4}{22 - 20}\\right)^{\\!2} = \\left(\\frac{9.948}{2}\\right)^{\\!2} = (4.974)^2 = 24.74 \\;\\Rightarrow\\; n \\geq 25"}
          display
        />
      </Example>

      <Example title="Example — Power of a Two-Sided z-Test">
        <p>
          Test <MathBlock math={"H_0: \\mu = 50"} /> vs.{' '}
          <MathBlock math={"H_1: \\mu \\neq 50"} /> at{' '}
          <MathBlock math={"\\alpha = 0.05"} />, with{' '}
          <MathBlock math={"\\sigma = 10"} /> and <MathBlock math={"n = 25"} />.
          Find the power when <MathBlock math={"\\mu_1 = 55"} />.
        </p>
        <p>The rejection region on the <MathBlock math={"\\bar{X}"} /> scale:</p>
        <MathBlock
          math={"c_L = 50 - 1.96 \\cdot \\frac{10}{5} = 46.08, \\qquad c_U = 50 + 1.96 \\cdot 2 = 53.92"}
          display
        />
        <p>Under <MathBlock math={"\\mu_1 = 55"} />:</p>
        <MathBlock
          math={"P(\\bar{X} > 53.92) = P\\!\\left(Z > \\frac{53.92 - 55}{2}\\right) = P(Z > -0.54) = 0.7054"}
          display
        />
        <MathBlock
          math={"P(\\bar{X} < 46.08) = P\\!\\left(Z < \\frac{46.08 - 55}{2}\\right) = P(Z < -4.46) \\approx 0"}
          display
        />
        <p>
          Power <MathBlock math={"\\approx 0.705 + 0 = 0.705"} />, so about 70.5%.
        </p>
      </Example>

      {/* ════════════════════════════════════════════
          §8.1 — RELATIONSHIP CI AND HT
          ════════════════════════════════════════════ */}
      <h3>Relationship Between Confidence Intervals and Hypothesis Tests</h3>

      <p>
        Confidence intervals and hypothesis tests are two sides of the same coin.
        For a two-sided test at level <MathBlock math={"\\alpha"} />:
      </p>

      <Theorem id="thm-ci-ht-duality" title="CI–HT Duality">
        <p>
          Reject <MathBlock math={"H_0: \\theta = \\theta_0"} /> at significance
          level <MathBlock math={"\\alpha"} /> if and only if{' '}
          <MathBlock math={"\\theta_0"} /> lies <strong>outside</strong> the{' '}
          <MathBlock math={"100(1-\\alpha)\\%"} /> confidence interval for{' '}
          <MathBlock math={"\\theta"} />.
        </p>
      </Theorem>

      <p>
        This means you can always convert between the two: if a 95% CI for{' '}
        <MathBlock math={"\\mu"} /> is <MathBlock math={"(3.2, 7.8)"} />, then you
        would reject <MathBlock math={"H_0: \\mu = 2"} /> at{' '}
        <MathBlock math={"\\alpha = 0.05"} /> (since 2 is outside the interval),
        but fail to reject <MathBlock math={"H_0: \\mu = 5"} /> (since 5 is
        inside).
      </p>

      {/* ════════════════════════════════════════════
          WORKED QUESTIONS
          ════════════════════════════════════════════ */}
      <h3>Worked Questions</h3>

      <WorkedQuestion
        source="Exercise 8.2"
        difficulty="standard"
        solution={
          <>
            <p>
              <strong>(a) Hypotheses and test statistic:</strong>{' '}
              <MathBlock math={"H_0: \\mu = 21"} /> vs.{' '}
              <MathBlock math={"H_1: \\mu \\neq 21"} />. Since{' '}
              <MathBlock math={"\\sigma = 4"} /> is known,
            </p>
            <MathBlock
              math={"Z = \\frac{\\bar{X} - 21}{4/\\sqrt{n}} \\sim N(0,1) \\text{ under } H_0"}
              display
            />
            <p>
              With <MathBlock math={"n = 9"} /> and{' '}
              <MathBlock math={"\\bar{x} = 23"} />:
            </p>
            <MathBlock
              math={"z_{\\text{obs}} = \\frac{23 - 21}{4/\\sqrt{9}} = \\frac{2}{4/3} = 1.5"}
              display
            />
            <p>
              <strong>(b) Rejection region</strong> at{' '}
              <MathBlock math={"\\alpha = 0.05"} /> (two-sided):{' '}
              reject if <MathBlock math={"|z_{\\text{obs}}| > z_{0.025} = 1.96"} />.
            </p>
            <p>
              Since <MathBlock math={"|1.5| = 1.5 < 1.96"} />, we{' '}
              <strong>fail to reject</strong> <MathBlock math={"H_0"} />.
            </p>
            <p>
              <strong>(c) p-value:</strong>{' '}
              <MathBlock math={"p = 2 \\cdot P(Z > 1.5) = 2 \\times 0.0668 = 0.1336"} />.
            </p>
            <p>
              Since <MathBlock math={"p = 0.134 > 0.05 = \\alpha"} />, same
              conclusion: fail to reject. The data is not unusual enough under{' '}
              <MathBlock math={"H_0"} /> to warrant rejection.
            </p>
          </>
        }
      >
        <p>
          A sample of <MathBlock math={"n = 9"} /> from a normal population with{' '}
          <MathBlock math={"\\sigma = 4"} /> yields{' '}
          <MathBlock math={"\\bar{x} = 23"} />. Test{' '}
          <MathBlock math={"H_0: \\mu = 21"} /> vs.{' '}
          <MathBlock math={"H_1: \\mu \\neq 21"} /> at{' '}
          <MathBlock math={"\\alpha = 0.05"} />.
        </p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Exercise 8.7"
        difficulty="standard"
        solution={
          <>
            <p>
              <MathBlock math={"H_0: \\mu = 90"} /> vs.{' '}
              <MathBlock math={"H_1: \\mu < 90"} /> (left-sided, we want to detect
              if filling is below target). Given <MathBlock math={"\\sigma = 5"} />,{' '}
              <MathBlock math={"n = 50"} />, <MathBlock math={"\\bar{x} = 88.7"} />,{' '}
              <MathBlock math={"\\alpha = 0.01"} />.
            </p>
            <MathBlock
              math={"z_{\\text{obs}} = \\frac{88.7 - 90}{5/\\sqrt{50}} = \\frac{-1.3}{0.707} = -1.838"}
              display
            />
            <p>
              <strong>Rejection region</strong> (left-sided): reject if{' '}
              <MathBlock math={"z_{\\text{obs}} < -z_{0.01} = -2.326"} />.
            </p>
            <p>
              Since <MathBlock math={"-1.838 > -2.326"} />, we{' '}
              <strong>fail to reject</strong> <MathBlock math={"H_0"} />. The
              evidence is not strong enough at the 1% level to conclude the machine
              is under-filling.
            </p>
            <p>
              <strong>p-value:</strong>{' '}
              <MathBlock math={"p = P(Z < -1.838) = 0.033"} />. Since{' '}
              <MathBlock math={"0.033 > 0.01"} />, consistent with our conclusion.
              Note: at <MathBlock math={"\\alpha = 0.05"} />, we <em>would</em>{' '}
              reject. The conclusion depends on the chosen significance level.
            </p>
          </>
        }
      >
        <p>
          A filling machine is set to dispense <MathBlock math={"\\mu = 90"} /> ml.
          A sample of 50 bottles gives <MathBlock math={"\\bar{x} = 88.7"} /> ml
          with <MathBlock math={"\\sigma = 5"} />. Is there evidence that the machine
          is under-filling? Test at <MathBlock math={"\\alpha = 0.01"} />.
        </p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Exercise 8.11 — Power Calculation"
        difficulty="exam-level"
        solution={
          <>
            <p>
              Test <MathBlock math={"H_0: \\mu = 50"} /> vs.{' '}
              <MathBlock math={"H_1: \\mu > 50"} /> with{' '}
              <MathBlock math={"\\alpha = 0.05"} />,{' '}
              <MathBlock math={"\\sigma = 6"} />,{' '}
              <MathBlock math={"n = 36"} />.
            </p>
            <p><strong>(a) Power at <MathBlock math={"\\mu_1 = 52"} />:</strong></p>
            <p>Critical value on the <MathBlock math={"\\bar{X}"} /> scale:</p>
            <MathBlock
              math={"c = 50 + 1.645 \\cdot \\frac{6}{\\sqrt{36}} = 50 + 1.645 = 51.645"}
              display
            />
            <p>Under <MathBlock math={"\\mu_1 = 52"} />:</p>
            <MathBlock
              math={"\\text{Power} = P\\!\\left(Z > \\frac{51.645 - 52}{6/6}\\right) = P(Z > -0.355) = \\Phi(0.355) \\approx 0.639"}
              display
            />
            <p><strong>(b) Type II error at <MathBlock math={"\\mu_1 = 52"} />:</strong></p>
            <MathBlock
              math={"\\beta = 1 - \\text{Power} = 1 - 0.639 = 0.361"}
              display
            />
            <p>
              <strong>(c) Sample size for 90% power at <MathBlock math={"\\mu_1 = 52"} />:</strong>
            </p>
            <MathBlock
              math={"n \\geq \\left(\\frac{(z_{0.05} + z_{0.10}) \\cdot 6}{52 - 50}\\right)^{\\!2} = \\left(\\frac{(1.645 + 1.282) \\times 6}{2}\\right)^{\\!2} = \\left(\\frac{17.562}{2}\\right)^{\\!2} = (8.781)^2 = 77.1"}
              display
            />
            <p>
              So <MathBlock math={"n \\geq 78"} />.
            </p>
          </>
        }
      >
        <p>
          For the test <MathBlock math={"H_0: \\mu = 50"} /> vs.{' '}
          <MathBlock math={"H_1: \\mu > 50"} /> with{' '}
          <MathBlock math={"\\sigma = 6"} /> and <MathBlock math={"n = 36"} /> at{' '}
          <MathBlock math={"\\alpha = 0.05"} />: (a) compute the power at{' '}
          <MathBlock math={"\\mu_1 = 52"} />, (b) the Type II error probability,
          (c) the sample size needed for 90% power.
        </p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Exercise 8.12 — OC Curve"
        difficulty="exam-level"
        solution={
          <>
            <p>
              <MathBlock math={"H_0: \\mu = 100"} /> vs.{' '}
              <MathBlock math={"H_1: \\mu \\neq 100"} /> at{' '}
              <MathBlock math={"\\alpha = 0.05"} />, with{' '}
              <MathBlock math={"\\sigma = 8"} />, <MathBlock math={"n = 16"} />.
            </p>
            <p>
              <strong>Critical values</strong> on the{' '}
              <MathBlock math={"\\bar{X}"} /> scale:
            </p>
            <MathBlock
              math={"c_L = 100 - 1.96 \\cdot \\frac{8}{4} = 96.08, \\qquad c_U = 100 + 1.96 \\cdot 2 = 103.92"}
              display
            />
            <p>
              <strong>For <MathBlock math={"\\mu_1 = 103"} />:</strong>
            </p>
            <MathBlock
              math={"\\beta(103) = P(96.08 < \\bar{X} < 103.92 \\mid \\mu = 103) = \\Phi\\!\\left(\\frac{103.92 - 103}{2}\\right) - \\Phi\\!\\left(\\frac{96.08 - 103}{2}\\right)"}
              display
            />
            <MathBlock
              math={"= \\Phi(0.46) - \\Phi(-3.46) = 0.6772 - 0.0003 = 0.677"}
              display
            />
            <p>
              So power = <MathBlock math={"1 - 0.677 = 0.323"} />. The test has
              only a 32.3% chance of detecting that <MathBlock math={"\\mu = 103"} />{' '}
              — a shift of just 3 units is hard to catch with <MathBlock math={"n = 16"} />.
            </p>
            <p>
              <strong>For <MathBlock math={"\\mu_1 = 106"} />:</strong>
            </p>
            <MathBlock
              math={"\\beta(106) = \\Phi\\!\\left(\\frac{103.92 - 106}{2}\\right) - \\Phi\\!\\left(\\frac{96.08 - 106}{2}\\right) = \\Phi(-1.04) - \\Phi(-4.96) \\approx 0.149"}
              display
            />
            <p>
              Power = <MathBlock math={"1 - 0.149 = 0.851"} />. The larger shift
              is much easier to detect.
            </p>
          </>
        }
      >
        <p>
          For the test <MathBlock math={"H_0: \\mu = 100"} /> vs.{' '}
          <MathBlock math={"H_1: \\mu \\neq 100"} /> with{' '}
          <MathBlock math={"\\sigma = 8"} /> and <MathBlock math={"n = 16"} /> at{' '}
          <MathBlock math={"\\alpha = 0.05"} />, compute{' '}
          <MathBlock math={"\\beta"} /> and the power at{' '}
          <MathBlock math={"\\mu_1 = 103"} /> and <MathBlock math={"\\mu_1 = 106"} />.
        </p>
      </WorkedQuestion>
    </>
  )
}
