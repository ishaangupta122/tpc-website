export const FACULTY_DEPARTMENT_OPTIONS = [
  { label: "Admin Staff", value: "Admin Staff" },
  { label: "Applied Science", value: "Applied Science" },
  { label: "Architectural Assistantship", value: "Architectural" },
  { label: "Civil Engineering", value: "Civil" },
  { label: "Computer Science Engineering", value: "CSE" },
  { label: "Mechanical Engineering", value: "Mechanical" },
  { label: "Electrical Engineering", value: "Electrical" },
];

// Teaching departments only (placements have no "Admin Staff").
export const TEACHING_DEPARTMENT_OPTIONS = FACULTY_DEPARTMENT_OPTIONS.filter(
  (option) => option.value !== "Admin Staff",
);

export const DESIGNATION_OPTIONS = [
  { label: "Chairman", value: "Chairman" },
  { label: "Vice Chairman", value: "Vice Chairman" },
  { label: "Secretary", value: "Secretary" },
  { label: "Member", value: "Member" },
];

// Event categories: the whole college, or one department.
export const EVENT_CATEGORY_OPTIONS = [
  { label: "College", value: "College" },
  ...TEACHING_DEPARTMENT_OPTIONS,
];

// Designations are picked from a list, never typed. Admin Staff have their own
// list (keep it in sync with the filter on the public Admin Staff page).
const ADMIN_STAFF_DESIGNATIONS = [
  "Superintendent",
  "PA to Principal",
  "Assistant",
  "Clerk",
  "Assistant Librarian",
];

// Teaching departments (CSE, Civil, ...). Edit this list to add a title.
const TEACHING_DESIGNATIONS = [
  "Head of Department",
  "Lecturer",
  "Guest Faculty",
  "Lab Assistant",
];

export const designationsFor = (department) =>
  department === "Admin Staff"
    ? ADMIN_STAFF_DESIGNATIONS
    : TEACHING_DESIGNATIONS;
