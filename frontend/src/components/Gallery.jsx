import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, MoveRight, X } from "lucide-react";
import InstaEmbed from "./InstaEmbed";
import { fetchGalleryImages } from "../context/GalleryContext";
import Loading from "./Loading";
import Error from "./Error";

const GallerySection = () => {
  const [previewIndex, setPreviewIndex] = useState(null);
  const [gridColumns, setGridColumns] = useState(3);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const staticImages = [
    "/rec_gate.jpg",
    "/ndli_award.jpg",
    "/girls_hostel.jpg",
    "/principal.jpeg",
    "/image2.jpeg",
    "/boys_hostel.jpg",
    "/campus.webp",
    "/image1.jpeg",
    "/image3.jpeg",
  ];

  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchGalleryImages();
      const images = data.length === 0 ? staticImages : data;
      setImages(images);
    } catch (error) {
      setError(error.message || "Failed to fetch images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setGridColumns(window.innerWidth < 1024 ? 2 : 3);
    };

    // Set initial grid columns
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && previewIndex !== null) {
        setPreviewIndex(null);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [previewIndex]);

  const handlePreview = (index) => setPreviewIndex(index);
  const closePreview = () => setPreviewIndex(null);
  const showPrevious = () =>
    setPreviewIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  const showNext = () =>
    setPreviewIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));

  const displayedImages =
    gridColumns === 2 ? images.slice(0, 6) : images.slice(0, 9);

  return (
    <section id='gallery' className='py-24 bg-slate-100'>
      <div className='container mx-auto px-4 md:px-10 flex justify-between flex-wrap lg:flex-nowrap gap-8'>
        {/* FAQ Section */}
        {/* <Faqs /> */}

        {/* Instagram Embed */}
        <InstaEmbed />

        {/* Gallery Section or Loading State */}
        <div className='w-full'>
          <div className='flex items-center justify-between mb-8'>
            <h2 className='text-xl md:text-3xl font-semibold uppercase text-emerald-900 '>
              College<span className='text-black'> Gallery</span>
            </h2>
            <Link
              to='/gallery'
              className='text-sm md:text-lg flex gap-1 items-center text-emerald-900 hover:underline  font-medium'>
              View All{" "}
              <span>
                <MoveRight />
              </span>
            </Link>
          </div>
          {error ? (
            <Error error={error} />
          ) : loading ? (
            <>
              <Loading title='Gallery Images' />
            </>
          ) : (
            <>
              <div className={`grid grid-cols-${gridColumns} gap-2`}>
                {displayedImages.map((img, index) => (
                  <div
                    key={index}
                    className='group relative overflow-hidden rounded-sm shadow-md cursor-pointer'
                    onClick={() => handlePreview(index)}>
                    <img
                      src={img}
                      alt={`Campus Image ${index + 1}`}
                      className={
                        "h-32 lg:h-28 xl:h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105 bg-emerald-200/50"
                      }
                    />
                    <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300'></div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewIndex !== null && (
        <div className='fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50'>
          <button
            className='absolute top-6 right-10 text-white hover:bg-white/20 text-3xl font-light'
            onClick={closePreview}>
            <X className='h-8 w-8' />
          </button>
          <button
            className='absolute left-5 text-white text-4xl hover:bg-white/20 rounded-full p-2'
            onClick={showPrevious}>
            <ChevronLeft className='h-8 w-8' />
          </button>
          <img
            src={images[previewIndex]}
            alt={`Preview Image ${previewIndex + 1}`}
            className='max-w-[80vw] md:max-w-4xl md:max-h-[85vh] rounded-lg shadow-2xl text-white'
          />
          <button
            className='absolute right-5 text-white text-4xl hover:bg-white/20 rounded-full p-2'
            onClick={showNext}>
            <ChevronRight className='h-8 w-8' />
          </button>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
