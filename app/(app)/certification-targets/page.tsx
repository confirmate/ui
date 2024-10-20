import BelowHeader from "@/components/below-header";
import CertificationTargetCard from "@/components/certification-target-card";
import Header from "@/components/header";
import client from "@/lib/api/orchestrator";

export default async function Page() {
  const res = await client.GET("/v1/orchestrator/certification_targets");
  const targets = res.data?.targets ?? [];

  return (
    <>
      <div className="border-b border-gray-200 shadow-sm">
        <div className="py-4 px-4 sm:px-6 lg:px-8">
          <Header name="Certification Targets" buttons={false} icon={false}>
            Currently {targets.length} target(s) configured
          </Header>

          <BelowHeader>
            <div>
              This page provides an overview of all certification targets within
              Confirmate. A <i>certification target</i> is a single entity that
              comprises all necessary resources that are subject to a
              certification or an audit.
            </div>
            <div>
              Click on the name of a target to display more information about
              it.
            </div>
          </BelowHeader>
        </div>
      </div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8 pt-4 px-4 py-4 sm:px-6 lg:px-8"
      >
        {targets.map((target) => (
          <CertificationTargetCard target={target} key={target.id} />
        ))}
      </ul>
    </>
  );
}
