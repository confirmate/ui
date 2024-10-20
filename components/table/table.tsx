import { Card } from "../card";

export interface SortDefaults {
  /**
   * The field that should be sorted by as a default if no search params are present.
   */
  sortedBy: string;

  /**
   * The default direction that should be sorted if no search params are present.
   */
  direction: "asc" | "desc";
}

export interface SortDefaultProps {
  /**
   * The defaults to apply when sorting.
   */
  defaults: SortDefaults;
}

interface TableProps {
  /**
   * The content of the table.
   */
  children: React.ReactNode;
}

interface TableBodyProps {
  /**
   * The content of the table body.
   */
  children: React.ReactNode;
}

export function Table({ children }: TableProps) {
  return (
    <Card>
      <table className="min-w-full divide-y divide-gray-300 table-fixed">
        {children}
      </table>
    </Card>
  );
}

export function TableBody({ children }: TableBodyProps) {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>
  );
}
