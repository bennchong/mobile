import React from "react";
import AppContainer from "./src/navigation/AppContainer";
import NavigationService from './src/navigation/NavigationService';

const StateContext = React.createContext<AppStateContext>({test: false, changeTestState: () => {} });

interface AppStateContext {
  test: boolean,
  changeTestState: () => {},
}

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
      <StateContext.Provider value={{test: this.state.test, changeTestState: this.changeTestState }}>
        <AppContainer 
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}/>
      </StateContext.Provider>
      
    );
  }
}
