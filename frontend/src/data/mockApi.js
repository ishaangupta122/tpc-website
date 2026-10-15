// Static-data implementation of services/api.js, used only while
// VITE_USE_MOCK_DATA=true. Same function names and return shapes as the real
// API, so nothing else in the app knows which one is active.
import {
  mockCollegeAchievements,
  mockDepartmentAchievements,
  mockElectricalAchievements,
  mockEvents,
  mockFaculty,
  mockGallery,
  mockDocuments,
  mockMembers,
  mockNotices,
  mockPlacements,
  mockSuccessStories,
  findMock,
} from "./mockData";

const byId = (list, id) => {
  const found = findMock(list, id);
  if (!found) return Promise.reject(new Error("Not found"));
  return Promise.resolve(found);
};

export const getAchievements = () => Promise.resolve(mockCollegeAchievements);
export const getAchievementById = (id) =>
  byId([...mockCollegeAchievements, ...mockDepartmentAchievements, ...mockElectricalAchievements], id);

export const getEvents = () => Promise.resolve(mockEvents);
export const getEventById = (id) => byId(mockEvents, id);

export const getFaculty = () => Promise.resolve(mockFaculty);
export const getFacultyById = (id) => byId(mockFaculty, id);

export const getGalleryImages = () => Promise.resolve(mockGallery);
export const getMembers = () => Promise.resolve(mockMembers);
export const getPlacements = () => Promise.resolve(mockPlacements);

export const getSuccessStories = () => Promise.resolve(mockSuccessStories);
export const getSuccessStoryById = (id) => byId(mockSuccessStories, id);

export const getNotices = () => Promise.resolve(mockNotices);
export const getDocuments = (section) => Promise.resolve(mockDocuments[section] || []);
