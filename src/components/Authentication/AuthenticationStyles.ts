import { StyleSheet, Platform } from "react-native";

export const CELL_SIZE = 70;
export const CELL_BORDER_RADIUS = 8;
export const DEFAULT_CELL_BG_COLOR = "#fff";
export const NOT_EMPTY_CELL_BG_COLOR = "#3557b7";
export const ACTIVE_CELL_BG_COLOR = "#f7fafe";

export default StyleSheet.create({
  inputWrapper: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "center"
  },

  inputLabel: {
    marginTop: 50,
    color: "#000",
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    paddingBottom: 40
  },

  icon: {
    alignSelf: "center"
  },
  inputSubLabel: {
    paddingTop: 30,
    color: "#000",
    textAlign: "center"
  },
  inputWrapStyle: {
    height: CELL_SIZE,
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: "space-between"
  },

  input: {
    margin: 0,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: 55,
    ...Platform.select({
      web: {
        lineHeight: 65
      }
    }),
    fontSize: 30,
    borderRadius: CELL_BORDER_RADIUS,
    color: "#3759b8",
    backgroundColor: "#fff",

    // IOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3
  }
});
