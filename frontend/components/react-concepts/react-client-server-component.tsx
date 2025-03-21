"use client"; // Declares this as a Client Component
import ServerComponent from "./react-server-component";

export default function ClientComponent() {
  return (
    <div>
      <h1>Client Component</h1>
      <ServerComponent /> // this will become client compoentn because it is
      imported in client component instead use belows trick to make it a server
      component .
    </div>
  );
}

// Trick:
export function ExampleParentComponent() {
  return (
    <div>
      <p>This is a parent component</p>
      <ExampleTrickedClientComponent>
        <ServerComponent />
      </ExampleTrickedClientComponent>
    </div>
  );
}

export function ExampleTrickedClientComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <p>This is a client component</p>
      {children} // this is the server component because it is not imported in
      client component
    </div>
  );
}
/**
 * 2️⃣ Rendering Process & Browser Delivery
 *
 * Step 1: Server Processing
 * - When a page is requested, React identifies ClientComponent.jsx as a Client Component.
 * - Client Components cannot be rendered on the server.
 * - The server renders only the Server Component.
 * - The Client Component is packaged separately for hydration.
 *
 * Step 2: Browser Reception
 * - Initial HTML Response (From Server):
 *
 * <html>
 *   <body>
 *     <div>
 *       <h1>Client Component</h1>
 *       <div>
 *         <h2>Server Component</h2>
 *         <p>User: Leanne Graham</p>
 *       </div>
 *     </div>
 *     <script src="/react-client-bundle.js"></script> <!-- Hydration JS -->
 *   </body>
 * </html>
 *
 * - Hydration Script (react-client-bundle.js):
 *
 * ```javascript
 * import ReactDOM from "react-dom";
 * import ClientComponent from "./ClientComponent";
 *
 * ReactDOM.hydrateRoot(document.getElementById("root"), <ClientComponent />);
 * ```
 * - This script hydrates only the Client Component.
 * - The Server Component remains static and does not require hydration.
 *
 * 3️⃣ Key Insights
 *
 * 🔹 Server-Side Actions:
 * - The Server Component renders first and sends HTML.
 * - No JavaScript for the Server Component is sent to the client.
 *
 * 🔹 Client-Side Actions:
 * - The Client Component hydrates and becomes interactive.
 * - The Server Component remains as pure HTML without additional JavaScript.
 *
 * 🔹 Benefits:
 * - Server Components efficiently handle data fetching.
 * - Client Components manage interactivity without delaying page load.
 * - Reduced JavaScript results in faster performance.
 */

/**
 * Edge Cases:
 * What Happens If a Client Component Sends Data as Props to a Server Component?
 * 💡 Short Answer: It Doesn't Work! 🚫
 * Server Components render on the server, while Client Components run on the browser.
 * Data flows from Server → Client, but NOT from Client → Server.
 * You CANNOT pass client-side state or props to a Server Component because it would require re-executing the Server Component in the browser, which is not possible.
 *
 *link : https://www.youtube.com/watch?v=bugO1tmSDpM
 */
