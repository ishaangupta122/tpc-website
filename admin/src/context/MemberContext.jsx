import axios from "axios";
import { BASE_API } from "../BASE_API/config";

const MEMBERS_URL = `${BASE_API}/members`;

const API = axios.create({
  baseURL: MEMBERS_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchMembers = async () => {
  try {
    const response = await API.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching members: \n", error);
    throw error;
  }
};

export const addMember = async (newMember) => {
  try {
    const response = await API.post("/", newMember);
    return response.data;
  } catch (error) {
    console.error("Error adding member: \n", error);
    throw error;
  }
};

export const updateMember = async (id, updatedMember) => {
  try {
    const response = await API.put(`/${id}`, updatedMember);
    return response.data;
  } catch (error) {
    console.error("Error updating member: \n", error);
    throw error;
  }
};

export const deleteMember = async (id) => {
  try {
    const response = await API.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting member: \n", error);
    throw error;
  }
};
