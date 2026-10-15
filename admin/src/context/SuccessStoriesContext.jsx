import { successStoriesApi } from "../api";
import { createCrudContext } from "./createCrudContext";

export const {
  Provider: SuccessStoriesProvider,
  useResource: useSuccessStories,
} = createCrudContext("SuccessStories", successStoriesApi);
