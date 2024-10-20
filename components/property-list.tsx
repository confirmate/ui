interface PropertyListProps {
  title: string;
  description: string;
  entries: {
    key: string;
    value: string;
  }[];
}

export default function PropertyList({
  title,
  description,
  entries,
}: PropertyListProps) {
  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          {title}
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          {description}
        </p>
      </div>
      <div className="mt-4 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {entries.map((entry) => (
            <div
              className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
              key={entry.key}
            >
              <dt className="text-sm font-medium text-gray-900">{entry.key}</dt>
              <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                {entry.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
