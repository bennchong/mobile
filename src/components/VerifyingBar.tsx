import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  baseBar: {
    flexDirection: "row",
    height: Constants.statusBarHeight + 35,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingBottom: 5
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
  let barColor;
  let icon;
  let text;
  switch (props.status) {
    case statusEnum.VALIDATING:
      barColor = { backgroundColor: "#DAA520" };
      icon = <ActivityIndicator size="small" color="white" />;
      text = "VERIFYING";
      break;
    case statusEnum.VALID:
      barColor = { backgroundColor: "#32CD32" };
      icon = (
        <AntDesign
          name="checkcircle"
          color="#fff"
          size={15}
          style={styles.icon}
        />
      );
      text = "VALID";
      break;
    case statusEnum.INVALID:
      barColor = { backgroundColor: "#B22222" };
      icon = (
        <AntDesign
          name="closecircle"
          color="#fff"
          size={15}
          style={styles.icon}
        />
      );
      text = "INVALID";
      break;
  }

  return (
    <View style={[styles.baseBar, barColor]}>
      <Text style={styles.text}>{text}</Text>
      {icon}
    </View>
  );
};
