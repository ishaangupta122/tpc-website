import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { MoveLeft } from "lucide-react";
import HeroSection from "../../components/HeroSection";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { departments } from "../../data/departments";
import { useDepartments } from "../../hooks/useResources";

// An extra page the admin wrote for a department (shown at /<department>/pages/<slug>).
// The HTML is cleaned and drawn in the site's own fonts and colours.
const DepartmentCustomPage = ({ deptKey }) => {
  const { slug } = useParams();
  const department = departments[deptKey];
  const { data, loading, error, refresh } = useDepartments();
  const page = data.find((item) => item.key === deptKey)?.pages?.find((p) => p.slug === slug);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: department.shortName || department.name, href: department.basePath },
    { label: page?.title || "Page", href: `${department.basePath}/pages/${slug}` },
  ];

  return (
    <>
      <HeroSection
        imageUrl={department.heroImage}
        title={page?.title || department.name}
        breadcrumbs={breadcrumbs}
      />

      {error ? (
        <Error error={error} onRetry={refresh} />
      ) : loading ? (
        <Loading title="Page" />
      ) : (
        <div className="site-container py-12 md:py-16">
          <Link
            to={department.basePath}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-emerald-800 hover:underline">
            <MoveLeft size={16} />
            Back to {department.name}
          </Link>

          {page ? (
            <>
              <h1 className="page-title mb-8 max-w-4xl">{page.title}</h1>
              <div
                className="rich-html"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(page.html, {
                    FORBID_ATTR: ["style", "class", "target"],
                    FORBID_TAGS: ["style", "form", "input", "button", "textarea", "select", "iframe"],
                  }),
                }}
              />
            </>
          ) : (
            <p className="py-10 text-center text-gray-600">This page could not be found.</p>
          )}
        </div>
      )}
    </>
  );
};

export default DepartmentCustomPage;
