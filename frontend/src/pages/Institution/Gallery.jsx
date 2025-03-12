import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import HeroSection from "../../components/HeroSection";
import { fetchGalleryImages } from "../../context/GalleryContext";
import Loading from "../../components/Loading";

const GallerySection = () => {
  const [previewIndex, setPreviewIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const galleryRef = useRef(null);
  const staticImages = [
    "/rec_gate.jpg",
    "/ndli_award.jpg",
    "/girls_hostel.jpg",
    "/principal.jpeg",
    "/image2.jpeg",
    "/boys_hostel.jpg",
    "/campus.webp",
    "/image3.jpeg",
    "/ndli_award.jpg",
    "/image1.jpeg",
    "/rec_gate.jpg",
    "/principal.jpeg",
    "/girls_hostel.jpg",
    "/boys_hostel.jpg",
    "/image2.jpeg",
    "/image3.jpeg",
    "/campus.webp",
    "/image1.jpeg",
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/gallery" },
  ];
  const fetchImages = async () => {
    setLoading(true);
    const data = await fetchGalleryImages();
    const images = data.length === 0 ? staticImages : data;
    setImages(images);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const imagesPerPage = 9;
  const totalPages = Math.ceil(images.length / imagesPerPage);

  const paginatedImages = images.slice(
    (currentPage - 1) * imagesPerPage,
    currentPage * imagesPerPage
  );

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

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }

    // Ensure scrolling happens *after* the state update
    setTimeout(() => {
      const galleryElement = document.getElementById("gallery");
      if (galleryElement) {
        window.scrollTo({
          top: galleryElement.offsetTop - 100, // Adjust offset if needed
          behavior: "smooth",
        });
      }
    }, 100);
  };

  return (
    <>
      <HeroSection
        imageUrl='/rec_gate.jpg'
        title='College Gallery'
        breadcrumbs={breadcrumbs}
      />

      {loading ? (
        <>
          <Loading title='Gallery Images' />
        </>
      ) : (
        <section id='gallery' ref={galleryRef} className='py-24 bg-slate-100'>
          <div className='container mx-auto px-4 md:px-10 flex flex-col gap-8'>
            {/* Gallery Section */}
            <div className='w-full'>
              <div className={`grid  grid-cols-3 gap-2`}>
                {paginatedImages.map((img, index) => (
                  <div
                    key={index}
                    className='group relative overflow-hidden rounded-sm shadow-md cursor-pointer'
                    onClick={() =>
                      handlePreview(index + (currentPage - 1) * imagesPerPage)
                    }>
                    <img
                      src={img}
                      alt={`Campus Image ${index + 1}`}
                      className={
                        " h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105 bg-green-200/50"
                      }
                    />
                    <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300'></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Controls */}
            <div className='flex justify-between items-center'>
              <button
                className='bg-gradient-to-b from-[#324E44] to-[#143429] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gradient-to-b hover:from-[#324E44]/90 hover:to-[#143429]/90'
                onClick={() => handlePageChange("prev")}
                disabled={currentPage === 1}>
                <ChevronLeft />
              </button>
              <span className='text-sm font-medium'>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className='bg-gradient-to-b from-[#324E44] to-[#143429] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gradient-to-b hover:from-[#324E44]/90 hover:to-[#143429]/90'
                onClick={() => handlePageChange("next")}
                disabled={currentPage === totalPages}>
                <ChevronRight />
              </button>
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
      )}
    </>
  );
};

export default GallerySection;
