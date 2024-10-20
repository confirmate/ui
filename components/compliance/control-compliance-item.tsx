import { SchemaAssessmentResult, SchemaControl } from "@/lib/api/orchestrator";

interface ControlComplianceItemProps {
  result: SchemaAssessmentResult;
  control: SchemaControl;
}

export function ControlComplianceItem({
  result,
  control,
}: ControlComplianceItemProps) {
  return <></>;
}
