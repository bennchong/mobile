import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "whitesmoke",
    marginTop: Constants.statusBarHeight
  },
  titleBarBackground: {
    flex: 1,
    backgroundColor: "gray",
    justifyContent: "center",
    opacity: 0.8
  },
  titleBar: {
    color: "white",
    fontSize: 24,
    opacity: 1,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  contentScreen: {
    flex: 15,
    alignItems: "stretch",
    justifyContent: "flex-start"
  }
});
