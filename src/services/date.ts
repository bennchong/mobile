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
  const date = new Date().getDate(); // Current Date
  const month = new Date().getMonth() + 1; // Current Month
  const year = new Date().getFullYear(); // Current Year
  const hours = new Date().getHours(); // Current Hours
  const min = new Date().getMinutes(); // Current Minutes
  const result = `${date}${"/"}${
    month < 10 ? `0${month}` : `${month}`
  }${"/"}${year}${" "}${hours < 10 ? `0${hours}` : `${hours}`}${":"}${
    min < 10 ? `0${min}` : `${min}`
  }`;

  return result;
};
