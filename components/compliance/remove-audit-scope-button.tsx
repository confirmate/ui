"use client";

import {TrashIcon} from "@heroicons/react/20/solid";
import Button from "@/components/button";
import {SchemaAuditScope} from "@/lib/api/orchestrator";
import {removeAuditScope} from "@/actions/remove-audit-scope";

interface RemoveAuditScopeButtonProps {
    scope: SchemaAuditScope;
}

export function RemoveAuditScopeButton({scope}: RemoveAuditScopeButtonProps) {
    return <Button className="bg-red-800 hover:bg-red-700" onClick={() => {
        let really = confirm('Do you really want to remove this target of evaluation?');

        if (!really) {
            return;
        }

        removeAuditScope(scope)
    }}>
        <TrashIcon className="h-4 w-4" />
    </Button>
}