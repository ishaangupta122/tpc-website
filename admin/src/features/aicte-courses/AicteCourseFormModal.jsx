import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useAicteCourses } from "../../context";
import { useNotify } from "../../context/NotificationContext";
import { useFormValues } from "../../hooks/useFormValues";
import { useFieldErrors } from "../../hooks/useFieldErrors";
import { TEACHING_DEPARTMENT_OPTIONS } from "../../constants/options";
import Field from "../../components/forms/Field";
import FormDialog from "../../components/forms/FormDialog";

const toValues = (course) => ({
  department: course?.department || "",
  approvedIntake: course?.approvedIntake ?? "",
});

// Add (course = null) or edit one row of the AICTE courses table.
const AicteCourseFormModal = ({ isOpen, onClose, course }) => {
  const isEdit = Boolean(course);
  const { create, update } = useAicteCourses();
  const notify = useNotify();
  const { values, setValue } = useFormValues(isOpen, course, toValues);
  const { errors, clear, reset, fail, show } = useFieldErrors();

  // The department names used across the admin. A saved name that is not on
  // the list stays selectable so editing never loses it.
  const departmentNames = TEACHING_DEPARTMENT_OPTIONS.map((option) => option.label);
  const departmentOptions =
    values.department && !departmentNames.includes(values.department)
      ? [...departmentNames, values.department]
      : departmentNames;

  const set = (name, value) => {
    setValue(name, value);
    clear(name);
  };

  const handleSubmit = async () => {
    const found = {};
    if (!values.department) found.department = "Select a department.";
    const intake = Number(values.approvedIntake);
    if (String(values.approvedIntake).trim() === "")
      found.approvedIntake = "Enter the approved intake, like 60.";
    else if (!Number.isInteger(intake) || intake < 0)
      found.approvedIntake = "Enter a whole number, like 60.";
    if (Object.keys(found).length) fail(found);

    const payload = { department: values.department, approvedIntake: intake };
    if (isEdit) await update(course._id, payload);
    else await create(payload);
    notify.success(isEdit ? "Course updated." : "Course added.");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <FormDialog
      onFieldErrors={show}
      entity="Course"
      isEdit={isEdit}
      visible={isOpen}
      onHide={handleClose}
      onSubmit={handleSubmit}>
      <Field label="Department" required id="department" error={errors.department}>
        <Dropdown
          value={values.department}
          options={departmentOptions}
          onChange={(e) => set("department", e.value)}
          placeholder="Select a department"
          className="w-full"
        />
      </Field>
      <Field label="Approved Intake" required id="approvedIntake" error={errors.approvedIntake}>
        <InputText
          type="number"
          min={0}
          placeholder="e.g. 60 (number of seats)"
          value={values.approvedIntake}
          onChange={(e) => set("approvedIntake", e.target.value)}
          className="w-full p-2"
        />
      </Field>
    </FormDialog>
  );
};

export default AicteCourseFormModal;
