import HeroSection from "../../components/HeroSection";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSuccessStoryById } from "../../context/SuccessStoriesContext";
import Loading from "../../components/Loading";

const SuccessStory = () => {
  const { storyId } = useParams();
  const [successStory, setSuccessStory] = useState(null);
  const [loading, setLoading] = useState(true);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    {
      label: successStory?.title || "Success Story Details",
      href: `/success-story/${storyId}`,
    },
  ];

  const fetchStory = async () => {
    setLoading(true);
    const data = await fetchSuccessStoryById(storyId);
    setSuccessStory(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStory();
  }, [storyId]);

  return (
    <>
      <HeroSection
        imageUrl='/rec_gate.jpg'
        title='Success Story'
        breadcrumbs={breadcrumbs}
      />
      {loading ? (
        <>
          <Loading title='Success Story Details' />
        </>
      ) : (
        <div className='mx-4'>
          <div className='container bg-gray-100 max-w-5xl mx-auto px-4 md:px-6 py-5 lg:py-16 my-10 shadow-lg rounded-lg flex items-start justify-start flex-wrap md:flex-nowrap md:space-x-8'>
            <div className='w-full md:w-1/2 mb-5 md:m-0 h-64 md:h-72'>
              <img
                src={successStory.image || "/monika.jpg"}
                alt='Student Success Story'
                className='w-full h-full rounded-lg object-cover shadow-md'
              />
            </div>
            <div className='w-full md:w-1/2 '>
              <h2 className='text-3xl font-semibold text-green-900 mb-4 flex items-center'>
                {successStory.title}
              </h2>
              <p className='text-gray-700 text-md leading-relaxed'>
                {successStory.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessStory;
