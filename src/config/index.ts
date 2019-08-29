import Constants from "expo-constants";
import { get } from "lodash";

export const VERSION = get(
  Constants,
  "manifest.env.EXPO_GIT_COMMIT",
  "DEV-BUILD"
);
