// ---------------------------------------------------------------------------
// MOCK API -- the one file that fakes the whole backend for testing.
//
// Used by BOTH apps (admin and frontend) when VITE_USE_MOCK_DATA=true in that
// app's .env (restart the dev server after changing it). It plugs in as the
// axios adapter, so every request goes through the normal code paths and gets
// the same JSON the real backend sends: same URLs, same fields, same errors.
//
//   - Data lives in memory: creating, editing, deleting and reordering work
//     in the admin, and the changes last until the page is reloaded.
//   - Admin sign-in: admin@tpc.ac.in / admin123 (anything else is rejected).
//     Like the real API, writes need a signed-in admin (401 otherwise).
//   - Uploaded images and PDFs become temporary blob: URLs.
//
// To change the test data, edit the SEED section below.
// ---------------------------------------------------------------------------

export const MOCK_LOGIN = { email: "admin@tpc.ac.in", password: "admin123" };

// ============================== helpers ====================================

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const pad = (n) => String(n).padStart(2, "0");

// "2026-10-15" -> "15 Oct 2026" (the format the backend stores).
const toDisplayDate = (iso) => {
  const [y, m, d] = iso.split("-");
  return `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}`;
};
// Accepts "2026-10-15" or "15 Oct 2026" -> "2026-10-15".
const toIsoDate = (value) => {
  if (typeof value !== "string" || !value) return "";
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10);
  const time = Date.parse(value);
  if (Number.isNaN(time)) return "";
  const date = new Date(time);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};
const yearsSince = (iso) => {
  const start = new Date(iso);
  if (Number.isNaN(start.getTime())) return null;
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  if (now < new Date(now.getFullYear(), start.getMonth(), start.getDate())) years -= 1;
  return Math.max(0, years);
};

let idCounter = 0;
const newId = () => {
  idCounter += 1;
  return (0x6a0000000000 + idCounter).toString(16).padStart(8, "0").padEnd(24, "0");
};
const stamp = () => new Date().toISOString();

// A coloured placeholder picture (inline SVG, so it needs no files or network).
const picture = (label, hue = 150, width = 800, height = 500) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">` +
      `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue},55%,28%)"/>` +
      `<stop offset="1" stop-color="hsl(${(hue + 40) % 360},60%,45%)"/></linearGradient></defs>` +
      `<rect width="100%" height="100%" fill="url(#g)"/>` +
      `<text x="50%" y="50%" fill="white" font-family="Arial,sans-serif" font-size="${Math.round(width / 16)}" ` +
      `text-anchor="middle" dominant-baseline="middle">${label.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</text></svg>`,
  );
const portrait = (name, hue) => {
  const initials = name
    .replace(/^(Dr|Er|Mr|Mrs|Ms|Prof)\.?\s+/i, "")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
  return picture(initials, hue, 400, 400);
};

// A small valid PDF, for "download" links in the mock documents.
const PDF = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

// ================================ SEED =====================================

const DEPARTMENTS = ["CSE", "Mechanical", "Civil", "Electrical", "Architectural", "Applied Science"];

const withDate = (item) => ({ ...item, date: toDisplayDate(item.dateIso), dateIso: item.dateIso });

// Page-builder blocks (heading, text, imagetext, gallery, html).
const blocks = {
  rich: (title, hue) => [
    { type: "heading", text: "Overview", html: "", image: "", images: [], side: "left", cols: 3 },
    {
      type: "text",
      text: `${title} was a major milestone for the college.\n\nStudents and faculty worked together for several weeks to prepare, and the result reflects that effort.`,
      html: "", image: "", images: [], side: "left", cols: 3,
    },
    {
      type: "imagetext",
      text: "The team received appreciation from the guests and the management committee.",
      html: "", image: picture(`${title} - team`, hue), images: [], side: "left", cols: 3,
    },
    {
      type: "gallery",
      text: "Moments from the day",
      html: "", image: "", images: [1, 2, 3].map((n) => picture(`Photo ${n}`, hue + n * 20)), side: "left", cols: 3,
    },
    {
      type: "html",
      text: "", image: "", images: [], side: "left", cols: 3,
      html: "<h3>Highlights</h3><ul><li>Participation from all departments</li><li>Guest talk by industry experts</li><li>Prizes for the top teams</li></ul><table><thead><tr><th>Position</th><th>Team</th></tr></thead><tbody><tr><td>First</td><td>Team Alpha</td></tr><tr><td>Second</td><td>Team Beta</td></tr></tbody></table>",
    },
  ],
  simple: (title, hue) => [
    { type: "text", text: `${title}.\n\nMore details will be shared soon.`, html: "", image: "", images: [], side: "left", cols: 3 },
    { type: "imagetext", text: "", html: "", image: picture(title, hue), images: [], side: "right", cols: 3 },
  ],
};

