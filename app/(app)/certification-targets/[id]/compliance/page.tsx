import CatalogComplianceItem from "@/components/compliance/catalog-compliance-item";
import EnableCatalogButton from "@/components/compliance/enable-catalog-button";
import client from "@/lib/api/orchestrator";
import evaluationClient, { ComplianceStatus, SchemaEvaluationResult } from "@/lib/api/evaluation";
import Link from "next/link";

interface PageProps {
  params: {
    id: string;
  };
}

function buildCompliance(
  evaluations: SchemaEvaluationResult[]
): Map<string, Map<string, ComplianceStatus>> {
  let all = new Map();
  let compliance: Map<string, ComplianceStatus>;
  for (let result of evaluations) {
    compliance = all.get(result.controlCatalogId);
    if (compliance === undefined) {
      compliance = new Map();
      all.set(result.controlCatalogId, compliance);
    }

    // TODO(oxisto): these should be required in openapi
    compliance.set(result.controlId!!, result.status!!);
  }

  return all;
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

  const { results: topControlResults } = await evaluationClient.GET("/v1/evaluation/results",
    {
      params: {
        query: {
          "filter.certificationTargetId": params.id,
          "filter.parentsOnly": true,
          "latestByControlId": true,
        },
      }
    }
  ).then((res) => { return { results: res.data?.results ?? [] } });

  // TODO: This should be done in the backend
  const compliance = buildCompliance(topControlResults);

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
        <li>
          <EnableCatalogButton certificationTargetId={params.id} />
        </li>
      ) : (
        <></>
      )}
    </ul>
  );
}
