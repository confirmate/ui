import AssessmentIcon from "@/components/assessment-icon";
import AssessmentNonComplianceDetails from "@/components/assessment-non-compliance-details";
import ColumnWithSort from "@/components/table/column-with-sort"
import client from "@/lib/api/orchestrator"

interface PageProps {
    searchParams?: {
        sortedBy?: string
        order?: string
    };
}

export default async function Page({
    searchParams,
}: PageProps) {
    // We want to set a default sortedBy and order parameter if it does not exist        
    const { results } = await client.GET("/v1/orchestrator/assessment_results",
        {
            params: {
                query: {
                    orderBy: searchParams?.sortedBy,
                }
            }
        }
    ).then((res) => res.data ?? { results: [] })

    return (
        < div className="" >
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Assessment Results</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        The following table lists all assessment results that are present for the given certification target. An <i>assessment Result</i> represents the measurement of a particular <i>metric</i> on a <i>resource</i>.
                    </p>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        <ColumnWithSort field="id" defaultField={true}>ID</ColumnWithSort>
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        <ColumnWithSort field="metric_id">Metric</ColumnWithSort>
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        <ColumnWithSort field="timestamp">Timestamp</ColumnWithSort>
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        <ColumnWithSort field="compliant">Compliant</ColumnWithSort>
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        <ColumnWithSort field="non_compliance_comments">Non Compliance Details</ColumnWithSort>
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        <ColumnWithSort field="resource_id">Resource ID</ColumnWithSort>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {results?.map((result) => (
                                    <tr key={result.id}>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                            {result.id}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            <div className="font-medium text-gray-900">{result.metricId}</div>
                                            <div className="mt-1 text-gray-500">Some metric text here</div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            {result.timestamp}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            <AssessmentIcon result={result} />
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            <AssessmentNonComplianceDetails result={result} />
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            <div className="text-gray-900">{result.resourceId}</div>
                                            <div className="mt-1 text-gray-500">{(result.resourceTypes ?? [""])[0]}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    )
}