// All backend access lives here. Components never import axios or these
// clients directly: they use the hooks exported by `src/context`.
import { http } from "./client";
import { buildFormData } from "./formData";
import { createCrudApi } from "./createCrudApi";

export const authApi = {
  login: async (email, password) =>
    (await http.post("/auth/login", { email, password })).data,
  me: async () => (await http.get("/auth/me")).data,
};

export const facultyApi = createCrudApi("/faculty");
export const eventsApi = createCrudApi("/events", { updateMethod: "patch" });
export const achievementsApi = createCrudApi("/achievements");
export const successStoriesApi = createCrudApi("/successstory", {
  updateMethod: "patch",
});
export const galleryApi = createCrudApi("/gallery");
export const committeeApi = createCrudApi("/members", { multipart: false });
export const noticesApi = createCrudApi("/notices", { fileField: "file" });

// Placements: one record per year holding a list of department rows.
export const placementsApi = {
  ...createCrudApi("/placements", { multipart: false }),
  // Creates the year, or merges the department into it when it exists.
  addDepartment: async (year, department) =>
    (await http.post("/placements", { year, departments: [department] })).data,
  updateDepartment: async (id, departmentId, department) =>
    (await http.put(`/placements/${id}/departments/${departmentId}`, department))
      .data,
  removeDepartment: async (id, departmentId) =>
    (await http.delete(`/placements/${id}/departments/${departmentId}`)).data,
};

// Documents: PDFs grouped by site section. Every call is scoped to a section.
export const DOCUMENT_SECTIONS = [
  { label: "College Magazine", value: "magazines" },
  { label: "List of Mentors", value: "mentors-list" },
  { label: "Forms Download", value: "forms-download" },
  { label: "Mandatory Disclosure", value: "mandatory-disclosure" },
  { label: "TPC Newsletter", value: "tpc-newsletter" },
  { label: "Safe Working", value: "safe-working" },
  { label: "Extension of Approval (EOA)", value: "eoa" },
];

export const documentsApi = {
  // The backend has no "all documents" route: one request per section.
  list: async () => {
    const lists = await Promise.all(
      DOCUMENT_SECTIONS.map(
        async ({ value }) => (await http.get(`/documents/${value}`)).data
      )
    );
    return lists.flat();
  },
  create: async (section, data, file) =>
    (
      await http.post(
        `/documents/${section}`,
        buildFormData({ title: data.title }, file, "file")
      )
    ).data,
  update: async (section, id, data, file) =>
    (
      await http.put(
        `/documents/${section}/${id}`,
        buildFormData({ title: data.title }, file, "file")
      )
    ).data,
  remove: async (section, id) =>
    (await http.delete(`/documents/${section}/${id}`)).data,
};
