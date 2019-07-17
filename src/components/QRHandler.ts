import openpgp from "openpgp";
import CertFetcher from "./CertFetcher";
import { QR_VALIDITY, QR_ACTIONS } from "../constants/QRValidity";

export default class QRHandler {
  constructor(string) {
    this.SetQRHandlerState(this.CheckQRValidity(string), string);

    if (this.state.QRStatus) {
      this.FetchCert();
    }

    // this.decryptedCert = this.decrypt_file();
  }

  // Assertain of validity of QR Scanned
  CheckQRValidity(QRString) {
    const strArr = QRString.split(";");
    return strArr[0] === QR_ACTIONS.STORE || strArr[0] === QR_ACTIONS.VIEW;
  }

  // Sets variables of QR Handler
  SetQRHandlerState(QRValidity, QRString) {
    if (QRValidity) {
      const strArr = QRString.split(";");
      this.state = {
        QRStatus: QRValidity,
        action: strArr[0],
        url: strArr[1],
        uri: strArr[2],
        decryptionKey: strArr[3]
      };
    } else {
      this.state = {
        QRStatus: QRValidity,
        action: null,
        url: null,
        uri: null,
        decryptionKey: null
      };
    }
  }

  // Returns Encrypted Certificate
  GetEncryptedCert() {
    return this.encryptedCert;
  }

  // Returns boolean
  GetQRValidity() {
    return this.QRStatus;
  }

  // Calls cert fetcher and stores json into state
  FetchCert() {
    this.encryptedCert = CertFetcher(this.state.url + this.state.uri);
  }

  // //Decrypts file using OpenPGP
  // decrypt_file() {
  // 	const privKeyObj = openpgp.key.readArmored(this.state.decryptionKey).keys[0];
  // 	openpgp.decrypt({
  // 		message: this.encryptedCert,
  // 		privateKeys: [privKeyObj]
  // 	})
  // 		.then( plaintext => plaintext.data)
  // }
}
