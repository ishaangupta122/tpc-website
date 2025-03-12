import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState, useEffect } from "react";

const ViewCommiteeModal = ({ isOpen, onClose, selectedMember }) => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    info: "",
  });

  useEffect(() => {
    if (selectedMember) {
      setFormData({
        name: selectedMember.name || "",
        designation: selectedMember.designation || "",
        info: selectedMember.info || "",
      });
    }
  }, [selectedMember]);

  return (
    <Dialog
      header={"View Commitee Member"}
      visible={isOpen}
      onHide={onClose}
      style={{ width: "50vw" }}>
      <form className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Name
          </label>
          <InputText
            name='name'
            value={formData.name}
            readOnly
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
            readOnly
            className='w-full p-2'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Designation
          </label>
          <InputText
            name='designation'
            value={formData.designation}
            readOnly
            placeholder='Select designation'
            className='w-full p-2'
          />
        </div>
        <div className='flex justify-end gap-3'>
          <Button
            label='Cancel'
            className='p-button-danger'
            onClick={onClose}
          />
        </div>
      </form>
    </Dialog>
  );
};

export default ViewCommiteeModal;
