import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  box: {
    alignItems: "center",
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 10,
    width: "70%",
    justifyContent: "flex-start"
  },

  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5
  },

  modal: {},

  qrCode: {
    backgroundColor: "red",
    borderColor: "black",
    borderWidth: 20
  },

  smallText: {
    fontSize: 16,
    textAlign: "center",
    margin: 5
  },

  text: {
    color: "black",
    fontSize: 24,
    textAlign: "center",
    textAlignVertical: "center",
    margin: 10
  },

  touchable: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  }
});
