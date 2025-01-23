import { useState } from "react";
import { useTimeout } from "./useTimeout";

const TimeoutTestComponent = () => {
  const [message, setMessage] = useState("Waiting...");
  const [delay, setDelay] = useState(5000); // Default delay is 5 seconds
  const [isTimeoutCleared, setIsTimeoutCleared] = useState(false);

  // Use the useTimeout hook
  const clearTimeout = useTimeout(() => {
    setMessage("Timeout Finished!");
  }, delay);

  const handleClearTimeout = () => {
    clearTimeout(); // Manually clear the timeout
    setIsTimeoutCleared(true);
  };

  const handleReset = () => {
    setMessage("Waiting...");
    setIsTimeoutCleared(false);
    setDelay(5000); // Reset delay
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>useTimeout Test Component</h1>
      <p>Message: {message}</p>
      <p>Delay: {delay}ms</p>
      <button onClick={handleClearTimeout} disabled={isTimeoutCleared}>
        Clear Timeout
      </button>
      <button onClick={() => setDelay(3000)}>Set Delay to 3 seconds</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default TimeoutTestComponent;
