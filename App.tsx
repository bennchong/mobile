import React from "react";
import AppContainer from "./src/navigation/AppContainer";
import NavigationService from "./src/navigation/NavigationService";
import { StateProvider } from "./src/state";

// TODO https://github.com/piotrwitek/typesafe-actions#1-basic-actions
const initialState = {
  workpass: null,
  workpassAccepted: false,
  timeAccepted: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_WORKPASS":
      return { ...state, workpass: action.workpass };
    case "SET_WORKPASS_ACCEPTED":
      return { ...state, workpassAccepted: true, timeAccepted: action.time };
    case "DELETE_WORKPASS":
      return initialState;
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
