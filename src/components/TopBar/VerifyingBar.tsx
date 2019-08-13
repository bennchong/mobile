import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";
import { styles } from "./BarStyles";

/* eslint-disable no-unused-vars */
export enum statusEnum {
  VALIDATING,
  VALID,
  INVALID
}
/* eslint-enable */

interface ValidationBarProps {
  status: statusEnum;
  isPreview: boolean;
}

// presentation component, only switch according to props
export const ValidationBar = (props: ValidationBarProps) => {
  let barColor;
  let BarIcon;
  let text;
  switch (props.status) {
    case statusEnum.VALIDATING:
      barColor = { backgroundColor: "#EDB854" };
      BarIcon = () => (
        <ActivityIndicator size="small" color="white" style={styles.icon} />
      );
      text = "VERIFYING";
      break;
    case statusEnum.VALID:
      barColor = { backgroundColor: "#3FA540" };
      BarIcon = () => (
        <AntDesign
          name="checkcircle"
          color="#fff"
          size={18}
          style={styles.icon}
        />
      );
      text = "VALID";
      break;
    default:
      barColor = { backgroundColor: "#D52D2D" };
      BarIcon = () => (
        <AntDesign
          name="closecircle"
          color="#fff"
          size={18}
          style={styles.icon}
        />
      );
      text = "INVALID";
      break;
  }

  return (
    <View
      style={[
        styles.baseBar,
        barColor,
        { height: props.isPreview ? 35 : Constants.statusBarHeight + 35 }
      ]}
    >
      <Text style={styles.text}>{text}</Text>
      <BarIcon />
    </View>
  );
};
