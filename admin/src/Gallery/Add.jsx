import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { addImage } from "../context/GalleryContext";
import { InputTextarea } from "primereact/inputtextarea";

const AddGalleryModal = ({ isOpen, onClose, refreshData }) => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await addImage(formData, imageFile);
    setFormData({ image: "" });
    setImageFile(null);
    refreshData();
    onClose();
    setLoading(false);
  };

  return (
    <Dialog
      header='Add Image'
      visible={isOpen}
      onHide={onClose}
      style={{ width: "50vw" }}>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Image
          </label>
          <InputText
            type='file'
            name='image'
            accept='image/*'
            onChange={handleFileChange}
            className='w-full p-2'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Description
          </label>
          <InputTextarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            rows={5}
            cols={50}
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
            label={loading ? "Adding..." : "Add Image"}
            className='p-button-success'
            disabled={loading}
          />
        </div>
      </form>
    </Dialog>
  );
};

export default AddGalleryModal;
