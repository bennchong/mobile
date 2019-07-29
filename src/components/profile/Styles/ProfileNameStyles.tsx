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
    fontSize: 20
  },
  name: {
    fontSize: 15
  },
  shareContainer: {
    marginTop: 5,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5"
  },
  shareText: { marginLeft: 5, fontWeight: "bold", color: "#808080" },
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
