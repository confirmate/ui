import CatalogComplianceItem from "@/components/compliance/catalog-compliance-item";
import EnableCatalogButton from "@/components/compliance/enable-catalog-button";
import client from "@/lib/api/orchestrator";
import Link from "next/link";

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

    return [{ catalog, auditScope }];
  });

  return (
    <ul className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
      {enabledCatalogs?.map((catalog) => <CatalogComplianceItem />)}
      {leftOverCatalogs.length > 0 ? (
        <li>
          <Link href="./compliance/new">
            <EnableCatalogButton />
          </Link>
        </li>
      ) : (
        <></>
      )}
    </ul>
  );
}
