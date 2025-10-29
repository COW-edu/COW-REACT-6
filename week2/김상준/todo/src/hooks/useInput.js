import { useState, useRef, useEffect } from "react";

export function useInput(initial = "") {
  const [value, setValue] = useState(initial);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onChange = (e) => setValue(e.target.value);
  const clear = () => setValue("");

  return { value, onChange, clear, inputRef };
}
