import createClient from "openapi-fetch";
import { authMiddleware } from "@/lib/api/auth";
import { paths, SchemaEvaluationResult } from "./evaluation.d";

export * from "./evaluation.d"

export type ComplianceStatus =
    "EVALUATION_STATUS_UNSPECIFIED" |
    "EVALUATION_STATUS_COMPLIANT" |
    "EVALUATION_STATUS_COMPLIANT_MANUALLY" |
    "EVALUATION_STATUS_NOT_COMPLIANT" |
    "EVALUATION_STATUS_NOT_COMPLIANT_MANUALLY" |
    "EVALUATION_STATUS_PENDING"

const client = createClient<paths>({ baseUrl: process.env.CONFIRMATE_REST_API ?? "http://localhost:8080" });
client.use(authMiddleware);

export default client;

async function listTopLevelControlResults(certificationTargetId: string) {
    const { results: topControlResults } = await client.GET("/v1/evaluation/results",
        {
            params: {
                query: {
                    "filter.certificationTargetId": certificationTargetId,
                    "filter.parentsOnly": true,
                    "latestByControlId": true,
                },
            }
        }
    ).then((res) => { return { results: res.data?.results ?? [] } });

    return topControlResults
}

/**
 * This function returns a map with the following properties:
 * - The key is a catalog ID
 * - The value is a map of each control inside the catalog and its compliance status.
 * 
 * TODO: This should be done in the backend
 * 
 * @param certificationTargetId 
 * @returns 
 */
export async function buildCompliance(
    certificationTargetId: string
): Promise<Map<string, Map<string, ComplianceStatus>>> {
    const results = await listTopLevelControlResults(certificationTargetId);

    let all = new Map();
    let compliance: Map<string, ComplianceStatus>;
    for (let result of results) {
        compliance = all.get(result.controlCatalogId);
        if (compliance === undefined) {
            compliance = new Map();
            all.set(result.controlCatalogId, compliance);
        }

        // TODO(oxisto): these should be required in openapi
        compliance.set(result.controlId!!, result.status!!);
    }

    return all;
}
