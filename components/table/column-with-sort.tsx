"use client";

import { classNames } from "@/lib/util";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
    const { replace } = useRouter();
    const pathname = usePathname();

    const sortField = (field: string): void => {
        const params = new URLSearchParams(searchParams);

        if (sortedBy === field) {
            params.set("order", params.get("order") === "asc" ? "desc" : "asc");
        } else {
            params.set("order", "asc");
            params.set("sortedBy", field);
        }

        replace(`${pathname}?${params.toString()}`);
    };

    useEffect(() => {
        setSortedBy(searchParams.get("sortedBy"));
        if (sortedBy == null && defaultField === true) {
            setSortedBy(field);
        }
        setOrder(searchParams.get("order"));
    }, [searchParams])

    return (
        <a onClick={() => sortField(field)} className="group inline-flex cursor-pointer">
            {children}
            <span className={classNames("ml-2 flex-none rounded", sortedBy === field ? "bg-gray-100 text-gray-900 group-hover:bg-gray-200" : "invisible text-gray-400 group-hover:visible group-focus:visible")}>
                {order === "asc" ? <ChevronUpIcon aria-hidden="true" className={classNames("h-5 w-5", sortedBy === field ? "" : "invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible")} /> :
                    <ChevronDownIcon aria-hidden="true" className={classNames("h-5 w-5", sortedBy === field ? "" : "invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible")} />}
            </span>
        </a>
    );
}
