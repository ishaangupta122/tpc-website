import { http } from "./client";
import { buildFormData } from "./formData";

// REST client for one resource.
//   path          e.g. "/events"
//   multipart     true: create/update send multipart form-data (file uploads)
//   updateMethod  the backend uses PUT for most resources, PATCH for a few
//   fileField     name of the upload field
export const createCrudApi = (
  path,
  { multipart = true, updateMethod = "put", fileField = "image" } = {}
) => {
  const body = (data, file) =>
    multipart ? buildFormData(data, file, fileField) : data;

  return {
    list: async () => (await http.get(path)).data,
    get: async (id) => (await http.get(`${path}/${id}`)).data,
    create: async (data, file) =>
      (await http.post(path, body(data, file))).data,
    update: async (id, data, file) =>
      (await http[updateMethod](`${path}/${id}`, body(data, file))).data,
    remove: async (id) => (await http.delete(`${path}/${id}`)).data,
  };
};
