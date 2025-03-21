/*
1️⃣ What is a Class-Based Component?
Before React introduced Hooks, components were written as JavaScript classes that extended React.Component. These are called Class-Based Components and use state and lifecycle methods for managing UI behavior.

2️⃣ State Management in Class Components
Class components use the this.state and this.setState() methods to manage state.

3️⃣ Lifecycle Methods
Class components have several lifecycle methods that can be overridden to manage component behavior.



🛠️ Lifecycle Mapping: Class vs. Function

| Class Component Method       | Functional Component Equivalent                |
|------------------------------|-------------------------------------------------|
| componentDidMount()          | useEffect(() => {...}, []) (Runs once)          |
| componentDidUpdate(prevProps, prevState) | useEffect(() => {...}, [dependencies]) |
| componentWillUnmount()       | Cleanup function inside useEffect               |
| this.setState({ count: count + 1 }) | setCount(count + 1)                       |

✅ Functional components are the modern, recommended approach in React.


*/

import { Component } from "react";

// Example of Class Component
interface ClassComponentExampleState {
  count: number;
}

interface ClassComponentExampleProps {
  initialCount: number;
}

export class ClassComponentExample extends Component<
  ClassComponentExampleProps,
  ClassComponentExampleState
> {
  constructor(props: ClassComponentExampleProps) {
    // props are the properties passed to the component
    super(props);
    this.state = { count: props.initialCount }; // state is the internal data of the component
  }

  componentDidMount() {
    // this is called when the component is mounted
    console.log("Component did mount");
  }

  componentDidUpdate(
    prevProps: ClassComponentExampleProps,
    prevState: ClassComponentExampleState
  ) {
    // this is called when the component is updated
    if (prevState.count !== this.state.count) {
      console.log("Component did update");
    }
  }

  componentWillUnmount() {
    // this is called when the component is about to be unmounted
    console.log("Component will unmount");
  }

  increment = () => {
    // this is called when the button is clicked
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <h2>Count: {this.state.count}</h2>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

//Corresponding Functional Component
import { useState, useEffect } from "react";

interface FunctionComponentExampleProps {
  initialCount: number;
}

export function FunctionComponentExample({
  initialCount,
}: FunctionComponentExampleProps) {
  const [count, setCount] = useState(initialCount);

  // 🏗️ componentDidMount: Runs once when the component is mounted
  useEffect(() => {
    console.log("Component did mount");

    return () => {
      console.log("Component will unmount"); // 🏗️ componentWillUnmount
    };
  }, []);

  // 🔄 componentDidUpdate: Runs when `count` updates
  useEffect(() => {
    console.log("Component did update");
  }, [count]);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
