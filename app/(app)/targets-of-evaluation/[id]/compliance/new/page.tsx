import WizardStepCatalog from "@/components/wizard/wizard-step-catalog";
import { staticDataCache } from "@/lib/api";
import client from "@/lib/api/orchestrator";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const p = await params;
  const { auditScopes } = await client
    .GET(
      "/v1/orchestrator/targets_of_evaluation/{targetOfEvaluationId}/audit_scopes",
      {
        params: {
          path: {
            targetOfEvaluationId: p.id,
          },
        },
      },
    )
    .then((res) => res.data ?? { auditScopes: [] });

  const { catalogs } = await client
    .GET("/v1/orchestrator/catalogs", { ...staticDataCache })
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
