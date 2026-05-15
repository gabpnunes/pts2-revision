import MathBlock from '../components/MathBlock'
import Definition from '../components/Definition'
import Theorem from '../components/Theorem'
import Example from '../components/Example'
import Note from '../components/Note'
import WorkedQuestion from '../components/WorkedQuestion'

export default function Topic12TwoPopulations() {
  return (
    <>
      <p>
        The single-population tests from the previous topic let us ask
        &ldquo;Is <MathBlock math={"\\mu"} /> equal to some value?&rdquo; But many
        real questions involve <strong>comparing two populations</strong>:
        Is treatment A better than treatment B? Do men and women earn the same
        salary? Is the variance of machine 1 smaller than that of machine 2? We
        now extend our hypothesis testing toolkit to handle these two-sample
        scenarios. The test statistics mirror the confidence intervals from
        Topic 9 — the same pivots, the same distributions, just framed as
        hypothesis tests.
      </p>

      {/* ════════════════════════════════════════════
          TEST FOR μ_X - μ_Y (σ's KNOWN)
          ════════════════════════════════════════════ */}
      <h3>Test for <MathBlock math={"\\mu_X - \\mu_Y"} /> (Variances Known) (§8.5)</h3>

      <p>
        Two independent samples from normal populations (or large samples):{' '}
        <MathBlock math={"X_1, \\ldots, X_{n_X} \\sim N(\\mu_X, \\sigma_X^2)"} />{' '}
        and <MathBlock math={"Y_1, \\ldots, Y_{n_Y} \\sim N(\\mu_Y, \\sigma_Y^2)"} />,
        with <MathBlock math={"\\sigma_X^2"} /> and{' '}
        <MathBlock math={"\\sigma_Y^2"} /> known.
      </p>

      <Theorem id="thm-z-test-2means" title="z-Test for μ_X − μ_Y (σ's Known)">
        <p>
          <strong>Hypotheses:</strong>{' '}
          <MathBlock math={"H_0: \\mu_X - \\mu_Y = d_0"} /> (typically{' '}
          <MathBlock math={"d_0 = 0"} />, testing for no difference) vs. the
          appropriate alternative.
        </p>
        <p><strong>Test statistic:</strong></p>
        <MathBlock
          math={"Z = \\frac{(\\bar{X} - \\bar{Y}) - d_0}{\\sqrt{\\dfrac{\\sigma_X^2}{n_X} + \\dfrac{\\sigma_Y^2}{n_Y}}} \\sim N(0,1) \\text{ under } H_0"}
          display
        />
      </Theorem>

      {/* ════════════════════════════════════════════
          TEST FOR μ_X - μ_Y (σ's UNKNOWN, EQUAL)
          ════════════════════════════════════════════ */}
      <h3>Test for <MathBlock math={"\\mu_X - \\mu_Y"} /> (Variances Unknown but Equal)</h3>

      <p>
        When <MathBlock math={"\\sigma_X^2 = \\sigma_Y^2 = \\sigma^2"} /> (unknown),
        we pool the sample variances to estimate the common variance, exactly as in
        the CI from Topic 9.
      </p>

      <Theorem id="thm-pooled-t-test" title="Pooled t-Test for μ_X − μ_Y (Equal Variances)">
        <p><strong>Pooled variance:</strong></p>
        <MathBlock
          math={"S_P^2 = \\frac{(n_X - 1)S_X^2 + (n_Y - 1)S_Y^2}{n_X + n_Y - 2}"}
          display
        />
        <p><strong>Test statistic:</strong></p>
        <MathBlock
          math={"T = \\frac{(\\bar{X} - \\bar{Y}) - d_0}{\\sqrt{S_P^2\\!\\left(\\dfrac{1}{n_X} + \\dfrac{1}{n_Y}\\right)}} \\sim t(n_X + n_Y - 2) \\text{ under } H_0"}
          display
        />
        <p>
          <strong>Conditions:</strong> Both populations normal (or both{' '}
          <MathBlock math={"n \\geq 30"} />), and the population variances are
          assumed equal.
        </p>
      </Theorem>

      <Note>
        <strong>When to use the pooled test:</strong> Only when you have good
        reason to believe <MathBlock math={"\\sigma_X^2 = \\sigma_Y^2"} />. You
        can use the F-test (below) or check whether{' '}
        <MathBlock math={"s_X^2 / s_Y^2"} /> is close to 1. If in doubt, use the
        Welch test instead — it is safer and nearly as powerful when variances
        happen to be equal.
      </Note>

      {/* ════════════════════════════════════════════
          TEST FOR μ_X - μ_Y (WELCH)
          ════════════════════════════════════════════ */}
      <h3>Test for <MathBlock math={"\\mu_X - \\mu_Y"} /> (Variances Unknown and Unequal — Welch)</h3>

      <Theorem id="thm-welch-t-test" title="Welch t-Test for μ_X − μ_Y (Unequal Variances)">
        <p><strong>Test statistic:</strong></p>
        <MathBlock
          math={"T = \\frac{(\\bar{X} - \\bar{Y}) - d_0}{\\sqrt{\\dfrac{S_X^2}{n_X} + \\dfrac{S_Y^2}{n_Y}}} \\;\\dot{\\sim}\\; t(\\nu)"}
          display
        />
        <p>where the degrees of freedom are approximated by:</p>
        <MathBlock
          math={"\\nu = \\frac{\\left(\\dfrac{S_X^2}{n_X} + \\dfrac{S_Y^2}{n_Y}\\right)^{\\!2}}{\\dfrac{(S_X^2/n_X)^2}{n_X - 1} + \\dfrac{(S_Y^2/n_Y)^2}{n_Y - 1}}"}
          display
        />
        <p>Round <MathBlock math={"\\nu"} /> down to the nearest integer.</p>
      </Theorem>

      <Example title="Decision Flowchart: Which Two-Sample Mean Test?">
        <p>When comparing two population means, follow this decision path:</p>
        <ol>
          <li>
            <strong>Are the samples paired?</strong> If yes &rarr; paired t-test
            (see below).
          </li>
          <li>
            <strong>Are the population variances known?</strong> If yes &rarr;
            z-test.
          </li>
          <li>
            <strong>Can we assume equal variances?</strong> If yes &rarr; pooled
            t-test. If no (or unsure) &rarr; Welch t-test.
          </li>
        </ol>
      </Example>

      {/* ════════════════════════════════════════════
          TEST FOR σ²_X / σ²_Y
          ════════════════════════════════════════════ */}
      <h3>Test for <MathBlock math={"\\sigma_X^2 / \\sigma_Y^2"} /> — F-Test</h3>

      <p>
        To formally test whether two normal populations have the same variance,
        we use the F-distribution. This test is also useful as a preliminary step
        before deciding between the pooled and Welch t-tests.
      </p>

      <Theorem id="thm-f-test" title="F-Test for Equal Variances">
        <p>
          <strong>Hypotheses:</strong>{' '}
          <MathBlock math={"H_0: \\sigma_X^2 = \\sigma_Y^2"} /> vs.{' '}
          <MathBlock math={"H_1: \\sigma_X^2 \\neq \\sigma_Y^2"} /> (or one-sided).
        </p>
        <p><strong>Test statistic:</strong></p>
        <MathBlock
          math={"F = \\frac{S_X^2}{S_Y^2} \\sim F(n_X - 1,\\, n_Y - 1) \\text{ under } H_0"}
          display
        />
        <p><strong>Rejection regions (two-sided):</strong></p>
        <p>
          Reject if <MathBlock math={"F > f_{n_X-1,\\,n_Y-1;\\,\\alpha/2}"} /> or{' '}
          <MathBlock math={"F < \\frac{1}{f_{n_Y-1,\\,n_X-1;\\,\\alpha/2}}"} />.
        </p>
        <p>
          <strong>Condition:</strong> Both populations must be{' '}
          <strong>normal</strong>. The F-test is very sensitive to non-normality.
        </p>
      </Theorem>

      <Note>
        A common convention: always put the <em>larger</em> sample variance in the
        numerator, so <MathBlock math={"F \\geq 1"} />. Then for a two-sided test,
        you only need the upper critical value: reject if{' '}
        <MathBlock math={"F > f_{\\nu_1, \\nu_2;\\,\\alpha/2}"} /> (where{' '}
        <MathBlock math={"\\nu_1"} /> is the df of the numerator sample). This
        avoids having to compute the lower critical value.
      </Note>

      {/* ════════════════════════════════════════════
          TEST FOR p_X - p_Y
          ════════════════════════════════════════════ */}
      <h3>Test for <MathBlock math={"p_X - p_Y"} /> — Two-Proportion z-Test</h3>

      <Theorem id="thm-z-test-2prop" title="z-Test for p_X − p_Y">
        <p>
          <strong>Hypotheses:</strong>{' '}
          <MathBlock math={"H_0: p_X = p_Y"} /> (i.e.,{' '}
          <MathBlock math={"p_X - p_Y = 0"} />) vs. the appropriate alternative.
        </p>
        <p>
          Under <MathBlock math={"H_0"} />, the two populations share a common
          proportion <MathBlock math={"p"} />, estimated by the{' '}
          <strong>pooled proportion</strong>:
        </p>
        <MathBlock
          math={"\\hat{p} = \\frac{X_1 + X_2}{n_X + n_Y} = \\frac{n_X \\hat{p}_X + n_Y \\hat{p}_Y}{n_X + n_Y}"}
          display
        />
        <p><strong>Test statistic:</strong></p>
        <MathBlock
          math={"Z = \\frac{\\hat{p}_X - \\hat{p}_Y}{\\sqrt{\\hat{p}(1-\\hat{p})\\left(\\dfrac{1}{n_X} + \\dfrac{1}{n_Y}\\right)}} \\sim N(0,1) \\text{ under } H_0"}
          display
        />
        <p>
          <strong>Condition:</strong> All of{' '}
          <MathBlock math={"n_X \\hat{p}"} />,{' '}
          <MathBlock math={"n_X(1-\\hat{p})"} />,{' '}
          <MathBlock math={"n_Y \\hat{p}"} />,{' '}
          <MathBlock math={"n_Y(1-\\hat{p}) \\geq 5"} />.
        </p>
      </Theorem>

      <Note>
        <strong>Important difference from the CI:</strong> The CI for{' '}
        <MathBlock math={"p_X - p_Y"} /> uses each sample&rsquo;s own{' '}
        <MathBlock math={"\\hat{p}"} /> in the standard error. The{' '}
        <em>test</em> uses the pooled <MathBlock math={"\\hat{p}"} /> because
        under <MathBlock math={"H_0: p_X = p_Y"} />, both samples estimate the
        same proportion. Pooling gives a better estimate of the common standard
        error.
      </Note>

      {/* ════════════════════════════════════════════
          PAIRED SAMPLES TEST
          ════════════════════════════════════════════ */}
      <h3>Paired Samples t-Test</h3>

      <p>
        When observations are naturally paired (before/after, matched subjects,
        same time period), the two samples are <em>not independent</em>. We reduce
        the problem to a single-sample test on the differences.
      </p>

      <Theorem id="thm-paired-t-test" title="Paired t-Test">
        <p>
          Given paired observations{' '}
          <MathBlock math={"(X_1, Y_1), \\ldots, (X_n, Y_n)"} />, define{' '}
          <MathBlock math={"W_i = X_i - Y_i"} />.
        </p>
        <p>
          <strong>Hypotheses:</strong>{' '}
          <MathBlock math={"H_0: \\mu_W = \\mu_X - \\mu_Y = d_0"} /> (typically{' '}
          <MathBlock math={"d_0 = 0"} />) vs. the appropriate alternative.
        </p>
        <p><strong>Test statistic:</strong></p>
        <MathBlock
          math={"T = \\frac{\\bar{W} - d_0}{S_W / \\sqrt{n}} \\sim t(n-1) \\text{ under } H_0"}
          display
        />
        <p>
          where <MathBlock math={"\\bar{W}"} /> and <MathBlock math={"S_W"} /> are
          the mean and standard deviation of the differences.
        </p>
      </Theorem>

      <Note>
        <strong>How to recognise paired data in exam questions:</strong> Look for
        cues like &ldquo;same subjects measured twice,&rdquo; &ldquo;before and
        after,&rdquo; &ldquo;matched pairs,&rdquo; or equal sample sizes with
        a natural pairing. If the observations come in pairs, use the paired
        test. If the two samples are collected independently, use the two-sample
        test. Using the wrong test is a common exam mistake.
      </Note>

      {/* ════════════════════════════════════════════
          SUMMARY TABLE
          ════════════════════════════════════════════ */}
      <h3>Summary: Two Population Tests</h3>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Test Statistic</th>
              <th>Distribution</th>
              <th>Key Assumption</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><MathBlock math={"\\mu_X - \\mu_Y"} /> (<MathBlock math={"\\sigma"} />&rsquo;s known)</td>
              <td><MathBlock math={"Z = \\dfrac{(\\bar{X}-\\bar{Y})-d_0}{\\sqrt{\\sigma_X^2/n_X + \\sigma_Y^2/n_Y}}"} /></td>
              <td><MathBlock math={"N(0,1)"} /></td>
              <td>Normal or large <MathBlock math={"n"} /></td>
            </tr>
            <tr>
              <td><MathBlock math={"\\mu_X - \\mu_Y"} /> (equal <MathBlock math={"\\sigma"} />)</td>
              <td><MathBlock math={"T = \\dfrac{(\\bar{X}-\\bar{Y})-d_0}{\\sqrt{S_P^2(1/n_X+1/n_Y)}}"} /></td>
              <td><MathBlock math={"t(n_X+n_Y-2)"} /></td>
              <td><MathBlock math={"\\sigma_X^2 = \\sigma_Y^2"} /></td>
            </tr>
            <tr>
              <td><MathBlock math={"\\mu_X - \\mu_Y"} /> (unequal <MathBlock math={"\\sigma"} />)</td>
              <td><MathBlock math={"T = \\dfrac{(\\bar{X}-\\bar{Y})-d_0}{\\sqrt{S_X^2/n_X+S_Y^2/n_Y}}"} /></td>
              <td><MathBlock math={"t(\\nu)"} /> (Welch)</td>
              <td>Compute <MathBlock math={"\\nu"} /></td>
            </tr>
            <tr>
              <td><MathBlock math={"\\sigma_X^2 / \\sigma_Y^2"} /></td>
              <td><MathBlock math={"F = S_X^2 / S_Y^2"} /></td>
              <td><MathBlock math={"F(n_X-1, n_Y-1)"} /></td>
              <td>Both normal</td>
            </tr>
            <tr>
              <td><MathBlock math={"p_X - p_Y"} /></td>
              <td><MathBlock math={"Z = \\dfrac{\\hat{p}_X - \\hat{p}_Y}{\\sqrt{\\hat{p}(1-\\hat{p})(1/n_X+1/n_Y)}}"} /></td>
              <td><MathBlock math={"N(0,1)"} /></td>
              <td>Large <MathBlock math={"n"} />, pooled <MathBlock math={"\\hat{p}"} /></td>
            </tr>
            <tr>
              <td><MathBlock math={"\\mu_X - \\mu_Y"} /> (paired)</td>
              <td><MathBlock math={"T = \\dfrac{\\bar{W}-d_0}{S_W/\\sqrt{n}}"} /></td>
              <td><MathBlock math={"t(n-1)"} /></td>
              <td>Differences normal</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ════════════════════════════════════════════
          WORKED QUESTIONS
          ════════════════════════════════════════════ */}
      <h3>Worked Questions</h3>

      <WorkedQuestion
        source="Exercise 8.22 — Two-Sample Pooled t-Test"
        difficulty="standard"
        solution={
          <>
            <p>
              Group A: <MathBlock math={"n_A = 12"} />,{' '}
              <MathBlock math={"\\bar{x}_A = 78"} />,{' '}
              <MathBlock math={"s_A^2 = 25"} />. Group B:{' '}
              <MathBlock math={"n_B = 10"} />,{' '}
              <MathBlock math={"\\bar{x}_B = 85"} />,{' '}
              <MathBlock math={"s_B^2 = 30"} />.
            </p>
            <p>
              <MathBlock math={"H_0: \\mu_A = \\mu_B"} /> vs.{' '}
              <MathBlock math={"H_1: \\mu_A \\neq \\mu_B"} /> at{' '}
              <MathBlock math={"\\alpha = 0.05"} />.
            </p>
            <p><strong>Step 1 — Pooled variance:</strong></p>
            <MathBlock
              math={"S_P^2 = \\frac{11 \\times 25 + 9 \\times 30}{20} = \\frac{275 + 270}{20} = 27.25"}
              display
            />
            <p><strong>Step 2 — Test statistic:</strong></p>
            <MathBlock
              math={"t_{\\text{obs}} = \\frac{78 - 85}{\\sqrt{27.25\\left(\\frac{1}{12} + \\frac{1}{10}\\right)}} = \\frac{-7}{\\sqrt{27.25 \\times 0.1833}} = \\frac{-7}{\\sqrt{4.996}} = \\frac{-7}{2.235} = -3.13"}
              display
            />
            <p>
              <strong>Step 3 — Critical value:</strong>{' '}
              <MathBlock math={"t_{20;\\,0.025} = 2.086"} />. Reject if{' '}
              <MathBlock math={"|t_{\\text{obs}}| > 2.086"} />.
            </p>
            <p>
              Since <MathBlock math={"|{-3.13}| = 3.13 > 2.086"} />, we{' '}
              <strong>reject <MathBlock math={"H_0"} /></strong>. There is
              significant evidence that the two group means differ.
            </p>
            <p>
              <strong>p-value:</strong>{' '}
              <MathBlock math={"t_{20;\\,0.005} = 2.845"} /> and{' '}
              <MathBlock math={"t_{20;\\,0.0025} = 3.153"} />, so{' '}
              <MathBlock math={"2 \\times 0.0025 < p < 2 \\times 0.005"} />,
              i.e., <MathBlock math={"0.005 < p < 0.01"} />.
            </p>
          </>
        }
      >
        <p>
          Two groups are tested: Group A (<MathBlock math={"n = 12"} />,{' '}
          <MathBlock math={"\\bar{x} = 78"} />, <MathBlock math={"s^2 = 25"} />)
          and Group B (<MathBlock math={"n = 10"} />,{' '}
          <MathBlock math={"\\bar{x} = 85"} />, <MathBlock math={"s^2 = 30"} />).
          Assuming equal variances and normal populations, test{' '}
          <MathBlock math={"H_0: \\mu_A = \\mu_B"} /> at{' '}
          <MathBlock math={"\\alpha = 0.05"} />.
        </p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Exercise 8.24 — F-Test for Equal Variances"
        difficulty="standard"
        solution={
          <>
            <p>
              Machine 1: <MathBlock math={"n_1 = 16"} />,{' '}
              <MathBlock math={"s_1^2 = 2.4"} />. Machine 2:{' '}
              <MathBlock math={"n_2 = 21"} />,{' '}
              <MathBlock math={"s_2^2 = 1.5"} />.
            </p>
            <p>
              <MathBlock math={"H_0: \\sigma_1^2 = \\sigma_2^2"} /> vs.{' '}
              <MathBlock math={"H_1: \\sigma_1^2 > \\sigma_2^2"} /> (right-sided,
              testing if machine 1 has greater variability) at{' '}
              <MathBlock math={"\\alpha = 0.05"} />.
            </p>
            <MathBlock
              math={"F_{\\text{obs}} = \\frac{s_1^2}{s_2^2} = \\frac{2.4}{1.5} = 1.60"}
              display
            />
            <p>
              <strong>Critical value</strong> (right-sided):{' '}
              <MathBlock math={"f_{15,20;\\,0.05} = 2.20"} />.
            </p>
            <p>
              Since <MathBlock math={"1.60 < 2.20"} />, we{' '}
              <strong>fail to reject <MathBlock math={"H_0"} /></strong>.
              There is insufficient evidence to conclude that machine 1 has
              greater variability than machine 2.
            </p>
          </>
        }
      >
        <p>
          Machine 1 (<MathBlock math={"n = 16"} />,{' '}
          <MathBlock math={"s^2 = 2.4"} />) and machine 2 ({' '}
          <MathBlock math={"n = 21"} />, <MathBlock math={"s^2 = 1.5"} />).
          Does machine 1 have significantly greater variability? Test at{' '}
          <MathBlock math={"\\alpha = 0.05"} />.
        </p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Exercise 8.26 — Two-Proportion Test"
        difficulty="standard"
        solution={
          <>
            <p>
              City A: <MathBlock math={"n_A = 200"} />, 120 support the policy,
              so <MathBlock math={"\\hat{p}_A = 0.60"} />. City B:{' '}
              <MathBlock math={"n_B = 300"} />, 156 support, so{' '}
              <MathBlock math={"\\hat{p}_B = 0.52"} />.
            </p>
            <p>
              <MathBlock math={"H_0: p_A = p_B"} /> vs.{' '}
              <MathBlock math={"H_1: p_A \\neq p_B"} /> at{' '}
              <MathBlock math={"\\alpha = 0.05"} />.
            </p>
            <p><strong>Pooled proportion:</strong></p>
            <MathBlock
              math={"\\hat{p} = \\frac{120 + 156}{200 + 300} = \\frac{276}{500} = 0.552"}
              display
            />
            <p>
              Check: <MathBlock math={"200 \\times 0.552 = 110.4 \\geq 5"} /> &#10003;,{' '}
              <MathBlock math={"200 \\times 0.448 = 89.6 \\geq 5"} /> &#10003;,{' '}
              <MathBlock math={"300 \\times 0.552 = 165.6 \\geq 5"} /> &#10003;,{' '}
              <MathBlock math={"300 \\times 0.448 = 134.4 \\geq 5"} /> &#10003;.
            </p>
            <p><strong>Test statistic:</strong></p>
            <MathBlock
              math={"z_{\\text{obs}} = \\frac{0.60 - 0.52}{\\sqrt{0.552 \\times 0.448 \\left(\\frac{1}{200} + \\frac{1}{300}\\right)}} = \\frac{0.08}{\\sqrt{0.2473 \\times 0.00833}}"}
              display
            />
            <MathBlock
              math={"= \\frac{0.08}{\\sqrt{0.002061}} = \\frac{0.08}{0.04540} = 1.76"}
              display
            />
            <p>
              <strong>Critical value</strong> (two-sided):{' '}
              <MathBlock math={"z_{0.025} = 1.96"} />.
            </p>
            <p>
              Since <MathBlock math={"|1.76| = 1.76 < 1.96"} />, we{' '}
              <strong>fail to reject <MathBlock math={"H_0"} /></strong>.
            </p>
            <p>
              <strong>p-value:</strong>{' '}
              <MathBlock math={"2 \\times P(Z > 1.76) = 2 \\times 0.0392 = 0.078"} />.
              Since <MathBlock math={"0.078 > 0.05"} />, consistent. Note: at{' '}
              <MathBlock math={"\\alpha = 0.10"} />, we <em>would</em> reject.
            </p>
          </>
        }
      >
        <p>
          In city A, 120 out of 200 support a policy. In city B, 156 out of 300
          support it. Is there a significant difference at{' '}
          <MathBlock math={"\\alpha = 0.05"} />?
        </p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Exercise 8.28 — Paired t-Test"
        difficulty="exam-level"
        solution={
          <>
            <p>
              Ten students take a test before and after a training programme:
            </p>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>1</th><th>2</th><th>3</th><th>4</th><th>5</th>
                    <th>6</th><th>7</th><th>8</th><th>9</th><th>10</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Before</td>
                    <td>65</td><td>72</td><td>58</td><td>80</td><td>69</td>
                    <td>74</td><td>63</td><td>77</td><td>70</td><td>66</td>
                  </tr>
                  <tr>
                    <td>After</td>
                    <td>70</td><td>75</td><td>62</td><td>84</td><td>70</td>
                    <td>79</td><td>68</td><td>80</td><td>74</td><td>72</td>
                  </tr>
                  <tr>
                    <td><MathBlock math={"W_i"} /></td>
                    <td>5</td><td>3</td><td>4</td><td>4</td><td>1</td>
                    <td>5</td><td>5</td><td>3</td><td>4</td><td>6</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Step 1 — Recognise as paired:</strong> Same students tested
              twice. This is paired data.
            </p>
            <p><strong>Step 2 — Summary statistics of differences:</strong></p>
            <MathBlock
              math={"\\bar{w} = \\frac{5+3+4+4+1+5+5+3+4+6}{10} = \\frac{40}{10} = 4.0"}
              display
            />
            <MathBlock
              math={"s_W^2 = \\frac{\\sum(w_i - 4)^2}{9} = \\frac{1+1+0+0+9+1+1+1+0+4}{9} = \\frac{18}{9} = 2.0, \\quad s_W = \\sqrt{2} \\approx 1.414"}
              display
            />
            <p>
              <strong>Step 3 — Hypotheses and test:</strong>{' '}
              <MathBlock math={"H_0: \\mu_W = 0"} /> (no improvement) vs.{' '}
              <MathBlock math={"H_1: \\mu_W > 0"} /> (improvement), at{' '}
              <MathBlock math={"\\alpha = 0.05"} />.
            </p>
            <MathBlock
              math={"t_{\\text{obs}} = \\frac{4.0 - 0}{1.414 / \\sqrt{10}} = \\frac{4.0}{0.447} = 8.94"}
              display
            />
            <p>
              <strong>Critical value:</strong>{' '}
              <MathBlock math={"t_{9;\\,0.05} = 1.833"} />.
            </p>
            <p>
              Since <MathBlock math={"8.94 \\gg 1.833"} />, we{' '}
              <strong>reject <MathBlock math={"H_0"} /></strong> overwhelmingly.
              The training programme significantly improved scores.
            </p>
            <p>
              <strong>p-value:</strong> <MathBlock math={"p < 0.0005"} /> (far
              off the t-table).
            </p>
          </>
        }
      >
        <p>
          Ten students are tested before and after a training programme. Is there
          significant evidence of improvement at{' '}
          <MathBlock math={"\\alpha = 0.05"} />?
        </p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Exam-Style — Complete Two-Population Analysis"
        difficulty="exam-level"
        solution={
          <>
            <p>
              Two factories produce bolts. Factory X:{' '}
              <MathBlock math={"n_X = 10"} />,{' '}
              <MathBlock math={"\\bar{x} = 5.02"} /> cm,{' '}
              <MathBlock math={"s_X^2 = 0.0036"} />. Factory Y:{' '}
              <MathBlock math={"n_Y = 12"} />,{' '}
              <MathBlock math={"\\bar{y} = 4.98"} /> cm,{' '}
              <MathBlock math={"s_Y^2 = 0.0049"} />.
            </p>
            <p>
              <strong>(a) Test equal variances</strong> at{' '}
              <MathBlock math={"\\alpha = 0.10"} />:
            </p>
            <MathBlock
              math={"F = \\frac{s_Y^2}{s_X^2} = \\frac{0.0049}{0.0036} = 1.361"}
              display
            />
            <p>
              (We put the larger variance in the numerator.){' '}
              <MathBlock math={"f_{11,9;\\,0.05} = 3.10"} />.
            </p>
            <p>
              Since <MathBlock math={"1.361 < 3.10"} />, fail to reject. No
              evidence of unequal variances, so we proceed with the pooled test.
            </p>
            <p>
              <strong>(b) Pooled t-test for equal means</strong> at{' '}
              <MathBlock math={"\\alpha = 0.05"} />:
            </p>
            <MathBlock
              math={"S_P^2 = \\frac{9 \\times 0.0036 + 11 \\times 0.0049}{20} = \\frac{0.0324 + 0.0539}{20} = 0.004315"}
              display
            />
            <MathBlock
              math={"t_{\\text{obs}} = \\frac{5.02 - 4.98}{\\sqrt{0.004315(1/10 + 1/12)}} = \\frac{0.04}{\\sqrt{0.004315 \\times 0.1833}} = \\frac{0.04}{\\sqrt{0.000791}} = \\frac{0.04}{0.02813} = 1.42"}
              display
            />
            <p>
              <MathBlock math={"t_{20;\\,0.025} = 2.086"} />.
              Since <MathBlock math={"|1.42| < 2.086"} />, fail to reject.
              No significant difference in mean bolt lengths.
            </p>
            <p>
              <strong>(c) Decision justification:</strong> We used the pooled
              t-test because the F-test showed no evidence of unequal variances.
              The conclusion: the two factories produce bolts of statistically
              indistinguishable mean length.
            </p>
          </>
        }
      >
        <p>
          Two factories produce bolts with target length 5 cm. Factory X ({' '}
          <MathBlock math={"n = 10"} />,{' '}
          <MathBlock math={"\\bar{x} = 5.02"} />,{' '}
          <MathBlock math={"s_X^2 = 0.0036"} />) and factory Y ({' '}
          <MathBlock math={"n = 12"} />,{' '}
          <MathBlock math={"\\bar{y} = 4.98"} />,{' '}
          <MathBlock math={"s_Y^2 = 0.0049"} />). (a) Test equal variances.
          (b) Test equal means. (c) Justify your choice of test.
        </p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Exam-Style — Welch vs. Pooled Decision"
        difficulty="exam-level"
        solution={
          <>
            <p>
              Treatment: <MathBlock math={"n_T = 8"} />,{' '}
              <MathBlock math={"\\bar{x}_T = 12.5"} />,{' '}
              <MathBlock math={"s_T^2 = 4.2"} />. Control:{' '}
              <MathBlock math={"n_C = 10"} />,{' '}
              <MathBlock math={"\\bar{x}_C = 9.8"} />,{' '}
              <MathBlock math={"s_C^2 = 15.6"} />.
            </p>
            <p>
              <strong>Step 1 — Check variances:</strong>{' '}
              <MathBlock math={"s_C^2 / s_T^2 = 15.6 / 4.2 = 3.71"} />. The
              sample variances differ substantially (ratio &gt; 3), so we should
              <strong> not</strong> assume equal variances. Use the Welch test.
            </p>
            <p><strong>Step 2 — Welch degrees of freedom:</strong></p>
            <MathBlock
              math={"\\nu = \\frac{(4.2/8 + 15.6/10)^2}{(4.2/8)^2/7 + (15.6/10)^2/9} = \\frac{(0.525 + 1.56)^2}{0.525^2/7 + 1.56^2/9}"}
              display
            />
            <MathBlock
              math={"= \\frac{(2.085)^2}{0.03938 + 0.27040} = \\frac{4.347}{0.3098} = 14.03 \\;\\Rightarrow\\; \\nu = 14"}
              display
            />
            <p>
              <strong>Step 3 — Test:</strong>{' '}
              <MathBlock math={"H_0: \\mu_T = \\mu_C"} /> vs.{' '}
              <MathBlock math={"H_1: \\mu_T > \\mu_C"} /> at{' '}
              <MathBlock math={"\\alpha = 0.05"} />.
            </p>
            <MathBlock
              math={"t_{\\text{obs}} = \\frac{12.5 - 9.8}{\\sqrt{4.2/8 + 15.6/10}} = \\frac{2.7}{\\sqrt{2.085}} = \\frac{2.7}{1.444} = 1.87"}
              display
            />
            <p>
              <MathBlock math={"t_{14;\\,0.05} = 1.761"} />. Since{' '}
              <MathBlock math={"1.87 > 1.761"} />, we{' '}
              <strong>reject <MathBlock math={"H_0"} /></strong>. The treatment
              group has a significantly higher mean at the 5% level.
            </p>
            <p>
              <strong>Why Welch?</strong> The variance ratio of 3.71 suggests
              unequal population variances. Using the pooled test would
              underestimate the standard error and could give a misleading result.
            </p>
          </>
        }
      >
        <p>
          A treatment group (<MathBlock math={"n = 8"} />,{' '}
          <MathBlock math={"\\bar{x} = 12.5"} />,{' '}
          <MathBlock math={"s^2 = 4.2"} />) and control group ({' '}
          <MathBlock math={"n = 10"} />, <MathBlock math={"\\bar{x} = 9.8"} />,{' '}
          <MathBlock math={"s^2 = 15.6"} />). Is the treatment effective? Choose
          the appropriate test and justify.
        </p>
      </WorkedQuestion>
    </>
  )
}
