import * as FileSystem from "expo-file-system";
import { AsyncStorage } from "react-native";
import { getCurrentDateAndTime } from "./date";

const DEFAULT_FILE_NAME = `${FileSystem.documentDirectory}workpass`;

export const checkStoredWorkpassExists = async () => {
  const info = await FileSystem.getInfoAsync(DEFAULT_FILE_NAME);
  return info.exists;
};

export const getStoredWorkpass = async () => {
  const documentAsString = await FileSystem.readAsStringAsync(
    DEFAULT_FILE_NAME
  );
  return JSON.parse(documentAsString);
};

export const storeWorkpass = workpass => {
  return FileSystem.writeAsStringAsync(
    DEFAULT_FILE_NAME,
    JSON.stringify(workpass)
  );
};

export const deleteStoredWorkpass = () => {
  return FileSystem.deleteAsync(DEFAULT_FILE_NAME);
};

const TIME_ACCEPTED_KEY = "@storedTimeAccepted";

export const storeTime = () => {
  return AsyncStorage.setItem(TIME_ACCEPTED_KEY, getCurrentDateAndTime());
};

export const getStoredTime = () => {
  return AsyncStorage.getItem(TIME_ACCEPTED_KEY);
};

export const deleteStoredTime = () => {
  return AsyncStorage.removeItem(TIME_ACCEPTED_KEY);
};

export const getStoredWorkpassIfExists = async () => {
  try {
    const documentJSON = await getStoredWorkpass();
    return documentJSON;
  } catch (e) {
    if (e.message.includes("No such file or directory")) return null;
    throw e;
  }
};
