import ContentManager from "../../components/crud/ContentManager";
import { useEvents } from "../../context";
import { EVENT_CATEGORY_OPTIONS } from "../../constants/options";

const config = {
  entity: "Event",
  title: "Events",
  subtitle: "Manage college and department events & updates",
  addLabel: "Add New Event",
  searchPlaceholder: "Search by Events...",
  emptyMessage: "No Events Found.",
  blocks: true,
  useResource: useEvents,
  deleteLabel: (event) => event.title,
  filter: {
    field: "category",
    allLabel: "All Categories",
    options: EVENT_CATEGORY_OPTIONS,
  },
  fields: [
    {
      name: "title",
      label: "Event Title",
      type: "text",
      required: true,
      placeholder: "Enter Event Title",
      column: { header: "TITLE", truncate: 10, sortable: true },
    },
    { type: "image", key: "image", label: "Image", required: true },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      hint: "Leave a blank line between paragraphs.",
      required: true,
      placeholder: "Enter Event Description",
      column: { header: "DESCRIPTION", truncate: 20 },
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      required: true,
      placeholder: "Select Category (College or a department)",
      options: EVENT_CATEGORY_OPTIONS,
      column: { header: "CATEGORY", badge: true },
    },
    {
      name: "date",
      label: "Date",
      type: "date",
      required: true,
      column: { header: "DATE", sortable: true, sortField: "dateIso" },
    },
  ],
};

const EventsPage = () => <ContentManager config={config} />;

export default EventsPage;
