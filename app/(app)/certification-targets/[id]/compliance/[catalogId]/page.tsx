import { staticDataCache } from "@/lib/api";
import evaluationClient, { SchemaEvaluationResult } from "@/lib/api/evaluation";
import client from "@/lib/api/orchestrator";

interface PageProps {
  params: {
    id: string;
    catalogId: string;
  };
  searchParams: {
    "filter.status"?: string | string[];
  };
}

interface TreeItemData {
  result: SchemaEvaluationResult;
  children: SchemaEvaluationResult[];
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
      },
    })
    .then((res) => {
      return { controls: res.data?.controls ?? [] };
    });

  const tree = buildTree(results, [...(searchParams["filter.status"] ?? [])]);

  return catalog ? (
    <>
      <div className="border-b border-gray-200 pb-5">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          {catalog.name}
        </h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          {catalog?.description}
        </p>
      </div>

      <dl className="space-y-6 divide-y divide-gray-900/10">
        {/*tree.values().map((item) => <Disclosure as="div" className="pt-6">
			<dt>
				<div className="flex w-full items-start justify-between text-left text-gray-900">
					<ControlComplianceItem
						result={item.result}
						control={controls.find((control) => control.id === item.result.controlId)}
					/>
					<DisclosureButton>
						<span className="ml-6 flex h-7 items-center">
                            icon
						</span>
					</DisclosureButton>
				</div>
				<DisclosurePanel as="dd" className="mt-2 pr-12">
					{#each item.children as result (result.controlId)}
						<div class="ml-12 mt-6">
							<ControlComplianceItem {result} control={controls.get(result.controlId)} />
						</div>
					{/each}
				</DisclosurePanel>
			</dt>
		</Disclosure>
	)*/}
      </dl>
    </>
  ) : (
    <></>
  );
}
