import { SchemaResource } from "@/lib/api/discovery";
import { humanProperties } from "@/lib/util";

interface NodePropertiesDetailProps {
  resource: SchemaResource;
}

export default function NodePropertiesDetail({
  resource,
}: NodePropertiesDetailProps) {
  const dtf = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });

  return (
    <div className="mt-2">
      <div className="flex space-x-2">
        <div className="px-4 pt-5 sm:px-0 sm:pt-0">
          <dl className="space-y-2">
            {humanProperties(resource).map(({ key, value }) => (
              <div key={key}>
                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                  {key}
                </dt>
                <dd className="text-gray-900 sm:col-span-2 mt-1 w-96 text-sm">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
