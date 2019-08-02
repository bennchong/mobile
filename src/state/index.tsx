import React, { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

export interface IContextState {
  workpass: any;
  workpassAccepted: boolean;
  timeAccepted: string;
  timeVerified: string;
}

export const StateContext = createContext({});
export const useStateValue = (): [IContextState, (arg0: any) => any] =>
  useContext(StateContext) as any;

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

StateProvider.propTypes = {
  reducer: PropTypes.func,
  initialState: PropTypes.object,
  children: PropTypes.object
};
