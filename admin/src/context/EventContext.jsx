import axios from 'axios';

const BASE_URL = 'http://localhost:3000/events';

export const getAllEvents = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getEventById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await axios.post(BASE_URL, eventData);
  return response.data;
};

export const updateEvent = async (id, eventData) => {
  const response = await axios.patch(`${BASE_URL}/${id}`, eventData);
  return response.data;
};

export const deleteEvent = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
