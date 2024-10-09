import Header from "@/components/header";
import Tabs from "@/components/tabs";
import client from "@/lib/api/orchestrator";

interface LayoutProps
  extends Readonly<{
    children: React.ReactNode;
  }> {
  params: {
    id: string;
  };
}

export async function removeToe() {
  "use server";
}

export default async function Layout({ params, children }: LayoutProps) {
  const { data: target } = await client.GET(
    "/v1/orchestrator/certification_targets/{certificationTargetId}",
    {
      params: {
        path: {
          certificationTargetId: params.id,
        },
      },
    },
  );

  const { data: statistics } = await client.GET(
    "/v1/orchestrator/certification_targets/statistics",
    {
      params: {
        query: {
          certificationTargetId: params.id,
        },
      },
    },
  );

  if (target) {
    const tabs = [
      {
        name: "Activity",
        href: "/certification-targets/" + target.id + "/activity",
        icon: "user",
        current: false,
      },
      {
        name: "Discovered Resources",
        href: "/certification-targets/" + target.id + "/resources",
        icon: "squares2x2",
      },
      {
        name: "Security Assessment",
        href: "/certification-targets/" + target.id + "/assessments",
        icon: "queue-list",
      },
      {
        name: "Compliance",
        href: "/certification-targets/" + target.id + "/compliance",
        icon: "check-badge",
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
        <Header name={target?.name} remove={removeToe}>
          {target.description}. {statistics?.numberOfDiscoveredResources ?? 0}{" "}
          discovered resources
        </Header>

        <Tabs items={tabs} />

        <div className="pt-8">{children}</div>
      </>
    );
  } else {
    return <>Not found</>;
  }
}
