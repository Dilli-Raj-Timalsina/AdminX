/**
 * The use hook in React 19 is a new API that simplifies data fetching and asynchronous operations in components.
 * It allows you to suspend rendering until a Promise resolves.
 * It allows conditional rendering based on the Promise state. i.e you can use use Hook in for loop, if else, switch case, etc.
 *
 * 1. Basic use Hook with a Promise
 * In React 19, you can directly use a Promise inside a component.
 *
 * Example: Fetching Data from an API
 */

import { use } from "react";

async function fetchData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  return response.json();
}

const postPromise = fetchData(); // Fetch starts immediately

export default function Post() {
  const post = use(postPromise); // Waits until the promise resolves

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}
