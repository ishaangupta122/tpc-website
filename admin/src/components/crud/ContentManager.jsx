import { Column } from "primereact/column";
import { useListPage } from "../../hooks/useListPage";
import PageContainer from "../ui/PageContainer";
import PageHeader from "../ui/PageHeader";
import FilterBar from "../ui/FilterBar";
import DataCard from "../ui/DataCard";
import RowActions from "../ui/RowActions";
import TruncateText from "../ui/TruncateText";
import ViewDialog from "../forms/ViewDialog";
import BlocksPreview from "../forms/BlocksPreview";
import ImageContentForm from "./ImageContentForm";

const CategoryBadge = ({ value }) => (
  <div
    className={`px-3 py-1 rounded-full w-fit whitespace-nowrap ${
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
//   imageColumn: "first" (default, right after S.NO) | "last",
//   filter?: { field, allLabel, options }  // dropdown next to the search box
//   fields: [                              // in form/view order
//     { name, label, type: "text" | "textarea" | "date" | "select", required,
//       placeholder, options (select only),
//       column?: { header, truncate?, sortable?, sortField?, badge? } },
//     { type: "image", key: "image", label, required },
//   ],
// }
const ContentManager = ({ config }) => {
  const {
    title, subtitle, addLabel, searchPlaceholder, emptyMessage, entity, fields,
    useResource, deleteLabel, imageColumn = "first", filter,
  } = config;
  const resource = useResource();
  const { items, loading, error, refresh, remove } = resource;
  const imageField = fields.find((field) => field.type === "image");
  const { dialogs, search, setSearch, filterValue, setFilterValue, rows, handleDelete } =
    useListPage({
      items,
      remove,
      searchFields: fields.filter((field) => field.type !== "image").map((field) => field.name),
      filterField: filter?.field,
      itemLabel: deleteLabel,
      deletedMessage: `${entity} deleted.`,
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
              sortField={column.sortField}
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
        extra={config.blocks && <BlocksPreview blocks={viewItem?.blocks} />}
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
