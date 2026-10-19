// One Provider + hook per standard CRUD resource (see createCrudContext).
// Placements, Documents and Auth have extra behaviour and live in their own files.
import {
  achievementsApi,
  aicteCoursesApi,
  committeeApi,
  eventsApi,
  facultyApi,
  galleryApi,
  noticesApi,
  policiesApi,
  successStoriesApi,
} from "../api";
import { createCrudContext } from "./createCrudContext";

export const { Provider: AchievementsProvider, useResource: useAchievements } =
  createCrudContext("Achievements", achievementsApi);
export const { Provider: AicteCoursesProvider, useResource: useAicteCourses } =
  createCrudContext("AicteCourses", aicteCoursesApi);
export const { Provider: CommitteeProvider, useResource: useCommittee } =
  createCrudContext("Committee", committeeApi);
export const { Provider: EventsProvider, useResource: useEvents } =
  createCrudContext("Events", eventsApi);
export const { Provider: FacultyProvider, useResource: useFaculty } =
  createCrudContext("Faculty", facultyApi);
export const { Provider: GalleryProvider, useResource: useGallery } =
  createCrudContext("Gallery", galleryApi);
export const { Provider: NoticesProvider, useResource: useNotices } =
  createCrudContext("Notices", noticesApi);
export const { Provider: PoliciesProvider, useResource: usePolicies } =
  createCrudContext("Policies", policiesApi);
export const { Provider: SuccessStoriesProvider, useResource: useSuccessStories } =
  createCrudContext("SuccessStories", successStoriesApi);
