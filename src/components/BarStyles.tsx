import { StyleSheet } from "react-native";
import { Constants } from "expo";

export const styles = StyleSheet.create({
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
    backgroundColor: "#3FA540"
  },
  invalid: {
    backgroundColor: "#B22222"
  },
  verify: {
    backgroundColor: "#f5f5f5"
  },
  verifyText: {
    color: "#707070"
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },
  icon: {
    marginBottom: 4,
    marginLeft: 5
  }
});
