import React from "react";
import AppContainer from "./src/navigation/AppContainer";
import NavigationService from "./src/navigation/NavigationService";
/* eslint-disable no-unused-vars */
import { StateProvider } from "./src/state";
import { reducer } from "./src/state/reducer";
import { initialState } from "./src/state/initialState";

/* eslint-enable */

// TODO https://github.com/piotrwitek/typesafe-actions#1-basic-actions

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
