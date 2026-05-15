import MathBlock from '../components/MathBlock'
import Definition from '../components/Definition'
import Theorem from '../components/Theorem'
import Proof from '../components/Proof'
import Example from '../components/Example'
import Note from '../components/Note'
import WorkedQuestion from '../components/WorkedQuestion'

export default function Topic8SamplingDistributions() {
  return (
    <>
      <p>
        In previous topics we learned how to transform random variables and find
        distributions of sums. Now we put those tools to work in the setting that
        matters most for statistics: we introduce two new distributions — the{' '}
        <strong>t-distribution</strong> and the <strong>F-distribution</strong> — that
        arise naturally when we work with <em>samples</em> from normal populations. We
        then formalise what a &ldquo;sample&rdquo; is, derive the sampling distributions
        of the sample mean <MathBlock math={"\\bar{X}"} /> and sample variance{' '}
        <MathBlock math={"S^2"} />, and finally study{' '}
        <strong>order statistics</strong> — the sorted values in a sample.
      </p>

      {/* ════════════════════════════════════════════
          §6.3 — t-DISTRIBUTION
          ════════════════════════════════════════════ */}
      <h3>The t-Distribution (§6.3)</h3>

      <p>
        The t-distribution is used whenever we need to make inferences about a
        population mean <MathBlock math={"\\mu"} /> but the population variance{' '}
        <MathBlock math={"\\sigma^2"} /> is <em>unknown</em> and must be estimated from
        the data. It looks like a standard normal but has heavier tails — reflecting the
        extra uncertainty from estimating <MathBlock math={"\\sigma"} />.
      </p>

      <Definition id="def-t-dist" title="Definition 6.1 — t-Distribution">
        <p>
          A continuous random variable <MathBlock math={"T"} /> has a{' '}
          <strong>t-distribution</strong> with parameter{' '}
          <MathBlock math={"\\nu"} /> (the <em>degrees of freedom</em>), written{' '}
          <MathBlock math={"T \\sim t(\\nu)"} /> or{' '}
          <MathBlock math={"T \\sim t_\\nu"} />, when its pdf is:
        </p>
        <MathBlock
          math={"f(x) = \\frac{\\Gamma\\!\\left(\\frac{\\nu+1}{2}\\right)}{\\Gamma\\!\\left(\\frac{\\nu}{2}\\right)\\sqrt{\\pi\\nu}} \\left(1 + \\frac{x^2}{\\nu}\\right)^{-\\frac{\\nu+1}{2}}, \\quad -\\infty < x < \\infty"}
          display
        />
        <p>
          where <MathBlock math={"\\nu = 1, 2, 3, \\ldots"} /> and{' '}
          <MathBlock math={"\\Gamma(\\cdot)"} /> is the Gamma function.
        </p>
      </Definition>

      <p><strong>Key shape properties:</strong></p>
      <ul>
        <li>
          Symmetric about 0 and bell-shaped, just like{' '}
          <MathBlock math={"N(0,1)"} />.
        </li>
        <li>
          <strong>Heavier tails</strong> than <MathBlock math={"N(0,1)"} /> — more
          probability in the extremes, less in the centre. This means more conservative
          (wider) confidence intervals.
        </li>
        <li>
          As <MathBlock math={"\\nu \\to \\infty"} />, the t-distribution converges to{' '}
          <MathBlock math={"N(0,1)"} />. In practice, for{' '}
          <MathBlock math={"\\nu \\geq 30"} /> the difference is small. The row{' '}
          <MathBlock math={"\\nu = \\infty"} /> in a t-table gives the standard normal
          critical values.
        </li>
        <li>
          With <MathBlock math={"\\nu = 1"} />, the t-distribution is the{' '}
          <strong>Cauchy distribution</strong> — so heavy-tailed that it has no finite
          mean or variance.
        </li>
      </ul>

      <p>
        But where does this distribution come from? The next theorem gives the
        construction that makes the t-distribution so useful:
      </p>

      <Theorem id="thm-t-construction" title="Theorem 6.4 — Constructing a t Random Variable">
        <p>
          If <MathBlock math={"Z \\sim N(0,1)"} />,{' '}
          <MathBlock math={"U \\sim \\chi^2(\\nu)"} />, and{' '}
          <MathBlock math={"Z"} /> and <MathBlock math={"U"} /> are{' '}
          <strong>independent</strong>, then:
        </p>
        <MathBlock
          math={"T = \\frac{Z}{\\sqrt{U/\\nu}} \\sim t(\\nu)"}
          display
        />
      </Theorem>

      <Proof title="Proof of Theorem 6.4 (transformation method)">
        <p>
          Define the transformation <MathBlock math={"T = Z / \\sqrt{U/\\nu}"} /> and{' '}
          <MathBlock math={"W = U"} /> (auxiliary variable). The inverse is{' '}
          <MathBlock math={"Z = T\\sqrt{W/\\nu}"} /> and{' '}
          <MathBlock math={"U = W"} />. The Jacobian is:
        </p>
        <MathBlock
          math={"|J| = \\begin{vmatrix} \\frac{\\partial z}{\\partial t} & \\frac{\\partial z}{\\partial w} \\\\ \\frac{\\partial u}{\\partial t} & \\frac{\\partial u}{\\partial w} \\end{vmatrix} = \\begin{vmatrix} \\sqrt{w/\\nu} & * \\\\ 0 & 1 \\end{vmatrix} = \\sqrt{w/\\nu}"}
          display
        />
        <p>
          Since <MathBlock math={"Z"} /> and <MathBlock math={"U"} /> are independent,
          their joint pdf factors:
        </p>
        <MathBlock
          math={"f_{T,W}(t,w) = f_Z(t\\sqrt{w/\\nu}) \\cdot f_U(w) \\cdot \\sqrt{w/\\nu}"}
          display
        />
        <p>
          Marginalise out <MathBlock math={"W"} /> by integrating over{' '}
          <MathBlock math={"w \\in (0, \\infty)"} />:
        </p>
        <MathBlock
          math={"f_T(t) = \\int_0^\\infty f_{T,W}(t,w)\\,dw = \\frac{\\Gamma\\!\\left(\\frac{\\nu+1}{2}\\right)}{\\Gamma\\!\\left(\\frac{\\nu}{2}\\right)\\sqrt{\\pi\\nu}} \\left(1 + \\frac{t^2}{\\nu}\\right)^{-\\frac{\\nu+1}{2}}"}
          display
        />
        <p>
          which is exactly the <MathBlock math={"t(\\nu)"} /> pdf from Definition 6.1.
        </p>
      </Proof>

      <Note>
        The recipe is: take a standard normal, divide by the square root of an
        independent chi-squared divided by its degrees of freedom. In practice, the{' '}
        <MathBlock math={"Z"} /> comes from standardising{' '}
        <MathBlock math={"\\bar{X}"} /> (which requires knowing{' '}
        <MathBlock math={"\\sigma"} />), and the{' '}
        <MathBlock math={"U"} /> comes from the sample variance (which estimates{' '}
        <MathBlock math={"\\sigma^2"} />).
      </Note>

      <Theorem id="thm-t-moments" title="Theorem 6.5 — Mean and Variance of t-Distribution">
        <p>
          If <MathBlock math={"T \\sim t(\\nu)"} />, then:
        </p>
        <MathBlock
          math={"E[T] = 0 \\quad (\\text{for } \\nu > 1), \\qquad \\text{Var}(T) = \\frac{\\nu}{\\nu - 2} \\quad (\\text{for } \\nu > 2)"}
          display
        />
      </Theorem>

      <Proof title="Proof of Theorem 6.5">
        <p>
          Using Theorem 6.4: <MathBlock math={"T = Z / \\sqrt{U/\\nu}"} /> with{' '}
          <MathBlock math={"Z, U"} /> independent.
        </p>
        <p><strong>Mean:</strong> By the independence factorisation (Theorem 5.11a):</p>
        <MathBlock
          math={"E[T] = E\\!\\left[\\frac{Z}{\\sqrt{U/\\nu}}\\right] = \\sqrt{\\nu} \\cdot E[Z] \\cdot E\\!\\left[\\frac{1}{\\sqrt{U}}\\right] = \\sqrt{\\nu} \\cdot 0 \\cdot E\\!\\left[\\frac{1}{\\sqrt{U}}\\right] = 0"}
          display
        />
        <p><strong>Variance:</strong> Since <MathBlock math={"E[T] = 0"} />:</p>
        <MathBlock
          math={"\\text{Var}(T) = E[T^2] = E\\!\\left[\\frac{Z^2}{U/\\nu}\\right] = \\nu \\cdot E[Z^2] \\cdot E\\!\\left[\\frac{1}{U}\\right]"}
          display
        />
        <p>
          Now <MathBlock math={"E[Z^2] = \\text{Var}(Z) + (E[Z])^2 = 1"} />. For{' '}
          <MathBlock math={"U \\sim \\chi^2(\\nu)"} />, it can be shown that{' '}
          <MathBlock math={"E[1/U] = 1/(\\nu - 2)"} /> when{' '}
          <MathBlock math={"\\nu > 2"} />. Therefore:
        </p>
        <MathBlock
          math={"\\text{Var}(T) = \\nu \\cdot 1 \\cdot \\frac{1}{\\nu - 2} = \\frac{\\nu}{\\nu - 2}"}
          display
        />
      </Proof>

      <Note>
        The variance <MathBlock math={"\\nu/(\\nu-2)"} /> is always greater than 1 (the
        variance of <MathBlock math={"N(0,1)"} />), confirming heavier tails. As{' '}
        <MathBlock math={"\\nu \\to \\infty"} />, the variance approaches 1. For{' '}
        <MathBlock math={"\\nu \\leq 2"} /> the variance is infinite, and for{' '}
        <MathBlock math={"\\nu = 1"} /> (Cauchy) even the mean doesn&rsquo;t exist.
      </Note>

      <h4>t-Distribution Critical Values</h4>

      <p>
        We write <MathBlock math={"t_{\\alpha;\\nu}"} /> or{' '}
        <MathBlock math={"t_{\\alpha}(\\nu)"} /> for the value such that:
      </p>
      <MathBlock
        math={"P(T > t_{\\alpha;\\nu}) = \\alpha \\quad \\text{where } T \\sim t(\\nu)"}
        display
      />
      <p>
        By symmetry of the t-distribution around 0:
      </p>
      <MathBlock
        math={"t_{1-\\alpha;\\nu} = -t_{\\alpha;\\nu}"}
        display
      />
      <p>
        Common columns in a t-table are <MathBlock math={"\\alpha = 0.10, 0.05, 0.025, 0.01, 0.005"} />.
        For example, <MathBlock math={"t_{0.025;3} = 3.182"} /> means{' '}
        <MathBlock math={"P(T > 3.182) = 0.025"} /> when <MathBlock math={"T \\sim t(3)"} />.
        The row <MathBlock math={"\\nu = \\infty"} /> recovers the standard normal:{' '}
        <MathBlock math={"t_{\\alpha}(\\infty) = z_{\\alpha}"} />.
      </p>

      {/* ════════════════════════════════════════════
          §6.3 — F-DISTRIBUTION
          ════════════════════════════════════════════ */}
      <h3>The F-Distribution (§6.3)</h3>

      <p>
        The F-distribution is used when comparing <em>two variances</em> — for instance
        testing whether two populations have the same spread. It arises as the ratio of
        two independent chi-squared random variables, each divided by its degrees of
        freedom.
      </p>

      <Definition id="def-f-dist" title="Definition 6.2 — F-Distribution">
        <p>
          A continuous random variable <MathBlock math={"F"} /> has an{' '}
          <strong>F-distribution</strong> with parameters{' '}
          <MathBlock math={"\\nu_1"} /> (numerator df) and{' '}
          <MathBlock math={"\\nu_2"} /> (denominator df), written{' '}
          <MathBlock math={"F \\sim F(\\nu_1, \\nu_2)"} />, when its pdf is:
        </p>
        <MathBlock
          math={"f(x) = \\frac{\\Gamma\\!\\left(\\frac{\\nu_1+\\nu_2}{2}\\right)}{\\Gamma\\!\\left(\\frac{\\nu_1}{2}\\right)\\Gamma\\!\\left(\\frac{\\nu_2}{2}\\right)} \\sqrt{\\frac{\\nu_1^{\\nu_1}\\nu_2^{\\nu_2}\\,x^{\\nu_1 - 2}}{(\\nu_2 + \\nu_1 x)^{\\nu_1 + \\nu_2}}}, \\quad x > 0"}
          display
        />
        <p>
          where <MathBlock math={"\\nu_1, \\nu_2 = 1, 2, 3, \\ldots"} />
        </p>
      </Definition>

      <p><strong>Key properties:</strong></p>
      <ul>
        <li>
          Defined only for <MathBlock math={"x > 0"} /> (a ratio of positive quantities).
        </li>
        <li>
          Right-skewed. The shape depends on both{' '}
          <MathBlock math={"\\nu_1"} /> and <MathBlock math={"\\nu_2"} />.
        </li>
        <li>
          <strong>Order matters:</strong> <MathBlock math={"F(\\nu_1, \\nu_2)"} /> is
          not the same as <MathBlock math={"F(\\nu_2, \\nu_1)"} />.
        </li>
      </ul>

      <Theorem id="thm-f-construction" title="Theorem 6.6 — Constructing an F Random Variable">
        <p>
          If <MathBlock math={"U_1 \\sim \\chi^2(\\nu_1)"} /> and{' '}
          <MathBlock math={"U_2 \\sim \\chi^2(\\nu_2)"} /> are independent, then:
        </p>
        <MathBlock
          math={"F = \\frac{U_1/\\nu_1}{U_2/\\nu_2} \\sim F(\\nu_1, \\nu_2)"}
          display
        />
      </Theorem>

      <Note>
        Think of it as: each chi-squared is divided by its own degrees of freedom
        (giving an &ldquo;average chi-squared per degree of freedom&rdquo;), then you
        take their ratio. If both chi-squareds are &ldquo;behaving normally&rdquo;,
        each ratio is about 1, so the F-ratio is about 1. Extreme values of F
        suggest the two underlying variances differ.
      </Note>

      <Theorem id="thm-f-moments" title="Theorem 6.7 — Mean and Variance of F-Distribution">
        <p>
          If <MathBlock math={"F \\sim F(\\nu_1, \\nu_2)"} />, then:
        </p>
        <MathBlock
          math={"E[F] = \\frac{\\nu_2}{\\nu_2 - 2} \\quad (\\text{for } \\nu_2 > 2)"}
          display
        />
        <MathBlock
          math={"\\text{Var}(F) = \\frac{2\\nu_2^2(\\nu_1 + \\nu_2 - 2)}{\\nu_1(\\nu_2 - 2)^2(\\nu_2 - 4)} \\quad (\\text{for } \\nu_2 > 4)"}
          display
        />
      </Theorem>

      <Note>
        The mean <MathBlock math={"\\nu_2/(\\nu_2-2)"} /> only depends on the
        denominator degrees of freedom <MathBlock math={"\\nu_2"} />, and is always
        slightly above 1 (approaching 1 as{' '}
        <MathBlock math={"\\nu_2 \\to \\infty"} />). This makes sense: an F-ratio near 1
        means the two chi-squareds are comparable.
      </Note>

      <h4>F-Distribution Critical Values and the Reciprocal Property</h4>

      <p>
        We write <MathBlock math={"F_{\\nu_1, \\nu_2; \\alpha}"} /> for the value such
        that:
      </p>
      <MathBlock
        math={"P(F > F_{\\nu_1,\\nu_2;\\alpha}) = \\alpha \\quad \\text{where } F \\sim F(\\nu_1, \\nu_2)"}
        display
      />
      <p>
        The F-table typically gives critical values for{' '}
        <MathBlock math={"\\alpha = 0.05"} />. But what if you need the <em>lower</em>{' '}
        critical value (for <MathBlock math={"1-\\alpha"} />)? You don&rsquo;t need a
        separate table — there is an elegant reciprocal identity:
      </p>

      <Theorem id="thm-f-reciprocal" title="Reciprocal Property of F Critical Values">
        <MathBlock
          math={"F_{\\nu_1, \\nu_2;\\, 1-\\alpha} = \\frac{1}{F_{\\nu_2, \\nu_1;\\, \\alpha}}"}
          display
        />
        <p>
          In words: the lower <MathBlock math={"(1-\\alpha)"} /> critical value of{' '}
          <MathBlock math={"F(\\nu_1, \\nu_2)"} /> is the reciprocal of the upper{' '}
          <MathBlock math={"\\alpha"} /> critical value of{' '}
          <MathBlock math={"F(\\nu_2, \\nu_1)"} /> (with swapped degrees of freedom).
        </p>
      </Theorem>

      <Example title="Example — Reading the F-Table">
        <p>
          Suppose <MathBlock math={"F \\sim F(3, 7)"} />. From the{' '}
          <MathBlock math={"\\alpha = 0.05"} /> table:{' '}
          <MathBlock math={"F_{3,7;\\,0.05} = 4.35"} />.
        </p>
        <p>To find the lower 5% critical value <MathBlock math={"F_{3,7;\\,0.95}"} />:</p>
        <MathBlock
          math={"F_{3,7;\\,0.95} = \\frac{1}{F_{7,3;\\,0.05}}"}
          display
        />
        <p>
          Look up <MathBlock math={"F_{7,3;\\,0.05}"} /> in the table (numerator df = 7,
          denominator df = 3) and take its reciprocal.
        </p>
      </Example>

      <Example title="Exercise 6.32 — Probability with an F-Ratio">
        <p>
          Let <MathBlock math={"X \\sim N(0,1)"} /> and{' '}
          <MathBlock math={"Y \\sim \\chi^2(6)"} /> be independent. Find{' '}
          <MathBlock math={"P(X < \\sqrt{Y})"} />.
        </p>
        <p><strong>Solution:</strong> Rewrite the event:</p>
        <MathBlock
          math={"P(X < \\sqrt{Y}) = P\\!\\left(\\frac{X}{\\sqrt{Y}} < 1\\right) = P\\!\\left(\\frac{X}{\\sqrt{Y/6}} < \\sqrt{6}\\right)"}
          display
        />
        <p>
          Now <MathBlock math={"X \\sim N(0,1)"} /> and <MathBlock math={"Y \\sim \\chi^2(6)"} /> are independent, so
          by Theorem 6.4:
        </p>
        <MathBlock
          math={"T = \\frac{X}{\\sqrt{Y/6}} \\sim t(6)"}
          display
        />
        <p>
          Therefore <MathBlock math={"P(T < \\sqrt{6}) = P(T < 2.449)"} />. From the
          t-table, <MathBlock math={"t_{0.025;6} = 2.447"} />, so this probability lies
          between 0.975 and 0.99 (very close to 0.975).
        </p>
      </Example>

      <Example title="Exercise 6.33 — F-Distribution Probability">
        <p>
          Let <MathBlock math={"X \\sim \\chi^2(15)"} /> and{' '}
          <MathBlock math={"Y \\sim \\chi^2(30)"} /> be independent. Find{' '}
          <MathBlock math={"P(X < Y)"} />.
        </p>
        <p><strong>Solution:</strong> We want <MathBlock math={"P(X/Y < 1)"} />. Rewrite using Theorem 6.6:</p>
        <MathBlock
          math={"\\frac{X/15}{Y/30} = \\frac{30X}{15Y} = \\frac{2X}{Y} \\sim F(15, 30)"}
          display
        />
        <p>So:</p>
        <MathBlock
          math={"P(X < Y) = P\\!\\left(\\frac{X}{Y} < 1\\right) = P\\!\\left(\\frac{X/15}{Y/30} < 2\\right) = P\\big(F(15,30) < 2\\big)"}
          display
        />
        <p>
          From the F-table at <MathBlock math={"\\alpha = 0.05"} />:{' '}
          <MathBlock math={"F_{15,30;\\,0.05} = 2.01"} />. So the probability is
          slightly less than 0.95.
        </p>
      </Example>

      {/* ════════════════════════════════════════════
          §6.4 — SAMPLES FROM NORMAL DISTRIBUTIONS
          ════════════════════════════════════════════ */}
      <h3>Samples from Normal Distributions (§6.4)</h3>

      <p>
        Now we connect these distributions to real data. The key idea of statistics is:
        we observe a <em>sample</em> and want to learn about the <em>population</em> it
        came from. Let us formalise this.
      </p>

      <Definition id="def-sample" title="Definition 6.3 — Sample from a Distribution">
        <p>
          The random variables <MathBlock math={"X_1, X_2, \\ldots, X_n"} /> form a{' '}
          <strong>sample from a distribution</strong> with sample size{' '}
          <MathBlock math={"n"} /> if their joint pdf can be written as:
        </p>
        <MathBlock
          math={"f_{X_1,\\ldots,X_n}(x_1, \\ldots, x_n) = f(x_1) \\cdot f(x_2) \\cdots f(x_n) = \\prod_{i=1}^n f(x_i)"}
          display
        />
        <p>
          where <MathBlock math={"f(x)"} /> is the pdf of the{' '}
          <strong>population distribution</strong>.
        </p>
      </Definition>

      <p>
        In other words, a sample means{' '}
        <MathBlock math={"X_1, \\ldots, X_n"} /> are <strong>i.i.d.</strong>{' '}
        (independent and identically distributed). This is the mathematical model for
        &ldquo;drawing <MathBlock math={"n"} /> observations at random from a
        population&rdquo;.
      </p>

      <h4>The Five Steps of Statistical Inference</h4>
      <ol>
        <li>
          <strong>Population:</strong> The entire group of interest (e.g. all people in
          the Netherlands).
        </li>
        <li>
          <strong>Population parameters:</strong> Fixed but often unknown values
          describing the population distribution (e.g.{' '}
          <MathBlock math={"\\mu, \\sigma^2"} />).
        </li>
        <li>
          <strong>Random sample:</strong> Draw{' '}
          <MathBlock math={"X_1, \\ldots, X_n \\stackrel{\\text{iid}}{\\sim} f(x)"} />.
        </li>
        <li>
          <strong>Sample statistics:</strong> Compute quantities like{' '}
          <MathBlock math={"\\bar{X}"} /> and{' '}
          <MathBlock math={"S^2"} /> from the sample.
        </li>
        <li>
          <strong>Inference:</strong> Use the sampling distribution of the statistic to
          draw conclusions about the population parameter.
        </li>
      </ol>

      <p>
        The sample mean and sample variance are the two most important statistics:
      </p>
      <MathBlock
        math={"\\bar{X} = \\frac{1}{n}\\sum_{i=1}^n X_i, \\qquad S^2 = \\frac{1}{n-1}\\sum_{i=1}^n (X_i - \\bar{X})^2"}
        display
      />

      <Note>
        We always have <MathBlock math={"E[\\bar{X}] = \\mu"} /> and{' '}
        <MathBlock math={"\\text{Var}(\\bar{X}) = \\sigma^2/n"} /> regardless of the
        population distribution. But to find the <em>exact distribution</em> of{' '}
        <MathBlock math={"\\bar{X}"} />, we typically need the population to be normal.
      </Note>

      <Theorem id="thm-xbar-normal" title="Theorem 6.12 — Distribution of the Sample Mean">
        <p>
          Let <MathBlock math={"X_1, \\ldots, X_n"} /> be a sample from{' '}
          <MathBlock math={"N(\\mu, \\sigma^2)"} />. Then:
        </p>
        <MathBlock
          math={"\\bar{X} \\sim N\\!\\left(\\mu,\\, \\frac{\\sigma^2}{n}\\right) \\qquad \\text{or equivalently} \\qquad \\frac{\\bar{X} - \\mu}{\\sigma/\\sqrt{n}} \\sim N(0,1)"}
          display
        />
      </Theorem>

      <Proof title="Proof of Theorem 6.12 (via MGF)">
        <p>
          The MGF of <MathBlock math={"\\bar{X}"} /> is:
        </p>
        <MathBlock
          math={"M_{\\bar{X}}(t) = E\\!\\left[e^{t\\bar{X}}\\right] = E\\!\\left[e^{\\frac{t}{n}(X_1 + \\cdots + X_n)}\\right] \\stackrel{\\text{iid}}{=} \\left(M_X\\!\\left(\\frac{t}{n}\\right)\\right)^n"}
          display
        />
        <p>
          Since <MathBlock math={"X_i \\sim N(\\mu, \\sigma^2)"} />, we have{' '}
          <MathBlock math={"M_X(t) = \\exp\\{\\mu t + \\tfrac{1}{2}\\sigma^2 t^2\\}"} />.
          Substituting <MathBlock math={"t/n"} />:
        </p>
        <MathBlock
          math={"M_{\\bar{X}}(t) = \\left(\\exp\\!\\left\\{\\mu\\frac{t}{n} + \\frac{1}{2}\\sigma^2\\frac{t^2}{n^2}\\right\\}\\right)^{\\!n} = \\exp\\!\\left\\{\\mu t + \\frac{1}{2}\\frac{\\sigma^2}{n}t^2\\right\\}"}
          display
        />
        <p>
          This is the MGF of <MathBlock math={"N(\\mu, \\sigma^2/n)"} />, so by the
          uniqueness theorem, <MathBlock math={"\\bar{X} \\sim N(\\mu, \\sigma^2/n)"} />.
        </p>
      </Proof>

      <h4>Central Limit Theorem (CLT)</h4>

      <p>
        If the population is <em>not</em> normal, Theorem 6.12 does not hold exactly.
        However, the CLT (from PTS1) tells us that for large <MathBlock math={"n"} />{' '}
        (rule of thumb: <MathBlock math={"n \\geq 30"} />):
      </p>
      <MathBlock
        math={"\\bar{X} \\approx N\\!\\left(\\mu,\\, \\frac{\\sigma^2}{n}\\right) \\qquad \\text{(approximately, for any population with finite variance)}"}
        display
      />
      <p>
        When the population <em>is</em> normal, Theorem 6.12 is <strong>exact</strong>{' '}
        for <em>any</em> sample size <MathBlock math={"n"} />, no approximation needed.
      </p>

      <h4>Prediction/Probability Interval for <MathBlock math={"\\bar{X}"} /></h4>

      <p>
        Since <MathBlock math={"\\bar{X} \\sim N(\\mu, \\sigma^2/n)"} />, we can
        standardise and use the standard normal:
      </p>
      <MathBlock
        math={"P\\!\\left(-z_{\\alpha/2} < \\frac{\\bar{X} - \\mu}{\\sigma/\\sqrt{n}} < z_{\\alpha/2}\\right) = 1 - \\alpha"}
        display
      />
      <p>Rearranging gives the <MathBlock math={"100(1-\\alpha)\\%"} /> prediction interval for <MathBlock math={"\\bar{X}"} />:</p>
      <MathBlock
        math={"\\left(\\mu - z_{\\alpha/2}\\frac{\\sigma}{\\sqrt{n}},\\;\\; \\mu + z_{\\alpha/2}\\frac{\\sigma}{\\sqrt{n}}\\right)"}
        display
      />

      <Theorem id="thm-sum-chisq" title="Theorem 6.13 — Sum of Squared Standardised Normals">
        <p>
          Let <MathBlock math={"X_1, \\ldots, X_n"} /> be a sample from{' '}
          <MathBlock math={"N(\\mu, \\sigma^2)"} />. Then:
        </p>
        <MathBlock
          math={"\\sum_{i=1}^n \\frac{(X_i - \\mu)^2}{\\sigma^2} \\sim \\chi^2(n) \\qquad \\text{and} \\qquad n\\left(\\frac{\\bar{X} - \\mu}{\\sigma}\\right)^{\\!2} \\sim \\chi^2(1)"}
          display
        />
      </Theorem>

      <Proof title="Proof of Theorem 6.13">
        <p>
          Each <MathBlock math={"X_i \\sim N(\\mu, \\sigma^2)"} />, so{' '}
          <MathBlock math={"Z_i = (X_i - \\mu)/\\sigma \\sim N(0,1)"} />. Then{' '}
          <MathBlock math={"Z_i^2 = (X_i - \\mu)^2/\\sigma^2 \\sim \\chi^2(1)"} />.
          Since the <MathBlock math={"X_i"} /> are i.i.d., the{' '}
          <MathBlock math={"Z_i^2"} /> are i.i.d., so by the additivity of chi-squared:
        </p>
        <MathBlock
          math={"\\sum_{i=1}^n Z_i^2 = \\sum_{i=1}^n \\frac{(X_i - \\mu)^2}{\\sigma^2} \\sim \\chi^2(n)"}
          display
        />
        <p>
          For the second result: <MathBlock math={"\\bar{X} \\sim N(\\mu, \\sigma^2/n)"} />,
          so <MathBlock math={"(\\bar{X} - \\mu)/(\\sigma/\\sqrt{n}) \\sim N(0,1)"} />.
          Squaring gives a <MathBlock math={"\\chi^2(1)"} />, and{' '}
          <MathBlock math={"\\left(\\frac{\\bar{X}-\\mu}{\\sigma/\\sqrt{n}}\\right)^{\\!2} = n\\left(\\frac{\\bar{X}-\\mu}{\\sigma}\\right)^{\\!2}"} />.
        </p>
      </Proof>

      <Theorem id="thm-xbar-s2" title="Theorem 6.14 — Independence of Sample Mean and Variance">
        <p>
          Let <MathBlock math={"X_1, \\ldots, X_n"} /> be a sample from{' '}
          <MathBlock math={"N(\\mu, \\sigma^2)"} />. Then:
        </p>
        <ol>
          <li>
            <MathBlock math={"\\bar{X}"} /> and <MathBlock math={"S^2"} /> are{' '}
            <strong>independent</strong>.
          </li>
          <li>
            <MathBlock
              math={"\\frac{(n-1)S^2}{\\sigma^2} \\sim \\chi^2(n-1)"}
            />
          </li>
        </ol>
      </Theorem>

      <Note>
        This result is remarkable and specific to the normal distribution. The sample
        mean <MathBlock math={"\\bar{X}"} /> and the sample variance{' '}
        <MathBlock math={"S^2"} /> are <em>independent</em> — knowing one tells you
        nothing about the other. This independence is what makes the t-statistic work:
        it is a ratio of two independent quantities.
      </Note>

      <Note>
        Part (2) tells us that <MathBlock math={"(n-1)S^2/\\sigma^2"} /> is{' '}
        <MathBlock math={"\\chi^2"} /> with <MathBlock math={"n-1"} /> (not{' '}
        <MathBlock math={"n"} />) degrees of freedom. One degree of freedom is
        &ldquo;lost&rdquo; because <MathBlock math={"S^2"} /> uses{' '}
        <MathBlock math={"\\bar{X}"} /> instead of <MathBlock math={"\\mu"} /> — the
        deviations <MathBlock math={"(X_i - \\bar{X})"} /> satisfy the constraint{' '}
        <MathBlock math={"\\sum(X_i - \\bar{X}) = 0"} />, so only{' '}
        <MathBlock math={"n-1"} /> of them are free.
      </Note>

      <h4>Prediction/Probability Interval for <MathBlock math={"S^2"} /></h4>

      <p>
        Since <MathBlock math={"(n-1)S^2/\\sigma^2 \\sim \\chi^2(n-1)"} />, we can
        use the chi-squared critical values. The <MathBlock math={"100(1-\\alpha)\\%"} />{' '}
        prediction interval for <MathBlock math={"S^2"} /> is:
      </p>
      <MathBlock
        math={"\\left(\\frac{\\sigma^2}{n-1}\\chi^2_{n-1;\\,1-\\alpha/2},\\;\\; \\frac{\\sigma^2}{n-1}\\chi^2_{n-1;\\,\\alpha/2}\\right)"}
        display
      />

      <Note>
        Unlike the normal-based interval for <MathBlock math={"\\bar{X}"} /> which is
        symmetric, the chi-squared distribution is right-skewed, so this interval for{' '}
        <MathBlock math={"S^2"} /> is <em>not symmetric</em> around{' '}
        <MathBlock math={"\\sigma^2"} />.
      </Note>

      <Example title="Exercise 6.41 — Prediction Intervals for Normal Samples">
        <p>
          Let <MathBlock math={"X_1, \\ldots, X_8 \\stackrel{\\text{iid}}{\\sim} N(500, 4^2)"} />.
          So <MathBlock math={"n = 8"} />, <MathBlock math={"\\mu = 500"} />,{' '}
          <MathBlock math={"\\sigma = 4"} />.
        </p>

        <p><strong>(a) 95% prediction interval for a single observation <MathBlock math={"X"} />:</strong></p>
        <MathBlock
          math={"X \\sim N(500, 16) \\implies (\\mu \\pm z_{0.025}\\sigma) = (500 \\pm 1.96 \\times 4) = (492.16,\\, 507.84)"}
          display
        />

        <p><strong>(b) 95% prediction interval for <MathBlock math={"\\bar{X}"} />:</strong></p>
        <MathBlock
          math={"\\bar{X} \\sim N(500, 16/7) \\implies \\left(500 \\pm 1.96 \\times \\frac{4}{\\sqrt{7}}\\right) \\approx (497.04,\\, 502.96)"}
          display
        />

        <p><strong>(c) 95% prediction interval for <MathBlock math={"S^2"} />:</strong></p>
        <p>
          We have <MathBlock math={"(n-1)S^2/\\sigma^2 = 7S^2/16 \\sim \\chi^2(7)"} />.
          From the chi-squared table:{' '}
          <MathBlock math={"\\chi^2_{7;\\,0.975} = 1.690"} /> and{' '}
          <MathBlock math={"\\chi^2_{7;\\,0.025} = 16.013"} />.
        </p>
        <MathBlock
          math={"P(1.690 < 7S^2/16 < 16.013) = 0.95"}
          display
        />
        <MathBlock
          math={"\\implies P\\!\\left(\\frac{16 \\times 1.690}{7} < S^2 < \\frac{16 \\times 16.013}{7}\\right) = 0.95 \\implies (3.86,\\, 36.60)"}
          display
        />

        <p><strong>(d) 95% prediction interval for <MathBlock math={"\\sum(X_i - \\bar{X})^2"} />:</strong></p>
        <p>
          Since <MathBlock math={"\\sum(X_i - \\bar{X})^2 = (n-1)S^2"} />, multiply
          the bounds from (c) by 7:
        </p>
        <MathBlock
          math={"(7 \\times 3.86,\\; 7 \\times 36.60) = (27.04,\\, 256.18)"}
          display
        />

        <p><strong>(e) 95% prediction interval for <MathBlock math={"\\sum(X_i - \\mu)^2"} />:</strong></p>
        <p>
          Note the key difference: here we subtract the <em>population</em> mean{' '}
          <MathBlock math={"\\mu"} />, not <MathBlock math={"\\bar{X}"} />. By
          Theorem 6.13, <MathBlock math={"\\sum(X_i - \\mu)^2/\\sigma^2 \\sim \\chi^2(n)"} /> with <MathBlock math={"n = 8"} /> (not <MathBlock math={"n-1"} />!).
        </p>
        <MathBlock
          math={"P(\\chi^2_{8;\\,0.975} < \\tfrac{\\sum(X_i-\\mu)^2}{16} < \\chi^2_{8;\\,0.025}) = 0.95"}
          display
        />
        <MathBlock
          math={"P(2.180 < \\tfrac{\\sum(X_i-\\mu)^2}{16} < 17.535) = 0.95 \\implies (34.88,\\, 280.56)"}
          display
        />
      </Example>

      {/* ════════════════════════════════════════════
          §6.5 — ORDER STATISTICS
          ════════════════════════════════════════════ */}
      <h3>Order Statistics (§6.5)</h3>

      <p>
        Given a sample <MathBlock math={"X_1, \\ldots, X_n"} />, the{' '}
        <strong>order statistics</strong> are the sample values sorted from smallest to
        largest. They are fundamental to many statistical procedures: the median, the
        range, quantiles, and rank-based tests all depend on order statistics.
      </p>

      <Definition id="def-order-stats" title="Order Statistics — Notation">
        <p>
          Let <MathBlock math={"X_1, \\ldots, X_n"} /> be a sample. The{' '}
          <strong>order statistics</strong> are denoted:
        </p>
        <MathBlock
          math={"X_{1:n} \\leq X_{2:n} \\leq \\cdots \\leq X_{n:n}"}
          display
        />
        <p>where:</p>
        <ul>
          <li>
            <MathBlock math={"X_{1:n} = \\min(X_1, \\ldots, X_n)"} /> is the{' '}
            <strong>first</strong> (smallest) order statistic.
          </li>
          <li>
            <MathBlock math={"X_{n:n} = \\max(X_1, \\ldots, X_n)"} /> is the{' '}
            <strong>last</strong> (largest) order statistic.
          </li>
          <li>
            <MathBlock math={"X_{k:n}"} /> is the <MathBlock math={"k"} />-th smallest
            value.
          </li>
        </ul>
        <p>
          We also define <MathBlock math={"Y_k := X_{k:n}"} /> as a shorthand. In
          particular: <MathBlock math={"V := X_{1:n} = \\min"} /> and{' '}
          <MathBlock math={"W := X_{n:n} = \\max"} />.
        </p>
      </Definition>

      <h4>First and Last Order Statistics</h4>

      <p>
        Finding the distribution of the min and max is a CDF argument. The key insights
        are:
      </p>
      <ul>
        <li>
          <strong>Max:</strong> <MathBlock math={"\\max \\leq w"} /> iff{' '}
          <em>all</em> <MathBlock math={"X_i \\leq w"} />.
        </li>
        <li>
          <strong>Min:</strong> <MathBlock math={"\\min \\leq v"} /> iff{' '}
          <em>at least one</em> <MathBlock math={"X_i \\leq v"} />, which is easier via
          the complement: <MathBlock math={"\\min > v"} /> iff{' '}
          <em>all</em> <MathBlock math={"X_i > v"} />.
        </li>
      </ul>

      <Theorem id="thm-first-last-order" title="Theorem 6.15 — CDF and PDF of First and Last Order Statistics">
        <p>
          Let <MathBlock math={"X_1, \\ldots, X_n"} /> be a sample from a distribution
          with pdf <MathBlock math={"f(x)"} /> and CDF <MathBlock math={"F(x)"} />.
          Define <MathBlock math={"V = X_{1:n}"} /> (min) and{' '}
          <MathBlock math={"W = X_{n:n}"} /> (max). Then:
        </p>
        <p><strong>Last order statistic (max):</strong></p>
        <MathBlock
          math={"F_W(w) = [F(w)]^n, \\qquad f_W(w) = n\\,[F(w)]^{n-1}\\,f(w)"}
          display
        />
        <p><strong>First order statistic (min):</strong></p>
        <MathBlock
          math={"F_V(v) = 1 - [1 - F(v)]^n, \\qquad f_V(v) = n\\,[1 - F(v)]^{n-1}\\,f(v)"}
          display
        />
      </Theorem>

      <Proof title="Proof of Theorem 6.15">
        <p><strong>For the max:</strong></p>
        <MathBlock
          math={"F_W(w) = P(W \\leq w) = P(\\max(X_1,\\ldots,X_n) \\leq w) = P(X_1 \\leq w \\text{ and } \\cdots \\text{ and } X_n \\leq w)"}
          display
        />
        <p>
          By independence: <MathBlock math={"= P(X_1 \\leq w) \\cdots P(X_n \\leq w) = [F(w)]^n"} />.
          Differentiating by the chain rule:{' '}
          <MathBlock math={"f_W(w) = n[F(w)]^{n-1} f(w)"} />.
        </p>
        <p><strong>For the min:</strong></p>
        <MathBlock
          math={"F_V(v) = P(V \\leq v) = 1 - P(V > v) = 1 - P(\\min(X_1,\\ldots,X_n) > v)"}
          display
        />
        <MathBlock
          math={"= 1 - P(X_1 > v \\text{ and } \\cdots \\text{ and } X_n > v) \\stackrel{\\text{ind}}{=} 1 - [1 - F(v)]^n"}
          display
        />
        <p>
          Differentiating: <MathBlock math={"f_V(v) = n[1-F(v)]^{n-1}f(v)"} />.
        </p>
      </Proof>

      <Example title="Example 6.19 — Max of Two Exponentials">
        <p>
          Let <MathBlock math={"X_1 \\sim \\text{Exp}(1)"} /> and{' '}
          <MathBlock math={"X_2 \\sim \\text{Exp}(2)"} />, independent. Find the pdf
          of <MathBlock math={"W = \\max(X_1, X_2)"} />.
        </p>
        <p>
          <strong>CDF approach:</strong> For <MathBlock math={"w > 0"} />:
        </p>
        <MathBlock
          math={"F_W(w) = P(\\max(X_1,X_2) \\leq w) = P(X_1 \\leq w)P(X_2 \\leq w) = (1-e^{-w})(1-e^{-2w})"}
          display
        />
        <p>Differentiating:</p>
        <MathBlock
          math={"f_W(w) = e^{-w}(1-e^{-2w}) + (1-e^{-w}) \\cdot 2e^{-2w} = e^{-w} + 2e^{-2w} - 3e^{-3w}, \\quad w > 0"}
          display
        />
        <Note>
          Since <MathBlock math={"X_1"} /> and <MathBlock math={"X_2"} /> have different
          rate parameters, we cannot directly apply Theorem 6.15 (which requires i.i.d.).
          Instead we use the CDF approach from first principles.
        </Note>
      </Example>

      <Example title="Example 6.20 — Min of Two Exponentials">
        <p>
          Same setup: <MathBlock math={"X_1 \\sim \\text{Exp}(1)"} />,{' '}
          <MathBlock math={"X_2 \\sim \\text{Exp}(2)"} />, independent. Find the pdf of{' '}
          <MathBlock math={"V = \\min(X_1, X_2)"} />.
        </p>
        <p><strong>Complement trick:</strong> For <MathBlock math={"v > 0"} />:</p>
        <MathBlock
          math={"F_V(v) = 1 - P(V > v) = 1 - P(X_1 > v)P(X_2 > v) = 1 - e^{-v} \\cdot e^{-2v} = 1 - e^{-3v}"}
          display
        />
        <p>Differentiating:</p>
        <MathBlock
          math={"f_V(v) = 3e^{-3v}, \\quad v > 0"}
          display
        />
        <p>
          This is <MathBlock math={"\\text{Exp}(3)"} />! So{' '}
          <MathBlock math={"E[V] = 1/3"} />.
        </p>
      </Example>

      <Note>
        This is a general result: the minimum of independent exponentials is
        exponential with rate equal to the <em>sum</em> of the individual rates. If{' '}
        <MathBlock math={"X_i \\sim \\text{Exp}(\\lambda_i)"} /> independently, then{' '}
        <MathBlock math={"\\min(X_1,\\ldots,X_n) \\sim \\text{Exp}(\\lambda_1 + \\cdots + \\lambda_n)"} />.
      </Note>

      <Example title="Example 6.22 — Lightbulb Lifetimes">
        <p>
          Three lightbulbs have lifespans{' '}
          <MathBlock math={"X_i \\sim \\text{Exp}(1/m)"} /> (i.i.d.), where{' '}
          <MathBlock math={"m"} /> is the mean life in months (<MathBlock math={"E[X_i] = m"} />).
          What is the distribution of the time until the <em>first</em> bulb fails?
        </p>
        <p>
          The first failure is <MathBlock math={"X_{1:3} = \\min(X_1, X_2, X_3)"} />.
          Using Theorem 6.15 with <MathBlock math={"F(v) = 1 - e^{-v/m}"} />:
        </p>
        <MathBlock
          math={"f_{X_{1:3}}(v) = 3(1 - F(v))^2 f(v) = 3(e^{-v/m})^2 \\cdot \\frac{1}{m}e^{-v/m} = \\frac{3}{m}e^{-3v/m}, \\quad v > 0"}
          display
        />
        <p>
          So <MathBlock math={"X_{1:3} \\sim \\text{Exp}(3/m)"} /> and{' '}
          <MathBlock math={"E[X_{1:3}] = m/3"} />. The first bulb fails, on average,
          after one-third of the individual mean lifetime.
        </p>
      </Example>

      <h4>All Order Statistics — Joint PDF</h4>

      <p>
        Beyond just the min and max, we can find the joint distribution of all order
        statistics simultaneously.
      </p>

      <Theorem id="thm-all-order-stats" title="Theorem 6.16 — Joint PDF of All Order Statistics">
        <p>
          Let <MathBlock math={"X_1, \\ldots, X_n"} /> be a sample from pdf{' '}
          <MathBlock math={"f(x)"} />. Define{' '}
          <MathBlock math={"Y_k = X_{k:n}"} /> for <MathBlock math={"k = 1,\\ldots,n"} />.
          Then the joint pdf of <MathBlock math={"(Y_1, \\ldots, Y_n)"} /> is:
        </p>
        <MathBlock
          math={"f_{\\vec{Y}}(y_1, \\ldots, y_n) = n! \\prod_{i=1}^n f(y_i), \\qquad y_1 < y_2 < \\cdots < y_n"}
          display
        />
        <p>and 0 otherwise.</p>
      </Theorem>

      <p>
        <strong>Why <MathBlock math={"n!"} />?</strong> The factor{' '}
        <MathBlock math={"n!"} /> counts the number of ways to assign the original{' '}
        <MathBlock math={"n"} /> observations <MathBlock math={"X_1,\\ldots,X_n"} /> to
        the ordered positions <MathBlock math={"Y_1 < \\cdots < Y_n"} />. Each
        permutation of the <MathBlock math={"X_i"} /> values produces the same
        sorted output, so we multiply the original joint density{' '}
        <MathBlock math={"\\prod f(y_i)"} /> by <MathBlock math={"n!"} />.
      </p>

      <Note>
        To find the marginal pdf of a <em>single</em> order statistic{' '}
        <MathBlock math={"Y_k = X_{k:n}"} />, integrate out all the other variables from
        the joint pdf. This can also be obtained from a general formula:
        <MathBlock
          math={"f_{Y_k}(y) = \\frac{n!}{(k-1)!(n-k)!}[F(y)]^{k-1}[1-F(y)]^{n-k}f(y)"}
          display
        />
        The three factors are: probability that <MathBlock math={"k-1"} /> observations
        fall below <MathBlock math={"y"} />, probability that{' '}
        <MathBlock math={"n-k"} /> fall above, and density at{' '}
        <MathBlock math={"y"} /> itself — times a multinomial coefficient.
      </Note>

      <Example title="Example 6.24 — Median of a Sample of Size 3">
        <p>
          Let <MathBlock math={"X_1, X_2, X_3"} /> be a sample from{' '}
          <MathBlock math={"f(x) = 2x"} /> for <MathBlock math={"0 < x < 1"} />.
          Find the pdf of the median <MathBlock math={"Y_2 = X_{2:3}"} />.
        </p>
        <p><strong>Method 1 — Via the joint pdf:</strong></p>
        <p>
          By Theorem 6.16, the joint pdf of <MathBlock math={"(Y_1, Y_2, Y_3)"} /> is:
        </p>
        <MathBlock
          math={"f_{\\vec{Y}}(y_1,y_2,y_3) = 3! \\cdot 2y_1 \\cdot 2y_2 \\cdot 2y_3 = 48\\, y_1 y_2 y_3, \\quad 0 < y_1 < y_2 < y_3 < 1"}
          display
        />
        <p>
          Marginalise by integrating out <MathBlock math={"y_1 \\in (0, y_2)"} /> and{' '}
          <MathBlock math={"y_3 \\in (y_2, 1)"} />:
        </p>
        <MathBlock
          math={"f_{Y_2}(y_2) = \\int_0^{y_2}\\!\\int_{y_2}^{1} 48\\,y_1 y_2 y_3\\, dy_3\\, dy_1 = 48 y_2 \\cdot \\frac{y_2^2}{2} \\cdot \\frac{1-y_2^2}{2} = 12(y_2^3 - y_2^5)"}
          display
        />
        <p>for <MathBlock math={"0 < y_2 < 1"} />.</p>

        <p><strong>Method 2 — Via the general marginal formula:</strong></p>
        <p>
          With <MathBlock math={"n=3, k=2"} />, <MathBlock math={"F(y) = y^2"} />,{' '}
          <MathBlock math={"f(y) = 2y"} />:
        </p>
        <MathBlock
          math={"f_{Y_2}(y) = \\frac{3!}{1!\\cdot 1!}[y^2]^1[1-y^2]^1 \\cdot 2y = 6 \\cdot y^2(1-y^2) \\cdot 2y = 12(y^3 - y^5)"}
          display
        />
        <p>Same result.</p>
      </Example>

      <h4>Range and Median</h4>

      <p>
        Two important functions of order statistics:
      </p>
      <ul>
        <li>
          <strong>Range:</strong>{' '}
          <MathBlock math={"R = X_{n:n} - X_{1:n} = W - V"} />. Measures the spread
          of the sample.
        </li>
        <li>
          <strong>Sample median:</strong> If <MathBlock math={"n"} /> is odd,{' '}
          <MathBlock math={"\\tilde{X} = X_{(n+1)/2:n}"} />. If{' '}
          <MathBlock math={"n"} /> is even,{' '}
          <MathBlock math={"\\tilde{X} = \\tfrac{1}{2}(X_{n/2:n} + X_{n/2+1:n})"} />.
        </li>
      </ul>

      {/* ════════════════════════════════════════════
          SUMMARY TABLE
          ════════════════════════════════════════════ */}
      <h3>Summary: Key Sampling Distributions</h3>

      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>Statistic</th>
              <th>Distribution</th>
              <th>Conditions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><MathBlock math={"\\frac{\\bar{X} - \\mu}{\\sigma/\\sqrt{n}}"} /></td>
              <td><MathBlock math={"N(0,1)"} /></td>
              <td>Sample from <MathBlock math={"N(\\mu,\\sigma^2)"} />, <MathBlock math={"\\sigma"} /> known</td>
            </tr>
            <tr>
              <td><MathBlock math={"\\sum \\frac{(X_i - \\mu)^2}{\\sigma^2}"} /></td>
              <td><MathBlock math={"\\chi^2(n)"} /></td>
              <td>Sample from <MathBlock math={"N(\\mu,\\sigma^2)"} />, <MathBlock math={"\\mu"} /> known</td>
            </tr>
            <tr>
              <td><MathBlock math={"\\frac{(n-1)S^2}{\\sigma^2}"} /></td>
              <td><MathBlock math={"\\chi^2(n-1)"} /></td>
              <td>Sample from <MathBlock math={"N(\\mu,\\sigma^2)"} /></td>
            </tr>
            <tr>
              <td><MathBlock math={"\\frac{\\bar{X} - \\mu}{S/\\sqrt{n}}"} /></td>
              <td><MathBlock math={"t(n-1)"} /></td>
              <td>Sample from <MathBlock math={"N(\\mu,\\sigma^2)"} />, <MathBlock math={"\\sigma"} /> unknown</td>
            </tr>
            <tr>
              <td><MathBlock math={"\\frac{S_1^2/\\sigma_1^2}{S_2^2/\\sigma_2^2}"} /></td>
              <td><MathBlock math={"F(n_1-1,\\, n_2-1)"} /></td>
              <td>Two independent normal samples</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Note>
        The fourth row — replacing <MathBlock math={"\\sigma"} /> by{' '}
        <MathBlock math={"S"} /> — is the crucial bridge to practice. The result holds
        because <MathBlock math={"\\bar{X}"} /> and <MathBlock math={"S^2"} /> are
        independent (Theorem 6.14), and the ratio of the resulting normal by the
        chi-squared gives a t-distribution (Theorem 6.4).
      </Note>

      {/* ════════════════════════════════════════════
          WORKED QUESTIONS
          ════════════════════════════════════════════ */}
      <h3>Worked Questions</h3>

      <WorkedQuestion
        source="Exercise 6.38"
        difficulty="medium"
        solution={
          <>
            <p><strong>(a)</strong> <MathBlock math={"\\bar{Z} \\sim N(0, 1/16)"} />, so:</p>
            <MathBlock
              math={"P(\\bar{Z} < 0.5) = P\\!\\left(\\frac{\\bar{Z}}{1/4} < 2\\right) = P(Z < 2) = 0.9772"}
              display
            />

            <p><strong>(b)</strong> <MathBlock math={"Z_1 - Z_2 \\sim N(0, 2)"} />, so:</p>
            <MathBlock
              math={"P(Z_1 - Z_2 < 2) = P\\!\\left(\\frac{Z_1-Z_2}{\\sqrt{2}} < \\frac{2}{\\sqrt{2}}\\right) = P(Z < \\sqrt{2}) \\approx 0.921"}
              display
            />

            <p><strong>(c)</strong> <MathBlock math={"Z_1 + Z_2 \\sim N(0, 2)"} />, so:</p>
            <MathBlock
              math={"P(Z_1 + Z_2 < 2) = P(Z < \\sqrt{2}) \\approx 0.921"}
              display
            />

            <p><strong>(d)</strong> Since <MathBlock math={"Z_i^2 \\sim \\chi^2(1)"} />, by additivity:</p>
            <MathBlock
              math={"\\sum_{i=1}^{16} Z_i^2 \\sim \\chi^2(16) \\implies P\\!\\left[\\sum Z_i^2 < 32\\right] = P[\\chi^2(16) < 32] \\approx 0.99"}
              display
            />

            <p><strong>(e)</strong> By Theorem 6.14: <MathBlock math={"\\sum_{i=1}^{16}(Z_i - \\bar{Z})^2 \\sim \\chi^2(15)"} /> (note: <MathBlock math={"n-1 = 15"} />, not 16!). So:</p>
            <MathBlock
              math={"P\\!\\left[\\sum(Z_i - \\bar{Z})^2 < 25\\right] = P[\\chi^2(15) < 25] \\approx 0.95"}
              display
            />
          </>
        }
      >
        <p>
          Let <MathBlock math={"Z_1, \\ldots, Z_{16} \\stackrel{\\text{iid}}{\\sim} N(0,1)"} />.
          Determine:
        </p>
        <p>(a) <MathBlock math={"P(\\bar{Z} < 0.5)"} /></p>
        <p>(b) <MathBlock math={"P(Z_1 - Z_2 < 2)"} /></p>
        <p>(c) <MathBlock math={"P(Z_1 + Z_2 < 2)"} /></p>
        <p>(d) <MathBlock math={"P\\!\\left(\\sum_{i=1}^{16} Z_i^2 < 32\\right)"} /></p>
        <p>(e) <MathBlock math={"P\\!\\left(\\sum_{i=1}^{16} (Z_i - \\bar{Z})^2 < 25\\right)"} /></p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Exercise 6.44"
        difficulty="medium"
        solution={
          <>
            <p><strong>(a)</strong> With <MathBlock math={"Y \\sim \\chi^2(15)"} />:</p>
            <MathBlock
              math={"P(7.26 < Y < 22.31) = P(Y < 22.31) - P(Y < 7.26) = 0.90 - 0.05 = 0.85"}
              display
            />

            <p><strong>(b)</strong> <MathBlock math={"P(\\chi^2(23) < 27.14) = 0.75"} /> (from the chi-squared table).</p>

            <p><strong>(c)</strong> Let <MathBlock math={"Y \\sim F(11, 16)"} />. We want <MathBlock math={"P(Y/(1+Y) > 11/16)"} />. Rearranging:</p>
            <MathBlock
              math={"\\frac{Y}{1+Y} > \\frac{11}{16} \\iff 16Y > 11 + 11Y \\iff Y > \\frac{11}{5} = 2.2"}
              display
            />
            <MathBlock
              math={"P(Y > 2.2) = 0.09 \\quad \\text{(from the F-table)}"}
              display
            />

            <p><strong>(d)</strong> <MathBlock math={"T \\sim t(13)"} />:</p>
            <MathBlock
              math={"P(0.87 < T < 2.65) = P(T < 2.65) - P(T < 0.87)"}
              display
            />
            <p>
              From the t-table: <MathBlock math={"P(T > 2.65) \\approx 0.01"} /> and{' '}
              <MathBlock math={"P(T > 0.87) \\approx 0.20"} />. So:
            </p>
            <MathBlock
              math={"P(0.87 < T < 2.65) = (1 - 0.01) - (1 - 0.20) = 0.99 - 0.80 = 0.19"}
              display
            />

            <p><strong>(e)</strong> <MathBlock math={"T \\sim t(13)"} />. Since the t-distribution is symmetric about 0:</p>
            <MathBlock
              math={"P(T < 0.256) \\approx 0.6 \\quad \\text{(from the t-table)}"}
              display
            />

            <p><strong>(f)</strong> For <MathBlock math={"T \\sim t(23)"} />:</p>
            <MathBlock
              math={"P(|T| \\geq c) = 2P(T \\geq c) = 0.01 \\implies P(T \\geq c) = 0.005"}
              display
            />
            <MathBlock
              math={"\\implies c = t_{0.005;23} = 2.807 \\implies P(t_{23} \\geq 2.5) \\approx 0.01"}
              display
            />

            <p><strong>(g)</strong> <MathBlock math={"X \\sim F(7, 12)"} />:</p>
            <MathBlock
              math={"P(2.9 < X < 5.52) = P(X < 5.52) - P(X < 2.9) = 0.995 - 0.95 = 0.045"}
              display
            />

            <p><strong>(h)</strong> <MathBlock math={"X \\sim F(7, 12)"} />:</p>
            <MathBlock
              math={"P(X^{-1} > 0.25) = P(X < 4) = 0.975"}
              display
            />
          </>
        }
      >
        <p>Determine the following probabilities:</p>
        <p>(a) <MathBlock math={"P(7.26 < \\chi^2(15) < 22.31)"} /></p>
        <p>(b) <MathBlock math={"P(\\chi^2(23) < 27.14)"} /></p>
        <p>(c) <MathBlock math={"P\\!\\left(\\frac{Y}{1+Y} > \\frac{11}{16}\\right)"} /> where <MathBlock math={"Y \\sim F(11,16)"} /></p>
        <p>(d) <MathBlock math={"P(0.87 < t_{13} < 2.65)"} /></p>
        <p>(e) <MathBlock math={"P(t_{13} < 0.256)"} /></p>
        <p>(f) <MathBlock math={"P(|t_{23}| \\geq c) = 0.01"} />, find <MathBlock math={"c"} /> and <MathBlock math={"P(t_{23} \\geq 2.5)"} /></p>
        <p>(g) <MathBlock math={"P(2.9 < F(7,12) < 5.52)"} /></p>
        <p>(h) <MathBlock math={"P(F(7,12)^{-1} > 0.25)"} /></p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Exercise 6.46"
        difficulty="hard"
        solution={
          <>
            <p><strong>(a) PDF of <MathBlock math={"Y_1 = X_{1:2}"} /> (minimum):</strong></p>
            <p>
              The population has <MathBlock math={"f(x) = 2x"} /> and{' '}
              <MathBlock math={"F(x) = x^2"} /> on <MathBlock math={"(0,1)"} />. By
              Theorem 6.15 with <MathBlock math={"n = 2"} />:
            </p>
            <MathBlock
              math={"f_{Y_1}(y) = 2[1 - F(y)]^1 f(y) = 2(1-y^2) \\cdot 2y = 4y(1-y^2), \\quad 0 < y < 1"}
              display
            />

            <p><strong>PDF of <MathBlock math={"Y_2 = X_{2:2}"} /> (maximum):</strong></p>
            <MathBlock
              math={"f_{Y_2}(y) = 2[F(y)]^1 f(y) = 2 \\cdot y^2 \\cdot 2y = 4y^3, \\quad 0 < y < 1"}
              display
            />

            <p><strong>(b) Joint pdf:</strong> By Theorem 6.16 with <MathBlock math={"n = 2"} />:</p>
            <MathBlock
              math={"f_{Y_1,Y_2}(y_1,y_2) = 2! \\cdot f(y_1) \\cdot f(y_2) = 2 \\cdot 2y_1 \\cdot 2y_2 = 8y_1 y_2, \\quad 0 < y_1 < y_2 < 1"}
              display
            />

            <p><strong>(c) PDF of the range <MathBlock math={"R = Y_2 - Y_1"} />:</strong></p>
            <p>
              Use the transformation <MathBlock math={"R = Y_2 - Y_1"} />,{' '}
              <MathBlock math={"V = Y_1"} />. Then{' '}
              <MathBlock math={"Y_1 = V"} />, <MathBlock math={"Y_2 = R + V"} />.
              The Jacobian is 1. The support becomes{' '}
              <MathBlock math={"0 < v < r+v < 1"} />, i.e.{' '}
              <MathBlock math={"0 < v < 1-r"} /> and{' '}
              <MathBlock math={"0 < r < 1"} />.
            </p>
            <MathBlock
              math={"f_{R,V}(r,v) = 8v(r+v), \\quad 0 < v < 1-r,\\; 0 < r < 1"}
              display
            />
            <p>Integrate out <MathBlock math={"v"} />:</p>
            <MathBlock
              math={"f_R(r) = \\int_0^{1-r} 8v(r+v)\\,dv = 8\\int_0^{1-r}(rv + v^2)\\,dv"}
              display
            />
            <MathBlock
              math={"= 8\\left[\\frac{r(1-r)^2}{2} + \\frac{(1-r)^3}{3}\\right] = 4r(1-r)^2 + \\frac{8}{3}(1-r)^3, \\quad 0 < r < 1"}
              display
            />
          </>
        }
      >
        <p>
          Let <MathBlock math={"X_1, X_2"} /> be a sample from{' '}
          <MathBlock math={"f(x) = 2x"} /> for <MathBlock math={"0 < x < 1"} />.
        </p>
        <p>(a) Find the pdf of <MathBlock math={"Y_1 = X_{1:2}"} /> and <MathBlock math={"Y_2 = X_{2:2}"} />.</p>
        <p>(b) Find the joint pdf of <MathBlock math={"(Y_1, Y_2)"} />.</p>
        <p>(c) Find the pdf of the range <MathBlock math={"R = Y_2 - Y_1"} />.</p>
      </WorkedQuestion>

      <WorkedQuestion
        source="Exercise 6.45"
        difficulty="hard"
        solution={
          <>
            <p>
              Note that <MathBlock math={"X_i \\sim \\text{Exp}(\\lambda)"} /> means{' '}
              <MathBlock math={"X_i \\sim \\text{Gamma}(1, 1/\\lambda)"} />. Equivalently,{' '}
              <MathBlock math={"2\\lambda X_i \\sim \\chi^2(2)"} />.
            </p>
            <p>So: <MathBlock math={"2\\lambda(X_1 + X_2 + X_3) \\sim \\chi^2(6)"} /> and{' '}
              <MathBlock math={"2\\lambda(X_4 + \\cdots + X_9) \\sim \\chi^2(12)"} />.
            </p>
            <p>Rewrite the event:</p>
            <MathBlock
              math={"\\frac{X_1+X_2+X_3}{X_1+\\cdots+X_9} < \\frac{1}{2}"}
              display
            />
            <MathBlock
              math={"\\iff \\frac{X_1+X_2+X_3}{X_4+\\cdots+X_9} < 1 \\iff \\frac{(X_1+X_2+X_3)/3}{(X_4+\\cdots+X_9)/6} < 2"}
              display
            />
            <p>
              Since the numerator involves an independent <MathBlock math={"\\chi^2(6)/6"} />{' '}
              (after scaling) and denominator <MathBlock math={"\\chi^2(12)/12"} />, this
              ratio has an <MathBlock math={"F(6,12)"} /> distribution:
            </p>
            <MathBlock
              math={"\\frac{2\\lambda(X_1+X_2+X_3)/6}{2\\lambda(X_4+\\cdots+X_9)/12} = \\frac{(X_1+X_2+X_3)/3}{(X_4+\\cdots+X_9)/6} \\sim F(6,12)"}
              display
            />
            <MathBlock
              math={"P\\!\\left[F(6,12) < 2\\right] \\approx 0.85 \\quad \\text{(from the F-table, since } F_{6,12;0.10} \\approx 2.33\\text{)}"}
              display
            />
          </>
        }
      >
        <p>
          Let <MathBlock math={"X_1, \\ldots, X_9 \\stackrel{\\text{iid}}{\\sim} \\text{Exp}(\\lambda)"} />.
          Find:
        </p>
        <MathBlock
          math={"P\\!\\left(\\frac{X_1 + X_2 + X_3}{X_1 + X_2 + \\cdots + X_9} < \\frac{1}{2}\\right)"}
          display
        />
      </WorkedQuestion>
    </>
  )
}
