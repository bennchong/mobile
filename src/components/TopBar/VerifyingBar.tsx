import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";
import { verificationStatusEnum } from "../../services/verificationService/verificationService";
import { styles } from "./BarStyles";
import { white, midGreen, midYellow, darkRed, red } from "../../themeColors";

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
      barColor = { backgroundColor: midYellow };
      // eslint-disable-next-line react/display-name
      BarIcon = () => (
        <ActivityIndicator size="small" color={white} style={styles.icon} />
      );
      text = "VERIFYING";
      break;
    case verificationStatusEnum.VALID:
      barColor = { backgroundColor: midGreen };
      // eslint-disable-next-line react/display-name
      BarIcon = () => (
        <AntDesign
          name="checkcircle"
          color={white}
          size={18}
          style={[styles.icon, { marginBottom: 3 }]}
        />
      );
      text = "VALID";
      break;
    case verificationStatusEnum.EXPIRED:
      barColor = { backgroundColor: red };
      // eslint-disable-next-line react/display-name
      BarIcon = () => (
        <AntDesign
          name="calendar"
          color={white}
          size={18}
          style={[styles.icon, { marginBottom: 3 }]}
        />
      );
      text = "EXPIRED";
      break;
    case verificationStatusEnum.EXPIREDWITHLEGALSTAY:
      barColor = { backgroundColor: "orange" };
      // eslint-disable-next-line react/display-name
      BarIcon = () => (
        <AntDesign
          name="infocirlce"
          color={white}
          size={15}
          style={[styles.icon, { marginBottom: 3 }]}
        />
      );
      text = "EXPIRED WITH LEGAL STAY";
      break;
    case verificationStatusEnum.TAMPERED:
      barColor = { backgroundColor: red };
      // eslint-disable-next-line react/display-name
      BarIcon = () => (
        <AntDesign
          name="exclamationcircle"
          color={white}
          size={15}
          style={[styles.icon, { marginBottom: 3 }]}
        />
      );
      text = "TAMPERED";
      break;
    case verificationStatusEnum.REVOKED:
      barColor = { backgroundColor: red };
      // eslint-disable-next-line react/display-name
      BarIcon = () => (
        <AntDesign
          name="warning"
          color={white}
          size={15}
          style={[styles.icon, { marginBottom: 3 }]}
        />
      );
      text = "REVOKED";
      break;
    case verificationStatusEnum.REVOKEDWITHLEGALSTAY:
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
      text = "REVOKED WITH LEGAL STAY";
      break;
    default:
      barColor = { backgroundColor: darkRed };
      // eslint-disable-next-line react/display-name
      BarIcon = () => (
        <AntDesign
          name="closecircle"
          color={white}
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
