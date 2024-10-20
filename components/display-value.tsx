interface DisplayValueProps {
  value: any;
}

export default function DisplayValue({ value }: DisplayValueProps) {
  if (Array.isArray(value)) {
    return (
      <>
        [
        {value.map((item, index) => {
          return (
            <span key={index}>
              <DisplayValue value={item} />
              {!!index && ", "}
            </span>
          );
        })}
        ]
      </>
    );
  } else if (typeof value === "string") {
    return (
      <>
        {'"'}
        {value}
        {'"'}
      </>
    );
  } else {
    return <>{value.toString()}</>;
  }
}
