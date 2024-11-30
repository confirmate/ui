import { authMiddleware } from "@/lib/api/auth";
import createClient from "openapi-fetch";
import { staticDataCache } from "..";
import { paths, SchemaMetric } from "./orchestrator";

export * from "./orchestrator";

const client = createClient<paths>({
  baseUrl: process.env.CONFIRMATE_REST_API ?? "http://localhost:8080",
});
client.use(authMiddleware);

export async function listMetrics(): Promise<SchemaMetric[]> {
  const metrics: SchemaMetric[] = [];
  let nextPageToken: string | null = null;

  do {
    const paginationInit = {
      params: {
        query: {
          pageSize: 1500,
          ...(nextPageToken && { pageToken: nextPageToken }),
        },
      },
    };

    const res: any = await client.GET("/v1/orchestrator/metrics", {
      ...staticDataCache,
      ...paginationInit,
    });

    if (!res.data) {
      throw new Error("No data found in response");
    }

    metrics.push(...(res.data.metrics || []));
    nextPageToken = res.data.nextPageToken || null;
  } while (nextPageToken);

  return metrics;
}

export default client;
