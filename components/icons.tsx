import {
  AdjustmentsHorizontalIcon,
  ArchiveBoxIcon,
  CalendarIcon,
  ChartPieIcon,
  CheckBadgeIcon,
  CloudIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
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
  ["document-text", DocumentTextIcon],
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
  ["cloud", CloudIcon],
  ["check-badge", CheckBadgeIcon],
]);
