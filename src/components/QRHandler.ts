import CertFetcher from "./CertFetcher";
import QR_ACTIONS from "../constants/QRConstants";
import { CERT_STORAGE, CERT_FETCHING } from "../constants/CertConstants";
import { storeCertificate } from "../services/FileSystem";
import { decryptString } from "../helpers/Crypto";

const SampleCert = require("../constants/SampleCert.json");

export default class QRHandler {
  constructor(string) {
    this.SetQRHandlerState(QRHandler.CheckQRType(string), string);

    if (this.state.QRStatus) {
      this.FetchCert().then(() => this.PostFetchProcess());
    }
  }

  // Returns type of QR, null if invalid
  static CheckQRType(QRString) {
    const strArr = QRString.split(";");
    if (strArr[0] === QR_ACTIONS.STORE) return QR_ACTIONS.STORE;
    if (strArr[0] === QR_ACTIONS.VIEW) return QR_ACTIONS.VIEW;
    return null;
  }

  // Returns false if other parameters of QR code is invalid
  static CheckQRValidity(QRString) {
    const strArr = QRString.split(";");
    const regex1 = new RegExp("https://api-ropsten.opencerts.io/storage/get");
    const regex2 = new RegExp(
      "[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}"
    );
    const regex3 = new RegExp("[a-z0-9]{64}");
    return (
      regex1.test(strArr[1]) && regex2.test(strArr[2]) && regex3.test(strArr[3])
    );
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
    await CertFetcher(this.state.url + this.state.uri).then(res => {
      if (
        res === CERT_FETCHING.NOT_OK ||
        res === CERT_FETCHING.ERROR ||
        typeof res === "undefined"
      ) {
        this.fetchCertStatus = CERT_FETCHING.ERROR;
      } else {
        this.fetchCertStatus = CERT_FETCHING.IS_OK;
      }
    });
  }

  // Callback method after fetching cert
  PostFetchProcess() {
    if (this.fetchCertStatus === CERT_FETCHING.IS_OK) {
      // Then Decrypts Cert
      // this.decryptedCert = this.decrypt_file();

      // Saves decrypted cert
      if (this.state.QRStatus === QR_ACTIONS.STORE) {
        this.StoreCert(JSON.stringify(SampleCert)).then(res => {
          if (res === CERT_STORAGE.FAILURE) console.log("Cert Storing Error"); // Capture Error Here
        });
      }
      // After decrypting, returns decrypted cert by calling it outside here
    }
  }

  // saves decrypted cert (string) into phone memory
  async StoreCert(decryptedCert) {
    const res = await storeCertificate(decryptedCert);
    return res;
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
