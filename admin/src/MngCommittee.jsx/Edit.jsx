import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState, useEffect } from "react";
import { updateMember } from "../context/MemberContext";

const EditCommiteeModal = ({
  isOpen,
  onClose,
  selectedMember,
  refreshData,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    info: "",
  });

  const designationOptions = [
    { label: "Chairman", value: "Chairman" },
    { label: "Vice Chairman", value: "Vice Chairman" },
    { label: "Secretary", value: "Secretary" },
    { label: "Member", value: "Member" },
  ];

  useEffect(() => {
    if (selectedMember) {
      setFormData({
        name: selectedMember.name || "",
        designation: selectedMember.designation || "",
        info: selectedMember.info || "",
      });
    }
  }, [selectedMember]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateMember(selectedMember._id, formData);
    refreshData();
    onClose();
    setLoading(false);
  };

  return (
    <Dialog
      header={"Update Commitee Member"}
      visible={isOpen}
      onHide={onClose}
      style={{ width: "50vw" }}>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Name
          </label>
          <InputText
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='w-full p-2'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Basic Information
          </label>
          <InputText
            name='info'
            value={formData.info}
            onChange={handleChange}
            className='w-full p-2'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Designation
          </label>
          <Dropdown
            name='designation'
            value={formData.designation}
            options={designationOptions}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, designation: e.value }))
            }
            placeholder='Select designation'
            className='w-full p-2'
          />
        </div>
        <div className='flex justify-end gap-3'>
          <Button
            label='Cancel'
            className='p-button-danger'
            onClick={onClose}
            disabled={loading}
          />
          <Button
            type='submit'
            label={loading ? "Updating..." : "Update Member"}
            className='p-button-warning'
            disabled={loading}
          />
        </div>
      </form>
    </Dialog>
  );
};

export default EditCommiteeModal;
