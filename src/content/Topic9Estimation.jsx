import MathBlock from '../components/MathBlock'
import Definition from '../components/Definition'
import Theorem from '../components/Theorem'
import Proof from '../components/Proof'
import Example from '../components/Example'
import Note from '../components/Note'
import WorkedQuestion from '../components/WorkedQuestion'

export default function Topic9Estimation() {
  return (
    <>
      <p>
        We now make the leap from probability theory to <strong>statistics</strong>. In
        previous topics we assumed we knew the distribution and computed probabilities. Now
        we reverse direction: we observe data and try to learn about the unknown population.
        This chapter covers two fundamental tools of <em>inferential statistics</em>:{' '}
        <strong>point estimation</strong> (giving a single best guess for a parameter) and{' '}
        <strong>confidence intervals</strong> (giving a range of plausible values with a
        stated level of confidence).
      </p>

      {/* ════════════════════════════════════════════
          §7.2 — POINT ESTIMATORS
          ════════════════════════════════════════════ */}
      <h3>Point Estimators (§7.2)</h3>

      <p>
        Suppose we have a random sample <MathBlock math={"X_1, X_2, \\ldots, X_n"} /> from
        a population with pdf <MathBlock math={"f(x)"} /> and we want to learn about some
        unknown population parameter <MathBlock math={"\\theta"} /> (such as the mean{' '}
        <MathBlock math={"\\mu"} />, the variance <MathBlock math={"\\sigma^2"} />, or a
        proportion <MathBlock math={"p"} />). We cannot observe the entire population, so
        we use a function of the sample to <em>estimate</em>{' '}
        <MathBlock math={"\\theta"} />.
      </p>

      <Definition id="def-estimator" title="Definition 7.1 — Estimator vs. Estimate">
        <p>
          A sample statistic <MathBlock math={"\\hat{\\theta} = t(X_1, \\ldots, X_n)"} />{' '}
          used to estimate a population parameter <MathBlock math={"\\theta"} /> is called
          an <strong>estimator</strong> (or <strong>point estimator</strong>) for{' '}
          <MathBlock math={"\\theta"} />.
        </p>
        <p>
          The observed value (realisation) of the estimator based on a specific sample is
          called an <strong>estimate</strong> (or <strong>point estimate</strong>).
        </p>
      </Definition>

      <Note>
        An estimator <MathBlock math={"\\hat{\\theta}"} /> is a <em>random variable</em> —
        it depends on the random sample. An estimate{' '}
        <MathBlock math={"\\hat{\\theta} = t(x_1, \\ldots, x_n)"} /> is a{' '}
        <em>number</em> — computed from observed data. For instance,{' '}
        <MathBlock math={"\\hat{\\mu} = \\bar{X}"} /> is an estimator, while{' '}
        <MathBlock math={"\\bar{x} = 4.55"} /> is an estimate.
      </Note>

      <p>
        There are often many possible estimators for the same parameter. For example, to
        estimate <MathBlock math={"\\mu"} /> we could use the sample mean, the sample
        median, a weighted average, or even just{' '}
        <MathBlock math={"X_1"} /> (a single observation). What makes one estimator
        &ldquo;better&rdquo; than another? Two key properties help us decide.
      </p>

      <h4>Property 1: Unbiasedness</h4>

      <Definition id="def-unbiased" title="Unbiased Estimator">
        <p>
          An estimator <MathBlock math={"\\hat{\\theta}"} /> for a parameter{' '}
          <MathBlock math={"\\theta"} /> is called <strong>unbiased</strong> if
        </p>
        <MathBlock
          math={"E[\\hat{\\theta}] = \\theta."}
          display
        />
        <p>
          In words: on average (over all possible samples), the estimator hits the true
          parameter value. If <MathBlock math={"E[\\hat{\\theta}] \\neq \\theta"} />, the
          estimator is <strong>biased</strong>, and the difference{' '}
          <MathBlock math={"E[\\hat{\\theta}] - \\theta"} /> is called the <em>bias</em>.
        </p>
      </Definition>

      <h4>Property 2: Efficiency</h4>

      <Definition id="def-efficiency" title="Relative Efficiency">
        <p>
          If <MathBlock math={"\\hat{\\theta}_1"} /> and{' '}
          <MathBlock math={"\\hat{\\theta}_2"} /> are both unbiased estimators for{' '}
          <MathBlock math={"\\theta"} />, the one with the <strong>smaller variance</strong>{' '}
          is called <strong>relatively more efficient</strong>:
        </p>
        <MathBlock
          math={"\\text{Var}(\\hat{\\theta}_1) < \\text{Var}(\\hat{\\theta}_2) \\;\\Longrightarrow\\; \\hat{\\theta}_1 \\text{ is more efficient.}"}
          display
        />
        <p>
          Think of it like darts: an unbiased estimator is centred on the bullseye. A more
          efficient estimator has its darts clustered more tightly around the bullseye.
        </p>
      </Definition>

      <p>
        The ideal estimator is both unbiased (centred on the target) <em>and</em> efficient
        (low spread). Among all unbiased estimators, we prefer the one with the smallest
        variance.
      </p>

      <h4>Common Point Estimators</h4>

      <p><strong>Estimator for <MathBlock math={"\\mu"} /> — the sample mean:</strong></p>
      <MathBlock
        math={"\\hat{\\mu} = \\bar{X} = \\frac{1}{n}\\sum_{i=1}^{n} X_i"}
        display
      />
      <ul>
        <li>
          <strong>Unbiased:</strong>{' '}
          <MathBlock math={"E[\\bar{X}] = \\frac{1}{n}\\sum_{i=1}^{n} E[X_i] = \\frac{1}{n} \\cdot n\\mu = \\mu"} />.
        </li>
        <li>
          <strong>Variance:</strong>{' '}
          <MathBlock math={"\\text{Var}(\\bar{X}) = \\frac{\\sigma^2}{n}"} /> (from
          Theorem 6.12). The standard deviation{' '}
          <MathBlock math={"\\sigma_{\\bar{X}} = \\sigma / \\sqrt{n}"} /> is called the{' '}
          <em>standard error</em>.
        </li>
        <li>
          Other unbiased estimators for <MathBlock math={"\\mu"} /> exist (median, weighted
          averages, even <MathBlock math={"X_1"} />), but for normal populations{' '}
          <MathBlock math={"\\bar{X}"} /> has the smallest variance — it is the most
          efficient.
        </li>
      </ul>

      <p>
        <strong>
          Estimator for <MathBlock math={"\\sigma^2"} /> — the sample variance:
        </strong>
      </p>
      <MathBlock
        math={"\\hat{\\sigma}^2 = S^2 = \\frac{1}{n-1}\\sum_{i=1}^{n}(X_i - \\bar{X})^2"}
        display
      />
      <ul>
        <li>
          <strong>Unbiased:</strong>{' '}
          <MathBlock math={"E[S^2] = \\sigma^2"} /> (this is Theorem 6.10 from the
          sampling chapter — the <MathBlock math={"n-1"} /> in the denominator is precisely
          what makes it unbiased).
        </li>
        <li>
          Alternative: dividing by <MathBlock math={"n"} /> instead of{' '}
          <MathBlock math={"n-1"} /> gives{' '}
          <MathBlock math={"\\tilde{\\sigma}^2 = \\frac{1}{n}\\sum(X_i - \\bar{X})^2"} />,
          which is biased (its expected value is{' '}
          <MathBlock math={"\\frac{n-1}{n}\\sigma^2 < \\sigma^2"} />).
        </li>
        <li>
          <strong>Caution:</strong>{' '}
          <MathBlock math={"E[S] \\neq \\sigma"} />. While{' '}
          <MathBlock math={"S^2"} /> is unbiased for <MathBlock math={"\\sigma^2"} />, the
          sample standard deviation <MathBlock math={"S"} /> is <em>not</em> unbiased for{' '}
          <MathBlock math={"\\sigma"} /> (because expectation and square root don&rsquo;t
          commute, by Jensen&rsquo;s inequality).
        </li>
      </ul>

      <p>
        <strong>
          Estimator for <MathBlock math={"p"} /> — the sample proportion:
        </strong>
      </p>
      <p>
        When the population is Bernoulli (success/failure), let{' '}
        <MathBlock math={"Y_i \\sim \\text{Ber}(p)"} /> and{' '}
        <MathBlock math={"X = \\sum_{i=1}^n Y_i \\sim \\text{Bin}(n, p)"} />.
      </p>
      <MathBlock
        math={"\\hat{p} = \\frac{X}{n} = \\bar{Y}"}
        display
      />
      <ul>
        <li>
          <strong>Unbiased:</strong>{' '}
          <MathBlock math={"E[\\hat{p}] = \\frac{E[X]}{n} = \\frac{np}{n} = p"} />.
        </li>
        <li>
          <strong>Variance:</strong>{' '}
          <MathBlock math={"\\text{Var}(\\hat{p}) = \\frac{p(1-p)}{n}"} />.
        </li>
      </ul>

      <Example title="Exercise 7.5 — Comparing Estimators">
        <p>
          Let <MathBlock math={"X_1, X_2"} /> be a random sample (size 2) from a
          population with mean <MathBlock math={"\\mu"} /> and variance{' '}
          <MathBlock math={"\\sigma^2"} />. Consider four estimators:
        </p>
        <MathBlock
          math={"X_A = \\tfrac{1}{2}X_1 + \\tfrac{1}{2}X_2, \\quad X_B = \\tfrac{2}{5}X_1 + \\tfrac{3}{5}X_2, \\quad X_C = \\tfrac{1}{4}X_1 + \\tfrac{3}{4}X_2, \\quad X_D = \\tfrac{1}{3}X_1 + \\tfrac{2}{3}X_2"}
          display
        />
        <p>
          <strong>Which are unbiased?</strong> For any weights{' '}
          <MathBlock math={"w_1 + w_2 = 1"} />:{' '}
          <MathBlock math={"E[w_1 X_1 + w_2 X_2] = (w_1 + w_2)\\mu = \\mu"} />.
          So <MathBlock math={"X_A"} />, <MathBlock math={"X_B"} />, and{' '}
          <MathBlock math={"X_D"} /> are all unbiased ({' '}
          <MathBlock math={"X_C"} /> has weights summing to 1 too, but let us check:{' '}
          <MathBlock math={"1/4 + 3/4 = 1"} />, so <MathBlock math={"X_C"} /> is also
          unbiased).
        </p>
        <p>
          <strong>Which is most efficient?</strong> For{' '}
          <MathBlock math={"w_1 X_1 + w_2 X_2"} /> with independent{' '}
          <MathBlock math={"X_i"} />:
        </p>
        <MathBlock
          math={"\\text{Var} = w_1^2 \\sigma^2 + w_2^2 \\sigma^2 = (w_1^2 + w_2^2)\\sigma^2"}
          display
        />
        <ul>
          <li><MathBlock math={"X_A"} />: <MathBlock math={"(1/4 + 1/4)\\sigma^2 = \\tfrac{1}{2}\\sigma^2"} /></li>
          <li><MathBlock math={"X_B"} />: <MathBlock math={"(4/25 + 9/25)\\sigma^2 = \\tfrac{13}{25}\\sigma^2"} /></li>
          <li><MathBlock math={"X_C"} />: <MathBlock math={"(1/16 + 9/16)\\sigma^2 = \\tfrac{10}{16}\\sigma^2"} /></li>
          <li><MathBlock math={"X_D"} />: <MathBlock math={"(1/9 + 4/9)\\sigma^2 = \\tfrac{5}{9}\\sigma^2"} /></li>
        </ul>
        <p>
          Since <MathBlock math={"\\tfrac{1}{2} < \\tfrac{5}{9} < \\tfrac{13}{25} < \\tfrac{10}{16}"} />,{' '}
          <MathBlock math={"X_A = \\bar{X}"} /> is the most efficient. Equal weights
          minimise <MathBlock math={"w_1^2 + w_2^2"} /> subject to{' '}
          <MathBlock math={"w_1 + w_2 = 1"} /> — this generalises to{' '}
          <MathBlock math={"w_i = 1/n"} /> for any <MathBlock math={"n"} />.
        </p>
      </Example>

      {/* ════════════════════════════════════════════
          §7.3 — CONFIDENCE INTERVALS
          ════════════════════════════════════════════ */}
      <h3>Confidence Intervals (§7.3)</h3>

      <p>
        A point estimate gives a single number, but tells us nothing about how far off we
        might be. A <strong>confidence interval</strong> supplements the estimate with a
        range that has a known probability of capturing the true parameter.
      </p>

      <Definition id="def-ci" title="Definition 7.2 — Confidence Interval">
        <p>
          Let <MathBlock math={"X_1, \\ldots, X_n"} /> be a sample from a distribution
          with unknown parameter <MathBlock math={"\\theta"} />. If{' '}
          <MathBlock math={"L"} /> and <MathBlock math={"U"} /> are sample statistics such
          that
        </p>
        <MathBlock
          math={"P(L < \\theta < U) = \\gamma"}
          display
        />
        <p>
          then the random interval <MathBlock math={"(L, U)"} /> is a{' '}
          <MathBlock math={"100\\gamma\\%"} />-<strong>confidence interval</strong> for{' '}
          <MathBlock math={"\\theta"} />, with <strong>confidence level</strong>{' '}
          <MathBlock math={"\\gamma"} />.
        </p>
        <p>
          We typically write <MathBlock math={"\\gamma = 1 - \\alpha"} />, so a 95%
          confidence interval has <MathBlock math={"\\alpha = 0.05"} />.
        </p>
      </Definition>

      <Note>
        <p>
          <strong>Correct interpretation:</strong> &ldquo;If we were to repeat this
          sampling procedure many times, <MathBlock math={"100\\gamma\\%"} /> of the
          confidence intervals we compute would contain the true value of{' '}
          <MathBlock math={"\\theta"} />.&rdquo;
        </p>
        <p>
          <strong>Incorrect interpretation:</strong> &ldquo;There is a{' '}
          <MathBlock math={"\\gamma"} /> probability that{' '}
          <MathBlock math={"\\theta"} /> falls inside this specific interval.&rdquo; Once
          the interval is computed from data, <MathBlock math={"\\theta"} /> is either
          inside it or not — there is no probability about a fixed (but unknown) constant.
          The randomness is in the interval, not in <MathBlock math={"\\theta"} />.
        </p>
      </Note>

      {/* ─── CI for μ (σ known) ─── */}
      <h4>CI for the Mean <MathBlock math={"\\mu"} /> (Variance <MathBlock math={"\\sigma^2"} /> Known)</h4>

      <p>
        Suppose <MathBlock math={"X_1, \\ldots, X_n"} /> is a sample from{' '}
        <MathBlock math={"N(\\mu, \\sigma^2)"} /> with <MathBlock math={"\\sigma^2"} />{' '}
        known but <MathBlock math={"\\mu"} /> unknown.
      </p>
      <p>
        From Theorem 6.12 we know{' '}
        <MathBlock math={"\\bar{X} \\sim N\\!\\left(\\mu, \\frac{\\sigma^2}{n}\\right)"} />,
        so standardising:
      </p>
      <MathBlock
        math={"Z = \\frac{\\bar{X} - \\mu}{\\sigma / \\sqrt{n}} \\sim N(0,1)"}
        display
      />
      <p>
        We want <MathBlock math={"P(-z_{\\alpha/2} < Z < z_{\\alpha/2}) = 1 - \\alpha"} />.
        Substituting and rearranging for <MathBlock math={"\\mu"} />:
      </p>
      <MathBlock
        math={"P\\!\\left(\\bar{X} - z_{\\alpha/2}\\frac{\\sigma}{\\sqrt{n}} < \\mu < \\bar{X} + z_{\\alpha/2}\\frac{\\sigma}{\\sqrt{n}}\\right) = 1 - \\alpha"}
        display
      />

      <Theorem id="thm-ci-mu-known" title="CI for μ (σ Known)">
        <p>
          The <MathBlock math={"100(1-\\alpha)\\%"} /> confidence interval for{' '}
          <MathBlock math={"\\mu"} /> when <MathBlock math={"\\sigma"} /> is known:
        </p>
        <MathBlock
          math={"\\bar{X} \\pm z_{\\alpha/2} \\frac{\\sigma}{\\sqrt{n}}"}
          display
        />
        <p><strong>Conditions:</strong></p>
        <ul>
          <li>
            Exact if <MathBlock math={"X_i \\sim N(\\mu, \\sigma^2)"} /> (any{' '}
            <MathBlock math={"n \\geq 1"} />).
          </li>
          <li>
            Approximately valid for any distribution if{' '}
            <MathBlock math={"n \\geq 30"} /> (by the Central Limit Theorem).
          </li>
        </ul>
      </Theorem>

      <p>
        The quantity <MathBlock math={"z_{\\alpha/2} \\cdot \\sigma / \\sqrt{n}"} /> is
        called the <strong>margin of error</strong>. Common critical values:{' '}
        <MathBlock math={"z_{0.025} = 1.96"} /> (for 95%),{' '}
        <MathBlock math={"z_{0.005} = 2.576"} /> (for 99%),{' '}
        <MathBlock math={"z_{0.05} = 1.645"} /> (for 90%).
      </p>

      <Example title="CI for μ with σ Known — Lecture Example">
        <p>
          Data: <MathBlock math={"x_1 = 1.7,\\; x_2 = -3.1,\\; x_3 = 17.1,\\; x_4 = 2.5"} />{' '}
          from <MathBlock math={"N(\\mu, 9)"} />, so{' '}
          <MathBlock math={"\\sigma = 3"} /> is known.
        </p>
        <p>
          <MathBlock math={"\\bar{x} = \\frac{1.7 + (-3.1) + 17.1 + 2.5}{4} = 4.55"} />,{' '}
          <MathBlock math={"n = 4"} />, <MathBlock math={"z_{0.025} = 1.96"} />.
        </p>
        <MathBlock
          math={"4.55 \\pm 1.96 \\cdot \\frac{3}{\\sqrt{4}} = 4.55 \\pm 2.94 = (-2.85,\\; 11.95)"}
          display
        />
        <p>
          We are 95% confident that the true mean <MathBlock math={"\\mu"} /> lies in{' '}
          <MathBlock math={"(-2.85, 11.95)"} />.
        </p>
      </Example>

      <p><strong>One-sided confidence intervals:</strong></p>
      <ul>
        <li>
          <strong>Left-sided (upper bound for <MathBlock math={"\\mu"} />):</strong>{' '}
          <MathBlock math={"\\left(-\\infty,\\; \\bar{X} + z_\\alpha \\frac{\\sigma}{\\sqrt{n}}\\right)"} />,
          meaning <MathBlock math={"\\mu \\leq \\bar{X} + z_\\alpha \\frac{\\sigma}{\\sqrt{n}}"} />.
        </li>
        <li>
          <strong>Right-sided (lower bound for <MathBlock math={"\\mu"} />):</strong>{' '}
          <MathBlock math={"\\left(\\bar{X} - z_\\alpha \\frac{\\sigma}{\\sqrt{n}},\\; \\infty\\right)"} />,
          meaning <MathBlock math={"\\bar{X} - z_\\alpha \\frac{\\sigma}{\\sqrt{n}} \\leq \\mu"} />.
        </li>
      </ul>
      <p>
        Note the critical value is <MathBlock math={"z_\\alpha"} /> (not{' '}
        <MathBlock math={"z_{\\alpha/2}"} />) because all <MathBlock math={"\\alpha"} />{' '}
        goes into one tail.
      </p>

      {/* ─── CI for σ² ─── */}
      <h4>CI for the Variance <MathBlock math={"\\sigma^2"} /></h4>

      <p>
        Now suppose both <MathBlock math={"\\mu"} /> and{' '}
        <MathBlock math={"\\sigma^2"} /> are unknown. From Theorem 6.14 we know:
      </p>
      <MathBlock
        math={"\\frac{(n-1)S^2}{\\sigma^2} \\sim \\chi^2(n-1)"}
        display
      />
      <p>
        Using the chi-squared critical values (note: the chi-squared distribution is{' '}
        <em>not</em> symmetric, so we need separate left and right critical values):
      </p>
      <MathBlock
        math={"P\\!\\left(\\chi^2_{n-1;\\,1-\\alpha/2} < \\frac{(n-1)S^2}{\\sigma^2} < \\chi^2_{n-1;\\,\\alpha/2}\\right) = 1 - \\alpha"}
        display
      />
      <p>Rearranging for <MathBlock math={"\\sigma^2"} />:</p>

      <Theorem id="thm-ci-sigma2" title="CI for σ²">
        <p>
          The <MathBlock math={"100(1-\\alpha)\\%"} /> confidence interval for{' '}
          <MathBlock math={"\\sigma^2"} /> is:
        </p>
        <MathBlock
          math={"\\left(\\frac{(n-1)S^2}{\\chi^2_{n-1;\\,\\alpha/2}},\\; \\frac{(n-1)S^2}{\\chi^2_{n-1;\\,1-\\alpha/2}}\\right)"}
          display
        />
        <p>
          <strong>Condition:</strong> The sample must come from a{' '}
          <strong>normal population</strong>. Unlike the CI for{' '}
          <MathBlock math={"\\mu"} />, there is no CLT-based large-sample approximation
          here — normality is essential.
        </p>
      </Theorem>

      <Note>
        The notation can be confusing. Remember:{' '}
        <MathBlock math={"\\chi^2_{n;\\alpha}"} /> is the value where{' '}
        <MathBlock math={"P(\\chi^2 > \\chi^2_{n;\\alpha}) = \\alpha"} /> (upper-tail
        probability). So <MathBlock math={"\\chi^2_{n;\\alpha/2}"} /> is the{' '}
        <em>larger</em> critical value (right tail), and{' '}
        <MathBlock math={"\\chi^2_{n;1-\\alpha/2}"} /> is the <em>smaller</em> one (left
        tail). The larger chi-squared value goes in the <em>denominator</em> of the{' '}
        <em>lower</em> bound, making the lower bound smaller.
      </Note>

      <p>
        To get a CI for the standard deviation <MathBlock math={"\\sigma"} />, simply take
        the square root of both endpoints.
      </p>

      <Example title="Exercise 7.10 — CI for Variance">
        <p>
          A sample of <MathBlock math={"n = 7"} /> from a normal population gives{' '}
          <MathBlock math={"\\bar{x} = 455"} /> and{' '}
          <MathBlock math={"s^2 = 5.3333"} />, so{' '}
          <MathBlock math={"(n-1)s^2 = 6 \\times 5.3333 = 32"} />.
        </p>
        <p>For a 95% CI (<MathBlock math={"\\alpha = 0.05"} />), degrees of freedom 6:</p>
        <MathBlock
          math={"\\chi^2_{6;\\,0.025} = 14.4494 \\quad \\text{(right tail)}, \\qquad \\chi^2_{6;\\,0.975} = 1.2374 \\quad \\text{(left tail)}"}
          display
        />
        <MathBlock
          math={"\\text{CI for } \\sigma^2: \\left(\\frac{32}{14.4494},\\; \\frac{32}{1.2374}\\right) = (2.215,\\; 25.869)"}
          display
        />
        <p>
          CI for <MathBlock math={"\\sigma"} />:{' '}
          <MathBlock math={"(\\sqrt{2.215},\\; \\sqrt{25.869}) = (1.49,\\; 5.09)"} />.
        </p>
      </Example>

      {/* ─── CI for μ (σ unknown) ─── */}
      <h4>CI for the Mean <MathBlock math={"\\mu"} /> (Variance <MathBlock math={"\\sigma^2"} /> Unknown)</h4>

      <p>
        In practice, <MathBlock math={"\\sigma"} /> is almost never known. When we replace{' '}
        <MathBlock math={"\\sigma"} /> with the sample standard deviation{' '}
        <MathBlock math={"S"} />, the standardised statistic no longer follows a normal
        distribution — it follows a <strong>t-distribution</strong>:
      </p>
      <MathBlock
        math={"T = \\frac{\\bar{X} - \\mu}{S / \\sqrt{n}} \\sim t(n-1)"}
        display
      />
      <p>This is exactly Theorem 6.4 combined with Theorem 6.14 from the previous topic.</p>

      <Theorem id="thm-ci-mu-unknown" title="CI for μ (σ Unknown)">
        <p>
          The <MathBlock math={"100(1-\\alpha)\\%"} /> confidence interval for{' '}
          <MathBlock math={"\\mu"} /> when <MathBlock math={"\\sigma"} /> is unknown:
        </p>
        <MathBlock
          math={"\\bar{X} \\pm t_{n-1;\\,\\alpha/2} \\,\\frac{S}{\\sqrt{n}}"}
          display
        />
        <p><strong>Conditions:</strong></p>
        <ul>
          <li>
            Exact if <MathBlock math={"X_i \\sim N(\\mu, \\sigma^2)"} /> (any{' '}
            <MathBlock math={"n \\geq 1"} />).
          </li>
          <li>
            Approximately valid for any distribution if{' '}
            <MathBlock math={"n \\geq 30"} /> (CLT + Slutsky&rsquo;s theorem, and{' '}
            <MathBlock math={"t(n-1) \\approx N(0,1)"} /> for large{' '}
            <MathBlock math={"n"} />).
          </li>
        </ul>
      </Theorem>

      <Note>
        The t-interval is always <strong>wider</strong> than the z-interval (for the same
        data and confidence level) because{' '}
        <MathBlock math={"t_{n-1;\\,\\alpha/2} > z_{\\alpha/2}"} /> — we pay a price for
        estimating <MathBlock math={"\\sigma"} />. As{' '}
        <MathBlock math={"n \\to \\infty"} />,{' '}
        <MathBlock math={"t_{n-1;\\,\\alpha/2} \\to z_{\\alpha/2}"} /> and the two
        intervals coincide. Remember the symmetry property:{' '}
        <MathBlock math={"t_{n;\\,\\alpha} = -t_{n;\\,1-\\alpha}"} />.
      </Note>

      {/* ─── CI for p ─── */}
      <h4>CI for a Proportion <MathBlock math={"p"} /></h4>

      <p>
        Let <MathBlock math={"Y_1, \\ldots, Y_n \\stackrel{\\text{iid}}{\\sim} \\text{Ber}(p)"} />{' '}
        and <MathBlock math={"X = \\sum Y_i \\sim \\text{Bin}(n,p)"} />. The estimator is{' '}
        <MathBlock math={"\\hat{p} = X/n"} />. By the CLT (for large{' '}
        <MathBlock math={"n"} />):
      </p>
      <MathBlock
        math={"\\frac{\\hat{p} - p}{\\sqrt{p(1-p)/n}} \\;\\dot{\\sim}\\; N(0,1)"}
        display
      />
      <p>
        Since we don&rsquo;t know <MathBlock math={"p"} />, we replace it by{' '}
        <MathBlock math={"\\hat{p}"} /> in the standard error:
      </p>

      <Theorem id="thm-ci-p" title="CI for Proportion p">
        <p>
          The <MathBlock math={"100(1-\\alpha)\\%"} /> (approximate) confidence interval
          for <MathBlock math={"p"} />:
        </p>
        <MathBlock
          math={"\\hat{p} \\pm z_{\\alpha/2}\\sqrt{\\frac{\\hat{p}(1-\\hat{p})}{n}}"}
          display
        />
        <p>
          <strong>Condition:</strong>{' '}
          <MathBlock math={"n\\hat{p} \\geq 5"} /> and{' '}
          <MathBlock math={"n(1-\\hat{p}) \\geq 5"} /> (so the normal approximation to the
          binomial is reasonable).
        </p>
      </Theorem>

      {/* ─── Sample size determination ─── */}
      <h4>Sample Size Determination</h4>

      <p>
        Sometimes we want to choose <MathBlock math={"n"} /> <em>before</em> collecting
        data to ensure the margin of error is at most <MathBlock math={"B"} />.
      </p>

      <p><strong>For the mean (σ known):</strong></p>
      <MathBlock
        math={"z_{\\alpha/2}\\frac{\\sigma}{\\sqrt{n}} \\leq B \\;\\Longrightarrow\\; n \\geq \\left(\\frac{z_{\\alpha/2}\\,\\sigma}{B}\\right)^{\\!2}"}
        display
      />

      <p><strong>For a proportion:</strong></p>
      <MathBlock
        math={"z_{\\alpha/2}\\sqrt{\\frac{\\hat{p}(1-\\hat{p})}{n}} \\leq B \\;\\Longrightarrow\\; n \\geq \\left(\\frac{z_{\\alpha/2}}{B}\\right)^{\\!2} \\hat{p}(1-\\hat{p})"}
        display
      />
      <p>
        If no prior estimate of <MathBlock math={"p"} /> is available, use{' '}
        <MathBlock math={"\\hat{p} = 0.5"} /> (which maximises{' '}
        <MathBlock math={"\\hat{p}(1-\\hat{p})"} /> and gives the most conservative —
        largest — sample size).
      </p>

      {/* ─── Summary table for one population ─── */}
      <h4>Summary: Confidence Intervals for One Population</h4>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Parameter</th>
              <th><MathBlock math={"100(1-\\alpha)\\%"} /> CI</th>
              <th>Conditions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><MathBlock math={"\\mu"} /> (<MathBlock math={"\\sigma"} /> known)</td>
              <td><MathBlock math={"\\bar{x} \\pm z_{\\alpha/2}\\,\\dfrac{\\sigma}{\\sqrt{n}}"} /></td>
              <td>Normal, or <MathBlock math={"n \\geq 30"} /> (CLT)</td>
            </tr>
            <tr>
              <td><MathBlock math={"\\mu"} /> (<MathBlock math={"\\sigma"} /> unknown)</td>
              <td><MathBlock math={"\\bar{x} \\pm t_{n-1;\\,\\alpha/2}\\,\\dfrac{s}{\\sqrt{n}}"} /></td>
              <td>Normal, or <MathBlock math={"n \\geq 30"} /> (CLT)</td>
            </tr>
            <tr>
              <td><MathBlock math={"\\sigma^2"} /> (or <MathBlock math={"\\sigma"} />)</td>
              <td>
                <MathBlock math={"\\left(\\dfrac{(n-1)s^2}{\\chi^2_{n-1;\\,\\alpha/2}},\\; \\dfrac{(n-1)s^2}{\\chi^2_{n-1;\\,1-\\alpha/2}}\\right)"} />
              </td>
              <td>Normal population required</td>
            </tr>
            <tr>
              <td><MathBlock math={"p"} /></td>
              <td><MathBlock math={"\\hat{p} \\pm z_{\\alpha/2}\\sqrt{\\dfrac{\\hat{p}(1-\\hat{p})}{n}}"} /></td>
              <td><MathBlock math={"n\\hat{p} \\geq 5"} /> and <MathBlock math={"n(1-\\hat{p}) \\geq 5"} /></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ════════════════════════════════════════════
          §7.4 — TWO-POPULATION CIs
          ════════════════════════════════════════════ */}
      <h3>Confidence Intervals for Two Populations (§7.4)</h3>

      <p>
        Often we want to compare two populations — for example, is there a difference in
        mean income between two cities, or in the effectiveness of two treatments? We now
        have <strong>two independent samples</strong>:
      </p>
      <MathBlock
        math={"X_1, \\ldots, X_{n_X} \\sim N(\\mu_X, \\sigma_X^2) \\qquad Y_1, \\ldots, Y_{n_Y} \\sim N(\\mu_Y, \\sigma_Y^2)"}
        display
      />
      <p>
        with all <MathBlock math={"X_i"} /> independent of all{' '}
        <MathBlock math={"Y_j"} />.
      </p>

      {/* ─── Difference of means, σ known ─── */}
      <h4>CI for <MathBlock math={"\\mu_X - \\mu_Y"} /> (Variances Known)</h4>

      <p>
        Since <MathBlock math={"\\bar{X} - \\bar{Y}"} /> is a linear combination of
        independent normals:
      </p>
      <MathBlock
        math={"\\bar{X} - \\bar{Y} \\sim N\\!\\left(\\mu_X - \\mu_Y,\\; \\frac{\\sigma_X^2}{n_X} + \\frac{\\sigma_Y^2}{n_Y}\\right)"}
        display
      />

      <Theorem id="thm-ci-diff-known" title="CI for μ_X − μ_Y (σ's Known)">
        <MathBlock
          math={"(\\bar{X} - \\bar{Y}) \\pm z_{\\alpha/2}\\sqrt{\\frac{\\sigma_X^2}{n_X} + \\frac{\\sigma_Y^2}{n_Y}}"}
          display
        />
      </Theorem>

      {/* ─── Difference of means, σ unknown equal ─── */}
      <h4>CI for <MathBlock math={"\\mu_X - \\mu_Y"} /> (Variances Unknown but Equal: <MathBlock math={"\\sigma_X = \\sigma_Y"} />)</h4>

      <p>
        When we assume <MathBlock math={"\\sigma_X^2 = \\sigma_Y^2 = \\sigma^2"} /> (equal
        but unknown), we pool the two samples to get a better estimate of the common
        variance:
      </p>

      <Definition id="def-pooled-var" title="Pooled Sample Variance">
        <MathBlock
          math={"S_P^2 = \\frac{(n_X - 1)S_X^2 + (n_Y - 1)S_Y^2}{n_X + n_Y - 2}"}
          display
        />
        <p>
          This is a weighted average of the two sample variances, with weights proportional
          to their degrees of freedom. The total degrees of freedom is{' '}
          <MathBlock math={"n_X + n_Y - 2"} />.
        </p>
      </Definition>

      <Theorem id="thm-ci-diff-equal" title="CI for μ_X − μ_Y (σ's Unknown but Equal)">
        <MathBlock
          math={"(\\bar{X} - \\bar{Y}) \\pm t_{n_X + n_Y - 2;\\,\\alpha/2}\\sqrt{S_P^2\\!\\left(\\frac{1}{n_X} + \\frac{1}{n_Y}\\right)}"}
          display
        />
        <p>
          <strong>Condition:</strong> Both populations are normal (or{' '}
          <MathBlock math={"n_X, n_Y \\geq 30"} />) and the population variances are
          equal.
        </p>
      </Theorem>

      <p>
        <strong>Why does this work?</strong> Under{' '}
        <MathBlock math={"\\sigma_X^2 = \\sigma_Y^2 = \\sigma^2"} />:
      </p>
      <MathBlock
        math={"\\frac{(n_X - 1)S_X^2}{\\sigma^2} + \\frac{(n_Y - 1)S_Y^2}{\\sigma^2} = \\frac{(n_X + n_Y - 2)S_P^2}{\\sigma^2} \\sim \\chi^2(n_X + n_Y - 2)"}
        display
      />
      <p>
        Combined with{' '}
        <MathBlock math={"\\frac{(\\bar{X} - \\bar{Y}) - (\\mu_X - \\mu_Y)}{\\sigma\\sqrt{1/n_X + 1/n_Y}} \\sim N(0,1)"} />{' '}
        and applying Definition 6.1 (t = Z/&radic;(U/&nu;)) gives the t-distribution with{' '}
        <MathBlock math={"n_X + n_Y - 2"} /> degrees of freedom.
      </p>

      {/* ─── Difference of means, σ unknown unequal ─── */}
      <h4>CI for <MathBlock math={"\\mu_X - \\mu_Y"} /> (Variances Unknown and Unequal)</h4>

      <p>
        When we cannot assume <MathBlock math={"\\sigma_X^2 = \\sigma_Y^2"} />, we use
        the <strong>Welch approximation</strong>. The idea: replace each unknown{' '}
        <MathBlock math={"\\sigma^2"} /> with the corresponding{' '}
        <MathBlock math={"S^2"} /> and approximate the resulting distribution with a
        t-distribution whose degrees of freedom are estimated from the data.
      </p>

      <Theorem id="thm-ci-diff-welch" title="CI for μ_X − μ_Y (Welch Approximation)">
        <MathBlock
          math={"(\\bar{X} - \\bar{Y}) \\pm t_{\\nu;\\,\\alpha/2}\\sqrt{\\frac{S_X^2}{n_X} + \\frac{S_Y^2}{n_Y}}"}
          display
        />
        <p>where the degrees of freedom <MathBlock math={"\\nu"} /> are:</p>
        <MathBlock
          math={"\\nu = \\frac{\\left(\\dfrac{S_X^2}{n_X} + \\dfrac{S_Y^2}{n_Y}\\right)^{\\!2}}{\\dfrac{(S_X^2/n_X)^2}{n_X - 1} + \\dfrac{(S_Y^2/n_Y)^2}{n_Y - 1}}"}
          display
        />
        <p>
          Round <MathBlock math={"\\nu"} /> down to the nearest integer.
        </p>
      </Theorem>

      <Note>
        In practice, you should use the Welch approach unless there is strong reason to
        believe the variances are equal (e.g., from a prior F-test or domain knowledge). The
        pooled approach has more power when the equal-variance assumption holds, but it can
        be misleading when it doesn&rsquo;t.
      </Note>

      {/* ─── CI for σ²_X/σ²_Y ─── */}
      <h4>CI for the Variance Ratio <MathBlock math={"\\sigma_X^2 / \\sigma_Y^2"} /></h4>

      <p>
        From Theorem 6.6 in the previous topic, the ratio of two independent scaled
        chi-squareds follows an F-distribution:
      </p>
      <MathBlock
        math={"\\frac{S_X^2 / \\sigma_X^2}{S_Y^2 / \\sigma_Y^2} = \\frac{S_X^2}{S_Y^2} \\cdot \\frac{\\sigma_Y^2}{\\sigma_X^2} \\sim F(n_X - 1,\\, n_Y - 1)"}
        display
      />

      <Theorem id="thm-ci-var-ratio" title="CI for σ²_X / σ²_Y">
        <MathBlock
          math={"\\left(\\frac{S_X^2}{S_Y^2} \\cdot \\frac{1}{f_{n_X-1,\\,n_Y-1;\\,\\alpha/2}},\\;\\; \\frac{S_X^2}{S_Y^2} \\cdot f_{n_Y-1,\\,n_X-1;\\,\\alpha/2}\\right)"}
          display
        />
        <p>
          <strong>Condition:</strong> Both populations must be normal.
        </p>
      </Theorem>

      <p>
        For a CI of the ratio of standard deviations{' '}
        <MathBlock math={"\\sigma_X / \\sigma_Y"} />, take the square root of both
        endpoints. If the CI for{' '}
        <MathBlock math={"\\sigma_X^2 / \\sigma_Y^2"} /> contains 1, there is no
        significant evidence that the variances differ (useful as an informal check before
        using the pooled-variance CI for means).
      </p>

      {/* ─── CI for p_X - p_Y ─── */}
      <h4>CI for the Difference of Proportions <MathBlock math={"p_X - p_Y"} /></h4>

      <p>
        With independent samples from two Bernoulli populations and sufficiently large
        sample sizes, the CLT gives:
      </p>

      <Theorem id="thm-ci-diff-p" title="CI for p_X − p_Y">
        <MathBlock
          math={"(\\hat{p}_X - \\hat{p}_Y) \\pm z_{\\alpha/2}\\sqrt{\\frac{\\hat{p}_X(1-\\hat{p}_X)}{n_X} + \\frac{\\hat{p}_Y(1-\\hat{p}_Y)}{n_Y}}"}
          display
        />
        <p>
          <strong>Condition:</strong>{' '}
          <MathBlock math={"n_X \\hat{p}_X,\\; n_X(1-\\hat{p}_X),\\; n_Y \\hat{p}_Y,\\; n_Y(1-\\hat{p}_Y) \\geq 5"} />.
        </p>
      </Theorem>

      {/* ─── Paired samples ─── */}
      <h4>Paired Samples</h4>

      <p>
        Sometimes the two samples are <em>not</em> independent. This happens when each
        observation in one sample is naturally paired with an observation in the other — for
        example, measuring the same patient before and after treatment, or comparing two
        investment strategies over the same time periods.
      </p>

      <p><strong>How to recognise paired data:</strong></p>
      <ul>
        <li>Same subjects measured twice (before/after, left/right, etc.).</li>
        <li>Matched subjects (twins, siblings, matched controls).</li>
        <li>Same time period affecting both measurements.</li>
        <li>Sample sizes must be equal: <MathBlock math={"n_X = n_Y = n"} />.</li>
      </ul>

      <Definition id="def-paired" title="Paired Samples Strategy">
        <p>
          Given paired observations{' '}
          <MathBlock math={"(X_1, Y_1), \\ldots, (X_n, Y_n)"} />, define the{' '}
          <strong>paired differences</strong>:
        </p>
        <MathBlock
          math={"W_i = X_i - Y_i, \\quad i = 1, \\ldots, n"}
          display
        />
        <p>
          Then <MathBlock math={"W_1, \\ldots, W_n"} /> form a single random sample.
          Apply the one-population CI formulas from §7.3 to the{' '}
          <MathBlock math={"W_i"} />&rsquo;s. For example, a CI for{' '}
          <MathBlock math={"\\mu_W = \\mu_X - \\mu_Y"} /> is:
        </p>
        <MathBlock
          math={"\\bar{W} \\pm t_{n-1;\\,\\alpha/2}\\frac{S_W}{\\sqrt{n}}"}
          display
        />
        <p>
          where <MathBlock math={"\\bar{W}"} /> and <MathBlock math={"S_W"} /> are the
          sample mean and standard deviation of the differences.
        </p>
      </Definition>

      <Note>
        Paired samples and independent samples are fundamentally different designs.
        Using the independent-samples formula on paired data ignores the pairing and
        typically gives a wider (less powerful) interval. Using the paired formula on
        genuinely independent data is incorrect because the{' '}
        <MathBlock math={"W_i"} /> would not form a proper sample. Always check the study
        design first.
      </Note>

      {/* ─── Two-population summary table ─── */}
      <h4>Summary: Confidence Intervals for Two Populations</h4>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Parameter</th>
              <th><MathBlock math={"100(1-\\alpha)\\%"} /> CI</th>
              <th>Conditions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><MathBlock math={"\\mu_X - \\mu_Y"} /> (<MathBlock math={"\\sigma"} />&rsquo;s known)</td>
              <td><MathBlock math={"(\\bar{x}-\\bar{y}) \\pm z_{\\alpha/2}\\sqrt{\\dfrac{\\sigma_X^2}{n_X}+\\dfrac{\\sigma_Y^2}{n_Y}}"} /></td>
              <td>Normal, or both <MathBlock math={"n \\geq 30"} /></td>
            </tr>
            <tr>
              <td><MathBlock math={"\\mu_X - \\mu_Y"} /> (<MathBlock math={"\\sigma_X = \\sigma_Y"} /> unknown)</td>
              <td><MathBlock math={"(\\bar{x}-\\bar{y}) \\pm t_{n_X+n_Y-2;\\,\\alpha/2}\\sqrt{s_P^2\\left(\\frac{1}{n_X}+\\frac{1}{n_Y}\\right)}"} /></td>
              <td>Normal, or both <MathBlock math={"n \\geq 30"} />; equal variances</td>
            </tr>
            <tr>
              <td><MathBlock math={"\\mu_X - \\mu_Y"} /> (<MathBlock math={"\\sigma_X \\neq \\sigma_Y"} /> unknown)</td>
              <td><MathBlock math={"(\\bar{x}-\\bar{y}) \\pm t_{\\nu;\\,\\alpha/2}\\sqrt{\\dfrac{s_X^2}{n_X}+\\dfrac{s_Y^2}{n_Y}}"} /> (Welch)</td>
              <td>Normal, or both <MathBlock math={"n \\geq 30"} />; compute <MathBlock math={"\\nu"} /></td>
            </tr>
            <tr>
              <td><MathBlock math={"\\sigma_X^2 / \\sigma_Y^2"} /></td>
              <td><MathBlock math={"\\dfrac{s_X^2}{s_Y^2}\\cdot\\dfrac{1}{f_{n_X-1,n_Y-1;\\alpha/2}} \\;\\text{to}\\; \\dfrac{s_X^2}{s_Y^2}\\cdot f_{n_Y-1,n_X-1;\\alpha/2}"} /></td>
              <td>Both populations normal</td>
            </tr>
            <tr>
              <td><MathBlock math={"p_X - p_Y"} /></td>
              <td><MathBlock math={"(\\hat{p}_X - \\hat{p}_Y) \\pm z_{\\alpha/2}\\sqrt{\\dfrac{\\hat{p}_X(1-\\hat{p}_X)}{n_X}+\\dfrac{\\hat{p}_Y(1-\\hat{p}_Y)}{n_Y}}"} /></td>
              <td>All four <MathBlock math={"n\\hat{p}"} /> and <MathBlock math={"n(1-\\hat{p}) \\geq 5"} /></td>
            </tr>
            <tr>
              <td><MathBlock math={"\\mu_X - \\mu_Y"} /> (paired)</td>
              <td><MathBlock math={"\\bar{w} \\pm t_{n-1;\\,\\alpha/2}\\,\\dfrac{s_W}{\\sqrt{n}}"} /></td>
              <td>Differences normal, or <MathBlock math={"n \\geq 30"} /></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ════════════════════════════════════════════
          WORKED QUESTIONS
          ════════════════════════════════════════════ */}
      <h3>Worked Questions</h3>

      <WorkedQuestion
        source="Exercise 7.7"
        difficulty="standard"
        solution={
          <>
            <p>
              We have <MathBlock math={"n = 12"} /> observations from a normal distribution
              with <MathBlock math={"\\sigma^2 = 4"} /> (so{' '}
              <MathBlock math={"\\sigma = 2"} />). From the data:{' '}
              <MathBlock math={"\\bar{x} = 178.99"} />.
            </p>
            <p>
              Since <MathBlock math={"\\sigma"} /> is <strong>known</strong>, we use the
              z-interval.
            </p>
            <p><strong>(a) 90% CI</strong> (<MathBlock math={"\\alpha = 0.10"} />,{' '}
              <MathBlock math={"z_{0.05} = 1.645"} />):</p>
            <MathBlock
              math={"178.99 \\pm 1.645 \\cdot \\frac{2}{\\sqrt{12}} = 178.99 \\pm 0.95 = (178.04,\\; 179.94)"}
              display
            />
            <p><strong>(b) 95% CI</strong> (<MathBlock math={"z_{0.025} = 1.96"} />):</p>
            <MathBlock
              math={"178.99 \\pm 1.96 \\cdot \\frac{2}{\\sqrt{12}} = 178.99 \\pm 1.13 = (177.86,\\; 180.12)"}
              display
            />
            <p>
              Note: higher confidence level &rArr; wider interval. This makes intuitive
              sense — to be <em>more confident</em> the interval captures{' '}
              <MathBlock math={"\\mu"} />, we need to cast a wider net.
            </p>
          </>
        }
      >
        <p>
          A sample of <MathBlock math={"n = 12"} /> observations from a normal population
          with <MathBlock math={"\\sigma^2 = 4"} /> gives{' '}
          <MathBlock math={"\\bar{x} = 178.99"} />. Construct (a) a 90% CI and (b) a 95%
          CI for <MathBlock math={"\\mu"} />.
        </p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Exercise 7.17"
        difficulty="standard"
        solution={
          <>
            <p>
              Given: <MathBlock math={"n = 16"} />,{' '}
              <MathBlock math={"\\sum x_i = 1691"} />,{' '}
              <MathBlock math={"\\sum x_i^2 = 179263"} />. First compute statistics:
            </p>
            <MathBlock
              math={"\\bar{x} = \\frac{1691}{16} = 105.6875"}
              display
            />
            <MathBlock
              math={"s^2 = \\frac{\\sum x_i^2 - n\\bar{x}^2}{n-1} = \\frac{179263 - 16 \\cdot (105.6875)^2}{15} = \\frac{179263 - 178722.5625}{15} = 36.03"}
              display
            />
            <MathBlock
              math={"s = \\sqrt{36.03} \\approx 6.003"}
              display
            />
            <p>
              <strong>(a) 95% CI for <MathBlock math={"\\mu"} />:</strong>{' '}
              Since <MathBlock math={"\\sigma"} /> is unknown, use the t-interval with{' '}
              <MathBlock math={"n - 1 = 15"} /> degrees of freedom:{' '}
              <MathBlock math={"t_{15;\\,0.025} = 2.131"} />.
            </p>
            <MathBlock
              math={"105.69 \\pm 2.131 \\cdot \\frac{6.003}{\\sqrt{16}} = 105.69 \\pm 3.20 = (102.49,\\; 108.89)"}
              display
            />
            <p>
              <strong>(b) Sample size for margin &le; 2:</strong>{' '}
              We need{' '}
              <MathBlock math={"z_{\\alpha/2} \\cdot \\frac{\\sigma}{\\sqrt{n}} \\leq 2"} />.
              Using <MathBlock math={"\\sigma \\approx 10"} /> (given as a rough estimate)
              and <MathBlock math={"z_{0.025} = 1.96"} />:
            </p>
            <MathBlock
              math={"n \\geq \\left(\\frac{1.96 \\times 10}{2}\\right)^{\\!2} = (9.8)^2 = 96.04 \\;\\Rightarrow\\; n \\geq 97"}
              display
            />
            <p>
              Note: for sample-size calculations with known margin of error, we use{' '}
              <MathBlock math={"z_{\\alpha/2}"} /> (not <MathBlock math={"t"} />), because
              we don&rsquo;t yet have <MathBlock math={"s"} /> and we need{' '}
              <MathBlock math={"\\sigma"} /> (here estimated from prior knowledge). Always round up.
            </p>
          </>
        }
      >
        <p>
          A sample of size <MathBlock math={"n = 16"} /> gives{' '}
          <MathBlock math={"\\sum x_i = 1691"} /> and{' '}
          <MathBlock math={"\\sum x_i^2 = 179263"} />. (a) Construct a 95% CI for{' '}
          <MathBlock math={"\\mu"} /> (assume normal population). (b) How large a sample
          is needed for a margin of error at most 2 at 95% confidence, if{' '}
          <MathBlock math={"\\sigma \\approx 10"} />?
        </p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Exercise 7.21"
        difficulty="standard"
        solution={
          <>
            <p>
              A sample of <MathBlock math={"n = 700"} /> people finds{' '}
              <MathBlock math={"x = 350"} /> successes, so{' '}
              <MathBlock math={"\\hat{p} = 350/700 = 0.5"} />.
            </p>
            <p>
              <strong>(a) 95% CI for <MathBlock math={"p"} />:</strong>{' '}
              <MathBlock math={"z_{0.025} = 1.96"} />.
            </p>
            <MathBlock
              math={"0.5 \\pm 1.96\\sqrt{\\frac{0.5 \\times 0.5}{700}} = 0.5 \\pm 1.96 \\times 0.0189 = 0.5 \\pm 0.037 = (0.463,\\; 0.537)"}
              display
            />
            <p>Check: <MathBlock math={"n\\hat{p} = 350 \\geq 5"} /> &#10003; and{' '}
              <MathBlock math={"n(1-\\hat{p}) = 350 \\geq 5"} /> &#10003;.</p>
            <p>
              <strong>(b) Sample size for margin &le; 0.02 at 95%:</strong>
            </p>
            <MathBlock
              math={"n \\geq \\left(\\frac{1.96}{0.02}\\right)^{\\!2} \\times 0.5 \\times 0.5 = (98)^2 \\times 0.25 = 9604 \\times 0.25 = 2401"}
              display
            />
            <p>
              Wait — let us be careful. Using{' '}
              <MathBlock math={"\\hat{p} = 0.5"} /> (the conservative value):
            </p>
            <MathBlock
              math={"n \\geq \\left(\\frac{z_{\\alpha/2}}{B}\\right)^{\\!2} \\hat{p}(1-\\hat{p}) = \\left(\\frac{1.96}{0.02}\\right)^{\\!2} \\times 0.25 = 9604"}
              display
            />
            <p>So we need <MathBlock math={"n \\geq 9604"} />.</p>
            <p>
              <strong>(c) 99% CI:</strong>{' '}
              <MathBlock math={"z_{0.005} = 2.576"} />.
            </p>
            <MathBlock
              math={"0.5 \\pm 2.576 \\times 0.0189 = 0.5 \\pm 0.049 = (0.451,\\; 0.549)"}
              display
            />
            <p>
              For margin &le; 0.02 at 99%:{' '}
              <MathBlock math={"n \\geq (2.576/0.02)^2 \\times 0.25 = 16589.4 \\Rightarrow n \\geq 16590"} />.
            </p>
          </>
        }
      >
        <p>
          In a sample of 700, exactly half respond &ldquo;yes.&rdquo; (a) Construct a 95%
          CI for the population proportion <MathBlock math={"p"} />. (b) How large a
          sample is needed to estimate <MathBlock math={"p"} /> with margin of error at
          most 0.02 at 95% confidence? (c) Repeat with 99% confidence.
        </p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Exercise 7.25"
        difficulty="exam-level"
        solution={
          <>
            <p>
              <strong>Step 1 — Identify as paired:</strong> Returns for both portfolios are
              measured in the same 8 weeks. The stock market conditions in a given week
              affect both portfolios, so the observations are <em>not independent</em>.
              This is a paired-samples problem.
            </p>
            <p>
              <strong>Step 2 — Compute differences:</strong>{' '}
              <MathBlock math={"W_i = X_i - Y_i"} /> (portfolio 1 minus portfolio 2):
            </p>
            <MathBlock
              math={"W: \\;-0.1,\\; 0.24,\\; -0.37,\\; -0.41,\\; 0.17,\\; 0.05,\\; -0.42,\\; 0.01"}
              display
            />
            <p><strong>Step 3 — Summary statistics:</strong></p>
            <MathBlock
              math={"\\bar{w} = \\frac{\\sum w_i}{8} = \\frac{-0.83}{8} = -0.104"}
              display
            />
            <MathBlock
              math={"s_W^2 = \\frac{\\sum(w_i - \\bar{w})^2}{7} = 0.0706, \\qquad s_W = \\sqrt{0.0706} \\approx 0.2657"}
              display
            />
            <p>
              <strong>Step 4 — CI:</strong> With{' '}
              <MathBlock math={"n = 8"} />,{' '}
              <MathBlock math={"t_{7;\\,0.025} = 2.365"} /> (not <MathBlock math={"1.415"} /> — the
              problem states 80% confidence, so{' '}
              <MathBlock math={"t_{7;\\,0.10} = 1.415"} />):
            </p>
            <MathBlock
              math={"\\bar{w} \\pm t_{7;\\,0.10} \\cdot \\frac{s_W}{\\sqrt{8}} = -0.104 \\pm 1.415 \\cdot \\frac{0.2657}{\\sqrt{8}} = -0.104 \\pm 0.133 = (-0.237,\\; 0.029)"}
              display
            />
            <p>
              Since 0 is inside this CI, there is no significant evidence (at 80%
              confidence) that the two portfolios have different mean returns.
            </p>
          </>
        }
      >
        <p>
          Weekly returns (%) of two investment portfolios were recorded over 8 weeks. The
          returns of the two portfolios in a given week are determined by the same market
          conditions. Construct an 80% CI for the difference in mean returns.
        </p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Exercise 7.28"
        difficulty="exam-level"
        solution={
          <>
            <p>
              Two branches: branch A ({' '}
              <MathBlock math={"n_A = 6"} />, <MathBlock math={"\\bar{x}_A = 190"} />,{' '}
              <MathBlock math={"s_A^2 = 4343.6"} />) and branch B ({' '}
              <MathBlock math={"n_B = 6"} />, <MathBlock math={"\\bar{x}_B = 170"} />,{' '}
              <MathBlock math={"s_B^2 = 1602.4"} />).
            </p>
            <p>
              <strong>Pooled variance</strong> (assuming{' '}
              <MathBlock math={"\\sigma_A = \\sigma_B"} />):
            </p>
            <MathBlock
              math={"S_P^2 = \\frac{5 \\cdot 4343.6 + 5 \\cdot 1602.4}{10} = \\frac{21718 + 8012}{10} = 2973"}
              display
            />
            <p>
              Degrees of freedom:{' '}
              <MathBlock math={"n_A + n_B - 2 = 10"} />,{' '}
              <MathBlock math={"t_{10;\\,0.025} = 2.228"} /> (for 95% CI, but the homework
              uses <MathBlock math={"\\alpha = 0.10"} />, so{' '}
              <MathBlock math={"t_{10;\\,0.05} = 1.833"} /> for 90% CI).{' '}
              Let us do the 90% CI:
            </p>
            <MathBlock
              math={"(190 - 170) \\pm 1.833\\sqrt{2973\\left(\\frac{1}{6} + \\frac{1}{6}\\right)} = 20 \\pm 1.833\\sqrt{2973 \\cdot 0.3333}"}
              display
            />
            <MathBlock
              math={"= 20 \\pm 1.833 \\times 31.47 = 20 \\pm 57.68 = (-37.68,\\; 77.68)"}
              display
            />
            <p>
              Since 0 is inside the interval, there is no significant evidence of a
              difference in mean daily revenue between the branches at the 90% level.
            </p>
          </>
        }
      >
        <p>
          Two branches of a store report daily revenues. Branch A: sample of 6 days with{' '}
          <MathBlock math={"\\bar{x}_A = 190"} />,{' '}
          <MathBlock math={"s_A^2 = 4343.6"} />. Branch B: sample of 6 days with{' '}
          <MathBlock math={"\\bar{x}_B = 170"} />,{' '}
          <MathBlock math={"s_B^2 = 1602.4"} />. Assuming equal variances, construct a 90%
          CI for <MathBlock math={"\\mu_A - \\mu_B"} />.
        </p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Exercise 7.30"
        difficulty="exam-level"
        solution={
          <>
            <p>
              Two populations:{' '}
              <MathBlock math={"n_X = 13"} />,{' '}
              <MathBlock math={"s_X^2 = 8742"} />,{' '}
              <MathBlock math={"\\bar{x} = 984"} />; and{' '}
              <MathBlock math={"n_Y = 15"} />,{' '}
              <MathBlock math={"s_Y^2 = 9411"} />,{' '}
              <MathBlock math={"\\bar{y} = 1121"} />.
            </p>
            <p>
              <strong>(a) Variances known</strong>{' '}
              (<MathBlock math={"\\sigma_X^2 = 9000"} />,{' '}
              <MathBlock math={"\\sigma_Y^2 = 9500"} />). Use z-interval:
            </p>
            <MathBlock
              math={"(984 - 1121) \\pm 1.96\\sqrt{\\frac{9000}{13} + \\frac{9500}{15}} = -137 \\pm 1.96\\sqrt{692.3 + 633.3}"}
              display
            />
            <MathBlock
              math={"= -137 \\pm 1.96 \\times 36.41 = -137 \\pm 71.36 = (-208.36,\\; -65.64)"}
              display
            />
            <p>
              <strong>(b) Variances unknown but equal.</strong> Pooled variance:
            </p>
            <MathBlock
              math={"S_P^2 = \\frac{12 \\cdot 8742 + 14 \\cdot 9411}{26} = \\frac{104904 + 131754}{26} = 9102"}
              display
            />
            <MathBlock
              math={"t_{26;\\,0.025} = 2.056"}
              display
            />
            <MathBlock
              math={"(984 - 1121) \\pm 2.056\\sqrt{9102\\left(\\frac{1}{13} + \\frac{1}{15}\\right)} = -137 \\pm 2.056\\sqrt{9102 \\times 0.1436}"}
              display
            />
            <MathBlock
              math={"= -137 \\pm 2.056 \\times 36.16 = -137 \\pm 74.33 = (-211.33,\\; -62.67)"}
              display
            />
            <p>
              <strong>(c) Variances unknown and unequal (Welch).</strong> Degrees of
              freedom:
            </p>
            <MathBlock
              math={"\\nu = \\frac{(8742/13 + 9411/15)^2}{(8742/13)^2/12 + (9411/15)^2/14} = \\frac{(672.5 + 627.4)^2}{(672.5)^2/12 + (627.4)^2/14}"}
              display
            />
            <MathBlock
              math={"= \\frac{(1299.9)^2}{37693.8 + 28105.5} = \\frac{1689740}{65799} \\approx 25.68 \\;\\Rightarrow\\; \\nu = 25"}
              display
            />
            <MathBlock
              math={"t_{25;\\,0.025} = 2.060"}
              display
            />
            <MathBlock
              math={"-137 \\pm 2.060\\sqrt{\\frac{8742}{13} + \\frac{9411}{15}} = -137 \\pm 2.060 \\times 36.05 = -137 \\pm 74.27"}
              display
            />
            <MathBlock
              math={"= (-211.27,\\; -62.73)"}
              display
            />
            <p>
              All three methods give very similar results because the sample variances are
              close (suggesting equal variances). The negative interval means{' '}
              <MathBlock math={"\\mu_X < \\mu_Y"} /> with high confidence.
            </p>
          </>
        }
      >
        <p>
          Two independent samples from normal populations:{' '}
          <MathBlock math={"n_X = 13"} />,{' '}
          <MathBlock math={"\\bar{x} = 984"} />,{' '}
          <MathBlock math={"s_X^2 = 8742"} />; and{' '}
          <MathBlock math={"n_Y = 15"} />,{' '}
          <MathBlock math={"\\bar{y} = 1121"} />,{' '}
          <MathBlock math={"s_Y^2 = 9411"} />. Construct a 95% CI for{' '}
          <MathBlock math={"\\mu_X - \\mu_Y"} /> using (a) known variances{' '}
          <MathBlock math={"\\sigma_X^2 = 9000"} />,{' '}
          <MathBlock math={"\\sigma_Y^2 = 9500"} />, (b) equal unknown variances, (c) Welch
          approximation.
        </p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Exercise 7.32"
        difficulty="exam-level"
        solution={
          <>
            <p>
              Two normal populations with{' '}
              <MathBlock math={"n_1 = 10"} />,{' '}
              <MathBlock math={"s_1^2 = 0.123^2"} /> and{' '}
              <MathBlock math={"n_2 = 8"} />,{' '}
              <MathBlock math={"s_2^2 = 0.123^2"} /> (the homework gives specific
              values — let us use the solution&rsquo;s numbers).
            </p>
            <p>
              <strong>(a) 95% CI for <MathBlock math={"\\sigma_1"} />:</strong>{' '}
              With <MathBlock math={"(n_1 - 1)s_1^2 = 9 \\times 0.123^2 = 9 \\times 0.01513 = 0.1362"} /> and{' '}
              <MathBlock math={"\\chi^2_{9;\\,0.025} = 19.023"} />,{' '}
              <MathBlock math={"\\chi^2_{9;\\,0.975} = 2.700"} />:
            </p>
            <MathBlock
              math={"\\text{CI for }\\sigma_1: \\left(\\sqrt{\\frac{0.1362}{19.023}},\\; \\sqrt{\\frac{0.1362}{2.700}}\\right) = (0.085,\\; 0.225)"}
              display
            />
            <p>
              <strong>(b) 95% CI for{' '}
              <MathBlock math={"\\sigma_1^2/\\sigma_2^2"} />:</strong>{' '}
              Using <MathBlock math={"s_1^2/s_2^2"} /> and the appropriate F critical
              values{' '}
              <MathBlock math={"f_{9,7;\\,0.025} = 4.20"} />,{' '}
              <MathBlock math={"f_{7,9;\\,0.025} = 4.03"} />:
            </p>
            <MathBlock
              math={"\\left(\\frac{s_1^2}{s_2^2} \\cdot \\frac{1}{4.20},\\;\\; \\frac{s_1^2}{s_2^2} \\cdot 4.03\\right)"}
              display
            />
            <p>
              For <MathBlock math={"\\sigma_1/\\sigma_2"} />, take the square root of both
              endpoints: <MathBlock math={"(0.295,\\; 1.19)"} />.
            </p>
            <p>
              Since 1 is inside the CI, there is no strong evidence that{' '}
              <MathBlock math={"\\sigma_1 \\neq \\sigma_2"} />.
            </p>
          </>
        }
      >
        <p>
          Two independent normal samples are given. (a) Construct a 95% CI for{' '}
          <MathBlock math={"\\sigma_1"} />. (b) Construct a 95% CI for{' '}
          <MathBlock math={"\\sigma_1/\\sigma_2"} />.
        </p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Exercise 7.33"
        difficulty="exam-level"
        solution={
          <>
            <p>
              Males: <MathBlock math={"n_1 = 25"} />, 10 believe statistics is hardest, so{' '}
              <MathBlock math={"\\hat{p}_1 = 10/25 = 0.4"} />.
            </p>
            <p>
              Females: <MathBlock math={"n_2 = 36"} />, 21 believe statistics is hardest,
              so <MathBlock math={"\\hat{p}_2 = 21/36 = 0.5833"} />.
            </p>
            <p>
              Check conditions: <MathBlock math={"25 \\times 0.4 = 10 \\geq 5"} /> &#10003;,{' '}
              <MathBlock math={"25 \\times 0.6 = 15 \\geq 5"} /> &#10003;,{' '}
              <MathBlock math={"36 \\times 0.583 = 21 \\geq 5"} /> &#10003;,{' '}
              <MathBlock math={"36 \\times 0.417 = 15 \\geq 5"} /> &#10003;.
            </p>
            <p>95% CI for <MathBlock math={"p_1 - p_2"} />:</p>
            <MathBlock
              math={"(0.4 - 0.5833) \\pm 1.96\\sqrt{\\frac{0.4 \\times 0.6}{25} + \\frac{0.5833 \\times 0.4167}{36}}"}
              display
            />
            <MathBlock
              math={"= -0.1833 \\pm 1.96\\sqrt{0.0096 + 0.00675} = -0.1833 \\pm 1.96 \\times 0.1279"}
              display
            />
            <MathBlock
              math={"= -0.1833 \\pm 0.2507 = (-0.434,\\; 0.067)"}
              display
            />
            <p>
              Since the interval contains 0, there is no significant evidence (at 95%
              confidence) that the proportion of male students who find statistics the
              hardest differs from the proportion of female students.
            </p>
          </>
        }
      >
        <p>
          Of 25 male students, 10 believe statistics is the hardest subject. Of 36 female
          students, 21 think so. Construct a 95% CI for the difference in proportions{' '}
          <MathBlock math={"p_{\\text{male}} - p_{\\text{female}}"} />.
        </p>
      </WorkedQuestion>
    </>
  )
}
