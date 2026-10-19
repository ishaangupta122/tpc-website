import ContentManager from "../../components/crud/ContentManager";
import { useGallery } from "../../context";

const config = {
  entity: "Image",
  title: "Gallery",
  subtitle: "Manage and organize gallery images",
  addLabel: "Add Gallery Images",
  searchPlaceholder: "Search Gallery...",
  emptyMessage: "No Images Found.",
  useResource: useGallery,
  deleteLabel: (image) => image.description,
  fields: [
    // The gallery API returns the picture as `imageUrl`.
    { type: "image", key: "imageUrl", label: "Image", required: true },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
      placeholder: "Enter Image Description",
      column: { header: "DESCRIPTION", truncate: 30 },
    },
  ],
};

const GalleryPage = () => <ContentManager config={config} />;

export default GalleryPage;
