"use client";

import DisplayValue from "@/components/display-value";
import { SchemaAssessmentResult } from "@/lib/api/orchestrator";
import { truncate } from "@/lib/util";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import DisplayOperator from "./display-operator";

interface AssessmentNonComplianceDetailsProps {
  result: SchemaAssessmentResult;
}

export default function AssessmentNonComplianceDetails({
  result,
}: AssessmentNonComplianceDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [truncatedComment, setTruncatedComment] = useState("");

  useEffect(() => {
    if (result.complianceComment !== undefined) {
      setTruncatedComment(truncate(result.complianceComment, 150));
    }
    setIsExpanded(result.complianceComment === truncatedComment);
  }, [result]);

  return (
    <>
      {isExpanded ? (
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {result.complianceComment || ""}
          </ReactMarkdown>
        </div>
      ) : (
        <div className="flex items-start">
          <div className="prose prose-sm max-w-none inline">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {truncatedComment}
            </ReactMarkdown>
          </div>{" "}
          <button
            className="ml-2 text-sm font-medium text-white bg-gray-400 rounded hover:bg-gray-600 transition duration-300 ease-in-out flex-shrink-0"
            onClick={() => setIsExpanded(true)}
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      )}
      {result.complianceDetails?.map((detail, idx) => (
        <div key={idx}>
          <div className="font-medium text-gray-900">{detail.property}</div>
          <div className="mt-1 text-gray-500">
            <DisplayValue value={detail.value} />{" "}
            <DisplayOperator op={detail.operator!!} negate={!detail.success} />
            {" target value "}
            <DisplayValue value={detail.targetValue} />
          </div>
        </div>
      ))}
    </>
  );
}
