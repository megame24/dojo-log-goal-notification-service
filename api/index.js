require('dotenv').config();
const crypto = require('crypto');
const axios = require('axios');
const { getEndOfDay } = require('../services/dateService');

const canonicalizeQueryParams = (params) => {
  return Object.keys(params).sort().map(key => `${key}=${params[key]}`).join('&');
}

const createHmac = (queryParams) => {
  const hmacData = `${canonicalizeQueryParams(queryParams)}`;
  return crypto.createHmac('sha256', process.env.HMAC_SECRETE).update(hmacData).digest('hex');
}

const axiosInstance = (hmac) => (axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    'Authorization': `HMAC ${hmac}`
  },
}));

const getNotifications = async () => {
  const date = getEndOfDay(new Date());

  const queryParams = { date };

  const hmac = createHmac(queryParams);

  try {
    const response = await axiosInstance(hmac).get(`/user-goal-notifications?date=${date}`);
    return response.data;
  } catch (error) {
    console.error('Error getting notifications', error);
  }
};

const batchUpdateNotifications = async (notifications) => {
  const timestamp = new Date().toISOString();

  const queryParams = { timestamp };

  const hmac = createHmac(queryParams);

  try {
    const response = await axiosInstance(hmac).put(`/goal-notifications/batch-update?timestamp=${timestamp}`, {
      notifications
    });
    return response.data;
  } catch (error) {
    console.error('Error updating notifications', error);
  }
};

const batchDeleteNotifications = async (notifications) => {
  const timestamp = new Date().toISOString();

  const queryParams = { timestamp };

  const hmac = createHmac(queryParams);

  try {
    const response = await axiosInstance(hmac).put(`/goal-notifications/batch-delete?timestamp=${timestamp}`, {
      notifications
    });
    return response.data;
  } catch (error) {
    console.error('Error updating notifications', error);
  }
};

module.exports = {
  getNotifications,
  batchDeleteNotifications,
  batchUpdateNotifications,
};
