import { useCallback, useState, memo } from "react";

// Memoized Button Component
const IncrementButton = memo(({ onClick }: any) => {
  console.log("Button rendered!"); // This will log only when the button re-renders
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors"
      onClick={onClick}
    >
      Increment
    </button>
  );
});

export default function UseCallBackExample() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Button clicked!");
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div className="p-4 max-w-sm mx-auto bg-white rounded-xl border border-gray-200 space-y-4 my-36">
      <h1 className="text-xl font-semibold text-gray-900">Count: {count}</h1>
      <IncrementButton onClick={handleClick} />
    </div>
  );
}
/**
 * Explanation:
 *
 * React.memo:
 * - The IncrementButton component is wrapped in React.memo, which means it will only re-render if its props change.
 * - Since handleClick is memoized using useCallback, the onClick prop passed to IncrementButton remains the same across re-renders, preventing unnecessary re-renders of the button.
 *
 * useCallback:
 * - The handleClick function is memoized using useCallback, ensuring that the same function reference is passed to the IncrementButton component on every render. This prevents the button from re-rendering unnecessarily.
 */

/**
 * useCallback is a React hook that memoizes a function. It only re-creates the function when one of its dependencies change. This is useful for optimizing expensive functions or when you want to prevent unnecessary re-creations of functions.
 *
 * e.g. syntax:
 * const memoizedFunction = useCallback(() => {
 *   return expensiveFunction(a, b);
 * }, [a, b]); // dependency array is required and it will re-run the function when the dependency a, b changes
 */
