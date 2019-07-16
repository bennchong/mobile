import React from "react";

const AppContext = React.createContext(null);

export class AppStore extends React.Component {
  state = {
    test: false
  };

  changeTestState = () => {
    this.setState(state => {
      return { test: !this.state.test };
    });
  };

  render() {
    return (
      <AppContext.Provider
        value={{ ...this.state, changeTestState: this.changeTestState }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContext;
