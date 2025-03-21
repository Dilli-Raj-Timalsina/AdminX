/**
 * 📌 What are Server Components?
 * - Run only on the server (No JavaScript sent to the browser)
 * - Can fetch data directly inside the component (No useEffect needed)
 * - Reduce client-side bundle size (Faster loading)
 * - Work with Suspense for streaming UI
 */

/**
 * 📍 1. Creating a React Server Component
 * Server components do not use hooks like useState or useEffect.
 * They fetch data directly and return JSX.
 *
 * 📌 Example: Fetching Data in a Server Component
 *
 *
 * 💡 Key Benefits:
 * ✅ Runs on the server, so no client-side JS needed.
 * ✅ Fetches data directly without useEffect.
 * ✅ Sends only HTML to the client (fast & lightweight).
 *
 * 📍 2. Difference Between Server & Client Components
 *
 * | Feature                | Server Component       | Client Component       |
 * |------------------------|------------------------|------------------------|
 * | Runs on                | Server                 | Browser                |
 * | Fetching Data          | Directly inside component | useEffect              |
 * | JavaScript Sent to Client | ❌ No                 | ✅ Yes                 |
 * | Interactivity          | ❌ No                  | ✅ Yes (buttons, events, useState) |
 */

export default async function ServerComponent() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const post = await res.json();

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}
