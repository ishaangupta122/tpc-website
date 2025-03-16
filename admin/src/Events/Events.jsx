import { useState, useEffect } from "react";
import {
  AlertCircle,
  Eye,
  PenBoxIcon,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { deleteEvent, getAllEvents } from "../context/EventContext";
import AddEventsModal from "./Add";
import EditEventsModal from "./Edit";
import ViewEventsModal from "./View";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import TruncateText from "../components/TruncateText";

const EventsCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    const data = await getAllEvents();
    setEvents(data);
    setLoading(false);
  };

  const refreshData = () => {
    fetchEvents();
  };

  const handleViewEvent = (event) => {
    setCurrentEvent(event);
    setIsViewDialogOpen(true);
  };

  const handleEditEvent = (event) => {
    setCurrentEvent(event);
    setIsEditDialogOpen(true);
  };

  const handleDeleteEvent = (event) => {
    confirmDialog({
      message: `Are you sure you want to delete "${event.title}" ?`,
      header: "Confirm Deletion",
      icon: <AlertCircle size={30} />,
      acceptClassName: "p-button-danger",
      rejectClassName: "p-button-secondary",
      accept: async () => {
        await deleteEvent(event._id);
        fetchEvents();
        console.log(`Event Deleted: \n`, event.title);
      },
      reject: () => {
        console.log("Delete action canceled");
      },
    });
  };

  const filteredEvents = events.filter(
    (event) =>
      (event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "" || event.category === selectedCategory)
  );

  const actionTemplate = (rowData) => (
    <div className='flex gap-1'>
      <Button
        icon={<Eye />}
        className='p-button-text p-button-info'
        onClick={() => handleViewEvent(rowData)}
        tooltip='View'
      />
      <Button
        icon={<PenBoxIcon />}
        className='p-button-text p-button-warning'
        onClick={() => handleEditEvent(rowData)}
        tooltip='Edit'
      />
      <Button
        icon={<Trash2 />}
        className='p-button-text p-button-danger'
        onClick={() => handleDeleteEvent(rowData)}
        tooltip='Delete'
      />
    </div>
  );

  const categoryTemplate = (rowData) => {
    return (
      <>
        {[
          "CSE",
          "Mechanical",
          "Civil",
          "Architectural",
          "Applied Science",
          "Electrical",
        ].includes(rowData.category) && (
          <div className='bg-green-100 text-green-700 px-3 py-1 rounded-full w-fit'>
            {rowData.category}
          </div>
        )}
        {["Faculty"].includes(rowData.category) && (
          <div className='bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full w-fit'>
            {rowData.category}
          </div>
        )}
        {["Student"].includes(rowData.category) && (
          <div className='bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full w-fit'>
            {rowData.category}
          </div>
        )}
        {["College"].includes(rowData.category) && (
          <div className='bg-red-100 text-red-700 px-3 py-1 rounded-full w-fit'>
            {rowData.category}
          </div>
        )}
      </>
    );
  };

  const titleTemplate = (rowData) => (
    <TruncateText text={rowData.title} maxLength={10} />
  );

  const descriptionTemplate = (rowData) => (
    <TruncateText text={rowData.description} maxLength={20} />
  );

  return (
    <section id='events-calendar' className='p-6 space-y-6 max-w-7xl'>
      <div className='flex justify-between items-center bg-white p-4 rounded-lg border border-neutral-200/60'>
        <div>
          <h1 className='text-2xl font-bold text-neutral-800'>
            Events & Updates
          </h1>
          <p className='text-neutral-500'>
            Manage and schedule college events & updates
          </p>
        </div>
        <Button
          icon={<Plus />}
          label={"Add New Event"}
          className='p-button-success space-x-2'
          onClick={() => setIsAddDialogOpen(true)}
        />
      </div>

      <div className='flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-lg border border-neutral-200/60'>
        <div className='relative flex-grow'>
          <input
            type='search'
            placeholder='Search events...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500'
          />
          <Search className='w-5 h-5 absolute left-3 top-2.5 text-neutral-400' />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className='px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500'>
          <option value=''>All Categories</option>
          <option value='College'>College</option>
          <option value='Faculty'>Faculty</option>
          <option value='Student'>Student</option>
          <option value='Applied Science'>Applied Science</option>
          <option value='Architectural'>Architectural Assistantship</option>
          <option value='Civil'>Civil Engineering</option>
          <option value='CSE'>Computer Science Engineering</option>
          <option value='Electrical'>Electrical Engineering</option>
          <option value='Mechanical'>Mechanical Engineering</option>
        </select>
      </div>

      <div className='bg-white border border-neutral-200/30 rounded-md overflow-hidden'>
        <DataTable
          value={filteredEvents}
          paginator
          rows={10}
          loading={loading}
          emptyMessage='No events found.'
          responsiveLayout='scroll'>
          <Column
            header='S.NO'
            body={(rowData, { rowIndex }) => rowIndex + 1}
            style={{ textAlign: "center" }}
          />
          <Column field='title' header='TITLE' body={titleTemplate} sortable />
          <Column
            field='description'
            header='DESCRIPTION'
            body={descriptionTemplate}
          />
          <Column field='date' header='DATE' sortable />
          <Column
            field='imageUrl'
            header='IMAGE'
            body={(rowData) => (
              <img
                src={rowData.image}
                alt='Image'
                className='w-24 h-16 rounded-md border border-neutral-300'
              />
            )}
          />
          <Column field='category' header='CATEGORY' body={categoryTemplate} />
          <Column header='ACTIONS' body={actionTemplate} />
        </DataTable>
      </div>

      <AddEventsModal
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        refreshData={refreshData}
      />
      <ViewEventsModal
        isOpen={isViewDialogOpen}
        onClose={(e) => {
          e.preventDefault(), setIsViewDialogOpen(false);
        }}
        selectedEvent={currentEvent}
      />
      <EditEventsModal
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        selectedEvent={currentEvent}
        refreshData={refreshData}
      />

      <ConfirmDialog />
    </section>
  );
};

export default EventsCalendar;
