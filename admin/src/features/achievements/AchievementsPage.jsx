import ContentManager from "../../components/crud/ContentManager";
import { useAchievements } from "../../context";

const config = {
  entity: "Achievement",
  title: "College Achievements",
  subtitle: "Manage college achievements",
  addLabel: "Add New Achievement",
  searchPlaceholder: "Search by Achievements...",
  emptyMessage: "No Achievements Found.",
  useResource: useAchievements,
  blocks: true,
  deleteLabel: (achievement) => achievement.title,
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
      hint: "Leave a blank line between paragraphs.",
      column: { header: "DESCRIPTION", truncate: 20 },
    },
    { type: "image", key: "image", label: "Image", required: true },
    {
      name: "date",
      label: "Date",
      type: "date",
      required: true,
      column: { header: "DATE", sortable: true, sortField: "dateIso" },
    },
  ],
};

const AchievementsPage = () => <ContentManager config={config} />;

export default AchievementsPage;
