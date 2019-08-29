import Constants from "expo-constants";
import { StyleSheet } from "react-native";
import { midGrey, lighterGrey, white } from "../../themeColors";

const ScannerPageStyleSheet = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    marginTop: Constants.statusBarHeight
  },
  titleBar: {
    color: white,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  camera: {
    flex: 15,
    backgroundColor: lighterGrey
  },
  titleBarContainer: {
    flex: 1,
    backgroundColor: midGrey,
    justifyContent: "center",
    opacity: 0.8
  }
});

export default ScannerPageStyleSheet;
