import React, { useContext } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";
import { StateContext } from "../state/index";

const styles = StyleSheet.create({
  baseBar: {
    flexDirection: "row",
    height: Constants.statusBarHeight + 35,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingBottom: 5
  },
  validating: {
    backgroundColor: "#DAA520"
  },
  verified: {
    backgroundColor: "#32CD32"
  },
  invalid: {
    backgroundColor: "#B22222"
  },
  verify: {
    backgroundColor: "#f5f5f5"
  },
  verifyText: {
    color: "#808080"
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18
  },
  icon: {
    marginBottom: 4,
    marginLeft: 5
  }
});

const VerifyYourID = () => {
  return (
    <View style={[styles.baseBar, styles.verify]}>
      <Text style={styles.verifyText}>
        Please verify your ID and accept it below
      </Text>
    </View>
  );
};

const VerifyingBar = () => {
  return (
    <View style={[styles.baseBar, styles.validating]}>
      <ActivityIndicator size="small" color="white" />
      <Text style={styles.text}>VERIFYING</Text>
    </View>
  );
};

const ValidBar = () => {
  return (
    <View style={[styles.baseBar, styles.verified]}>
      <Text style={styles.text}>VALID</Text>
      <AntDesign
        name="checkcircle"
        color="#fff"
        size={15}
        style={styles.icon}
      />
    </View>
  );
};

const InvalidBar = () => {
  return (
    <View style={[styles.baseBar, styles.invalid]}>
      <Text style={styles.text}>INVALID</Text>
      <AntDesign
        name="closecircle"
        color="#fff"
        size={15}
        style={styles.icon}
      />
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
  const context = useContext(StateContext);
  const { workpassAccepted } = context[0];
  if (!workpassAccepted) {
    return <VerifyYourID />;
  }

  if (props.status === statusEnum.VALIDATING) {
    return <VerifyingBar />;
  }
  if (props.status === statusEnum.VALID) {
    return <ValidBar />;
  }
  return <InvalidBar />;
};