const seedAchievements = () =>
  [
    ["Best Polytechnic in the Northern Region", "2026-09-12", "The college was recognised as the best polytechnic in the Northern Region by a national education council.", 150, true],
    ["ISTE Award for Best Principal", "2026-07-03", "Principal Dr. Ankush Kansal received the ISTE National Award for Best Principal in a Polytechnic College.", 200, true],
    ["First Prize at State Technical Fest", "2026-03-18", "Our students secured first position in the state level technical competition against twenty institutes.", 20, false],
    ["100% Campus Placement Drive", "2025-12-09", "All eligible final year students received offers during the annual campus placement drive.", 280, true],
    ["NSS Unit Wins District Award", "2025-08-27", "The NSS unit of the college was honoured for its blood donation and tree plantation drives.", 100, false],
    ["Faculty Teaching Excellence Award", "2025-05-14", "A faculty member was honoured for outstanding contribution to teaching and curriculum development.", 330, false],
  ].map(([title, dateIso, description, hue, rich]) => ({
    _id: newId(), ...withDate({ dateIso }), title, description,
    image: picture(title, hue), blocks: rich ? blocks.rich(title, hue) : [],
  }));

const seedEvents = () => {
  const rows = [
    ["College", "Annual Technical Fest 2026", "2026-10-12", 160, true],
    ["College", "Independence Day Celebration", "2026-08-15", 30, false],
    ["College", "Annual Sports Meet", "2026-02-21", 90, false],
    ["College", "Alumni Meet 2025", "2025-12-20", 260, true],
    ["CSE", "Coding Contest: Code Sprint", "2026-10-05", 210, false],
    ["CSE", "Two-day Hackathon", "2026-04-11", 230, true],
    ["Mechanical", "Workshop on CNC Programming", "2026-09-22", 15, false],
    ["Mechanical", "Industrial Visit to Auto Plant", "2026-03-04", 40, true],
    ["Civil", "Site Visit: Highway Construction", "2026-09-02", 60, false],
    ["Civil", "Surveying Camp", "2026-01-19", 120, false],
    ["Electrical", "Seminar on Solar Energy", "2026-08-06", 50, true],
    ["Electrical", "Expert Talk: Industrial Automation", "2026-02-09", 190, false],
    ["Architectural", "Model Making Exhibition", "2026-07-25", 340, true],
    ["Applied Science", "Science Day Exhibition", "2026-02-28", 170, false],
  ];
  return rows.map(([category, title, dateIso, hue, rich]) => ({
    _id: newId(), category, ...withDate({ dateIso }), title,
    description: `${title} was held at the college campus with enthusiastic participation from students and faculty.`,
    image: picture(title, hue), blocks: rich ? blocks.rich(title, hue) : blocks.simple(title, hue),
    createdAt: stamp(), updatedAt: stamp(),
  })).sort((a, b) => b.dateIso.localeCompare(a.dateIso)); // newest first, like the API
};

