"use client";

import { ComplianceStatus } from "@/lib/api/evaluation";
import { SchemaAuditScope } from "@/lib/api/orchestrator";
import { useEffect, useRef, useState } from "react";
import CheckboxInput from "../checkbox-input";
import { Chart, type ChartConfiguration, type ChartData } from 'chart.js/auto';

interface ComplianceChartProps {
    scope: SchemaAuditScope;
    compliance: Map<string, ComplianceStatus>;
}

export default function ComplianceChart({ scope, compliance }: ComplianceChartProps) {
    function buildData(merge: boolean): ChartData<'doughnut', { status: string[]; num: number }[]> {
        if (merge) {
            return {
                labels: ['Non Compliant', 'Compliant', 'Waiting for Data'],
                datasets: [
                    {
                        label: scope.catalogId,
                        data: [
                            filter([
                                'EVALUATION_STATUS_NOT_COMPLIANT',
                                'EVALUATION_STATUS_NOT_COMPLIANT_MANUALLY'
                            ]),
                            filter(['EVALUATION_STATUS_COMPLIANT', 'EVALUATION_STATUS_COMPLIANT_MANUALLY']),
                            filter(['EVALUATION_STATUS_PENDING'])
                        ],
                        backgroundColor: ['#991b1b', '#166534', '#d4d4d4'],
                        hoverOffset: 4
                    }
                ]
            };
        } else {
            return {
                labels: [
                    'Non Compliant',
                    'Manually set to Non Compliant',
                    'Compliant',
                    'Manually set to Compliant',
                    'Waiting for Data'
                ],
                datasets: [
                    {
                        label: scope.catalogId,
                        data: [
                            filter(['EVALUATION_STATUS_NOT_COMPLIANT']),
                            filter(['EVALUATION_STATUS_NOT_COMPLIANT_MANUALLY']),
                            filter(['EVALUATION_STATUS_COMPLIANT']),
                            filter(['EVALUATION_STATUS_COMPLIANT_MANUALLY']),
                            filter(['EVALUATION_STATUS_PENDING'])
                        ],
                        backgroundColor: ['#991b1b', 'rgb(185 28 28)', '#166534', 'rgb(21 128 61)', '#d4d4d4'],
                        hoverOffset: 4
                    }
                ]
            };
        }
    }

    function filter(status: string[]) {
        return {
            status: status,
            num: Array.from(compliance.values()).filter((value) => status.includes(value)).length
        };
    }

    const [isMerged, setMerged] = useState(false);
    const [chartData, setChartData] = useState({
    })

    const canvasRef = useRef<HTMLCanvasElement>(null)
    let chart: Chart<'doughnut', { status: string[]; num: number }[]>;

    let config: ChartConfiguration<'doughnut', { status: string[]; num: number }[]> = {
        type: 'doughnut',
        data: buildData(isMerged),
        options: {
            parsing: {
                key: 'num'
            },
            animation: false,
            plugins: {
                tooltip: {
                    titleFont: {
                        family: 'InterVariable'
                    },
                    bodyFont: {
                        family: 'InterVariable'
                    },
                    footerFont: {
                        family: 'InterVariable'
                    }
                },
                legend: {
                    display: false,
                    labels: {
                        font: {
                            family: 'InterVariable'
                        }
                    }
                }
            }
        }
    };

    useEffect(() => {
        if (canvasRef.current !== null) {
            chart = new Chart(canvasRef.current, config);
        }
    }, []);

    return <div className="py-3">
        <div className="relative mb-2 flex items-start">
            <div className="flex h-6 items-center">
                <CheckboxInput name={`merge-{scope.catalogId}`} checked={isMerged}
                    onChange={() => setMerged(!isMerged)}>
                    Merge manual results
                    <span className="text-gray-500">
                        <span className="sr-only">Merge manual results </span>
                        with automatic results.
                    </span>
                </CheckboxInput>
            </div>
            <canvas ref={canvasRef} id="chart" className="ml-auto mr-auto h-72 w-72" />
        </div>
    </div>
}