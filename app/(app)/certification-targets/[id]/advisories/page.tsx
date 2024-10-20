import SecurityAdvisoryTableRow from "@/components/advisories/security-advisory-table-row";
import {
  SortDefaults,
  Table,
  TableBody,
  TableHeader,
} from "@/components/table";
import TableRefresher from "@/components/table/table-refresher";
import { listAdvisoryRequests } from "@/lib/api/csaf-generator";
import { listMetrics, SchemaMetric } from "@/lib/api/orchestrator";

const defaults: SortDefaults = {
  sortedBy: "created_at",
  direction: "desc",
};

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  if (process.env.PLUGIN_CSAF_ENABLE !== "true") {
    return <>CSAF plugin not enabled</>;
  }

  const responses = await listAdvisoryRequests();

  const allMetrics = await listMetrics();
  const metrics = new Map<string, SchemaMetric>();
  allMetrics.forEach((m) => {
    metrics.set(m.id ?? "", m);
  });

  return (
    <>
      <Table>
        <TableHeader
          defaults={defaults}
          columns={[
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
            },
            {
              name: "",
              field: "trash",
            },
          ]}
        />
        <TableBody>
          <TableRefresher ms={5000} />
          {responses.map((response, idx) => (
            <SecurityAdvisoryTableRow
              key={response.id}
              metric={metrics.get(response.metricId ?? "")}
              response={response}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
}
