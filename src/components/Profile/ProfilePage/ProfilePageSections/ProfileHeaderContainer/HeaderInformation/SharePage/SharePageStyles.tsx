import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import {
  black,
  midDarkGrey,
  darkGrey,
  midLightGrey,
  white,
  darkestBlue,
  red
} from "../../../../../../../themeColors";
import metrics from "../../../../../../../config/metrics";

export const styles = StyleSheet.create({
  box: {
    backgroundColor: white,
    width: metrics.MODAL,
    height: "75%",
    position: "absolute",
    top: Constants.statusBarHeight + 35 + metrics.RADIUS,
    zIndex: 2,
    borderWidth: 1,
    borderColor: white,
    elevation: 10,
    shadowColor: black,
    shadowOpacity: 0.85,
    shadowRadius: 10,
    shadowOffset: {
      height: 5,
      width: 5
    }
  },
  overlay: { resizeMode: "cover", height: "100%" },

  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5
  },
  qrCode: {
    backgroundColor: red,
    borderColor: black,
    borderWidth: 20
  },
  dateText: {
    marginTop: 10,
    fontSize: 10,
    color: midLightGrey,
    fontWeight: "100",
    alignSelf: "center"
  },
  exitText: {
    fontSize: 14,
    color: midDarkGrey,
    textAlign: "center",
    marginTop: 20
  },
  qrContainer: {
    alignSelf: "center",
    width: metrics.MODAL_QR_CONTAINER,
    height: metrics.MODAL_QR_CONTAINER,
    backgroundColor: white,
    marginTop: 20,
    shadowColor: black,
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
    borderColor: white,
    alignSelf: "center"
  },
  imageContainer: {
    width: metrics.DIAMETER,
    height: metrics.DIAMETER,
    borderRadius: metrics.RADIUS,
    alignSelf: "center",
    top: Constants.statusBarHeight + 40,
    position: "absolute",
    zIndex: 98,
    shadowColor: black,
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
    color: darkGrey,
    position: "absolute",
    top: Constants.statusBarHeight,
    zIndex: 99
  },
  textContainer: {
    paddingTop: metrics.RADIUS + 10,
    backgroundColor: white,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },

  name: {
    fontWeight: "bold",
    fontSize: 18,
    color: darkGrey
  },
  infoText: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 5,
    color: midLightGrey,
    fontSize: 11
  },

  flatList: { paddingHorizontal: 10 },
  separator: {
    height: 0.5,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.8)"
  },

  profileSelector: {
    width: "100%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: darkestBlue,
    marginVertical: 5,
    borderRadius: 20
  },
  profileSelectorText: { color: white, fontWeight: "bold" },
  obfuscateContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingVertical: 10,
    paddingLeft: 16
  },
  button: {
    padding: 10,
    alignSelf: "center",
    backgroundColor: darkestBlue,
    marginVertical: 5,
    borderRadius: 20
  },
  buttonText: { color: white, fontWeight: "bold" }
});
