"use client";

import { removeAuditScope } from "@/actions/remove-audit-scope";
import Button from "@/components/button";
import { SchemaAuditScope } from "@/lib/api/orchestrator";
import { TrashIcon } from "@heroicons/react/20/solid";

interface RemoveAuditScopeButtonProps {
  scope: SchemaAuditScope;
}

export function RemoveAuditScopeButton({ scope }: RemoveAuditScopeButtonProps) {
  return (
    <Button
      className="bg-red-800 hover:bg-red-700"
      onClick={() => {
        const really = confirm(
          "Do you really want to remove this audit scope?",
        );

        if (!really) {
          return;
        }

        removeAuditScope(scope);
      }}
    >
      <TrashIcon className="h-4 w-4" />
    </Button>
  );
}
