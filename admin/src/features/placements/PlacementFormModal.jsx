import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { usePlacements } from "../../context";
import { useNotify } from "../../context/NotificationContext";
import { useFormValues } from "../../hooks/useFormValues";
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
  ["approvedIntake", "Approved Intake"],
  ["companiesVisited", "Companies Visited"],
  ["studentsPlaced", "Students Placed"],
];

// Add (row = null) or edit one department row of a placement year.
// Adding to an existing year merges the department into that year.
const PlacementFormModal = ({ isOpen, onClose, row }) => {
  const isEdit = Boolean(row);
  const { addRow, updateRow } = usePlacements();
  const notify = useNotify();
  const { values, setValue, handleChange } = useFormValues(isOpen, row, toValues);

  const handleSubmit = async () => {
    if (!values.department.trim()) throw new Error("Department is required.");
    if (isEdit) await updateRow(row, values);
    else await addRow(values);
    notify.success(isEdit ? "Placement updated." : "Placement added.");
  };

  return (
    <FormDialog
      header={isEdit ? "Edit Placement" : "Add Placement"}
      visible={isOpen}
      onHide={onClose}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Save Changes" : "Add"}>
      <Field label="Year" required>
        <InputText
          name="year"
          required
          disabled={isEdit}
          placeholder="e.g. 2025"
          value={values.year}
          onChange={handleChange}
          className="w-full p-2"
        />
      </Field>
      <Field label="Department" required>
        <Dropdown
          name="department"
          editable
          value={values.department}
          options={TEACHING_DEPARTMENT_OPTIONS}
          onChange={(e) => setValue("department", e.value ?? "")}
          placeholder="Select or type a department"
          className="w-full"
        />
      </Field>
      {NUMBER_FIELDS.map(([name, label]) => (
        <Field key={name} label={label} required>
          <InputText
            type="number"
            min="0"
            name={name}
            required
            placeholder={`Enter ${label}`}
            value={values[name]}
            onChange={handleChange}
            className="w-full p-2"
          />
        </Field>
      ))}
      <Field label="Average Package (LPA)" required>
        <InputText
          type="number"
          min="0"
          step="any"
          name="avgPackage"
          required
          placeholder="Enter Average Package in LPA"
          value={values.avgPackage}
          onChange={handleChange}
          className="w-full p-2"
        />
      </Field>
    </FormDialog>
  );
};

export default PlacementFormModal;
