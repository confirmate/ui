import DiscoveryGraph from "@/components/discovery-graph";
import discoveryClient from "@/lib/api/discovery";
import orchestratorClient, {
  listMetrics,
  SchemaMetric,
} from "@/lib/api/orchestrator";
import { EdgeDefinition, NodeDefinition } from "cytoscape";

interface PageProps {
  params: Promise<{
    id: string;
    resourceId?: string[];
  }>;
}

export default async function Page({ params }: PageProps) {
  const p = await params;
  // We need to retrieve the assessment results...
  const resResults = await orchestratorClient.GET(
    "/v1/orchestrator/assessment_results",
    {
      params: {
        query: {
          pageSize: 1500,
          latestByResourceId: true,
          orderBy: "timestamp",
          asc: false,
        },
      },
    },
  );

  const assessmentResults = resResults.data?.results ?? [];

  // ...and the graph edges
  const resEdges = await discoveryClient.GET(
    "/v1experimental/discovery/graph/edges",
    {
      params: {
        query: {
          pageSize: 1500,
        },
      },
    },
  );

  const edges: EdgeDefinition[] =
    resEdges.data?.edges?.map((e) => {
      return {
        data: e,
      } satisfies EdgeDefinition;
    }) ?? [];

  const resResources = await discoveryClient.GET("/v1/discovery/resources", {
    params: {
      query: {
        pageSize: 1500,
        orderBy: "resource_type",
        asc: true,
      },
    },
  });

  const resources = resResources.data?.results ?? [];

  const allMetrics = await listMetrics();
  const metrics = new Map<string, SchemaMetric>();
  allMetrics?.forEach((m) => {
    metrics.set(m.id ?? "", m);
  });

  enum Status {
    WAITING,
    GOOD,
    BAD,
  }

  const nodes = resources.map((n) => {
    let status = Status.WAITING;

    // fetch assessment results
    let results = assessmentResults.filter((r) => {
      return r.resourceId == n.id;
    });

    if (results.length >= 1) {
      if (results.filter((r) => r.compliant == false).length > 0) {
        status = Status.BAD;
      } else {
        status = Status.GOOD;
      }
    }

    return {
      data: {
        id: n.id,
        status: status,
        label: n.properties.name,
        type: n.resourceType
          .split(",")
          .reduce((a, v) => ({ ...a, [v]: true }), {}),
      },
    } satisfies NodeDefinition;
  });

  // Put together the ID for an initial selection, if specified
  const id =
    p?.resourceId !== undefined
      ? p?.resourceId.length > 0
        ? p?.resourceId.join("/")
        : undefined
      : undefined;
  const initialSelect = resources.find((r) => r.id === id);
  return (
    <>
      <DiscoveryGraph
        edges={edges}
        nodes={nodes}
        resources={resources}
        results={assessmentResults}
        metrics={metrics}
        initialSelect={initialSelect}
      />
    </>
  );
}
