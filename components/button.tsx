import { classNames } from "@/lib/util";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * A standard button.
 */
export default function Button({
  type = "button",
  disabled,
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={classNames(
        disabled ? "bg-gray-500" : "bg-confirmate hover:bg-confirmate-light",
        "rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-confirmate",
        className ?? "",
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