const seedFaculty = () => {
  // [name, department, designation, joined, qualifications, phone]
  const people = [
    ["Mrs. Shashi Bala", "CSE", "Head of Department", "2008-07-01", ["M.Tech", "B.Tech"], "9876500101"],
    ["Er. Rajesh Kumar", "CSE", "Lecturer", "2012-08-16", ["M.Tech", "B.Tech"], "9876500102"],
    ["Er. Neha Sharma", "CSE", "Lecturer", "2018-07-02", ["M.Tech"], "N/A"],
    ["Er. Amandeep Singh", "CSE", "Guest Faculty", "2024-01-08", ["B.Tech"], "9876500104"],
    ["Er. Vipin Kumar Gupta", "Civil", "Head of Department", "1995-06-12", ["M.E. Structures", "LL.B"], "9876500201"],
    ["Er. Harpreet Kaur", "Civil", "Lecturer", "2015-07-20", ["M.Tech", "B.Tech"], "9876500202"],
    ["Er. Sukhdev Singh", "Civil", "Lab Assistant", "2019-09-02", ["Diploma"], "9876500203"],
    ["Er. Punjab Rai", "Mechanical", "Head of Department", "2001-08-01", ["M.Tech"], "9876500301"],
    ["Er. Manpreet Singh", "Mechanical", "Lecturer", "2014-07-14", ["M.Tech", "B.Tech"], "9876500302"],
    ["Er. Gurpreet Kaur", "Mechanical", "Lecturer", "2021-08-09", ["B.Tech"], "9876500303"],
    ["Dr. Anurag Joshi", "Electrical", "Head of Department", "2003-07-07", ["Ph.D", "M.Tech"], "9876500401"],
    ["Er. Simran Kaur", "Electrical", "Lecturer", "2016-08-22", ["M.Tech"], "9876500402"],
    ["Er. Karan Verma", "Electrical", "Lab Assistant", "2022-01-17", ["Diploma"], "N/A"],
    ["Ar. Sangeeta Goyal", "Architectural", "Head of Department", "2006-07-03", ["M.Arch"], "9876500501"],
    ["Ar. Rohit Mehta", "Architectural", "Lecturer", "2017-07-24", ["B.Arch"], "9876500502"],
    ["Dr. Ritu Jindal", "Applied Science", "Head of Department", "2004-07-05", ["Ph.D", "M.Sc"], "9876500601"],
    ["Dr. Pooja Kaur", "Applied Science", "Lecturer", "2011-08-01", ["Ph.D", "M.Sc"], "9876500602"],
    ["Mr. Ajay Bansal", "Applied Science", "Lecturer", "2019-07-15", ["M.Sc", "B.Ed"], "9876500603"],
    ["Mr. Balwinder Singh", "Admin Staff", "Superintendent", "1999-04-01", ["M.A."], "9876500701"],
    ["Mrs. Rajni Bala", "Admin Staff", "PA to Principal", "2007-05-14", ["B.A."], "9876500702"],
    ["Mr. Deepak Arora", "Admin Staff", "Assistant", "2013-09-02", ["B.Com"], "9876500703"],
    ["Mrs. Kiran Devi", "Admin Staff", "Assistant", "2016-02-15", ["B.A."], "9876500704"],
    ["Mr. Lakhwinder Singh", "Admin Staff", "Clerk", "2020-11-02", ["12th"], "N/A"],
    ["Mrs. Meenu Rani", "Admin Staff", "Assistant Librarian", "2010-06-21", ["M.Lib"], "9876500706"],
  ];
  return people.map(([name, department, designation, joined, education, phone], index) => {
    const teaching = department !== "Admin Staff";
    const slug = name.toLowerCase().replace(/[^a-z]+/g, ".").replace(/^\.|\.$/g, "");
    return {
      _id: newId(), name, email: `${slug}@tpc.ac.in`, phone, department, designation,
      joinedDate: toDisplayDate(joined), education, image: portrait(name, (index * 47) % 360),
      publications: teaching && index % 3 === 0
        ? [
            { title: "Low-cost IoT based monitoring system", journal: "International Journal of Engineering", year: "2021", link: "https://example.com/paper-1" },
            { title: "A study of modern teaching methods", journal: "Journal of Technical Education", year: "2019", link: "" },
          ]
        : [],
      conferences: teaching && index % 2 === 0
        ? [{ title: "Smart classrooms for diploma students", conference: "National Conference on Technical Education", venue: "Chandigarh", year: "2022" }]
        : [],
      books: teaching && index % 5 === 0
        ? [{ title: "Basics of Engineering Practice", publisher: "Tech Publications", year: "2018", isbn: "978-81-0000-000-1" }]
        : [],
      joinedDateIso: joined, experience: yearsSince(joined), createdAt: stamp(), updatedAt: stamp(),
    };
  });
};

const seedGallery = () =>
  ["Main Gate", "Campus Lawn", "CSE Laboratory", "Workshop", "Library", "Annual Function", "Sports Ground", "Hostel"].map(
    (description, index) => ({ _id: newId(), description, imageUrl: picture(description, index * 43, 900, 600) }),
  );

const seedNotices = () =>
  [
    ["Admission Notice 2026-27: Diploma Courses", true],
    ["Date Sheet for Mid Semester Examination", true],
    ["Scholarship Application: Last Date Extended", false],
    ["Holiday Notice: Gurpurab", false],
    ["Fee Payment Schedule, Even Semester", false],
    ["Anti-ragging Undertaking for New Students", false],
  ].map(([title, highlight], index) => ({
    _id: newId(), title, file: `/uploads/documents/notices/notice-${index + 1}.pdf`, originalName: `notice-${index + 1}.pdf`,
    order: index, highlight, fileUrl: PDF, createdAt: stamp(), updatedAt: stamp(),
  }));

