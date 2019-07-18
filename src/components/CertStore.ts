import * as SecureStore from "expo-secure-store";
import { CERT_STORAGE } from "../constants/CertConstants";
import * as FileSystem from 'expo-file-system';

//Class to handle storing and retrieving of DECRYPTED certificate
export default class CertStore {
  constructor() {
    this.uri = FileSystem.documentDirectory + "CERTIFICATE"; 
  }

  async checkStoredCertificateExistsFS() {
    let res 
    try {
      res = await FileSystem.getInfoAsync(this.uri)
    } catch (e) {
      console.log(e);
    }
    return  res
  }

  async getStoredCertificateFS() {
    let cert 
    try {
      cert = await FileSystem.readAsStringAsync(this.uri);
    } catch (e) {
      console.log(e);
    }
    
    //Checks if file exists, because it will return undefined if not
    if (typeof cert === 'undefined'){
      return CERT_STORAGE.FAILURE;
    } else {
      return cert; 
    }
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

  async deleteStoredCertificateFS() {
    try {
      await FileSystem.deleteAsync(this.uri);
      return CERT_STORAGE.SUCCESS;
    } catch (e) {
      console.log("Error Deleting Cert");
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