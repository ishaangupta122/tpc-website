import axios from "axios";
import BASE_API from "../../BASE_API/config";

const COMMITTEE_MEMBERS_URL = `${BASE_API}/members`;

const API = axios.create({
  baseURL: COMMITTEE_MEMBERS_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchMembers = async () => {
  try {
    const { data } = await API.get("/");
    return data;
  } catch (error) {
    console.error("Error fetching committee members: \n", error);
    throw error;
  }
};
