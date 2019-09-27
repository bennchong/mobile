import React from "react";
import AppContainer from "./src/navigation/AppContainer";
import NavigationService from "./src/navigation/NavigationService";
/* eslint-disable no-unused-vars */
import { StateProvider, IContextState } from "./src/state";
/* eslint-enable */

// TODO https://github.com/piotrwitek/typesafe-actions#1-basic-actions

const initialState: IContextState = {
  workpass: null,
  dpWorkpassArray: [],
  workpassAcceptedBooleanArray: [],
  timeAcceptedArray: [],
  timeVerifiedArray: [],
  numberOfProfiles: 0,
  sessionValidatedArray: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_WORKPASS":
      return { ...state, workpass: action.workpass };
    case "UPDATE_DP_WORKPASS_ARRAY":
      return { ...state, dpWorkpassArray: action.dpWorkpassArray };
    case "UPDATE_SESSION_ARRAY":
      return { ...state, sessionValidatedArray: action.sessionValidatedArray };
    case "SET_WORKPASS_ACCEPTED":
      return {
        ...state,
        workpassAcceptedBooleanArray: action.workpassAcceptedBooleanArray
      };
    case "SET_WORKPASS_TIME_ACCEPTED_ARRAY":
      return { ...state, timeAcceptedArray: action.timeAcceptedArray };
    case "SET_WORKPASS_TIME_VERIFIED_ARRAY":
      return { ...state, timeVerifiedArray: action.timeVerifiedArray };
    case "SET_NUMBER_PROFILES":
      return { ...state, numberOfProfiles: action.numberOfProfiles };
    case "NUMBER_PROFILES_PLUS_ONE":
      return { ...state, numberOfProfiles: state.numberOfProfiles + 1 };
    case "NUMBER_PROFILES_MINUS_ONE":
      return { ...state, numberOfProfiles: state.numberOfProfiles - 1 };
    case "DELETE_WORKPASS":
      return { ...action.resetState };
    default:
      return state;
  }
};

const App = () => {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </StateProvider>
  );
};

export default App;
