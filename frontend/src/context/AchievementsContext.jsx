import axios from "axios";
import BASE_API from "../../BASE_API/config";

const ACHIEVEMENTS_URL = `${BASE_API}/updates`;

const API = axios.create({
  baseURL: ACHIEVEMENTS_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchAchievements = async () => {
  try {
    const { data } = await API.get("/");
    return data;
  } catch (error) {
    console.error("Error fetching achievements: \n", error);
    throw error;
  }
};

export const fetchAchievementsById = async (id) => {
  try {
    const { data } = await API.get(`/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching achievement by ID: \n", error);
    throw error;
  }
};
