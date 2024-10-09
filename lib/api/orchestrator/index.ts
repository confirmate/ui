import { authMiddleware } from "@/lib/api/auth";
import createClient from "openapi-fetch";
import { paths } from "./orchestrator.d";

export * from "./orchestrator.d";

const client = createClient<paths>({ baseUrl: "http://localhost:8080" });
client.use(authMiddleware);

export default client;
