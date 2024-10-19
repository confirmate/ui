import Header from "@/components/header";
import { icons } from "@/components/icons";
import Tabs from "@/components/tabs";
import client from "@/lib/api/orchestrator";
import { hrtime } from "process";

interface LayoutProps
  extends Readonly<{
    children: React.ReactNode;
  }> {
  params: {
    id: string;
  };
}

async function removeToe() {
  "use server";

  return <></>;
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
        name: "Compliance",
        href: "/certification-targets/" + target.id + "/compliance",
        icon: "check-badge",
      },
      {
        name: "Security Assessment",
        href: "/certification-targets/" + target.id + "/assessments",
        icon: "queue-list",
      },
      ...(process.env.PLUGIN_CSAF_ENABLE == "true" ?
        [{
          name: "Security Advisories",
          href: "/certification-targets/" + target.id + "/advisories",
          icon: "document-text",
          current: false,
        }] : []
      ),
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
        <div className="sticky top-0 bg-white z-[999] border-b border-gray-200 shadow-sm">
          <div className="pt-4 px-4 sm:px-6 lg:px-8">
            <Header name={target?.name} remove={removeToe} icon={false}>
              {target.description}. {statistics?.numberOfDiscoveredResources ?? 0}{" "}
              discovered resources
            </Header>

            <Tabs items={tabs} />
          </div>
        </div >
        <div className="pt-4 px-4 py-4 sm:px-6 lg:px-8">{children}</div>
      </>
    );
  } else {
    return <>Not found</>;
  }
}
