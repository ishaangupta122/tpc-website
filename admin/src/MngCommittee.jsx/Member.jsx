import { useEffect, useState } from "react";
import {
  Trash2,
  Eye,
  PenBoxIcon,
  AlertCircle,
  Plus,
  Search,
} from "lucide-react";
import { deleteMember, fetchMembers } from "../context/MemberContext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import AddCommiteeModal from "./Add";
import ViewCommiteeModal from "./View";
import EditCommiteeModal from "./Edit";
import TruncateText from "../components/TruncateText";

const ManagingCommittee = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [memberList, setMemberList] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);

  useEffect(() => {
    fetchCommiteeMembers();
  }, []);

  const fetchCommiteeMembers = async () => {
    setLoading(true);
    const data = await fetchMembers();
    setMemberList(data);
    setLoading(false);
  };

  const refreshData = () => {
    fetchCommiteeMembers();
  };

  const handleViewMember = (event) => {
    setCurrentMember(event);
    setIsViewDialogOpen(true);
  };

  const handleEditMember = (event) => {
    setCurrentMember(event);
    setIsEditDialogOpen(true);
  };

  const handleDeleteMember = (member) => {
    confirmDialog({
      message: `Are you sure you want to delete "${member.name}" ?`,
      header: "Confirm Deletion",
      icon: <AlertCircle size={30} />,
      acceptClassName: "p-button-danger",
      rejectClassName: "p-button-secondary",
      accept: async () => {
        await deleteMember(member._id);
        fetchCommiteeMembers();
        console.log(`Member Deleted: \n`, member.name);
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

  const filteredMembers = memberList.filter(
    (member) =>
      (member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.designation.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedDesignation === "" || member.designation === selectedDesignation)
  );

  const designationTemplate = (rowData) => {
    const designationColors = {
      Chairman: "text-red-800 bg-red-100",
      "Vice Chairman": "text-purple-800 bg-purple-100",
      Secretary: "text-green-800 bg-green-100",
      Member: "text-blue-800 bg-blue-100",
    };
    const colorClass =
      designationColors[rowData.designation] || "text-gray-800 bg-gray-100";
    return (
      <div className={`px-3 py-1 rounded-full w-fit ${colorClass}`}>
        {rowData.designation}
      </div>
    );
  };

  const infoTemplate = (rowData) => (
    <TruncateText text={rowData.info} maxLength={30} />
  );

  return (
    <section className='p-6 space-y-6 max-w-7xl'>
      <div className='flex justify-between items-center bg-white p-4 rounded-lg border border-neutral-200/60'>
        <div>
          <h1 className='text-2xl font-bold text-neutral-800'>
            College Management Committee
          </h1>
          <p className='text-neutral-500'>
            Manage and organize committee members
          </p>
        </div>
        <Button
          icon={<Plus />}
          label={"Add New Member"}
          className='p-button-success space-x-2'
          onClick={() => setIsAddDialogOpen(true)}
        />
      </div>

      <div className='flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-lg border border-neutral-200/60'>
        <div className='relative flex-grow'>
          <input
            type='search'
            placeholder='Search Committee Members...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500'
          />
          <Search className='w-5 h-5 absolute left-3 top-2.5 text-neutral-400' />
        </div>
        <select
          value={selectedDesignation}
          onChange={(e) => setSelectedDesignation(e.target.value)}
          className='px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500'>
          <option value=''>All Designation</option>
          <option value='Chairman'>Chairman</option>
          <option value='Vice Chairman'>Vice Chairman</option>
          <option value='Secretary'>Secretary</option>
          <option value='Member'>Member</option>
        </select>
      </div>

      <div className='bg-white border border-neutral-200/30 rounded-md overflow-hidden'>
        <DataTable
          value={filteredMembers}
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
          <Column field='name' header='NAME' sortable />
          <Column field='info' header='BASIC INFORMATION' body={infoTemplate} />
          <Column
            field='designation'
            header='DESIGNATION'
            body={designationTemplate}
          />
          <Column header='ACTIONS' body={actionTemplate} />
        </DataTable>
      </div>

      <AddCommiteeModal
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        refreshData={refreshData}
      />
      <ViewCommiteeModal
        isOpen={isViewDialogOpen}
        onClose={(e) => {
          e.preventDefault(), setIsViewDialogOpen(false);
        }}
        selectedMember={currentMember}
      />
      <EditCommiteeModal
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        selectedMember={currentMember}
        refreshData={refreshData}
      />

      <ConfirmDialog />
    </section>
  );
};

export default ManagingCommittee;
