import { newKey } from "../../utils/blocks";

// A policy card is a list of sections, each with an optional heading and
// bullet points. It is stored as the first section (`pointsHeading` + `points`)
// plus the rest (`groups`); these helpers convert between the two shapes.

const toLines = (points) => (points || []).join("\n");
const toPoints = (text) =>
  text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

// Sections for the form (points as text, one per line). Always at least one.
export const toFormSections = (policy) => {
  const sections = [
    {
      _key: newKey(),
      heading: policy?.pointsHeading || "",
      points: toLines(policy?.points),
    },
    ...(policy?.groups || []).map((group) => ({
      _key: newKey(),
      heading: group.subheading || "",
      points: toLines(group.points),
    })),
  ];
  return sections;
};

// Request body fields for the backend.
export const fromFormSections = (sections) => {
  const [first, ...rest] = sections;
  return {
    pointsHeading: first?.heading.trim() || "",
    points: toPoints(first?.points || ""),
    groups: rest
      .map((section) => ({
        subheading: section.heading.trim(),
        points: toPoints(section.points),
      }))
      .filter((group) => group.subheading || group.points.length),
  };
};

// Sections for read-only display; empty ones are left out.
export const toViewSections = (policy) => {
  if (!policy) return [];
  const all = [
    { heading: policy.pointsHeading, points: policy.points || [] },
    ...(policy.groups || []).map((group) => ({
      heading: group.subheading,
      points: group.points || [],
    })),
  ];
  return all.filter((section) => section.heading || section.points.length);
};
