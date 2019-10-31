import * as FileSystem from "expo-file-system";

const MAIN_PASS_DIRECTORY = `${FileSystem.documentDirectory}mainWorkpass`;
const DEPENDENT_PASS_DIRECTORY = `${FileSystem.documentDirectory}DPWorkpass`;
// Refactor code below
const PROFILES_ARRAY_DIRECTORY = `${FileSystem.documentDirectory}profilesArray`;

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

// Refactor code below
export const storeProfilesArray = profilesArray => {
  return FileSystem.writeAsStringAsync(
    PROFILES_ARRAY_DIRECTORY,
    JSON.stringify(profilesArray)
  );
};

export const getProfilesArray = async () => {
  const arrayAsString = await FileSystem.readAsStringAsync(
    PROFILES_ARRAY_DIRECTORY
  );
  return JSON.parse(arrayAsString);
};

export const deleteProfilesArray = () => {
  return FileSystem.deleteAsync(PROFILES_ARRAY_DIRECTORY);
};

export const checkProfilesArrayExists = async () => {
  const info = await FileSystem.getInfoAsync(PROFILES_ARRAY_DIRECTORY);
  return info.exists;
};

// Refactor code ends

export const getStoredWorkpassIfExists = async () => {
  try {
    const documentJSON = await getStoredWorkpass();
    return documentJSON;
  } catch (e) {
    if (e.message.includes("No such file or directory")) return null;
    throw e;
  }
};
