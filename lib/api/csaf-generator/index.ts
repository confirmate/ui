import { SchemaComparisonResult } from "../orchestrator";

export interface GenerationRequest {
  metricId: string;
  assessmentId: string;
  targetOfEvaluationId: string;
  compliant: boolean;
  productId: string;
  productName: string;
  productVersion: string;
  /*functionality: {
        cryptographicHash: {
            algorithm: string
            withSalt: false
        }
    }*/
  complianceComment?: string;
  complianceDetails?: SchemaComparisonResult[];
}

export interface GenerationRequestResponse {
  id: string;
  metricId: string;
  assessmentId: string;
  targetOfEvaluationId: string;
  status: "pending" | "done" | "error";
  /**
   * Contains the title. This might be set to 'Pending' or an error, if the status is error or pending.
   */
  title: string;
  createdAt?: string;
  csaf?: any;
}

export function listAdvisoryRequests() {
  return fetch(
    `${process.env.PLUGIN_CSAF_API_BASE}/v1/csaf-generator/requests`,
  ).then((res) => res.json() as Promise<GenerationRequestResponse[]>);
}

export function getAdvisoryRequest(requestId: string) {
  return fetch(
    `${process.env.PLUGIN_CSAF_API_BASE}/v1/csaf-generator/requests/${requestId}`,
  ).then((res) => res.json() as Promise<GenerationRequestResponse>);
}
