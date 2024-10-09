import { flatten } from "flat";
import { SchemaResource } from "./api/discovery";

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function shortResourceId(id: string): string {
  let parts = id.split("/");

  return parts[parts.length - 1];
}

/**
 * This function returns an appropriate subset of properties out of the
 * complete set, that are suitable for human viewing.
 */
export function humanProperties(resource: SchemaResource) {
  const props = Object.entries(flatten(resource.properties) ?? {});
  return props
    .filter(([k, v]) => {
      // skip empty values
      if (v == 0 || v == undefined || v == null || v == "") {
        return false;
      }

      return true;
    })
    .map(([k, v]) => {
      let node: React.ReactNode;

      switch (k) {
        case "url":
          node = (
            <a href={v} target="_blank">
              {v}
            </a>
          );
          break;
        case "creationTime":
          const dtf = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false,
          });
          node = <time dateTime={v}>{dtf.format(new Date(v))}</time>;
          break;
        case "@type":
          const parts = v.split(".");
          node = parts[parts.length - 1];
          break;
        default:
          if (typeof v === "string") {
            node = truncate(v, 50);
          } else {
            node = v.toString();
          }
      }

      return { key: k, value: node };
    });
}

export function truncate(str: string, maxLength = 80) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength - 3) + "...";
  }
  return str;
}