const DOCUMENT_SECTIONS = [
  { label: "College Magazine", value: "magazines" },
  { label: "List of Mentors", value: "mentors-list" },
  { label: "Forms Download", value: "forms-download" },
  { label: "Mandatory Disclosure", value: "mandatory-disclosure" },
  { label: "TPC Newsletter", value: "tpc-newsletter" },
  { label: "Safe Working", value: "safe-working" },
  { label: "Extension of Approval (EOA)", value: "eoa" },
];
const DOCUMENT_TITLES = {
  magazines: ["Annual Magazine 2025", "Annual Magazine 2024", "Annual Magazine 2023"],
  "mentors-list": ["Mentors List 2026-27", "Mentors List 2025-26"],
  "forms-download": ["Bonafide Certificate Form", "Scholarship Form", "No Dues Form", "Leaving Certificate Request"],
  "mandatory-disclosure": ["Mandatory Disclosure 2026", "Mandatory Disclosure 2025"],
  "tpc-newsletter": ["Newsletter, January 2026", "Newsletter, July 2025", "Newsletter, January 2025"],
  "safe-working": ["Safe Working Practices in Workshops", "Laboratory Safety Guidelines"],
  eoa: ["AICTE EOA 2026-27", "AICTE EOA 2025-26", "AICTE EOA 2024-25"],
};
const seedDocuments = () =>
  DOCUMENT_SECTIONS.flatMap(({ value: section }) =>
    DOCUMENT_TITLES[section].map((title, order) => ({
      _id: newId(), section, title, file: `/uploads/documents/${section}/${order + 1}.pdf`,
      originalName: `${section}-${order + 1}.pdf`, order, fileUrl: PDF, createdAt: stamp(), updatedAt: stamp(),
    })),
  );

const seedMembers = () =>
  [
    ["Shri Anil Kumar", "Chairman", "President of the Thapar Foundation"],
    ["Shri Rakesh Mittal", "Vice Chairman", "Industrialist and educationist"],
    ["Dr. Ankush Kansal", "Secretary", "Principal of the college"],
    ["Shri Sanjay Gupta", "Member", "Chartered accountant"],
    ["Smt. Veena Arora", "Member", "Former director, technical education"],
    ["Dr. Harish Chander", "Member", "Professor, engineering university"],
  ].map(([name, designation, info]) => ({ _id: newId(), name, designation, info }));

const seedPlacements = () => {
  const row = (department, intake, visited, placed, pkg) => ({
    _id: newId(), department, approvedIntake: intake, companiesVisited: visited, studentsPlaced: placed, avgPackage: pkg,
  });
  return [
    { _id: newId(), year: "2025", departments: [row("CSE", 120, 32, 104, "4.5"), row("Mechanical", 60, 21, 48, "3.6"), row("Civil", 60, 14, 39, "3.2"), row("Electrical", 60, 18, 45, "3.8"), row("Architectural", 30, 8, 22, "3.0")] },
    { _id: newId(), year: "2024", departments: [row("CSE", 120, 28, 98, "4.2"), row("Mechanical", 60, 19, 44, "3.4"), row("Civil", 60, 12, 36, "3.0"), row("Electrical", 60, 16, 41, "3.5")] },
    { _id: newId(), year: "2023", departments: [row("CSE", 120, 25, 90, "4.0"), row("Mechanical", 60, 17, 40, "3.3"), row("Electrical", 60, 15, 38, "3.4")] },
  ];
};

const seedSuccessStories = () =>
  [
    ["From Diploma to a Software Engineer at a Top Firm", "A CSE alumnus shares how the labs and mentors of the college shaped a career in software.", 180],
    ["Starting a Construction Business After Civil Diploma", "A Civil alumnus built a company that now works on public roads and buildings.", 40],
    ["Selected for a Central Government Job", "An Electrical alumna cleared the competitive exam and joined a power utility.", 270],
    ["Winning a National Design Competition", "A student of Architectural Assistantship won a national award for a sustainable house design.", 320],
  ].map(([title, description, hue], index) => ({
    _id: newId(), title, description, image: picture(title, hue), blocks: index % 2 === 0 ? blocks.rich(title, hue) : [],
  }));

const seedPrincipal = () => ({
  _id: newId(), name: "Dr. Ankush Kansal", image: portrait("Dr Ankush Kansal", 150),
  message:
    "Welcome to Thapar Polytechnic College, Patiala.\n\nSince 1956 the college has trained diploma engineers who now serve industry and government across the region. Our aim is to give every student strong basics, practical skills and good values.\n\nI invite you to explore the website and visit the campus.",
  highlights: [
    { title: "Academic Excellence", points: ["Experienced and qualified faculty", "Well equipped laboratories", "Regular industry interaction"] },
    { title: "Student Support", points: ["Mentoring for every student", "Scholarships and counselling", "Hostel and library facilities"] },
  ],
  createdAt: stamp(), updatedAt: stamp(),
});

