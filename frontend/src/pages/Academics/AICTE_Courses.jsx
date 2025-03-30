import HeroSection from "../../components/HeroSection";
import { courses } from "../../data/data";

const AICTE_Courses = () => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "AICTE Courses", href: "/aicte-courses" },
  ];

  return (
    <>
      <HeroSection
        imageUrl='./rec_gate.jpg'
        title='AICTE Approved Courses & Intake'
        breadcrumbs={breadcrumbs}
      />
      <div className='flex justify-center items-center '>
        <div className='p-6 px-4 sm:px-14 py-20 max-w-7xl w-full'>
          <div className='mb-6 space-y-6'>
            <h1 className='text-2xl font-semibold uppercase text-green-900'>
              AICTE{" "}
              <span className='text-black'>Approved Courses & Intake</span>
            </h1>
          </div>
          <div className='mb-8'>
            <div className='border border-gray-200 rounded-lg'>
              <div className='overflow-x-auto'>
                <table className='min-w-full bg-white rounded-lg overflow-hidden shadow-lg'>
                  <thead className='bg-gray-100'>
                    <tr>
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-600'>
                        S No.
                      </th>
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-600'>
                        Department
                      </th>
                      <th className='px-6 py-3 text-left text-sm font-semibold text-gray-600'>
                        Approved Intake
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200'>
                    {courses.map((department) => (
                      <tr key={`${department.id}`} className='hover:bg-gray-50'>
                        <td className='px-6 py-4 text-sm font-medium text-gray-800'>
                          {department.id}
                        </td>
                        <td className='px-6 py-4 text-sm font-medium text-gray-900'>
                          {department.department}
                        </td>
                        <td className='px-6 py-4 text-sm text-gray-500'>
                          {department.approvedIntake}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AICTE_Courses;
