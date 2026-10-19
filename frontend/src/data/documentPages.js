// The PDF list pages (magazines, forms, mentors, ...), all drawn by
// pages/OtherPages/DocumentPage.jsx. `section` is the backend document section
// the PDFs are uploaded to.
export const DOCUMENT_PAGES = [
  { path: "/magazines", section: "magazines", title: "College Magazines", crumb: "Magazines", heading: ["TPC", "Magazines"], listTitle: "Magazines" },
  { path: "/forms-download", section: "forms-download", title: "Forms Download", heading: ["Forms", "Download"], listTitle: "Forms" },
  { path: "/mentors-list", section: "mentors-list", title: "Mentors List", heading: ["Mentors", "List"], listTitle: "Mentors Lists" },
  { path: "/tpc-newsletter", section: "tpc-newsletter", title: "TPC Newsletter", heading: ["TPC", "Newsletter"], listTitle: "Newsletters" },
  { path: "/eoa", section: "eoa", title: "Extension of Approval", crumb: "EOA", heading: ["Extension of", "Approval"], listTitle: "Extension of Approval Documents" },
  {
    path: "/safe-working-environment",
    section: "safe-working",
    title: "Safe Working Environment",
    heading: ["Maintenance of Safe Working Environment", "for Female Employees at TPC"],
    listTitle: "Documents",
  },
  {
    path: "/mandatory-disclosure",
    section: "mandatory-disclosure",
    title: "Mandatory Disclosure",
    heading: ["Mandatory", "Disclosure"],
    listTitle: "Documents",
    link: { to: "/eoa", label: "EOA for the last 10 years" },
  },
];