const seedAicteCourses = () =>
  [
    ["Computer Science Engineering", 120], ["Mechanical Engineering", 60], ["Civil Engineering", 60],
    ["Electrical Engineering", 60], ["Architectural Assistantship", 30], ["Applied Science (Lateral entry)", 24],
  ].map(([department, approvedIntake]) => ({ _id: newId(), department, approvedIntake, createdAt: stamp(), updatedAt: stamp() }));

const seedPolicies = () => [
  { title: "Anti-Ragging Policy", pointsHeading: "Rules", points: ["Ragging in any form is strictly banned.", "Every student signs an undertaking at admission.", "Complaints are handled by the anti-ragging committee."], groups: [{ subheading: "Penalties", points: ["Suspension from classes", "Expulsion in serious cases", "Police complaint where needed"] }] },
  { title: "Scholarship Guidelines", pointsHeading: "", points: ["Scholarships follow state and central government schemes.", "Apply through the college office before the last date."], groups: [] },
  { title: "Attendance Policy", pointsHeading: "", points: ["A minimum of 75% attendance is needed to sit the examination.", "Medical leave needs a certificate."], groups: [] },
  { title: "Code of Conduct", pointsHeading: "For students", points: ["Wear the college identity card at all times.", "Respect teachers, staff and fellow students.", "Mobile phones are not allowed in class."], groups: [{ subheading: "Campus", points: ["Keep the campus clean", "Use the library quietly"] }] },
  { title: "Grievance Redressal", pointsHeading: "", points: ["Students may submit grievances to the grievance cell.", "Every complaint is answered within 15 days."], groups: [] },
].map((policy, order) => ({ _id: newId(), order, ...policy, createdAt: stamp(), updatedAt: stamp() }));

const seedContact = () => ({
  _id: newId(), name: "Thapar Polytechnic College", address: "Bhadson Road\nPatiala, Punjab - 147001",
  phones: ["75088-55997", "0175-2393003"], email: "info@tpc.ac.in", hours: "Monday to Saturday, 9:00 AM to 4:00 PM",
  createdAt: stamp(), updatedAt: stamp(),
});

const seedDepartmentPages = () => {
  const pages = {
    cse: [
      { title: "Laboratories", slug: "laboratories", type: "page", html: "<h2>Our laboratories</h2><p>The department has <strong>five</strong> well equipped labs.</p><ul><li>Programming lab</li><li>Networking lab</li><li>Hardware lab</li></ul><table><thead><tr><th>Lab</th><th>Systems</th></tr></thead><tbody><tr><td>Programming</td><td>40</td></tr><tr><td>Networking</td><td>30</td></tr></tbody></table>", fileUrl: null, url: "" },
      { title: "Syllabus", slug: "syllabus", type: "pdf", html: "", file: "/uploads/documents/departments/cse-syllabus.pdf", fileUrl: PDF, url: "" },
      { title: "PSBTE Chandigarh", slug: "psbte", type: "link", html: "", fileUrl: null, url: "https://www.pbtechedu.com" },
    ],
    mechanical: [
      { title: "Workshops", slug: "workshops", type: "page", html: "<h2>Workshops</h2><p>Fitting, welding, carpentry and a CNC trainer.</p>", fileUrl: null, url: "" },
      { title: "Syllabus", slug: "syllabus", type: "pdf", html: "", file: "/uploads/documents/departments/mech-syllabus.pdf", fileUrl: PDF, url: "" },
    ],
    civil: [
      { title: "Surveying Equipment", slug: "surveying-equipment", type: "page", html: "<h2>Surveying equipment</h2><p>Total stations, levels and theodolites for practicals.</p>", fileUrl: null, url: "" },
      { title: "Building Bye-laws", slug: "bye-laws", type: "link", html: "", fileUrl: null, url: "https://example.com/bye-laws" },
    ],
    electrical: [{ title: "Machines Lab", slug: "machines-lab", type: "page", html: "<h2>Machines lab</h2><p>DC and AC machines with test benches.</p>", fileUrl: null, url: "" }],
  };
  return Object.entries(pages).map(([key, list]) => ({ key, pages: list }));
};

// ============================== the database ===============================

// Fresh state each time the page loads.
const db = {
  achievements: seedAchievements(),
  events: seedEvents(),
  faculty: seedFaculty(),
  gallery: seedGallery(),
  notices: seedNotices(),
  documents: seedDocuments(),
  members: seedMembers(),
  placements: seedPlacements(),
  successstory: seedSuccessStories(),
  principal: seedPrincipal(),
  "aicte-courses": seedAicteCourses(),
  policies: seedPolicies(),
  contact: seedContact(),
  departments: seedDepartmentPages(),
};

// ============================== request helpers ============================

