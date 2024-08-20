import BelowHeader from "@/components/below-header";
import FormattedDate from "@/components/formatted-date";
import Header from "@/components/header";
import client from "@/lib/api";
import Link from "next/link";

export default async function Page() {
  const res = await client.GET("/v1/orchestrator/cloud_services");
  const toes = res.data?.services ?? [];

  return (
    <>
      <Header name="Targets of Evaluation" buttons={false} icon={false}>
        {toes.length} target(s) configured
      </Header>

      <BelowHeader>
        This page provides an overview of all configured targets of evaluation
        within Confirmate. Click on the name of a target to display more
        information about it.
      </BelowHeader>

      <ul className="divide-y divide-gray-100">
        {toes.map((toe) => (
          <li className="flex justify-between gap-x-6 py-5" key={toe.id}>
            <div className="flex gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1499346030926-9a72daac6c63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <Link href={`/toes/${toe.id}/`}>
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {toe.name}
                  </p>
                </Link>
                <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                  {toe.description}
                </p>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900" />
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Last updated <FormattedDate value={toe.updatedAt} />
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
