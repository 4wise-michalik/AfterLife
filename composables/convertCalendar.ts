/**
 * Changes date from datetime object to string.
 *
 * @param {object} dateObj - Datetime object to convert.
 *
 * @returns { date: String } - A string of date, ready to use in database query.
 */
export const convertCalendarToDate = (dateObj: any) => {
  var year = (1900 + dateObj.years).toString();
  var months = dateObj.months + 1;
  var days = dateObj.days;
  if (days > 31) {
    days = 1;
    months++;
  }
  var hours = dateObj.hours;
  var minutes = dateObj.minutes;

  var date = year + "-" + months + "-" + days + " " + hours + ":" + minutes + ":00";

  return date;
};

/**
 * Changes date from string to datetime object.
 *
 * @param {String} dateObj - String to convert.
 *
 * @returns { date: object } - A datetime object, ready to use in application.
 */
export const convertCalendarToObj = (dateObj: any) => {
  var date = {
    years: parseInt(dateObj.substring(0, 4)) - 1900,
    months: parseInt(dateObj.substring(5, 7)) - 1,
    days: parseInt(dateObj.substring(8, 10)),
    hours: parseInt(dateObj.substring(11, 13)),
    minutes: parseInt(dateObj.substring(14, 16)),
  };

  return date;
};
