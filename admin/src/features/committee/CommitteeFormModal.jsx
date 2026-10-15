import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { useCommittee } from "../../context";
import { useNotify } from "../../context/NotificationContext";
import { useFormValues } from "../../hooks/useFormValues";
import { DESIGNATION_OPTIONS } from "../../constants/options";
import Field from "../../components/forms/Field";
import FormDialog from "../../components/forms/FormDialog";

const toValues = (member) => ({
  name: member?.name || "",
  info: member?.info || "",
  designation: member?.designation || "",
});

// Add (member = null) or edit a committee member.
const CommitteeFormModal = ({ isOpen, onClose, member }) => {
  const isEdit = Boolean(member);
  const { create, update } = useCommittee();
  const notify = useNotify();
  const { values, setValue, handleChange } = useFormValues(isOpen, member, toValues);

  const handleSubmit = async () => {
    if (!values.designation) throw new Error("Please select a designation.");
    if (isEdit) await update(member._id, values);
    else await create(values);
    notify.success(isEdit ? "Member updated." : "Member added.");
  };

  return (
    <FormDialog
      header={isEdit ? "Update Member" : "Add New Member"}
      visible={isOpen}
      onHide={onClose}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Update Member" : "Add Member"}
      submittingLabel={isEdit ? "Updating..." : "Adding..."}
      submitClassName={isEdit ? "p-button-warning" : "p-button-success"}>
      <Field label="Name" required>
        <InputText
          name="name"
          required
          placeholder="Enter Member Name"
          value={values.name}
          onChange={handleChange}
          className="w-full p-2"
        />
      </Field>
      <Field label="Basic Information" required>
        <InputTextarea
          name="info"
          required
          placeholder="Enter Member Information"
          value={values.info}
          onChange={handleChange}
          rows={5}
          cols={50}
          className="w-full p-2"
        />
      </Field>
      <Field label="Designation" required>
        <Dropdown
          name="designation"
          value={values.designation}
          options={DESIGNATION_OPTIONS}
          onChange={(e) => setValue("designation", e.value)}
          placeholder="Select designation"
          className="w-full"
        />
      </Field>
    </FormDialog>
  );
};

export default CommitteeFormModal;
