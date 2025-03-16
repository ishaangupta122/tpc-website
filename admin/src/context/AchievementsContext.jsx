import axios from "axios";
import { BASE_API } from "../BASE_API/config";

const ACHIEVEMENTS_URL = `${BASE_API}/updates`;

const API = axios.create({
  baseURL: ACHIEVEMENTS_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchAchievement = async () => {
  try {
    const { data } = await API.get("/");
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching achievements: \n", error);
    throw error;
  }
};

export const createAchievement = async (achievement, imageFile) => {
  try {
    const formData = new FormData();
    Object.entries(achievement).forEach(([key, value]) =>
      formData.append(key, value)
    );
    if (imageFile) formData.append("image", imageFile);

    const { data } = await API.post("/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    console.error("Error creating achievement: \n", error);
    throw error;
  }
};

export const updateAchievement = async (id, achievementData, imageFile) => {
  try {
    const formData = new FormData();
    Object.entries(achievementData).forEach(([key, value]) =>
      formData.append(key, value)
    );
    if (imageFile) formData.append("image", imageFile);

    const { data } = await API.put(`/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    console.error(`Error updating achievement with ID ${id}: \n`, error);
    throw error;
  }
};

export const deleteAchievement = async (id) => {
  try {
    const { data } = await API.delete(`/${id}`);
    return data;
  } catch (error) {
    console.error("Error deleting achievement: \n", error);
    throw error;
  }
};
