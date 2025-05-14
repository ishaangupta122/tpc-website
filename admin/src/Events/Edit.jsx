import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState, useEffect } from "react";
import { updateEvent } from "../context/EventContext";
import { InputTextarea } from "primereact/inputtextarea";

const EditEventsModal = ({ isOpen, onClose, selectedEvent, refreshData }) => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
    image: "",
  });

  const categoryOptions = [
    { label: "College", value: "College" },
    { label: "Faculty", value: "Faculty" },
    { label: "Student", value: "Student" },
    { label: "Applied Science", value: "Applied Science" },
    { label: "Architectural Assistantship", value: "Architectural" },
    { label: "Computer Science Engineering", value: "CSE" },
    { label: "Civil Engineering", value: "Civil" },
    { label: "Electrical Engineering", value: "Electrical" },
    { label: "Mechanical Engineering", value: "Mechanical" },
  ];

  useEffect(() => {
    if (selectedEvent) {
      setImageFile(null);
      setFormData({
        title: selectedEvent.title || "",
        image: selectedEvent.image || "",
        description: selectedEvent.description || "",
        date: selectedEvent.date || "",
        category: selectedEvent.category || "",
      });
    }
  }, [selectedEvent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedFormData = {
      ...formData,
      image: imageFile ? imageFile : null,
    };
    await updateEvent(selectedEvent._id, updatedFormData, imageFile);
    refreshData();
    onClose();
    setLoading(false);
  };

  return (
    <Dialog
      header={"Update Event"}
      visible={isOpen}
      onHide={onClose}
      style={{ width: "50vw" }}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Event Title
          </label>
          <InputText
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <div className="h-48 w-1/2 mb-4">
            <img
              src={formData.image}
              alt={formData.image}
              className="h-full w-full border border-neutral-300 object-cover rounded-md"
            />
          </div>
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
            Description
          </label>
          <InputTextarea
            name="description"
            rows={5}
            cols={50}
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <InputText
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <Dropdown
            name="category"
            value={formData.category}
            options={categoryOptions}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.value }))
            }
            placeholder="Select Category"
            className="w-full p-2"
          />
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
            label={loading ? "Updating..." : "Update Event"}
            className="p-button-warning"
            disabled={loading}
          />
        </div>
      </form>
    </Dialog>
  );
};

export default EditEventsModal;
