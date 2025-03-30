import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState, useEffect } from "react";
import { updateImage } from "../context/GalleryContext";
import { InputTextarea } from "primereact/inputtextarea";

const EditGalleryModal = ({ isOpen, onClose, selectedImage, refreshData }) => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
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
    await updateImage(selectedImage._id, formData, imageFile);
    refreshData();
    onClose();
    setLoading(false);
  };

  return (
    <Dialog
      header={"Update Gallery Image"}
      visible={isOpen}
      onHide={onClose}
      style={{ width: "50vw" }}>
      <form className='space-y-4' onSubmit={handleSubmit}>
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
          <InputText
            name='image'
            type='file'
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
            label={loading ? "Updating..." : "Update Image"}
            className='p-button-warning'
            disabled={loading}
          />
        </div>
      </form>
    </Dialog>
  );
};

export default EditGalleryModal;
