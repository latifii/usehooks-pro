import { useEffect, useRef } from "react";

export function useTimeout(
  callback: () => void,
  delay: number | null
): () => void {
  const savedCallback = useRef(callback); // Store the callback
  const timeoutId = useRef<number | null>(null); // Store the timeout ID

  // Update the ref with the latest callback when it changes
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set the timeout and manage cleanup
  useEffect(() => {
    if (delay === null) return;

    timeoutId.current = window.setTimeout(() => {
      savedCallback.current();
    }, delay);

    return () => {
      if (timeoutId.current !== null) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [delay]);

  // Return a function to manually clear the timeout
  return () => {
    if (timeoutId.current !== null) {
      clearTimeout(timeoutId.current); // Clear the timeout using the correct ID
      timeoutId.current = null; // Reset the timeout ID
    }
  };
}
