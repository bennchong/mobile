import { formatDate, getCurrentDateAndTime, checkIfExpired } from "./date";

describe("Date tests", () => {
  it("formatDate testing", () => {
    expect(formatDate(undefined)).toBeFalsy();
    expect(formatDate("any string")).toContain("INVALID DATE");
    expect(formatDate("8-3-1996")).toContain("03-08-1996");
    expect(formatDate("Thursday, September 5, 2019 2:28 PM")).toContain(
      "05-09-2019"
    );
  });
  it("getCurrentDateAndTime testing", () => {
    expect(getCurrentDateAndTime()).toContain(", ");
  });
  it("checkIfExpired", () => {
    expect(checkIfExpired("March 5, 2016")).toBeTruthy();
    expect(checkIfExpired("8 March, 3000")).toBeFalsy();
    expect(checkIfExpired("03-05-2016")).toBeTruthy();
    expect(checkIfExpired("09-03 3000")).toBeFalsy();
  });
});
