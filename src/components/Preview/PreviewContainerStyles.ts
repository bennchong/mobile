import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { lighterGrey } from "../../themeColors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Constants.statusBarHeight,
    backgroundColor: lighterGrey
  },
  closeIcon: {
    position: "absolute",
    right: Constants.statusBarHeight,
    top: Constants.statusBarHeight,
    zIndex: 999,
    elevation: 10
  }
});
