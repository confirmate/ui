export default function ComplianceStatusSelect() {
  const options = [
    {
      value: "EVALUATION_STATUS_COMPLIANT_MANUALLY",
      display: "Manually set to compliant",
    },
    {
      value: "EVALUATION_STATUS_NOT_COMPLIANT_MANUALLY",
      display: "Manually set to non-compliant",
    },
  ];

  const defaultValue = "EVALUATION_STATUS_COMPLIANT_MANUALLY";

  return (
    <select
      className="
  mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10
 text-gray-900 
  ring-1 ring-inset ring-gray-300 focus:ring-2
focus:ring-confirmate sm:text-sm sm:leading-6"
      defaultValue={defaultValue}
      name="status"
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.display}
        </option>
      ))}
    </select>
  );
}
