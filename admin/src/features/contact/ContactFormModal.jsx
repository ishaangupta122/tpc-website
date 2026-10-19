import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { contactApi } from "../../api";
import { useNotify } from "../../context/NotificationContext";
import { useFieldErrors } from "../../hooks/useFieldErrors";
import { CONTACT_DEFAULTS } from "../../constants/contactDefaults";
import Field from "../../components/forms/Field";
import FormDialog from "../../components/forms/FormDialog";

const PHONE = /^\+?[\d\s-]{7,15}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const toValues = (contact) => ({
  name: contact?.name || "",
  address: contact?.address || "",
  phones: (contact?.phones || []).join(", "),
  email: contact?.email || "",
  hours: contact?.hours || "",
});

// Add (contact = null, starts from the built-in details) or edit the details.
const ContactFormModal = ({ isOpen, onClose, contact, onSaved }) => {
  const isEdit = Boolean(contact);
  const notify = useNotify();
  const [values, setValues] = useState(() => toValues(CONTACT_DEFAULTS));
  const { errors, clear, reset, fail, show } = useFieldErrors();

  useEffect(() => {
    if (isOpen) {
      setValues(toValues(contact || CONTACT_DEFAULTS));
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, contact]);

  const set = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    clear(name);
  };

  const handleSubmit = async () => {
    const found = {};
    const phones = values.phones
      .split(",")
      .map((phone) => phone.trim())
      .filter(Boolean);
    if (!values.name.trim()) found.name = "Enter the college name.";
    if (!values.address.trim()) found.address = "Enter the address.";
    if (phones.length === 0) found.phones = "Enter at least one phone number.";
    else if (phones.some((phone) => !PHONE.test(phone)))
      found.phones = "Each number needs 7 to 15 digits, like 75088-55997. Separate with commas.";
    if (!values.email.trim()) found.email = "Enter the email address.";
    else if (!EMAIL.test(values.email.trim()))
      found.email = "Enter a valid email address, like admissions@college.edu.";
    if (Object.keys(found).length) fail(found);

    await contactApi.save({ ...values, phones });
    notify.success(isEdit ? "Contact details updated." : "Contact details added.");
    await onSaved();
  };

  return (
    <FormDialog
      onFieldErrors={show}
      entity="Contact Details"
      isEdit={isEdit}
      visible={isOpen}
      onHide={() => {
        reset();
        onClose();
      }}
      onSubmit={handleSubmit}>
      <Field label="College Name" required id="name" error={errors.name}>
        <InputText
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="e.g. Thapar Polytechnic College"
          className="w-full p-2"
        />
      </Field>
      <Field
        label="Address"
        required
        id="address"
        error={errors.address}
        hint="One line per row, as it appears on the Contact page.">
        <InputTextarea
          value={values.address}
          onChange={(e) => set("address", e.target.value)}
          placeholder={"e.g. Thapar Technology Campus, Bhadson Road,\nPatiala, Punjab - 147001, India"}
          rows={3}
          className="w-full p-2"
        />
      </Field>
      <Field
        label="Phone Numbers"
        required
        id="phones"
        error={errors.phones}
        hint="Separate with commas. The first one is shown in the top bar.">
        <InputText
          value={values.phones}
          onChange={(e) => set("phones", e.target.value)}
          placeholder="e.g. 75088-55997, 90563-40134"
          className="w-full p-2"
        />
      </Field>
      <Field label="Email" required id="email" error={errors.email}>
        <InputText
          type="email"
          value={values.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="e.g. admissions@college.edu"
          className="w-full p-2"
        />
      </Field>
      <Field label="Office Hours" id="hours" hint="Optional.">
        <InputText
          value={values.hours}
          onChange={(e) => set("hours", e.target.value)}
          placeholder="e.g. Monday – Friday: 9:00 AM – 5:00 PM"
          className="w-full p-2"
        />
      </Field>
    </FormDialog>
  );
};

export default ContactFormModal;
