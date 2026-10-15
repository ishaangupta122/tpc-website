// Domain hooks: the only way components read API data.
// Lists return `data` as an array (empty while loading or on error: check
// `loading` / `error` to tell those cases apart from a genuinely empty list).
// Single items return `data` as null until loaded.
import { useResource } from "./useResource";
import { api } from "../services";
import { staticGalleryImages } from "../data/data";

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
