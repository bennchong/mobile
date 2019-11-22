import { StyleSheet } from "react-native";
import metrics from "../../../../../../config/metrics";
import {
  darkGrey,
  white,
  midLightGrey,
  lightestGrey
} from "../../../../../../themeColors";

export const styles = StyleSheet.create({
  textContainer: {
    paddingTop: metrics.RADIUS + 10,
    backgroundColor: white,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  fin: {
    fontWeight: "bold",
    fontSize: 18,
    color: darkGrey
  },
  name: {
    fontSize: 13,
    color: darkGrey
  },
  shareContainer: {
    marginTop: 5,
    marginBottom: 5,
    padding: 5,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: lightestGrey
  },
  shareText: {
    marginLeft: 5,
    fontWeight: "bold",
    color: midLightGrey,
    fontSize: 16
  }
});
