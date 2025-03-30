import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import BASE_API from "../../../BASE_API/config";
import axios from "axios";
import NoDataFound from "../../components/NoDataFound";

const MechanicalDepartment = () => {
  const [achievements, setAchievements] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselImages = [
    "./rec_gate.jpg",
    "./girls_hostel.jpg",
    "./boys_hostel.jpg",
  ];

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${BASE_API}/events/`);
      const filteredEvents = response.data.filter((achievement) =>
        ["Mechanical"].includes(achievement.category)
      );
      setEvents(filteredEvents);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchAchievement = async () => {
    try {
      const response = await axios.get(`${BASE_API}/updates/`);
      const filteredAchievements = response.data.filter((achievement) =>
        ["Mechanical"].includes(achievement.category)
      );
      setAchievements(filteredAchievements);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAchievement();
  }, []);

  const labs = [
    {
      title: "Project & Networking Lab",
      description:
        "Project & Networking Lab is fully equipped with Windows 7 Professional operating system, with high configuration systems and authorized softwares such as Oracle, Visual Studio, SQL, JAVA, C++ and Open Office where students develop their Minor and Major projects. The Lab is also installed with software for designing like Autodesk where the imagination of students takes shape in reality. Students can plot their designs and animations in this lab. All the systems are on local area networks; hub switch connected with router through OFC.",
      image: "/cseLab1.jpg",
    },
    {
      title: "Programming Lab",
      description:
        "The Lab is dedicated for programming related subjects which help students to build their logical thinking. The lab is installed with platforms/compilers like Turbo C++, Java, Netbeans, computer graphics, Visual Basics and CodeBlock, where the students can learn to execute C, C++, Java and .Net programs. Thus Students can execute all data structure and other algorithm related practicals in the lab.",
      image: "/cseLab2.jpg",
    },
    {
      title: "Maintenance and Troubleshooting Lab",
      description:
        "The goal of the lab is to give hands on experience on networking including making network cables, setting up various systems and network configurations that students may encounter in their professional life. Lab is equipped with latest networking related devices such as cables, switch, connectors and other tools facilitates students to perform Computer Network practicals.",
      image: "/cseLab4.jpg",
    },
    {
      title: "BIT Lab",
      description:
        "BIT Lab is fully equipped having OS Windows 7 Professional with high configuration systems and authorized software like Turbo C++ and Microsoft Office. In this lab teacher demonstrate the installation of computer hardware devices such as motherboard, Hard Disk and other peripheral devices to the students. Students get hands on practice on MS Office tools so that they should be able to do work on it further in their project reports.",
      image: "/cseLab6.jpg",
    },
    {
      title: "Multimedia Lab",
      description:
        "Multimedia Lab facilitates latest configuration computers with Adobe Photoshop CS to perform experiments on images such as image editing, photo-retouching, web design, etc. Other resources of the laboratory including Web Cam, Head Phone, Flat Bed Scanner, Printer etc.",
      image: "/cseLab5.jpg",
    },
    {
      title: "Operating Systems Lab",
      description:
        "The lab provides a dual operating system environment Ubuntu-Linux and Windows 7 where the students can execute linux commands on terminal as well as learn to execute C and C++ programs in both environments.",
      image: "/cseLab3.jpg",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Carousel Section - keeping it the same */}
      <div className='relative'>
        <div className='relative w-full h-[300px] md:h-[400px] lg:h-[500px]'>
          <div className='absolute h-full w-full bg-gradient-to-b from-emerald-800/40 to-emerald-950/20 z-10'></div>
          {carouselImages.map((img, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-500 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}>
              <img
                src={img}
                alt={`Department Slide ${index + 1}`}
                className='w-full h-full object-cover'
              />
            </div>
          ))}
          <button
            onClick={prevSlide}
            className='absolute left-4 top-1/2 -translate-y-1/2 bg-gradient-to-b from-emerald-800 to-emerald-950 text-white p-2 rounded-full hover:from-emerald-800/90 hover:to-emerald-950/90 z-20'>
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className='absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-b from-emerald-800 to-emerald-950 text-white p-2 rounded-full hover:from-emerald-800/90 hover:to-emerald-950/90 z-20'>
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Department Title Section */}
        <div className='bg-gradient-to-b from-emerald-800 to-emerald-950 w-full py-6'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h1 className='text-2xl md:text-3xl font-semibold text-white text-center'>
              Department of Computer Science & Engineering
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content Section - Reorganized Grid */}
      <div className='max-w-7xl mx-auto px-4 py-12 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
          {/* Left Content: Department Info and HOD */}
          <div className='lg:col-span-8 '>
            {/* Department Info */}
            <div className='bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden'>
              <div className='flex flex-col'>
                <div className='w-full h-72'>
                  <img
                    className='h-full w-full object-cover object-top'
                    src='https://imgs.search.brave.com/QohPpQ9nnIFNLVQXvbbVeJlwc2WG74183W47yYaVrh4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9w/cm9ncmFtbWluZy1i/YWNrZ3JvdW5kLXdp/dGgtcGVyc29uLXdv/cmtpbmctd2l0aC1j/b2Rlcy1jb21wdXRl/cl8yMy0yMTUwMDEw/MTI4LmpwZz9zZW10/PWFpc19oeWJyaWQ'
                    alt='Department'
                  />
                </div>
                <div className='p-6 md:p-8'>
                  <h2 className='text-2xl font-semibold text-green-800 mb-4'>
                    Department of CSE
                  </h2>
                  <div className='space-y-4 text-gray-600 text-md'>
                    <p>
                      The diploma program in Computer Science Engg is designed
                      to educate students with a broad intellectual base,
                      well-developed interpersonal skills, analytical and
                      problem-solving skills and a mastery of the appropriate
                      elements of the discipline of Computer Science.
                    </p>
                    <p>
                      CSE is also having 24 seats for LEET students and they
                      directly admitted to 3rd semester. This course equip
                      students with strong practical and theoretical knowledge
                      of computer software and hardware.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* HOD Card */}
            <div className='bg-gray-50 border border-gray-300 rounded-lg shadow-lg max-w-3xl mt-20'>
              <div className='relative px-6 py-4'>
                <img
                  src='./shashiBala.jpg'
                  alt='Profile'
                  className='bg-white absolute z-20 -top-16 right-10 w-32 h-32 rounded-full object-cover border-4 border-white'
                  loading='lazy'
                />
                <div className='p-2'>
                  <h2 className='text-2xl font-semibold text-emerald-800'>
                    Mrs. Shashi Bala
                  </h2>
                  <p className='font-medium'>(Head of Department)</p>
                  <h2 className='font-light text-gray-700 mt-4 text-justify'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quod corrupti enim consequuntur ipsam asperiores, iste quia,
                    ratione pariatur reiciendis deserunt, voluptate harum? Odio
                    deleniti debitis aliquam ratione quibusdam, officiis cumque
                    excepturi beatae nihil accusamus repellendus laboriosam
                    nobis a voluptates reiciendis commodi vel modi quisquam ab
                    eaque perferendis.
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content: Activities and Events */}
          <div className='lg:col-span-4 space-y-8'>
            {/* Achievements Section */}
            <div className='bg-white rounded-lg shadow-lg p-6 border border-gray-300'>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-emerald-800'>
                  Achievements
                </h2>
              </div>
              <div className='space-y-4 max-h-[400px] overflow-y-auto pr-2'>
                {achievements.length === 0 ? (
                  <NoDataFound title='Achievements' />
                ) : (
                  achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className='border-b-2 border-gray-200 last:border-0 pb-2 last:pb-0'>
                      <Link
                        to={`achievements/${achievement._id}`}
                        className='block hover:bg-gray-50 rounded-lg transition-colors duration-150 px-3 py-1'>
                        <ul className='list-disc ml-2 text-sm font-normal text-black hover:text-emerald-800'>
                          <li>{achievement.title}</li>
                        </ul>
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Events & Updates Section */}
            <div className='bg-white rounded-lg shadow-lg p-6 border border-gray-300'>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-emerald-800'>
                  Events & Updates
                </h2>
              </div>
              <div className='space-y-4 max-h-[400px] overflow-y-auto pr-2'>
                {events.length === 0 ? (
                  <NoDataFound title='Events' />
                ) : (
                  events.map((events, index) => (
                    <div
                      key={index}
                      className='border-b-2 border-gray-200 last:border-0 pb-2 last:pb-0'>
                      <Link
                        to={`events/${events._id}`}
                        className='block hover:bg-gray-50 rounded-lg transition-colors duration-150 px-3 py-1'>
                        <ul className='list-disc ml-2 text-sm font-normal text-black hover:text-emerald-800'>
                          <li>{events.title}</li>
                        </ul>
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Labs Section - keeping it the same */}
        <div className='max-w-7xl mx-auto px-4 py-12'>
          <h2 className='text-3xl font-semibold text-emerald-800 mb-8 uppercase'>
            Our<span className='text-black'> Laboratories</span>
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {labs.map((lab, index) => (
              <div
                key={index}
                className='bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'>
                <div className='aspect-w-16 aspect-h-9'>
                  <img
                    src={lab.image}
                    alt={lab.title}
                    className='w-full h-48 object-cover bg-green-100'
                  />
                </div>
                <div className='p-6 border-t-4 border-emerlad-800'>
                  <h3 className='text-xl font-semibold text-emerald-800 mb-3'>
                    {lab.title}
                  </h3>
                  <p className='text-gray-600 text-sm text-justify'>
                    {lab.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MechanicalDepartment;
