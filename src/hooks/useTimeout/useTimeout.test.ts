import { renderHook, act } from "@testing-library/react";
import { useTimeout } from "./useTimeout";

jest.useFakeTimers(); // Enable Jest's fake timers

describe("useTimeout", () => {
  it("should call the callback after the specified delay", () => {
    const callback = jest.fn(); // A mock function to test if the callback is executed
    const delay = 5000; // 5 seconds

    renderHook(() => useTimeout(callback, delay));

    // Advance the timers by 5 seconds
    act(() => {
      jest.advanceTimersByTime(delay);
    });

    // Ensure the callback is called exactly once
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should not call the callback if delay is null", () => {
    const callback = jest.fn(); // Mock function
    const delay = null; // No delay

    renderHook(() => useTimeout(callback, delay));

    // Even if we advance the timers, the callback should not be called
    act(() => {
      jest.advanceTimersByTime(5000); // 5 seconds
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it("should clear the timeout if delay changes", () => {
    const callback = jest.fn();
    const { rerender } = renderHook(
      ({ callback, delay }) => useTimeout(callback, delay),
      {
        initialProps: { callback, delay: 5000 },
      }
    );

    // Change the delay before the timer executes
    act(() => {
      rerender({ callback, delay: 1000 }); // Update delay to 1 second
    });

    // Advance the timers by 5 seconds
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // The callback should not be called for the previous delay (5 seconds)
    expect(callback).toHaveBeenCalledTimes(1); // Only for the new delay (1 second)
  });

  it("should allow manual clearing of the timeout", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useTimeout(callback, 5000));

    // Manually clear the timeout
    act(() => {
      result.current(); // Call the returned clearTimeout function
    });

    // Advance the timers
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // The callback should not be called as the timeout was cleared manually
    expect(callback).not.toHaveBeenCalled();
  });

  it("should update callback dynamically", () => {
    const initialCallback = jest.fn();
    const updatedCallback = jest.fn();

    const { rerender } = renderHook(
      ({ callback, delay }) => useTimeout(callback, delay),
      {
        initialProps: { callback: initialCallback, delay: 1000 },
      }
    );

    // Update the callback before the timer executes
    act(() => {
      rerender({ callback: updatedCallback, delay: 1000 });
    });

    // Advance the timers by 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Ensure only the updated callback is called, not the initial one
    expect(initialCallback).not.toHaveBeenCalled();
    expect(updatedCallback).toHaveBeenCalledTimes(1);
  });
});
