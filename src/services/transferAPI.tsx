import Axios from "axios";

const uploadEndpoint = "https://api-ropsten.opencerts.io/storage/create";

// Returns promise that resolves to json object with id, ttl, key and type fields
export const uploadWorkpass = async workpass => {
  const content = {
    ttl: 1079999,
    document: workpass
  };

  const response = await Axios.post(uploadEndpoint, JSON.stringify(content));

  const responseJSON = await response.data;
  return responseJSON;
};
