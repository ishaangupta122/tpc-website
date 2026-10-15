import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useFormValues } from "../../hooks/useFormValues";
import { useState } from "react";
import Field from "./Field";
import FormDialog from "./FormDialog";

const toValues = (item) => ({
  title: item?.title || "",
  section: item?.section || "",
});

// Add/Edit dialog for PDF-backed items (notices and section documents).
//   item      record being edited, or null to add
//   sections  [{ label, value }]: shows a Section dropdown (documents). It is
//             locked when editing: files live in a per-section folder.
//   onSubmit  async ({ title, section }, file) => void
const PdfFormModal = ({ isOpen, onClose, item, header, sections, onSubmit }) => {
  const isEdit = Boolean(item);
  const { values, setValue, handleChange } = useFormValues(isOpen, item, toValues);
  const [file, setFile] = useState(null);

  return (
    <FormDialog
      header={header}
      visible={isOpen}
      onHide={() => {
        setFile(null);
        onClose();
      }}
      onSubmit={() => {
        if (sections && !values.section)
          throw new Error("Please select a section.");
        return onSubmit(values, file);
      }}
      submitLabel={isEdit ? "Save Changes" : "Add"}>
      {sections && (
        <Field label="Section" required>
          <Dropdown
            name="section"
            required
            value={values.section}
            options={sections}
            disabled={isEdit}
            onChange={(e) => setValue("section", e.value)}
            placeholder="Select Section"
            className="w-full"
          />
        </Field>
      )}
      <Field label="Title" required>
        <InputText
          name="title"
          required
          placeholder="Enter Title"
          value={values.title}
          onChange={handleChange}
          className="w-full p-2"
        />
      </Field>
      <Field
        label="PDF File"
        required={!isEdit}
        hint={isEdit ? "Leave empty to keep the current PDF." : undefined}>
        <InputText
          type="file"
          name="file"
          required={!isEdit}
          accept="application/pdf,.pdf"
          onChange={(e) => setFile(e.target.files[0] || null)}
          className="w-full p-2"
        />
      </Field>
    </FormDialog>
  );
};

export default PdfFormModal;
