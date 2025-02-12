import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ElectricalDepartment = () => {
  const carouselImages = [
    "./rec_gate.jpg",
    "./girls_hostel.jpg",
    "./boys_hostel.jpg",
  ];

  const activities = [
    {
      title: "International Research Symposium on Advanced Computing",
      link: "#",
    },
    {
      title: "Distinguished Lecture Series: AI in Modern Engineering",
      link: "#",
    },
    {
      title: "Industrial Workshop on Cloud Computing",
      link: "#",
    },
    {
      title: "Industry Visit to Microsoft Development Center",
      link: "#",
    },
    {
      title: "Annual Alumni Meet 2025",
      link: "#",
    },
    {
      title: "Industry Visit to Microsoft Development Center",
      link: "#",
    },
    {
      title: "Industry Visit to Microsoft Development Center",
      link: "#",
    },
    {
      title: "Industry Visit to Microsoft Development Center",
      link: "#",
    },
    {
      title: "Industry Visit to Microsoft Development Center",
      link: "#",
    },
    {
      title: "Industry Visit to Microsoft Development Center",
      link: "#",
    },
    {
      title: "Industry Visit to Microsoft Development Center",
      link: "#",
    },
  ];

  const labs = [
    {
      title: "Advanced Computing Lab",
      description:
        "Our state-of-the-art computing lab is equipped with high-performance workstations and the latest software tools for research in artificial intelligence, machine learning, and parallel computing. Students get hands-on experience with cutting-edge technologies used in industry.",
      image: "/image2.jpeg",
    },
    {
      title: "Network Security Lab",
      description:
        "Dedicated to network security research and education, this lab features specialized hardware and software for cybersecurity training, penetration testing, and network defense simulations. Students learn practical security skills in a controlled environment.",
      image: "/image2.jpeg",
    },
    {
      title: "IoT and Embedded Systems Lab",
      description:
        "This specialized laboratory houses various IoT devices, sensors, and embedded systems. Students work on real-world projects involving hardware-software integration, sensor networks, and smart device development.",
      image: "/image2.jpeg",
    },
    {
      title: "IoT and Embedded Systems Lab",
      description:
        "This specialized laboratory houses various IoT devices, sensors, and embedded systems. Students work on real-world projects involving hardware-software integration, sensor networks, and smart device development.",
      image: "/image2.jpeg",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

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
      {/* Carousel Section */}
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
            <h1 className='text-2xl md:text-3xl font-semibold text-white text-center blink-animation'>
              Department of Electrical Engineering
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className='max-w-7xl mx-auto px-4 py-12 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* About Section with Image */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Department Info */}
            <div className='bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden'>
              <div className='flex flex-col'>
                <div className='w-full h-72'>
                  <img
                    className='h-full w-full object-cover object-top'
                    src='./campus.webp'
                    alt='Department'
                  />
                </div>
                <div className='p-6 md:p-8'>
                  <h2 className='text-2xl font-semibold text-green-800 mb-4'>
                    Department of Electrical
                  </h2>
                  <div className='space-y-4 text-gray-600 text-md'>
                    <p>
                      Welcome to our department, where innovation meets
                      education. We are committed to providing cutting-edge
                      research opportunities and world-class education to our
                      students. Our faculty members are leaders in their
                      respective fields, ensuring that our students receive the
                      highest quality education and mentorship.
                    </p>
                    <p>
                      With state-of-the-art facilities and a robust curriculum,
                      we prepare our students for successful careers in industry
                      and academia.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activities Section */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-lg shadow-lg p-6 border border-gray-300'>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-green-800'>
                  Activities
                </h2>
              </div>
              <div className='space-y-4 max-h-[540px] overflow-y-auto pr-2'>
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className='border-b-2 border-gray-200 last:border-0 pb-2 last:pb-0'>
                    <a
                      href={activity.link}
                      className='block hover:bg-gray-50 rounded-lg transition-colors duration-150 px-3 py-1'>
                      <ul className='list-disc ml-2 text-sm font-normal text-black hover:text-green-800'>
                        <li>{activity.title}</li>
                      </ul>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* HOD Card */}
        <div className='bg-gray-50 border border-gray-300 rounded-lg shadow-lg max-w-3xl my-20'>
          {/* Header Section */}
          <div className='relative px-6 py-4'>
            <img
              src='./monika.jpg'
              alt='Profile'
              className='absolute z-20 -top-16 right-10 w-32 h-32 rounded-full object-cover border-4 border-white'
              loading='lazy'
            />
            <div className='p-2'>
              <h2 className='text-2xl font-semibold text-green-800'>
                Dr. John Smith
              </h2>
              <p className='font-medium'>(Head of Department)</p>
              <h2 className='font-light text-gray-700 mt-4 text-justify'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                quidem omnis quisquam facilis eos inventore ratione adipisci
                laboriosam aspernatur! Beatae vero odit consequatur est nostrum
                fugiat reprehenderit velit et nobis. Quia fuga, ea sed, quod
                ducimus sunt doloremque quas quibusdam vero porro laudantium
                recusandae quis facilis ut corrupti amet natus!
              </h2>
            </div>
          </div>
        </div>

        {/* Labs Section */}
        <div className='max-w-7xl mx-auto px-4 py-12'>
          <h2 className='text-3xl font-semibold text-green-900 mb-8 uppercase'>
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
                <div className='p-6 border-t-4 border-green-800'>
                  <h3 className='text-xl font-semibold text-green-800 mb-3'>
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

export default ElectricalDepartment;
