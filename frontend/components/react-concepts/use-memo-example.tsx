/*
1. What is useMemo ?
useMemo is a React hook that memoizes (caches) the result of a function. It only recalculates the value when one of its dependencies changes. This is useful for optimizing expensive calculations or derived data.
e.g. syntax:
const memoizedValue = useMemo(() => {
  return expensiveFunction(a, b);
}, [a, b]); // dependency array is required and it will re-run the function when the dependency a, b changes
*/

"use client";

import React from "react";
import { useMemo, useState } from "react";
const initialItems = Array.from({ length: 1000 }, (_, index) => ({
  id: index,
  isSelected: false,
}));

export default function UseMemoExample() {
  const [count, setCount] = useState(0);
  const [items] = useState(initialItems); // this will never change after the first render since there is no setState for items

  // optimize `selectedItem` using useMemo , if we dont put this function in useMemo, it will be called on every render which is not efficient
  const selectedItem1 = useMemo(() => {
    console.log(" selected item 1 called", count);
    return items.find((item: any) => count === item.id);
  }, [items]); // runs only when `items` change (which is never in this case)
  console.log("selected item 1", selectedItem1);
  const selectedItem2 = useMemo(() => {
    console.log(" selected item 2 called", count);
    return items.find((item: any) => count === item.id);
  }, [items, count]); // runs when `items` or `count` change

  return (
    <div className="p-4 max-w-sm mx-auto bg-white rounded-xl border border-gray-200 space-y-4 my-36">
      <h1 className="text-xl font-semibold text-gray-900">Count: {count}</h1>
      <h2 className="text-lg text-gray-700">
        Selected Item 1: {selectedItem1?.id ?? "None"}
      </h2>
      <h2 className="text-lg text-gray-700">
        Selected Item 2: {selectedItem2?.id ?? "None"}
      </h2>
      <button
        className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
    </div>
  );
}

/**
  React.memo is a higher-order component that memoizes (caches) the result of a component. It only re-renders the component when its props change. This is useful for optimizing expensive components or when you want to prevent unnecessary re-renders.
  e.g. syntax:
  const MemoizedComponent = React.memo(Component);
 */

const ChildComponent = React.memo(({ count }: any) => {
  console.log("Child re-rendered!");
  return <h1>Count: {count}</h1>;
});

export function ParentComponent() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState("light");

  return (
    <div className="p-4">
      <ChildComponent count={count} />
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
    </div>
  );
}

/**
 * 📌 TL;DR Summary
 *
 * | Feature       | useMemo                        | React.memo                      |
 * |---------------|--------------------------------|---------------------------------|
 * | What it does  | Memoizes a computed value      | Memoizes a component            |
 * | Use case      | Avoids unnecessary expensive   | Prevents unnecessary component  |
 * |               | calculations                   | re-renders                      |
 * | Returns       | A value (number, object,       | A component                     |
 * |               | array, function)               |                                 |
 * | Works with    | Expensive functions, filtering,| Functional components           |
 * |               | sorting                        |                                 |
 * | Recomputes    | When dependencies in [] change | When props change               |
 * | when?         |                                |                                 |
 * | Syntax        | useMemo(() =>                  | export default React.memo       |
 * |               | expensiveFunction(), [deps])   | (MyComponent)                   |
 *
 */
