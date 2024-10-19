"use client";

import { usePolling } from "@/hooks/use-polling";

interface TableRefresherProps {
    ms: number
}

export default function TableRefresher({ ms }: TableRefresherProps) {
    usePolling(ms);
    return <></>
}