import { useMemo, useState } from "react";
import { Column } from "primereact/column";
import { useDialogs } from "../../hooks/useDialogs";
import { useConfirmDelete } from "../../hooks/useConfirmDelete";
import { matchesSearch } from "../../utils/search";
import PageContainer from "../ui/PageContainer";
import PageHeader from "../ui/PageHeader";
import FilterBar from "../ui/FilterBar";
import DataCard from "../ui/DataCard";
import RowActions from "../ui/RowActions";
import TruncateText from "../ui/TruncateText";
import ViewDialog from "../forms/ViewDialog";
import ImageContentForm from "./ImageContentForm";

const CategoryBadge = ({ value }) => (
  <div
    className={`px-3 py-1 rounded-full w-fit ${
      value === "College"
        ? "bg-red-100 text-red-700"
        : "bg-green-100 text-green-700"
    }`}>
    {value}
  </div>
);

// Complete admin page (header, search, table, add/edit/view dialogs, delete)
// for a content type made of text fields plus one image. Used by events,
// achievements, success stories and the gallery.
//
// config = {
//   entity: "Event",                       // used in dialogs and messages
//   title, subtitle, addLabel, searchPlaceholder, emptyMessage,
//   useResource: useEvents,                // context hook (CRUD resource)
//   deleteLabel: (item) => string,         // what to call the item when confirming
//   imageColumn: "first" | "last",
//   filter?: { field, allLabel, options }  // dropdown next to the search box
//   fields: [                              // in form/view order
//     { name, label, type: "text" | "textarea" | "date" | "select", required,
//       placeholder, options (select only),
//       column?: { header, truncate?, sortable?, badge? } },
//     { type: "image", key: "image", label, required },
//   ],
// }
const ContentManager = ({ config }) => {
  const {
    title, subtitle, addLabel, searchPlaceholder, emptyMessage, entity, fields,
    useResource, deleteLabel, imageColumn = "last", filter,
  } = config;
  const resource = useResource();
  const { items, loading, error, refresh, remove } = resource;
  const dialogs = useDialogs();
  const confirmDelete = useConfirmDelete();
  const [search, setSearch] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const imageField = fields.find((field) => field.type === "image");
  const searchFields = fields
    .filter((field) => field.type !== "image")
    .map((field) => field.name);

  const rows = useMemo(
    () =>
      items.filter(
        (item) =>
          matchesSearch(item, searchFields, search) &&
          (!filter || filterValue === "" || item[filter.field] === filterValue)
      ),
    // searchFields is derived from the constant config
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, search, filterValue]
  );

  const handleDelete = (item) =>
    confirmDelete({
      message: `Are you sure you want to delete "${deleteLabel(item)}" ?`,
      onConfirm: () => remove(item._id),
      successMessage: `${entity} deleted.`,
    });

  const imageColumnEl = imageField && (
    <Column
      key="image"
      field={imageField.key}
      header="IMAGE"
      body={(row) => (
        <img
          src={row[imageField.key]}
          alt={deleteLabel(row)}
          className="w-24 h-16 object-cover rounded-md border border-neutral-300"
        />
      )}
    />
  );

  const viewItem = dialogs.viewItem;

  return (
    <PageContainer>
      <PageHeader
        title={title}
        subtitle={subtitle}
        actionLabel={addLabel}
        onAction={dialogs.openAdd}
      />
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        placeholder={searchPlaceholder}
        filter={
          filter && {
            value: filterValue,
            onChange: setFilterValue,
            allLabel: filter.allLabel,
            options: filter.options,
          }
        }
      />
      <DataCard
        value={rows}
        loading={loading}
        error={error}
        onRetry={refresh}
        emptyMessage={emptyMessage}>
        {imageColumn === "first" && imageColumnEl}
        {fields
          .filter((field) => field.column)
          .map(({ name, column }) => (
            <Column
              key={name}
              field={name}
              header={column.header}
              sortable={column.sortable}
              body={
                column.badge
                  ? (row) => <CategoryBadge value={row[name]} />
                  : column.truncate
                    ? (row) => (
                        <TruncateText text={row[name]} maxLength={column.truncate} />
                      )
                    : undefined
              }
            />
          ))}
        {imageColumn === "last" && imageColumnEl}
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

      <ImageContentForm
        config={config}
        resource={resource}
        isOpen={dialogs.formOpen}
        onClose={dialogs.close}
        item={dialogs.formItem}
      />
      <ViewDialog
        header={`View ${entity}`}
        visible={dialogs.viewOpen}
        onHide={dialogs.close}
        fields={fields.map((field) => ({
          label: field.label,
          type: field.type === "image" ? "image" : field.type === "textarea" ? "textarea" : "text",
          value: viewItem?.[field.type === "image" ? field.key : field.name],
        }))}
      />
    </PageContainer>
  );
};

export default ContentManager;
