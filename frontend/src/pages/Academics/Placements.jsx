import { useState } from "react";
import { Search } from "lucide-react";
import HeroSection from "../../components/HeroSection";
import { usePlacements } from "../../hooks/useResources";
import Loading from "../../components/Loading";
import NoDataFound from "../../components/NoDataFound";
import Error from "../../components/Error";

const PlacementsTracker = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const { data: placements, loading, error, refresh } = usePlacements();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Placements", href: "/placements" },
  ];

  const filteredPlacements = placements
    .filter((placement) =>
      selectedYear ? placement.year.toString() === selectedYear : true
    )
    .map((placement) => ({
      ...placement,
      departments: placement.departments
        ? placement.departments.filter((dept) =>
            dept.department.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : [],
    }))
    .filter((placement) => placement.departments.length > 0);

  return (
    <>
      <HeroSection
        imageUrl="/rec_gate.jpg"
        title="College Placements"
        breadcrumbs={breadcrumbs}
      />

      <div className="flex justify-center items-center ">
        <div className="site-container py-6 my-10">
          <div className="mb-6 space-y-6">
            <h1 className="page-title">
              College <span className="text-black">Placements</span>
            </h1>
            {error ? (
              <Error error={error} onRetry={refresh} />
            ) : loading ? (
              <Loading title="Placements Data" />
            ) : (
              <>
                {/* Filters and Search */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <input
                      type="search"
                      placeholder="Search department..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
                  </div>

                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800 bg-white">
                    <option value="">All Years</option>
                    {placements
                      .map((placement) => placement.year)
                      .sort((a, b) => b - a)
                      .map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                  </select>
                </div>
                {/* No Data Found */}
                {filteredPlacements.length === 0 ? (
                  <NoDataFound title="Placements" />
                ) : (
                  <>
                    {/* Data List */}
                    {filteredPlacements.map((placement) => (
                      <div key={placement.year} className="mb-8">
                        <h3 className="card-title mb-4">
                          {placement.year} Placements
                        </h3>
                        <div className="border border-gray-200 rounded-lg">
                          <div className="overflow-x-auto">
                            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
                              <thead className="bg-gray-100">
                                <tr>
                                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                                    Department
                                  </th>
                                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                                    Approved Intake
                                  </th>
                                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                                    No. Companies Visited
                                  </th>
                                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                                    Students Placed
                                  </th>
                                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                                    Average Package
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {placement.departments.map((dept) => (
                                  <tr
                                    key={dept.department}
                                    className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                      {dept.department}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                      {dept.approvedIntake}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                      {dept.companiesVisited}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                      {dept.studentsPlaced}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                      ₹ {dept.avgPackage} LPA
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlacementsTracker;
