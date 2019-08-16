import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";
import { verificationStatusEnum } from "../../services/verificationService/verificationService";
import { styles } from "./BarStyles";

interface ValidationBarProps {
  status: verificationStatusEnum;
  isPreview: boolean;
}

// presentation component, only switch according to props
export const ValidationBar = (props: ValidationBarProps) => {
  let barColor;
  let BarIcon;
  let text;
  switch (props.status) {
    case verificationStatusEnum.VALIDATING:
      barColor = { backgroundColor: "#EDB854" };
      // eslint-disable-next-line react/display-name
      BarIcon = () => (
        <ActivityIndicator size="small" color="white" style={styles.icon} />
      );
      text = "VERIFYING";
      break;
    case verificationStatusEnum.VALID:
      barColor = { backgroundColor: "#3FA540" };
      // eslint-disable-next-line react/display-name
      BarIcon = () => (
        <AntDesign
          name="checkcircle"
          color="#fff"
          size={18}
          style={[styles.icon, { marginBottom: 3 }]}
        />
      );
      text = "VALID";
      break;
    case verificationStatusEnum.EXPIRED:
      barColor = { backgroundColor: "red" };
      // eslint-disable-next-line react/display-name
      BarIcon = () => (
        <AntDesign
          name="calendar"
          color="#fff"
          size={18}
          style={[styles.icon, { marginBottom: 3 }]}
        />
      );
      text = "EXPIRED WITHOUT LEGAL STAY";
      break;
    case verificationStatusEnum.EXPIREDWITHLEGALSTAY:
      barColor = { backgroundColor: "orange" };
      // eslint-disable-next-line react/display-name
      BarIcon = () => (
        <AntDesign
          name="infocirlce"
          color="#fff"
          size={15}
          style={[styles.icon, { marginBottom: 3 }]}
        />
      );
      text = "EXPIRED WITH LEGAL STAY";
      break;
    case verificationStatusEnum.TAMPERED:
      barColor = { backgroundColor: "red" };
      // eslint-disable-next-line react/display-name
      BarIcon = () => (
        <AntDesign
          name="exclamationcircle"
          color="#fff"
          size={15}
          style={[styles.icon, { marginBottom: 3 }]}
        />
      );
      text = "TAMPERED";
      break;
    case verificationStatusEnum.REVOKED:
      barColor = { backgroundColor: "red" };
      // eslint-disable-next-line react/display-name
      BarIcon = () => (
        <AntDesign
          name="warning"
          color="#fff"
          size={15}
          style={[styles.icon, { marginBottom: 3 }]}
        />
      );
      text = "REVOKED";
      break;
    default:
      barColor = { backgroundColor: "#D52D2D" };
      // eslint-disable-next-line react/display-name
      BarIcon = () => (
        <AntDesign
          name="closecircle"
          color="#fff"
          size={18}
          style={[styles.icon, { marginBottom: 3 }]}
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