class MockHttpError extends Error {
  // `message` may be a list, like the backend's validation errors.
  constructor(status, message) {
    super(Array.isArray(message) ? message.join(", ") : message);
    this.status = status;
    this.body = message;
  }
}
const notFound = (what) => new MockHttpError(404, `${what} not found`);
const badRequest = (message) => new MockHttpError(400, message);

// Fields sent as JSON text inside multipart bodies.
const JSON_FIELDS = ["blocks", "publications", "conferences", "books", "groups", "highlights", "points", "phones", "pages"];
const BOOLEAN_FIELDS = ["highlight"];
const NUMBER_FIELDS = ["approvedIntake"];

// Turns the request body (JSON object or FormData) into a plain object.
// Uploaded files are returned separately as blob: URLs.
const readBody = (data) => {
  const body = {};
  const files = {};
  const source = typeof data === "string" ? JSON.parse(data || "{}") : data;
  if (typeof FormData !== "undefined" && source instanceof FormData) {
    source.forEach((value, rawKey) => {
      if (value instanceof File) {
        // Same limits as the backend (storage.constants.ts).
        const limit = rawKey === "file" ? 20 : 5;
        if (value.size > limit * 1024 * 1024) throw new MockHttpError(413, "File too large");
        files[rawKey] = { url: URL.createObjectURL(value), name: value.name };
      } else if (rawKey.endsWith("[]")) {
        const key = rawKey.slice(0, -2);
        (body[key] ||= []).push(value);
      } else {
        body[rawKey] = value;
      }
    });
  } else {
    Object.assign(body, source || {});
  }
  JSON_FIELDS.forEach((key) => {
    if (typeof body[key] === "string") {
      try {
        body[key] = JSON.parse(body[key] || "[]");
      } catch {
        throw badRequest(`${key} must be valid JSON`);
      }
    }
  });
  BOOLEAN_FIELDS.forEach((key) => {
    if (key in body) body[key] = body[key] === true || body[key] === "true";
  });
  NUMBER_FIELDS.forEach((key) => {
    if (key in body) body[key] = Number(body[key]);
  });
  return { body, files };
};

const requireFields = (body, fields) => {
  const missing = fields.filter((field) => body[field] === undefined || String(body[field]).trim() === "");
  if (missing.length) throw badRequest(missing.map((field) => `${field} should not be empty`));
};

// What each simple collection needs. `insert` says where new rows go: the
// backend lists newest first for most content, and by position for the rest.
const COLLECTIONS = {
  achievements: { required: ["title", "description", "date"], image: "image", insert: "start", dated: true },
  events: { required: ["title", "description", "date"], image: "image", insert: "start", dated: true, defaults: { category: "College" } },
  faculty: { required: ["name", "email", "department", "designation", "joinedDate"], image: "image", insert: "end", faculty: true },
  gallery: { required: ["description"], image: "imageUrl", imageField: "image", insert: "start" },
  successstory: { required: ["title", "description"], image: "image", insert: "start" },
  members: { required: ["name", "designation", "info"], insert: "end" },
  "aicte-courses": { required: ["department", "approvedIntake"], insert: "end" },
  policies: { required: ["title"], insert: "end", ordered: true },
};

const shape = (name, row) => {
  const spec = COLLECTIONS[name];
  let out = { ...row };
  if (spec.dated) {
    out.dateIso = toIsoDate(out.dateIso || out.date);
    out.date = out.dateIso ? toDisplayDate(out.dateIso) : out.date;
  }
  if (spec.faculty) {
    out.joinedDateIso = toIsoDate(out.joinedDate);
    out.joinedDate = out.joinedDateIso ? toDisplayDate(out.joinedDateIso) : out.joinedDate;
    out.experience = yearsSince(out.joinedDateIso);
    out.phone = out.phone || "N/A";
    out.education = out.education || [];
    ["publications", "conferences", "books"].forEach((key) => (out[key] ||= []));
  }
  return out;
};

const saveRow = (name, existing, data) => {
  const spec = COLLECTIONS[name];
  const { body, files } = readBody(data);
  if (!existing) requireFields(body, spec.required);
  const next = { ...(existing || { _id: newId(), createdAt: stamp(), ...spec.defaults }), ...body, updatedAt: stamp() };
  if (spec.image) {
    const upload = files[spec.imageField || spec.image];
    if (upload) next[spec.image] = upload.url;
    else if (!existing) throw badRequest("An image is required");
    else next[spec.image] = existing[spec.image];
  }
  delete next.__v;
  return shape(name, next);
};

// ================================ the router ===============================

