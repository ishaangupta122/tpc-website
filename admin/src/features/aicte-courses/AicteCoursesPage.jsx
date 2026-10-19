import { Column } from "primereact/column";
import { useAicteCourses } from "../../context";
import { useListPage } from "../../hooks/useListPage";
import PageContainer from "../../components/ui/PageContainer";
import PageHeader from "../../components/ui/PageHeader";
import FilterBar from "../../components/ui/FilterBar";
import DataCard from "../../components/ui/DataCard";
import RowActions from "../../components/ui/RowActions";
import ViewDialog from "../../components/forms/ViewDialog";
import AicteCourseFormModal from "./AicteCourseFormModal";

const SEARCH_FIELDS = ["department"];

const AicteCoursesPage = () => {
  const { items, loading, error, refresh, remove } = useAicteCourses();
  const { dialogs, search, setSearch, rows: courses, handleDelete } = useListPage({
    items,
    remove,
    searchFields: SEARCH_FIELDS,
    itemLabel: (course) => course.department,
    deletedMessage: "Course deleted.",
  });

  const viewItem = dialogs.viewItem;

  return (
    <PageContainer>
      <PageHeader
        title="AICTE Approved Courses"
        subtitle="Manage AICTE approved courses and intake"
        actionLabel="Add New Course"
        onAction={dialogs.openAdd}
      />
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search Courses..."
      />
      <DataCard
        value={courses}
        loading={loading}
        error={error}
        onRetry={refresh}
        emptyMessage="No Courses Found. The website shows its built-in list until you add one.">
        <Column field="department" header="DEPARTMENT" sortable />
        <Column field="approvedIntake" header="APPROVED INTAKE" sortable />
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

      <AicteCourseFormModal
        isOpen={dialogs.formOpen}
        onClose={dialogs.close}
        course={dialogs.formItem}
      />
      <ViewDialog
        header="View Course"
        visible={dialogs.viewOpen}
        onHide={dialogs.close}
        fields={[
          { label: "Department", value: viewItem?.department },
          { label: "Approved Intake", value: String(viewItem?.approvedIntake ?? "") },
        ]}
      />
    </PageContainer>
  );
};

export default AicteCoursesPage;
