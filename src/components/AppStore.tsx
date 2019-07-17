import React from "react";

const AppContext = React.createContext(null);

export class AppStore extends React.Component {
  state = {
    test: false,
    certificate: null,
  };

  //Toggles Test state (state to show that a QR Code has been scanned) 
  changeTestState = () => {
    this.setState(state => {
      return { test: !this.state.test };
    });
  };

  //Stores Certificate
  storeCertificate = (cert) => {
    this.setState({certificate: cert})
  }

  render() {
    return (
      <AppContext.Provider
        value={{ ...this.state, changeTestState: this.changeTestState, storeCertificate: this.storeCertificate }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContext;
