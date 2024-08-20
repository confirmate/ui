"use client";
import { icons } from "@/components/icons";
import { classNames } from "@/lib/util";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SidebarItemData {
  name: string;
  href: string;
  icon?: string;
  isSub?: boolean;
  isNew?: boolean;
  children?: SidebarItemData[];
  disabled?: boolean;
}

interface SidebarItemProps {
  item: SidebarItemData;
}

/**
 * An individual navigation item in the sidebar.
 */
export function SidebarItem({ item }: SidebarItemProps) {
  const pathname = usePathname();
  let current = pathname.startsWith(item.href);
  const Icon = icons.get(item.icon ?? "");

  return (
    <li>
      {item.disabled && (
        <span
          className={classNames(
            "cursor-default text-gray-400",
            item.isSub
              ? "block rounded-md py-2 pl-9 pr-2 text-sm leading-6"
              : "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
            item.isNew ? "border-t" : "",
          )}
        >
          {Icon && (
            <Icon
              className="h-6  w-6 shrink-0 text-gray-400"
              aria-hidden="true"
            />
          )}
          {item.name}
        </span>
      )}
      {!item.disabled && (
        <Link
          href={item.href}
          className={classNames(
            current
              ? "bg-gray-50 text-confirmate"
              : "text-gray-700 hover:bg-gray-50 hover:text-confirmate",
            item.isSub
              ? "block rounded-md py-2 pl-9 pr-2 text-sm leading-6"
              : "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
            item.isNew ? "border-t" : "",
          )}
        >
          {Icon && (
            <Icon
              className={classNames(
                current
                  ? "text-confirmate"
                  : "text-gray-400 group-hover:text-confirmate",
                "h-6 w-6 shrink-0",
              )}
              aria-hidden="true"
            />
          )}
          {item.name}
        </Link>
      )}
      <ul className="mt-1 px-2">
        {item.children?.map((subItem) => (
          <SidebarItem item={subItem} key={subItem.name} />
        ))}
      </ul>
    </li>
  );
}
