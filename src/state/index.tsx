import React, { createContext, useContext, useReducer } from "react";

export interface IContextState {
  workpass: any;
  workpassAccepted: boolean;
  timeAccepted: string;
  timeVerified: string;
  fingerprintAvailable: boolean;
}

export const StateContext = createContext({});
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
