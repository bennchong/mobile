import { StyleSheet } from "react-native";
import metrics from "../../../config/metrics";

export const styles = StyleSheet.create({
  container: { alignItems: "center" },
  image: {
    width: metrics.DIAMETER,
    height: metrics.DIAMETER,
    borderRadius: metrics.RADIUS,
    borderWidth: 3,
    borderColor: "#fff",
    alignSelf: "center"
  },
  imageContainer: {
    width: metrics.DIAMETER,
    height: metrics.DIAMETER,
    borderRadius: metrics.RADIUS,
    alignContent: "center",
    marginTop: metrics.RADIUS,
    position: "absolute",
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: {
      height: 5,
      width: 5
    },
    elevation: 10
  },
  background: {
    backgroundColor: "#f5f5f5",
    height: metrics.DIAMETER,
    width: "100%",
    alignItems: "center"
  },
  margin: {
    marginHorizontal: 26,
    height: 55
  },
  verifiedText: {
    paddingTop: 5,
    color: "#707070",
    fontSize: 9
  }
});
