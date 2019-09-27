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
