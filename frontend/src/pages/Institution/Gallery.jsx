import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HeroSection from "../../components/HeroSection";
import GalleryThumb from "../../components/GalleryThumb";
import Lightbox from "../../components/Lightbox";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import NoDataFound from "../../components/NoDataFound";
import { useGalleryImages } from "../../hooks/useResources";

const IMAGES_PER_PAGE = 9;

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
];

const pageButtonClass =
  "bg-gradient-to-b from-[#324E44] to-[#143429] text-white px-4 py-2 rounded-md text-sm font-medium hover:from-[#324E44]/90 hover:to-[#143429]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40";

const GallerySection = () => {
  const { images, loading, error, refresh } = useGalleryImages();
  const [currentPage, setCurrentPage] = useState(1);
  const [previewIndex, setPreviewIndex] = useState(null);
  const gridRef = useRef(null);

  const totalPages = Math.max(1, Math.ceil(images.length / IMAGES_PER_PAGE));
  const pageStart = (currentPage - 1) * IMAGES_PER_PAGE;
  const pageImages = images.slice(pageStart, pageStart + IMAGES_PER_PAGE);

  const changePage = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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
          <Error error={error} onRetry={refresh} />
        </div>
      ) : loading ? (
        <Loading title="Gallery Images" />
      ) : images.length === 0 ? (
        <NoDataFound title="Images" />
      ) : (
        <section id="gallery" className="py-24 bg-white">
          <div
            ref={gridRef}
            className="site-container flex flex-col gap-8 scroll-mt-4">
            {/* Page title */}
            <div>
              <h1 className="page-title mb-6">
                College <span className="text-black">Gallery</span>
              </h1>
            </div>

            {/* Gallery grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {pageImages.map((image, i) => (
                <GalleryThumb
                  key={image._id}
                  image={image}
                  index={pageStart + i}
                  onOpen={setPreviewIndex}
                  imgClassName="aspect-[4/3]"
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                aria-label="Gallery pages"
                className="flex justify-between items-center">
                <button
                  type="button"
                  aria-label="Previous page"
                  className={pageButtonClass}
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}>
                  <ChevronLeft />
                </button>
                <span className="text-sm font-medium" aria-live="polite">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  aria-label="Next page"
                  className={pageButtonClass}
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === totalPages}>
                  <ChevronRight />
                </button>
              </nav>
            )}
          </div>

          <Lightbox
            images={images}
            index={previewIndex}
            onClose={() => setPreviewIndex(null)}
            onNavigate={setPreviewIndex}
          />
        </section>
      )}
    </>
  );
};

export default GallerySection;
