const dayjs = require('dayjs');

const getEndOfDay = (date) => {
  return dayjs(date).endOf("day").toISOString();
};

const areDatesEqual = (date1, date2) => {
  const stripTime = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return stripTime(date1).getTime() === stripTime(date2).getTime();
};

const addTimeToDate = (date, timeValue, timeMetric) => {
  return dayjs(date).add(timeValue, timeMetric).format();
}

module.exports = {
  getEndOfDay,
  areDatesEqual,
  addTimeToDate,
}
