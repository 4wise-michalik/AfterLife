export const convertCalendar = () => {
  const convertCalendarToDate = (dateObj: any) => {
    var date = new Date(Date.UTC(1900, 0, 0, 0, 0, 0));
    date.setUTCFullYear(1900 + dateObj.years);
    date.setUTCMonth(0 + dateObj.months - 1);
    date.setUTCDate(0 + dateObj.days);
    date.setUTCHours(0 + dateObj.hours);
    date.setUTCMinutes(0 + dateObj.minutes);

    return date;
  };

  const convertCalendarToObj = (dateObj: any) => {
    var date = {
      years: parseInt(dateObj.substring(0, 4)) - 1900,
      months: parseInt(dateObj.substring(6, 7)),
      days: parseInt(dateObj.substring(9, 10)),
      hours: parseInt(dateObj.substring(12, 13)),
      minutes: parseInt(dateObj.substring(15, 16)),
    };

    return date;
  };

  return { convertCalendarToDate, convertCalendarToObj };
};
