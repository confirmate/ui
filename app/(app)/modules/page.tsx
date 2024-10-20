import BelowHeader from "@/components/below-header";
import Header from "@/components/header";
import { classNames } from "@/lib/util";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

const modules = [
  {
    name: "Clouditor",
    initials: "CL",
    href: "#",
    detail: (
      <div className="space-y-2">
        <div>
          Clouditor is our main module that handles everything related to Cloud.
          It supports AWS, Azure and Kubernetes.
        </div>
        <div>
          Gathered resources include<i>virtual machines</i>, <i>databases</i>,{" "}
          <i>load balancers</i>, <i>storages</i>, etc...
        </div>
      </div>
    ),
    bgColor: "bg-clouditor",
    enabled: true,
  },
  {
    name: "Codyze",
    initials: "CD",
    href: "#",
    detail: (
      <div className="space-y-2">
        <div>
          The purpose of this module is to analyze source code in various
          langues, e.g., Java, C/C++, Python, Go with a set of pre-defined
          compliance rules.
        </div>
        <div>
          for security features such as <i>authentication</i>, <i>encryption</i>
          , <i>logging</i> or others.
        </div>
      </div>
    ),
    bgColor: "bg-purple-600",
    enabled: true,
  },
  {
    name: "Semantic Code Analysis",
    initials: "SCA",
    href: "#",
    detail: (
      <div className="space-y-2">
        <div>
          The Semantic Code Analysis module is aimed at providing a semantic
          overview of the application code.
        </div>
        <div>
          Using AI technologies, such as LLM, this module is able to extract
          behavioral information about an application that affects security.
        </div>
      </div>
    ),
    bgColor: "bg-yellow-500",
    enabled: true,
  },
  {
    name: "CSAF Generator",
    initials: "CSAF",
    href: "#",
    detail: (
      <div className="space-y-2">
        <div>
          {" "}
          The CSAF generator is able to help developers to generate a security
          advisory according to the Common Security Advisory Framework (CSAF)
          standard.
        </div>
        <div>
          It is is able to automatically populate the necessary fields of a CSAF
          advisory based on the analysis results of other modules.
        </div>
      </div>
    ),
    bgColor: "bg-green-500",
    enabled: true,
  },
  {
    name: "Documentation Generation",
    initials: "CSAF",
    href: "#",
    detail: (
      <div className="space-y-2">
        <div>Coming soon...</div>
      </div>
    ),
    bgColor: "bg-gray-500",
    enabled: false,
  },
  {
    name: "Process Analyzer",
    initials: "CSAF",
    href: "#",
    detail: (
      <div className="space-y-2">
        <div>Coming soon...</div>
      </div>
    ),
    bgColor: "bg-gray-500",
    enabled: false,
  },
];

export default function Page() {
  return (
    <>
      <div className="border-b border-gray-200 shadow-sm">
        <div className="py-4 px-4 sm:px-6 lg:px-8">
          <Header name="Modules" buttons={false} icon={false}>
            {modules.filter((module) => module.enabled).length} modules
            configured and active.
          </Header>

          <BelowHeader>
            This page provides an overview of all modules that are currently
            active in this instance of Confirmate.
          </BelowHeader>
        </div>
      </div>
      <ul
        role="list"
        className="pt-4 px-4 py-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2 xl:grid-cols-3"
      >
        {modules.map((project) => (
          <li key={project.initials} className="col-span-1 flex rounded-md">
            <div
              className={classNames(
                project.bgColor,
                "flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white",
              )}
            >
              {project.initials}
            </div>
            <div className="flex flex-1 items-start justify-between rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div className="flex-1  px-4 py-4 text-sm">
                <a
                  href={project.href}
                  className="font-medium text-gray-900 hover:text-gray-600"
                >
                  {project.name}
                </a>
                <div className="text-gray-500 pt-2">{project.detail}</div>
              </div>
              <div className="flex-shrink-0 pr-2 pt-1">
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-confirmate focus:ring-offset-2"
                  disabled
                >
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
