import { useEffect, useMemo, useState } from "react";
import { Column } from "primereact/column";
import { FileText } from "lucide-react";
import { useNotices } from "../../context";
import { noticesApi } from "../../api";
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

  // The list as arranged on screen; follows the server list and is updated at
  // once when a row is dropped, before the new order is saved.
  const [rows, setRows] = useState(items);
  useEffect(() => setRows(items), [items]);

  // Dragging only makes sense on the full list, so it is off while searching.
  const searching = search.trim() !== "";
  const notices = useMemo(
    () => (searching ? rows.filter((notice) => matchesSearch(notice, ["title"], search)) : rows),
    [rows, search, searching]
  );

  const handleReorder = async (next) => {
    setRows(next);
    try {
      await noticesApi.reorder(next.map((notice) => notice._id));
      await refresh();
      notify.success("Notice order saved.");
    } catch (err) {
      setRows(items);
      notify.error(err.message, "Could not save the order");
    }
  };

  const handleSubmit = async ({ title, highlight }, file) => {
    if (dialogs.formItem)
      await update(dialogs.formItem._id, { title, highlight }, file);
    else await create({ title, highlight }, file);
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
        subtitle="Drag the handle on a row to change the order shown on the home page"
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
        emptyMessage="No Notices Found."
        onReorder={searching ? undefined : handleReorder}>
        <Column
          field="title"
          header="TITLE"
          body={(row) => <TruncateText text={row.title} maxLength={50} />}
        />
        <Column
          header="HIGHLIGHT"
          field="highlight"
          body={(row) =>
            row.highlight ? (
              <span className="-mx-2 rounded bg-yellow-300 px-2 py-0.5">
                Yes
              </span>
            ) : (
              "No"
            )
          }
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
        entity="Notice"
        highlightOption
        onSubmit={handleSubmit}
      />
    </PageContainer>
  );
};

export default NoticesPage;
