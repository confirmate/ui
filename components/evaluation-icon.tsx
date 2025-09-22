import { SchemaEvaluationResult } from "@/lib/api/evaluation";
import {
  CheckCircleIcon,
  EllipsisHorizontalCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

interface EvaluationIconProps {
  result: SchemaEvaluationResult;
  onPendingClick: () => void;
}

export default function EvaluationIcon({
  result,
  onPendingClick,
}: EvaluationIconProps) {
  switch (result.status) {
    case "EVALUATION_STATUS_COMPLIANT":
    case "EVALUATION_STATUS_COMPLIANT_MANUALLY":
      return (
        <Link
          href={`/targets-of-evaluation/${result.targetOfEvaluationId}/assessments?latestByResource=false${result.assessmentResultIds.map((id) => `&filter.id=${id}`).join("")}`}
        >
          <CheckCircleIcon className="h-5 w-5 text-green-800" />
        </Link>
      );
    case "EVALUATION_STATUS_NOT_COMPLIANT":
    case "EVALUATION_STATUS_NOT_COMPLIANT_MANUALLY":
      return (
        <Link
          href={`/targets-of-evaluation/${result.targetOfEvaluationId}/assessments?latestByResource=false${result.assessmentResultIds.map((id) => `&filter.id=${id}`).join("")}`}
        >
          <XCircleIcon className="h-5 w-5 text-red-800" />
        </Link>
      );
    case "EVALUATION_STATUS_PENDING":
      return (
        <EllipsisHorizontalCircleIcon
          className="h-5 w-5 text-gray-500"
          onClick={onPendingClick}
        />
      );
    default:
      return <></>;
  }
}
