import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Constants.statusBarHeight,
    backgroundColor: "#f5f5f5"
  },
  closeIcon: {
    position: "absolute",
    right: Constants.statusBarHeight,
    top: Constants.statusBarHeight,
    zIndex: 999,
    elevation: 10
  }
});
