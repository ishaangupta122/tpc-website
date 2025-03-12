import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { updateFaculty } from "../context/FacultyContext";

const EditFacultyModal = ({
  isOpen,
  onClose,
  selectedFaculty,
  refreshData,
}) => {
  const [loading, setLoading] = useState(false);
  const [newEducation, setNewEducation] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    experience: "",
    joinedDate: "",
    image: "",
    education: [],
  });

  const departmentOptions = [
    {
      label: "Computer Science Engineering",
      value: "Computer Science Engineering",
    },
    { label: "Applied Science", value: "Applied Science" },
    { label: "Admin Staff", value: "Admin Staff" },
    { label: "Civil Engineering", value: "Civil Engineering" },
    { label: "Mechanical Engineering", value: "Mechanical Engineering" },
    { label: "Electrical Engineering", value: "Electrical Engineering" },
    {
      label: "Architectural Assistantship",
      value: "Architectural Assistantship",
    },
  ];

  useEffect(() => {
    if (selectedFaculty) {
      setFormData({
        name: selectedFaculty.name || "",
        email: selectedFaculty.email || "",
        phone: selectedFaculty.phone || "",
        image: selectedFaculty.image || "",
        joinedDate: selectedFaculty.joinedDate || "",
        designation: selectedFaculty.designation || "",
        department: selectedFaculty.department || "",
        experience: selectedFaculty.experience || "",
        education: Array.isArray(selectedFaculty.education)
          ? selectedFaculty.education
          : selectedFaculty.education
          ? [selectedFaculty.education]
          : [],
      });
    }
  }, [selectedFaculty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAddEducation = () => {
    if (newEducation.trim()) {
      setFormData((prev) => ({
        ...prev,
        education: [...prev.education, newEducation.trim()],
      }));
      setNewEducation("");
    }
  };

  const handleDeleteEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateFaculty(selectedFaculty._id, formData, imageFile);
    refreshData();
    onClose();
    setLoading(false);
  };

  return (
    <Dialog
      header='Update Faculty'
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
            Email
          </label>
          <InputText
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='w-full p-2'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Phone
          </label>
          <InputText
            type='phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            className='w-full p-2'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Experience
          </label>
          <InputText
            name='experience'
            value={formData.experience}
            onChange={handleChange}
            className='w-full p-2'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Joined Date
          </label>
          <InputText
            type='date'
            name='joinedDate'
            value={formData.joinedDate}
            onChange={handleChange}
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
            onChange={handleChange}
            className='w-full p-2'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Department
          </label>
          <Dropdown
            name='department'
            value={formData.department}
            options={departmentOptions}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, department: e.value }))
            }
            placeholder='Select Department'
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
            type='file'
            name='image'
            onChange={handleFileChange}
            className='w-full p-2'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Education
          </label>
          <div className='flex gap-2 mb-2'>
            <InputText
              value={newEducation}
              onChange={(e) => setNewEducation(e.target.value)}
              placeholder='Add education qualification'
              className='flex-1 p-2'
            />
            <Button
              type='button'
              label='Add'
              className='p-button-success'
              onClick={handleAddEducation}
            />
          </div>
          <div className='space-y-2'>
            {formData.education.map((edu, index) => (
              <div
                key={index}
                className='flex items-center gap-2 bg-gray-50 p-2 rounded'>
                <span className='flex-1'>{edu}</span>
                <Button
                  type='button'
                  icon={<Trash2 />}
                  className='p-button-danger p-button-text'
                  onClick={() => handleDeleteEducation(index)}
                />
              </div>
            ))}
          </div>
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
            label={loading ? "Updating..." : "Update Faculty"}
            className='p-button-warning'
            disabled={loading}
          />
        </div>
      </form>
    </Dialog>
  );
};

export default EditFacultyModal;
