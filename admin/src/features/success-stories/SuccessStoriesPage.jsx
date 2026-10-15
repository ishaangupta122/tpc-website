import ContentManager from "../../components/crud/ContentManager";
import { useSuccessStories } from "../../context";

const config = {
  entity: "Success Story",
  title: "Success Stories",
  subtitle: "Manage and organize success stories",
  addLabel: "Add Success Story",
  searchPlaceholder: "Search Success Stories...",
  emptyMessage: "No Success Stories Found.",
  useResource: useSuccessStories,
  deleteLabel: (story) => story.title,
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
      placeholder: "Enter Success Story Title",
      column: { header: "TITLE", truncate: 10, sortable: true },
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
      placeholder: "Enter Success Story Description",
      column: { header: "DESCRIPTION", truncate: 20 },
    },
    { type: "image", key: "image", label: "Image", required: true },
  ],
};

const SuccessStoriesPage = () => <ContentManager config={config} />;

export default SuccessStoriesPage;
