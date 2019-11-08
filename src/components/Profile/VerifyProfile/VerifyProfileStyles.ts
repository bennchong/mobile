import { StyleSheet } from "react-native";
import metrics from "../../../config/metrics";
import { white, lightGrey, darkerGrey, green, red } from "../../../themeColors";

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
    fontSize: 13,
    color: darkerGrey
  },
  button: {
    backgroundColor: green,
    borderRadius: 14,
    paddingHorizontal: 40,
    paddingVertical: 15,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonReject: {
    backgroundColor: red,
    borderRadius: 14,
    paddingHorizontal: 40,
    paddingVertical: 15,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: { color: white, fontWeight: "bold", fontSize: 13 },
  modalContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  modal: {
    width: (2 * metrics.DEVICE_WIDTH) / 3,
    height: (2 * metrics.DEVICE_WIDTH) / 3,
    borderRadius: 30,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: white
  },
  modalText: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
    textAlign: "center"
  },
  modalButton: {
    backgroundColor: lightGrey,
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 5,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  modalButtonText: {
    fontWeight: "bold"
  }
});
