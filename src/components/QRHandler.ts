import openpgp from "openpgp";
import CertFetcher from "./CertFetcher";
import { QR_VALIDITY, QR_ACTIONS } from "../constants/QRValidity";
import { decryptString } from "../helpers/Crypto";
const SampleCert = require("../constants/SampleCert.json");

export default class QRHandler {

  constructor(string) {
    this.SetQRHandlerState(QRHandler.CheckQRType(string), string);

    if (this.state.QRStatus) {
      this.FetchCert();
    }

    //Then Decrypts Cert
    // this.decryptedCert = this.decrypt_file();

    //After decrypting, returns decrypted cert by calling it outside here
  }

  //Returns type of QR, null if invalid
  static CheckQRType(QRString) {
    const strArr = QRString.split(";");
    if (strArr[0] === QR_ACTIONS.STORE) return QR_ACTIONS.STORE
    else if (strArr[0] === QR_ACTIONS.VIEW) return QR_ACTIONS.VIEW
    else return null
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

  // Returns Decrypted Certificate PLACEHOLDER
  ReturnsDecryptedCert() {
    return SampleCert;
  }

  // Returns boolean
  GetQRValidity() {
    return this.QRStatus;
  }

  // Calls cert fetcher and stores json into state
  async FetchCert() {
	this.encryptedCert = await CertFetcher(this.state.url + this.state.uri);
	// this.encryptedCert = await decryptString("-----BEGIN PGP MESSAGE-----\r\n\r\n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\r\nITUJUrzPdnq6DFKlvcsmjw==\r\n=JiHU\r\n-----END PGP MESSAGE-----\r\n", "20841baa03c368e05b273712d0f69968224d744d87b0dd5d5035efffbc7fd10f");
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
