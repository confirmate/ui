import ActivityItem, { ActivityItemData } from "@/components/activity-item";
import client, {
  SchemaAssessmentResult,
  SchemaCertificationTarget,
} from "@/lib/api/orchestrator";
import { shortResourceId } from "@/lib/util";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const p = (await params);
  const { data: target } = await client.GET(
    "/v1/orchestrator/certification_targets/{certificationTargetId}",
    {
      params: {
        path: {
          certificationTargetId: p.id,
        },
      },
    },
  );

  const { data } = await client.GET("/v1/orchestrator/assessment_results", {
    params: {
      query: {
        "filter.certificationTargetId": p.id,
      },
    },
  });

  if (data && target) {
    const timeline = buildTimeline(data?.results ?? [], target);
    return (
      <div className="flow-root">
        <ul className="-mb-8">
          {timeline.map((item, idx) => (
            <ActivityItem
              last={idx == timeline.length - 1}
              item={item}
              key={idx}
            />
          ))}
        </ul>
      </div>
    );
  }
}

function buildTimeline(
  results: SchemaAssessmentResult[],
  target: SchemaCertificationTarget,
): ActivityItemData[] {
  const timeline: ActivityItemData[] = [];
  let groupedResult = new Map<string, SchemaAssessmentResult[]>();
  // First, group resources together
  // TODO: group according to interval
  for (const result of results) {
    let group = groupedResult.get(result.resourceId ?? "");
    if (group == undefined) {
      group = [];
      groupedResult.set(result.resourceId ?? "", group);
    }

    group.push(result);
  }

  for (let group of groupedResult.values()) {
    const date = new Date(Date.parse(group[0].timestamp ?? ""));

    timeline.push({
      content: `Assessed ${group.length} metrics for ${(group[0].resourceTypes ?? "")[0]}`,
      target: shortResourceId(group[0].resourceId ?? ""),
      href:
        "/certification-targets/" +
        target.id +
        "/resources/" +
        group[0].resourceId,
      date: formatDate(date),
      datetime: group[0].timestamp ?? "",
      icon: "queue-list",
      iconBackground: "bg-blue-500",
    });
  }

  const date = new Date(Date.parse(target.createdAt ?? ""));

  timeline.push({
    content: "Created cloud service",
    target: target.name,
    href: "/certification-targets/" + target.id,
    date: formatDate(date),
    datetime: target.createdAt ?? "",
    icon: "cloud",
    iconBackground: "bg-gray-400",
  });

  return timeline;
}

function formatDate(date: Date): string {
  let formatter: Intl.DateTimeFormat;

  // Display time if its today
  if (isToday(date)) {
    formatter = new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    // Otherwise, display date
    formatter = new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
    });
  }
  return formatter.format(date);
}

function isToday(date: Date): boolean {
  const today = new Date();

  return (
    date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear()
  );
}
