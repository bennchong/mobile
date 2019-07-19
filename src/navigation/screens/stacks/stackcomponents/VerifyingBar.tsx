import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { CERT_VALIDITY_STATUS } from "../../../../constants/CertConstants";

const styles = StyleSheet.create({
  validating: {
    flex: 0.075,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    marginTop: 5
  },

  verified: {
    flex: 0.075,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    marginTop: 5
  },

  invalid: {
    flex: 0.075,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    backgroundColor: "red",
    marginTop: 5
  },

  text: {
    color: "white"
  }
});

interface MyProps {
  status: String;
}
interface MyState {}

export default class VerifyingBar extends React.Component<MyProps, MyState> {
  render() {
    if (this.props.status === CERT_VALIDITY_STATUS.VALIDATING) {
      return (
        <View style={[styles.validating]}>
          <ActivityIndicator size="large" color="white" />
          <Text style={styles.text}> PlaceHolder Verifying Certificate </Text>
        </View>
      );
    }
    if (this.props.status === CERT_VALIDITY_STATUS.VALID) {
      return (
        <View style={[styles.verified]}>
          <Text style={styles.text}> Valid </Text>
        </View>
      );
    }

    if (this.props.status === CERT_VALIDITY_STATUS.INVALID) {
      return (
        <View style={[styles.invalid]}>
          <Text style={styles.text}> Invalid </Text>
        </View>
      );
    }

    return (
      <View style={[styles.invalid]}>
        <Text style={styles.text}> You should not be seeing this </Text>
      </View>
    );
  }
}
