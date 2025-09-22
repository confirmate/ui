import Header from "@/components/header";
import Tabs from "@/components/tabs";
import client from "@/lib/api/orchestrator";
import { ResolvingMetadata } from "next";

interface LayoutProps
  extends Readonly<{
    children: React.ReactNode;
  }> {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata(
  { params }: LayoutProps,
  parent: ResolvingMetadata,
) {
  const p = await params;
  const { data: target } = await client.GET(
    "/v1/orchestrator/targets_of_evaluation/{targetOfEvaluationId}",
    {
      params: {
        path: {
          targetOfEvaluationId: p.id,
        },
      },
    },
  );

  return {
    title: target?.name,
  };
}

export default async function Layout({ params, children }: LayoutProps) {
  const p = await params;
  const { data: target } = await client.GET(
    "/v1/orchestrator/targets_of_evaluation/{targetOfEvaluationId}",
    {
      params: {
        path: {
          targetOfEvaluationId: p.id,
        },
      },
    },
  );

  const { data: statistics } = await client.GET(
    "/v1/orchestrator/targets_of_evaluation/statistics",
    {
      params: {
        query: {
          targetOfEvaluationId: p.id,
        },
      },
    },
  );

  if (target) {
    const tabs = [
      {
        name: "Compliance",
        href: "/targets-of-evaluation/" + target.id + "/compliance",
        icon: "check-badge",
      },
      {
        name: "Security Assessment",
        href: "/targets-of-evaluation/" + target.id + "/assessments",
        icon: "queue-list",
      },
      ...(process.env.PLUGIN_CSAF_ENABLE == "true"
        ? [
          {
            name: "Security Advisories",
            href: "/targets-of-evaluation/" + target.id + "/advisories",
            icon: "document-text",
            current: false,
          },
        ]
        : []),
      {
        name: "Discovered Resources",
        href: "/targets-of-evaluation/" + target.id + "/resources",
        icon: "squares2x2",
      },
      {
        name: "Activity",
        href: "/targets-of-evaluation/" + target.id + "/activity",
        icon: "user",
        current: false,
      },
      {
        name: "Settings",
        href: "/targets-of-evaluation/" + target.id + "/settings",
        icon: "cog6-tooth",
        disabled: true,
      },
    ];

    return (
      <>
        <div className="sticky top-0 bg-white border-b border-gray-200 shadow-sm">
          <div className="pt-4 px-4 sm:px-6 lg:px-8">
            <Header name={target?.name} icon={false} buttons={false}>
              {target.description}.{" "}
              {statistics?.numberOfDiscoveredResources ?? 0} discovered
              resources
            </Header>

            <Tabs items={tabs} />
          </div>
        </div>
        <div className="pt-4 px-4 py-4 sm:px-6 lg:px-8">{children}</div>
      </>
    );
  } else {
    return <>Not found</>;
  }
}
