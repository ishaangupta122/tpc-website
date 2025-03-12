import axios from "axios";
import { BASE_API } from "../BASE_API/config";

const SUCCESS_STORY_URL = `${BASE_API}/successstory`;

const API = axios.create({
  baseURL: SUCCESS_STORY_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllStories = async () => {
  try {
    const { data } = await API.get("/");
    return data;
  } catch (error) {
    console.error("Error fetching success stories: \n", error);
    throw error;
  }
};

export const getStoryById = async (id) => {
  try {
    const { data } = await API.get(`/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching success story with ID ${id}: \n`, error);
    throw error;
  }
};

export const createStory = async (storyData, imageFile) => {
  try {
    const formData = new FormData();
    Object.entries(storyData).forEach(([key, value]) =>
      formData.append(key, value)
    );
    if (imageFile) formData.append("image", imageFile);

    const { data } = await API.post("/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    console.error("Error creating success story: \n", error);
    throw error;
  }
};

export const updateStory = async (id, storyData, imageFile) => {
  try {
    const formData = new FormData();
    Object.entries(storyData).forEach(([key, value]) =>
      formData.append(key, value)
    );
    if (imageFile) formData.append("image", imageFile);

    const { data } = await API.put(`/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    console.error("Error updating success story: \n", error);
    throw error;
  }
};

export const deleteStory = async (id) => {
  try {
    const { data } = await API.delete(`/${id}`);
    return data;
  } catch (error) {
    console.error(`Error deleting success story with ID ${id}: \n`, error);
    throw error;
  }
};
