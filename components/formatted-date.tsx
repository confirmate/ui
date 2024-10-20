import { useFormatter } from "next-intl";

interface DateProps {
  /**
   * The date to format.
   */
  value?: Date | string;

  /**
   * The format to use
   */
  format?: "date-only" | "short-date-time";
}

export default function FormattedDate({ value, format }: DateProps) {
  const df = useFormatter();
  if (typeof value === "string") {
    value = new Date(Date.parse(value));
  }

  return (
    value && (
      <time dateTime={value.toISOString()}>
        {format == "short-date-time"
          ? df.dateTime(value, {
              year: "2-digit",
              month: "2-digit",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : df.dateTime(value, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
      </time>
    )
  );
}
