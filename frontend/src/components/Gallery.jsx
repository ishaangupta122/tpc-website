import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, MoveRight, X } from "lucide-react";
import InstaEmbed from "./InstaEmbed";
import { fetchGalleryImages } from "../context/GalleryContext";
import Loading from "./Loading";
import Error from "./Error";
import { staticGalleryImages } from "../data/data";
import NoDataFound from "./NoDataFound";

const GallerySection = () => {
  const [previewId, setPreviewId] = useState(null);
  const [gridColumns, setGridColumns] = useState(3);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchGalleryImages();
      const images = data.length === 0 ? staticGalleryImages : data;
      setImages([]);
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
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handlePreview = (_id) => setPreviewId(_id);
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

  const displayedImages =
    gridColumns === 2 ? images.slice(0, 6) : images.slice(0, 9);

  const previewImage = images.find((img) => img._id === previewId);

  return (
    <section id="gallery" className="py-24 bg-slate-100">
      <div className="container mx-auto px-4 md:px-10 flex justify-between flex-wrap lg:flex-nowrap gap-8 w-full h-full">
        {/* Instagram Embed */}
        <InstaEmbed />

        {/* Gallery Section */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl md:text-3xl font-semibold uppercase text-emerald-900">
              College<span className="text-black"> Gallery</span>
            </h2>
            <Link
              to="/gallery"
              className="text-sm md:text-lg flex gap-1 items-center text-emerald-900 hover:underline font-medium">
              View All <MoveRight />
            </Link>
          </div>

          {error ? (
            <Error error={error} />
          ) : loading ? (
            <Loading title="Gallery Images" />
          ) : images.length === 0 ? (
            <NoDataFound title="Images" height="200px" />
          ) : (
            <div className={`grid grid-cols-${gridColumns} gap-2`}>
              {displayedImages.map((img) => (
                <div
                  key={img._id}
                  className="group relative overflow-hidden rounded-sm shadow-md cursor-pointer"
                  onClick={() => handlePreview(img._id)}>
                  <img
                    src={img.imageUrl}
                    alt={img.description || `Campus Image`}
                    className="h-32 lg:h-28 xl:h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
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
          <img
            src={previewImage.imageUrl}
            alt={previewImage.description || `Preview Image`}
            className="max-w-[80vw] md:max-w-4xl md:max-h-[85vh] rounded-lg shadow-2xl text-white"
          />
          <button
            className="absolute right-5 text-white text-4xl hover:bg-white/20 rounded-full p-2"
            onClick={showNext}>
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
