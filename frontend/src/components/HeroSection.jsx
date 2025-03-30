import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = ({ imageUrl, title, breadcrumbs }) => {
  return (
    <>
      <div className=''>
        <div className='relative'>
          {/* Full-width hero image */}
          <div className='w-full h-52 relative'>
            <img
              src={imageUrl}
              alt='Page Background'
              className='absolute inset-0 w-full h-full object-cover'
            />
            {/* Overlay to improve text readability */}
            <div className='absolute inset-0 bg-black bg-opacity-60'></div>

            {/* Centered title */}
            <div className='absolute inset-0 flex justify-center w-full'>
              <div className='flex justify-start items-center max-w-7xl w-full'>
                <div className='px-6 lg:px-16'>
                  <h1 className='text-4xl md:text-5xl font-semibold text-white uppercase'>
                    {title}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Breadcrumb navigation */}
        <div className='flex w-full justify-center items-center bg-gray-200'>
          <div className='flex w-full max-w-7xl px-6 lg:px-16 py-2'>
            {breadcrumbs.map((breadcrumb, index) => (
              <span key={index} className='flex items-center'>
                <Link
                  to={breadcrumb.href}
                  className={`font-medium ${
                    index === breadcrumbs.length - 1 ? "text-green-800" : ""
                  }`}>
                  {breadcrumb.label}
                </Link>
                {index < breadcrumbs.length - 1 && <ChevronRight />}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
