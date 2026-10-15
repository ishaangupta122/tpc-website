import { useCallback, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { useNotify } from "../../context/NotificationContext";
import { useFormValues } from "../../hooks/useFormValues";
import Field from "../forms/Field";
import FormDialog from "../forms/FormDialog";
import ImageInput from "../forms/ImageInput";

// Add (item = null) or edit dialog generated from a ContentManager config.
const ImageContentForm = ({ config, resource, isOpen, onClose, item }) => {
  const { entity, fields } = config;
  const isEdit = Boolean(item);
  const notify = useNotify();
  const [image, setImage] = useState(null);

  const toValues = useCallback(
    (record) =>
      Object.fromEntries(
        fields
          .filter((field) => field.type !== "image")
          .map((field) => [field.name, record?.[field.name] || ""])
      ),
    [fields]
  );
  const { values, setValue, handleChange } = useFormValues(
    isOpen,
    item,
    toValues
  );

  const handleClose = () => {
    setImage(null);
    onClose();
  };

  const handleSubmit = async () => {
    const missing = fields.find(
      (field) => field.type === "select" && field.required && !values[field.name]
    );
    if (missing) throw new Error(`Please select a ${missing.label.toLowerCase()}.`);
    if (isEdit) await resource.update(item._id, values, image);
    else await resource.create(values, image);
    notify.success(isEdit ? `${entity} updated.` : `${entity} added.`);
  };

  return (
    <FormDialog
      header={isEdit ? `Update ${entity}` : `Add ${entity}`}
      visible={isOpen}
      onHide={handleClose}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? `Update ${entity}` : `Add ${entity}`}
      submittingLabel={isEdit ? "Updating..." : "Adding..."}
      submitClassName={isEdit ? "p-button-warning" : "p-button-success"}>
      {fields.map((field) => {
        if (field.type === "image") {
          return (
            <ImageInput
              key="image"
              label={field.label}
              required={field.required}
              currentUrl={item?.[field.key]}
              onChange={setImage}
            />
          );
        }
        if (field.type === "select") {
          return (
            <Field key={field.name} label={field.label} required={field.required}>
              <Dropdown
                name={field.name}
                value={values[field.name]}
                options={field.options}
                onChange={(e) => setValue(field.name, e.value)}
                placeholder={field.placeholder}
                className="w-full"
              />
            </Field>
          );
        }
        const Control = field.type === "textarea" ? InputTextarea : InputText;
        return (
          <Field key={field.name} label={field.label} required={field.required}>
            <Control
              name={field.name}
              type={field.type === "date" ? "date" : undefined}
              required={field.required}
              placeholder={field.placeholder}
              value={values[field.name]}
              onChange={handleChange}
              rows={field.type === "textarea" ? 5 : undefined}
              cols={field.type === "textarea" ? 50 : undefined}
              className="w-full p-2"
            />
          </Field>
        );
      })}
    </FormDialog>
  );
};

export default ImageContentForm;
