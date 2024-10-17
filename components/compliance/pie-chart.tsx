"use client";

import { Chart, ChartConfiguration, InteractionItem, registerables } from "chart.js";
import { useEffect, useRef } from "react";

interface PieChartProps<TData, TLabel> extends React.ButtonHTMLAttributes<HTMLCanvasElement> {
    config: ChartConfiguration<'doughnut', TData, TLabel>
    onSelectSegment?: ((items: InteractionItem[], chart: Chart<
        'doughnut',
        TData,
        TLabel
    >) => void)
}

Chart.register(...registerables)

export default function PieChart<TData, TLabel>({ config, onSelectSegment, ...rest }: PieChartProps<TData, TLabel>) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    let chart: Chart<'doughnut', TData, TLabel>;

    // This effect will be called when the component mounts for the first time
    useEffect(() => {
        if (canvasRef.current !== null) {
            chart = new Chart(canvasRef.current, config);
        }
    }, []);

    // This effect will be called when the component unmounts
    useEffect(() => {
        return () => {
            chart?.destroy();
        }
    }, [])

    function onClick(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        const res = chart.getElementsAtEventForMode(e.nativeEvent, 'nearest', { intersect: true }, true);

        if (onSelectSegment !== undefined) {
            onSelectSegment(res, chart);
        }
    }


    return <canvas ref={canvasRef} onClick={onClick} id="chart" {...rest} />
}