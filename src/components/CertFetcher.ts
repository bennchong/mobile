import { Alert } from "react-native";

const CertFetcher = (url) => {
	return fetch(url)
		.then((response) =>  response.json())
		.then((responseJSON) => {
			console.log(responseJSON);
			return responseJSON.document
		})
		.catch((error) => {
			Alert.alert("Error Fetching", error)
		})
}

export default CertFetcher;