import * as FileSystem from "expo-file-system";


const DEFAULT_FILE_NAME = `${FileSystem.documentDirectory}workpass`;

export const checkStoredworkpassExists = async () => {
  const info = await FileSystem.getInfoAsync(DEFAULT_FILE_NAME);
  return info.exists;
};

export const getStoredworkpass = async () => {
  const documentAsString = await FileSystem.readAsStringAsync(
    DEFAULT_FILE_NAME
  );
  return JSON.parse(documentAsString);
};

export const storeworkpass = workpass => {
  return FileSystem.writeAsStringAsync(
    DEFAULT_FILE_NAME,
    JSON.stringify(workpass)
  );
};

export const deleteStoredworkpass = () => {
  return FileSystem.deleteAsync(DEFAULT_FILE_NAME);
};

const TIME_ACCEPTED_FILE_NAME = "@storedTimeAccepted"

export const setTimeAccepted = (time) => {
  return FileSystem.writeAsStringAsync(TIME_ACCEPTED_FILE_NAME, time);
};

export const getTimeAccepted = () => {
  return FileSystem.readAsStringAsync(TIME_ACCEPTED_FILE_NAME);
};

export const resetTimeAccepted = () => {
  return FileSystem.deleteAsync(TIME_ACCEPTED_FILE_NAME);

};