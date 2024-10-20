import Button from "@/components/button";
import { MouseEventHandler } from "react";

interface HeaderProps {
  name: string;
  buttons?: boolean;
  icon?: string | false;
  remove?: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}
export default function Header({
  name,
  buttons = true,
  icon = "",
  children,
  remove,
}: HeaderProps) {
  return (
    <div className="md:flex md:items-center md:justify-between md:space-x-5">
      <div className="flex items-start space-x-5">
        {icon !== false && (
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                className="h-16 w-16 rounded-full"
                src="https://images.unsplash.com/photo-1499346030926-9a72daac6c63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt=""
              />

              <span
                className="absolute inset-0 rounded-full shadow-inner"
                aria-hidden="true"
              />
            </div>
          </div>
        )}
        <div className="pt-1.5">
          {name != "" ? (
            <h1 className="text-2xl font-semibold text-gray-900">{name}</h1>
          ) : (
            <h1 className="text-2xl font-semibold text-gray-400">
              Enter a service name
            </h1>
          )}
          <p className="text-sm font-medium text-gray-500 pt-1">{children}</p>
        </div>
      </div>
      <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
        {buttons && (
          <>
            <Button
              onClick={remove}
              className="bg-red-800 hover:bg-red-700"
              disabled
            >
              Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
