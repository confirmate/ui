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
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-sm border border-gray-200 ring-black sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300 table-fixed">
              {children}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TableBody({ children }: TableBodyProps) {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>
  );
}
