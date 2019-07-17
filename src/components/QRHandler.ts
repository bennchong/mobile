import CertFetcher from './CertFetcher';
import openpgp from 'openpgp'
import { QR_VALIDITY, QR_ACTIONS } from '../constants/QRValidity';

export default class QRHandler {
  
	constructor(string){

		this.set_QRHandler_state(this.assert_validity(string), string);
		
		if (this.state.QRStatus) {
			this.retrieve_cert();
		}
		
		// this.decryptedCert = this.decrypt_file();
	}

	//Assertain of validity of QR Scanned 
	assert_validity(QRString) {
		var strArr = QRString.split(";");
		return (strArr[0] === QR_ACTIONS.STORE || strArr[0] === QR_ACTIONS.VIEW);
	}

	//Sets variables of QR Handler
	set_QRHandler_state(QRValidity, QRString) {
		if(QRValidity) {
			var strArr = QRString.split(";");
			this.state = {
				QRStatus: QRValidity,
				action: strArr[0],
				url: strArr[1],
				uri: strArr[2],
				decryptionKey: strArr[3]
			};
		} 

		else {
			this.state = {
				QRStatus: QRValidity,
				action: null,
				url: null,
				uri: null,
				decryptionKey: null
			};
		}
	}

	//Returns Encrypted Certificate 
	get_encrypted_cert() {
		return this.encryptedCert;
	}
	
	//Returns boolean 
	get_QR_validity() {
		return this.QRStatus;
	}

	//Calls cert fetcher and stores json into state
	retrieve_cert() {
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