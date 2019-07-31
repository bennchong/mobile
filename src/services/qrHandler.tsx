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
export const fetchDocument = async (uri: string) => {
  const results = await axios.get(uri, { responseType: "json" });
  return results.data;
};

export const fetchAndDecrypt = async (uri: string) => {
  const data = await fetchDocument(uri);
  return data;
};
