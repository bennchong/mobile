
import { Constants } from "expo";
import { StyleSheet } from "react-native";

const ScannerPageStyleSheet = StyleSheet.create({
    page: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "stretch",
      marginTop: Constants.statusBarHeight
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
    camera: {
      flex: 15,
      backgroundColor: "whitesmoke"
    },
    titleBarContainer: {
      flex: 1,
      backgroundColor: "gray",
      justifyContent: "center",
      opacity: 0.8
    }
  });

  export default ScannerPageStyleSheet;