import axios from "axios";
import BASE_API from "../../BASE_API/config";

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

export const fetchFacultyById = async (id) => {
  try {
    const { data } = await API.get(`/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching faculty by ID: \n", error);
    throw error;
  }
};
