import { useMemo } from "react";
import PageLayout from "../../components/PageLayout";
import DataBoundary from "../../components/DataBoundary";
import FilterBar from "../../components/FilterBar";
import NoDataFound from "../../components/NoDataFound";
import FacultyCard from "../../components/FacultyCard";
import { useFaculty } from "../../hooks/useResources";
import { useUrlFilters } from "../../hooks/useUrlFilters";
import { departmentLabel, optionsFrom, validOption } from "../../utils/filterOptions";

const Faculty = () => {
  const { data: facultyList, loading, error, refresh } = useFaculty();
  const [filters, setFilter] = useUrlFilters(["q", "department"]);
  const searchQuery = filters.q;

  // Departments come from the faculty the API returned (not Admin Staff, who have their own page).
  const departments = useMemo(
    () =>
      optionsFrom(
        facultyList.filter((member) => member.department !== "Admin Staff"),
        (member) => member.department,
        departmentLabel
      ),
    [facultyList]
  );
  const selectedDepartment = validOption(filters.department, departments);

  const filteredFaculty = facultyList.filter((faculty) => {
    const matchesSearch =
      faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      !selectedDepartment || faculty.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <PageLayout title="Faculty" path="/faculty" heading={["College", "Faculty"]}>
      <DataBoundary loading={loading} error={error} onRetry={refresh} title="Faculty List">
        <FilterBar
          search={searchQuery}
          onSearch={(value) => setFilter("q", value)}
          placeholder="Search faculty..."
          filter={{
            value: selectedDepartment,
            onChange: (value) => setFilter("department", value),
            allLabel: "All Departments",
            options: departments,
          }}
        />
        {filteredFaculty.length === 0 ? (
          <NoDataFound title="Faculty" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-6">
            {filteredFaculty.map((faculty) => (
              <FacultyCard key={faculty._id} member={faculty} />
            ))}
          </div>
        )}
      </DataBoundary>
    </PageLayout>
  );
};

export default Faculty;
