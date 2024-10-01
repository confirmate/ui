import Header from "@/components/header";
import Tabs from "@/components/tabs";
import client from "@/lib/api";

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
  const { data: toe } = await client.GET(
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

  if (toe) {
    const tabs = [
      {
        name: "Activity",
        href: "/certification-targets/" + toe.id + "/activity",
        icon: "user",
        current: false,
      },
      {
        name: "Discovered Resources",
        href: "/certification-targets/" + toe.id + "/resources",
        icon: "squares2x2",
      },
      {
        name: "Resource Graph",
        href: "/certification-targets/" + toe.id + "/graph",
        icon: "sun",
      },
      {
        name: "Assessment Results",
        href: "/certification-targets/" + toe.id + "/assessments",
        icon: "queue-list",
      },
      {
        name: "Compliance",
        href: "/certification-targets/" + toe.id + "/compliance",
        icon: "check-badge",
      },
      {
        name: "Settings",
        href: "/certification-targets/" + toe.id + "/settings",
        icon: "cog6-tooth",
        disabled: true,
      },
    ];

    return (
      <>
        <Header name={toe?.name} remove={removeToe}>
          {toe.description}. {statistics?.numberOfDiscoveredResources ?? 0}{" "}
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