const crud = (name, method, [id], data) => {
  const list = db[name];
  const spec = COLLECTIONS[name];
  const index = id ? list.findIndex((row) => row._id === id) : -1;
  if (id && index < 0 && method !== "post") throw notFound("Item");

  if (method === "get") return id ? shape(name, list[index]) : list.map((row) => shape(name, row));
  if (method === "post") {
    const row = saveRow(name, null, data);
    if (spec.ordered) row.order = list.length;
    if (spec.insert === "start") list.unshift(row);
    else list.push(row);
    return row;
  }
  if (method === "put" || method === "patch") {
    list[index] = saveRow(name, list[index], data);
    return list[index];
  }
  if (method === "delete") return list.splice(index, 1)[0];
  throw notFound("Route");
};

const sectionOf = (section) => {
  if (!DOCUMENT_SECTIONS.some((item) => item.value === section)) throw notFound("Section");
  return section;
};
const sectionDocs = (section) => db.documents.filter((doc) => doc.section === section).sort((a, b) => a.order - b.order);
const reorder = (list, ids) => {
  if (!Array.isArray(ids)) throw badRequest("ids must be a list");
  ids.forEach((id, order) => {
    const row = list.find((item) => item._id === id);
    if (row) row.order = order;
  });
  return { updated: ids.length };
};

const withFile = (row, files) => {
  const upload = files.file;
  return upload ? { ...row, file: upload.url, fileUrl: upload.url, originalName: upload.name } : row;
};

// Resolves one request to its JSON. Throws MockHttpError for failures.
const route = (method, segments, data, signedIn) => {
  const [head, ...rest] = segments;
  const isWrite = method !== "get";
  if (isWrite && head !== "auth" && !signedIn) throw new MockHttpError(401, "Unauthorized");

  if (head === undefined) return "Hello World!";
  if (head === "health") return { status: "ok" };

  if (head === "auth") {
    if (rest[0] === "login" && method === "post") {
      const { body } = readBody(data);
      if (body.email !== MOCK_LOGIN.email || body.password !== MOCK_LOGIN.password)
        throw new MockHttpError(401, "Invalid email or password");
      const encode = (value) => btoa(JSON.stringify(value)).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
      const token = [encode({ alg: "HS256", typ: "JWT" }), encode({ sub: "mock-admin", email: body.email, exp: Math.floor(Date.now() / 1000) + 8 * 3600 }), "mock"].join(".");
      return { accessToken: token, expiresIn: "8h", user: { name: "Admin", email: body.email } };
    }
    if (rest[0] === "me" && method === "get") {
      if (!signedIn) throw new MockHttpError(401, "Unauthorized");
      return { name: "Admin", email: MOCK_LOGIN.email };
    }
    throw notFound("Route");
  }

  if (head === "blocks" && rest[0] === "image" && method === "post") {
    const { files } = readBody(data);
    if (!files.image) throw badRequest("An image file is required");
    return { url: files.image.url };
  }

  if (COLLECTIONS[head]) return crud(head, method, rest, data);

  if (head === "principal" || head === "contact") {
    if (method === "get") return db[head];
    if (method === "put") {
      const { body, files } = readBody(data);
      db[head] = { ...db[head], ...body, updatedAt: stamp() };
      if (head === "principal" && files.image) db.principal.image = files.image.url;
      return db[head];
    }
    throw notFound("Route");
  }

  if (head === "departments") {
    if (rest[0] === "pdf" && method === "post") {
      const { files } = readBody(data);
      if (!files.file) throw badRequest("A PDF file is required");
      return { url: files.file.url, name: files.file.name };
    }
    if (method === "get") return db.departments;
    if (method === "put" && rest[0]) {
      const { body } = readBody(data);
      let department = db.departments.find((item) => item.key === rest[0]);
      if (!department) db.departments.push((department = { key: rest[0], pages: [] }));
      department.pages = (body.pages || []).map((page) => ({
        html: "", url: "", fileUrl: null, ...page, fileUrl: page.type === "pdf" ? page.fileUrl || page.file || null : null,
      }));
      return department;
    }
    throw notFound("Route");
  }

  if (head === "notices") {
    const list = db.notices;
    if (rest[0] === "reorder" && method === "put") return reorder(list, readBody(data).body.ids);
    const index = rest[0] ? list.findIndex((row) => row._id === rest[0]) : -1;
    if (rest[0] && index < 0) throw notFound("Notice");
    if (method === "get") return rest[0] ? list[index] : [...list].sort((a, b) => a.order - b.order);
    if (method === "delete") return list.splice(index, 1)[0];
    const { body, files } = readBody(data);
    if (method === "post") {
      requireFields(body, ["title"]);
      if (!files.file) throw badRequest("A PDF file is required");
      const row = withFile({ _id: newId(), title: body.title, highlight: Boolean(body.highlight), order: 0, createdAt: stamp(), updatedAt: stamp() }, files);
      list.forEach((item) => (item.order += 1));
      list.unshift(row);
      return row;
    }
    if (method === "put") {
      list[index] = withFile({ ...list[index], ...body, updatedAt: stamp() }, files);
      return list[index];
    }
    throw notFound("Route");
  }

  if (head === "documents") {
    if (rest[0] === "sections" && method === "get") return DOCUMENT_SECTIONS;
    const section = sectionOf(rest[0]);
    const [, id] = rest;
    if (id === "reorder" && method === "put") return reorder(sectionDocs(section), readBody(data).body.ids);
    const row = id ? db.documents.find((doc) => doc._id === id && doc.section === section) : null;
    if (id && !row && method !== "post") throw notFound("Document");
    if (method === "get") return id ? row : sectionDocs(section);
    if (method === "delete") return db.documents.splice(db.documents.indexOf(row), 1)[0];
    const { body, files } = readBody(data);
    if (method === "post") {
      requireFields(body, ["title"]);
      if (!files.file) throw badRequest("A PDF file is required");
      const created = withFile({ _id: newId(), section, title: body.title, order: sectionDocs(section).length, createdAt: stamp(), updatedAt: stamp() }, files);
      db.documents.push(created);
      return created;
    }
    if (method === "put") {
      Object.assign(row, withFile({ ...row, title: body.title ?? row.title, updatedAt: stamp() }, files));
      return row;
    }
    throw notFound("Route");
  }

  if (head === "placements") {
    const [id, sub, departmentId] = rest;
    const year = id ? db.placements.find((row) => row._id === id) : null;
    if (id && !year) throw notFound("Placement");
    const sorted = () => [...db.placements].sort((a, b) => Number(b.year) - Number(a.year));
    const makeRow = (input) => {
      const row = { _id: newId(), ...input };
      ["approvedIntake", "companiesVisited", "studentsPlaced"].forEach((key) => (row[key] = Number(row[key])));
      row.avgPackage = String(row.avgPackage);
      return row;
    };
    if (method === "get") return id ? year : sorted();
    if (method === "post" && !id) {
      const { body } = readBody(data);
      requireFields(body, ["year"]);
      const rows = (body.departments || []).map(makeRow);
      const existing = db.placements.find((row) => row.year === String(body.year));
      if (existing) {
        existing.departments.push(...rows);
        return existing;
      }
      const created = { _id: newId(), year: String(body.year), departments: rows };
      db.placements.push(created);
      return created;
    }
    if (method === "put" && id && !sub) {
      Object.assign(year, readBody(data).body);
      return year;
    }
    if (method === "delete" && id && !sub) return db.placements.splice(db.placements.indexOf(year), 1)[0];
    if (sub === "departments") {
      const index = year.departments.findIndex((row) => row._id === departmentId);
      if (method === "post") {
        const row = makeRow(readBody(data).body);
        year.departments.push(row);
        return year;
      }
      if (index < 0) throw notFound("Department row");
      if (method === "put") {
        year.departments[index] = makeRow({ ...year.departments[index], ...readBody(data).body, _id: departmentId });
        return year;
      }
      if (method === "delete") {
        year.departments.splice(index, 1);
        return year;
      }
    }
    throw notFound("Route");
  }

  throw notFound("Route");
};

