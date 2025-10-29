"use server";

import evaluationClient from "@/lib/api/evaluation";
import client, { SchemaAuditScope } from "@/lib/api/orchestrator";
import { revalidatePath } from "next/cache";

export async function removeAuditScope(scope: SchemaAuditScope) {
  await evaluationClient.POST(
    "/v1/evaluation/evaluate/{id}/stop",
    {
      params: {
        path: {
          ...scope,
        },
      },
    },
  );

  await client.DELETE(
    "/v1/orchestrator/audit_scopes/{id}",
    {
      params: {
        path: {
          ...scope,
        },
        query: {
          removeEvaluationResults: true,
        },
      },
    },
  );

  revalidatePath(
    `/targets-of-evaluation/${scope.targetOfEvaluationId}/compliance`,
  );
}
