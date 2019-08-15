import { StyleSheet } from "react-native";
import metrics from "../../config/metrics";
import Constants from "expo-constants";

export const styles = StyleSheet.create({
  container: {
    height: 100,
    width: metrics.DEVICE_WIDTH / 2,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 50
  },
  acknowledgeText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#808080"
  },
  button: {
    backgroundColor: "#5FC660",
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 5,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  modalContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  modal: {
    width: metrics.DEVICE_WIDTH - 50,
    height: metrics.DEVICE_WIDTH - 50,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  modalText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#4E4C4C",
    marginTop: 20,
    textAlign: "center"
  },
  modalSecondaryText: {
    fontSize: 14,
    color: "#919191",
    textAlign: "center",
    marginTop: 20,
    paddingHorizontal: 20
  },
  modalButton: {
    backgroundColor: "#f5f5f5",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  closeModalText: { color: "#4E4C4C", fontWeight: "500", fontSize: 14 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  closeIcon: {
    position: "absolute",
    top: Constants.statusBarHeight,
    right: 20,
    zIndex: 1000
  }
});
