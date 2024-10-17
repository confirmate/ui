import { SidebarItem } from "@/components/sidebar-item";
import client from "@/lib/api/orchestrator";
import { classNames } from "@/lib/util";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface SidebarProps {
  /**
   * Whether we are rendering the sidebar for mobile or not.
   */
  isMobile?: boolean;
}

export default async function Sidebar({ isMobile = false }: SidebarProps) {
  const { data } = await client.GET("/v1/orchestrator/certification_targets");
  const targets = data?.targets ?? [];

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: "home",
      disabled: true,
    },
    {
      name: "Certification Targets",
      href: "/certification-targets",
      icon: "rectangle-group",
      children: [
        ...targets.map((s) => {
          return {
            name: s.name,
            href: "/certification-targets/" + s.id,
            isSub: true,
          };
        }),
        {
          name: "New...",
          href: "/certification-targets/new",
          isSub: true,
          isNew: true,
        },
      ],
    },
    { name: "Metrics", href: "/metrics", icon: "adjustments-horizontal", disabled: true },
    { name: "Modules", href: "/modules", icon: "archive-box" },
    { name: "Reports", href: "/reports", icon: "chart-pie", disabled: true },
  ];

  return (
    <div
      className={classNames(
        isMobile ? "" : "border-r border-gray-200",
        "flex grow flex-col gap-y-5 overflow-y-auto bg-slate-50 px-6 pb-4",
      )}
    >
      <div className="flex h-16 shrink-0 items-center border-b border-gray-200">
        <Image
          className="h-8 w-auto"
          width={103}
          height={105}
          //style="transform: scaleX(-1);"
          src="/small.png"
          alt="The Clouditor"
        />
        <div className="ml-2 flex flex-col">
          <div className="text-xl">Confirmate</div>
          <div className="text-sm text-gray-500">Compliance Made Easy</div>
        </div>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <SidebarItem item={item} key={item.name} />
              ))}
            </ul>
          </li>

          <li className="-mx-6 mt-auto">
            <a
              href="#"
              className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
            >
              <img
                alt=""
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="h-8 w-8 rounded-full bg-gray-50"
              />
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">Compliance Manager</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
