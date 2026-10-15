import { useMemo, useState } from "react";
import { Column } from "primereact/column";
import { FileText } from "lucide-react";
import { useNotices } from "../../context";
import { useNotify } from "../../context/NotificationContext";
import { useDialogs } from "../../hooks/useDialogs";
import { useConfirmDelete } from "../../hooks/useConfirmDelete";
import { matchesSearch } from "../../utils/search";
import PageContainer from "../../components/ui/PageContainer";
import PageHeader from "../../components/ui/PageHeader";
import FilterBar from "../../components/ui/FilterBar";
import DataCard from "../../components/ui/DataCard";
import RowActions from "../../components/ui/RowActions";
import TruncateText from "../../components/ui/TruncateText";
import PdfFormModal from "../../components/forms/PdfFormModal";

const NoticesPage = () => {
  const { items, loading, error, refresh, create, update, remove } = useNotices();
  const dialogs = useDialogs();
  const confirmDelete = useConfirmDelete();
  const notify = useNotify();
  const [search, setSearch] = useState("");

  const notices = useMemo(
    () => items.filter((notice) => matchesSearch(notice, ["title"], search)),
    [items, search]
  );

  const handleSubmit = async ({ title }, file) => {
    if (dialogs.formItem) await update(dialogs.formItem._id, { title }, file);
    else await create({ title }, file);
    notify.success(dialogs.formItem ? "Notice updated." : "Notice added.");
  };

  const handleDelete = (notice) =>
    confirmDelete({
      message: `Are you sure you want to delete "${notice.title}" ?`,
      onConfirm: () => remove(notice._id),
      successMessage: "Notice deleted.",
    });

  return (
    <PageContainer>
      <PageHeader
        title="Notices & Circulars"
        subtitle="PDFs shown in the Notices & Circulars section of the home page"
        actionLabel="Add Notice"
        onAction={dialogs.openAdd}
      />
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search Notices..."
      />
      <DataCard
        value={notices}
        loading={loading}
        error={error}
        onRetry={refresh}
        emptyMessage="No Notices Found.">
        <Column
          field="title"
          header="TITLE"
          body={(row) => <TruncateText text={row.title} maxLength={50} />}
        />
        <Column
          header="PDF"
          body={(row) => (
            <a
              href={row.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 hover:underline">
              <FileText size={16} /> Open
            </a>
          )}
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

      <PdfFormModal
        isOpen={dialogs.formOpen}
        onClose={dialogs.close}
        item={dialogs.formItem}
        header={dialogs.formItem ? "Edit Notice" : "Add Notice"}
        onSubmit={handleSubmit}
      />
    </PageContainer>
  );
};

export default NoticesPage;
