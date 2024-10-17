'use client'

import { addTR } from "@/actions/add-audit-scope";

interface EnableCatalogButtonProps {
  certificationTargetId: string;
}

export default function EnableCatalogButton({ certificationTargetId }: EnableCatalogButtonProps) {
  return <><button onClick={() => addTR(certificationTargetId)}>Add</button></>;
}
