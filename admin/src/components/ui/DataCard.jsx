import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

// Paginated table card with a leading S.NO column and a load-error banner.
// The table scrolls horizontally inside the card whenever its columns don't fit;
// cells never wrap, and the ACTIONS column (frozen right) stays in view.
// Give that column `frozen alignFrozen="right"`.
// Pass the remaining <Column>s as children.
const DataCard = ({ value, loading, error, onRetry, emptyMessage, children }) => (
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
        paginator
        rows={10}
        loading={loading}
        emptyMessage={emptyMessage}
        scrollable
        tableStyle={{ minWidth: "50rem" }}
        tableClassName="whitespace-nowrap">
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
