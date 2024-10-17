"use client";

import { classNames } from "@/lib/util";
import { ChevronDownIcon, ChevronUpIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useOptimistic, useState } from "react";
import Button from "../button";

interface ColumnWithSortProps {
    /**
     * The field this column is sorted by.
     */
    field: string

    /**
     * Whether this field should be sorted by as a default if no search params are present.
     */
    defaultField?: boolean

    /**
     * The text to display in the column header.
     */
    children: React.ReactNode
}

export default function ColumnWithSort({ field, defaultField, children }: ColumnWithSortProps) {
    const searchParams = useSearchParams();
    const [sortedBy, setSortedBy] = useState(searchParams.get("sortedBy"));
    const [order, setOrder] = useState(searchParams.get("order"));
    const [hasFilter, setHasFilter] = useState(false);
    const { replace } = useRouter();
    const pathname = usePathname();

    const sortField = (): void => {
        const params = new URLSearchParams(searchParams);

        if (sortedBy === field) {
            params.set("order", params.get("order") === "asc" ? "desc" : "asc");
        } else {
            params.set("order", "asc");
            params.set("sortedBy", field);
        }
        replace(`${pathname}?${params.toString()}`);
    };

    const clearFilter = (): void => {
        const params = new URLSearchParams(searchParams);
        params.delete(`filter.${field}`);
        replace(`${pathname}?${params.toString()}`);
    }

    useEffect(() => {
        setSortedBy(searchParams.get("sortedBy"));
        if (sortedBy == null && defaultField === true) {
            setSortedBy(field);
        }
        setOrder(searchParams.get("order"));
        setHasFilter(searchParams.has(`filter.${field}`));
    }, [searchParams])

    return (<div className="flex items-center">
        <div onClick={() => sortField()} className="cursor-pointer flex">
            {children}
            <span className={classNames("ml-2 flex-none rounded", sortedBy === field ? "bg-gray-100 text-gray-900 group-hover:bg-gray-200" : "collapse text-gray-400 group-hover:visible group-focus:visible")}>
                {order === "asc" ?
                    <ChevronUpIcon aria-hidden="true"
                        className={classNames("h-5 w-5", sortedBy === field ? "" : "collapse ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible")}
                    /> :
                    <ChevronDownIcon aria-hidden="true"
                        className={classNames("h-5 w-5", sortedBy === field ? "" : "collapse ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible")}
                    />}
            </span>
        </div>
        {hasFilter && <><Button onClick={() => clearFilter()} className="ml-2 text-normal text-xs px-1 py-0">Clear Filter</Button></>}
    </div>
    );
}
