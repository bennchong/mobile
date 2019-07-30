import { StyleSheet } from "react-native";
import metrics from "../../../config/metrics";

export const styles = StyleSheet.create({
  textContainer: {
    paddingTop: metrics.RADIUS + 5,
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
  },
  previewContainer: { alignItems: "center", marginTop: 10 },
  previewText: { fontSize: 30, color: "#DAA520", fontWeight: "bold" },
  previewButton: {
    flexDirection: "row",
    backgroundColor: "#DAA520",
    height: 40,
    borderRadius: 30,
    paddingHorizontal: 10,
    justifyContent: "space-around",
    alignItems: "center"
  },
  previewButtonText: { marginLeft: 5 }
});
