import dayjs from 'dayjs';

export const formatTime = (date) => {
  return dayjs(date).format('YYYY-MM-DD hh:mm:ss');
};

export const formatNumber = (str) => {
  return `${str}`.replace(/\B(?=(\d{3})+$)/g, ',');
};
