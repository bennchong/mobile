import { StyleSheet, Text, View, Alert } from "react-native";
import { withNavigation } from "react-navigation";
import React from "react";
import { ValidationBar } from "../../../components/VerifyingBar";
import {
  sampleCert,
  CERT_VALIDITY_STATUS
} from "../../../constants/CertConstants";

import ProfilePreviewSection from "../../../components/ProfilePreviewSection";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "stretch"
  }
});

class ProfilePreviewPage extends React.Component {
  state = {
    cert_status: CERT_VALIDITY_STATUS.VALIDATING
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      // The screen is focused
      // Call any action
      this.setState({
        cert_status: CERT_VALIDITY_STATUS.VALIDATING
      });
      setTimeout(() => {
        this.setState({ cert_status: CERT_VALIDITY_STATUS.VALID });
      }, 5000);
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  render() {
    const { navigation } = this.props;
    const certificate = navigation.getParam("certificate");

    return (
      <View style={styles.container}>
        <ValidationBar certificate={sampleCert} />
        <ProfilePreviewSection
          certificate={certificate}
          navigation={navigation}
        />
      </View>
    );
  }
}

export default withNavigation(ProfilePreviewPage);
