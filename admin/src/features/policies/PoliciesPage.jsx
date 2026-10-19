import { Column } from "primereact/column";
import { usePolicies } from "../../context";
import { useListPage } from "../../hooks/useListPage";
import PageContainer from "../../components/ui/PageContainer";
import PageHeader from "../../components/ui/PageHeader";
import FilterBar from "../../components/ui/FilterBar";
import DataCard from "../../components/ui/DataCard";
import RowActions from "../../components/ui/RowActions";
import TruncateText from "../../components/ui/TruncateText";
import ViewDialog from "../../components/forms/ViewDialog";
import { FormSection, GroupCard } from "../../components/forms/FormParts";
import PolicyFormModal from "./PolicyFormModal";
import { toViewSections } from "./policySections";

const SEARCH_FIELDS = ["title"];

// The first point of the card, as a short preview of what it says.
const firstPoint = (policy) =>
  policy.points?.[0] || policy.groups?.find((group) => group.points?.length)?.points[0] || "";

// "2 sections" / "1 section": the main list plus any extra sections.
const sectionCount = (policy) => {
  const count = (policy.points?.length || policy.pointsHeading ? 1 : 0) + (policy.groups?.length || 0);
  return `${count} ${count === 1 ? "section" : "sections"}`;
};

const PoliciesPage = () => {
  const { items, loading, error, refresh, remove } = usePolicies();
  const { dialogs, search, setSearch, rows: policies, handleDelete } = useListPage({
    items,
    remove,
    searchFields: SEARCH_FIELDS,
    itemLabel: (policy) => policy.title,
    deletedMessage: "Policy deleted.",
  });

  const viewItem = dialogs.viewItem;

  return (
    <PageContainer>
      <PageHeader
        title="Guidelines & Policies"
        subtitle="Manage college guidelines and policies"
        actionLabel="Add New Policy"
        onAction={dialogs.openAdd}
      />
      <FilterBar search={search} onSearchChange={setSearch} placeholder="Search Policies..." />
      <DataCard
        value={policies}
        loading={loading}
        error={error}
        onRetry={refresh}
        emptyMessage="No Policies Found. The website shows its built-in policies until you add one.">
        <Column field="title" header="TITLE" sortable />
        <Column
          header="CONTENT"
          body={(row) => <TruncateText text={firstPoint(row)} maxLength={60} />}
        />
        <Column header="SECTIONS" body={(row) => sectionCount(row)} />
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

      <PolicyFormModal
        isOpen={dialogs.formOpen}
        onClose={dialogs.close}
        policy={dialogs.formItem}
      />
      <ViewDialog
        header="View Policy"
        visible={dialogs.viewOpen}
        onHide={dialogs.close}
        fields={[{ label: "Policy Title", value: viewItem?.title }]}
        extra={
          <FormSection title="Sections">
            <div className="flex flex-col gap-3">
              {toViewSections(viewItem).map((section, i) => (
                <GroupCard
                  key={i}
                  title={`Section ${i + 1}${section.heading ? ` · ${section.heading}` : ""}`}>
                  <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700 marker:text-emerald-800">
                    {section.points.map((point, j) => (
                      <li key={j}>{point}</li>
                    ))}
                  </ul>
                </GroupCard>
              ))}
            </div>
          </FormSection>
        }
      />
    </PageContainer>
  );
};

export default PoliciesPage;
