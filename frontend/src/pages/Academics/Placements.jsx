import { useMemo } from "react";
import PageLayout from "../../components/PageLayout";
import DataBoundary from "../../components/DataBoundary";
import DataTable from "../../components/DataTable";
import FilterBar from "../../components/FilterBar";
import NoDataFound from "../../components/NoDataFound";
import { usePlacements } from "../../hooks/useResources";
import { useUrlFilters } from "../../hooks/useUrlFilters";
import { optionsFrom, validOption } from "../../utils/filterOptions";

const COLUMNS = [
  { header: "Department", key: "department", className: "font-medium text-gray-900" },
  { header: "Approved Intake", key: "approvedIntake" },
  { header: "No. Companies Visited", key: "companiesVisited" },
  { header: "Students Placed", key: "studentsPlaced" },
  { header: "Average Package", render: (dept) => `₹ ${dept.avgPackage} LPA` },
];

const PlacementsTracker = () => {
  const { data: placements, loading, error, refresh } = usePlacements();
  const [filters, setFilter] = useUrlFilters(["q", "year"]);
  // Years come from the data, newest first.
  const years = useMemo(
    () => optionsFrom(placements, (placement) => String(placement.year)).sort((a, b) => b.value - a.value),
    [placements]
  );
  const selectedYear = validOption(filters.year, years);

  // Each year keeps only the departments that match the search.
  const query = filters.q.toLowerCase();
  const visibleYears = placements
    .filter((placement) => !selectedYear || String(placement.year) === selectedYear)
    .map((placement) => ({
      ...placement,
      departments: (placement.departments || []).filter((dept) =>
        dept.department.toLowerCase().includes(query)
      ),
    }))
    .filter((placement) => placement.departments.length > 0);

  return (
    <PageLayout title="College Placements" crumb="Placements" path="/placements" heading={["College", "Placements"]}>
      <DataBoundary loading={loading} error={error} onRetry={refresh} title="Placements Data">
        <FilterBar
          search={filters.q}
          onSearch={(value) => setFilter("q", value)}
          placeholder="Search department..."
          filter={{
            value: selectedYear,
            onChange: (value) => setFilter("year", value),
            allLabel: "All Years",
            options: years,
          }}
        />
        {visibleYears.length === 0 ? (
          <NoDataFound title="Placements" />
        ) : (
          visibleYears.map((placement) => (
            <div key={placement.year} className="mb-8">
              <h3 className="card-title mb-4">{placement.year} Placements</h3>
              <DataTable columns={COLUMNS} rows={placement.departments} rowKey={(dept) => dept.department} />
            </div>
          ))
        )}
      </DataBoundary>
    </PageLayout>
  );
};

export default PlacementsTracker;
