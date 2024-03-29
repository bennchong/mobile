import { fetchDocument, getActionFromQR } from "./qrHandler";

describe("fetchDocument", () => {
  it("should fetch the document from the uri", async () => {
    // TODO This test could be stubbed instead of making an actual API call.
    const fetchedDocument = await fetchDocument(
      "https://raw.githubusercontent.com/sgworkpass/demo/master/encrypted_pass/cert_valid.json"
    );
    expect(fetchedDocument).toBeTruthy();
  });
});

describe("getActionFromQR", () => {
  it("should work with valid VIEW QR code without key", () => {
    const action = getActionFromQR(
      `VIEW;${JSON.stringify({ uri: "https://something.com/get/resourceId" })}`
    );
    expect(action).toEqual({
      action: "VIEW",
      payload: '{"uri":"https://something.com/get/resourceId"}'
    });
  });

  it("should work with valid STORE QR code", () => {
    const action = getActionFromQR(
      `STORE;${JSON.stringify({ uri: "https://something.com/get/resourceId" })}`
    );
    expect(action).toEqual({
      action: "STORE",
      payload: '{"uri":"https://something.com/get/resourceId"}'
    });
  });

  it("should work with valid QR code with key", () => {
    const action = getActionFromQR(
      `VIEW;${JSON.stringify({
        uri: "https://something.com/get/resourceId",
        type: "type",
        key: "key"
      })}`
    );
    expect(action).toEqual({
      action: "VIEW",
      payload:
        '{"uri":"https://something.com/get/resourceId","type":"type","key":"key"}'
    });
  });

  it("should not work with invalid action", () => {
    const action = () =>
      getActionFromQR(
        `MOO;${JSON.stringify({
          uri: "https://something.com/get/resourceId",
          type: "type",
          key: "key"
        })}`
      );
    expect(action).toThrowError("invalid");
  });

  it("should not work with invalid uri", () => {
    const action = () =>
      getActionFromQR(
        `VIEW;${JSON.stringify({
          uri: "http://something.com/get/resourceId",
          key: "key"
        })}`
      );
    expect(action).toThrowError("invalid");
  });
});
