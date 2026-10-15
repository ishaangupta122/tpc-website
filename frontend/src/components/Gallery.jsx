import { useState } from "react";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { useGalleryImages } from "../hooks/useResources";
import InstaEmbed from "./InstaEmbed";
import GalleryThumb from "./GalleryThumb";
import Lightbox from "./Lightbox";
import Loading from "./Loading";
import Error from "./Error";
import NoDataFound from "./NoDataFound";

const GallerySection = () => {
  const { images, loading, error, refresh } = useGalleryImages();
  const [previewIndex, setPreviewIndex] = useState(null);

  // 6 thumbnails on small screens (2 columns x 3 rows) and 8 on large screens
  // (4 columns x 2 rows); the extra two are hidden with CSS, so no resize
  // listener is needed.
  const preview = images.slice(0, 8);

  return (
    <section id="gallery" className="py-24 bg-slate-100">
      <div className="site-container flex justify-between flex-wrap lg:flex-nowrap gap-8 w-full h-full">
        {/* Instagram Embed */}
        <InstaEmbed />

        {/* Gallery Section: on large screens it is exactly as tall as the
            Instagram card, and the thumbnails fill the space left under the heading. */}
        <div className="w-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title with-rule">
              College<span className="text-black"> Gallery</span>
            </h2>
            <Link
              to="/gallery"
              className="text-sm md:text-lg flex gap-1 items-center text-emerald-900 hover:underline font-medium">
              View All <MoveRight />
            </Link>
          </div>

          {error ? (
            <Error error={error} onRetry={refresh} />
          ) : loading ? (
            <Loading title="Gallery Images" />
          ) : images.length === 0 ? (
            <NoDataFound title="Images" />
          ) : (
            <div className="flex-1 min-h-0 grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-2">
              {preview.map((image, index) => (
                <GalleryThumb
                  key={image._id}
                  image={image}
                  index={index}
                  onOpen={setPreviewIndex}
                  className={`lg:h-full ${index >= 6 ? "hidden lg:block" : ""}`}
                  imgClassName="aspect-[4/3] lg:aspect-auto lg:h-full"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Lightbox
        images={images}
        index={previewIndex}
        onClose={() => setPreviewIndex(null)}
        onNavigate={setPreviewIndex}
      />
    </section>
  );
};

export default GallerySection;
