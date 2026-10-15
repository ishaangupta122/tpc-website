import { achievementsApi } from "../api";
import { createCrudContext } from "./createCrudContext";

export const { Provider: AchievementsProvider, useResource: useAchievements } =
  createCrudContext("Achievements", achievementsApi);
