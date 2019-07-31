import * as FileSystem from "expo-file-system";

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

const TIME_ACCEPTED_FILE_NAME = "@storedTimeAccepted";

export const setTimeAccepted = time => {
  return FileSystem.writeAsStringAsync(TIME_ACCEPTED_FILE_NAME, time);
};

export const getTimeAccepted = () => {
  return FileSystem.readAsStringAsync(TIME_ACCEPTED_FILE_NAME);
};

export const resetTimeAccepted = () => {
  return FileSystem.deleteAsync(TIME_ACCEPTED_FILE_NAME);
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
