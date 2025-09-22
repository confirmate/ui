import AssessmentIcon from "@/components/assessment-icon";
import { SchemaResource } from "@/lib/api/discovery";
import { SchemaAssessmentResult, SchemaMetric } from "@/lib/api/orchestrator";
import Link from "next/link";

interface NodeAssessmentResultsDetailProps {
  results: SchemaAssessmentResult[];
  metrics: Map<string, SchemaMetric>;
  resource: SchemaResource;
}

export default function NodeAssessmentResultDetail({
  results,
  metrics,
  resource,
}: NodeAssessmentResultsDetailProps) {
  return (
    <>
      {results.length > 0 ? (
        <div>
          <div className="space-y-4">
            {results.map((result) => (
              <div className="relative flex items-start" key={result.id}>
                <div className="absolute flex h-6 items-center">
                  <AssessmentIcon result={result} />
                </div>
                <div className="pl-7 text-sm leading-6">
                  <label
                    htmlFor="privacy-public"
                    className="font-medium text-gray-900"
                  >
                    <Link
                      href={`/targets-of-evaluation/${resource.targetOfEvaluationId}/assessments/?filter.id=${result.id}`}
                    >
                      {metrics.get(result.metricId ?? "")?.name}
                    </Link>
                  </label>
                  <p id="privacy-public-description" className="text-gray-500">
                    {metrics.get(result.metricId ?? "")?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-900">
          No assessment results found for this resource.
        </div>
      )}
    </>
  );
}
