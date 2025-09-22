"use server";

import client, {
  ComplianceStatus,
  SchemaEvaluationResult,
  SchemaGoogleProtobufAny,
} from "@/lib/api/evaluation";
import { SchemaAuditScope, SchemaControl } from "@/lib/api/orchestrator";
import { addDays } from "date-fns";
import { revalidatePath } from "next/cache";

export async function addEvaluationResult(
  data: FormData,
  control: SchemaControl,
  scope: SchemaAuditScope,
): Promise<
  | SchemaEvaluationResult
  | {
      code?: number;
      message?: string;
      details?: SchemaGoogleProtobufAny[];
    }
> {
  const result: SchemaEvaluationResult = {
    id: "", // will be filled by server,
    status: data.get("status") as ComplianceStatus,
    assessmentResultIds: [],
    targetOfEvaluationId: scope.targetOfEvaluationId,
    controlId: control.id,
    controlCatalogId: control.categoryCatalogId,
    controlCategoryName: control.categoryName,
    comment: data.get("comment")?.toString(),
    timestamp: new Date().toISOString(),
    validUntil: addDays(new Date(), 30).toISOString(),
  };

  const res = await client.POST("/v1/evaluation/results", {
    body: result,
  });

  if (res.data) {
    revalidatePath(
      `/targets-of-evaluation/${scope.targetOfEvaluationId}/compliance/${scope.catalogId}`,
    );
    return res.data;
  } else {
    return res.error;
  }
}
