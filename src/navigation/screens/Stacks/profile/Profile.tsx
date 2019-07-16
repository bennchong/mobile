import { StyleSheet, Text, View, Alert } from "react-native";
import { withNavigation } from "react-navigation";
import VerifyingBar from "../components/VerifyingBar";

import React from "../../../../../node_modules/react";
import ProfileSection from "./ProfileSection";

class Profile extends React.Component {
  state = {
    cert_status: "validating"
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      // The screen is focused
      // Call any action
      this.setState({
        cert_status: "validating"
      });

      Alert.alert("Running re-verification placeholder function");
      setTimeout(() => {
        this.setState({ cert_status: "validated" });
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
        <VerifyingBar status={this.state.cert_status} />
        <ProfileSection />
      </View>
    );
  }
}

export default withNavigation(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "stretch"
  }
});
