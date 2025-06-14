
export function toLaTeX(factors: number[], steps: string[]): { result: string; steps: string[] } {
  let result = "";
  if (!factors.length) {
    result = '1';
  } else {
    result = factors.join(" \\times ");
  }
  const stepLatex = steps.map(s =>
    s
      .replace(/is divisible by/g, '\\text{is divisible by}')
      .replace(/added as a factor\./g, '\\text{added as a factor.}')
      .replace(/(\d+) \/ (\d+)/g, '$1\\div$2')
      .replace(/Start with (\d+)/, '\\text{Start with } $1')
      .replace(/has no prime factors/, '\\text{has no prime factors.}')
  );
  return { result, steps: stepLatex };
}
