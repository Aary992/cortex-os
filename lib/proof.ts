export type ProofVerdict = "accepted" | "weak proof" | "unclear" | "rejected" | "needs more detail";

export function verifyProofLocally(proof: string): { verdict: ProofVerdict; score: number; feedback: string } {
  const trimmed = proof.trim();
  const hasSpecifics = /\d|http|sent|published|completed|screenshot|attached|commit|recorded/i.test(trimmed);
  const isLongEnough = trimmed.length > 80;

  if (!trimmed) {
    return { verdict: "rejected", score: 0, feedback: "No proof submitted. Intention is not evidence." };
  }

  if (hasSpecifics && isLongEnough) {
    return { verdict: "accepted", score: 0.88, feedback: "Accepted. This has enough concrete evidence to update the behavioral memory." };
  }

  if (hasSpecifics) {
    return { verdict: "needs more detail", score: 0.58, feedback: "Directionally useful, but Cortex needs clearer proof quality before awarding full execution credit." };
  }

  return { verdict: "weak proof", score: 0.34, feedback: "Weak proof. Add a link, screenshot description, count, timestamp, or artifact detail." };
}
