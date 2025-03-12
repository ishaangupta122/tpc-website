import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Trash2,
  AlertCircle,
  Eye,
  PenBoxIcon,
} from "lucide-react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import {
  fetchAchievement,
  deleteAchievement,
} from "../context/AchievementsContext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import AddAchievementsModal from "./Add";
import ViewAchievementsModal from "./View";
import EditAchievementsModal from "./Edit";
import TruncateText from "../components/TruncateText";
import { Button } from "primereact/button";

const Achievements = () => {
  const [loading, setLoading] = useState(false);
  const [achievements, setAchievement] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState(null);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    setLoading(true);
    const data = await fetchAchievement();
    setAchievement(data);
    setLoading(false);
  };

  const refreshData = () => {
    fetchAchievements();
  };

  const handleViewAchievement = (achievement) => {
    setCurrentAchievement(achievement);
    setIsViewDialogOpen(true);
  };

  const handleEditAchievement = (achievement) => {
    setCurrentAchievement(achievement);
    setIsEditDialogOpen(true);
  };

  const handleDeleteAchievement = (achievement) => {
    confirmDialog({
      message: `Are you sure you want to delete "${achievement.title}" ?`,
      header: "Confirm Deletion",
      icon: <AlertCircle size={30} />,
      acceptClassName: "p-button-danger",
      rejectClassName: "p-button-secondary",
      accept: async () => {
        await deleteAchievement(achievement._id);
        fetchAchievements();
        console.log(`Achievement Deleted: \n`, achievement.title);
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
        onClick={() => handleViewAchievement(rowData)}
        tooltip='View'
      />
      <Button
        icon={<PenBoxIcon />}
        className='p-button-text p-button-warning'
        onClick={() => handleEditAchievement(rowData)}
        tooltip='Edit'
      />
      <Button
        icon={<Trash2 />}
        className='p-button-text p-button-danger'
        onClick={() => handleDeleteAchievement(rowData)}
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

  const filteredAchievements = achievements.filter((achievement) => {
    const matchesSearch =
      achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      achievement.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className='p-6 space-y-6 max-w-7xl'>
      <div className='flex justify-between items-center bg-white p-4 rounded-lg border border-neutral-200/60'>
        <div>
          <h1 className='text-2xl font-bold text-neutral-800'>
            College Achievements
          </h1>
          <p className='text-neutral-500'>Manage college achievements</p>
        </div>
        <Button
          icon={<Plus />}
          label={"Add New Achievement"}
          className='p-button-success space-x-2'
          onClick={() => setIsAddDialogOpen(true)}
        />
      </div>

      {/* Filters */}
      <div className='flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-lg border border-neutral-200/60'>
        <div className='flex flex-col sm:flex-row gap-4 flex-grow'>
          <div className='relative flex-grow'>
            <input
              type='search'
              placeholder='Search by title or tag...'
              className='w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className='w-5 h-5 absolute left-3 top-2.5 text-neutral-400' />
          </div>
          <select
            className='px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500'
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}>
            <option>All Categories</option>
            <option>Featured</option>
            <option>Academic</option>
            <option>Achievements</option>
            <option>Events</option>
            <option>Admissions</option>
            <option>Placements</option>
          </select>
        </div>
      </div>

      <div className='bg-white border border-neutral-200/30 rounded-md overflow-hidden'>
        <DataTable
          value={filteredAchievements}
          paginator
          rows={10}
          loading={loading}
          emptyMessage='No Achivements Found.'
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
          <Column field='category' header='CATEGORY' body={categoryTemplate} />
          <Column header='ACTIONS' body={actionTemplate} />
        </DataTable>
      </div>

      <AddAchievementsModal
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        refreshData={refreshData}
      />
      <ViewAchievementsModal
        isOpen={isViewDialogOpen}
        onClose={(e) => {
          e.preventDefault(), setIsViewDialogOpen(false);
        }}
        selectedAchievement={currentAchievement}
      />
      <EditAchievementsModal
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        selectedAchievement={currentAchievement}
        refreshData={refreshData}
      />

      <ConfirmDialog />
    </section>
  );
};

export default Achievements;
