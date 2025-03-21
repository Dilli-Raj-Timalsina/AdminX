// React.forwardRef allows a parent component to pass a ref to a child component, giving direct access to its DOM element.
// How This Works:
// forwardRef passes the ref from the parent to the child component (CustomButton).
// useRef in the parent creates a reference to store the button’s DOM element.
// When clicking the green button, it triggers handleClick(), which focuses the CustomButton using buttonRef.current.focus().

import React, { useRef, forwardRef } from "react";

// Child component using forwardRef
const CustomButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className="px-4 py-2 bg-blue-500 text-white rounded-md"
    >
      {children}
    </button>
  );
});

// Parent component using the ref
export default function ParentComponent() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (buttonRef.current) {
      buttonRef.current.focus(); // Access the button and focus it
    }
  };

  return (
    <div className="space-y-4 p-4">
      <CustomButton ref={buttonRef}>Click Me</CustomButton>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-green-500 text-white rounded-md"
      >
        Focus Custom Button
      </button>
    </div>
  );
}

// Explanation of why the ref type is first in forwardRef:
// This is because of how forwardRef is typed in TypeScript:

// The forwardRef function is typed as follows:
// forwardRef<T, P>(renderFunction: (props: P, ref: React.Ref<T>) => React.ReactNode)

// The first type parameter (T) is for the ref, which is the type of the DOM element.
// The second type parameter (P) is for the props, which are the component's props.
// The render function inside forwardRef receives (props, ref) in that specific order.
