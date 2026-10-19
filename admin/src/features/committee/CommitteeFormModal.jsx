import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { useCommittee } from "../../context";
import { useNotify } from "../../context/NotificationContext";
import { useFormValues } from "../../hooks/useFormValues";
import { useFieldErrors } from "../../hooks/useFieldErrors";
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
  const { values, setValue } = useFormValues(isOpen, member, toValues);
  const { errors, clear, reset, fail, show } = useFieldErrors();

  const set = (name, value) => {
    setValue(name, value);
    clear(name);
  };

  const handleSubmit = async () => {
    const found = {};
    if (!values.name.trim()) found.name = "Enter the member's name.";
    if (!values.info.trim()) found.info = "Enter some basic information.";
    if (!values.designation) found.designation = "Select a designation.";
    if (Object.keys(found).length) fail(found);

    if (isEdit) await update(member._id, values);
    else await create(values);
    notify.success(isEdit ? "Member updated." : "Member added.");
  };

  return (
    <FormDialog
      onFieldErrors={show}
      entity="Member"
      isEdit={isEdit}
      visible={isOpen}
      onHide={() => {
        reset();
        onClose();
      }}
      onSubmit={handleSubmit}>
      <Field label="Name" required id="name" error={errors.name}>
        <InputText
          name="name"
          placeholder="Enter Member Name"
          value={values.name}
          onChange={(e) => set(e.target.name, e.target.value)}
          className="w-full p-2"
        />
      </Field>
      <Field label="Basic Information" required id="info" error={errors.info}>
        <InputTextarea
          name="info"
          placeholder="Enter Member Information"
          value={values.info}
          onChange={(e) => set(e.target.name, e.target.value)}
          rows={5}
          cols={50}
          className="w-full p-2"
        />
      </Field>
      <Field label="Designation" required id="designation" error={errors.designation}>
        <Dropdown
          name="designation"
          value={values.designation}
          options={DESIGNATION_OPTIONS}
          onChange={(e) => set("designation", e.value ?? "")}
          placeholder="Select designation"
          className="w-full"
        />
      </Field>
    </FormDialog>
  );
};

export default CommitteeFormModal;
