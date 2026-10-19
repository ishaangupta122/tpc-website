import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import DocumentList from "../../components/DocumentList";

// One of the PDF list pages (magazines, forms, mentors, ...); see data/documentPages.js.
// `link` is a fixed entry shown above the uploaded PDFs.
const DocumentPage = ({ path, section, title, crumb, heading, listTitle, link }) => (
  <PageLayout title={title} crumb={crumb} path={path} heading={heading}>
    <DocumentList
      section={section}
      title={listTitle}
      extra={
        link && (
          <li className="text-emerald-800">
            <Link to={link.to} className="inline-flex items-center hover:text-blue-600 hover:underline">
              {link.label}
              <ExternalLink className="w-4 h-4 ml-1 inline-block" />
            </Link>
          </li>
        )
      }
    />
  </PageLayout>
);

export default DocumentPage;
