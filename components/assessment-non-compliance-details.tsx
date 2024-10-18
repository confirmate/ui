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

    useEffect(() => {
        if (result.complianceComment !== undefined) {
            setTruncatedComment(truncate(result.complianceComment, 150))
        }
        setIsExpanded(result.complianceComment === truncatedComment);
    }, [result])

    return <>
        {isExpanded ?
            <p>{result.complianceComment}</p>
            :
            <p>{truncatedComment} <button
                className="ml-2 text-sm font-medium text-white bg-gray-400 rounded hover:bg-gray-600 transition duration-300 ease-in-out"
                onClick={() => setIsExpanded(true)}
            >
                <ChevronRightIcon className="w-4 h-4" />
            </button>
            </p>
        }
        {result.complianceDetails?.map((detail, idx) =>
            <div className="pt-2" key={idx}>
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
