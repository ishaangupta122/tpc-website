import ContentManager from "../../components/crud/ContentManager";
import { useAchievements } from "../../context";
import { ACHIEVEMENT_CATEGORY_OPTIONS } from "../../constants/options";

const config = {
  entity: "Achievement",
  title: "College Achievements",
  subtitle: "Manage college achievements",
  addLabel: "Add New Achievement",
  searchPlaceholder: "Search by Achievements...",
  emptyMessage: "No Achievements Found.",
  useResource: useAchievements,
  deleteLabel: (achievement) => achievement.title,
  filter: {
    field: "category",
    allLabel: "All Categories",
    options: ACHIEVEMENT_CATEGORY_OPTIONS,
  },
  fields: [
    {
      name: "title",
      label: "Achievement Title",
      type: "text",
      required: true,
      placeholder: "Enter Achievement Title",
      column: { header: "TITLE", truncate: 10, sortable: true },
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
      placeholder: "Enter Achievement Description",
      column: { header: "DESCRIPTION", truncate: 20 },
    },
    { type: "image", key: "image", label: "Image", required: true },
    {
      name: "category",
      label: "Category",
      type: "select",
      required: true,
      placeholder: "Select Category (College or a department)",
      options: ACHIEVEMENT_CATEGORY_OPTIONS,
      column: { header: "CATEGORY", badge: true },
    },
    {
      name: "date",
      label: "Date",
      type: "date",
      required: true,
      column: { header: "DATE", sortable: true },
    },
  ],
};

const AchievementsPage = () => <ContentManager config={config} />;

export default AchievementsPage;
