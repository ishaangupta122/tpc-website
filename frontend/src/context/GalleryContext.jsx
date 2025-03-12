import axios from "axios";
import BASE_API from "../../BASE_API/config";

const GALLERY_URL = `${BASE_API}/gallery`;

const API = axios.create({
  baseURL: GALLERY_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchGalleryImages = async () => {
  try {
    const { data } = await API.get("/");
    return data;
  } catch (error) {
    console.error("Error fetching images: \n", error);
    throw error;
  }
};
