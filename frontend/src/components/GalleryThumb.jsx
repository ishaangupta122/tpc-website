// A gallery thumbnail. It is a real <button>, so it can be reached with Tab and
// opened with Enter/Space, and it shows a visible focus ring.
const GalleryThumb = ({
  image,
  index,
  onOpen,
  className = "",
  imgClassName = "aspect-[4/3]",
}) => (
  <button
    type="button"
    onClick={() => onOpen(index)}
    aria-label={
      image.description
        ? `View image ${index + 1}: ${image.description}`
        : `View image ${index + 1}`
    }
    className={`group relative block w-full overflow-hidden rounded-sm shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 focus-visible:ring-offset-2 ${className}`}>
    <img
      src={image.imageUrl}
      alt={image.description || "Campus Image"}
      loading="lazy"
      className={`${imgClassName} w-full object-cover transition-transform duration-300 group-hover:scale-105`}
    />
    <span className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
  </button>
);

export default GalleryThumb;
