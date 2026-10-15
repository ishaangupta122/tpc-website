import { useMemo, useState } from "react";
import { Column } from "primereact/column";
import { FileText } from "lucide-react";
import { DOCUMENT_SECTIONS } from "../../api";
import { useDocuments } from "../../context";
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

const sectionLabel = (value) =>
  DOCUMENT_SECTIONS.find((section) => section.value === value)?.label || value;

const DocumentsPage = () => {
  const { items, loading, error, refresh, create, update, remove } = useDocuments();
  const dialogs = useDialogs();
  const confirmDelete = useConfirmDelete();
  const notify = useNotify();
  const [search, setSearch] = useState("");
  const [section, setSection] = useState("");

  const documents = useMemo(
    () =>
      items.filter(
        (doc) =>
          matchesSearch(doc, ["title"], search) &&
          (section === "" || doc.section === section)
      ),
    [items, search, section]
  );

  const handleSubmit = async (values, file) => {
    if (dialogs.formItem) await update(dialogs.formItem, values, file);
    else await create(values, file);
    notify.success(dialogs.formItem ? "Document updated." : "Document added.");
  };

  const handleDelete = (doc) =>
    confirmDelete({
      message: `Are you sure you want to delete "${doc.title}" ?`,
      onConfirm: () => remove(doc),
      successMessage: "Document deleted.",
    });

  return (
    <PageContainer>
      <PageHeader
        title="Documents"
        subtitle="PDFs for the links in the website's top bar, grouped by section"
        actionLabel="Add Document"
        onAction={dialogs.openAdd}
      />
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search Documents..."
        filter={{
          value: section,
          onChange: setSection,
          allLabel: "All Sections",
          options: DOCUMENT_SECTIONS,
        }}
      />
      <DataCard
        value={documents}
        loading={loading}
        error={error}
        onRetry={refresh}
        emptyMessage="No Documents Found.">
        <Column
          field="section"
          header="SECTION"
          body={(row) => sectionLabel(row.section)}
          sortable
        />
        <Column
          field="title"
          header="TITLE"
          body={(row) => <TruncateText text={row.title} maxLength={60} />}
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
        header={dialogs.formItem ? "Edit Document" : "Add Document"}
        sections={DOCUMENT_SECTIONS}
        onSubmit={handleSubmit}
      />
    </PageContainer>
  );
};

export default DocumentsPage;
