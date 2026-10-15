import { facultyApi } from "../api";
import { createCrudContext } from "./createCrudContext";

export const { Provider: FacultyProvider, useResource: useFaculty } =
  createCrudContext("Faculty", facultyApi);
