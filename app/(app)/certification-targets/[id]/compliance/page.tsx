import CatalogComplianceItem from "@/components/compliance/catalog-compliance-item";
import EnableCatalogButton from "@/components/compliance/enable-catalog-button";
import { buildCompliance } from "@/lib/api/evaluation";
import client from "@/lib/api/orchestrator";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { error, data: auditScopes } = await client
    .GET(
      "/v1/orchestrator/certification_targets/{certificationTargetId}/audit_scopes",
      {
        params: {
          path: {
            certificationTargetId: params.id,
          },
        },
      },
    )
    .then((res) => { return { data: res.data?.auditScopes ?? [], error: res.error } });

  const { catalogs } = await client
    .GET("/v1/orchestrator/catalogs")
    .then((res) => res.data ?? { catalogs: [] });

  const leftOverCatalogs =
    catalogs?.filter((c) => {
      return (
        auditScopes?.find((scope) => scope.catalogId == c.id) === undefined
      );
    }) ?? [];

  const enabledCatalogs = catalogs?.flatMap((catalog) => {
    const auditScope = auditScopes?.find(
      (scope) => scope.catalogId == catalog.id,
    );
    if (auditScope === undefined) {
      return [];
    }

    return { catalog, auditScope };
  });

  const compliance = await buildCompliance(params.id);

  return (
    <ul className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
      {enabledCatalogs?.map(({ catalog, auditScope: scope }) => (
        <CatalogComplianceItem
          catalog={catalog}
          scope={scope}
          compliance={compliance.get(catalog.id) ?? new Map()}
          key={catalog.id}
        />
      ))}
      {leftOverCatalogs.length > 0 ? (
        <EnableCatalogButton certificationTargetId={params.id} leftOverCatalogs={leftOverCatalogs} />
      ) : (
        <></>
      )}
    </ul>
  );
}
