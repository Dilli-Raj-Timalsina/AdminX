/**
 🔹 What is an Error Boundary?
An Error Boundary is a React component that catches JavaScript errors in its child components, logs them, and gracefully displays a fallback UI instead of crashing the entire application.

✅ Think of it like a try-catch but for React components!

🛠️ When Do We Use Error Boundaries?
To prevent the entire app from crashing when an error occurs in any component.
To display a user-friendly fallback UI instead of a blank screen.
To log errors for debugging without breaking the app.
⚠️ Error Boundaries ONLY catch errors in:

Render phase
Lifecycle methods
Inside constructors of child components
❌ They do NOT catch errors in:

Event handlers (but we can use try-catch inside them)
Asynchronous code (setTimeout, fetch)
Server-side rendering (SSR)
Errors inside the Error Boundary itself
 */

import React, { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state to show fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details (you can send this to a logging service)
    console.error("Caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 text-red-800 rounded-md">
          <h2 className="text-xl font-bold">Something went wrong!</h2>
          <p>{this.state.error?.message || "An unexpected error occurred."}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
