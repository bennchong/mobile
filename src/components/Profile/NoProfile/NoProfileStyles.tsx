import { StyleSheet } from "react-native";
import metrics from "../../../config/metrics";
import { lighterGrey, red } from "../../../themeColors";

export const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  warningContainer: {
    width: (2 * metrics.DEVICE_WIDTH) / 3,
    height: (2 * metrics.DEVICE_WIDTH) / 3,
    backgroundColor: lighterGrey,
    borderRadius: 30,
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  mainText: {
    color: red,
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10
  },
  sideText: {
    fontSize: 15,
    marginTop: 10,
    textAlign: "center"
  }
});
