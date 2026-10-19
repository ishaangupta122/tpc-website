// The departments that have a page on the website. `facultyDepartment` is how the
// Faculty list names the department (used to find its head of department).
export const DEPARTMENTS = [
  { key: "cse", name: "Computer Science & Engineering", facultyDepartment: "CSE" },
  { key: "mechanical", name: "Mechanical Engineering", facultyDepartment: "Mechanical" },
  { key: "civil", name: "Civil Engineering", facultyDepartment: "Civil" },
  { key: "electrical", name: "Electrical Engineering", facultyDepartment: "Electrical" },
  { key: "architectural", name: "Architectural Assistantship", facultyDepartment: "Architectural" },
  { key: "appliedScience", name: "Applied Science", facultyDepartment: "Applied Science" },
];

// The kinds of item a department can list under "Other Pages".
export const RESOURCE_TYPES = [
  { label: "HTML Page", value: "page" },
  { label: "PDF Document", value: "pdf" },
  { label: "External Link", value: "link" },
];

// Finds the head of department in the Faculty list.
export const findHod = (faculty, department) =>
  faculty.find(
    (member) =>
      member.department === department.facultyDepartment &&
      /head of department|\bhod\b|incharge/i.test(member.designation || "")
  );
