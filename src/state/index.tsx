import React, { createContext, useContext, useReducer } from "react";

export interface IContextState {
  workpass: any;
  dpWorkpassArray: any;
  workpassAcceptedBooleanArray: object;
  timeAcceptedArray: object;
  timeVerifiedArray: object;
  numberOfProfiles: number;
  sessionValidatedArray: object;
}

// Uses React Context to create a AppContext or global state
export const StateContext = createContext({});

// React functional hooks api useContext consumes a AppContext and returns values of state, any component calling
// this will rerender when context value changes, except under memoization - check it out
export const useStateValue = (): [IContextState, (arg0: any) => any] =>
  useContext(StateContext) as any;

interface StateProviderProps {
  reducer: any;
  initialState: object;
  children: object;
}

export const StateProvider = ({
  reducer,
  initialState,
  children
}: StateProviderProps) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
