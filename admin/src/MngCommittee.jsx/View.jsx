import { Edit2, Trash2, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchMembers, addMember, updateMember, deleteMember } from "../context/Member";
import { Dialog } from "@headlessui/react";

const ManagingCommittee = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [memberList, setMemberList] = useState([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", designation: "", info: "" });
  const [addForm, setAddForm] = useState({ name: "", designation: "", info: "" });

  const colors = {
    Chairman: "text-red-800 bg-red-100",
    "Vice Chairman": "text-purple-800 bg-purple-100",
    Secretary: "text-green-800 bg-green-100",
    Member: "text-green-800 bg-green-100",
  };

  const fetchAndSetMembers = async () => {
    const data = await fetchMembers();
    setMemberList(data);
  };

  useEffect(() => {
    fetchAndSetMembers();
  }, []);

  const handleAddSubmit = async () => {
    if (addForm.name && addForm.designation && addForm.info) {
      await addMember(addForm);
      setAddForm({ name: "", designation: "", info: "" });
      setIsAddDialogOpen(false);
      fetchAndSetMembers();
    }
  };

  const handleEdit = (member) => {
    setCurrentMember(member);
    setEditForm({ name: member.name, designation: member.designation, info: member.info });
	fetchAndSetMembers();
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = async () => {
    if (editForm.name && editForm.designation && editForm.info) {
      await updateMember(currentMember._id, editForm);
      setIsEditDialogOpen(false);
      fetchAndSetMembers();
    }
  };

  const handleDelete = async(member) => {
    setCurrentMember(member);
	await deleteMember(currentMember._id);
	await fetchAndSetMembers()
    //setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
 
    setIsDeleteDialogOpen(false);
    fetchAndSetMembers();
  };

  const filteredMembers = memberList.filter(
    (member) =>
      (member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.designation.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedDesignation === "" || member.designation === selectedDesignation)
  );

  return (
    <section className="p-6 space-y-6 max-w-7xl">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-neutral-200/60">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">
            College Management Committee
          </h1>
          <p className="text-neutral-500">Manage and organize committee members</p>
        </div>
        <button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Add New Member</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-lg border border-neutral-200/60">
        <div className="relative flex-grow">
          <input
            type="search"
            placeholder="Search member..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500"
          />
        </div>
        <select
          value={selectedDesignation}
          onChange={(e) => setSelectedDesignation(e.target.value)}
          className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500"
        >
          <option value="">All Designation</option>
          <option value="Chairman">Chairman</option>
          <option value="Vice Chairman">Vice Chairman</option>
          <option value="Secretary">Secretary</option>
          <option value="Member">Member</option>
        </select>
      </div>

      {filteredMembers.length === 0 ? (
        <div className="bg-white p-6 rounded-lg border border-neutral-200/60 text-center text-neutral-600">
          No members found matching your search.
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-neutral-300 overflow-hidden">
          <div className="overflow-x-auto mx-4 my-4 pb-4">
            <table className="min-w-full divide-y divide-neutral-300">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-900 uppercase tracking-wider">
                    S No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-900 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-900 uppercase tracking-wider">
                    Basic Information
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-900 uppercase tracking-wider">
                    Designation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-900 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-300">
                {filteredMembers.map((member, index) => (
                  <tr key={member.id} className="hover:bg-neutral-50 font-medium">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-900">{index + 1}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-900">{member.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-900">{member.info}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          colors[member.designation]
                        }`}
                      >
                        {member.designation}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEdit(member)}
                          className="text-green-600 hover:text-green-900 bg-green-100 p-2 rounded-lg"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(member)}
                          className="text-red-600 hover:text-red-900 bg-red-100 p-2 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Dialog */}
      {isAddDialogOpen && (
        <Dialog
          open={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Add New Member</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={addForm.name}
                onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                className="w-full border border-neutral-300 rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="Designation"
                value={addForm.designation}
                onChange={(e) => setAddForm({ ...addForm, designation: e.target.value })}
                className="w-full border border-neutral-300 rounded-lg px-4 py-2"
              />
              <textarea
                placeholder="Basic Information"
                value={addForm.info}
                onChange={(e) => setAddForm({ ...addForm, info: e.target.value })}
                className="w-full border border-neutral-300 rounded-lg px-4 py-2"
              />
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsAddDialogOpen(false)}
                className="px-4 py-2 bg-neutral-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
        </Dialog>
      )}

      {/* Edit Dialog */}
      {isEditDialogOpen && (
        <Dialog
          open={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Edit Member</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full border border-neutral-300 rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="Designation"
                value={editForm.designation}
                onChange={(e) => setEditForm({ ...editForm, designation: e.target.value })}
                className="w-full border border-neutral-300 rounded-lg px-4 py-2"
              />
              <textarea
                placeholder="Basic Information"
                value={editForm.info}
                onChange={(e) => setEditForm({ ...editForm, info: e.target.value })}
                className="w-full border border-neutral-300 rounded-lg px-4 py-2"
              />
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsEditDialogOpen(false)}
                className="px-4 py-2 bg-neutral-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && (
        <Dialog
          open={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Delete Member</h2>
            <p>Are you sure you want to delete this member?</p>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="px-4 py-2 bg-neutral-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </section>
  );
};

export default ManagingCommittee;
