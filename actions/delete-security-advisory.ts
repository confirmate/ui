"use server";

import { GenerationRequestResponse } from "@/lib/api/csaf-generator";
import { revalidatePath } from "next/cache";

export async function deleteSecurityAdvisory(
  response: GenerationRequestResponse,
) {
  const ignore = await fetch(
    `${process.env.PLUGIN_CSAF_API_BASE}/v1/csaf-generator/requests/${response.id}`,
    {
      method: "DELETE",
    },
  );

  revalidatePath(
    `/targets-of-evaluation/${response.targetOfEvaluationId}/advisories`,
  );
}
