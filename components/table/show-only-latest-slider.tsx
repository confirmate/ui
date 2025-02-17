"use client";

import { useSearchParamState } from "@/hooks/use-search-param-state";
import { Field, Label, Switch } from "@headlessui/react";

export default function ShowOnlyLatestSlider() {
  const [enabled, setEnabled] = useSearchParamState("latestByResource", true);

  return (
    <Field className="flex items-center font-normal pl-4">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-confirmate focus:ring-offset-2 data-[checked]:bg-confirmate"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
        />
      </Switch>
      <Label as="span" className="ml-3 text-sm">
        <span className="font-medium text-gray-500">Only latest</span>{" "}
        <span className="text-gray-400">(per resource and metric)</span>
      </Label>
    </Field>
  );
}
