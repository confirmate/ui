"use client";

import { createSecurityAdvisory } from "@/actions/create-security-advisory";
import Button from "@/components/button";
import { GenerationRequestResponse } from "@/lib/api/csaf-generator";
import { SchemaAssessmentResult } from "@/lib/api/orchestrator";
import Link from "next/link";
import { useEffect, useState } from "react";

interface AdvisoryHelperProps {
  requests: GenerationRequestResponse[];
  result: SchemaAssessmentResult;
}

export default function AdvisoryHelper({
  requests,
  result,
}: AdvisoryHelperProps) {
  const [advisory, setAdvisory] = useState<GenerationRequestResponse>();

  useEffect(() => {
    setAdvisory(requests.find((req) => req.metricId === result.metricId!!));
  }, [result, requests]);

  return (
    <div className="space-x-2">
      {advisory !== undefined ? (
        <Link
          href={`/certification-targets/${result.certificationTargetId}/advisories/${advisory.id}`}
        >
          <Button className="bg-gray-800 hover:bg-gray-600 text-xs">
            Advisory Exists
          </Button>
        </Link>
      ) : (
        <Button
          onClick={() => createSecurityAdvisory(result)}
          className="text-xs"
        >
          Create Security Advisory
        </Button>
      )}
    </div>
  );
}
