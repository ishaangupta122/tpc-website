import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { createFaculty } from "../context/FacultyContext";

const AddFacultyModal = ({ isOpen, onClose, refreshData }) => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [newEducation, setNewEducation] = useState("");
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
    { label: "Admin Staff", value: "Admin Staff" },
    { label: "Applied Science", value: "Applied Science" },
    { label: "Architectural Assistantship", value: "Architectural" },
    { label: "Civil Engineering", value: "Civil" },
    { label: "Computer Science Engineering", value: "CSE" },
    { label: "Mechanical Engineering", value: "Mechanical" },
    { label: "Electrical Engineering", value: "Electrical" },
  ];

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
    await createFaculty(formData, imageFile);
    setFormData({
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
    setImageFile(null);
    refreshData();
    onClose();
    setLoading(false);
  };

  return (
    <Dialog
      header="Add New Faculty"
      visible={isOpen}
      onHide={onClose}
      style={{ width: "50vw" }}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name*
          </label>
          <InputText
            name="name"
            required
            placeholder="Enter Faculty Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email*
          </label>
          <InputText
            type="email"
            required
            placeholder="Enter Faculty Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone*
          </label>
          <InputText
            type="phone"
            required
            placeholder="Enter Faculty Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Experience*
          </label>
          <InputText
            name="experience"
            required
            placeholder="Enter Faculty Experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Joined Date*
          </label>
          <InputText
            type="date"
            required
            placeholder="Enter Faculty Joined Date"
            name="joinedDate"
            value={formData.joinedDate}
            onChange={handleChange}
            className="w-full p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Designation*
          </label>
          <InputText
            name="designation"
            required
            placeholder="Enter Faculty Designation"
            value={formData.designation}
            onChange={handleChange}
            className="w-full p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Department*
          </label>
          <Dropdown
            name="department"
            required
            value={formData.department}
            options={departmentOptions}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, department: e.value }))
            }
            placeholder="Select Department"
            className="w-full p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <InputText
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Education*
          </label>
          <div className="flex gap-2 mb-2">
            <InputText
              name="education"
              value={newEducation}
              onChange={(e) => setNewEducation(e.target.value)}
              placeholder="Add Education Qualification"
              className="flex-1 p-2"
            />
            <Button
              type="button"
              label="Add"
              className="p-button-success"
              onClick={handleAddEducation}
            />
          </div>
          <div className="space-y-2">
            {formData.education.map((edu, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-gray-100 p-2 rounded">
                <span className="flex-1">{edu}</span>
                <Button
                  type="button"
                  icon={<Trash2 />}
                  className="p-button-danger p-button-text"
                  onClick={() => handleDeleteEducation(index)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            label="Cancel"
            className="p-button-danger"
            onClick={onClose}
            disabled={loading}
          />
          <Button
            type="submit"
            label={loading ? "Adding..." : "Add Faculty"}
            className="p-button-success"
            disabled={loading}
          />
        </div>
      </form>
    </Dialog>
  );
};

export default AddFacultyModal;
