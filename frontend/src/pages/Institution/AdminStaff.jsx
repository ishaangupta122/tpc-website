import { useEffect, useState } from "react";
import { Loader, Search } from "lucide-react";
import HeroSection from "../../components/HeroSection";
import { Link } from "react-router-dom";
import axios from "axios";
import BASE_API from "../../../BASE_API/config";

const AdminStaff = () => {
  const [loading, setLoading] = useState(true);
  const [facultyList, setFacultyList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Admin-Staff", href: "/admin-staff" },
  ];

  const fetchFacultyList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_API}/faculty`, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 5000,
      });
      const adminStaff = response.data.filter(
        (faculty) => faculty.department === "Admin Staff"
      );
      console.log(response.data);
      setFacultyList(adminStaff);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacultyList();
  }, []);

  const departments = [
    "All",
    "Superintendent",
    "PA to Principal",
    "Sr. Asstt.",
    "Jr. Asstt.",
    "Clerk",
  ];

  const filteredFaculty = facultyList.filter((faculty) => {
    const matchesSearch =
      faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.designation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      !selectedDepartment ||
      selectedDepartment === "All" ||
      faculty.designation === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  if (loading) {
    return (
      <section className='bg-white overflow-hidden flex justify-center items-center py-20'>
        <div className='flex flex-col items-center gap-4'>
          <Loader className='w-8 h-8 animate-spin text-emerald-900' />
          <p className='text-emerald-900 font-medium'>Loading Admin Staff...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <HeroSection
        imageUrl='./rec_gate.jpg'
        title='Admin Staff'
        breadcrumbs={breadcrumbs}
      />

      <div className='flex items-center flex-col'>
        <section className='px-6 lg:px-16 py-6 lg:py-16  max-w-7xl w-full'>
          <div className='mb-6 space-y-6'>
            <h1 className='text-2xl font-semibold mb-4 uppercase text-green-900'>
              Admin <span className='text-black'>Staff</span>
            </h1>
            {/* Filters and Search */}
            <div className='flex flex-col sm:flex-row gap-4'>
              <div className='relative flex-1'>
                <input
                  type='search'
                  placeholder='Search faculty...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800'
                />
                <Search className='w-5 h-5 absolute left-3 top-2.5 text-neutral-400' />
              </div>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className='p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800 bg-white'>
                <option value=''>All Designations</option>
                {departments
                  .filter((designation) => designation !== "All")
                  .map((designation) => (
                    <option key={designation} value={designation}>
                      {designation}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          {/* Faculty List */}
          {filteredFaculty.length === 0 ? (
            <div className='bg-white p-6 rounded-lg border border-neutral-200/60 text-center text-neutral-600'>
              No faculty members found matching your search.
            </div>
          ) : (
            <div className='flex items-center justify-center w-full '>
              <div className='max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 w-full gap-x-4 gap-y-6 justify-items-center '>
                {filteredFaculty.map((faculty) => (
                  <div
                    key={faculty._id}
                    className='bg-white rounded-lg shadow-lg overflow-hidden w-full '>
                    {/* Header Section */}
                    <div className='bg-gradient-to-b from-emerald-800 to-emerald-950 text-white px-6 py-4'>
                      <div className='flex items-center gap-4'>
                        <Link to={`/faculty/${faculty._id}`}>
                          <img
                            src={faculty.image}
                            alt='Profile'
                            className='w-20 h-20 rounded-full object-cover border-4 border-white'
                            loading='lazy'
                          />
                        </Link>
                        <div>
                          <h2 className='text-lg font-semibold '>
                            {faculty.name}
                          </h2>
                          <p className='text-sm font-normal text-green-200'>
                            {faculty.designation}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className='py-6 px-4 space-y-2 text-sm'>
                      {/* Email */}
                      <div className='flex gap-2 justify-start items-center font-medium'>
                        <h3 className=' text-green-800 '>Email:</h3>
                        <a
                          href={`mailto:${faculty.email}`}
                          className='text-green-800 underline '>
                          {faculty.email}
                        </a>
                      </div>
                      {/* Phone */}
                      <div className='flex gap-2 justify-start items-center font-medium'>
                        <h3 className=' text-green-800  '>Phone:</h3>
                        <p className='text-gray-800 '>{faculty.phone}</p>
                      </div>
                      {/* Joined Date */}
                      <div className='flex gap-2 justify-start items-center font-medium'>
                        <h3 className=' text-green-800 '>Joined Date:</h3>
                        <p className='text-gray-800  '>{faculty.joinedDate}</p>
                      </div>
                      {/* Experience */}
                      <div className='flex gap-2 justify-start items-center font-medium'>
                        <h3 className=' text-green-800  '>Experience:</h3>
                        <p className='text-gray-800 '>{faculty.experience}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default AdminStaff;
