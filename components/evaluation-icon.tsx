import { SchemaEvaluationResult } from "@/lib/api/evaluation";
import {
  CheckCircleIcon,
  EllipsisHorizontalCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

interface EvaluationIconProps {
  result: SchemaEvaluationResult;
}

export default function EvaluationIcon({ result }: EvaluationIconProps) {
  switch (result.status) {
    case "EVALUATION_STATUS_COMPLIANT":
    case "EVALUATION_STATUS_COMPLIANT_MANUALLY":
      return <CheckCircleIcon className="h-5 w-5 text-green-800" />;
    case "EVALUATION_STATUS_NOT_COMPLIANT":
    case "EVALUATION_STATUS_NOT_COMPLIANT_MANUALLY":
      return <XCircleIcon className="mr-2 h-5 w-5 text-red-800" />;
    case "EVALUATION_STATUS_PENDING":
      return (
        <EllipsisHorizontalCircleIcon className="mr-2 h-5 w-5 text-gray-500" />
      );
    default:
      return <></>;
  }
}
