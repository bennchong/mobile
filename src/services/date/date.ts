import { tz } from "moment-timezone";
import moment from "moment";

export const TIMEZONE = "Asia/Singapore";

export const formatDate = dateString => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return tz(date, TIMEZONE)
    .format("DD-MM-YYYY")
    .toUpperCase();
};

export const getCurrentDateAndTime = () => {
  const dateString: string = tz(Date.now(), TIMEZONE).format("LLLL");
  return dateString;
};

export const checkIfExpired = dateString => {
  const expiryDate = moment(new Date(dateString));
  const now = moment(new Date());
  return now.isAfter(expiryDate);
};

export const checkIfLessThan = (dateString, noOfDays) => {
  const revokeDate = moment(new Date(dateString));
  const now = moment(new Date());
  const diffInDays = now.diff(revokeDate, "days");
  return diffInDays <= noOfDays;
};
