"use server";

import { GenerationRequest } from "@/lib/api/csaf-generator";
import client, { SchemaAssessmentResult } from "@/lib/api/orchestrator";
import { redirect } from "next/navigation";

export async function createSecurityAdvisory(result: SchemaAssessmentResult) {
  const { data: target } = await client.GET(
    "/v1/orchestrator/targets_of_evaluation/{targetOfEvaluationId}",
    {
      params: {
        path: {
          targetOfEvaluationId: result.targetOfEvaluationId!!,
        },
      },
    },
  );

  const request: GenerationRequest = {
    metricId: result.metricId,
    assessmentId: result.id,
    compliant: result.compliant ?? false,
    targetOfEvaluationId: result.targetOfEvaluationId,
    complianceComment: result.complianceComment,
    complianceDetails: result.complianceDetails,
    productId: target?.name!!,
    productName: target?.name!!,
    productVersion: "1.0.0",
  };

  const ignore = fetch(
    `${process.env.PLUGIN_CSAF_API_BASE}/v1/csaf-generator/requests`,
    {
      method: "POST",
      headers: [["Content-Type", "application/json"]],
      body: JSON.stringify(request),
    },
  );

  redirect(`/targets-of-evaluation/${result.targetOfEvaluationId}/advisories`);
}
