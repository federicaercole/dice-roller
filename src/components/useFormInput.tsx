import { useState } from "react";

function useFormInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  function handleChange(str: string): void;
  function handleChange(e: React.FormEvent): void;

  function handleChange(arg: string | React.FormEvent) {
    if (typeof arg === "string") {
      setValue(arg);
    } else {
      setValue((arg.target as HTMLInputElement).value);
    }
  }

  const inputProps = {
    value: value,
    onChange: handleChange
  };

  return inputProps;
}

export default useFormInput