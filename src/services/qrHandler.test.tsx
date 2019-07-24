import React from "react";

// Input: String of QR
// Eg: VIEW;https://skjdnf.com/somf;secretKey

// 2. Download the JSON content
// 3. Decrpyt the content with secret key ()
// 4. Save to fs
// 5. Save to global context

const getActionFromQR = (qrData: string) => {
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

it("should work with valid VIEW QR code without key", () => {
  const action = getActionFromQR("VIEW;https://something.com/get/resourceId");
  expect(action).toEqual({
    action: "VIEW",
    uri: "https://something.com/get/resourceId",
    key: undefined
  });
});

it("should work with valid STORE QR code", () => {
  const action = getActionFromQR("STORE;https://something.com/get/resourceId");
  expect(action).toEqual({
    action: "STORE",
    uri: "https://something.com/get/resourceId",
    key: undefined
  });
});

it("should work with valid QR code with key", () => {
  const action = getActionFromQR(
    "VIEW;https://something.com/get/resourceId;key"
  );
  expect(action).toEqual({
    action: "VIEW",
    uri: "https://something.com/get/resourceId",
    key: "key"
  });
});

it("should not work with invalid action", () => {
  const action = () =>
    getActionFromQR("MOO;https://something.com/get/resourceId;key");
  expect(action).toThrowError("invalid");
});

it("should not work with invalid uri", () => {
  const action = () =>
    getActionFromQR("VIEW;http://something.com/get/resourceId;key");
  expect(action).toThrowError("invalid");
});

// it("should not work with other opcode", () => {
//   const valid = getActionFromQR("MOO;https://something.com/get/resourceId");
//   expect(valid).toBe(false);
// });

// it("should not work with invalid uri", () => {
//   const valid = getActionFromQR("VIEW;http://something.com/get/resourceId");
//   expect(valid).toBe(false);
// });
