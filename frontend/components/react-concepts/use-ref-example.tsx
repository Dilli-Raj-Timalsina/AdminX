import { useRef, useState } from "react";

function UseRefExample1() {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  const handleClick = () => {
    setCount(count + 1);
    countRef.current = count + 1;

    console.log("countRef.current", countRef.current); //it will log updated value that is 1 because ref is updated immediately and it doesnot cause re-render
    console.log("count", count); //it will log updated unupdated value that is 0 because state is not updated immediately instead it is updated after the re-render
  };

  return (
    <div className="p-4 max-w-sm mx-auto bg-white rounded-xl border border-gray-200 space-y-4 my-36">
      <h1 className="text-xl font-semibold text-gray-900">Counter Example</h1>
      <p className="text-lg text-gray-700">Current Count: {count}</p>
      <p className="text-lg text-gray-700">
        Previous Count: {countRef.current}
      </p>
      <button
        className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors"
        onClick={handleClick}
      >
        Increment
      </button>
    </div>
  );
}

function UseRefExample2() {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLParagraphElement | null>(null);

  const handleClick = () => {
    setCount(count + 1);
    if (countRef.current) {
      countRef.current.textContent = `Previous Count: ${count}`;
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto bg-white rounded-xl border border-gray-200 space-y-4 my-36">
      <h1 className="text-xl font-semibold text-gray-900">Counter Example</h1>
      <p className="text-lg text-gray-700">Current Count: {count}</p>
      <p ref={countRef} className="text-lg text-gray-700">
        Previous Count: {count}
      </p>
      <button
        className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors"
        onClick={handleClick}
      >
        Increment
      </button>
    </div>
  );
}

export { UseRefExample1, UseRefExample2 };

/**
📌 useRef Hook - Quick Notes

What is useRef?

useRef creates a mutable object ({ current: value }) that persists across renders without causing re-renders.

Key Uses:

- Accessing DOM elements without triggering re-renders.
- Storing values that persist across renders (like previous state, timers, or event listeners).

Edge Cases & Gotchas:

- Updating ref.current does not trigger a re-render. Unlike state, refs don’t cause component updates.
- If used in a dependency array (useEffect), changes won’t trigger re-execution.
- Avoid using it as a replacement for state when UI updates are required.
- When used for storing previous values, ensure correct updates inside useEffect.
- Refs are not reactive! If you need real-time UI updates, use useState instead.

🔥 Quick Tip: Combine useRef with useEffect to interact with elements after renders! 🚀
 */
