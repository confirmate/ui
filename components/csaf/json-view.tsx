"use client";

import Button from "@/components/button";
import { classNames } from "@/lib/util";
import { useState } from "react";

interface JsonViewProps {
  json: any;
}

export default function JsonView({ json }: JsonViewProps) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button onClick={() => setShow(!show)}>
        {show ? "Hide" : "Show"} JSON
      </Button>
      <pre
        className={classNames("text-xs border-t pt-4", show ? "" : "hidden")}
      >
        {JSON.stringify(json, null, 2)}
      </pre>
    </>
  );
}
