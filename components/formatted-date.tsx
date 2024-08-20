import { useFormatter } from "next-intl";

interface DateProps {
  /**
   * The date to format.
   */
  value?: Date | string;
}

export default function FormattedDate({ value }: DateProps) {
  const format = useFormatter();
  if (typeof value === "string") {
    value = new Date(Date.parse(value));
  }

  return (
    value && (
      <time dateTime={value.toISOString()}>
        {format.dateTime(value, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
    )
  );
}
