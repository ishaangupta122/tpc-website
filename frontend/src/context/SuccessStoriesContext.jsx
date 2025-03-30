import axios from "axios";
import BASE_API from "../../BASE_API/config";

const SUCCESS_STORIES_URL = `${BASE_API}/successstory`;

const API = axios.create({
  baseURL: SUCCESS_STORIES_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchSuccessStories = async () => {
  try {
    const { data } = await API.get("/");
    return data;
  } catch (error) {
    console.error("Error fetching success stories: \n", error);
    throw error;
  }
};

export const fetchSuccessStoryById = async (id) => {
  try {
    const { data } = await API.get(`/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching success story by ID: \n", error);
    throw error;
  }
};
