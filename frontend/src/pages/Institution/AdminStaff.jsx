import { useMemo } from "react";
import PageLayout from "../../components/PageLayout";
import DataBoundary from "../../components/DataBoundary";
import FilterBar from "../../components/FilterBar";
import NoDataFound from "../../components/NoDataFound";
import FacultyCard from "../../components/FacultyCard";
import { useFaculty } from "../../hooks/useResources";
import { useUrlFilters } from "../../hooks/useUrlFilters";
import { optionsFrom, validOption } from "../../utils/filterOptions";

// Older records may still say "Sr. Assistant", "Jr. Asstt." and so on: they
// all count as "Assistant".
const normalizeDesignation = (designation) =>
  (designation || "")
    .trim()
    .toLowerCase()
    .replace(/^(sr|jr)\.?\s+/, "")
    .replace(/^asstt\.?$/, "assistant");

// "pa to principal" -> "Pa To Principal" would be wrong, so keep known short words as they are.
const toTitle = (value) =>
  value.replace(/\b([a-z])([a-z]*)/g, (word, first, rest) =>
    ["to", "of", "and"].includes(word) ? word : first.toUpperCase() + rest
  );

const AdminStaff = () => {
  const { data: allStaff, loading, error, refresh } = useFaculty();
  const facultyList = useMemo(
    () => allStaff.filter((member) => member.department === "Admin Staff"),
    [allStaff]
  );
  const [filters, setFilter] = useUrlFilters(["q", "designation"]);
  const searchQuery = filters.q;
  // Designations come from the staff the API returned, merged the same way as the filter below.
  const designations = useMemo(
    () =>
      optionsFrom(facultyList, (member) => normalizeDesignation(member.designation), toTitle),
    [facultyList]
  );
  const selectedDesignation = validOption(filters.designation, designations);

  const filteredFaculty = facultyList.filter((faculty) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      (faculty.name || "").toLowerCase().includes(query) ||
      (faculty.email || "").toLowerCase().includes(query) ||
      (faculty.designation || "").toLowerCase().includes(query);
    const matchesDesignation =
      !selectedDesignation ||
      normalizeDesignation(faculty.designation) === selectedDesignation;
    return matchesSearch && matchesDesignation;
  });

  return (
    <PageLayout title="Admin Staff" path="/admin-staff" heading={["Admin", "Staff"]}>
      <DataBoundary loading={loading} error={error} onRetry={refresh} title="Admin Staff">
        <FilterBar
          search={searchQuery}
          onSearch={(value) => setFilter("q", value)}
          placeholder="Search faculty..."
          filter={{
            value: selectedDesignation,
            onChange: (value) => setFilter("designation", value),
            allLabel: "All Designations",
            options: designations,
          }}
        />
        {filteredFaculty.length === 0 ? (
          <NoDataFound title="Admin Staff" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-6">
            {filteredFaculty.map((faculty) => (
              <FacultyCard key={faculty._id} member={faculty} showPhone />
            ))}
          </div>
        )}
      </DataBoundary>
    </PageLayout>
  );
};

export default AdminStaff;
