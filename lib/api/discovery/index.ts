import { authMiddleware } from "@/lib/api/auth";
import createClient from "openapi-fetch";
import { paths } from "./discovery.d";

export * from "./discovery.d";

const client = createClient<paths>({
  baseUrl: process.env.CONFIRMATE_REST_API ?? "http://localhost:8080",
});
client.use(authMiddleware);

export default client;
