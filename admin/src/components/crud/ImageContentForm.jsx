import { useCallback, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { useNotify } from "../../context/NotificationContext";
import { useFormValues } from "../../hooks/useFormValues";
import { useFieldErrors } from "../../hooks/useFieldErrors";
import Field from "../forms/Field";
import FormDialog from "../forms/FormDialog";
import ImageInput from "../forms/ImageInput";
import DateInput from "../forms/DateInput";
import BlockBuilder from "../forms/BlockBuilder";
import { serializeBlocks, validateBlocks, withKeys } from "../../utils/blocks";

// Add (item = null) or edit dialog generated from a ContentManager config.
const ImageContentForm = ({ config, resource, isOpen, onClose, item }) => {
  const { entity, fields } = config;
  const isEdit = Boolean(item);
  const notify = useNotify();
  const [image, setImage] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [blockErrors, setBlockErrors] = useState({});
  const { errors, clear, reset, fail, show } = useFieldErrors();

  // Editing a block clears its own error (blocks that were not touched keep theirs).
  const changeBlocks = (next) => {
    setBlocks(next);
    setBlockErrors((prev) =>
      Object.fromEntries(
        Object.entries(prev).filter(([key]) =>
          next.some((block) => block._key === key && blocks.includes(block))
        )
      )
    );
  };

  const toValues = useCallback(
    (record) =>
      Object.fromEntries(
        fields
          .filter((field) => field.type !== "image")
          .map((field) => [
            field.name,
            // The date picker needs YYYY-MM-DD; dates are stored as "15 Oct 2026".
            (field.type === "date" ? record?.dateIso : null) || record?.[field.name] || "",
          ])
      ),
    [fields]
  );
  const { values, setValue, handleChange } = useFormValues(
    isOpen,
    item,
    toValues
  );

  // Page-builder layout (only for configs with `blocks: true`, e.g. achievements).
  useEffect(() => {
    if (isOpen) {
      setBlocks(withKeys(item?.blocks));
      setBlockErrors({});
    }
  }, [isOpen, item]);

  const handleClose = () => {
    reset();
    setImage(null);
    onClose();
  };

  const handleSubmit = async () => {
    // Every problem is shown under its own field.
    const found = {};
    fields.forEach((field) => {
      if (!field.required) return;
      const name = field.label.toLowerCase();
      if (field.type === "image") {
        if (!image && !item?.[field.key]) found.image = `Choose an image.`;
      } else if (!String(values[field.name]).trim()) {
        found[field.name] =
          field.type === "select" || field.type === "date" ? `Select a ${name}.` : `Enter the ${name}.`;
      }
    });
    if (Object.keys(found).length) fail(found);
    if (config.blocks) {
      const problems = validateBlocks(blocks);
      setBlockErrors(problems);
      const firstBad = blocks.find((block) => problems[block._key]);
      if (firstBad) {
        // Jump to the block that needs fixing; its message is shown there.
        document
          .getElementById(`block-${firstBad._key}`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
        const stop = new Error("Fix the highlighted block.");
        stop.silent = true;
        throw stop;
      }
    }
    const payload = config.blocks
      ? {
          ...values,
          blocks: serializeBlocks(blocks),
        }
      : values;
    if (isEdit) await resource.update(item._id, payload, image);
    else await resource.create(payload, image);
    notify.success(isEdit ? `${entity} updated.` : `${entity} added.`);
  };

  return (
    <FormDialog
      onFieldErrors={show}
      entity={entity}
      isEdit={isEdit}
      visible={isOpen}
      onHide={handleClose}
      onSubmit={handleSubmit}>
      {fields.map((field) => {
        if (field.type === "image") {
          return (
            <ImageInput
              key="image"
              label={field.label}
              required={field.required}
              currentUrl={item?.[field.key]}
              error={errors.image}
              onChange={(file) => {
                setImage(file);
                clear("image");
              }}
            />
          );
        }
        if (field.type === "select") {
          return (
            <Field
              key={field.name}
              label={field.label}
              required={field.required}
              id={field.name}
              error={errors[field.name]}>
              <Dropdown
                name={field.name}
                value={values[field.name]}
                options={field.options}
                onChange={(e) => {
                  setValue(field.name, e.value);
                  clear(field.name);
                }}
                placeholder={field.placeholder}
                className="w-full"
              />
            </Field>
          );
        }
        if (field.type === "date") {
          return (
            <Field
              key={field.name}
              label={field.label}
              required={field.required}
              id={field.name}
              error={errors[field.name]}
              hint={field.hint}>
              <DateInput
                name={field.name}
                value={values[field.name]}
                placeholder={field.placeholder}
                onChange={(value) => {
                  setValue(field.name, value);
                  clear(field.name);
                }}
              />
            </Field>
          );
        }
        const Control = field.type === "textarea" ? InputTextarea : InputText;
        return (
          <Field
            key={field.name}
            label={field.label}
            required={field.required}
            id={field.name}
            error={errors[field.name]}
            hint={field.hint}>
            <Control
              name={field.name}
              placeholder={field.placeholder}
              value={values[field.name]}
              onChange={(e) => {
                handleChange(e);
                clear(field.name);
              }}
              rows={field.type === "textarea" ? 5 : undefined}
              cols={field.type === "textarea" ? 50 : undefined}
              className="w-full p-2"
            />
          </Field>
        );
      })}
      {config.blocks && <BlockBuilder blocks={blocks} onChange={changeBlocks} errors={blockErrors} />}
    </FormDialog>
  );
};

export default ImageContentForm;
