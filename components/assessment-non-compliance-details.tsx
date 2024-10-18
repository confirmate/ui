"use client";

import { SchemaAssessmentResult } from "@/lib/api/orchestrator";
import DisplayValue from "@/components/display-value";
import DisplayOperator from "./display-operator";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { truncate } from "@/lib/util";
import { useState } from "react";

interface AssessmentNonComplianceDetailsProps {
    result: SchemaAssessmentResult;
};

export default function AssessmentNonComplianceDetails({ result }: AssessmentNonComplianceDetailsProps) {
    // Check, if we have a (good) textual comment in result.nonComplianceComment
    // If yes - return it as a text, truncated to 400 chars and with expand button
    if (result.nonComplianceComments !== undefined && result.nonComplianceComments !== "No comments so far") {
        const fullComment = result.nonComplianceComments;
        const truncatedComment = truncate(fullComment, 150)
        const [isExpanded, setIsExpanded] = useState(fullComment === truncatedComment);

        return (
            <div className="text-wrap">
                {isExpanded && fullComment !== truncatedComment ? (
                    <p>{fullComment}</p>
                ) : <>
                    <p>{truncatedComment} <button
                        className="ml-2 text-sm font-medium text-white bg-gray-400 rounded hover:bg-gray-600 transition duration-300 ease-in-out"
                        onClick={() => setIsExpanded(true)}
                    >
                        <ChevronRightIcon className="w-4 h-4" />
                    </button></p>

                </>}
            </div>
        );
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
