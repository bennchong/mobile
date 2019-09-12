import axios from "axios";
import { globalUploadEndpoint } from "../../config/constants";

const uploadEndpoint = globalUploadEndpoint;

// Returns promise that resolves to json object with id, ttl, key and type fields
export const uploadWorkpass = async workpass => {
  const content = {
    ttl: 1079999,
    document: workpass
  };

  const response = await axios.post(uploadEndpoint, JSON.stringify(content));

  const responseJSON = await response.data;
  return responseJSON;
};
