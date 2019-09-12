import axios from "axios";
import { getData } from "@govtechsg/open-attestation";
import { checkIfExpired, checkIfLessThan } from "../date/date";
import {
  globalVerifyEndpoint,
  legalStayDays,
  issueAddress
} from "../../config/constants";

const url = globalVerifyEndpoint;
// extended status enums in anticipation of future changes
/* eslint-disable no-unused-vars */
export enum verificationStatusEnum {
  VALIDATING,
  VALID,
  EXPIRED,
  EXPIREDWITHLEGALSTAY,
  TAMPERED,
  REVOKED,
  REVOKEDWITHLEGALSTAY,
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

  if (result.data.message) return verificationStatusEnum.INVALID;
  if (!result.data.hash.valid) return verificationStatusEnum.TAMPERED;
  const revokeDate = "2021-08-21T00:00:00+08:00"; // Replace this with the new API call
  if (!result.data.revoked.valid) {
    return checkIfLessThan(revokeDate, legalStayDays)
      ? verificationStatusEnum.REVOKEDWITHLEGALSTAY
      : verificationStatusEnum.REVOKED;
  }

  // check issuer
  let isAllIssuerValid = true;
  Object.keys(result.data.issued.issued).forEach(key => {
    isAllIssuerValid = isAllIssuerValid && issueAddress.includes(key);
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
