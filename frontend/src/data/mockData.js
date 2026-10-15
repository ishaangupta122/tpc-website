// ---------------------------------------------------------------------------
// TEMPORARY MOCK DATA -- for designing the UI while there is no real server data.
//
// How it works: set VITE_USE_MOCK_DATA=true in .env (restart the dev server) and
// services/index.js serves these lists through data/mockApi.js instead of the
// backend. Leave it unset / false to use the real API. Failed real requests are
// never replaced with mock data.
//
// To remove later:
//   1. Delete this file, data/mockApi.js and the mock branch in services/index.js
//   2. Remove the `USE_MOCK_DATA` fallbacks in components/NoticesPanel.jsx and
//      components/DepartmentPage.jsx (and the mockElectricalAchievements import
//      in data/departments.js)
//   3. Delete the placeholder PDFs in public/notices/ once real ones exist.
// ---------------------------------------------------------------------------

// Home page: "College Achievements" carousel. Overrides server data while
// mock mode is on.
export const mockCollegeAchievements = [
  {
    _id: "mock-1",
    category: "College",
    date: "2025-02-02",
    title: "Best College Award 2025",
    description:
      "Awarded as the best polytechnic college of the year in recognition of academic excellence, infrastructure and student outcomes.",
    image: "/ndli_award.jpg",
  },
  {
    _id: "mock-2",
    category: "Student",
    date: "2025-03-14",
    title: "First Prize at Inter-Polytechnic Technical Fest",
    description:
      "Our students secured first position in the state-level technical competition, competing against teams from over twenty institutes.",
    image: "/cseLab2.jpg",
  },
  {
    _id: "mock-3",
    category: "Faculty",
    date: "2024-11-20",
    title: "Faculty Member Honoured with Teaching Excellence Award",
    description:
      "Recognised for outstanding contribution to teaching, mentoring and curriculum development in the department.",
    image: "/physicsLab.jpg",
  },
  {
    _id: "mock-4",
    category: "College",
    date: "2024-09-08",
    title: "100% Placement Drive Completed Successfully",
    description:
      "All eligible final-year students received offers from visiting companies during the annual campus placement drive.",
    image: "/campus.webp",
  },
];

// Department pages: "Department Achievements" list. Used only when the server
// returns none for that department.
export const mockDepartmentAchievements = [
  {
    _id: "college-1",
    title: "ISTE National Award for Best Principal in a Polytechnic College",
    description:
      "Principal Dr. Ankush Kansal received the ISTE National Award for Best Principal in a Polytechnic College.",
  },
  {
    _id: "college-2",
    title: "Declared an Outstanding Institution in the Northern Region",
    description:
      "Thapar Polytechnic College was declared an Outstanding Institution in the Northern Region for 2017-18.",
  },
  {
    _id: "college-3",
    title: "Best Polytechnic in the Northern Region",
    description:
      "The college was recognised as the best polytechnic in the Northern Region for 1999-2000 and 2005-06.",
  },
];


export const mockElectricalAchievements = [
  {
    _id: "ee-1",
    title: "Best Polytechnic Teacher Award",
    description:
      "Dr. Anurag Joshi, Head of Department, received the Best Polytechnic Teacher Award from ISTE, New Delhi.",
  },
  {
    _id: "ee-2",
    title: "Leadership Award for Excellence",
    description:
      "Dr. Anurag Joshi, Head of Department, received the Leadership Award for Excellence from CEE.",
  },
];

// Home page: "Notices & Circulars" list. Each url is a PDF in public/notices/.
export const mockNotices = [
  { _id: "mock-n1", title: "Admission Notice 2025-26", fileUrl: "/notices/admission-notice-2025-26.pdf" },
  { _id: "mock-n2", title: "Academic Calendar 2025-26", fileUrl: "/notices/academic-calendar-2025-26.pdf" },
  { _id: "mock-n3", title: "Fee Structure 2025-26", fileUrl: "/notices/fee-structure-2025-26.pdf" },
  { _id: "mock-n4", title: "Examination Date Sheet", fileUrl: "/notices/exam-date-sheet.pdf" },
  { _id: "mock-n5", title: "Scholarship Notification for Students", fileUrl: "/notices/scholarship-notification.pdf" },
  { _id: "mock-n6", title: "List of Holidays 2025", fileUrl: "/notices/holiday-list-2025.pdf" },
  { _id: "mock-n7", title: "Mandatory Disclosure Document", fileUrl: "/notices/mandatory-disclosure.pdf" },
  { _id: "mock-n8", title: "Anti-Ragging Guidelines", fileUrl: "/notices/anti-ragging-guidelines.pdf" },
  { _id: "mock-n9", title: "Hostel Admission Notice", fileUrl: "/notices/hostel-admission-notice.pdf" },
  { _id: "mock-n10", title: "Campus Placement Schedule", fileUrl: "/notices/campus-placement-schedule.pdf" },
];

