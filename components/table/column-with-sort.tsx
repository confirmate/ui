"use client";

import { classNames } from "@/lib/util";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

interface ColumnWithSortProps {
  /**
   * The field this column is sorted by.
   */
  field: string;

  /**
   * The text to display in the column header.
   */
  children: React.ReactNode;

  /**
   * The field which is currently the sorted one.
   */
  sortedBy: string;

  /**
   * The sort direction.
   */
  direction: "asc" | "desc";

  /**
   * Callback that is triggered when the sorting changes.
   * @param field the field that is being sorted
   */
  onChangeSort: (field: string) => void;
}

export default function ColumnWithSort({
  field,
  sortedBy,
  direction,
  onChangeSort,
  children,
}: ColumnWithSortProps) {
  return (
    <div className="flex items-center">
      <div onClick={() => onChangeSort(field)} className="cursor-pointer flex">
        {children}
        <span
          className={classNames(
            "ml-2 flex-none rounded",
            sortedBy === field
              ? "bg-gray-100 text-gray-900 group-hover:bg-gray-200"
              : "invisible text-gray-400 group-hover:visible group-focus:visible",
          )}
        >
          {direction === "asc" ? (
            <ChevronUpIcon
              aria-hidden="true"
              className={classNames(
                "h-5 w-5",
                sortedBy === field
                  ? ""
                  : "invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible",
              )}
            />
          ) : (
            <ChevronDownIcon
              aria-hidden="true"
              className={classNames(
                "h-5 w-5",
                sortedBy === field
                  ? ""
                  : "invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible",
              )}
            />
          )}
        </span>
      </div>
    </div>
  );
}
