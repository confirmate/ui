"use server";

import { GenerationRequest } from "@/lib/api/csaf-generator";
import client, { SchemaAssessmentResult } from "@/lib/api/orchestrator";
import { redirect } from "next/navigation";

export async function createSecurityAdvisory(result: SchemaAssessmentResult) {
    const { data: target } = await client.GET("/v1/orchestrator/certification_targets/{certificationTargetId}",
        {
            params: {
                path: {
                    certificationTargetId: result.certificationTargetId!!
                }
            }
        })

    const request: GenerationRequest = {
        metricId: result.metricId!!,
        assessmentId: result.id!!,
        compliant: result.compliant!!,
        // TODO: generalize
        /*functionality: {
            cryptographicHash: {
                algorithm: "MD5",
                "withSalt": false
            }
        },*/
        complianceComment: result.complianceComment,
        complianceDetails: result.complianceDetails,
        productId: target?.name!!,
        productName: target?.name!!,
        productVersion: "1.0.0"
    }

    const ignore = fetch(`${process.env.PLUGIN_CSAF_API_BASE}/v1/csaf-generator/requests`, {
        method: "POST",
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify(request)
    })

    redirect(`/certification-targets/${result.certificationTargetId!!}/advisories`)
}