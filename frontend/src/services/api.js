// Real backend operations (all GET). Components never import this file:
// they use the hooks in hooks/useResources.js, which go through services/index.js
// so the temporary static-data mode can swap this module out in one place.
import { getList, getOne } from "./http";
import { ENDPOINTS } from "./endpoints";

export const getAchievements = () => getList(ENDPOINTS.achievements, "achievements");
export const getAchievementById = (id) =>
  getOne(`${ENDPOINTS.achievements}/${id}`, "achievement");

export const getEvents = () => getList(ENDPOINTS.events, "events");
export const getEventById = (id) => getOne(`${ENDPOINTS.events}/${id}`, "event");

export const getFaculty = () => getList(ENDPOINTS.faculty, "faculty list");
export const getFacultyById = (id) =>
  getOne(`${ENDPOINTS.faculty}/${id}`, "faculty profile");

export const getGalleryImages = () => getList(ENDPOINTS.gallery, "images");

export const getMembers = () => getList(ENDPOINTS.members, "committee members");

export const getPlacements = () => getList(ENDPOINTS.placements, "placements");

export const getSuccessStories = () =>
  getList(ENDPOINTS.successStories, "success stories");
export const getSuccessStoryById = (id) =>
  getOne(`${ENDPOINTS.successStories}/${id}`, "success story");

export const getNotices = () => getList(ENDPOINTS.notices, "notices");

// section: magazines | mentors-list | forms-download | mandatory-disclosure |
// tpc-newsletter | safe-working | eoa
export const getDocuments = (section) =>
  getList(`${ENDPOINTS.documents}/${section}`, "documents");

// The Principal page content (an empty object until the admin saves it).
export const getPrincipal = () => getOne(ENDPOINTS.principal, "principal page");

export const getAicteCourses = () => getList(ENDPOINTS.aicteCourses, "AICTE courses");

// What the admin saved for the department pages (a list, empty until then).
export const getDepartments = () => getList(ENDPOINTS.departments, "departments");

// The college contact details (an empty object until the admin saves them).
export const getContact = () => getOne(ENDPOINTS.contact, "contact details");

export const getPolicies = () => getList(ENDPOINTS.policies, "policies");
