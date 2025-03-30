import axios from "axios";
import { BASE_API } from "../BASE_API/config";

const GALLERY_URL = `${BASE_API}/gallery`;

const API = axios.create({
  baseURL: GALLERY_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllImages = async () => {
  try {
    const { data } = await API.get("/");
    return data;
  } catch (error) {
    console.error("Error fetching images: \n", error);
    throw error;
  }
};

export const getImageById = async (id) => {
  try {
    const { data } = await API.get(`/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching image with ID ${id}: \n`, error);
    throw error;
  }
};

export const addImage = async (imageData, imageFile) => {
  try {
    const formData = new FormData();
    Object.entries(imageData).forEach(([key, value]) =>
      formData.append(key, value)
    );
    if (imageFile) formData.append("image", imageFile);

    const { data } = await API.post("/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    console.error("Error adding new image: \n", error);
    throw error;
  }
};

export const updateImage = async (id, imageData, imageFile) => {
  try {
    const formData = new FormData();
    Object.entries(imageData).forEach(([key, value]) =>
      formData.append(key, value)
    );
    if (imageFile) formData.append("image", imageFile);

    const { data } = await API.put(`/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    console.error("Error updating image: \n", error);
    throw error;
  }
};

export const deleteImage = async (id) => {
  try {
    const { data } = await API.delete(`/${id}`);
    return data;
  } catch (error) {
    console.error(`Error deleting image with ID ${id}: \n`, error);
    throw error;
  }
};
