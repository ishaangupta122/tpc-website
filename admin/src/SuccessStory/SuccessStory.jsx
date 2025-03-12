import { useEffect, useState } from "react";
import {
  Trash2,
  Eye,
  PenBoxIcon,
  AlertCircle,
  Plus,
  Search,
} from "lucide-react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import TruncateText from "../components/TruncateText";
import { deleteStory, getAllStories } from "../context/SuccessStoryContext";
import ViewSuccessStoryModal from "./View";
import EditSuccessStoryModal from "./Edit";
import AddSuccessStoryModal from "./Add";

const SuccessStory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [successStory, setSuccessStory] = useState([]);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentStory, setCurrentStory] = useState();

  useEffect(() => {
    fetchSuccessStories();
  }, []);

  const fetchSuccessStories = async () => {
    setLoading(true);
    const data = await getAllStories();
    setSuccessStory(data);
    setLoading(false);
  };

  const refreshData = () => {
    fetchSuccessStories();
  };

  const handleViewMember = (event) => {
    setCurrentStory(event);
    setIsViewDialogOpen(true);
  };

  const handleEditMember = (event) => {
    setCurrentStory(event);
    setIsEditDialogOpen(true);
  };

  const handleDeleteMember = (story) => {
    confirmDialog({
      message: `Are you sure you want to delete "${story.title}" ?`,
      header: "Confirm Deletion",
      icon: <AlertCircle size={30} />,
      acceptClassName: "p-button-danger",
      rejectClassName: "p-button-secondary",
      accept: async () => {
        await deleteStory(story._id);
        fetchSuccessStories();
        console.log(`Success Story Deleted: \n`, story.title);
      },
      reject: () => {
        console.log("Delete action canceled");
      },
    });
  };

  const actionTemplate = (rowData) => (
    <div className='flex gap-1'>
      <Button
        icon={<Eye />}
        className='p-button-text p-button-info'
        onClick={() => handleViewMember(rowData)}
        tooltip='View'
      />
      <Button
        icon={<PenBoxIcon />}
        className='p-button-text p-button-warning'
        onClick={() => handleEditMember(rowData)}
        tooltip='Edit'
      />
      <Button
        icon={<Trash2 />}
        className='p-button-text p-button-danger'
        onClick={() => handleDeleteMember(rowData)}
        tooltip='Delete'
      />
    </div>
  );

  const filteredStories = successStory.filter(
    (story) =>
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const titleTemplate = (rowData) => (
    <TruncateText text={rowData.title} maxLength={10} />
  );

  const descriptionTemplate = (rowData) => (
    <TruncateText text={rowData.description} maxLength={30} />
  );

  return (
    <section className='p-6 space-y-6 max-w-7xl'>
      <div className='flex justify-between items-center bg-white p-4 rounded-lg border border-neutral-200/60'>
        <div>
          <h1 className='text-2xl font-bold text-neutral-800'>
            Success Stories
          </h1>
          <p className='text-neutral-500'>
            Manage and organize success stories
          </p>
        </div>
        <Button
          icon={<Plus />}
          label={"Add Success Story"}
          className='p-button-success space-x-2'
          onClick={() => setIsAddDialogOpen(true)}
        />
      </div>

      <div className='flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-lg border border-neutral-200/60'>
        <div className='relative flex-grow'>
          <input
            type='search'
            placeholder='Search success story...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500'
          />
          <Search className='w-5 h-5 absolute left-3 top-2.5 text-neutral-400' />
        </div>
      </div>

      <div className='bg-white border border-neutral-200/30 rounded-md overflow-hidden'>
        <DataTable
          value={filteredStories}
          paginator
          rows={10}
          loading={loading}
          emptyMessage='No Success Stories Found.'
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

          <Column
            field='image'
            header='IMAGE'
            body={(rowData) => (
              <img
                src={rowData.image}
                alt={rowData.image}
                className='w-24 h-16 rounded-md border border-neutral-300'
              />
            )}
          />
          <Column header='ACTIONS' body={actionTemplate} />
        </DataTable>
      </div>

      <AddSuccessStoryModal
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        refreshData={refreshData}
      />
      <ViewSuccessStoryModal
        isOpen={isViewDialogOpen}
        onClose={(e) => {
          e.preventDefault(), setIsViewDialogOpen(false);
        }}
        selectedStory={currentStory}
      />
      <EditSuccessStoryModal
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        selectedStory={currentStory}
        refreshData={refreshData}
      />

      <ConfirmDialog />
    </section>
  );
};

export default SuccessStory;
