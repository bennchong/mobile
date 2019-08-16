import axios from "axios";
import { getData } from "@govtechsg/open-attestation";
import { checkIfExpired } from "../date/date";
import { globalVerifyEndpoint } from "../../config/endpoints";

const url = globalVerifyEndpoint;
const addresses = ["0x590F8DFFdb113e1Dcf4974DEaA9b52A8251cec29"];
// extended status enums in anticipation of future changes
/* eslint-disable no-unused-vars */
export enum verificationStatusEnum {
  VALIDATING,
  VALID,
  EXPIRED,
  EXPIREDWITHLEGALSTAY,
  TAMPERED,
  REVOKED,
  INVALID_ISSUER,
  INVALID
}
/* eslint-enable */

export const verifyWorkpass = async document => {
  // check expiry first
  const cleanDoc = getData(document);
  if (cleanDoc === undefined) return verificationStatusEnum.INVALID;
  if (checkIfExpired(cleanDoc.pass.expiryDate))
    if (!checkIfExpired(cleanDoc.pass.legalTillDate)) {
      // Check if legal stay is still valid
      return verificationStatusEnum.EXPIREDWITHLEGALSTAY;
    } else {
      return verificationStatusEnum.EXPIRED;
    }

  // then check tampered n revoked
  const result = await axios.post(url, { document });
  if (result.data.message) {
    return verificationStatusEnum.INVALID;
  }
  if (!result.data.hash.valid) return verificationStatusEnum.TAMPERED;
  if (!result.data.revoked.valid) return verificationStatusEnum.REVOKED;

  // check issuer
  let isAllIssuerValid = true;
  Object.keys(result.data.issued.issued).forEach(key => {
    isAllIssuerValid = isAllIssuerValid && addresses.includes(key);
  });

  if (!isAllIssuerValid || !result.data.issued.valid)
    return verificationStatusEnum.INVALID_ISSUER;

  if (result.data.valid) return verificationStatusEnum.VALID;
  return verificationStatusEnum.INVALID;
};

export const verifyWorkpassBoolean = async document => {
  const isValid = await verifyWorkpass(document);
  return isValid === verificationStatusEnum.VALID;
};