// Home page: "Events & Updates" carousel. Overrides server data in mock mode.
export const mockEvents = [
  {
    _id: "mock-e1",
    date: "2025-02-02",
    title: "Fresher's Fest 2025",
    description:
      "Welcome event for the 2025 batch with performances, games and an introduction to campus life. Venue: Campus Ground.",
    image: "/campus.webp",
  },
  {
    _id: "mock-e2",
    date: "2025-01-26",
    title: "Republic Day Celebration",
    description:
      "Flag hoisting followed by cultural programmes and a speech by the Principal for students and staff.",
    image: "/rec_gate.jpg",
  },
  {
    _id: "mock-e3",
    date: "2024-12-10",
    title: "Faculty Development Programme",
    description:
      "A one-week programme on modern teaching methods and outcome-based education for all departments.",
    image: "/cseLab1.jpg",
  },
  {
    _id: "mock-e4",
    date: "2024-10-18",
    title: "Annual Sports Meet",
    description:
      "Inter-department athletics and team events with prizes distributed on the closing day.",
    image: "/boys_hostel.jpg",
  },
  {
    _id: "mock-e5",
    date: "2024-09-05",
    title: "Teachers' Day Programme",
    description:
      "Students honoured their teachers with a cultural evening and a felicitation ceremony.",
    image: "/girls_hostel.jpg",
  },
];

// Home page: "Success Stories" vertical list. Overrides server data in mock mode.
export const mockSuccessStories = [
  {
    _id: "mock-s1",
    title: "Placed at a leading IT company with a 12 LPA package",
    description:
      "A CSE diploma graduate secured a software role through the campus placement drive.",
    image: "/image1.jpeg",
  },
  {
    _id: "mock-s2",
    title: "From polytechnic to a top engineering college",
    description:
      "A civil engineering student topped the LEET exam and joined a reputed degree college.",
    image: "/image2.jpeg",
  },
  {
    _id: "mock-s3",
    title: "Started a design studio after graduating",
    description:
      "An architectural alumnus now runs an independent studio with projects across the state.",
    image: "/image3.jpeg",
  },
  {
    _id: "mock-s4",
    title: "Selected for a national apprenticeship programme",
    description:
      "An electrical engineering student was chosen from over a thousand applicants nationwide.",
    image: "/architectRoom.jpg",
  },
];

// ---------------------------------------------------------------------------
// Mock data for the remaining APIs (faculty, admin staff, committee,
// placements, gallery). Served through data/mockApi.js in mock mode.
// ---------------------------------------------------------------------------

const person = (n, name, department, designation, image, joinedDate, experience, education) => ({
  _id: `mock-f${n}`,
  name,
  department,
  designation,
  image,
  email: `${name.toLowerCase().replace(/[^a-z]+/g, ".").replace(/^\.|\.$/g, "")}@example.com`,
  phone: `98765${String(10000 + n * 137).slice(0, 5)}`,
  joinedDate,
  experience: String(experience),
  education,
});

