import { useState } from "react";

function useFormInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e: React.FormEvent) {
    setValue((e.target as HTMLInputElement).value);
  }

  const inputProps = {
    value: value,
    onChange: handleChange
  };

  return inputProps;
}

export default useFormInput