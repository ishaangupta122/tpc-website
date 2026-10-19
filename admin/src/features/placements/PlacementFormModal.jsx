import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { usePlacements } from "../../context";
import { useNotify } from "../../context/NotificationContext";
import { useFormValues } from "../../hooks/useFormValues";
import { useFieldErrors } from "../../hooks/useFieldErrors";
import { TEACHING_DEPARTMENT_OPTIONS } from "../../constants/options";
import Field from "../../components/forms/Field";
import FormDialog from "../../components/forms/FormDialog";

const toValues = (row) => ({
  year: row?.year || "",
  department: row?.department || "",
  approvedIntake: row?.approvedIntake ?? "",
  companiesVisited: row?.companiesVisited ?? "",
  studentsPlaced: row?.studentsPlaced ?? "",
  avgPackage: row?.avgPackage ?? "",
});

const NUMBER_FIELDS = [
  ["approvedIntake", "Approved Intake", "e.g. 60 (number of seats)"],
  ["companiesVisited", "Companies Visited", "e.g. 25"],
  ["studentsPlaced", "Students Placed", "e.g. 48"],
];

// Add (row = null) or edit one department row of a placement year.
// Adding to an existing year merges the department into that year.
const PlacementFormModal = ({ isOpen, onClose, row }) => {
  const isEdit = Boolean(row);
  const { addRow, updateRow } = usePlacements();
  const notify = useNotify();
  const { values, setValue } = useFormValues(isOpen, row, toValues);
  const { errors, clear, reset, fail, show } = useFieldErrors();

  // A saved department that is not on the list (typed in earlier) stays
  // selectable, so editing a row never loses it.
  const departmentOptions =
    values.department &&
    !TEACHING_DEPARTMENT_OPTIONS.some((option) => option.value === values.department)
      ? [...TEACHING_DEPARTMENT_OPTIONS, { label: values.department, value: values.department }]
      : TEACHING_DEPARTMENT_OPTIONS;

  const set = (name, value) => {
    setValue(name, value);
    clear(name);
  };

  const handleSubmit = async () => {
    const found = {};
    if (!/^\d{4}$/.test(String(values.year).trim()))
      found.year = "Enter the year as 4 digits, like 2025.";
    if (!values.department.trim()) found.department = "Select a department.";
    const whole = (value) => String(value).trim() !== "" && Number.isInteger(Number(value)) && Number(value) >= 0;
    NUMBER_FIELDS.forEach(([name, label]) => {
      if (!whole(values[name])) found[name] = `Enter ${label.toLowerCase()} as a whole number.`;
    });
    if (!found.approvedIntake && !found.studentsPlaced && Number(values.studentsPlaced) > Number(values.approvedIntake))
      found.studentsPlaced = "Students placed cannot be more than the approved intake.";
    if (String(values.avgPackage).trim() === "" || !(Number(values.avgPackage) >= 0))
      found.avgPackage = "Enter the average package in LPA, like 4.5.";
    if (Object.keys(found).length) fail(found);

    if (isEdit) await updateRow(row, values);
    else await addRow(values);
    notify.success(isEdit ? "Placement updated." : "Placement added.");
  };

  return (
    <FormDialog
      onFieldErrors={show}
      entity="Placement"
      isEdit={isEdit}
      visible={isOpen}
      onHide={() => {
        reset();
        onClose();
      }}
      onSubmit={handleSubmit}>
      <Field label="Year" required id="year" error={errors.year}>
        <InputText
          disabled={isEdit}
          placeholder="e.g. 2025"
          value={values.year}
          onChange={(e) => set("year", e.target.value)}
          className="w-full p-2"
        />
      </Field>
      <Field label="Department" required id="department" error={errors.department}>
        <Dropdown
          value={values.department}
          options={departmentOptions}
          onChange={(e) => set("department", e.value ?? "")}
          placeholder="Select a department"
          className="w-full"
        />
      </Field>
      {NUMBER_FIELDS.map(([name, label, placeholder]) => (
        <Field key={name} label={label} required id={name} error={errors[name]}>
          <InputText
            type="number"
            min="0"
            placeholder={placeholder}
            value={values[name]}
            onChange={(e) => set(name, e.target.value)}
            className="w-full p-2"
          />
        </Field>
      ))}
      <Field label="Average Package (LPA)" required id="avgPackage" error={errors.avgPackage}>
        <InputText
          type="number"
          min="0"
          step="any"
          placeholder="e.g. 4.5 (lakhs per annum)"
          value={values.avgPackage}
          onChange={(e) => set("avgPackage", e.target.value)}
          className="w-full p-2"
        />
      </Field>
    </FormDialog>
  );
};

export default PlacementFormModal;
