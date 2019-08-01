import { Dimensions, Platform } from "react-native";

const IS_ANDROID = Platform.OS === "android";
const { height, width } = Dimensions.get("window");

export default {
  ANDROID_STATUSBAR: 24,
  DEVICE_HEIGHT: IS_ANDROID ? height - 24 : height,
  DEVICE_WIDTH: width,
  DIAMETER: (3 * width) / 10,
  RADIUS: (3 * width) / 20,
  MODAL: (width / 4) * 3,
  MODAL_QR_CONTAINER: (width / 4) * 3 - 50,
  MODAL_QR: (width / 4) * 3 - 80
};
