import { authMiddleware } from "@/lib/api/auth";
import createClient from "openapi-fetch";
import { paths, SchemaMetric } from "./orchestrator.d";

export * from "./orchestrator.d";

const client = createClient<paths>({ baseUrl: process.env.CONFIRMATE_REST_API ?? "http://localhost:8080" });
client.use(authMiddleware);

export async function listMetrics(): Promise<SchemaMetric[]> {
  let res = await client.GET("/v1/orchestrator/metrics", {
    params: {
      query: {
        pageSize: 1500,
      },
    },
  });

  if (res.data && res.data.nextPageToken) {
    const metrics = [...(res.data.metrics || [])];

    while (res.data.nextPageToken) {
      const nextRes = await client.GET("/v1/orchestrator/metrics", {
        params: {
          query: {
            pageSize: 1500,
            pageToken: res.data.nextPageToken,
          },
        },
      });

      if (nextRes.data && nextRes.data.nextPageToken) {
        metrics.push(...(nextRes.data.metrics || []));
      } else {
        break;
      }
    }

    return metrics;
  } else if (res.data) {
    return res.data.metrics as SchemaMetric[];
  } else {
    throw new Error("No data found in response");
  }
}

export default client;
