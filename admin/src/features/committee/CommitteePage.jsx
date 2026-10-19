import { Column } from "primereact/column";
import { useCommittee } from "../../context";
import { useListPage } from "../../hooks/useListPage";
import { DESIGNATION_OPTIONS } from "../../constants/options";
import PageContainer from "../../components/ui/PageContainer";
import PageHeader from "../../components/ui/PageHeader";
import FilterBar from "../../components/ui/FilterBar";
import DataCard from "../../components/ui/DataCard";
import RowActions from "../../components/ui/RowActions";
import TruncateText from "../../components/ui/TruncateText";
import ViewDialog from "../../components/forms/ViewDialog";
import CommitteeFormModal from "./CommitteeFormModal";

const DESIGNATION_COLORS = {
  Chairman: "text-red-800 bg-red-100",
  "Vice Chairman": "text-purple-800 bg-purple-100",
  Secretary: "text-green-800 bg-green-100",
  Member: "text-blue-800 bg-blue-100",
};

const SEARCH_FIELDS = ["name", "designation"];

const CommitteePage = () => {
  const { items, loading, error, refresh, remove } = useCommittee();
  const {
    dialogs, search, setSearch, filterValue, setFilterValue, rows: members, handleDelete,
  } = useListPage({
    items,
    remove,
    searchFields: SEARCH_FIELDS,
    filterField: "designation",
    itemLabel: (member) => member.name,
    deletedMessage: "Member deleted.",
  });

  const viewItem = dialogs.viewItem;

  return (
    <PageContainer>
      <PageHeader
        title="College Management Committee"
        subtitle="Manage and organize committee members"
        actionLabel="Add New Member"
        onAction={dialogs.openAdd}
      />
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search Committee Members..."
        filter={{
          value: filterValue,
          onChange: setFilterValue,
          allLabel: "All Designation",
          options: DESIGNATION_OPTIONS,
        }}
      />
      <DataCard
        value={members}
        loading={loading}
        error={error}
        onRetry={refresh}
        emptyMessage="No Committee Members Found.">
        <Column field="name" header="NAME" sortable />
        <Column
          field="info"
          header="BASIC INFORMATION"
          body={(row) => <TruncateText text={row.info} maxLength={30} />}
        />
        <Column
          field="designation"
          header="DESIGNATION"
          body={(row) => (
            <div
              className={`px-3 py-1 rounded-full w-fit whitespace-nowrap ${
                DESIGNATION_COLORS[row.designation] || "text-gray-800 bg-gray-100"
              }`}>
              {row.designation}
            </div>
          )}
        />
        <Column
          header="ACTIONS"
          frozen
          alignFrozen="right"
          body={(row) => (
            <RowActions
              onView={() => dialogs.openView(row)}
              onEdit={() => dialogs.openEdit(row)}
              onDelete={() => handleDelete(row)}
            />
          )}
        />
      </DataCard>

      <CommitteeFormModal
        isOpen={dialogs.formOpen}
        onClose={dialogs.close}
        member={dialogs.formItem}
      />
      <ViewDialog
        header="View Member"
        visible={dialogs.viewOpen}
        onHide={dialogs.close}
        fields={[
          { label: "Name", value: viewItem?.name },
          { label: "Basic Information", value: viewItem?.info, type: "textarea" },
          { label: "Designation", value: viewItem?.designation },
        ]}
      />
    </PageContainer>
  );
};

export default CommitteePage;
