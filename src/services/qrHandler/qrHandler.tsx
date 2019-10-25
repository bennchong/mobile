import axios from "axios";
import { Alert } from "react-native";
import { getData } from "@govtechsg/open-attestation";
import { handleObfuscation } from "../obfuscation/obfuscationHandler";
import { decryptFromPayload } from "../crypto/crypto";
import {
  storeWorkpass,
  storeDPWorkpass,
  storeTimeAccepted
} from "../fileSystem";

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
    const response = await axios.post(uri, obfuscatedDoc);
    const responseJSON = await response.data;
    setProcessingQr();
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

export const storeService = async ({
  payload,
  dispatch,
  setProcessingQr,
  navigateToProfile,
  dpWorkpassArray,
  workpassAcceptedBooleanArray,
  timeAcceptedArray,
  workpass
}) => {
  const { uri, key, type } = JSON.parse(payload);
  const encryptedDocument = await fetchDocument(uri);

  // Ability to scan non-encrypted workpass in the format "VIEW,URI"
  let newWorkpass;
  if (!type && !key) {
    newWorkpass = encryptedDocument;
  } else {
    newWorkpass = decryptFromPayload(encryptedDocument, { key, type });
  }
  const cleanWorkpass = getData(newWorkpass);

  const handleStoreWorkpass = async () => {
    // Checks if pass is dependent
    if (cleanWorkpass.pass.sponsoringPass) {
      // Refactor action below
      dispatch({
        type: "ADD_DPPASS",
        workpass: newWorkpass
      });
      // Update filesystem and app context for dpWorkpass array
      dpWorkpassArray.push(newWorkpass);
      await storeDPWorkpass(dpWorkpassArray);
      dispatch({
        type: "UPDATE_DP_WORKPASS_ARRAY",
        dpWorkpassArray
      });
      // Update app context to include one more state for workpass accepted
      // Temporary true here, refer to new PR for refactoring of acceptance/rejection
      workpassAcceptedBooleanArray.push(true);
      dispatch({
        type: "SET_WORKPASS_ACCEPTED",
        workpassAcceptedBooleanArray
      });
      timeAcceptedArray.push("");
      dispatch({
        type: "SET_WORKPASS_TIME_ACCEPTED_ARRAY",
        timeAcceptedArray
      });
      storeTimeAccepted(timeAcceptedArray);
      dispatch({
        type: "NUMBER_PROFILES_PLUS_ONE"
      });
    } else {
      // A main pass scanned
      if (workpass === null) {
        workpassAcceptedBooleanArray.unshift(true);
        timeAcceptedArray.unshift("");
        // Updates app state
        dispatch({
          type: "SET_WORKPASS_TIME_ACCEPTED_ARRAY",
          timeAcceptedArray
        });
      }

      dispatch({
        type: "UPDATE_WORKPASS",
        workpass: newWorkpass
      });
      await storeWorkpass(newWorkpass);
      // Refactored action below
      dispatch({
        type: "ADD_MAINPASS",
        workpass: newWorkpass
      });
    }

    navigateToProfile();
  };

  // Change alert message if workpass is null
  let alertMessage;
  if (cleanWorkpass.pass.sponsoringPass !== "") {
    alertMessage = "Do you want to add this Dependent Pass?";
  } else if (workpass === null) {
    alertMessage = "Do you want to add this Main Pass?";
    dispatch({
      type: "NUMBER_PROFILES_PLUS_ONE"
    });
  } else {
    alertMessage = "Do you want to overwrite your Main Pass?";
    // For profilecontainer to revalidate the main pass
    // eslint-disable-next-line no-param-reassign
    dispatch({
      type: "VALIDATED_SESSION",
      profileIndex: 0,
      boolean: false
    });
  }
  Alert.alert(
    "New profile detected",
    alertMessage,
    [
      {
        text: "No",
        onPress: setProcessingQr
      },
      {
        text: "Yes",
        onPress: handleStoreWorkpass
      }
    ],
    { cancelable: false }
  );
};
