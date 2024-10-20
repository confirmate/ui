"use client";

import { ComplianceStatus } from "@/lib/api/evaluation";
import { SchemaAuditScope } from "@/lib/api/orchestrator";
import {
  Chart,
  InteractionItem,
  type ChartConfiguration,
  type ChartData,
} from "chart.js/auto";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PieChart from "./pie-chart";

interface ComplianceChartProps {
  scope: SchemaAuditScope;
  compliance: Map<string, ComplianceStatus>;
}

type ComplianceChartData = { status: string[]; num: number }[];

export default function ComplianceChart({
  scope,
  compliance,
}: ComplianceChartProps) {
  const router = useRouter();
  function buildData(
    merge: boolean,
  ): ChartData<"doughnut", ComplianceChartData> {
    if (merge) {
      return {
        labels: ["Non Compliant", "Compliant", "Waiting for Data"],
        datasets: [
          {
            label: scope.catalogId,
            data: [
              histogram([
                "EVALUATION_STATUS_NOT_COMPLIANT",
                "EVALUATION_STATUS_NOT_COMPLIANT_MANUALLY",
              ]),
              histogram([
                "EVALUATION_STATUS_COMPLIANT",
                "EVALUATION_STATUS_COMPLIANT_MANUALLY",
              ]),
              histogram(["EVALUATION_STATUS_PENDING"]),
            ],
            backgroundColor: ["#991b1b", "#166534", "#d4d4d4"],
            hoverOffset: 4,
          },
        ],
      };
    } else {
      return {
        labels: [
          "Non Compliant",
          "Manually set to Non Compliant",
          "Compliant",
          "Manually set to Compliant",
          "Waiting for Data",
        ],
        datasets: [
          {
            label: scope.catalogId,
            data: [
              histogram(["EVALUATION_STATUS_NOT_COMPLIANT"]),
              histogram(["EVALUATION_STATUS_NOT_COMPLIANT_MANUALLY"]),
              histogram(["EVALUATION_STATUS_COMPLIANT"]),
              histogram(["EVALUATION_STATUS_COMPLIANT_MANUALLY"]),
              histogram(["EVALUATION_STATUS_PENDING"]),
            ],
            backgroundColor: [
              "#991b1b",
              "rgb(185 28 28)",
              "#166534",
              "rgb(21 128 61)",
              "#d4d4d4",
            ],
            hoverOffset: 4,
          },
        ],
      };
    }
  }

  function histogram(status: string[]) {
    return {
      status: status,
      num: Array.from(compliance.values()).filter((value) =>
        status.includes(value),
      ).length,
    };
  }

  function selectSegment(
    items: InteractionItem[],
    chart: Chart<"doughnut", ComplianceChartData>,
  ) {
    if (items.length === 0) {
      return;
    } else {
      const data = chart.data.datasets[0].data[items[0].index];
      const params = new URLSearchParams();

      for (const s of data.status) {
        params.append("status", s);
      }

      router.push(
        `/certification-targets/${scope.certificationTargetId}/compliance/${scope.catalogId}?${params.toString()}`,
      );
    }
  }

  const [isMerged, setMerged] = useState(false);
  const [config, setConfig] = useState<
    ChartConfiguration<"doughnut", ComplianceChartData>
  >({
    type: "doughnut",
    data: buildData(isMerged),
    options: {
      parsing: {
        key: "num",
      },
      animation: false,
      plugins: {
        tooltip: {
          titleFont: {
            family: "inter",
          },
          bodyFont: {
            family: "inter",
          },
          footerFont: {
            family: "inter",
          },
        },
        legend: {
          display: false,
          labels: {
            font: {
              family: "inter",
            },
          },
        },
      },
    },
  });

  return (
    <div className="py-3">
      <div className="relative mb-2 flex flex-col items-start space-y-2">
        <div className="flex h-6 items-center">
          {/*<CheckboxInput
            name={`merge-{scope.catalogId}`}
            checked={isMerged}
            onChange={() => setMerged(!isMerged)}
          >
            <span className="font-medium">Merge manual results </span>
            <span className="text-gray-500">
              <span className="sr-only">Merge manual results </span>
              with automatic results.
            </span>
          </CheckboxInput>*/}
        </div>
        <PieChart
          config={config}
          onSelectSegment={selectSegment}
          className="ml-auto mr-auto h-72 w-72"
        />
      </div>
    </div>
  );
}
