import { StyleSheet } from "react-native";
import metrics from "../../../../../../config/metrics";
import {
  white,
  lighterGrey,
  midLightGrey,
  black
} from "../../../../../../themeColors";

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
  imageLeftContainer: {
    right: metrics.DEVICE_WIDTH / 1.15,
    position: "absolute",
    zIndex: 10
  },
  imageLeft: {
    width: metrics.DIAMETER,
    height: metrics.DIAMETER,
    borderRadius: metrics.RADIUS,
    borderWidth: 3,
    borderColor: "#fff",
    opacity: 0.4
  },
  imageRightContainer: {
    left: metrics.DEVICE_WIDTH / 1.15,
    position: "absolute",
    zIndex: 10
  },
  imageRight: {
    width: metrics.DIAMETER,
    height: metrics.DIAMETER,
    borderRadius: metrics.RADIUS,
    borderWidth: 3,
    borderColor: "#fff",
    opacity: 0.4
  },
  imageContainer: {
    alignContent: "center",
    width: metrics.DEVICE_WIDTH,
    marginTop: metrics.RADIUS,
    position: "absolute",
    shadowColor: black,
    shadowOpacity: 0.15,
    shadowOffset: {
      height: 5,
      width: 5
    },
    elevation: 10
  }
});
