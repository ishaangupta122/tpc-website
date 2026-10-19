import { useMemo } from "react";
import PageLayout from "../../components/PageLayout";
import DataBoundary from "../../components/DataBoundary";
import DataTable from "../../components/DataTable";
import FilterBar from "../../components/FilterBar";
import NoDataFound from "../../components/NoDataFound";
import { useMembers } from "../../hooks/useResources";
import { useUrlFilters } from "../../hooks/useUrlFilters";
import { optionsFrom, validOption } from "../../utils/filterOptions";

const getDesignationColor = (designation) => {
  const colors = {
    Chairman: "bg-red-100 text-red-800",
    "Vice Chairman": "bg-purple-100 text-purple-800",
    Secretary: "bg-green-100 text-green-800",
    Member: "bg-blue-100 text-blue-800",
  };
  return colors[designation] || "bg-gray-100 text-gray-800";
};

const COLUMNS = [
  { header: "S. No", render: (_, index) => index + 1, className: "text-gray-500" },
  { header: "Name", key: "name", className: "font-medium text-gray-900" },
  {
    header: "Basic Information",
    // Long text may wrap, but never gets squeezed narrower than this.
    render: (member) => <div className="min-w-[16rem] whitespace-normal">{member.info}</div>,
    className: "text-gray-500",
  },
  {
    header: "Designation",
    render: (member) => (
      <span
        className={`inline-block whitespace-nowrap px-3 py-1 text-sm font-medium rounded-full ${getDesignationColor(
          member.designation
        )}`}>
        {member.designation}
      </span>
    ),
  },
];

const ManagingCommittee = () => {
  const { data: committeeMembers, loading, error, refresh } = useMembers();
  const [filters, setFilter] = useUrlFilters(["q", "designation"]);
  const categories = useMemo(
    () => optionsFrom(committeeMembers, (member) => member.designation),
    [committeeMembers]
  );
  const selectedCategory = validOption(filters.designation, categories);

  const members = committeeMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(filters.q.toLowerCase()) &&
      (!selectedCategory || member.designation === selectedCategory)
  );

  return (
    <PageLayout
      title="Management Committee"
      crumb="Managing Committee"
      path="/managing-committee"
      heading={["Management", "Committee"]}>
      <DataBoundary loading={loading} error={error} onRetry={refresh} title="Management Committee List">
        <FilterBar
          search={filters.q}
          onSearch={(value) => setFilter("q", value)}
          placeholder="Search by name..."
          filter={{
            value: selectedCategory,
            onChange: (value) => setFilter("designation", value),
            allLabel: "All Categories",
            options: categories,
          }}
        />
        {members.length === 0 ? (
          <NoDataFound title="Committee Members" />
        ) : (
          <DataTable columns={COLUMNS} rows={members} rowKey={(member, index) => member._id ?? index} />
        )}
      </DataBoundary>
    </PageLayout>
  );
};

export default ManagingCommittee;
