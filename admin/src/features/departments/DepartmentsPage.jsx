import { useCallback, useEffect, useMemo, useState } from "react";
import { Column } from "primereact/column";
import { departmentsApi } from "../../api";
import { useFaculty } from "../../context";
import { DEPARTMENTS, RESOURCE_TYPES, findHod } from "../../constants/departments";
import { useDialogs } from "../../hooks/useDialogs";
import PageContainer from "../../components/ui/PageContainer";
import PageHeader from "../../components/ui/PageHeader";
import DataCard from "../../components/ui/DataCard";
import RowActions from "../../components/ui/RowActions";
import ViewDialog from "../../components/forms/ViewDialog";
import { FormSection, GroupCard } from "../../components/forms/FormParts";
import DepartmentFormModal from "./DepartmentFormModal";

const typeLabel = (value) => RESOURCE_TYPES.find((type) => type.value === value)?.label || value;

// The departments are a fixed list. Their description is part of the website and
// the head of department comes from the Faculty list; here the admin manages the
// extra pages (HTML pages, PDFs and links) shown on each department page.
const DepartmentsPage = () => {
  const dialogs = useDialogs();
  const { items: faculty } = useFaculty();
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setSaved(await departmentsApi.list());
    } catch (err) {
      setError(err.message || "Could not load the departments.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const rows = useMemo(
    () =>
      DEPARTMENTS.map((department) => ({
        ...department,
        hod: findHod(faculty, department)?.name || "",
        pages: saved.find((item) => item.key === department.key)?.pages || [],
      })),
    [saved, faculty]
  );

  const viewItem = dialogs.viewItem;

  return (
    <PageContainer>
      <PageHeader
        title="Departments"
        subtitle="Manage the extra pages of each department. The head of department comes from Faculty"
      />
      <DataCard
        value={rows}
        loading={loading}
        error={error}
        onRetry={refresh}
        emptyMessage="No Departments Found.">
        <Column field="name" header="DEPARTMENT" />
        <Column
          header="HEAD OF DEPARTMENT"
          body={(row) => row.hod || <span className="text-gray-400">Not set in Faculty</span>}
        />
        <Column
          header="OTHER PAGES"
          body={(row) => `${row.pages.length} ${row.pages.length === 1 ? "item" : "items"}`}
        />
        <Column
          header="ACTIONS"
          frozen
          alignFrozen="right"
          body={(row) => (
            <RowActions
              onView={() => dialogs.openView(row)}
              onEdit={() => dialogs.openEdit(row)}
            />
          )}
        />
      </DataCard>

      <DepartmentFormModal
        isOpen={dialogs.formOpen}
        onClose={dialogs.close}
        department={dialogs.formItem}
        onSaved={refresh}
      />
      <ViewDialog
        header="View Department"
        visible={dialogs.viewOpen}
        onHide={dialogs.close}
        fields={[
          { label: "Department", value: viewItem?.name },
          { label: "Head of Department", value: viewItem?.hod || "Not set in Faculty" },
        ]}
        extra={
          <FormSection title="Other Pages">
            {(viewItem?.pages || []).length === 0 ? (
              <p className="text-sm text-gray-500">No items.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {viewItem.pages.map((page, i) => (
                  <GroupCard key={page.slug || i} title={`Item ${i + 1} · ${page.title}`}>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">{typeLabel(page.type)}</span>
                      {page.type === "link" && ` · ${page.url}`}
                      {page.type === "pdf" && page.fileUrl && (
                        <>
                          {" · "}
                          <a
                            href={page.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-800 underline">
                            Open PDF
                          </a>
                        </>
                      )}
                    </p>
                    {page.type === "page" && (
                      <pre
                        tabIndex={0}
                        className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap break-words rounded bg-gray-100 p-3 font-mono text-xs text-gray-700">
                        {page.html}
                      </pre>
                    )}
                  </GroupCard>
                ))}
              </div>
            )}
          </FormSection>
        }
      />
    </PageContainer>
  );
};

export default DepartmentsPage;
