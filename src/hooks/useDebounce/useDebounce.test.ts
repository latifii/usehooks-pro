import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

// Mock the timer functions to control time during tests
jest.useFakeTimers();

describe("useDebounce Hook", () => {
  // Test to ensure the initial value is returned immediately
  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));

    expect(result.current).toBe("initial");
  });

  // Test to ensure value changes are debounced
  it("should debounce value changes", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "initial", delay: 500 } }
    );

    // Verify the initial value is returned
    expect(result.current).toBe("initial");

    // Update the value and check that it doesn't change immediately
    rerender({ value: "updated", delay: 500 });
    expect(result.current).toBe("initial");

    // Simulate advancing the timer by the delay duration
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Verify the value updates after the delay
    expect(result.current).toBe("updated");
  });

  // Test to ensure the timer resets if the value changes before the delay finishes
  it("should reset the timer when value changes before delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "initial", delay: 500 } }
    );

    // Verify the initial value is returned
    expect(result.current).toBe("initial");

    // Set a new value and partially advance the timer
    rerender({ value: "updated-1", delay: 500 });
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Update the value again before the delay completes
    rerender({ value: "updated-2", delay: 500 });

    // Verify the value doesn't change prematurely
    expect(result.current).toBe("initial");

    // Advance the timer to complete the delay
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Verify the final value matches the latest update
    expect(result.current).toBe("updated-2");
  });
});
