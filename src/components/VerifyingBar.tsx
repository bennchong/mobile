import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";\
import { styles } from "./BarStyles";

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
  if (props.status === statusEnum.VALIDATING) {
    return <VerifyingBar />;
  }
  if (props.status === statusEnum.VALID) {
    return <ValidBar />;
  }
  return <InvalidBar />;
};
