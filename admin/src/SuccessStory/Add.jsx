import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { createStory } from "../context/SuccessStoryContext";

const AddSuccessStoryModal = ({ isOpen, onClose, refreshData }) => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
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
    await createStory(formData, imageFile);
    setFormData({ title: "", description: "", image: "" });
    setImageFile(null);
    refreshData();
    onClose();
    setLoading(false);
  };

  return (
    <Dialog
      header="Add Success Story"
      visible={isOpen}
      onHide={onClose}
      style={{ width: "50vw" }}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title*
          </label>
          <InputText
            name="title"
            required
            placeholder="Enter Story Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description*
          </label>
          <InputTextarea
            name="description"
            required
            placeholder="Enter Story Description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            cols={50}
            className="w-full p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image*
          </label>
          <InputText
            type="file"
            name="image"
            required
            placeholder="Upload Story Image"
            accept="image/*"
            onChange={handleFileChange}
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
            label={loading ? "Adding..." : "Add Success Story"}
            className="p-button-success"
            disabled={loading}
          />
        </div>
      </form>
    </Dialog>
  );
};

export default AddSuccessStoryModal;
