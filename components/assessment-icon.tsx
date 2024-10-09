import { SchemaAssessmentResult } from "@/lib/api/orchestrator";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

interface AssessmentIconProps {
  result: SchemaAssessmentResult;
}

export default function AssessmentIcon({ result }: AssessmentIconProps) {
  return result.compliant ? (
    <CheckCircleIcon className="mr-2 h-5 w-5 text-green-800" />
  ) : (
    <XCircleIcon className="mr-2 h-5 w-5 text-red-800" />
  );
}
