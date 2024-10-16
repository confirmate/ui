import { SchemaAssessmentResult } from "@/lib/api/orchestrator";
import DisplayValue from "@/components/display-value";
import DisplayOperator from "./display-operator";

interface AssessmentNonComplianceDetailsProps {
    result: SchemaAssessmentResult;
};

export default function AssessmentNonComplianceDetails({ result }: AssessmentNonComplianceDetailsProps) {
    // Check, if we have a (good) textual comment in result.nonComplianceComment
    // If yes - return it as a text
    if (result.nonComplianceComments !== undefined && result.nonComplianceComments !== "No comments so far") {
        return <>{result.nonComplianceComments}</>
    } else {
        return <>
            {result.nonComplianceDetails?.map((detail, idx) =>
                <div className="pb-2" key={idx}>
                    <div className="font-medium text-gray-900">{detail.property}</div>
                    <div className="mt-1 text-gray-500">
                        <DisplayValue value={detail.value} />{" "}
                        <DisplayOperator op={detail.operator!!} negate={true} />{" target value "}
                        <DisplayValue value={detail.targetValue} />
                    </div>
                </div>
            )}
        </>
    }
}