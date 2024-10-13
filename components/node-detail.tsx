import NodeAssessmentResultsDetail from "@/components/node-assessment-results-detail";
import { SchemaResource } from "@/lib/api/discovery";
import { SchemaAssessmentResult, SchemaMetric } from "@/lib/api/orchestrator";
import { classNames, truncate } from "@/lib/util";
import { useState } from "react";
import NodePropertiesDetail from "./node-properties-detail";

export interface NodeDetailProps {
  resource?: SchemaResource;
  results?: SchemaAssessmentResult[];
  metrics?: Map<string, SchemaMetric>;
}

/**
 * Returns the name from a node ID, separating path segments by slashes.
 *
 * @param id The node ID to extract the name from. Can be undefined if no path is provided.
 * @returns The last segment of the path as a string, or an empty string if no path is present.
 */
function name(id: string | undefined) {
  let rr = id !== undefined ? id.split("/") : [];
  return rr.length > 0 ? rr[rr.length - 1] : "";
}

const tabs = [
  { name: "Assessment Results", id: "results", href: "#" },
  { name: "Properties", id: "properties", href: "#" },
];

export default function NodeDetail({
  resource,
  results,
  metrics,
}: NodeDetailProps) {
  const [tab, setTab] = useState("results");

  if (
    resource == undefined ||
    resource == null ||
    results == null ||
    metrics == null
  ) {
    return (
      <div className="flex flex-col">
        <div className="px-4 py-6 sm:px-6">
          <div className="mt-1">
            <p className="text-sm text-gray-600">
              Select a node to view additional information
            </p>
          </div>
        </div>
      </div>
    );
  }

  const renderNodeDetail = () => {
    switch (tab) {
      case "results":
        return (
          <NodeAssessmentResultsDetail results={results} metrics={metrics} />
        );
      case "properties":
        return <NodePropertiesDetail resource={resource} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="px-4 py-6 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="... truncate text-base font-semibold leading-6 text-confirmate">
              {truncate(name(resource.id), 50)}
            </div>
          </div>
          <div className="mt-1">
            <p className="text-sm text-gray-600">
              This resource is of type{" "}
              <i>{resource.resourceType?.split(",")[0]}</i> and has{" "}
              <i>{results.length}</i> assessment results associated to it.
            </p>
          </div>
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            <select
              id="tabs"
              name="tabs"
              defaultValue={tabs.find((t) => t.id == tab)?.name}
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-confirmate focus:outline-none focus:ring-confirmate sm:text-sm"
              onChange={(e) => setTab(e.target.value)}
            >
              {tabs.map((t) => (
                <option
                  key={t.name}
                  value={t.id}
                  className={classNames(
                    t.id == tab
                      ? "border-confirmate text-confirmate"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium",
                  )}
                >
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                {tabs.map((t) => (
                  <a
                    key={t.name}
                    href={t.href}
                    aria-current={t.id == tab ? "page" : undefined}
                    className={classNames(
                      t.id == tab
                        ? "border-confirmate text-confirmate"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                      "whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium",
                    )}
                    onClick={() => setTab(t.id)}
                  >
                    {t.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
          <div className="pb-5 pt-6">{renderNodeDetail()}</div>
        </div>
      </div>
    </>
  );
}
