import { useMemo, useState } from "react";
import { Column } from "primereact/column";
import { useFaculty } from "../../context";
import { useDialogs } from "../../hooks/useDialogs";
import { useConfirmDelete } from "../../hooks/useConfirmDelete";
import { FACULTY_DEPARTMENT_OPTIONS } from "../../constants/options";
import { formatYears } from "../../utils/format";
import { matchesSearch } from "../../utils/search";
import PageContainer from "../../components/ui/PageContainer";
import PageHeader from "../../components/ui/PageHeader";
import FilterBar from "../../components/ui/FilterBar";
import DataCard from "../../components/ui/DataCard";
import RowActions from "../../components/ui/RowActions";
import ViewDialog from "../../components/forms/ViewDialog";
import FacultyFormModal from "./FacultyFormModal";

const SEARCH_FIELDS = ["name", "department", "email"];

const FacultyPage = () => {
  const { items, loading, error, refresh, remove } = useFaculty();
  const dialogs = useDialogs();
  const confirmDelete = useConfirmDelete();
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");

  const faculty = useMemo(
    () =>
      items.filter(
        (member) =>
          matchesSearch(member, SEARCH_FIELDS, search) &&
          (department === "" || member.department === department)
      ),
    [items, search, department]
  );

  const handleDelete = (member) =>
    confirmDelete({
      message: `Are you sure you want to delete "${member.name}" ?`,
      onConfirm: () => remove(member._id),
      successMessage: "Faculty deleted.",
    });

  const viewItem = dialogs.viewItem;

  return (
    <PageContainer id="faculty-management">
      <PageHeader
        title="Faculty Management"
        subtitle="Manage and organize faculty members"
        actionLabel="Add New Faculty"
        onAction={dialogs.openAdd}
      />
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search Faculty..."
        filter={{
          value: department,
          onChange: setDepartment,
          allLabel: "All Departments",
          options: FACULTY_DEPARTMENT_OPTIONS,
        }}
      />
      <DataCard
        value={faculty}
        loading={loading}
        error={error}
        onRetry={refresh}
        emptyMessage="No Faculty Found.">
        <Column
          field="image"
          header="IMAGE"
          body={(row) => (
            <img
              src={row.image || "/default_user_img.jpeg"}
              alt={row.name}
              className="w-12 h-12 object-cover rounded-full border border-neutral-300"
            />
          )}
        />
        <Column field="name" header="NAME" sortable />
        <Column
          header="CONTACT DETAILS"
          body={(row) => (
            <div className="flex flex-col">
              <span className="text-gray-900">{row.email}</span>
              <span className="text-gray-600">{row.phone}</span>
            </div>
          )}
        />
        <Column
          field="department"
          header="DEPARTMENT"
          body={(row) => (
            <div
              className={`px-3 py-1 rounded-full w-fit ${
                row.department === "Admin Staff"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}>
              {row.department}
            </div>
          )}
        />
        <Column field="designation" header="DESIGNATION" />
        <Column
          field="experience"
          header="EXPERIENCE"
          body={(row) => (
            <span className="text-blue-600 bg-blue-100 px-3 py-2 rounded-full">
              {formatYears(row.experience)}
            </span>
          )}
          sortable
        />
        <Column field="joinedDate" header="JOINED DATE" />
        <Column
          field="education"
          header="EDUCATION"
          body={(row) => (row.education || []).join(", ")}
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

      <FacultyFormModal
        isOpen={dialogs.formOpen}
        onClose={dialogs.close}
        faculty={dialogs.formItem}
      />
      <ViewDialog
        header="View Faculty Details"
        visible={dialogs.viewOpen}
        onHide={dialogs.close}
        fields={[
          { label: "Name", value: viewItem?.name },
          { label: "Email", value: viewItem?.email },
          { label: "Phone", value: viewItem?.phone },
          { label: "Department", value: viewItem?.department },
          { label: "Designation", value: viewItem?.designation },
          {
            label: "Experience (auto-calculated from joined date)",
            value: formatYears(viewItem?.experience, ""),
          },
          { label: "Joined Date", value: viewItem?.joinedDate },
          { label: "Education", value: (viewItem?.education || []).join(", ") },
          ...(viewItem?.image
            ? [{ label: "Image", value: viewItem.image, type: "image" }]
            : []),
        ]}
      />
    </PageContainer>
  );
};

export default FacultyPage;
