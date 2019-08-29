import { StyleSheet } from "react-native";
import metrics from "../../../config/metrics";
import { white, lighterGrey, midLightGrey, black } from "../../../themeColors";

export const styles = StyleSheet.create({
  container: { alignItems: "center" },
  image: {
    width: metrics.DIAMETER,
    height: metrics.DIAMETER,
    borderRadius: metrics.RADIUS,
    borderWidth: 3,
    borderColor: white,
    alignSelf: "center"
  },
  imageContainer: {
    width: metrics.DIAMETER,
    height: metrics.DIAMETER,
    borderRadius: metrics.RADIUS,
    alignContent: "center",
    marginTop: metrics.RADIUS,
    position: "absolute",
    shadowColor: black,
    shadowOpacity: 0.15,
    shadowOffset: {
      height: 5,
      width: 5
    },
    elevation: 10
  },
  background: {
    backgroundColor: lighterGrey,
    height: metrics.DIAMETER,
    width: "100%",
    alignItems: "center"
  },
  margin: {
    backgroundColor: white,
    width: "100%",
    height: 55
  },
  verifiedText: {
    paddingTop: 5,
    color: midLightGrey,
    fontSize: 9
  }
});
