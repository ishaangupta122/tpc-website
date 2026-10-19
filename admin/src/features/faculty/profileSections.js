// Profile table sections (publications, conferences, books): the first
// column of each is the required title.
export const PROFILE_SECTIONS = [
  {
    name: "publications",
    title: "List of Publications",
    columns: [
      { key: "title", label: "Title", placeholder: "e.g. Energy-efficient design of low-rise buildings", wide: true },
      { key: "journal", label: "Journal / Publisher", placeholder: "e.g. Journal of Sustainable Architecture" },
      { key: "year", label: "Year", placeholder: "e.g. 2024" },
      { key: "link", label: "Link (optional)", placeholder: "e.g. https://example.com/paper", wide: true },
    ],
  },
  {
    name: "conferences",
    title: "Conferences by Faculty",
    columns: [
      { key: "title", label: "Title", placeholder: "e.g. Green campus planning", wide: true },
      { key: "conference", label: "Conference", placeholder: "e.g. National Conference on Sustainable Design", wide: true },
      { key: "venue", label: "Venue", placeholder: "e.g. New Delhi, India" },
      { key: "year", label: "Year", placeholder: "e.g. 2024" },
    ],
  },
  {
    name: "books",
    title: "Books by Faculty",
    columns: [
      { key: "title", label: "Title", placeholder: "e.g. Fundamentals of Building Construction", wide: true },
      { key: "publisher", label: "Publisher", placeholder: "e.g. Academic Press" },
      { key: "year", label: "Year", placeholder: "e.g. 2024" },
      { key: "isbn", label: "ISBN (optional)", placeholder: "e.g. 978-81-00000-00-0", wide: true },
    ],
  },
];

// Problems in the rows of one table: { [rowIndex]: message }. Every entry
// needs a title; a year must be 4 digits; a link must be a web address.
export const validateProfileRows = (rows) => {
  const errors = {};
  rows.forEach((row, index) => {
    const year = (row.year || "").trim();
    const link = (row.link || "").trim();
    if (!(row.title || "").trim()) errors[index] = "Enter the title, or remove this entry.";
    else if (year && !/^\d{4}$/.test(year)) errors[index] = "Enter the year as 4 digits, like 2024.";
    else if (link && !/^https?:\/\//i.test(link))
      errors[index] = "The link must start with http:// or https://";
  });
  return errors;
};
