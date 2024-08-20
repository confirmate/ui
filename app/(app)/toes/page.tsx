import client from "@/lib/api";

export default async function Page() {
    const toes = await client.GET("/v1/orchestrator/cloud_services");
  return <></>;
}
