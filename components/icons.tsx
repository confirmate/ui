import {
  AdjustmentsHorizontalIcon,
  ArchiveBoxIcon,
  CalendarIcon,
  ChartPieIcon,
  CheckBadgeIcon,
  Cog6ToothIcon,
  HomeIcon,
  QueueListIcon,
  RectangleGroupIcon,
  Squares2X2Icon,
  SunIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export type IconType = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    title?: string;
    titleId?: string;
  } & React.RefAttributes<SVGSVGElement>
>;

export const icons = new Map<string, IconType>([
  ["home", HomeIcon],
  ["rectangle-group", RectangleGroupIcon],
  ["adjustments-horizontal", AdjustmentsHorizontalIcon],
  ["archive-box", ArchiveBoxIcon],
  ["chart-pie", ChartPieIcon],
  ["calendar", CalendarIcon],
  ["user", UserIcon],
  ["cog6-tooth", Cog6ToothIcon],
  ["squares2x2", Squares2X2Icon],
  ["sun", SunIcon],
  ["queue-list", QueueListIcon],
  ["check-badge", CheckBadgeIcon],
]);
