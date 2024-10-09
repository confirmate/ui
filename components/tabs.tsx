"use client";

import TabItem, { TabItemData } from "@/components/tab-item";
import { usePathname, useRouter } from "next/navigation";

interface TabsProps {
  items: TabItemData[];
}

export default function Tabs({ items }: TabsProps) {
  const pathname = usePathname();
  const router = useRouter();
  const currentItem = items.find((item) => pathname.startsWith(item.href));

  return (
    <div className="mt-4">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-confirmate focus:ring-confirmate"
          value={currentItem?.href}
          onChange={(e) => router.push(e.target.value)}
        >
          {items.map((item) => (
            <TabItem item={item} mobile={true} key={item.name} />
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {items.map((item) => (
              <TabItem item={item} key={item.name} />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
