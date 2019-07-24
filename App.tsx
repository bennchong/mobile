import React from "react";
import AppContainer from "./src/navigation/AppContainer";
import NavigationService from "./src/navigation/NavigationService";
import { StateProvider } from "./src/state";

// TODO https://github.com/piotrwitek/typesafe-actions#1-basic-actions
const initialState = {
  certificate: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_WORKPASS":
      return { ...state, certificate: action.certificate };
    case "DELETE_CERTIFICATE":
      return { ...state, certificate: null };
    default:
      return state;
  }
};

export default class App extends React.Component {
  render() {
    return (
      <StateProvider initialState={initialState} reducer={reducer}>
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </StateProvider>
    );
  }
}
