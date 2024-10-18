"use client";

import { useSearchParamState } from "@/hooks/use-search-param-state";
import ColumnWithSort from "./column-with-sort";
import ShowOnlyLatestSlider from "./show-only-latest-slider";
import { Field, Switch, Label } from "@headlessui/react";
import { useEffect, useState } from "react";

interface SortableTableHeaderProps {
    /**
     * The field that should be sorted by as a default if no search params are present.
     */
    defaultSortedBy: string

    /**
     * The default direction that should be sorted if no search params are present.
     */
    defaultDirection: "asc" | "desc"
}

export default function SortableTableHeader({ defaultSortedBy, defaultDirection }: SortableTableHeaderProps) {
    const [sortedBy, setSortedBy] = useSearchParamState("sortedBy", defaultSortedBy);
    const [direction, setDirection] = useSearchParamState("direction", defaultDirection);

    const sortField = (field: string): void => {
        if (sortedBy === field) {
            setDirection(direction === "asc" ? "desc" : "asc");
        } else {
            setSortedBy(field);
        }
    };

    return <thead className="bg-gray-50">
        <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                <div className="flex flex-row">
                    <ColumnWithSort
                        field="metric_id"
                        onChangeSort={sortField}
                        sortedBy={sortedBy}
                        direction={direction}
                    >
                        Metric
                    </ColumnWithSort>
                    <ShowOnlyLatestSlider />
                </div>
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                <ColumnWithSort
                    field="compliance_comment"
                    onChangeSort={sortField}
                    sortedBy={sortedBy}
                    direction={direction}
                >
                    Details
                </ColumnWithSort>
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                <ColumnWithSort
                    field="resource_id"
                    onChangeSort={sortField}
                    sortedBy={sortedBy}
                    direction={direction}
                >
                    Resource
                </ColumnWithSort>
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-90">
                <ColumnWithSort
                    field="timestamp"
                    onChangeSort={sortField}
                    sortedBy={sortedBy}
                    direction={direction}
                >
                    Timestamp
                </ColumnWithSort>
            </th>
        </tr>
    </thead>
}