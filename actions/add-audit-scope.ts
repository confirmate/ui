"use server";

import evaluationClient from "@/lib/api/evaluation";
import client from "@/lib/api/orchestrator";
import { revalidatePath } from "next/cache";

export async function createAuditScope(certificationTargetId: string, catalogId: string, assuranceLevel: string | undefined) {
  // Create the audit scope
  const { data: scope } = await client.POST("/v1/orchestrator/audit_scopes",
    {
      body: {
        certificationTargetId,
        catalogId: catalogId,
        assuranceLevel: assuranceLevel
      }
    }
  )

  if (scope === undefined) {
    return;
  }

  // Start evaluation of scope right away
  const { data } = await evaluationClient.POST("/v1/evaluation/evaluate/{certificationTargetId}/{catalogId}/start",
    {
      params: {
        path: {
          ...scope
        }
      }
    })

  if (data === undefined) {
    return;
  }

  revalidatePath(`/certification-targets/${certificationTargetId}/compliance`);
}
