import BelowHeader from "@/components/below-header";
import FormattedDate from "@/components/formatted-date";
import Header from "@/components/header";
import client from "@/lib/api/orchestrator";
import Link from "next/link";

export default async function Page() {
  const res = await client.GET("/v1/orchestrator/certification_targets");
  const targets = res.data?.targets ?? [];

  return (
    <>
      <Header name="Certification Targets" buttons={false} icon={false}>
        {targets.length} target(s) configured
      </Header>

      <BelowHeader>
        This page provides an overview of all certification targets within
        Confirmate. Click on the name of a target to display more information
        about it.
      </BelowHeader>

      <ul className="divide-y divide-gray-100">
        {targets.map((target) => (
          <li className="flex justify-between gap-x-6 py-5" key={target.id}>
            <div className="flex gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1499346030926-9a72daac6c63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <Link href={`/certification-targets/${target.id}/`}>
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {target.name}
                  </p>
                </Link>
                <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                  {target.description}
                </p>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900" />
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Last updated <FormattedDate value={target.updatedAt} />
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
