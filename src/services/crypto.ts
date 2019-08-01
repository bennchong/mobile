import { decryptString } from "@govtechsg/opencerts-encryption";

/**
 * decrypts a payload downloaded from the ID given by the transfer API
 * check test code to see what is expected as input
 * @param {string} fetchResponse response given from opencerts.io/storage/get
 * @param {string} uploadResponse response given after uploading to opencerts.io/storage/create
 */
export const decryptFromPayload = (fetchResponse, uploadResponse) => {
  const { tag, cipherText, iv } = fetchResponse.document;
  const { key, type } = uploadResponse;

  // checking for presence of objects
  if (!cipherText) throw new Error("cipherText not found");
  if (!iv) throw new Error("iv not found");
  if (!tag) throw new Error("tag not found");

  if (!key) throw new Error("key not found");
  if (!type) throw new Error("type not found");

  const payload = {
    tag,
    cipherText,
    iv,
    key,
    type
  };
  const decrypted = decryptString(payload);
  return JSON.parse(decrypted);
};
