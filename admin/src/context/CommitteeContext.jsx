import { committeeApi } from "../api";
import { createCrudContext } from "./createCrudContext";

export const { Provider: CommitteeProvider, useResource: useCommittee } =
  createCrudContext("Committee", committeeApi);
