import axios from "axios";
import { BASE_API } from "../BASE_API/config";

const PLACEMENTS_URL = `${BASE_API}/placements`;

const API = axios.create({
  baseURL: PLACEMENTS_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createPlacement = async (placementData) => {
  try {
    const { data } = await API.post(PLACEMENTS_URL, placementData);
    return data;
  } catch (error) {
    console.error("Error creating placement: \n", error);
    throw error;
  }
};

export const getAllPlacements = async () => {
  try {
    const { data } = await API.get(PLACEMENTS_URL);
    return data;
  } catch (error) {
    console.error("Error fetching placements: \n", error);
    throw error;
  }
};

export const getPlacementById = async (id) => {
  try {
    const { data } = await API.get(`${PLACEMENTS_URL}/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching placement: \n", error);
    throw error;
  }
};

export const updatePlacement = async (id, placementData) => {
  try {
    const { data } = await API.put(`${PLACEMENTS_URL}/${id}`, placementData);
    return data;
  } catch (error) {
    console.error("Error updating placement: \n", error);
    throw error;
  }
};

export const deletePlacement = async (id) => {
  try {
    const { data } = await API.delete(`${PLACEMENTS_URL}/${id}`);
    return data;
  } catch (error) {
    console.error("Error deleting placement: \n", error);
    throw error;
  }
};

export const addDepartmentToPlacement = async (id, departmentData) => {
  try {
    const { data } = await API.post(
      `${PLACEMENTS_URL}/${id}/departments`,
      departmentData
    );
    return data;
  } catch (error) {
    console.error("Error adding department: \n", error);
    throw error;
  }
};

export const updateDepartmentInPlacement = async (
  id,
  departmentId,
  departmentData
) => {
  try {
    const { data } = await API.put(
      `${PLACEMENTS_URL}/${id}/departments/${departmentId}`,
      departmentData
    );
    return data;
  } catch (error) {
    console.error("Error updating department: \n", error);
    throw error;
  }
};

export const removeDepartmentFromPlacement = async (id, departmentId) => {
  try {
    const { data } = await API.delete(
      `${PLACEMENTS_URL}/${id}/departments/${departmentId}`
    );
    return data;
  } catch (error) {
    console.error("Error removing department: \n", error);
    throw error;
  }
};