export const mockFaculty = [
  // Teaching staff
  person(1, "Dr. Sangeeta Goyal", "Computer Science Engineering", "Head of Department", "/sangeetaGoyal.jpg", "2008-07-01", 17, ["Ph.D. (Computer Science)", "M.Tech (CSE)", "B.Tech (CSE)"]),
  person(2, "Er. Vijay Sharma", "Computer Science Engineering", "Lecturer", "/vijaySharma.jpg", "2014-08-11", 11, ["M.Tech (CSE)", "B.Tech (IT)"]),
  person(3, "Er. Monika Rani", "Computer Science Engineering", "Lecturer", "/monika.jpg", "2018-01-15", 7, ["M.Tech (CSE)", "B.Tech (CSE)"]),
  person(4, "Er. Deepak Kumar", "Mechanical Engineering", "Head of Department", "/deepak.jpg", "2006-07-10", 19, ["M.Tech (Thermal Engg.)", "B.Tech (Mechanical)"]),
  person(5, "Er. Kunnal Mehta", "Mechanical Engineering", "Lecturer", "/kunnal.jpg", "2016-09-05", 9, ["M.Tech (Production)", "B.Tech (Mechanical)"]),
  person(6, "Er. Shashi Bala", "Civil Engineering", "Head of Department", "/shashiBala.jpg", "2009-07-20", 16, ["M.Tech (Structural)", "B.Tech (Civil)"]),
  person(7, "Er. Gurmehak Kaur", "Civil Engineering", "Lecturer", "/gurmehak.jpg", "2019-02-04", 6, ["M.Tech (Environmental)", "B.Tech (Civil)"]),
  person(8, "Er. Arsheen Kaur", "Electrical Engineering", "Head of Department", "/arsheen.jpg", "2010-07-12", 15, ["M.Tech (Power Systems)", "B.Tech (Electrical)"]),
  person(9, "Er. Rajesh Verma", "Electrical Engineering", "Lecturer", "", "2017-08-21", 8, ["M.Tech (Control Systems)", "B.Tech (Electrical)"]),
  person(10, "Ar. Neha Arora", "Architechural Assitantship", "Head of Department", "", "2012-07-16", 13, ["M.Arch", "B.Arch"]),
  person(11, "Dr. Harpreet Singh", "Applied Science", "Head of Department", "", "2005-07-01", 20, ["Ph.D. (Physics)", "M.Sc. (Physics)"]),
  person(12, "Dr. Anita Kapoor", "Applied Science", "Lecturer", "", "2015-07-27", 10, ["Ph.D. (Chemistry)", "M.Sc. (Chemistry)"]),
  // Library
  person(13, "Mrs. Kiran Bedi", "Library", "Assistant Librarian", "", "2013-03-18", 12, ["M.Lib.Sc.", "B.Lib.Sc."]),
  // Administrative staff (shown on the Admin Staff page)
  person(21, "Mr. Balwinder Singh", "Admin Staff", "Superintendent", "", "2004-05-03", 21, ["M.A.", "B.A."]),
  person(22, "Mrs. Rekha Sharma", "Admin Staff", "PA to Principal", "", "2011-10-10", 14, ["B.Com", "Diploma in Stenography"]),
  person(23, "Mr. Sunil Kumar", "Admin Staff", "Sr. Asstt.", "", "2009-06-15", 16, ["B.A."]),
  person(24, "Mr. Amit Joshi", "Admin Staff", "Sr. Asstt.", "", "2012-02-09", 13, ["B.Com"]),
  person(25, "Ms. Pooja Rani", "Admin Staff", "Jr. Asstt.", "", "2018-11-26", 7, ["B.A.", "Computer Diploma"]),
  person(26, "Mr. Manoj Kumar", "Admin Staff", "Jr. Asstt.", "", "2019-04-01", 6, ["B.Sc."]),
  person(27, "Mr. Ravi Dhiman", "Admin Staff", "Clerk", "", "2021-01-18", 4, ["12th"]),
  person(28, "Ms. Simran Kaur", "Admin Staff", "Clerk", "", "2022-07-04", 3, ["B.A."]),
];

export const mockMembers = [
  { id: "m1", name: "Sh. Rakesh Mittal", info: "Industrialist, Managing Director of a local manufacturing group", designation: "Chairman" },
  { id: "m2", name: "Smt. Anjali Gupta", info: "Retired Principal, Government Polytechnic", designation: "Vice Chairman" },
  { id: "m3", name: "Dr. Sangeeta Goyal", info: "Head of Department, Computer Science Engineering", designation: "Secretary" },
  { id: "m4", name: "Sh. Harish Chopra", info: "Chartered Accountant and society treasurer", designation: "Member" },
  { id: "m5", name: "Er. Gurpreet Singh", info: "Chief Engineer (Retd.), State Public Works Department", designation: "Member" },
  { id: "m6", name: "Dr. Mohan Lal", info: "Professor, Department of Technical Education", designation: "Member" },
  { id: "m7", name: "Smt. Rajni Bala", info: "Social worker and education advocate", designation: "Member" },
  { id: "m8", name: "Sh. Vikram Malhotra", info: "Alumni representative, Senior Manager at an IT firm", designation: "Member" },
];

const dep = (department, approvedIntake, companiesVisited, studentsPlaced, avgPackage) => ({
  department, approvedIntake, companiesVisited, studentsPlaced, avgPackage,
});

