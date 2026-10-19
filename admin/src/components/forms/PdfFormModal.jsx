import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { useState } from "react";
import { useFormValues } from "../../hooks/useFormValues";
import { useFieldErrors } from "../../hooks/useFieldErrors";
import { MAX_PDF_MB, checkPdf } from "../../constants/uploads";
import Field from "./Field";
import FormDialog from "./FormDialog";

const toValues = (item) => ({
  title: item?.title || "",
  section: item?.section || "",
  highlight: Boolean(item?.highlight),
});

// Add/Edit dialog for PDF-backed items (notices and section documents).
//   item      record being edited, or null to add
//   entity    "Notice" / "Document": names the dialog and its buttons
//   sections  [{ label, value }]: shows a Section dropdown (documents). It is
//             locked when editing: files live in a per-section folder.
//   highlightOption  shows a one-line "Highlight" checkbox (notices): blinks on the site
//   onSubmit  async ({ title, section, highlight }, file) => void
const PdfFormModal = ({ isOpen, onClose, item, entity, sections, highlightOption, onSubmit }) => {
  const isEdit = Boolean(item);
  const { values, setValue, handleChange } = useFormValues(isOpen, item, toValues);
  const [file, setFile] = useState(null);
  const { errors, clear, reset, fail, show } = useFieldErrors();

  return (
    <FormDialog
      onFieldErrors={show}
      entity={entity}
      isEdit={isEdit}
      visible={isOpen}
      onHide={() => {
        setFile(null);
        reset();
        onClose();
      }}
      onSubmit={() => {
        const found = {};
        if (sections && !values.section) found.section = "Select a section.";
        if (!values.title.trim()) found.title = "Enter the title.";
        if (!isEdit && !file) found.file = "Choose a PDF file.";
        if (Object.keys(found).length) fail(found);
        return onSubmit(values, file);
      }}>
      {sections && (
        <Field label="Section" required id="section" error={errors.section}>
          <Dropdown
            name="section"
            value={values.section}
            options={sections}
            disabled={isEdit}
            onChange={(e) => {
              setValue("section", e.value);
              clear("section");
            }}
            placeholder="Select Section"
            className="w-full"
          />
        </Field>
      )}
      <Field label="Title" required id="title" error={errors.title}>
        <InputText
          name="title"
          placeholder="Enter Title"
          value={values.title}
          onChange={(e) => {
            handleChange(e);
            clear("title");
          }}
          className="w-full p-2"
        />
      </Field>
      <Field
        label="PDF File"
        required={!isEdit}
        id="file"
        error={errors.file}
        hint={`PDF, up to ${MAX_PDF_MB} MB.${isEdit ? " Leave empty to keep the current PDF." : ""}`}>
        <InputText
          type="file"
          name="file"
          accept="application/pdf,.pdf"
          onChange={(e) => {
            const picked = e.target.files[0] || null;
            const problem = picked ? checkPdf(picked) : "";
            if (problem) {
              e.target.value = "";
              show({ file: problem });
            } else {
              clear("file");
            }
            setFile(problem ? null : picked);
          }}
          className="w-full p-2"
        />
      </Field>
      {highlightOption && (
        <label className="flex cursor-pointer items-center gap-3">
          <Checkbox
            inputId="highlight"
            checked={values.highlight}
            onChange={(e) => setValue("highlight", e.checked)}
          />
          <span className="text-gray-800">
            Highlight (shown with a blinking yellow highlight on the home page)
          </span>
        </label>
      )}
    </FormDialog>
  );
};

export default PdfFormModal;
