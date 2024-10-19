import FormattedDate from "@/components/formatted-date";
import { SortDefaults, Table, TableBody, TableHeader } from "@/components/table"
import TableRefresher from "@/components/table/table-refresher";
import { GenerationRequestResponse, listAdvisoryRequests } from "@/lib/api/csaf-generator";
import { listMetrics, SchemaMetric } from "@/lib/api/orchestrator";
import Link from "next/link";

const defaults: SortDefaults = {
    sortedBy: "created_at",
    direction: "desc"
}

interface PageProps {
    params: {
        id: string
    }
}

export default async function Page({ params }: PageProps) {
    if (!process.env.PLUGIN_CSAF_ENABLE) {
        return <>CSAF plugin not enabled</>
    }

    const responses = await listAdvisoryRequests();

    const allMetrics = await listMetrics();
    const metrics = new Map<string, SchemaMetric>();
    allMetrics.forEach((m) => {
        metrics.set(m.id ?? "", m);
    });

    return <>
        <Table>
            <TableHeader defaults={defaults} columns={[
                {
                    name: "Title",
                    field: "title",
                },
                {
                    name: "Created From",
                    field: "created_from",
                },
                {
                    name: "Created At",
                    field: "created_at",
                }
            ]} />
            <TableBody>
                <TableRefresher ms={5000} />
                {responses.map((response, idx) => {
                    return <tr key={idx}>
                        <td className="text-wrap px-4 py-4 text-sm text-gray-900 max-w-xl align-top">
                            <Link href={`/certification-targets/${params.id}/advisories/${response.id}`}>
                                {response.title}
                            </Link>
                        </td>
                        <td className="text-wrap py-4 text-sm text-gray-500 max-w-xl align-top">
                            <div className="space-y-2">
                                <div>
                                    <div className="font-medium text-gray-900">{metrics.get(response.metricId ?? "")?.name}</div>
                                    <div className="mt-1 text-gray-500">{metrics.get(response.metricId ?? "")?.description}</div>
                                </div>
                                <div>
                                    <Link href={`/certification-targets/${params.id}/assessments?filter.id=${response.assessmentId}`}>View Assessment Result</Link>
                                </div>
                            </div>
                        </td>
                        <td className="text-wrap py-4 text-sm text-gray-500 max-w-xl align-top">
                            {response.createdAt ? <FormattedDate value={response.createdAt} format="short-date-time" /> : "Pending"}
                        </td>
                    </tr>
                })}
            </TableBody>
        </Table>
    </>
}