import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { createAchievement } from "../context/AchievementsContext";

const AddAchievementsModal = ({ isOpen, onClose, refreshData }) => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    date: "",
  });

  const categoryOptions = [
    { label: "College", value: "College" },
    { label: "Faculty", value: "Faculty" },
    { label: "Student", value: "Student" },
    { label: "Applied Science", value: "Applied Science" },
    { label: "Architectural Assistantship", value: "Architectural" },
    { label: "Civil Engineering", value: "Civil" },
    { label: "Computer Science Engineering", value: "CSE" },
    { label: "Electrical Engineering", value: "Electrical" },
    { label: "Mechanical Engineering", value: "Mechanical" },
  ];

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
    await createAchievement(formData, imageFile);
    setFormData({ title: "", tag: "", content: "", image: "", time: "" });
    setImageFile(null);
    refreshData();
    onClose();
    setLoading(false);
  };

  return (
    <Dialog
      header='Add New Achievement'
      visible={isOpen}
      onHide={onClose}
      style={{ width: "50vw" }}>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Achievement Title
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

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Date
          </label>
          <InputText
            name='date'
            type='date'
            value={formData.date}
            onChange={handleChange}
            className='w-full p-2'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Category
          </label>
          <Dropdown
            name='category'
            value={formData.category}
            options={categoryOptions}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.value }))
            }
            placeholder='Select Category'
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
            label={loading ? "Adding..." : "Add Achievement"}
            className='p-button-success'
            disabled={loading}
          />
        </div>
      </form>
    </Dialog>
  );
};

export default AddAchievementsModal;
