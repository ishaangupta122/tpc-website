import axios from "axios";
import { BASE_API } from "../BASE_API/config";

const FACULTY_URL = `${BASE_API}/faculty`;

const API = axios.create({
  baseURL: FACULTY_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchFaculty = async () => {
  try {
    const { data } = await API.get("/");
    return data;
  } catch (error) {
    console.error("Error fetching faculty list: \n", error);
    throw error;
  }
};

export const createFaculty = async (faculty, imageFile) => {
  try {
    const formData = new FormData();
    Object.entries(faculty).forEach(([key, value]) =>
      formData.append(key, value)
    );
    if (imageFile) formData.append("image", imageFile);

    const { data } = await API.post("/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    console.error("Error creating faculty: \n", error);
    throw error;
  }
};

export const updateFaculty = async (id, facultyData, imageFile) => {
  try {
    const formData = new FormData();
    Object.entries(facultyData).forEach(([key, value]) =>
      formData.append(key, value)
    );
    if (imageFile) formData.append("image", imageFile);

    const { data } = await API.put(`/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    console.error("Error updating faculty: \n", error);
    throw error;
  }
};

export const deleteFaculty = async (id) => {
  try {
    const { data } = await API.delete(`/${id}`);
    return data;
  } catch (error) {
    console.error("Error deleting faculty: \n", error);
    throw error;
  }
};
