"use server";

import client, {SchemaAuditScope} from "@/lib/api/orchestrator";
import evaluationClient from "@/lib/api/evaluation";
import {revalidatePath} from "next/cache";

export async function removeAuditScope(scope: SchemaAuditScope) {
    await evaluationClient.POST("/v1/evaluation/evaluate/{certificationTargetId}/{catalogId}/stop", {
        params: {
            path: {
                ...scope
            }
        }
    })

    await client.DELETE("/v1/orchestrator/certification_targets/{certificationTargetId}/audit_scopes/{catalogId}", {
        params: {
            path: {
                ...scope
            }
        }
    })

    revalidatePath(`/certification-targets/${scope.certificationTargetId}/compliance`);
}