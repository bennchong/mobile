import CertFetcher from './CertFetcher';
import openpgp from 'openpgp'
import { placeholder } from '@babel/types';

export default class QRHandler {
    
	constructor(string){
		var strArr = string.split(";");
		this.state = {
			action: strArr[0],
			url: strArr[1],
			uri: strArr[2],
			decryptionKey: strArr[3]
		}

		console.log("HELLO");
		console.log(strArr);
		console.log(this.state.url);
		this.retrieve_cert();
		console.log(this.encryptedCert);
		// this.decryptedCert = this.decrypt_file();
	}
	
	//Calls cert fetcher and stores json into state
	async retrieve_cert() {
		this.encryptedCert = await CertFetcher(this.state.url + this.state.uri);
		jfd = await placeholder();
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