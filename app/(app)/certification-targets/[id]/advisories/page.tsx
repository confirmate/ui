import { SortDefaults, Table, TableBody, TableHeader } from "@/components/table"
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

    const requests = await fetch(`${process.env.PLUGIN_CSAF_API_BASE}/v1/csaf-generator/advisories`).then((res) => res.json() as Promise<any[]>)

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
                {requests.map((request, idx) => {
                    return <tr key={idx}>
                        <td className="text-wrap px-4 py-4 text-sm text-gray-500 max-w-xl align-top">
                            {request.csaf.document.title}
                        </td>
                        <td className="text-wrap py-4 text-sm text-gray-500 max-w-xl align-top">
                            <div className="space-y-2">
                                <div>
                                    <div className="font-medium text-gray-900">{metrics.get(request.metric_id ?? "")?.name}</div>
                                    <div className="mt-1 text-gray-500">{metrics.get(request.metric_id ?? "")?.description}</div>
                                </div>
                                <div>
                                    <Link href={`/certification-targets/${params.id}/assessments?filter.id=${request.assessment_id}`}>View Assessment Result</Link>
                                </div>
                            </div>
                        </td>
                        <td className="text-wrap py-4 text-sm text-gray-500 max-w-xl align-top">
                            {request.csaf.document.tracking.initial_release_date}
                        </td>
                    </tr>
                })}
            </TableBody>
        </Table>
    </>
}