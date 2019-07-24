import * as FileSystem from "expo-file-system";

const DEFAULT_FILE_NAME = `${FileSystem.documentDirectory}CERTIFICATE`;

export const checkStoredCertificateExists = async () => {
  const info = await FileSystem.getInfoAsync(DEFAULT_FILE_NAME);
  return info.exists;
};

export const getStoredCertificate = async () => {
  const documentAsString = await FileSystem.readAsStringAsync(
    DEFAULT_FILE_NAME
  );
  return JSON.parse(documentAsString);
};

export const storeCertificate = certificate => {
  return FileSystem.writeAsStringAsync(
    DEFAULT_FILE_NAME,
    JSON.stringify(certificate)
  );
};

export const deleteStoredCertificate = () => {
  return FileSystem.deleteAsync(DEFAULT_FILE_NAME);
};
