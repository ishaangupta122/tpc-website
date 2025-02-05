import axios from "axios";

const BASE_URL = "http://localhost:3000/members"; // Replace with your actual API base URL

export const fetchMembers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data; // Assuming the response contains an array of members
  } catch (error) {
    console.error("Error fetching members:", error);
    throw error;
  }
};

export const addMember = async (newMember) => {
  try {
    const response = await axios.post(BASE_URL, newMember);
    return response.data; // Assuming the API returns the created member
  } catch (error) {
    console.error("Error adding member:", error);
    throw error;
  }
};

export const updateMember = async (id, updatedMember) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedMember);
    return response.data; // Assuming the API returns the updated member
  } catch (error) {
    console.error("Error updating member:", error);
    throw error;
  }
};

export const deleteMember = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data; // Assuming the API returns a success message
  } catch (error) {
    console.error("Error deleting member:", error);
    throw error;
  }
};
