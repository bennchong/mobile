import Constants from "expo-constants";
import { get } from "lodash";

export const VERSION = get(Constants, "manifest", "DEV-BUILD");
