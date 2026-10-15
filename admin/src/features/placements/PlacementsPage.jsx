import { useMemo, useState } from "react";
import { Column } from "primereact/column";
import { usePlacements } from "../../context";
import { useDialogs } from "../../hooks/useDialogs";
import { useConfirmDelete } from "../../hooks/useConfirmDelete";
import { matchesSearch } from "../../utils/search";
import PageContainer from "../../components/ui/PageContainer";
import PageHeader from "../../components/ui/PageHeader";
import FilterBar from "../../components/ui/FilterBar";
import DataCard from "../../components/ui/DataCard";
import RowActions from "../../components/ui/RowActions";
import PlacementFormModal from "./PlacementFormModal";

const PlacementsPage = () => {
  const { rows, years, loading, error, refresh, removeRow } = usePlacements();
  const dialogs = useDialogs();
  const confirmDelete = useConfirmDelete();
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");

  const filteredRows = useMemo(
    () =>
      rows.filter(
        (row) =>
          matchesSearch(row, ["department"], search) &&
          (year === "" || row.year === year)
      ),
    [rows, search, year]
  );

  const handleDelete = (row) =>
    confirmDelete({
      message: `Are you sure you want to delete "${row.department}" from ${row.year} ?`,
      onConfirm: () => removeRow(row),
      successMessage: "Placement deleted.",
    });

  return (
    <PageContainer>
      <PageHeader
        title="Placements Tracker"
        subtitle="Monitor and manage student placements"
        actionLabel="Add Placement"
        onAction={dialogs.openAdd}
      />
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search by Department..."
        filter={{
          value: year,
          onChange: setYear,
          allLabel: "All Years",
          options: years.map((value) => ({ label: value, value })),
        }}
      />
      <DataCard
        value={filteredRows}
        loading={loading}
        error={error}
        onRetry={refresh}
        emptyMessage="No Placements Found.">
        <Column field="year" header="YEAR" sortable />
        <Column field="department" header="DEPARTMENT" sortable />
        <Column field="approvedIntake" header="APPROVED INTAKE" sortable />
        <Column field="companiesVisited" header="COMPANIES VISITED" sortable />
        <Column field="studentsPlaced" header="STUDENTS PLACED" sortable />
        <Column
          field="avgPackage"
          header="AVG PACKAGE"
          body={(row) => `₹ ${row.avgPackage} LPA`}
        />
        <Column
          header="ACTIONS"
          frozen
          alignFrozen="right"
          body={(row) => (
            <RowActions
              onEdit={() => dialogs.openEdit(row)}
              onDelete={() => handleDelete(row)}
            />
          )}
        />
      </DataCard>

      <PlacementFormModal
        isOpen={dialogs.formOpen}
        onClose={dialogs.close}
        row={dialogs.formItem}
      />
    </PageContainer>
  );
};

export default PlacementsPage;
