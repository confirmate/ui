'use client'

import { addTR } from "@/actions/add-audit-scope";
import { SchemaCatalog } from "@/lib/api/orchestrator";
import Button from "../button";
import { useState } from "react";

interface EnableCatalogButtonProps {
  certificationTargetId: string;
  leftOverCatalogs: SchemaCatalog[]
}

export default function EnableCatalogButton({ certificationTargetId, leftOverCatalogs }: EnableCatalogButtonProps) {
  const [catalogId, setCatalogId] = useState(leftOverCatalogs[0].id)

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
      value={catalogId}
      onChange={(e) => { setCatalogId(e.target.value) }}
    >
      {leftOverCatalogs.map((catalog) =>
        <option
          value={catalog.id}
          key={catalog.id}
        >{catalog.name}</option>
      )}
    </select>
    <div>
      <Button onClick={() => addTR(certificationTargetId, catalogId)}>Add</Button>
    </div>
  </li>;
}
