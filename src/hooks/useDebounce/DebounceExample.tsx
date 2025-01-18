import React, { useState } from "react";
import { useDebounce } from "./useDebounce";

const DebounceExample: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);
  return (
    <div>
      <h1>Debounce Example</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type something..."
      />
      <p>Immediate Value: {inputValue}</p>
      <p>Debounced Value: {debouncedValue}</p>
    </div>
  );
};

export default DebounceExample;
