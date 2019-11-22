import * as FileSystem from "expo-file-system";

// Refactor code below
const PROFILES_ARRAY_DIRECTORY = `${FileSystem.documentDirectory}profilesArray`;

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
