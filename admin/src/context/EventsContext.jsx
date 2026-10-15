import { eventsApi } from "../api";
import { createCrudContext } from "./createCrudContext";

export const { Provider: EventsProvider, useResource: useEvents } =
  createCrudContext("Events", eventsApi);
