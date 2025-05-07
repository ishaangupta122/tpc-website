import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState, useEffect } from "react";

const ViewFacultyModal = ({ isOpen, onClose, selectedFaculty }) => {
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

  useEffect(() => {
    if (selectedFaculty) {
      setFormData({
        name: selectedFaculty.name || "",
        email: selectedFaculty.email || "",
        phone: selectedFaculty.phone || "",
        image: selectedFaculty.image || "",
        joinedDate: selectedFaculty.joinedDate || "",
        education: selectedFaculty.education || "",
        designation: selectedFaculty.designation || "",
        department: selectedFaculty.department || "",
        experience: selectedFaculty.experience || "",
      });
    }
  }, [selectedFaculty]);

  return (
    <Dialog
      header={"View Faculty Details"}
      visible={isOpen}
      onHide={onClose}
      style={{ width: "50vw" }}>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <InputText
            name="name"
            value={formData.name}
            readOnly
            className="w-full p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <InputText
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <InputText
            type="phone"
            name="phone"
            value={formData.phone}
            readOnly
            className="w-full p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Experience
          </label>
          <InputText
            name="experience"
            value={formData.experience}
            readOnly
            className="w-full p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Joined Date
          </label>
          <InputText
            name="joinedDate"
            value={formData.joinedDate}
            readOnly
            className="w-full p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Designation
          </label>
          <InputText
            name="designation"
            value={formData.designation}
            readOnly
            className="w-full p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <InputText
            name="department"
            value={formData.department}
            readOnly
            className="w-full p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Education
          </label>
          <InputText
            name="education"
            value={formData.education}
            readOnly
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
              alt={formData.image || "No Image Provided"}
              className="h-full w-full border border-neutral-300 object-cover rounded-md"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button
            label="Cancel"
            className="p-button-danger"
            onClick={onClose}
          />
        </div>
      </form>
    </Dialog>
  );
};

export default ViewFacultyModal;
