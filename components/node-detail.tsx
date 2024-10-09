import { SchemaResource } from "@/lib/api/discovery";

interface NodeDetailProps {
  resource: SchemaResource;
}

function name(id: string | undefined) {
  let rr = id.split("/");
  return rr[rr.length - 1];
}

export default function NodeDetail({ resource }: NodeDetailProps) {
  return (
    <div className="flex flex-col bg-white shadow-xl">
      <div className="bg-clouditor px-4 py-6 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="... truncate text-base font-semibold leading-6 text-white">
            {name(resource.id)}
          </div>
        </div>
        <div className="mt-1">
          <p className="text-sm text-gray-300">
            This resource is of type
            <i>{resource.resourceType?.split(",")[0]}</i>
            and has <i>{0}</i> assessment results associated to it.
          </p>
        </div>
      </div>
    </div>
  );
}
