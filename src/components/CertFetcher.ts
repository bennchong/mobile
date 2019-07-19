import { CERT_FETCHING } from "../constants/CertConstants";

const CertFetcher = url => {
  return fetch(url)
    .then(response => {
      if (response.ok === false) return CERT_FETCHING.NOT_OK;
      return response.json();
    })
    .then(responseJSON => {
      if (responseJSON === CERT_FETCHING.NOT_OK) return CERT_FETCHING.NOT_OK;
      if (responseJSON.error === "No Document Found")
        return CERT_FETCHING.ERROR;
      return responseJSON.document;
    })
    .catch(error => {
      console.log("Error Fetching", error);
    });
};

export default CertFetcher;
