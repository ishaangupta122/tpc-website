import { ExternalLink } from "lucide-react";
import { useDocuments } from "../hooks/useResources";
import Loading from "./Loading";
import NoDataFound from "./NoDataFound";
import Error from "./Error";

// Bulleted list of the PDFs uploaded for one section (see backend /documents/:section).
// Each title opens its PDF in the same tab.
// `extra` renders additional static list items above the PDFs.
const DocumentList = ({ section, title, extra = null }) => {
  const { data: documents, loading, error, refresh } = useDocuments(section);

  if (error) return <Error error={error} onRetry={refresh} />;
  if (loading) return <Loading title={title} />;
  if (documents.length === 0 && !extra) return <NoDataFound title={title} />;

  return (
    <ul className="list-disc list-inside space-y-2">
      {extra}
      {documents.map((doc) => (
        <li key={doc._id} className="text-emerald-800">
          <a
            href={doc.fileUrl || undefined}
            className="inline-flex items-center flex-wrap hover:text-blue-600 hover:underline">
            {doc.title}
            <ExternalLink className="w-4 h-4 ml-1 inline-block" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default DocumentList;
