import ContentManager from "../../components/crud/ContentManager";
import { useEvents } from "../../context";

const config = {
  entity: "Event",
  title: "Events",
  subtitle: "Manage and schedule college events & updates",
  addLabel: "Add New Event",
  searchPlaceholder: "Search by Events...",
  emptyMessage: "No Events Found.",
  useResource: useEvents,
  deleteLabel: (event) => event.title,
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
      required: true,
      placeholder: "Enter Event Description",
      column: { header: "DESCRIPTION", truncate: 20 },
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

const EventsPage = () => <ContentManager config={config} />;

export default EventsPage;
