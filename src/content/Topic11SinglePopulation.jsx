import MathBlock from '../components/MathBlock'
import Definition from '../components/Definition'
import Theorem from '../components/Theorem'
import Example from '../components/Example'
import Note from '../components/Note'
import WorkedQuestion from '../components/WorkedQuestion'

export default function Topic11SinglePopulation() {
  return (
    <>
      <p>
        With the general framework in place, we now apply it to the most common
        scenario: testing a claim about a <strong>single population</strong>. The
        parameter might be a mean <MathBlock math={"\\mu"} />, a variance{' '}
        <MathBlock math={"\\sigma^2"} />, or a proportion{' '}
        <MathBlock math={"p"} />. Each case uses a different test statistic and
        reference distribution, but the logic is always the same: compute the test
        statistic, compare to the critical value (or compute the p-value), and
        decide.
      </p>

      {/* ════════════════════════════════════════════
          TEST FOR μ (σ KNOWN)
          ════════════════════════════════════════════ */}
      <h3>Test for <MathBlock math={"\\mu"} /> (Variance <MathBlock math={"\\sigma^2"} /> Known) — z-Test (§8.4)</h3>

      <p>
        When the population variance <MathBlock math={"\\sigma^2"} /> is known and
        the sample comes from a normal population (or <MathBlock math={"n \\geq 30"} />{' '}
        by CLT), the test statistic is:
      </p>

      <Theorem id="thm-z-test" title="z-Test for μ (σ Known)">
        <p>
          <strong>Hypotheses:</strong>{' '}
          <MathBlock math={"H_0: \\mu = \\mu_0"} /> vs. one of{' '}
          <MathBlock math={"H_1: \\mu \\neq \\mu_0"} />,{' '}
          <MathBlock math={"\\mu > \\mu_0"} />, or{' '}
          <MathBlock math={"\\mu < \\mu_0"} />.
        </p>
        <p><strong>Test statistic:</strong></p>
        <MathBlock
          math={"Z = \\frac{\\bar{X} - \\mu_0}{\\sigma / \\sqrt{n}} \\sim N(0,1) \\text{ under } H_0"}
          display
        />
        <p><strong>Rejection regions at level <MathBlock math={"\\alpha"} />:</strong></p>
        <ul>
          <li>Two-sided: reject if <MathBlock math={"|Z| > z_{\\alpha/2}"} /></li>
          <li>Right-sided: reject if <MathBlock math={"Z > z_\\alpha"} /></li>
          <li>Left-sided: reject if <MathBlock math={"Z < -z_\\alpha"} /></li>
        </ul>
      </Theorem>

      <Note>
        This is the same pivot that gave us the confidence interval in Topic 9.
        The connection is exact: reject{' '}
        <MathBlock math={"H_0: \\mu = \\mu_0"} /> at level{' '}
        <MathBlock math={"\\alpha"} /> if and only if{' '}
        <MathBlock math={"\\mu_0"} /> is outside the{' '}
        <MathBlock math={"100(1-\\alpha)\\%"} /> CI for <MathBlock math={"\\mu"} />.
      </Note>

      {/* ════════════════════════════════════════════
          TEST FOR μ (σ UNKNOWN)
          ════════════════════════════════════════════ */}
      <h3>Test for <MathBlock math={"\\mu"} /> (Variance <MathBlock math={"\\sigma^2"} /> Unknown) — t-Test</h3>

      <p>
        In practice, <MathBlock math={"\\sigma"} /> is almost never known. When we
        replace it with the sample standard deviation{' '}
        <MathBlock math={"S"} />, the test statistic follows a t-distribution.
      </p>

      <Theorem id="thm-t-test" title="t-Test for μ (σ Unknown)">
        <p><strong>Test statistic:</strong></p>
        <MathBlock
          math={"T = \\frac{\\bar{X} - \\mu_0}{S / \\sqrt{n}} \\sim t(n-1) \\text{ under } H_0"}
          display
        />
        <p><strong>Rejection regions at level <MathBlock math={"\\alpha"} />:</strong></p>
        <ul>
          <li>Two-sided: reject if <MathBlock math={"|T| > t_{n-1;\\,\\alpha/2}"} /></li>
          <li>Right-sided: reject if <MathBlock math={"T > t_{n-1;\\,\\alpha}"} /></li>
          <li>Left-sided: reject if <MathBlock math={"T < -t_{n-1;\\,\\alpha}"} /></li>
        </ul>
        <p>
          <strong>Conditions:</strong> Normal population (any{' '}
          <MathBlock math={"n"} />), or any distribution with{' '}
          <MathBlock math={"n \\geq 30"} />.
        </p>
      </Theorem>

      <Example title="Recipe: Setting Up a t-Test">
        <p>
          Whenever you encounter a test for a population mean:
        </p>
        <ol>
          <li>
            <strong>Is <MathBlock math={"\\sigma"} /> known?</strong> If yes
            &rarr; z-test. If no &rarr; t-test.
          </li>
          <li>
            <strong>Direction?</strong> Read the research question. Words like
            &ldquo;is the mean <em>more than</em> 50?&rdquo; &rarr; right-sided.
            &ldquo;Is it <em>less than</em> 50?&rdquo; &rarr; left-sided.
            &ldquo;Is it <em>different from</em> 50?&rdquo; &rarr; two-sided.
          </li>
          <li>
            <strong>Compute:</strong> <MathBlock math={"\\bar{x}"} /> and{' '}
            <MathBlock math={"s"} /> from the data, plug into the formula.
          </li>
          <li>
            <strong>Compare:</strong> Look up the critical value from the table
            (or compute the p-value).
          </li>
        </ol>
      </Example>

      {/* ════════════════════════════════════════════
          TEST FOR σ²
          ════════════════════════════════════════════ */}
      <h3>Test for <MathBlock math={"\\sigma^2"} /> — Chi-Squared Test</h3>

      <p>
        To test whether the population variance equals a specified value, we use
        the fact that <MathBlock math={"(n-1)S^2/\\sigma^2 \\sim \\chi^2(n-1)"} />{' '}
        for normal populations.
      </p>

      <Theorem id="thm-chi2-test" title="χ²-Test for σ²">
        <p>
          <strong>Hypotheses:</strong>{' '}
          <MathBlock math={"H_0: \\sigma^2 = \\sigma_0^2"} /> vs. one of{' '}
          <MathBlock math={"H_1: \\sigma^2 \\neq \\sigma_0^2"} />,{' '}
          <MathBlock math={"\\sigma^2 > \\sigma_0^2"} />, or{' '}
          <MathBlock math={"\\sigma^2 < \\sigma_0^2"} />.
        </p>
        <p><strong>Test statistic:</strong></p>
        <MathBlock
          math={"\\chi^2 = \\frac{(n-1)S^2}{\\sigma_0^2} \\sim \\chi^2(n-1) \\text{ under } H_0"}
          display
        />
        <p><strong>Rejection regions:</strong></p>
        <ul>
          <li>
            Two-sided: reject if{' '}
            <MathBlock math={"\\chi^2 > \\chi^2_{n-1;\\,\\alpha/2}"} /> or{' '}
            <MathBlock math={"\\chi^2 < \\chi^2_{n-1;\\,1-\\alpha/2}"} />
          </li>
          <li>
            Right-sided: reject if{' '}
            <MathBlock math={"\\chi^2 > \\chi^2_{n-1;\\,\\alpha}"} />
          </li>
          <li>
            Left-sided: reject if{' '}
            <MathBlock math={"\\chi^2 < \\chi^2_{n-1;\\,1-\\alpha}"} />
          </li>
        </ul>
        <p>
          <strong>Condition:</strong> The population <strong>must</strong> be
          normal. This test is sensitive to non-normality — the CLT does{' '}
          <em>not</em> rescue it for large <MathBlock math={"n"} />.
        </p>
      </Theorem>

      <Note>
        Be careful with the chi-squared critical values! The chi-squared
        distribution is <em>not symmetric</em>, so the two-sided rejection region
        uses two different critical values. Remember:{' '}
        <MathBlock math={"\\chi^2_{n;\\,\\alpha}"} /> denotes the value where{' '}
        <MathBlock math={"P(\\chi^2 > \\chi^2_{n;\\,\\alpha}) = \\alpha"} />{' '}
        (upper-tail probability).
      </Note>

      {/* ════════════════════════════════════════════
          TEST FOR p
          ════════════════════════════════════════════ */}
      <h3>Test for a Proportion <MathBlock math={"p"} /></h3>

      <p>
        When the population is Bernoulli and the sample size is large enough, we
        can test hypotheses about the population proportion using a normal
        approximation.
      </p>

      <Theorem id="thm-z-test-p" title="z-Test for Proportion p">
        <p>
          <strong>Hypotheses:</strong>{' '}
          <MathBlock math={"H_0: p = p_0"} /> vs. one of{' '}
          <MathBlock math={"H_1: p \\neq p_0"} />,{' '}
          <MathBlock math={"p > p_0"} />, or{' '}
          <MathBlock math={"p < p_0"} />.
        </p>
        <p><strong>Test statistic:</strong></p>
        <MathBlock
          math={"Z = \\frac{\\hat{p} - p_0}{\\sqrt{p_0(1-p_0)/n}} \\sim N(0,1) \\text{ under } H_0"}
          display
        />
        <p>
          <strong>Condition:</strong>{' '}
          <MathBlock math={"np_0 \\geq 5"} /> and{' '}
          <MathBlock math={"n(1-p_0) \\geq 5"} />.
        </p>
      </Theorem>

      <Note>
        Notice a key difference from the CI for <MathBlock math={"p"} />: in the
        test statistic we use <MathBlock math={"p_0"} /> (the null value) in the
        standard error, <strong>not</strong> <MathBlock math={"\\hat{p}"} />.
        This is because under <MathBlock math={"H_0"} /> we know{' '}
        <MathBlock math={"p = p_0"} />, so we use that value. In the CI, we had
        no hypothesised value, so we used <MathBlock math={"\\hat{p}"} />.
      </Note>

      {/* ════════════════════════════════════════════
          SUMMARY TABLE
          ════════════════════════════════════════════ */}
      <h3>Summary: Single Population Tests</h3>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Test Statistic</th>
              <th>Distribution under <MathBlock math={"H_0"} /></th>
              <th>Conditions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><MathBlock math={"\\mu"} /> (<MathBlock math={"\\sigma"} /> known)</td>
              <td><MathBlock math={"Z = \\dfrac{\\bar{X} - \\mu_0}{\\sigma/\\sqrt{n}}"} /></td>
              <td><MathBlock math={"N(0,1)"} /></td>
              <td>Normal, or <MathBlock math={"n \\geq 30"} /></td>
            </tr>
            <tr>
              <td><MathBlock math={"\\mu"} /> (<MathBlock math={"\\sigma"} /> unknown)</td>
              <td><MathBlock math={"T = \\dfrac{\\bar{X} - \\mu_0}{S/\\sqrt{n}}"} /></td>
              <td><MathBlock math={"t(n-1)"} /></td>
              <td>Normal, or <MathBlock math={"n \\geq 30"} /></td>
            </tr>
            <tr>
              <td><MathBlock math={"\\sigma^2"} /></td>
              <td><MathBlock math={"\\chi^2 = \\dfrac{(n-1)S^2}{\\sigma_0^2}"} /></td>
              <td><MathBlock math={"\\chi^2(n-1)"} /></td>
              <td>Normal population required</td>
            </tr>
            <tr>
              <td><MathBlock math={"p"} /></td>
              <td><MathBlock math={"Z = \\dfrac{\\hat{p} - p_0}{\\sqrt{p_0(1-p_0)/n}}"} /></td>
              <td><MathBlock math={"N(0,1)"} /></td>
              <td><MathBlock math={"np_0 \\geq 5"} />, <MathBlock math={"n(1-p_0) \\geq 5"} /></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ════════════════════════════════════════════
          WORKED QUESTIONS
          ════════════════════════════════════════════ */}
      <h3>Worked Questions</h3>

      <WorkedQuestion
        source="Exercise 8.14 — t-Test for a Mean"
        difficulty="standard"
        solution={
          <>
            <p>
              Given <MathBlock math={"n = 10"} />,{' '}
              <MathBlock math={"\\bar{x} = 4.38"} />,{' '}
              <MathBlock math={"s = 0.87"} />. Test{' '}
              <MathBlock math={"H_0: \\mu = 5"} /> vs.{' '}
              <MathBlock math={"H_1: \\mu < 5"} /> (left-sided, checking if the
              mean is below the target) at <MathBlock math={"\\alpha = 0.05"} />.
            </p>
            <p>
              Since <MathBlock math={"\\sigma"} /> is unknown, use the t-test with{' '}
              <MathBlock math={"\\nu = 9"} /> degrees of freedom.
            </p>
            <MathBlock
              math={"t_{\\text{obs}} = \\frac{4.38 - 5}{0.87/\\sqrt{10}} = \\frac{-0.62}{0.275} = -2.254"}
              display
            />
            <p>
              <strong>Critical value:</strong>{' '}
              <MathBlock math={"t_{9;\\,0.05} = 1.833"} />, so reject if{' '}
              <MathBlock math={"t_{\\text{obs}} < -1.833"} />.
            </p>
            <p>
              Since <MathBlock math={"-2.254 < -1.833"} />, we{' '}
              <strong>reject <MathBlock math={"H_0"} /></strong>. There is
              significant evidence at the 5% level that the population mean is below 5.
            </p>
            <p>
              <strong>p-value:</strong> From the t-table with 9 df,{' '}
              <MathBlock math={"t_{9;\\,0.025} = 2.262"} /> and{' '}
              <MathBlock math={"t_{9;\\,0.05} = 1.833"} />, so{' '}
              <MathBlock math={"0.025 < p < 0.05"} /> (since{' '}
              <MathBlock math={"|t_{\\text{obs}}| = 2.254"} /> falls between these
              critical values). More precisely,{' '}
              <MathBlock math={"p \\approx 0.025"} />.
            </p>
          </>
        }
      >
        <p>
          A sample of 10 observations from a normal population gives{' '}
          <MathBlock math={"\\bar{x} = 4.38"} /> and{' '}
          <MathBlock math={"s = 0.87"} />. Test whether the mean is significantly
          less than 5 at <MathBlock math={"\\alpha = 0.05"} />.
        </p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Exercise 8.16 — χ²-Test for Variance"
        difficulty="standard"
        solution={
          <>
            <p>
              A manufacturer claims the standard deviation of fill weight is at
              most <MathBlock math={"\\sigma_0 = 0.5"} /> g. A sample of{' '}
              <MathBlock math={"n = 20"} /> gives <MathBlock math={"s = 0.65"} /> g.
            </p>
            <p>
              <MathBlock math={"H_0: \\sigma^2 \\leq 0.25"} /> vs.{' '}
              <MathBlock math={"H_1: \\sigma^2 > 0.25"} /> (right-sided — testing
              if variability exceeds the claim). At{' '}
              <MathBlock math={"\\alpha = 0.05"} />:
            </p>
            <MathBlock
              math={"\\chi^2_{\\text{obs}} = \\frac{(20-1)(0.65)^2}{(0.5)^2} = \\frac{19 \\times 0.4225}{0.25} = \\frac{8.0275}{0.25} = 32.11"}
              display
            />
            <p>
              <strong>Critical value:</strong>{' '}
              <MathBlock math={"\\chi^2_{19;\\,0.05} = 30.144"} />.
            </p>
            <p>
              Since <MathBlock math={"32.11 > 30.144"} />, we{' '}
              <strong>reject <MathBlock math={"H_0"} /></strong>. There is
              significant evidence that the variance exceeds the manufacturer&rsquo;s
              claim.
            </p>
          </>
        }
      >
        <p>
          A manufacturer claims <MathBlock math={"\\sigma \\leq 0.5"} /> g. A
          sample of 20 items has <MathBlock math={"s = 0.65"} /> g. At{' '}
          <MathBlock math={"\\alpha = 0.05"} />, does the data contradict the
          claim? (Assume normality.)
        </p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Exercise 8.18 — Test for a Proportion"
        difficulty="standard"
        solution={
          <>
            <p>
              A company claims that at least 80% of customers are satisfied. A
              survey of <MathBlock math={"n = 200"} /> finds 148 satisfied, so{' '}
              <MathBlock math={"\\hat{p} = 148/200 = 0.74"} />.
            </p>
            <p>
              <MathBlock math={"H_0: p \\geq 0.80"} /> vs.{' '}
              <MathBlock math={"H_1: p < 0.80"} /> at{' '}
              <MathBlock math={"\\alpha = 0.05"} />.
            </p>
            <p>Check conditions: <MathBlock math={"np_0 = 160 \\geq 5"} /> &#10003;,{' '}
              <MathBlock math={"n(1-p_0) = 40 \\geq 5"} /> &#10003;.</p>
            <MathBlock
              math={"z_{\\text{obs}} = \\frac{0.74 - 0.80}{\\sqrt{\\frac{0.80 \\times 0.20}{200}}} = \\frac{-0.06}{\\sqrt{0.0008}} = \\frac{-0.06}{0.02828} = -2.121"}
              display
            />
            <p>
              <strong>Critical value</strong> (left-sided):{' '}
              <MathBlock math={"-z_{0.05} = -1.645"} />. Reject if{' '}
              <MathBlock math={"z_{\\text{obs}} < -1.645"} />.
            </p>
            <p>
              Since <MathBlock math={"-2.121 < -1.645"} />, we{' '}
              <strong>reject <MathBlock math={"H_0"} /></strong>. The data
              provides significant evidence that fewer than 80% of customers are
              satisfied.
            </p>
            <p>
              <strong>p-value:</strong>{' '}
              <MathBlock math={"P(Z < -2.121) = 0.017"} />. Since{' '}
              <MathBlock math={"0.017 < 0.05"} />, we reject.
            </p>
          </>
        }
      >
        <p>
          A company claims at least 80% customer satisfaction. A sample of 200
          finds 148 satisfied. Test the claim at{' '}
          <MathBlock math={"\\alpha = 0.05"} />.
        </p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Exercise 8.20 — Complete Test"
        difficulty="exam-level"
        solution={
          <>
            <p>
              A university claims the average starting salary of graduates is at
              least €45,000. A sample of <MathBlock math={"n = 25"} /> graduates
              gives <MathBlock math={"\\bar{x} = 43,200"} /> and{' '}
              <MathBlock math={"s = 4,100"} />.
            </p>
            <p>
              <strong>Step 1 — Hypotheses:</strong>{' '}
              <MathBlock math={"H_0: \\mu \\geq 45000"} /> vs.{' '}
              <MathBlock math={"H_1: \\mu < 45000"} /> (left-sided).
            </p>
            <p>
              <strong>Step 2 — Test statistic:</strong>{' '}
              <MathBlock math={"\\sigma"} /> unknown, so t-test with{' '}
              <MathBlock math={"\\nu = 24"} />:
            </p>
            <MathBlock
              math={"t_{\\text{obs}} = \\frac{43200 - 45000}{4100/\\sqrt{25}} = \\frac{-1800}{820} = -2.195"}
              display
            />
            <p>
              <strong>Step 3 — Decision:</strong>{' '}
              <MathBlock math={"t_{24;\\,0.025} = 2.064"} /> and{' '}
              <MathBlock math={"t_{24;\\,0.01} = 2.492"} />.
            </p>
            <ul>
              <li>
                At <MathBlock math={"\\alpha = 0.05"} />:{' '}
                <MathBlock math={"-2.195 < -1.711 = -t_{24;\\,0.05}"} />
                &rarr; <strong>reject</strong>.
              </li>
              <li>
                At <MathBlock math={"\\alpha = 0.01"} />:{' '}
                <MathBlock math={"-2.195 > -2.492 = -t_{24;\\,0.01}"} />
                &rarr; <strong>fail to reject</strong>.
              </li>
            </ul>
            <p>
              <strong>p-value:</strong> From the t-table,{' '}
              <MathBlock math={"t_{24;\\,0.025} = 2.064"} /> and{' '}
              <MathBlock math={"t_{24;\\,0.01} = 2.492"} />, so{' '}
              <MathBlock math={"0.01 < p < 0.025"} /> (since{' '}
              <MathBlock math={"|t_{\\text{obs}}| = 2.195"} /> lies between them).
              More precisely, <MathBlock math={"p \\approx 0.019"} />.
            </p>
            <p>
              <strong>Conclusion:</strong> At the 5% level, there is significant
              evidence that the average starting salary is below €45,000. At the
              1% level, the evidence is insufficient. The p-value of about 0.019
              tells us exactly how strong the evidence is.
            </p>
          </>
        }
      >
        <p>
          A university claims graduates earn at least €45,000 on average. A sample
          of 25 gives <MathBlock math={"\\bar{x} = 43{,}200"} /> and{' '}
          <MathBlock math={"s = 4{,}100"} />. Conduct a full hypothesis test.
        </p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Exam-Style — Choosing the Right Test"
        difficulty="exam-level"
        solution={
          <>
            <p><strong>Scenario classification:</strong></p>
            <ol>
              <li>
                &ldquo;Mean cholesterol is 200, <MathBlock math={"\\sigma = 25"} />,{' '}
                <MathBlock math={"n = 40"} />&rdquo; &rarr;{' '}
                <strong>z-test for <MathBlock math={"\\mu"} /></strong> (σ known,
                large n).
              </li>
              <li>
                &ldquo;Mean response time, <MathBlock math={"n = 15"} />,{' '}
                <MathBlock math={"s = 3.2"} />, normal population&rdquo; &rarr;{' '}
                <strong>t-test for <MathBlock math={"\\mu"} /></strong> (σ unknown,
                small n, normal).
              </li>
              <li>
                &ldquo;Variability of fill volumes, <MathBlock math={"n = 20"} />,{' '}
                <MathBlock math={"s^2 = 0.42"} />&rdquo; &rarr;{' '}
                <strong>χ²-test for <MathBlock math={"\\sigma^2"} /></strong>{' '}
                (testing variance, must assume normality).
              </li>
              <li>
                &ldquo;Defective rate, <MathBlock math={"n = 500"} />, 42 defective&rdquo;
                &rarr; <strong>z-test for <MathBlock math={"p"} /></strong>{' '}
                (proportion, large sample).
              </li>
            </ol>
            <p>
              <strong>Decision tree:</strong> First ask what parameter is being
              tested (mean, variance, or proportion). For the mean, ask whether{' '}
              <MathBlock math={"\\sigma"} /> is known. This determines the test
              statistic.
            </p>
          </>
        }
      >
        <p>
          For each scenario below, identify the appropriate test (z-test, t-test,
          χ²-test, or z-test for proportions) and state the test statistic.
        </p>
      </WorkedQuestion>
    </>
  )
}
