import { useState } from "react";

interface Props {
  name: string;
  children: React.ReactNode;
  onClick?: () => void;
}

type HTMLInputElementProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
>;

interface InputCheckboxProps extends Props {
  inputProps?: HTMLInputElementProps;
}

const CheckboxInput = ({
  name,
  children,
  onClick,
  inputProps,
}: InputCheckboxProps) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center">
      <input
        id={name}
        aria-describedby={name + "-description"}
        name={name}
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 text-clouditor focus:ring-clouditor"
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
          onClick && onClick();
        }}
        {...inputProps} // spread any additional props to the input element
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
