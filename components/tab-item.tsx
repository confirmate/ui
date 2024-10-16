import { icons } from "@/components/icons";
import { classNames } from "@/lib/util";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface TabItemData {
  name: string;
  icon?: string;
  href: string;
  disabled?: boolean;
}

interface TabItemProps {
  /**
   * The data for this tab item.
   */
  item: TabItemData;

  mobile?: boolean;
}

export default function TabItem({ item, mobile }: TabItemProps) {
  const pathname = usePathname();
  const current = pathname.startsWith(item.href);
  const Icon = icons.get(item.icon ?? "");

  if (mobile) {
    return (
      <option value={item.href} disabled={item.disabled}>
        {item.name}
      </option>
    );
  } else if (item.disabled) {
    return (
      <span className="group inline-flex cursor-default items-center border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-400">
        {Icon && (
          <Icon
            className="-ml-0.5 mr-2 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        )}
        <span>{item.name}</span>
      </span>
    );
  } else {
    return (
      <Link
        href={item.href}
        className={classNames(
          current
            ? "border-confirmate text-confirmate"
            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
          "group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium",
        )}
        aria-current={current ? "page" : undefined}
      >
        {Icon && (
          <Icon
            className={classNames(
              current
                ? "text-confirmate"
                : "text-gray-400 group-hover:text-gray-500",
              "-ml-0.5 mr-2 h-5 w-5",
            )}
            aria-hidden="true"
          />
        )}
        <span>{item.name}</span>
      </Link>
    );
  }
}
