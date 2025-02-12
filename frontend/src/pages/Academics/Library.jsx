import { useState, useEffect } from "react";
import HeroSection from "../../components/HeroSection";
import { Link } from "react-router-dom";
import axios from "axios";
import BASE_API from "../../../BASE_API/config";

const LibraryPage = () => {
  const [faculty, setFaculty] = useState([]);
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Library", href: "/library" },
  ];

  // Static data fallback
  const staticFaculty = {
    id: 1,
    name: "Seema Sharma",
    email: "seemarn72@yahoo.co.in",
    phone: "+91 XXXXX-XXXXX",
    designation: "Assistant Librarian",
    joinedDate: "August 09, 2012",
    education: ["M.Phil (Library)", "M.Lib", "B.Lib"],
    experience: "19 Years",
    image: "https://avatar.iran.liara.run/public",
  };

  const fetchFaculty = async () => {
    try {
      const response = await axios.get(`${BASE_API}/faculty`, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 5000,
      });
      const data = response.data;
      const filteredFaculty = data.filter(
        (faculty) => faculty.designation === "Assistant Librarian"
      );
      setFaculty(
        filteredFaculty.length > 0 ? filteredFaculty[0] : staticFaculty
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  return (
    <>
      <HeroSection
        imageUrl='./rec_gate.jpg'
        title='College Library'
        breadcrumbs={breadcrumbs}
      />

      <div className='bg-white min-h-screen flex flex-col items-center py-10 px-4'>
        <div className='max-w-7xl w-full'>
          {/* Header */}
          <div className='text-center mb-16'>
            <h1 className='text-3xl font-semibold mb-4 uppercase text-emerald-900'>
              Polytechnic <span className='text-black'>Library</span>
            </h1>
            <div className='w-28 h-1 bg-[#FDB714] mx-auto rounded-full'></div>

            <p className='text-lg text-gray-700 mt-4'>
              A temple of learning and a lighthouse in the spread of knowledge.
            </p>
          </div>

          {/* Main Content */}
          <div className='grid lg:grid-cols-2 gap-5 items-start justify-center'>
            {/* Image Section */}
            <div className='flex justify-center'>
              <img
                src='https://imgs.search.brave.com/-f8aCLURNC-a-cl5xjMqN7f4AgqvMp4Lf7q1rUaH2KQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9vbGQtdW5pdmVy/c2l0eS1saWJyYXJ5/LWZhY3VsdHktZ2Vv/Z3JhcGh5LWhpc3Rv/cnlfMTM2ODc1LTQ2/Ni5qcGc_c2VtdD1h/aXNfaHlicmlk'
                alt='Polytechnic Library'
                className='rounded-lg shadow-lg w-full max-w-lg object-cover h-[80vh] max-h-[600px]'
              />
            </div>

            {/* Description Section */}
            <div className='text-gray-800'>
              <h2 className='text-2xl font-semibold text-emerald-900 mb-4'>
                About Our Library
              </h2>
              <p className='text-base leading-7 mb-4'>
                The library is a temple of learning, a lighthouse, and a chief
                agency in the spread of knowledge. Our polytechnic library
                boasts an open access system, an uncommon feature compared to
                the closed shelf system prevalent in other Northern Region
                Polytechnics.
              </p>
              <p className='text-base leading-7 mb-4'>
                Managed efficiently by an Assistant Librarian and an attendant,
                the library provides excellent services to staff and students
                alike. The Student Aid Books facility benefits a large number of
                students every year.
              </p>
              <p className='text-base leading-7 mb-4'>
                Currently, the library houses 3,566 titles, comprising 16,800
                volumes. It is continually updated with the latest editions of
                books, technical and non-technical magazines, and journals
                covering all branches of study. Approximately 16,162 books are
                issued and consulted annually, showcasing its extensive usage.
              </p>
              <p className='text-base leading-7 mb-4'>
                A large number of students visit the library daily to gain
                expertise in their respective fields, making it a cornerstone of
                academic excellence in our institution.
              </p>
            </div>
          </div>

          {/* Enhanced Faculty Section */}
          <div className='mt-20 bg-gray-100 rounded-xl shadow-lg shadow-black/10 py-4 sm:py-16 px-4 mb-10 max-w-4xl mx-auto'>
            <div className='mx-auto'>
              <div className='text-center mb-10'>
                <h1 className='text-2xl font-semibold mb-2 uppercase text-emerald-900'>
                  Meet <span className='text-black'>Our Faculty</span>
                </h1>
                <div className='w-28 h-1 bg-[#FDB714] mx-auto rounded-full'></div>
                <p className='mt-4 text-gray-800 max-w-2xl mx-auto'>
                  {`Our library is managed by dedicated professionals who are committed to fostering an
								environment of learning and intellectual growth. Meet the expert behind our
								library's success.`}
                </p>
              </div>

              <div className='flex items-center justify-center w-full'>
                <div className='max-w-sm w-full'>
                  <div className='bg-white rounded-lg shadow-lg overflow-hidden w-full '>
                    {/* Header Section */}
                    <div className='bg-gradient-to-b from-emerald-800 to-emerald-950 text-white px-6 py-4'>
                      <Link to={`/faculty/${faculty._id}`}>
                        <div className='flex items-center gap-4'>
                          <img
                            src={faculty.image}
                            alt='Profile'
                            className='w-20 h-20 rounded-full object-cover border-4 border-white'
                            loading='lazy'
                          />
                          <div>
                            <h2 className='text-lg font-semibold hover:underline'>
                              {faculty.name}
                            </h2>
                            <p className='text-sm font-normal text-green-200'>
                              {faculty.designation}
                            </p>
                          </div>
                        </div>
                      </Link>
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
                        <h3 className=' text-green-800 '>Phone:</h3>
                        <p className='text-gray-800  '>{faculty.phone}</p>
                      </div>
                      {/* Joined Date */}
                      <div className='flex gap-2 justify-start items-center font-medium'>
                        <h3 className=' text-green-800 '>Joined Date:</h3>
                        <p className='text-gray-800  '>{faculty.joinedDate}</p>
                      </div>
                      {/* Experience */}
                      <div className='flex gap-2 justify-start items-center font-medium'>
                        <h3 className=' text-green-800  '>Experience:</h3>
                        <p className='text-gray-800 '>
                          {faculty.experience} Years
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LibraryPage;
