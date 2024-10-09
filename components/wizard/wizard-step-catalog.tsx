"use client";

import Button from "@/components/button";
import AssuranceLevelPopover from "@/components/compliance/assurance-level-popover";
import { SchemaAuditScope, SchemaCatalog } from "@/lib/api/orchestrator";
import { useState } from "react";

interface WizardStepCatalogProps {
  catalogs: SchemaCatalog[];
  auditScopes: SchemaAuditScope[];
}

export default function WizardStepCatalog({
  catalogs,
  auditScopes,
}: WizardStepCatalogProps) {
  const [selected, setSelected] = useState(
    new Map(
      catalogs.map((catalog) => [
        catalog.id,
        auditScopes.find((scope) => scope.catalogId == catalog.id) !==
          undefined,
      ]),
    ),
  );

  /**
   * This function selects a catalog if its not already selected or de-selects
   * an already selected catalog.
   *
   * If the catalog needs an assurance level, this must be specified as an extra
   * parameter.
   *
   * @param catalog the catalog to (de)-select
   * @param assuranceLevel the assurance level, if the catalog needs it
   */
  function toggle(catalog: SchemaCatalog, assuranceLevel?: string) {
    // Check, if catalog already exists in the Audit Scope
    if (!selected.get(catalog.id)) {
      // Does not exist yet -> create new Audit Scope
      const auditScope: SchemaAuditScope = {
        catalogId: catalog.id,
        // This will not be the final ID, since we do not know it at this point.
        // This needs to be set by the caller of save()
        certificationTargetId: "TODO",
        assuranceLevel: assuranceLevel,
      };

      //auditScopes = [...auditScopes, auditScope];
    } else {
      // Already exists -> remove it from the Audit Scope list
      /*data.auditScopes = data.auditScopes.filter(
        (auditScope) => auditScope.catalogId != catalog.id,
      );*/
    }
  }

  return (
    <ul className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2">
      {catalogs?.map((catalog) => (
        <li className="col-span-1 flex rounded-md shadow-sm">
          {(catalog.assuranceLevels?.length ??
          (0 > 0 && !selected.get(catalog.id))) ? (
            <AssuranceLevelPopover catalog={catalog}>
              <Button
                className={
                  selected.get(catalog.id)
                    ? ""
                    : "flex h-full w-[4.5rem] flex-shrink-0 items-center justify-center rounded-l-md bg-gray-400 text-sm text-white"
                }
              >
                {catalog.shortName}
              </Button>
            </AssuranceLevelPopover>
          ) : (
            <Button
              onClick={() => toggle(catalog)}
              className="{selected.get(catalog.id) ? '' : 'bg-gray-400'}
       flex w-[4.5rem] flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white"
            >
              {catalog.shortName}
            </Button>
          )}
          <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
            <div className="flex-1 truncate px-4 py-2 text-sm">
              <p className="font-medium text-gray-900 hover:text-gray-600">
                {catalog.name}
              </p>
              <p className="whitespace-normal text-xs text-gray-500">
                {catalog.description}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
