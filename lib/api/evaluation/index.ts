import createClient from "openapi-fetch";
import { authMiddleware } from "@/lib/api/auth";
import { paths } from "./evaluation.d";

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