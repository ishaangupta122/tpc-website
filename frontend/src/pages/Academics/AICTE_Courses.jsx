import PageLayout from "../../components/PageLayout";
import DataBoundary from "../../components/DataBoundary";
import DataTable from "../../components/DataTable";
import { useAicteCourses } from "../../hooks/useResources";

const COLUMNS = [
  { header: "S No.", render: (_, index) => index + 1, className: "font-medium text-gray-800" },
  { header: "Department", key: "department", className: "font-medium text-gray-900" },
  { header: "Approved Intake", key: "approvedIntake", className: "text-gray-500" },
];

const AICTE_Courses = () => {
  const { data: courses, loading, error, refresh } = useAicteCourses();

  return (
    <PageLayout
      title="AICTE Approved Courses & Intake"
      crumb="AICTE Courses"
      path="/aicte-courses"
      heading={["AICTE", "Approved Courses & Intake"]}>
      <DataBoundary loading={loading} error={error} onRetry={refresh} title="AICTE Courses">
        <DataTable columns={COLUMNS} rows={courses} rowKey={(course) => course._id ?? course.id} />
      </DataBoundary>
    </PageLayout>
  );
};

export default AICTE_Courses;
