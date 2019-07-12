import React from '../../../node_modules/react';
import Profile from "./Stacks/profile/Profile";
import NoProfile from "./Stacks/profile/NoProfile";
import AppContext from "../../components/AppStore";

interface MyProps{
  testState: boolean
}


export default class ProfileScreen extends React.Component<MyProps,{}> {

// Read up on context, it links to AppStore Class apparently, and this.context would allow us to acess AppStore methods and variables  
static contextType = AppContext; 

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