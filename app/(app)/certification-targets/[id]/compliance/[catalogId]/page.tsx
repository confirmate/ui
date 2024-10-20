import { Card } from "@/components/card";
import {
  ControlComplianceItems,
  TreeItemData,
} from "@/components/compliance/control-compliance-item";
import { staticDataCache } from "@/lib/api";
import evaluationClient, { SchemaEvaluationResult } from "@/lib/api/evaluation";
import client from "@/lib/api/orchestrator";
import { toArray } from "@/lib/util";

interface PageProps {
  params: {
    id: string;
    catalogId: string;
  };
  searchParams: {
    "filter.status"?: string | string[];
  };
}

/**
 * This function builds a tree-like structure out of the evaluation results,
 * with the first level comprising of the top level controls. The second level
 * consists of their sub controls.
 *
 * @param results
 */
function buildTree(
  results: SchemaEvaluationResult[],
  status: string[],
): Map<string, TreeItemData> {
  const tree = new Map<string, TreeItemData>();

  for (const result of results) {
    if (
      status !== null &&
      !status.includes(result.status) &&
      status.length != 0
    ) {
      continue;
    }

    // Top level control is at the first level of the tree
    if (result.parentControlId === undefined) {
      tree.set(result.controlId, {
        result: result,
        children: [],
      });
    } else {
      // Look for parent tree item
      let parent = tree.get(result.parentControlId);
      if (parent === undefined) {
        continue;
      }

      if (
        status !== null &&
        (status.includes(result.status) || status.length == 0)
      ) {
        parent.children.push(result);
      }
    }
  }

  return tree;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { data: catalog } = await client.GET(
    "/v1/orchestrator/catalogs/{catalogId}",
    {
      ...staticDataCache,
      params: {
        path: {
          catalogId: params.catalogId,
        },
      },
    },
  );

  const { results } = await evaluationClient
    .GET("/v1/evaluation/results", {
      params: {
        query: {
          "filter.certificationTargetId": params.id,
          "filter.catalogId": params.catalogId,
          latestByControlId: true,
        },
      },
    })
    .then((res) => {
      return { results: res.data?.results ?? [] };
    });

  const { controls } = await client
    .GET("/v1/orchestrator/catalogs/{catalogId}/controls", {
      params: {
        path: {
          catalogId: params.catalogId,
        },
        query: {
          pageSize: 1500,
        },
      },
    })
    .then((res) => {
      return { controls: res.data?.controls ?? [] };
    });

  const tree = buildTree(results, toArray(searchParams["filter.status"]) ?? []);

  return catalog ? (
    <>
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        {catalog.name}
      </h3>
      <p className="mt-2 max-w-4xl text-sm text-gray-500">
        {catalog?.description}
      </p>

      <Card>
        <dl className="divide-y divide-gray-900/10">
          <div className="bg-gray-50 p-4 mt-0">
            <div className="text-sm font-semibold">Controls</div>
          </div>
          {[...tree.values()].map((item) => (
            <ControlComplianceItems
              item={item}
              controls={controls}
              key={item.result.controlId}
              scope={{
                catalogId: params.catalogId,
                certificationTargetId: params.id,
              }}
            />
          ))}
        </dl>
      </Card>
    </>
  ) : (
    <></>
  );
}
