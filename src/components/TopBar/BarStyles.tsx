import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { white, lighterGrey, midGrey } from "../../themeColors";

export const styles = StyleSheet.create({
  baseBar: {
    flexDirection: "row",
    height: Constants.statusBarHeight + 35,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingBottom: 5
  },
  verify: {
    backgroundColor: lighterGrey
  },
  verifyText: {
    color: midGrey
  },
  text: {
    color: white,
    fontWeight: "bold",
    fontSize: 18
  },
  icon: {
    marginLeft: 5
  }
});
