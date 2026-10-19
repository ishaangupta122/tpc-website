import { useCallback, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { usePolicies } from "../../context";
import { useNotify } from "../../context/NotificationContext";
import Field from "../../components/forms/Field";
import FormDialog from "../../components/forms/FormDialog";
import { AddButton, FormSection, GroupCard, RemoveButton } from "../../components/forms/FormParts";
import { newKey } from "../../utils/blocks";
import { useFieldErrors } from "../../hooks/useFieldErrors";
import { fromFormSections, toFormSections } from "./policySections";

const toValues = (policy) => ({
  title: policy?.title || "",
  sections: toFormSections(policy),
});

// Add (policy = null) or edit one policy card.
const PolicyFormModal = ({ isOpen, onClose, policy }) => {
  const isEdit = Boolean(policy);
  const { create, update } = usePolicies();
  const notify = useNotify();
  const [values, setValues] = useState(() => toValues(policy));
  const { errors, clear, reset, fail, show } = useFieldErrors();

  useEffect(() => {
    if (isOpen) {
      setValues(toValues(policy));
      reset();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, policy]);

  const set = useCallback((patch) => setValues((prev) => ({ ...prev, ...patch })), []);
  const setField = (name, value) => {
    set({ [name]: value });
    clear(name);
  };
  const setSection = (key, patch) =>
    set({
      sections: values.sections.map((section) =>
        section._key === key ? { ...section, ...patch } : section
      ),
    });

  const handleSubmit = async () => {
    const found = {};
    if (!values.title.trim()) found.title = "Enter the policy title.";
    // Every section needs at least one point.
    values.sections.forEach((section) => {
      const hasPoint = section.points.split("\n").some((line) => line.trim());
      if (!hasPoint) found[`section-${section._key}`] = "Add at least one point.";
    });
    if (Object.keys(found).length) fail(found);
    const payload = {
      title: values.title.trim(),
      ...fromFormSections(values.sections),
    };
    if (isEdit) await update(policy._id, payload);
    else await create(payload);
    notify.success(isEdit ? "Policy updated." : "Policy added.");
  };

  return (
    <FormDialog
      onFieldErrors={show}
      entity="Policy"
      isEdit={isEdit}
      visible={isOpen}
      onHide={() => {
        reset();
        onClose();
      }}
      onSubmit={handleSubmit}>
      <Field label="Policy Title" required id="title" error={errors.title}>
        <InputText
          value={values.title}
          onChange={(e) => setField("title", e.target.value)}
          placeholder="e.g. Attendance Policy"
          className="w-full p-2"
        />
      </Field>

      <FormSection
        title="Sections"
        action={
          <AddButton
            onClick={() =>
              set({ sections: [...values.sections, { _key: newKey(), heading: "", points: "" }] })
            }>
            Add section
          </AddButton>
        }>
        <div className="flex flex-col gap-3">
          {values.sections.map((section, index) => (
            <GroupCard
              key={section._key}
              id={`field-section-${section._key}`}
              error={errors[`section-${section._key}`]}
              title={`Section ${index + 1}`}
              actions={
                values.sections.length > 1 && (
                  <RemoveButton
                    onClick={() =>
                      set({ sections: values.sections.filter((x) => x._key !== section._key) })
                    }
                  />
                )
              }>
              <div className="flex flex-col gap-4">
                <Field label="Section Heading (optional)">
                  <InputText
                    value={section.heading}
                    onChange={(e) => {
                      setSection(section._key, { heading: e.target.value });
                    }}
                    placeholder="e.g. Eligibility (leave empty for no heading)"
                    className="w-full p-2"
                  />
                </Field>
                <Field label="Points" hint="One point per line. Shown as a bullet list.">
                  <InputTextarea
                    value={section.points}
                    onChange={(e) => {
                      setSection(section._key, { points: e.target.value });
                      clear(`section-${section._key}`);
                    }}
                    rows={5}
                    placeholder={"Write one point per line, for example:\n75% attendance is required in every subject\nMedical leave needs a certificate"}
                    className="w-full p-2"
                  />
                </Field>
              </div>
            </GroupCard>
          ))}
        </div>
      </FormSection>
    </FormDialog>
  );
};

export default PolicyFormModal;
