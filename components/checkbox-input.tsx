interface InputCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  children: React.ReactNode;
}

const CheckboxInput = ({ name, children, ...rest }: InputCheckboxProps) => {
  return (
    <div className="flex items-center">
      <input
        id={name}
        aria-describedby={name + "-description"}
        name={name}
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 text-confirmate focus:ring-confirmate"
        {...rest}
      />
      <label
        id={name + "-description"}
        htmlFor={name}
        className="text-sm leading-6 ml-3 font-medium text-gray-900"
      >
        {children}
      </label>
    </div>
  );
};

export default CheckboxInput;
