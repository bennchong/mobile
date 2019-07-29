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

export const storeWorkpass = workpass => {
  return FileSystem.writeAsStringAsync(
    DEFAULT_FILE_NAME,
    JSON.stringify(workpass)
  );
};

export const deleteStoredworkpass = () => {
  return FileSystem.deleteAsync(DEFAULT_FILE_NAME);
};
