"use client";

import { SchemaEvaluationResult } from "@/lib/api/evaluation";
import { SchemaControl } from "@/lib/api/orchestrator";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import EvaluationIcon from "../evaluation-icon";

export interface TreeItemData {
  result: SchemaEvaluationResult;
  children: SchemaEvaluationResult[];
}

interface ControlComplianceItemProps {
  result: SchemaEvaluationResult;
  control?: SchemaControl;
}

interface ControlComplianceItemsProps {
  item: TreeItemData;
  controls: SchemaControl[];
}

export function ControlComplianceItems({
  item,
  controls,
}: ControlComplianceItemsProps) {
  return (
    <Disclosure as="div" className="px-4 py-4" key={item.result.controlId}>
      {({ open }) => (
        <dt>
          <div className="flex w-full items-start justify-between text-left text-gray-900">
            <ControlComplianceItem
              result={item.result}
              control={controls.find(
                (control) => control.id === item.result.controlId,
              )}
            />
            <DisclosureButton>
              <ChevronDownIcon
                className={clsx("h-5 w-5", open && "rotate-180")}
              />
            </DisclosureButton>
          </div>
          <DisclosurePanel as="dd" className="mt-2 pr-12">
            {item.children.map((child) => (
              <div className="ml-12 mt-6" key={child.controlId}>
                <ControlComplianceItem
                  result={child}
                  control={controls.find(
                    (control) => control.id === item.result.controlId,
                  )}
                />
              </div>
            ))}
          </DisclosurePanel>
        </dt>
      )}
    </Disclosure>
  );
}

export function ControlComplianceItem({
  result,
  control,
}: ControlComplianceItemProps) {
  return (
    <div className="flex">
      <div className="mr-4 flex-shrink-0">
        <EvaluationIcon result={result} />
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
