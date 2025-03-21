/**
 * useEffect is a React hook that allows you to perform side effects in your component.
 * Side effects are actions that are not directly related to rendering the component.
 * They are typically used for data fetching, subscriptions, or manually changing the DOM.
 *
 * 🔹 The Basics of useEffect
 *
 * The syntax:
 *
 * ```tsx
 * useEffect(() => {
 *   // Your side effect code here
 *   return () => {
 *     // Cleanup function (optional)
 *   };
 * }, [dependencies]);
 * ```
 *
 * The first argument is a function that runs the side effect.
 * The second argument (dependencies) tells React when to re-run the effect.
 * The cleanup function (inside return) is called before re-running the effect or when the component unmounts.
 *
 */

/**
 * 🔹 Types of useEffect Usage
 *
 * 1️⃣ No Dependency Array (Runs on Every Render)
 *
 * ```tsx
 * useEffect(() => {
 *   console.log("This runs on every render!");
 * });
 * ```
 *
 * - Executes after every render and re-render.
 * - Use sparingly to avoid performance issues.
 *
 * 2️⃣ Empty Dependency Array (Runs Only on Mount)
 *
 * ```tsx
 * useEffect(() => {
 *   console.log("Runs only once after the initial render!");
 * }, []);
 * ```
 *
 * - Executes once when the component mounts.
 * - Commonly used for initial data fetching.
 *
 * 3️⃣ With Dependencies (Runs When Dependencies Change)
 *
 * ```tsx
 * useEffect(() => {
 *   console.log(`Count changed to: ${count}`);
 * }, [count]);
 * ```
 *
 * - Executes when specified dependencies change.
 * - Skips execution if dependencies remain unchanged.
 *
 * 🔹 Cleanup in useEffect (Component Unmounting)
 *
 * - The cleanup function runs before the component unmounts or before the next effect execution.
 * - Commonly used for cleaning up event listeners, timers, or subscriptions.
 *
 * ```tsx
 * useEffect(() => {
 *   const interval = setInterval(() => {
 *     console.log("Interval running...");
 *   }, 1000);
 *
 *   return () => {
 *     console.log("Cleanup: Clearing interval");
 *     clearInterval(interval);
 *   };
 * }, []);
 * ```
 *
 * - In this example, `clearInterval(interval)` stops the timer when the component unmounts.
 */

/**
 * 🔹 useEffect Runs After the Commit Phase, Not After Render
 *
 * ✅ React Rendering Phases
 *
 * Render Phase:
 * - React calls the component function and prepares the virtual DOM.
 * - No changes are made to the actual DOM yet.
 * - Effects are NOT executed in this phase.
 *
 * Commit Phase:
 * - React updates the real DOM and paints the screen.
 * - After this, useEffect runs asynchronously.
 *
 * Edge Case: useEffect Doesn't Block Paint
 *
 * ```tsx
 * useEffect(() => {
 *   console.log("Effect runs after DOM update");
 * });
 * console.log("Render phase");
 * ```
 *
 * 🔹 Output Order:
 * 1. Render phase
 * 2. Effect runs after DOM update
 *
 * The render phase completes first, and then useEffect runs after the commit phase.
 */
