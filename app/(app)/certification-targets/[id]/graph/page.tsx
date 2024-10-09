import Button from "@/components/button";
import DiscoveryGraph from "@/components/discovery-graph";
import discoveryClient from "@/lib/api/discovery";
import orchestratorClient from "@/lib/api/orchestrator";
import { ViewfinderCircleIcon } from "@heroicons/react/24/outline";
import { EdgeDefinition, NodeDefinition } from "cytoscape";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
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

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <div className="flex items-center justify-between gap-x-4 border-b border-gray-900/5 bg-gray-50 p-4">
          <div className="text-sm text-gray-500">
            This graph provides an overview over all discovered resources of the
            Cloud service, infrastructure as well as application source-code.
          </div>
          <div className="flex gap-x-1.5">
            <Button>
              <ViewfinderCircleIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <DiscoveryGraph edges={edges} nodes={nodes} />
      </div>

      <div className="absolute right-8 top-64 z-20 max-w-md">TODO</div>
    </>
  );
}
