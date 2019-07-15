import React from '../../../node_modules/react';
import Profile from "./Stacks/profile/Profile";
import NoProfile from "./Stacks/profile/NoProfile";
import AppContext from "../../components/AppStore";
import { withNavigation } from "react-navigation";
import { Alert } from 'react-native';

class ProfileScreen extends React.Component<{},{}> {

// Read up on context, it links to AppStore Class apparently, and this.context would allow us to acess AppStore methods and variables  
static contextType = AppContext; 
  
  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      // The screen is focused
      // Call any action
      Alert.alert("Running re-verification placeholder function")
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  render() {
    if(this.context.test) {
      return(
        <Profile />
      );
    }
    else {
      return(
        <NoProfile />
      )
    }
  }
}

export default withNavigation(ProfileScreen);