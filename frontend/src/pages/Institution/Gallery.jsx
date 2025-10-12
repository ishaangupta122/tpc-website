import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import HeroSection from "../../components/HeroSection";
import { fetchGalleryImages } from "../../context/GalleryContext";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { staticGalleryImages } from "../../data/data";

const GallerySection = () => {
  const [previewId, setPreviewId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const galleryRef = useRef(null);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/gallery" },
  ];

  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchGalleryImages();
      const images = data.length === 0 ? staticGalleryImages : data;
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

  const imagesPerPage = 9;
  const totalPages = Math.ceil(images.length / imagesPerPage);

  const paginatedImages = images.slice(
    (currentPage - 1) * imagesPerPage,
    currentPage * imagesPerPage
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (previewId === null) return;

      if (event.key === "Escape") {
        setPreviewId(null);
      } else if (event.key === "ArrowLeft") {
        showPrevious();
      } else if (event.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewId, images]);

  const handlePreview = (id) => setPreviewId(id);
  const closePreview = () => setPreviewId(null);

  const showPrevious = () => {
    const currentIndex = images.findIndex((img) => img._id === previewId);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setPreviewId(images[prevIndex]._id);
  };

  const showNext = () => {
    const currentIndex = images.findIndex((img) => img._id === previewId);
    const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setPreviewId(images[nextIndex]._id);
  };

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }

    setTimeout(() => {
      const galleryElement = document.getElementById("gallery");
      if (galleryElement) {
        window.scrollTo({
          top: galleryElement.offsetTop - 100,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  return (
    <>
      <HeroSection
        imageUrl="/rec_gate.jpg"
        title="College Gallery"
        breadcrumbs={breadcrumbs}
      />

      {error ? (
        <div className="flex justify-center items-center w-full h-[50vh]">
          <Error error={error} />
        </div>
      ) : loading ? (
        <Loading title="Gallery Images" />
      ) : images.length === 0 ? (
        <NoDataFound title="Images" height="200px" />
      ) : (
        <section id="gallery" ref={galleryRef} className="py-24 bg-slate-100">
          <div className="container mx-auto px-4 md:px-10 flex flex-col gap-8">
            {/* Gallery Grid */}
            <div className="grid grid-cols-3 gap-2">
              {paginatedImages.map((img) => (
                <div
                  key={img._id}
                  className="group relative overflow-hidden rounded-sm shadow-md cursor-pointer"
                  onClick={() => handlePreview(img._id)}>
                  <img
                    src={img.imageUrl}
                    alt={img.description || "Campus Image"}
                    className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center">
              <button
                className="bg-gradient-to-b from-[#324E44] to-[#143429] text-white px-4 py-2 rounded-md text-sm font-medium hover:from-[#324E44]/90 hover:to-[#143429]/90"
                onClick={() => handlePageChange("prev")}
                disabled={currentPage === 1}>
                <ChevronLeft />
              </button>
              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="bg-gradient-to-b from-[#324E44] to-[#143429] text-white px-4 py-2 rounded-md text-sm font-medium hover:from-[#324E44]/90 hover:to-[#143429]/90"
                onClick={() => handlePageChange("next")}
                disabled={currentPage === totalPages}>
                <ChevronRight />
              </button>
            </div>
          </div>

          {/* Image Preview Modal */}
          {previewId !== null && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
              <button
                className="absolute top-6 right-10 text-white hover:bg-white/20 text-3xl font-light"
                onClick={closePreview}>
                <X className="h-8 w-8" />
              </button>
              <button
                className="absolute left-5 text-white text-4xl hover:bg-white/20 rounded-full p-2"
                onClick={showPrevious}>
                <ChevronLeft className="h-8 w-8" />
              </button>
              {(() => {
                const image = images.find((img) => img._id === previewId);
                return (
                  image && (
                    <img
                      src={image.imageUrl}
                      alt={image.description || `Preview Image`}
                      className="max-w-[80vw] md:max-w-4xl md:max-h-[85vh] rounded-lg shadow-2xl text-white"
                    />
                  )
                );
              })()}
              <button
                className="absolute right-5 text-white text-4xl hover:bg-white/20 rounded-full p-2"
                onClick={showNext}>
                <ChevronRight className="h-8 w-8" />
              </button>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default GallerySection;
