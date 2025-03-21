/**
 * Client Components
 *
 * - "use client" at the top
 * - Runs on the client (browser)
 * - Uses state, effects, and event handlers
 * - Cannot directly fetch server data (requires props)
 *
 * Example: A Client Component with State
 */
"use client";
import { useState } from "react";

export default function ClientComponent({ name }: { name: string }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Counter: {count}</h2>
      <h2>Name: {name}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// adding client component in server component
export async function ServerComponentHavingClientComponent() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const user = await res.json();

  return (
    <div>
      <h1>Server Rendered: {user.name}</h1>
      <ClientComponent name={user.name} />
    </div>
  );
}
/**
 * 3️⃣ How Is It Sent to the Client?
 * Here’s what happens step by step when a user loads the page:
 *
 * Step 1: Server Sends HTML
 * The server renders the Server Component (App.jsx).
 * It fetches data (User: Leanne Graham).
 * It sends static HTML to the browser.
 * ✅ Fast initial load because there's no JavaScript execution yet.
 *
 * Step 2: Browser Displays HTML
 * The user sees the page instantly.
 * But the Client Component (button) is not interactive yet.
 * ✅ Still no JavaScript executed yet.
 *
 * Step 3: Browser Loads JavaScript Bundle
 * The browser downloads react-client-bundle.js.
 * React hydrates the Client Component by attaching event listeners.
 * ✅ Now the button starts working.
 * ✅ Hydration only happens on the Client Component.
 */
