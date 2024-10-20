"use client";

import ColumnWithSort from "@/components/table/column-with-sort";
import { SortDefaultProps } from "@/components/table/table";
import { useSearchParamState } from "@/hooks/use-search-param-state";
import { classNames } from "@/lib/util";

export interface HeaderColumnData {
    name: string
    field: string
    extra?: React.ReactNode
}

interface TableHeaderProps extends SortDefaultProps {
    columns: HeaderColumnData[]
}

/**
 * The table header. This is a client component.
 */
export function TableHeader({ columns, defaults }: TableHeaderProps) {
    const [sortedBy, setSortedBy] = useSearchParamState("sortedBy", defaults.sortedBy);
    const [direction, setDirection] = useSearchParamState("direction", defaults.direction);

    const sortField = (field: string): void => {
        if (sortedBy === field) {
            setDirection(direction === "asc" ? "desc" : "asc");
        } else {
            setSortedBy(field);
        }
    };

    return <thead className="bg-gray-50">
        <tr>
            {columns.map((column, idx) =>
                <th key={column.field} scope="col" className={classNames("py-3.5 pr-3 text-left text-sm font-semibold text-gray-900", idx == 0 ? "pl-4" : "")}>
                    <div className="flex flex-row">
                        <ColumnWithSort
                            field={column.field}
                            onChangeSort={sortField}
                            sortedBy={sortedBy}
                            direction={direction}
                        >
                            {column.name}
                        </ColumnWithSort>
                        {column.extra}
                    </div>
                </th>
            )}
        </tr>
    </thead>
}