import NodeAssessmentResultsDetail from "@/components/node-assessment-results-detail";
import { SchemaResource } from "@/lib/api/discovery";
import { SchemaAssessmentResult, SchemaMetric } from "@/lib/api/orchestrator";
import { classNames } from "@/lib/util";
import { useState } from "react";

interface NodeDetailProps {
  resource: SchemaResource;
  results: SchemaAssessmentResult[];
  metrics: Map<string, SchemaMetric>;
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
  { name: "Assessment Results", id: "results", href: "#", current: true },
  { name: "Properties", id: "properties", href: "#", current: false },
];

export default function NodeDetail({
  resource,
  results,
  metrics,
}: NodeDetailProps) {
  const [tab, setTab] = useState("results");

  const renderNodeDetail = () => {
    switch (tab) {
      case "results":
        return (
          <NodeAssessmentResultsDetail results={results} metrics={metrics} />
        );
      default:
        return tab === "properties" ? null : "";
    }
  };

  return (
    <>
      <div className="flex flex-col bg-white shadow-xl">
        <div className="px-4 py-6 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="... truncate text-base font-semibold leading-6 text-confirmate">
              {name(resource.id)}
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
              defaultValue={tabs.find((tab) => tab.current)?.name}
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-confirmate focus:outline-none focus:ring-confirmate sm:text-sm"
              onChange={(e) => setTab(e.target.value)}
            >
              {tabs.map((tab) => (
                <option
                  key={tab.name}
                  value={tab.id}
                  className={classNames(
                    tab.current
                      ? "border-confirmate text-confirmate"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium",
                  )}
                >
                  {tab.name}
                </option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                  <a
                    key={tab.name}
                    href={tab.href}
                    aria-current={tab.current ? "page" : undefined}
                    className={classNames(
                      tab.current
                        ? "border-confirmate text-confirmate"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                      "whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium",
                    )}
                    onClick={() => setTab(tab.id)}
                  >
                    {tab.name}
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
