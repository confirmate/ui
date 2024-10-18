import AssessmentIcon from "@/components/assessment-icon";
import AssessmentNonComplianceDetails from "@/components/assessment-non-compliance-details";
import FormattedDate from "@/components/formatted-date";
import ShowOnlyLatestSlider from "@/components/table/show-only-latest-slider";
import { SortDefaults, Table, TableBody, TableHeader } from "@/components/table";
import client, { listMetrics, SchemaMetric } from "@/lib/api/orchestrator";
import Link from "next/link";

interface PageProps {
    searchParams?: {
        sortedBy?: string
        direction?: string
        latestByResource?: boolean
        "filter.id"?: string[] | string,
    };
}

const defaults: SortDefaults = {
    sortedBy: "timestamp",
    direction: "desc"
}

export default async function Page({
    searchParams,
}: PageProps) {
    // We want to set a default sortedBy and order parameter if it does not exist        
    const sortedBy = searchParams?.sortedBy ?? defaults.sortedBy
    const direction = searchParams?.direction ?? defaults.direction;
    const filteredIDs = Array.isArray(searchParams?.["filter.id"]) ? searchParams?.["filter.id"] :
        searchParams?.["filter.id"] !== undefined ? searchParams?.["filter.id"] : undefined
    const latestByResourceId = searchParams?.latestByResource ?? true;

    let { results } = await client.GET("/v1/orchestrator/assessment_results",
        {
            params: {
                query: {
                    orderBy: sortedBy,
                    asc: direction == 'asc' ? true : false,
                    latestByResourceId: latestByResourceId,
                }
            }
        }
    ).then((res) => res.data ?? { results: [] })

    // TODO(oxisto): This should be done in the backend
    // TODO(oxisto): ID should be required
    results = results?.filter((result) => {
        if (filteredIDs !== undefined && result.id !== undefined) {
            return filteredIDs.includes(result.id)
        } else {
            return true;
        }
    })

    const allMetrics = await listMetrics();
    const metrics = new Map<string, SchemaMetric>();
    allMetrics.forEach((m) => {
        metrics.set(m.id ?? "", m);
    });

    return (
        <div>
            <div className="sm:flex sm:items-start">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Assessment Results</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        The following table lists all assessment results that are present for the given certification target. An <i>assessment Result</i> represents the measurement of a particular <i>metric</i> on a <i>resource</i>.
                    </p>
                </div>
            </div>

            <Table>
                <TableHeader defaults={defaults} columns={[
                    {
                        name: "Metric",
                        field: "metric_id",
                        extra: <ShowOnlyLatestSlider />
                    },
                    {
                        name: "Details",
                        field: "compliance_comment",
                    },
                    {
                        name: "Resource",
                        field: "resource_id",
                    },
                    {
                        name: "Timestamp",
                        field: "timestamp",
                    }
                ]} />
                <TableBody>
                    {results?.map((result) => (
                        <tr key={result.id}>
                            <td className="py-4 pl-4 pr-3 text-sm text-gray-500 align-top max-w-72">
                                <div className="flex flex-row">
                                    <div className="w-5 mr-2">
                                        <AssessmentIcon result={result} />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">{metrics.get(result.metricId ?? "")?.name}</div>
                                        <div className="mt-1 text-gray-500">{metrics.get(result.metricId ?? "")?.description}</div>
                                    </div>
                                </div>

                            </td>
                            <td className="text-wrap px-3 py-4 text-sm text-gray-500 max-w-xl align-top">
                                <AssessmentNonComplianceDetails result={result} />
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 align-top">
                                <div className="text-gray-900">
                                    <Link href={`/certification-targets/${result.certificationTargetId}/resources/${result.resourceId}`}>
                                        {result.resourceId}
                                    </Link>
                                </div>
                                <div className="mt-1 text-gray-500">{(result.resourceTypes ?? [""])[0]}</div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 align-top">
                                <FormattedDate value={result.timestamp} format="short-date-time" />
                            </td>
                        </tr>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}