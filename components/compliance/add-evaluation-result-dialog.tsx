"use client";

import { addEvaluationResult } from "@/actions/add-evaluation-result";
import { SchemaAuditScope, SchemaControl } from "@/lib/api/orchestrator";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
import ComplianceStatusSelect from "./compliance-status-select";

interface AddEvaluationResultDialogProps {
  control: SchemaControl;
  scope: SchemaAuditScope;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function AddEvaluationResultDialog({
  control,
  open,
  scope,
  setOpen,
}: AddEvaluationResultDialogProps) {
  return (
    <Dialog open={open} className="relative z-10" onClose={setOpen}>
      <DialogBackdrop
        transition
        className="fixed w-full h-full top-0 left-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
          >
            <form
              action={async (e) => {
                const res = await addEvaluationResult(e, control, scope);
                console.log(res);
                setOpen(false);
              }}
            >
              <div>
                <div className="space-y-12">
                  <div className="">
                    <DialogTitle className="text-base font-semibold leading-7 text-gray-900">
                      Provide a manual evaluation result for {control?.name}
                    </DialogTitle>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Using this form, you can provide a manual evaluation
                      result that will be considered as{" "}
                      <ComplianceStatusSelect />
                    </p>
                    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-confirmate sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="about"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Comment
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="about"
                            name="about"
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-confirmate sm:text-sm sm:leading-6"
                          />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">
                          Please consider that an auditor will judge the
                          fulfillment of this control based on your comment.
                        </p>
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="validity"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Validity
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-confirmate sm:text-sm sm:leading-6"
                            value="1 month"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-confirmate px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-confirmate-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-confirmate sm:col-start-2"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
