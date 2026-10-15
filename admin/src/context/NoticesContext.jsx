import { noticesApi } from "../api";
import { createCrudContext } from "./createCrudContext";

export const { Provider: NoticesProvider, useResource: useNotices } =
  createCrudContext("Notices", noticesApi);
