import axios from "axios";
import BASE_API from "../../BASE_API/config";

const PLACEMENTS_URL = `${BASE_API}/placements`;

const API = axios.create({
  baseURL: PLACEMENTS_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchPlacements = async () => {
  try {
    const { data } = await API.get("/");
    return data;
  } catch (error) {
    console.error("Error fetching placements: \n", error);
    throw error;
  }
};
