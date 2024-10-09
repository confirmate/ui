import { SchemaResource } from "@/lib/api/discovery";
import { humanProperties, truncate } from "@/lib/util";

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
      <table className="w-full table-auto border-collapse border-gray-300">
        <tbody>
          {humanProperties(resource).map(({ key, value }) => (
            <tr key={key} className="border-b border-gray-300">
              <td className="px-4 py-2 text-sm">{truncate(key, 20)}</td>
              <td className="px-4 py-2 text-sm text-gray-900">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
