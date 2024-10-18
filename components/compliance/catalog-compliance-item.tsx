import ComplianceChart from "@/components/compliance/compliance-chart";
import { ComplianceStatus } from "@/lib/api/evaluation";
import { SchemaAuditScope, SchemaCatalog } from "@/lib/api/orchestrator";
import Button from "@/components/button";
import { PauseIcon, TrashIcon } from "@heroicons/react/20/solid";

interface CatalogComplianceItemProps {
  catalog: SchemaCatalog;
  scope: SchemaAuditScope;
  compliance: Map<string, ComplianceStatus>;
}

export default function CatalogComplianceItem({ catalog, scope, compliance }: CatalogComplianceItemProps) {
  return <li className="overflow-hidden rounded-xl shadow-sm border border-gray-200">
    <div className="flex items-center justify-between gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
      <a href={`/certification-targets/${scope.certificationTargetId}/compliance/${catalog.id}`}>
        <div className="text-sm font-medium leading-6 text-gray-900">{catalog.name}</div>
        <div className="text-sm text-gray-500">{catalog.description}</div>
      </a>
      <div className="flex gap-x-1.5">
        {/*<Button>
          <PauseIcon className="h-4 w-4" />
        </Button>*/}
        <Button className="bg-red-800 hover:bg-red-700">
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>

    <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
      <ComplianceChart compliance={compliance} scope={scope} />
      <div className="flex justify-between gap-x-4 py-3">
        <dt className="text-gray-500">Controls in Scope</dt>
        <dd className="flex items-start gap-x-2">
          <div className="font-medium text-gray-900">{compliance.size}</div>
        </dd>
      </div>
      <div className="flex justify-between gap-x-4 py-3">
        <dt className="text-gray-500">Assurance Level</dt>
        <dd className="flex items-start gap-x-2">
          <div className="font-medium text-gray-900">
            {scope.assuranceLevel ?? '-'}
          </div>
        </dd>
      </div>
    </dl>
  </li>;
}
