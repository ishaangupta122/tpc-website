import {
  AlertCircle,
  Eye,
  PenBoxIcon,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import AddFacultyModal from "./Add";
import EditFacultyModal from "./Edit";
import ViewFacultyModal from "./View";
import { deleteFaculty, fetchFaculty } from "../context/FacultyContext";

const FacultyList = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentFaculty, setCurrentFaculty] = useState(null);

  useEffect(() => {
    fetchFacultyList();
  }, []);

  const fetchFacultyList = async () => {
    setLoading(true);
    const data = await fetchFaculty();
    setFacultyList(data);
    setLoading(false);
  };

  const refreshData = () => {
    fetchFacultyList();
  };

  const handleViewFaculty = (faculty) => {
    setCurrentFaculty(faculty);
    setIsViewDialogOpen(true);
  };

  const handleEditFaculty = (faculty) => {
    setCurrentFaculty(faculty);
    setIsEditDialogOpen(true);
  };

  const handleDeleteFaculty = (faculty) => {
    confirmDialog({
      message: `Are you sure you want to delete "${faculty.name}" ?`,
      header: "Confirm Deletion",
      icon: <AlertCircle size={30} />,
      acceptClassName: "p-button-danger",
      rejectClassName: "p-button-secondary",
      accept: async () => {
        await deleteFaculty(faculty._id);
        fetchFacultyList();
        console.log(`Faculty Deleted: \n`, faculty.name);
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
        onClick={() => handleViewFaculty(rowData)}
        tooltip='View'
      />
      <Button
        icon={<PenBoxIcon />}
        className='p-button-text p-button-warning'
        onClick={() => handleEditFaculty(rowData)}
        tooltip='Edit'
      />
      <Button
        icon={<Trash2 />}
        className='p-button-text p-button-danger'
        onClick={() => handleDeleteFaculty(rowData)}
        tooltip='Delete'
      />
    </div>
  );

  const contactTemplate = (rowData) => (
    <div className='flex flex-col'>
      <span className=' text-gray-900'>{rowData.email}</span>
      <span className=' text-gray-600'>{rowData.phone}</span>
    </div>
  );

  const experienceTemplate = (rowData) => {
    return <span className=' text-gray-600'>{rowData.experience} Years</span>;
  };

  const filteredFaculty = facultyList.filter(
    (faculty) =>
      (faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedDepartment === "" || faculty.department === selectedDepartment)
  );

  return (
    <section id='faculty-management' className='p-6 space-y-6 max-w-7xl'>
      <div className='flex justify-between items-center bg-white p-4 rounded-lg border border-neutral-200/60'>
        <div>
          <h1 className='text-2xl font-bold text-neutral-800'>
            Faculty Management
          </h1>
          <p className='text-neutral-500'>
            Manage and organize faculty members
          </p>
        </div>
        <Button
          icon={<Plus />}
          label={"Add New Faculty"}
          className='p-button-success space-x-2'
          onClick={() => setIsAddDialogOpen(true)}
        />
      </div>

      {/* Filters and Search */}
      <div className='flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-lg border border-neutral-200/60'>
        <div className='relative flex-grow'>
          <input
            type='search'
            placeholder='Search faculty...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500'
          />
          <Search className='w-5 h-5 absolute left-3 top-2.5 text-neutral-400' />
        </div>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className='px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500'>
          <option value=''>All Departments</option>
          <option value='Admin Staff'>Admin Staff</option>
          <option value='Applied Science'>Applied Science</option>
          <option value='Architechtural Assitantship'>
            Architechtural Assitantship
          </option>
          <option value='Computer Science Engineering'>Computer Science</option>
          <option value='Electrical Engineering'>Electrical Engineering</option>
          <option value='Mechanical Engineering'>Mechanical Engineering</option>
          <option value='Civil Engineering'>Civil Engineering</option>
        </select>
      </div>

      <div className='bg-white border border-neutral-200/30 rounded-md overflow-hidden'>
        <DataTable
          value={filteredFaculty}
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
          <Column
            field='image'
            header='IMAGE'
            body={(rowData) => (
              <img
                src={rowData.image}
                alt='image'
                className='w-16 h-16 rounded-full border border-neutral-300'
              />
            )}
          />
          <Column field='name' header='NAME' sortable />
          <Column
            field='contact'
            header='CONTACT DETAILS'
            body={contactTemplate}
          />
          <Column field='department' header='DEPARTMENT' />
          <Column field='designation' header='DESIGNATION' />
          <Column
            field='experience'
            header='EXPERIENCE'
            body={experienceTemplate}
          />
          <Column field='joinedDate' header='JOINED DATE' />
          <Column field='education' header='EDUCATION' />
          <Column header='ACTIONS' body={actionTemplate} />
        </DataTable>
      </div>

      <AddFacultyModal
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        refreshData={refreshData}
      />
      <ViewFacultyModal
        isOpen={isViewDialogOpen}
        onClose={(e) => {
          e.preventDefault(), setIsViewDialogOpen(false);
        }}
        selectedFaculty={currentFaculty}
      />
      <EditFacultyModal
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        selectedFaculty={currentFaculty}
        refreshData={refreshData}
      />

      <ConfirmDialog />
    </section>
  );
};

export default FacultyList;
