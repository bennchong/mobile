import axios from "axios";
import { Alert } from "react-native";
import { obfuscateDocument } from "@govtechsg/open-attestation";
import { obfuscateFields } from "../components/SharePage/obfuscateFields";
import { decryptFromPayload } from "./crypto";
import {
  storeWorkpass,
  deleteStoredTime,
  deleteStoredTimeVerified
} from "./fileSystem";

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
  const results = await axios.get(uri, { responseType: "json" });
  return results.data;
};

export const pushService = async (workpass, payload, setProcessingQr) => {
  const { uri, detailsShown } = JSON.parse(payload);

  const details = [];
  obfuscateFields.forEach(o => {
    detailsShown.forEach(o2 => {
      if (o.key === o2) {
        details.push(o.title);
      }
    });
  });
  const detailsString = details.join(", ");

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
        onPress: async () => {
          const obfuscatedDetails = obfuscateFields.filter(o => {
            return !detailsShown.some(o2 => o.key === o2);
          });
          let obfuscatedDoc = workpass;
          obfuscatedDetails.forEach(item => {
            obfuscatedDoc = obfuscateDocument(obfuscatedDoc, item.key);
          });

          const response = await axios.post(uri, obfuscatedDoc);

          // eslint-disable-next-line no-console
          console.log(response);

          const responseJSON = await response.data;
          // eslint-disable-next-line no-console
          console.log(responseJSON);

          setProcessingQr();
          return responseJSON;
        }
      }
    ],
    { cancelable: false }
  );

  // const content = {
  //   ttl: 1079999,
  //   document: cleanDoc
  // };
};

export const storeService = async ({
  payload,
  dispatch,
  setProcessingQr,
  navigateToProfile
}) => {
  const { uri, key, type } = JSON.parse(payload);

  const encryptedDocument = await fetchDocument(uri);
  const decryptedDocument = decryptFromPayload(encryptedDocument, {
    key,
    type
  });

  Alert.alert(
    "New profile detected",
    "Do you want to overwrite your current profile?",
    [
      {
        text: "No",
        onPress: () => setProcessingQr()
      },
      {
        text: "Yes",
        onPress: async () => {
          dispatch({ type: "DELETE_WORKPASS" });
          await storeWorkpass(decryptedDocument);
          dispatch({
            type: "UPDATE_WORKPASS",
            workpass: decryptedDocument
          });
          await deleteStoredTime();
          await deleteStoredTimeVerified();
          navigateToProfile();
        }
      }
    ],
    { cancelable: false }
  );
};
