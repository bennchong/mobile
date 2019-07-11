import React from '../../../node_modules/react';
import { StyleSheet, Text, View } from 'react-native';
import ProfileScreen from './ProfileScreen';
import AppContext from "../../components/AppContext";

export default class ProfileTab extends React.Component {
  render() {
      return (
          <AppContext.Consumer>
              {({test , changeTestState}) => (<ProfileScreen testState={test}/>)}
          </AppContext.Consumer>         
        // <AppContext.Provider>
        //     {(test) => (
        //         <ProfileScreen testState={test}/>
        //     )}
        // </AppContext.Provider>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});