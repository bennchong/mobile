import axios from "axios";
import { Alert } from "react-native";
import { handleObfuscation } from "../obfuscation/obfuscationHandler";
import { decryptFromPayload } from "../crypto/crypto";

export const getActionFromQR = (qrData: string) => {
  const [action, payload] = qrData.split(";");
  const actionRegex = /(VIEW)|(STORE)|(PUSH)/;
  const uriRegex = /https:\/\/.*/;
  const { uri } = JSON.parse(payload);

  if (!actionRegex.test(action) || !uriRegex.test(uri)) {
    throw new Error("QR code is invalid");
  }

  return { action, payload };
};

// eslint-disable-next-line no-unused-vars
export const fetchDocument = async (uri: string) => {
  const oneTimeQRParams = "?cleanup=true";
  const results = await axios.get(uri + oneTimeQRParams, {
    responseType: "json"
  });
  return results.data;
};

export const pushService = async (workpass, payload, setProcessingQr) => {
  const { uri, detailsShown } = JSON.parse(payload);

  const { obfuscatedDoc, detailsString } = handleObfuscation(
    detailsShown,
    workpass
  );

  const handlePushWorkpass = async () => {
    setProcessingQr();
    const response = await axios.post(uri, obfuscatedDoc);
    const responseJSON = await response.data;
    return responseJSON;
  };

  Alert.alert(
    "Send the following details to RWS?",
    `${detailsString}`,
    [
      {
        text: "No",
        onPress: () => setProcessingQr()
      },
      {
        text: "Yes",
        onPress: handlePushWorkpass
      }
    ],
    { cancelable: false }
  );
};

export const previewService = async (payload, dispatch) => {
  const { uri, key, type } = JSON.parse(payload);
  const encryptedDocument = await fetchDocument(uri);

  // Ability to scan non-encrypted workpass in the format "VIEW,URI"
  let newWorkpass;
  if (!type && !key) {
    newWorkpass = encryptedDocument;
  } else {
    newWorkpass = decryptFromPayload(encryptedDocument, { key, type });
  }

  dispatch({
    type: "SCANNED_PASS",
    tempPass: newWorkpass
  });
};
