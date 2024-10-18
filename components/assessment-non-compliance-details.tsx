"use client";

import { SchemaAssessmentResult } from "@/lib/api/orchestrator";
import DisplayValue from "@/components/display-value";
import DisplayOperator from "./display-operator";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { truncate } from "@/lib/util";
import { useEffect, useState } from "react";

interface AssessmentNonComplianceDetailsProps {
    result: SchemaAssessmentResult;
};

export default function AssessmentNonComplianceDetails({ result }: AssessmentNonComplianceDetailsProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [truncatedComment, setTruncatedComment] = useState("");
    const fullComment = result.nonComplianceComments;

    useEffect(() => {
        if (fullComment !== undefined) {
            setTruncatedComment(truncate(fullComment, 150))
        }
        setIsExpanded(fullComment === truncatedComment);
    }, [fullComment])

    // Check, if we have a (good) textual comment in result.nonComplianceComment
    if (result.nonComplianceComments !== undefined && result.nonComplianceComments !== "No comments so far") {
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
