import { tz } from "moment-timezone";

export const TIMEZONE = "Asia/Singapore";

export const formatDate = dateString => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return tz(date, TIMEZONE)
    .format("DD-MM-YYYY")
    .toUpperCase();
};

export const getCurrentDateAndTime = () => {
  const date = new Date();
  const dateString : string = tz(date.getTime(), TIMEZONE).format("DD/MM/YYYY HH:MM");
  console.log(dateString);
  return dateString;
};

export const checkIfExpired = dateString => {
  const expiryDate = new Date(dateString);
  const now = new Date();
  return expiryDate.getTime() < now.getTime();
}


