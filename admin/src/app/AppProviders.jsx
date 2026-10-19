import { NotificationProvider } from "../context/NotificationContext";
import {
  AchievementsProvider,
  AicteCoursesProvider,
  AuthProvider,
  CommitteeProvider,
  DocumentsProvider,
  EventsProvider,
  FacultyProvider,
  GalleryProvider,
  NoticesProvider,
  PlacementsProvider,
  PoliciesProvider,
  SuccessStoriesProvider,
} from "../context";

// Every resource provider, mounted once. Each loads its data lazily, the
// first time a page asks for it.
const PROVIDERS = [
  NotificationProvider,
  AuthProvider,
  FacultyProvider,
  EventsProvider,
  AchievementsProvider,
  SuccessStoriesProvider,
  PlacementsProvider,
  CommitteeProvider,
  AicteCoursesProvider,
  PoliciesProvider,
  GalleryProvider,
  NoticesProvider,
  DocumentsProvider,
];

const AppProviders = ({ children }) =>
  PROVIDERS.reduceRight((tree, Provider) => <Provider>{tree}</Provider>, children);

export default AppProviders;
