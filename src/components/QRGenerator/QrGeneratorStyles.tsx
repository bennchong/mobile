import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import metrics from "../../config/metrics";

export const styles = StyleSheet.create({
  box: {
    alignItems: "center",
    backgroundColor: "white",
    width: metrics.MODAL,
    height: "75%",
    position: "absolute",
    top: Constants.statusBarHeight + 15 + metrics.RADIUS,
    zIndex: 2,
    borderWidth: 1,
    borderColor: "#fff",
    elevation: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.85,
    shadowRadius: 10,
    shadowOffset: {
      height: 5,
      width: 5
    }
  },

  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5
  },
  qrCode: {
    backgroundColor: "red",
    borderColor: "black",
    borderWidth: 20
  },
  dateText: {
    marginTop: 10,
    fontSize: 10,
    color: "#707070",
    fontWeight: "100"
  },
  exitText: {
    fontSize: 14,
    color: "#838383",
    textAlign: "center"
  },
  qrContainer: {
    width: metrics.MODAL_QR_CONTAINER,
    height: metrics.MODAL_QR_CONTAINER,
    backgroundColor: "#fff",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center"
  },

  touchable: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)"
  },

  image: {
    width: metrics.DIAMETER,
    height: metrics.DIAMETER,
    borderRadius: metrics.RADIUS,
    position: "absolute",
    zIndex: 99,

    borderWidth: 3,
    borderColor: "#fff",
    alignSelf: "center"
  },
  imageContainer: {
    width: metrics.DIAMETER,
    height: metrics.DIAMETER,
    borderRadius: metrics.RADIUS,
    alignSelf: "center",
    top: metrics.RADIUS - 20,
    position: "absolute",
    zIndex: 98,
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: {
      height: 5,
      width: 5
    },
    elevation: 10
  },
  text: {
    alignSelf: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: "#434343",
    position: "absolute",
    zIndex: 99
  },
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
  }
});
