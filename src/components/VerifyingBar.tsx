import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { CERT_VALIDITY_STATUS } from "../constants/CertConstants";

const styles = StyleSheet.create({
  baseBar: {
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },

  validating: {
    backgroundColor: "red"
  },

  verified: {
    backgroundColor: "green"
  },

  invalid: {
    backgroundColor: "red"
  },

  text: {
    color: "white"
  }
});

const VerifyingBar = () => {
  return (
    <View style={[styles.baseBar, styles.validating]}>
      <ActivityIndicator size="large" color="white" />
      <Text style={styles.text}>Verifying Certificate</Text>
    </View>
  );
};

const ValidBar = () => {
  return (
    <View style={[styles.baseBar, styles.verified]}>
      <Text style={styles.text}> Valid </Text>
    </View>
  );
};

const InvalidBar = () => {
  return (
    <View style={[styles.baseBar, styles.invalid]}>
      <Text style={styles.text}> Invalid </Text>
    </View>
  );
};

enum statusEnum {
  VALIDATING,
  VALID,
  INVALID
}

const ValidationBar = ({ certificate }) => {
  const [verificationStatus, setVerificationStatus] = useState(
    statusEnum.VALIDATING
  );

  setTimeout(() => {
    setVerificationStatus(statusEnum.VALID);
  }, 3000);

  if (verificationStatus === statusEnum.VALIDATING) {
    return <VerifyingBar />;
  }
  if (verificationStatus === statusEnum.VALID) {
    return <ValidBar />;
  }
  return <InvalidBar />;
};

export { ValidationBar };
