import React from "react";
import AppContainer from "./src/navigation/AppContainer";
import NavigationService from "./src/navigation/NavigationService";
import { AppStore } from "./src/components/AppStore";

export default class App extends React.Component {
  render() {
    return (
      <AppStore>
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </AppStore>
    );
  }
}
