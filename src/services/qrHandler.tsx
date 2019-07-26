import axios from "axios";

export const getActionFromQR = (qrData: string) => {
  const [action, uri, key] = qrData.split(";");
  const actionRegex = /(VIEW)|(STORE)/;
  const uriRegex = /https:\/\/.*/;

  if (!actionRegex.test(action) || !uriRegex.test(uri)) {
    throw new Error("QR code is invalid");
  }

  return {
    action,
    uri,
    key
  };
};

// eslint-disable-next-line no-unused-vars
export const fetchDocument = async (uri: string, key: string) => {
  const results = await axios.get(uri, { responseType: "json" });
  // console.log("AXIOS");
  // console.log(results);
  return results.data;
};
