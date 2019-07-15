import React from '../../../../../node_modules/react';
import { StyleSheet, Text, View } from 'react-native';
import VerifyingBar from '../components/VerifyingBar';
import { withNavigation } from "react-navigation";
import { Alert } from 'react-native';

class Profile extends React.Component {

  state = {
    cert_status : 'validating'
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      // The screen is focused
      // Call any action
      this.setState({
        cert_status : 'validating'
      });

      Alert.alert("Running re-verification placeholder function")
      setTimeout(() => 
        {
          this.setState({cert_status : 'validated'})
        }, 5000);

    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <VerifyingBar status={this.state.cert_status}/>
        <Text>Profile Page Placeholder</Text>
      </View>
    );
  }
}

export default withNavigation(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: "stretch",
  },
});