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
    "/v1/orchestrator/certification_targets/{certificationTargetId}",
    {
      params: {
        path: {
          certificationTargetId: p.id,
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
    "/v1/orchestrator/certification_targets/{certificationTargetId}",
    {
      params: {
        path: {
          certificationTargetId: p.id,
        },
      },
    },
  );

  const { data: statistics } = await client.GET(
    "/v1/orchestrator/certification_targets/statistics",
    {
      params: {
        query: {
          certificationTargetId: p.id,
        },
      },
    },
  );

  if (target) {
    const tabs = [
      {
        name: "Compliance",
        href: "/certification-targets/" + target.id + "/compliance",
        icon: "check-badge",
      },
      {
        name: "Security Assessment",
        href: "/certification-targets/" + target.id + "/assessments",
        icon: "queue-list",
      },
      ...(process.env.PLUGIN_CSAF_ENABLE == "true"
        ? [
          {
            name: "Security Advisories",
            href: "/certification-targets/" + target.id + "/advisories",
            icon: "document-text",
            current: false,
          },
        ]
        : []),
      {
        name: "Discovered Resources",
        href: "/certification-targets/" + target.id + "/resources",
        icon: "squares2x2",
      },
      {
        name: "Activity",
        href: "/certification-targets/" + target.id + "/activity",
        icon: "user",
        current: false,
      },
      {
        name: "Settings",
        href: "/certification-targets/" + target.id + "/settings",
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
