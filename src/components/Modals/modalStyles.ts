import { StyleSheet } from "react-native";
import metrics from "../../config/metrics";
import { white, midGrey, green, lighterGrey } from "../../themeColors";

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
    color: midGrey
  },
  button: {
    backgroundColor: green,
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 5,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    resizeMode: "cover",
    height: "100%"
  },
  buttonText: { color: white, fontWeight: "bold" },
  modalContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  modal: {
    width: metrics.DEVICE_WIDTH - 50,
    height: metrics.DEVICE_WIDTH - 50,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: white
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
    backgroundColor: lighterGrey,
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
  }
});