// ============================ the axios adapter ============================

const LATENCY_MS = 150;

// Plug into axios: `http.defaults.adapter = mockAdapter`.
export const mockAdapter = async (config) => {
  const method = (config.method || "get").toLowerCase();
  const base = config.baseURL || "";
  let path = (config.url || "").replace(base, "");
  path = path.split("?")[0].replace(/^https?:\/\/[^/]+/, "");
  const segments = path.split("/").filter(Boolean);

  const header = config.headers?.get ? config.headers.get("Authorization") : config.headers?.Authorization;
  const signedIn = typeof header === "string" && header.startsWith("Bearer ");

  await new Promise((resolve) => setTimeout(resolve, LATENCY_MS));

  try {
    const result = route(method, segments, config.data, signedIn);
    // Hand out copies, like a real network response: callers can't change the "database".
    const data = JSON.parse(JSON.stringify(result ?? null));
    return { data, status: method === "post" ? 201 : 200, statusText: "OK", headers: {}, config, request: {} };
  } catch (error) {
    if (!(error instanceof MockHttpError)) throw error;
    const response = {
      data: { statusCode: error.status, message: error.body },
      status: error.status, statusText: "Error", headers: {}, config, request: {},
    };
    const rejection = new Error(`Request failed with status code ${error.status}`);
    Object.assign(rejection, { isAxiosError: true, config, response });
    throw rejection;
  }
};
