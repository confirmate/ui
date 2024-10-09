import WizardStepCatalog from "@/components/wizard/wizard-step-catalog";
import client from "@/lib/api/orchestrator";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { auditScope: auditScopes } = await client
    .GET(
      "/v1/orchestrator/certification_targets/{certificationTargetId}/auditScopes",
      {
        params: {
          query: {
            certificationTargetId: params.id,
          },
        },
      },
    )
    .then((res) => res.data ?? { auditScope: [] });
  auditScopes;

  const { catalogs } = await client
    .GET("/v1/orchestrator/catalogs")
    .then((res) => res.data ?? { catalogs: [] });

  return (
    <>
      <WizardStepCatalog
        catalogs={catalogs ?? []}
        auditScopes={auditScopes ?? []}
      />
    </>
  );
}
