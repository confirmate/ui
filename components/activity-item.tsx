import FormattedDate from "@/components/formatted-date";
import { icons } from "@/components/icons";
import Link from "next/link";

export interface ActivityItemData {
  content: string;
  target: string;
  href: string;
  date: string;
  datetime: string;
  icon: string;
  iconBackground: string;
}

interface ActivityItemProps {
  item: ActivityItemData;
  last: boolean;
}

export default function ActivityItem({ item, last }: ActivityItemProps) {
  const Icon = icons.get(item.icon);
  return (
    <li>
      <div className="relative pb-8">
        {last && (
          <span
            className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
            aria-hidden="true"
          />
        )}
        <div className="relative flex space-x-3">
          <div>
            <span className="{event.iconBackground} flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white">
              {Icon && (
                <Icon className="h-5 w-5 text-white" aria-hidden="true" />
              )}
            </span>
          </div>
          <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
            <div>
              <p className="text-sm text-gray-500">
                {item.content}{" "}
                <Link href={item.href} className="font-medium text-gray-900">
                  {item.target}
                </Link>
              </p>
            </div>
            <div className="whitespace-nowrap text-right text-sm text-gray-500">
              <FormattedDate value={item.datetime} />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
