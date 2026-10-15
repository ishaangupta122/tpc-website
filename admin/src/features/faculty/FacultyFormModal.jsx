import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Trash2 } from "lucide-react";
import { useFaculty } from "../../context";
import { useNotify } from "../../context/NotificationContext";
import { useFormValues } from "../../hooks/useFormValues";
import {
  FACULTY_DEPARTMENT_OPTIONS,
  designationsFor,
} from "../../constants/options";
import Field from "../../components/forms/Field";
import FormDialog from "../../components/forms/FormDialog";
import ImageInput from "../../components/forms/ImageInput";

const toValues = (faculty) => ({
  name: faculty?.name || "",
  email: faculty?.email || "",
  phone: faculty?.phone || "",
  department: faculty?.department || "",
  designation: faculty?.designation || "",
  joinedDate: faculty?.joinedDate || "",
  education: Array.isArray(faculty?.education) ? faculty.education : [],
});

// Add (faculty = null) or edit a faculty member. Experience is not entered:
// the backend calculates it from the joined date.
const FacultyFormModal = ({ isOpen, onClose, faculty }) => {
  const isEdit = Boolean(faculty);
  const { create, update } = useFaculty();
  const notify = useNotify();
  const { values, setValue, handleChange } = useFormValues(isOpen, faculty, toValues);
  const [image, setImage] = useState(null);
  const [newEducation, setNewEducation] = useState("");

  // The designation list depends on the department. A saved designation that
  // is no longer on the list stays selectable so editing never loses it.
  const allowed = designationsFor(values.department);
  const designationOptions =
    values.designation && !allowed.includes(values.designation)
      ? [...allowed, values.designation]
      : allowed;

  const handleDepartmentChange = (department) => {
    setValue("department", department);
    // The chosen title may not exist in the new department's list.
    if (!designationsFor(department).includes(values.designation))
      setValue("designation", "");
  };

  const handleClose = () => {
    setImage(null);
    setNewEducation("");
    onClose();
  };

  const addEducation = () => {
    const value = newEducation.trim();
    if (!value) return;
    setValue("education", [...values.education, value]);
    setNewEducation("");
  };

  const removeEducation = (index) =>
    setValue(
      "education",
      values.education.filter((_, i) => i !== index)
    );

  const handleSubmit = async () => {
    if (!values.department) throw new Error("Please select a department.");
    if (!values.designation.trim()) throw new Error("Please select a designation.");
    if (isEdit) await update(faculty._id, values, image);
    else await create(values, image);
    notify.success(isEdit ? "Faculty updated." : "Faculty added.");
  };

  return (
    <FormDialog
      header={isEdit ? "Update Faculty" : "Add New Faculty"}
      visible={isOpen}
      onHide={handleClose}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Update Faculty" : "Add Faculty"}
      submittingLabel={isEdit ? "Updating..." : "Adding..."}
      submitClassName={isEdit ? "p-button-warning" : "p-button-success"}>
      <Field label="Name" required>
        <InputText
          name="name"
          required
          placeholder="Enter Faculty Name"
          value={values.name}
          onChange={handleChange}
          className="w-full p-2"
        />
      </Field>
      <Field label="Email" required>
        <InputText
          type="email"
          name="email"
          required
          placeholder="Enter Faculty Email"
          value={values.email}
          onChange={handleChange}
          className="w-full p-2"
        />
      </Field>
      <Field label="Phone" required>
        <InputText
          type="tel"
          name="phone"
          required
          placeholder="Enter Faculty Phone"
          value={values.phone}
          onChange={handleChange}
          className="w-full p-2"
        />
      </Field>
      <Field
        label="Joined Date"
        required
        hint="Experience is calculated automatically from this date.">
        <InputText
          type="date"
          name="joinedDate"
          required
          value={values.joinedDate}
          onChange={handleChange}
          className="w-full p-2"
        />
      </Field>
      <Field label="Department" required>
        <Dropdown
          name="department"
          value={values.department}
          options={FACULTY_DEPARTMENT_OPTIONS}
          onChange={(e) => handleDepartmentChange(e.value)}
          placeholder="Select Department"
          className="w-full"
        />
      </Field>
      <Field label="Designation" required>
        <Dropdown
          name="designation"
          value={values.designation}
          options={designationOptions}
          onChange={(e) => setValue("designation", e.value)}
          placeholder={
            values.department ? "Select Designation" : "Select a department first"
          }
          disabled={!values.department}
          className="w-full"
        />
      </Field>
      <ImageInput currentUrl={faculty?.image} onChange={setImage} />
      <Field label="Education" required>
        <div className="flex gap-2 mb-2">
          <InputText
            value={newEducation}
            onChange={(e) => setNewEducation(e.target.value)}
            placeholder="Add Education Qualification"
            className="flex-1 p-2"
          />
          <Button
            type="button"
            label="Add"
            className="p-button-success"
            onClick={addEducation}
          />
        </div>
        <div className="space-y-2">
          {values.education.map((qualification, index) => (
            <div
              key={`${qualification}-${index}`}
              className="flex items-center gap-2 bg-gray-100 p-2 rounded">
              <span className="flex-1">{qualification}</span>
              <Button
                type="button"
                icon={<Trash2 />}
                className="p-button-danger p-button-text"
                onClick={() => removeEducation(index)}
              />
            </div>
          ))}
        </div>
      </Field>
    </FormDialog>
  );
};

export default FacultyFormModal;
