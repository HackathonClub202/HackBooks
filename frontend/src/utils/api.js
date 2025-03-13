// src/utils/api.js
import axios from "axios";

const API_BASE_URL = "/api";

export const addSubscriber = async (data) => {
  return await axios.post(`${API_BASE_URL}/subscribers`, data);
};

export const uploadChapter = async (data) => {
  return await axios.post(`${API_BASE_URL}/chapters`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const fetchSubscribers = async () => {
  return await axios.get(`${API_BASE_URL}/subscribers`);
};

export const fetchChapters = async () => {
  return await axios.get(`${API_BASE_URL}/chapters`);
};
