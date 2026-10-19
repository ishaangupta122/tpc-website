// Domain hooks: the only way components read API data.
// Lists return `data` as an array (empty while loading or on error: check
// `loading` / `error` to tell those cases apart from a genuinely empty list).
// Single items return `data` as null until loaded.
import { useResource } from "./useResource";
import { api } from "../services";
import { staticGalleryImages, principalDefaults, courses as staticCourses, policyContent, collegeContact } from "../data/data";

const EMPTY = [];

const useList = (key, fetcher) => {
  const result = useResource(key, fetcher);
  return { ...result, data: result.data ?? EMPTY };
};

const useItem = (key, fetcher, id) => {
  const result = useResource(key, fetcher, Boolean(id));
  return { ...result, data: result.data ?? null };
};

export const useAchievements = () => useList("achievements", api.getAchievements);
export const useEvents = () => useList("events", api.getEvents);
export const useFaculty = () => useList("faculty", api.getFaculty);
export const useNotices = () => useList("notices", api.getNotices);
export const useDocuments = (section) =>
  useList(`documents:${section}`, () => api.getDocuments(section));
export const useMembers = () => useList("members", api.getMembers);
export const usePlacements = () => useList("placements", api.getPlacements);
export const useSuccessStories = () => useList("successStories", api.getSuccessStories);

// Falls back to the bundled static images only when the server answers
// successfully with no images (never on a failed request).
export const useGalleryImages = () => {
  const result = useResource("gallery", api.getGalleryImages);
  const loaded = result.data !== undefined;
  const images = !loaded ? EMPTY : result.data.length > 0 ? result.data : staticGalleryImages;
  return { ...result, data: images, images };
};

export const useAchievement = (id) =>
  useItem(`achievements:${id}`, () => api.getAchievementById(id), id);
export const useEvent = (id) =>
  useItem(`events:${id}`, () => api.getEventById(id), id);
export const useFacultyMember = (id) =>
  useItem(`faculty:${id}`, () => api.getFacultyById(id), id);
export const useSuccessStory = (id) =>
  useItem(`successStories:${id}`, () => api.getSuccessStoryById(id), id);

// Principal page content from the admin, field by field falling back to the
// built-in text. A failed request also shows the built-in content.
export const usePrincipal = () => {
  const result = useResource("principal", api.getPrincipal);
  const saved = result.data || {};
  const data = {
    name: saved.name || principalDefaults.name,
    image: saved.image || principalDefaults.image,
    message: saved.message || principalDefaults.message,
    highlights: saved.highlights?.length ? saved.highlights : principalDefaults.highlights,
  };
  return { ...result, data, error: null };
};

// AICTE courses from the admin; the built-in list is shown only when the
// server answers successfully with no courses (never on a failed request).
export const useAicteCourses = () => {
  const result = useResource("aicteCourses", api.getAicteCourses);
  const loaded = result.data !== undefined;
  const courses = !loaded ? EMPTY : result.data.length > 0 ? result.data : staticCourses;
  return { ...result, data: courses };
};

// The built-in policy cards in the same shape the admin saves them.
const staticPolicies = policyContent.map((policy) => ({
  _id: policy.id,
  title:
    policy.heading.replace("Requirements", "Policy").replace("Rules", "Policy") ||
    "Policy",
  points: policy.points || [],
  groups: policy.sections || [],
}));

// Policy cards from the admin; the built-in ones are shown only when the
// server answers successfully with none (never on a failed request).
export const usePolicies = () => {
  const result = useResource("policies", api.getPolicies);
  const loaded = result.data !== undefined;
  const policies = !loaded ? EMPTY : result.data.length > 0 ? result.data : staticPolicies;
  return { ...result, data: policies };
};

// Dialable form of a phone number as the admin typed it ("75088-55997" -> "+917508855997").
const toTel = (phone) => {
  const digits = phone.replace(/\D/g, "");
  if (phone.trim().startsWith("+")) return `+${digits}`;
  return digits.length === 10 ? `+91${digits}` : digits;
};

// College contact details from the admin, in the same shape as the built-in
// `collegeContact`; empty or failed loads fall back to the built-in details.
export const useContact = () => {
  const result = useResource("contact", api.getContact);
  const saved = result.data || {};
  const phones = (saved.phones || []).filter(Boolean);
  const data = {
    name: saved.name || collegeContact.name,
    addressLines: saved.address
      ? saved.address.split("\n").filter(Boolean)
      : collegeContact.addressLines,
    phones: phones.length
      ? phones.map((display) => ({ display, tel: toTel(display) }))
      : collegeContact.phones,
    email: saved.email || collegeContact.email,
    hours: saved.hours ?? collegeContact.hours,
  };
  return { ...result, data, error: null };
};

// What the admin saved for the department pages; the built-in text covers the rest.
export const useDepartments = () => useList("departments", api.getDepartments);
