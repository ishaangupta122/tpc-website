import axios from "axios";
import BASE_API from "../../BASE_API/config";

const EVENTS_URL = `${BASE_API}/events`;

const API = axios.create({
  baseURL: EVENTS_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchEvent = async () => {
  try {
    const { data } = await API.get("/");
    return data;
  } catch (error) {
    console.error("Error fetching events: \n", error);
    throw error;
  }
};

export const fetchEventById = async (id) => {
  try {
    const { data } = await API.get(`/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching event by ID: \n", error);
    throw error;
  }
};
