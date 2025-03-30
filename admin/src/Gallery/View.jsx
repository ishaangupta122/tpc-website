import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { useState, useEffect } from "react";

const ViewGalleryModal = ({ isOpen, onClose, selectedImage }) => {
  const [formData, setFormData] = useState({
    imageUrl: "",
    description: "",
  });

  useEffect(() => {
    if (selectedImage) {
      setFormData({
        imageUrl: selectedImage.imageUrl || "",
        description: selectedImage.description || "",
      });
    }
  }, [selectedImage]);

  return (
    <Dialog
      header={"View Image"}
      visible={isOpen}
      onHide={onClose}
      style={{ width: "50vw" }}>
      <form className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Image
          </label>
          <div className='h-48 w-1/2 mb-4'>
            <img
              src={formData.imageUrl}
              alt={formData.imageUrl}
              className='h-full w-full border border-neutral-300 object-cover rounded-md'
            />
          </div>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Description
          </label>
          <InputTextarea
            name='description'
            value={formData.description}
            rows={5}
            cols={50}
            readOnly
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

export default ViewGalleryModal;
