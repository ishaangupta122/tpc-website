import { useCallback, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { principalApi } from "../../api";
import { useNotify } from "../../context/NotificationContext";
import { PRINCIPAL_DEFAULTS } from "../../constants/principalDefaults";
import { useFieldErrors } from "../../hooks/useFieldErrors";
import Field from "../../components/forms/Field";
import FormDialog from "../../components/forms/FormDialog";
import { AddButton, FormSection, GroupCard, RemoveButton } from "../../components/forms/FormParts";
import ImageInput from "../../components/forms/ImageInput";

const newKey = () => Math.random().toString(36).slice(2);

// Highlight cards are edited with the bullet points as one per line.
const toForm = (data) => ({
  name: data.name || "",
  message: data.message || "",
  highlights: (data.highlights || []).map((card) => ({
    _key: newKey(),
    title: card.title || "",
    points: (card.points || []).join("\n"),
  })),
});

// Add (principal = null, starts from the built-in content) or edit the page.
const PrincipalFormModal = ({ isOpen, onClose, principal, onSaved }) => {
  const isEdit = Boolean(principal);
  const notify = useNotify();
  const [values, setValues] = useState(() => toForm(PRINCIPAL_DEFAULTS));
  const [image, setImage] = useState(null);
  const { errors, clear, reset, fail, show } = useFieldErrors();

  useEffect(() => {
    // Any part not saved yet starts from the website's built-in content.
    if (isOpen)
      setValues(
        toForm({
          name: principal?.name || PRINCIPAL_DEFAULTS.name,
          message: principal?.message || PRINCIPAL_DEFAULTS.message,
          highlights: principal?.highlights?.length
            ? principal.highlights
            : PRINCIPAL_DEFAULTS.highlights,
        })
      );
  }, [isOpen, principal]);

  const set = useCallback((patch) => setValues((prev) => ({ ...prev, ...patch })), []);
  const setField = (name, value) => {
    set({ [name]: value });
    clear(name);
  };
  const setCard = (key, patch) =>
    set({
      highlights: values.highlights.map((card) =>
        card._key === key ? { ...card, ...patch } : card
      ),
    });

  const handleClose = () => {
    reset();
    setImage(null);
    onClose();
  };

  const handleSubmit = async () => {
    const found = {};
    if (!values.name.trim()) found.name = "Enter the principal's name.";
    if (!values.message.trim()) found.message = "Enter the principal's message.";
    // A card needs a title and at least one point.
    values.highlights.forEach((card) => {
      const hasPoint = card.points.split("\n").some((line) => line.trim());
      if (!card.title.trim()) found[`card-${card._key}`] = "Enter the card title.";
      else if (!hasPoint) found[`card-${card._key}`] = "Add at least one point.";
    });
    if (Object.keys(found).length) fail(found);

    await principalApi.save(
      {
        name: values.name,
        message: values.message,
        highlights: JSON.stringify(
          values.highlights.map(({ title, points }) => ({
            title,
            points: points.split("\n"),
          }))
        ),
      },
      image
    );
    notify.success(isEdit ? "Principal page updated." : "Principal page added.");
    setImage(null);
    await onSaved();
  };

  return (
    <FormDialog
      onFieldErrors={show}
      entity="Principal Page"
      isEdit={isEdit}
      visible={isOpen}
      onHide={handleClose}
      onSubmit={handleSubmit}>
      <Field label="Principal Name" required id="name" error={errors.name}>
        <InputText
          value={values.name}
          onChange={(e) => setField("name", e.target.value)}
          placeholder="e.g. Dr. Ankush Kansal"
          className="w-full p-2"
        />
      </Field>

      <ImageInput
        currentUrl={principal?.image}
        error={errors.image}
        onChange={(file) => {
          setImage(file);
          clear("image");
        }}
      />

      <Field
        label="Message"
        required
        id="message"
        error={errors.message}
        hint="Leave a blank line between paragraphs.">
        <InputTextarea
          value={values.message}
          onChange={(e) => setField("message", e.target.value)}
          placeholder="Write the principal's message to students and parents."
          rows={12}
          className="w-full p-2"
        />
      </Field>

      <FormSection
        title="Key Highlights"
        action={
          <AddButton
            onClick={() =>
              set({
                highlights: [...values.highlights, { _key: newKey(), title: "", points: "" }],
              })
            }>
            Add card
          </AddButton>
        }>
        {values.highlights.length === 0 ? (
          <p className="rounded-md border border-dashed border-gray-300 py-4 text-center text-xs text-gray-500">
            No highlight cards yet.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {values.highlights.map((card, index) => (
              <GroupCard
                key={card._key}
                id={`field-card-${card._key}`}
                error={errors[`card-${card._key}`]}
                title={`Card ${index + 1}`}
                actions={
                  <RemoveButton
                    onClick={() =>
                      set({ highlights: values.highlights.filter((c) => c._key !== card._key) })
                    }
                  />
                }>
                <div className="flex flex-col gap-4">
                  <Field label="Card Title">
                    <InputText
                      value={card.title}
                      onChange={(e) => {
                        setCard(card._key, { title: e.target.value });
                        clear(`card-${card._key}`);
                      }}
                      placeholder="e.g. Infrastructure Development"
                      className="w-full p-2"
                    />
                  </Field>
                  <Field label="Points" hint="One point per line. Shown as a bullet list.">
                    <InputTextarea
                      value={card.points}
                      onChange={(e) => {
                        setCard(card._key, { points: e.target.value });
                        clear(`card-${card._key}`);
                      }}
                      rows={4}
                      placeholder={"Write one point per line, for example:\nFully equipped workshops and labs\nExcellent sports facilities"}
                      className="w-full p-2"
                    />
                  </Field>
                </div>
              </GroupCard>
            ))}
          </div>
        )}
      </FormSection>
    </FormDialog>
  );
};

export default PrincipalFormModal;
