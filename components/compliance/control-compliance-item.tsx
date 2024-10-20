"use client";

import { SchemaEvaluationResult } from "@/lib/api/evaluation";
import { SchemaAuditScope, SchemaControl } from "@/lib/api/orchestrator";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";
import EvaluationIcon from "../evaluation-icon";
import { AddEvaluationResultDialog } from "./add-evaluation-result-dialog";

export interface TreeItemData {
  result: SchemaEvaluationResult;
  children: SchemaEvaluationResult[];
}

interface ControlComplianceItemProps {
  result: SchemaEvaluationResult;
  control?: SchemaControl;
  onPendingClick: (control?: SchemaControl) => void;
}

interface ControlComplianceItemsProps {
  item: TreeItemData;
  controls: SchemaControl[];
  scope: SchemaAuditScope;
}

export function ControlComplianceItems({
  item,
  controls,
  scope,
}: ControlComplianceItemsProps) {
  const [control, setControl] = useState<SchemaControl | undefined>();
  const [open, setOpen] = useState<boolean>(false);

  function showDialog(control?: SchemaControl) {
    setControl(control);
    setOpen(true);
  }

  return (
    <>
      {control && (
        <AddEvaluationResultDialog
          control={control}
          open={open}
          setOpen={setOpen}
          scope={scope}
        />
      )}
      <Disclosure as="div" className="px-4 py-4" key={item.result.controlId}>
        {({ open }) => (
          <dt>
            <div className="flex w-full items-start justify-between text-left text-gray-900">
              <ControlComplianceItem
                result={item.result}
                control={controls.find(
                  (control) => control.id === item.result.controlId,
                )}
                onPendingClick={showDialog}
              />
              <DisclosureButton>
                <ChevronDownIcon
                  className={clsx("h-5 w-5", open && "rotate-180")}
                />
              </DisclosureButton>
            </div>
            <DisclosurePanel className="mt-2 pr-12">
              {item.children.map((child) => (
                <div className="ml-12 mt-6" key={child.controlId}>
                  <ControlComplianceItem
                    result={child}
                    control={controls.find(
                      (control) => control.id === child.controlId,
                    )}
                    onPendingClick={showDialog}
                  />
                </div>
              ))}
            </DisclosurePanel>
          </dt>
        )}
      </Disclosure>
    </>
  );
}

export function ControlComplianceItem({
  result,
  control,
  onPendingClick,
}: ControlComplianceItemProps) {
  return (
    <div className="flex">
      <div className="mr-4 flex-shrink-0">
        <EvaluationIcon
          result={result}
          onPendingClick={() => onPendingClick(control)}
        />
      </div>
      <div>
        <h4 className="text-base font-semibold">
          {control?.parentControlId === undefined ? (
            <DisclosureButton>
              {result.controlId}: {control?.name}
            </DisclosureButton>
          ) : (
            <>
              {result.controlId} : {control?.name}
            </>
          )}
        </h4>
        <p className="mt-1 text-sm text-gray-500">{control?.description}</p>
      </div>
    </div>
  );
}
