// Page body for a single-record page (Contact, Principal): one card with the
// saved details as labelled rows. Shows loading, a load error with Retry, or
// the empty message until something has been saved.
export const DetailRow = ({ label, children }) => (
  <div className="grid gap-1 py-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="min-w-0 break-words text-gray-900">{children}</dd>
  </div>
);

const DetailsCard = ({ loading, error, onRetry, isEmpty, emptyMessage, children }) => (
  <div className="rounded-lg border border-neutral-200/60 bg-white p-6">
    {error ? (
      <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
        <span>{error}</span>
        <button type="button" onClick={onRetry} className="font-semibold underline">
          Retry
        </button>
      </div>
    ) : loading ? (
      <p className="text-neutral-500">Loading...</p>
    ) : isEmpty ? (
      <p className="py-6 text-center text-neutral-500">{emptyMessage}</p>
    ) : (
      <dl className="divide-y divide-gray-200">{children}</dl>
    )}
  </div>
);

export default DetailsCard;
