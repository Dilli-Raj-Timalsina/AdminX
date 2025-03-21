import { useContext, useState } from "react";
import { DashboardContext, User, useUserContext } from "./context.example";

export default function DashboardContextProviderExample() {
  const [user, setUser] = useState<User>({
    name: "John",
    age: 30,
  });
  return (
    <DashboardContext.Provider value={user}>
      <ChildComponentLevel1 />
    </DashboardContext.Provider>
  );
}

// these are child components that are consuming the context instead of using props
function ChildComponentLevel1() {
  return (
    <div>
      <h1>Child Component Level 1</h1>
      <ChildComponentLevel2 />
      <ChildComponentLevel3 />
    </div>
  );
}

// this is a child component that is consuming the context using useContext hook
function ChildComponentLevel2() {
  const user = useContext(DashboardContext);
  return (
    <div>
      <h1>Child Component Level 2</h1>
      <p>User name is {user?.name}</p>
    </div>
  );
}

// this is a child component that is consuming the context using custom hook useUserContext
// this is the preferred way to consume the context because you will get type safety from the useUserContext hook
function ChildComponentLevel3() {
  const user = useUserContext();
  return (
    <div>
      <h1>Child Component Level 3</h1>
      <p>User name is {user.name}</p>
    </div>
  );
}
