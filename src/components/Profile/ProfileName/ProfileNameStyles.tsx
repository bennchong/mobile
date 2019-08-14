import { StyleSheet } from "react-native";
import metrics from "../../../config/metrics";

export const styles = StyleSheet.create({
  textContainer: {
    paddingTop: metrics.RADIUS + 10,
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  fin: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#414141"
  },
  name: {
    fontSize: 13,
    color: "#414141"
  },
  shareContainer: {
    marginTop: 5,
    padding: 5,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F4F4"
  },
  shareText: {
    marginLeft: 5,
    fontWeight: "bold",
    color: "#707070",
    fontSize: 11
  }
});
