import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const styles = StyleSheet.create({
  baseBar: {
    flexDirection: "row",
    height: Constants.statusBarHeight + 35,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingBottom: 5
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
    marginLeft: 5
  }
});
