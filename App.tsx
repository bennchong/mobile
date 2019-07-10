import React from "react";
import AppContainer from "./src/navigation/AppContainer";
import NavigationService from './src/navigation/NavigationService';

export default function App() {
  return (
    <AppContainer 
    ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef);
    }}/>
  );
}
