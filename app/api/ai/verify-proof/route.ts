import { NextResponse } from "next/server";
import { openRouterJson } from "@/lib/openrouter";
import { verifyProofLocally } from "@/lib/proof";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { proof = "", mission = "" } = (await request.json().catch(() => ({}))) as {
    proof?: string;
    mission?: string;
  };

  const fallback = verifyProofLocally(proof);
  const result = await openRouterJson({
    fallback,
    messages: [
      {
        role: "system",
        content:
          "You verify Cortex OS productivity proof. Return JSON: verdict accepted|weak proof|unclear|rejected|needs more detail, score 0-1, feedback, missingEvidence array, memoryUpdate. Require concrete artifact, timestamp/count/link/file/image description, and mission relevance. Be strict. Proof beats intention."
      },
      { role: "user", content: JSON.stringify({ mission, proof }) }
    ]
  });

  return NextResponse.json(result);
}
