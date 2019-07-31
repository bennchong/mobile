import { StyleSheet } from "react-native";
import metrics from "../../config/metrics";

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
    backgroundColor: "#32CD32",
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
    width: (2 * metrics.DEVICE_WIDTH) / 3,
    height: (2 * metrics.DEVICE_WIDTH) / 3,
    borderRadius: 30,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  modalText: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
    textAlign: "center"
  },
  modalButton: {
    backgroundColor: "#f5f5f5",
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  }
});
