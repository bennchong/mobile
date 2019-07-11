import React from '../../../node_modules/react';
import { StyleSheet, Text, View } from 'react-native';
import ProfileScreen from './ProfileScreen';
import AppContext from "../../components/AppContext";

export default class ProfileTab extends React.Component {
  render() {
      return (
          <AppContext.Consumer>
              {({test}) => (<ProfileScreen testState={test}/>)}
          </AppContext.Consumer>         
      );
  }
}