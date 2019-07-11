import React from "react";
import AppContainer from "./src/navigation/AppContainer";
import NavigationService from './src/navigation/NavigationService';

const ThemeContext = React.createContext('light');

interface MyProps{}
interface MyState{
  test: boolean
}

export default class App extends React.Component <MyProps, MyState> {
  constructor(props) {
    super(props);

    this.state = {
      test: false,
    }
  }

  changeTestState = () => {
    this.setState({
      test: !this.state.test
    })
  }

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
