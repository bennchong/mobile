import { fetchDocument, getActionFromQR } from "./qrHandler";
describe("fetchDocument", () => {
  it("should fetch the document from the uri", async () => {
    // TODO This test could be stubbed instead of making an actual API call.
    const fetchedDocument = await fetchDocument(
      "https://raw.githubusercontent.com/sgworkpass/demo/master/cert_valid.json"
    );
    expect(fetchedDocument).toBeTruthy();
  });
});

describe("getActionFromQR", () => {
  it("should work with valid VIEW QR code without key", () => {
    const action = getActionFromQR("VIEW;https://something.com/get/resourceId");
    expect(action).toEqual({
      action: "VIEW",
      uri: "https://something.com/get/resourceId",
      key: undefined
    });
  });

  it("should work with valid STORE QR code", () => {
    const action = getActionFromQR(
      "STORE;https://something.com/get/resourceId"
    );
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
});
