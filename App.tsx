import React from "react";
import AppContainer from "./src/navigation/AppContainer";
import NavigationService from "./src/navigation/NavigationService";
import { StateProvider } from "./src/state";

// TODO https://github.com/piotrwitek/typesafe-actions#1-basic-actions
const initialState = {
  workpass: null,
  firstVerified: false,
  timeVerified: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_WORKPASS":
      return { ...state, workpass: action.workpass };
    case "FIRST_VERIFY_WORKPASS":
      return { ...state, firstVerified: true, timeVerified: action.time };
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
