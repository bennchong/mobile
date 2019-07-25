import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

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
      <Text style={styles.text}>Verifying workpass</Text>
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

/* eslint-disable no-unused-vars */
export enum statusEnum {
  VALIDATING,
  VALID,
  INVALID
}
/* eslint-enable */

interface ValidationBarProps {
  status: statusEnum;
}

// presentation component, only switch according to props
export const ValidationBar = (props: ValidationBarProps) => {
  // const [verificationStatus, setVerificationStatus] = useState(
  //   statusEnum.VALIDATING
  // );

  if (props.status === statusEnum.VALIDATING) {
    return <VerifyingBar />;
  }
  if (props.status === statusEnum.VALID) {
    return <ValidBar />;
  }
  return <InvalidBar />;
};
