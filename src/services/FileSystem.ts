import * as FileSystem from "expo-file-system";
import { CERT_STORAGE } from "../constants/CertConstants";

// Class to handle storing and retrieving of DECRYPTED certificate
const uri = `${FileSystem.documentDirectory}CERTIFICATE`;

const checkStoredCertificateExists = async () => {
  try {
    return await FileSystem.getInfoAsync(uri);
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getStoredCertificate = async () => {
  try {
    const cert = await FileSystem.readAsStringAsync(uri);
    return cert;
  } catch (e) {
    console.log(e);
    return CERT_STORAGE.FAILURE;
  }
};

const storeCertificate = async certificate => {
  try {
    await FileSystem.writeAsStringAsync(uri, certificate);
    return CERT_STORAGE.SUCCESS;
  } catch (e) {
    console.log("Error Storing Cert");
    console.log(e);
    return CERT_STORAGE.FAILURE;
  }
};

const deleteStoredCertificate = async () => {
  try {
    await FileSystem.deleteAsync(uri);
    return CERT_STORAGE.SUCCESS;
  } catch (e) {
    console.log("Error Deleting Cert");
    console.log(e);
    return CERT_STORAGE.FAILURE;
  }
};

export {
  checkStoredCertificateExists,
  getStoredCertificate,
  storeCertificate,
  deleteStoredCertificate
};
