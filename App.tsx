import React from "react";
import AppContainer from "./src/navigation/AppContainer";
import NavigationService from './src/navigation/NavigationService';

const ThemeContext = React.createContext('light');

export default class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <AppContainer 
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}/>
      </ThemeContext.Provider>
      
    );
  }
}
