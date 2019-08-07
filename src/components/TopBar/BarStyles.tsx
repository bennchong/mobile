import { StyleSheet } from "react-native";
import { Constants } from "expo";

export const styles = StyleSheet.create({
  baseBar: {
    flexDirection: "row",
    height: Constants.statusBarHeight + 35,
    justifyContent: "center",
    paddingBottom: 5,
    alignItems: "flex-end"
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
