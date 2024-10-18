'use client'

import { addTR } from "@/actions/add-audit-scope";

interface EnableCatalogButtonProps {
  certificationTargetId: string;
}

export default function EnableCatalogButton({ certificationTargetId }: EnableCatalogButtonProps) {
  return <><button onClick={() => { const catalogId = prompt('Enter catalog ID', "TR-03183"); if (catalogId !== null) { addTR(certificationTargetId, catalogId) } }}>Add</button></>;
}
