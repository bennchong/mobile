import { StyleSheet } from "react-native";

const diameter = 200;
const borderWidth = 4;
const offset = 10;
const headerHeight = diameter / 2 + borderWidth + offset;

const ProfileStyle = StyleSheet.create({
  avatar: {
    width: diameter,
    height: diameter,
    borderRadius: 100,
    borderWidth,
    borderColor: "white",
    alignSelf: "center",
    justifyContent: "center"
  },
  avatarContainer: {
    alignContent: "center",
    justifyContent: "center",
    position: "absolute"
  },
  avatarBackground: {
    alignSelf: "stretch",
    backgroundColor: "#00BFFF",
    height: headerHeight
  }
});

export { ProfileStyle };
