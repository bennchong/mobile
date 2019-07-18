import * as SecureStore from "expo-secure-store";
import { CERT_STORAGE } from "../constants/CertConstants";
import * as FileSystem from 'expo-file-system';

//Class to handle storing and retrieving of DECRYPTED certificate
export default class CertStore {
  constructor() {
    this.uri = FileSystem.documentDirectory + "CERTIFICATE"; 
  }

  async getStoredCertificateFS() {
    let cert 
    try {
      cert = await FileSystem.readAsStringAsync(this.uri);
    } catch (e) {
      console.log(e);
    }
    
    return cert; 
  }

  async storeCertificateFS(certificate) {
    try {
      await FileSystem.writeAsStringAsync(this.uri, certificate);
      return CERT_STORAGE.SUCCESS;
    } catch (e) {
      console.log("Error Storing Cert");
      console.log(e);
      return CERT_STORAGE.FAILURE;
    }
  }

  async getStoredCertificate() {
    //A promise that resolves to the previously stored value, or null if there is no entry for the given key.
    let cert 
    try {
      cert = await SecureStore.getItemAsync(this.key);
    } catch (e) {
      console.log(e);
    }
    
    return cert; 
  }

  async storeCertificate(certificate) {
    try {
      await SecureStore.setItemAsync(this.key, certificate);
      return CERT_STORAGE.SUCCESS;
    } catch (e) {
      console.log("Error Storing Cert");
      console.log(e);
      return CERT_STORAGE.FAILURE;
    }
  }
}