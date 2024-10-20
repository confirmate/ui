import { GenerationRequestResponse } from "@/lib/api/csaf-generator";
import { SchemaMetric } from "@/lib/api/orchestrator";
import Link from "next/link";
import FormattedDate from "../formatted-date";
import DeleteSecurityAdvisoryButton from "./delete-security-advisory-button";

interface SecurityAdvisoryTableRowProps {
  response: GenerationRequestResponse;
  metric?: SchemaMetric;
}

export default function SecurityAdvisoryTableRow({
  response,
  metric,
}: SecurityAdvisoryTableRowProps) {
  return (
    <tr>
      <td className="text-wrap px-4 py-4 text-sm text-gray-900 max-w-xl align-top">
        <Link
          href={`/certification-targets/${response.certificationTargetId}/advisories/${response.id}`}
        >
          {response.title}
        </Link>
      </td>
      <td className="text-wrap py-4 text-sm text-gray-500 max-w-xl align-top">
        <div className="space-y-2">
          <div>
            <div className="font-medium text-gray-900">{metric?.name}</div>
            <div className="mt-1 text-gray-500">{metric?.description}</div>
          </div>
          <div>
            <Link
              href={`/certification-targets/${response.certificationTargetId}/assessments?filter.id=${response.assessmentId}`}
            >
              View Assessment Result
            </Link>
          </div>
        </div>
      </td>
      <td className="text-wrap py-4 text-sm text-gray-500 max-w-xl align-top">
        {response.createdAt ? (
          <FormattedDate value={response.createdAt} format="short-date-time" />
        ) : (
          "Pending"
        )}
      </td>
      <div className="text-wrap py-4 text-sm text-gray-500 max-w-xl align-top">
        <DeleteSecurityAdvisoryButton response={response} />
      </div>
    </tr>
  );
}
