const CertFetcher = (url) => {
	return fetch(url)
		.then((response) =>  {
      return response.json()
    })
		.then((responseJSON) => {
			return responseJSON.document
		})
		.catch((error) => {
			console.log("Error Fetching", error)
		})
}

export default CertFetcher;