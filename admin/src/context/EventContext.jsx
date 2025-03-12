import axios from "axios";
import { BASE_API } from "../BASE_API/config";

const EVENTS_URL = `${BASE_API}/events`;

const API = axios.create({
  baseURL: EVENTS_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllEvents = async () => {
  try {
    const { data } = await API.get("/");
    return data;
  } catch (error) {
    console.error("Error fetching events: \n", error);
    throw error;
  }
};

export const getEventById = async (id) => {
  try {
    const { data } = await API.get(`/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching event with ID ${id}: \n`, error);
    throw error;
  }
};

export const createEvent = async (eventData, imageFile) => {
  try {
    const formData = new FormData();
    Object.entries(eventData).forEach(([key, value]) =>
      formData.append(key, value)
    );
    if (imageFile) formData.append("image", imageFile);

    const { data } = await API.post("/", eventData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    console.error("Error creating event: \n", error);
    throw error;
  }
};

export const updateEvent = async (id, eventData, imageFile) => {
  try {
    const formData = new FormData();
    Object.entries(eventData).forEach(([key, value]) =>
      formData.append(key, value)
    );
    if (imageFile) formData.append("image", imageFile);

    const { data } = await API.patch(`/${id}`, eventData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    console.error(`Error updating event with ID ${id}: \n`, error);
    throw error;
  }
};

export const deleteEvent = async (id) => {
  try {
    const { data } = await API.delete(`/${id}`);
    return data;
  } catch (error) {
    console.error(`Error deleting event with ID ${id}: \n`, error);
    throw error;
  }
};
