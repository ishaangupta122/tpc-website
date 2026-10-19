import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { GripVertical } from "lucide-react";

// Paginated table card with a leading S.NO column and a load-error banner.
// The table scrolls horizontally inside the card whenever its columns don't fit;
// cells never wrap, and the ACTIONS column (frozen right) stays in view.
// Give that column `frozen alignFrozen="right"`.
// Pass the remaining <Column>s as children.
//   onReorder  (newRows) => void: adds a drag handle column so rows can be
//              dragged into a new order. All rows are shown on one page then.
const DataCard = ({ value, loading, error, onRetry, emptyMessage, onReorder, children }) => (
  <div className="space-y-3">
    {error && (
      <div className="flex items-center justify-between bg-red-50 text-red-700 border border-red-200 rounded-lg p-4">
        <span>{error}</span>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="font-semibold underline cursor-pointer">
            Retry
          </button>
        )}
      </div>
    )}
    <div className="bg-white border border-neutral-200/30 rounded-md overflow-hidden">
      <DataTable
        value={value}
        paginator={!onReorder}
        rows={10}
        reorderableRows={Boolean(onReorder)}
        onRowReorder={(e) => onReorder?.(e.value)}
        loading={loading}
        emptyMessage={emptyMessage}
        scrollable
        tableStyle={{ minWidth: "50rem" }}
        tableClassName="whitespace-nowrap">
        {onReorder && (
          <Column
            rowReorder
            // The handle class is what lets the table start a drag from this icon.
            rowReorderIcon={
              <GripVertical size={18} className="p-datatable-reorderablerow-handle text-gray-500" />
            }
            header=""
            style={{ width: "3rem" }}
          />
        )}
        <Column
          header="S.NO"
          body={(rowData, { rowIndex }) => rowIndex + 1}
          style={{ textAlign: "center" }}
        />
        {children}
      </DataTable>
    </div>
  </div>
);

export default DataCard;