export const mockPlacements = [
  {
    year: 2024,
    departments: [
      dep("Computer Science Engineering", 60, 14, 48, 4.2),
      dep("Mechanical Engineering", 60, 11, 40, 3.4),
      dep("Civil Engineering", 60, 8, 31, 3.1),
      dep("Electrical Engineering", 60, 9, 35, 3.3),
      dep("Architechural Assitantship", 40, 5, 22, 2.8),
    ],
  },
  {
    year: 2023,
    departments: [
      dep("Computer Science Engineering", 60, 12, 44, 3.9),
      dep("Mechanical Engineering", 60, 10, 37, 3.2),
      dep("Civil Engineering", 60, 7, 28, 2.9),
      dep("Electrical Engineering", 60, 8, 33, 3.1),
    ],
  },
  {
    year: 2022,
    departments: [
      dep("Computer Science Engineering", 60, 10, 41, 3.6),
      dep("Mechanical Engineering", 60, 9, 35, 3.0),
      dep("Civil Engineering", 60, 6, 26, 2.7),
    ],
  },
];

const galleryFiles = [
  ["rec_gate.jpg", "Main gate of the campus"],
  ["ndli_award.jpg", "NDLI award ceremony"],
  ["girls_hostel.jpg", "Girls hostel building"],
  ["boys_hostel.jpg", "Boys hostel building"],
  ["principal.jpeg", "Principal addressing students"],
  ["campus.webp", "Campus aerial view"],
  ["image1.jpeg", "Annual function"],
  ["image2.jpeg", "Prize distribution"],
  ["image3.jpeg", "Sports day"],
  ["cseLab1.jpg", "Computer lab"],
  ["cseLab2.jpg", "Programming lab"],
  ["civilLab1.jpg", "Civil engineering lab"],
  ["civilLab2.jpg", "Surveying lab"],
  ["physicsLab.jpg", "Physics lab"],
  ["chemistryLab.jpg", "Chemistry lab"],
  ["architectRoom.jpg", "Architecture studio"],
  ["architectRoom1.jpg", "Drawing hall"],
  ["cseLab3.jpg", "Networking lab"],
  ["cseLab4.jpg", "Software lab"],
  ["civilLab3.jpg", "Materials testing lab"],
];

export const mockGallery = galleryFiles.map(([file, description], i) => ({
  _id: `mock-g${i + 1}`,
  imageUrl: `/${file}`,
  description,
}));

// Detail-page lookups (used by data/mockApi.js).
export const findMock = (list, id) => list.find((item) => item._id === id) || null;

// Section PDFs (topbar pages). Titles only: no files exist for the mock data.
const mockDocs = (section, titles) =>
  titles.map((title, i) => ({ _id: `mock-${section}-${i}`, section, title, fileUrl: null }));

export const mockDocuments = {
  magazines: mockDocs("magazines", ["TPC Magazine 2018", "TPC Magazine 2019", "TPC Magazine 2020-2022", "TPC Magazine 2023-2024"]),
  "mentors-list": mockDocs("mentors-list", [2020, 2021, 2022, 2023, 2024, 2025].map((y) => `List of Mentors ${y}`)),
  "forms-download": mockDocs("forms-download", ["Casual Leave Form", "TA-DA Form", "Quotation Form", "Purchase Index Form", "Order Supply Form", "Journey Approval Form", "Advance Form", "Guest House Form", "Guest Faculty Salary Form", "Gate Pass Form", "Earned Leave Claim Form", "Earned Leave Form", "Construction & Maintenance Form", "Bill Form", "Bill Forwarding Form", "Advance From Provident Fund Form"]),
  "mandatory-disclosure": mockDocs("mandatory-disclosure", ["Mandatory Disclosure (Annexure-10)", "Staff Service Rules", "Anti Ragging Committee", "Internal Complaint Committee", "Grievance Redressal Committee", "Internal Quality Assurance Cell", "SC/ST Prevention of Atrocities Committee", "NBA Accreditation Status"]),
  "tpc-newsletter": mockDocs("tpc-newsletter", ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh"].map((n) => `${n} Issue of TIMES OF TPC`)),
  "safe-working": mockDocs("safe-working", ["Sexual harassment of women at workplace (Prevention,prohibition and redressal) Act,2013", "Internal Committee"]),
  eoa: mockDocs("eoa", Array.from({ length: 10 }, (_, i) => `Extension of Approval (${2015 + i}-${2016 + i})`)),
};
