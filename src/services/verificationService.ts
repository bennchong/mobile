import axios from "axios";
import { getData } from "@govtechsg/open-attestation";
import { checkIfExpired } from "./date";

// is this a secret?
const url = "https://api-ropsten.opencerts.io/verify";

// extended status enums in anticipation of future changes
/* eslint-disable no-unused-vars */
export enum verificationStatusEnum {
  VALID,
  EXPIRED,
  TAMPERED,
  REVOKED,
  UNISSUED,
  INVALID
}
/* eslint-enable */

export const verifyWorkpass = async document => {
  // check expiry first
  const cleanDoc = getData(document);
  if (cleanDoc === undefined) return verificationStatusEnum.INVALID;
  if (checkIfExpired(cleanDoc.pass.expiryDate))
    return verificationStatusEnum.EXPIRED;

  // then check tampered n revoked
  const result = await axios.post(url, { document });
  if (result.data.message) {
    return verificationStatusEnum.INVALID;
  }
  if (!result.data.hash.valid) return verificationStatusEnum.TAMPERED;
  if (!result.data.revoked.valid) return verificationStatusEnum.REVOKED;
  if (result.data.valid) return verificationStatusEnum.VALID;

  return verificationStatusEnum.INVALID;
};

export const verifyWorkpassBoolean = async document => {
  const isValid = await verifyWorkpass(document);
  return isValid === verificationStatusEnum.VALID;
};
