import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState, useEffect } from "react";
import { updateStory } from "../context/SuccessStoryContext";
import { InputTextarea } from "primereact/inputtextarea";

const EditSuccessStoryModal = ({
  isOpen,
  onClose,
  selectedStory,
  refreshData,
}) => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (selectedStory) {
      setFormData({
        title: selectedStory.title || "",
        description: selectedStory.description || "",
        image: selectedStory.image || "",
      });
    }
  }, [selectedStory]);

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
    await updateStory(selectedStory._id, formData, imageFile);
    refreshData();
    onClose();
    setLoading(false);
  };

  return (
    <Dialog
      header={"Update Success Story"}
      visible={isOpen}
      onHide={onClose}
      style={{ width: "50vw" }}>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Title
          </label>
          <InputText
            name='title'
            value={formData.title}
            onChange={handleChange}
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
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Image
          </label>
          <div className='h-48 w-1/2 mb-4'>
            <img
              src={formData.image}
              alt={formData.image}
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
        <div className='flex justify-end gap-3'>
          <Button
            label='Cancel'
            className='p-button-danger'
            onClick={onClose}
            disabled={loading}
          />
          <Button
            type='submit'
            label={loading ? "Updating..." : "Update Success Story"}
            className='p-button-warning'
            disabled={loading}
          />
        </div>
      </form>
    </Dialog>
  );
};

export default EditSuccessStoryModal;
