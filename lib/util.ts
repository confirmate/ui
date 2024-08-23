export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function shortResourceId(id: string): string {
  let parts = id.split("/");

  return parts[parts.length - 1];
}
