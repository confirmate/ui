'use client'

import { createAuditScope } from "@/actions/add-audit-scope";
import { SchemaCatalog } from "@/lib/api/orchestrator";
import Button from "../button";
import { useEffect, useState } from "react";

interface EnableCatalogButtonProps {
  certificationTargetId: string;
  leftOverCatalogs: SchemaCatalog[]
}

export default function EnableCatalogButton({ certificationTargetId, leftOverCatalogs }: EnableCatalogButtonProps) {
  const [catalog, setCatalog] = useState(leftOverCatalogs[0])
  const [assuranceLevel, setAssuranceLevel] = useState<string | undefined>()

  useEffect(() => {
    // Reset catalog if left over catalogs change
    setCatalog(leftOverCatalogs[0]);
  }, [leftOverCatalogs])

  return <li className="flex flex-col space-y-4 text-sm">
    <div>
      <div className="font-medium text-gray-900">Configure new audit scope</div>

      <div className="text-gray-500">Please select a catalog to create a new audit scope.</div>
    </div>
    <select
      className="
      mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10
     text-gray-900 
      ring-1 ring-inset ring-gray-300 focus:ring-2
    focus:ring-confirmate sm:text-sm sm:leading-6"
      defaultValue={catalog.id}
      onChange={(e) => {
        const catalog = leftOverCatalogs.find((catalog) => catalog.id === e.target.value);
        if (catalog) {
          setCatalog(catalog)
        }
      }}
    >
      {leftOverCatalogs.map((catalog) =>
        <option
          value={catalog.id}
          key={catalog.id}
        >
          {catalog.name}
        </option>
      )}
    </select>
    {catalog.assuranceLevels !== undefined &&
      catalog?.assuranceLevels.length > 0 &&
      <select
        className="
    mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10
   text-gray-900 
    ring-1 ring-inset ring-gray-300 focus:ring-2
  focus:ring-confirmate sm:text-sm sm:leading-6"
        value={assuranceLevel ?? catalog.assuranceLevels[0]}
        onChange={(e) => setAssuranceLevel(e.target.value)}
      >
        {catalog.assuranceLevels.map((level) =>
          <option
            value={level}
            key={level}
          >
            {level}
          </option>
        )}
      </select>
    }
    <div>
      <Button onClick={() => createAuditScope(certificationTargetId, catalog.id, assuranceLevel)}>Add</Button>
    </div>
  </li>;
}
