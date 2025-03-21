/*
🌟 What is useContext?
useContext allows components to access global state without passing props manually at every level.

✅ The Three Parts of Context
# Create a Context → const MyContext = React.createContext(defaultValue);
# Provide a Value → <MyContext.Provider value={state}>
# Consume the Value → const context = useContext(MyContext);
*/

import { createContext, useContext } from "react";

export type User = {
  name: string;
  age: number;
};

export const DashboardContext = createContext<User | undefined>(undefined);

export const useUserContext = () => {
  const user = useContext(DashboardContext);
  if (!user) {
    throw new Error(
      "useUserContext must be used within a DashboardContext.Provider"
    );
  }
  return user;
};
