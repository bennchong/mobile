import * as FileSystem from "expo-file-system";
import { AsyncStorage } from "react-native";

const MAIN_PASS_DIRECTORY = `${FileSystem.documentDirectory}mainWorkpass`;
const DEPENDENT_PASS_DIRECTORY = `${FileSystem.documentDirectory}DPWorkpass`;

export const checkStoredWorkpassExists = async () => {
  const info = await FileSystem.getInfoAsync(MAIN_PASS_DIRECTORY);
  return info.exists;
};

export const checkStoredDPWorkpassExists = async () => {
  const info = await FileSystem.getInfoAsync(DEPENDENT_PASS_DIRECTORY);
  return info.exists;
};

export const getStoredWorkpass = async () => {
  const documentAsString = await FileSystem.readAsStringAsync(
    MAIN_PASS_DIRECTORY
  );
  return JSON.parse(documentAsString);
};

export const getStoredDPWorkpass = async () => {
  const arrayAsString = await FileSystem.readAsStringAsync(
    DEPENDENT_PASS_DIRECTORY
  );
  return JSON.parse(arrayAsString);
};

export const storeWorkpass = workpass => {
  return FileSystem.writeAsStringAsync(
    MAIN_PASS_DIRECTORY,
    JSON.stringify(workpass)
  );
};

export const storeDPWorkpass = array => {
  return FileSystem.writeAsStringAsync(
    DEPENDENT_PASS_DIRECTORY,
    JSON.stringify(array)
  );
};

export const deleteStoredDPWorkpass = () => {
  return FileSystem.deleteAsync(DEPENDENT_PASS_DIRECTORY);
};

export const deleteStoredWorkpass = () => {
  return FileSystem.deleteAsync(MAIN_PASS_DIRECTORY);
};

const TIME_ACCEPTED_KEY = "@storedTimeAccepted";

export const storeTimeAccepted = timeAcceptedArray => {
  return AsyncStorage.setItem(
    TIME_ACCEPTED_KEY,
    JSON.stringify(timeAcceptedArray)
  );
};

export const getStoredTimeAccepted = async () => {
  const arrayAsString = await AsyncStorage.getItem(TIME_ACCEPTED_KEY);
  return arrayAsString;
};

export const deleteStoredTimeAccepted = () => {
  return AsyncStorage.removeItem(TIME_ACCEPTED_KEY);
};

const TIME_VERIFIED_KEY = "@storedTimeVerified";

export const storeTimeVerified = timeVerifiedArray => {
  return AsyncStorage.setItem(
    TIME_VERIFIED_KEY,
    JSON.stringify(timeVerifiedArray)
  );
};

export const getStoredTimeVerified = () => {
  return AsyncStorage.getItem(TIME_VERIFIED_KEY);
};

export const deleteStoredTimeVerified = () => {
  return AsyncStorage.removeItem(TIME_VERIFIED_KEY);
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

export const checkNumberOfProfiles = async () => {
  let numberOfProfiles = 0;
  if (await checkStoredWorkpassExists()) numberOfProfiles += 1;
  if (await checkStoredDPWorkpassExists()) {
    const DPWorkpass = await getStoredDPWorkpass();
    numberOfProfiles += DPWorkpass.length;
  }
  return numberOfProfiles;
};
