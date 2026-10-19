import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Trash2 } from "lucide-react";
import { useFaculty } from "../../context";
import { useNotify } from "../../context/NotificationContext";
import { useFormValues } from "../../hooks/useFormValues";
import { useFieldErrors } from "../../hooks/useFieldErrors";
import {
  FACULTY_DEPARTMENT_OPTIONS,
  designationsFor,
} from "../../constants/options";
import Field from "../../components/forms/Field";
import DateInput from "../../components/forms/DateInput";
import FormDialog from "../../components/forms/FormDialog";
import ImageInput from "../../components/forms/ImageInput";
import RowListEditor from "../../components/forms/RowListEditor";
import { FormSection } from "../../components/forms/FormParts";
import { PROFILE_SECTIONS, validateProfileRows } from "./profileSections";

const OTHER_DESIGNATION = "Other";

const toValues = (faculty) => ({
  publications: Array.isArray(faculty?.publications) ? faculty.publications : [],
  conferences: Array.isArray(faculty?.conferences) ? faculty.conferences : [],
  books: Array.isArray(faculty?.books) ? faculty.books : [],
  name: faculty?.name || "",
  email: faculty?.email || "",
  // "N/A" is what is stored when no number was given: show the box empty.
  phone: faculty?.phone && faculty.phone !== "N/A" ? faculty.phone : "",
  department: faculty?.department || "",
  designation: faculty?.designation || "",
  // The date picker needs YYYY-MM-DD; dates are stored as "15 Oct 2026".
  joinedDate: faculty?.joinedDateIso || faculty?.joinedDate || "",
  education: Array.isArray(faculty?.education) ? faculty.education : [],
});

// Add (faculty = null) or edit a faculty member. Experience is not entered:
// the backend calculates it from the joined date.
const FacultyFormModal = ({ isOpen, onClose, faculty }) => {
  const isEdit = Boolean(faculty);
  const { create, update } = useFaculty();
  const notify = useNotify();
  const { values, setValue, handleChange } = useFormValues(isOpen, faculty, toValues);
  const [image, setImage] = useState(null);
  const [newEducation, setNewEducation] = useState("");
  const { errors, clear, reset, fail, show } = useFieldErrors();

  // Typing in a field clears its message.
  const onField = (e) => {
    handleChange(e);
    clear(e.target.name);
  };
  // { publications: { [rowIndex]: message }, ... }, shown on the entries themselves.
  const [rowErrors, setRowErrors] = useState({});

  // Editing a table clears the messages of the entries that changed.
  const changeRows = (name, rows) => {
    const previous = values[name];
    setValue(name, rows);
    setRowErrors((prev) => {
      const kept = Object.fromEntries(
        Object.entries(prev[name] || {}).filter(
          ([index]) => rows.length === previous.length && rows[index] === previous[index]
        )
      );
      return { ...prev, [name]: kept };
    });
  };

  // The designation list depends on the department, plus "Other" for a custom
  // title. A saved title that is not on the list is shown as "Other".
  const allowed = designationsFor(values.department);
  const [otherChosen, setOtherChosen] = useState(false);
  const isOther =
    otherChosen || (values.designation !== "" && !allowed.includes(values.designation));
  const designationOptions = [...allowed, OTHER_DESIGNATION];

  const handleDesignationChange = (value) => {
    if (value === OTHER_DESIGNATION) {
      setOtherChosen(true);
      setValue("designation", allowed.includes(values.designation) ? "" : values.designation);
    } else {
      setOtherChosen(false);
      setValue("designation", value);
    }
  };

  const handleDepartmentChange = (department) => {
    setValue("department", department);
    // The chosen title may not exist in the new department's list; a custom
    // title is kept.
    if (!isOther && !designationsFor(department).includes(values.designation))
      setValue("designation", "");
  };

  const handleClose = () => {
    setOtherChosen(false);
    setImage(null);
    setNewEducation("");
    setRowErrors({});
    reset();
    onClose();
  };

  const addEducation = () => {
    const value = newEducation.trim();
    if (!value) return;
    setValue("education", [...values.education, value]);
    clear("education");
    setNewEducation("");
  };

  const removeEducation = (index) =>
    setValue(
      "education",
      values.education.filter((_, i) => i !== index)
    );

  const handleSubmit = async () => {
    const found = {};
    if (!values.name.trim()) found.name = "Enter the faculty member's name.";
    if (!values.email.trim()) found.email = "Enter the email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      found.email = "Enter a valid email address, like name@example.com.";
    if (values.phone.trim() && !/^\+?[\d\s-]{7,15}$/.test(values.phone.trim()))
      found.phone = "Enter 7 to 15 digits, like 98765 43210, or leave it empty.";
    if (!values.joinedDate) found.joinedDate = "Select the date of joining.";
    else if (new Date(values.joinedDate) > new Date())
      found.joinedDate = "The joined date cannot be in the future.";
    if (!values.department) found.department = "Select a department.";
    if (!values.designation.trim())
      found.designation = isOther ? "Enter the designation." : "Select a designation.";
    if (values.education.length === 0)
      found.education = "Add at least one qualification, then press Add.";
    if (newEducation.trim())
      found.education = "Press Add to save the qualification you typed.";

    // Problems in the profile tables are shown on the entries that have them.
    const problems = Object.fromEntries(
      PROFILE_SECTIONS.map(({ name }) => [name, validateProfileRows(values[name])])
    );
    setRowErrors(problems);
    const firstBad = PROFILE_SECTIONS.flatMap(({ name }) =>
      Object.keys(problems[name]).map((index) => `${name}-${index}`)
    )[0];
    if (Object.keys(found).length) fail(found);
    if (firstBad) {
      document
        .getElementById(`row-${firstBad}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      const stop = new Error("Fix the highlighted entry.");
      stop.silent = true;
      throw stop;
    }

    // Table sections travel as JSON strings.
    const payload = {
      ...values,
      publications: JSON.stringify(values.publications),
      conferences: JSON.stringify(values.conferences),
      books: JSON.stringify(values.books),
    };
    if (isEdit) await update(faculty._id, payload, image);
    else await create(payload, image);
    notify.success(isEdit ? "Faculty updated." : "Faculty added.");
  };

  return (
    <FormDialog
      onFieldErrors={show}
      entity="Faculty"
      isEdit={isEdit}
      visible={isOpen}
      onHide={handleClose}
      onSubmit={handleSubmit}>
      <Field label="Name" required id="name" error={errors.name}>
        <InputText
          name="name"
          placeholder="e.g. Er. Rajesh Kumar"
          value={values.name}
          onChange={onField}
          className="w-full p-2"
        />
      </Field>
      <Field label="Email" required id="email" error={errors.email}>
        <InputText
          type="email"
          name="email"
          placeholder="e.g. name@example.com"
          value={values.email}
          onChange={onField}
          className="w-full p-2"
        />
      </Field>
      <Field label="Phone" id="phone" error={errors.phone} hint="Optional. Shown as N/A when left empty.">
        <InputText
          type="tel"
          name="phone"
          placeholder="e.g. 98765 43210"
          value={values.phone}
          onChange={onField}
          className="w-full p-2"
        />
      </Field>
      <Field
        label="Joined Date"
        required
        id="joinedDate"
        error={errors.joinedDate}
        hint="Experience is calculated automatically from this date.">
        <DateInput
          name="joinedDate"
          value={values.joinedDate}
          onChange={(value) => onField({ target: { name: "joinedDate", value } })}
        />
      </Field>
      <Field label="Department" required id="department" error={errors.department}>
        <Dropdown
          name="department"
          value={values.department}
          options={FACULTY_DEPARTMENT_OPTIONS}
          onChange={(e) => {
            handleDepartmentChange(e.value);
            clear("department");
          }}
          placeholder="Select a department"
          className="w-full"
        />
      </Field>
      <Field label="Designation" required id="designation" error={errors.designation}>
        <Dropdown
          name="designation"
          value={isOther ? OTHER_DESIGNATION : values.designation}
          options={designationOptions}
          onChange={(e) => {
            handleDesignationChange(e.value);
            clear("designation");
          }}
          placeholder={
            values.department ? "Select a designation" : "Select a department first"
          }
          disabled={!values.department}
          className="w-full"
        />
        {isOther && (
          <div className="mt-3">
            <InputText
              value={values.designation}
              onChange={(e) => {
                setValue("designation", e.target.value);
                clear("designation");
              }}
              placeholder="e.g. Senior Lecturer"
              className="w-full p-2"
            />
          </div>
        )}
      </Field>
      <ImageInput
        currentUrl={faculty?.image}
        error={errors.image}
        onChange={(file) => {
          setImage(file);
          clear("image");
        }}
      />
      <Field label="Education" required id="education" error={errors.education}>
        <div className="flex gap-2 mb-2">
          <InputText
            value={newEducation}
            onChange={(e) => {
              setNewEducation(e.target.value);
              clear("education");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addEducation();
              }
            }}
            placeholder="e.g. M.Tech (CSE), then press Add"
            className="flex-1 p-2"
          />
          <Button
            type="button"
            label="Add"
            className="p-button-success"
            onClick={addEducation}
          />
        </div>
        <div className="space-y-2">
          {values.education.map((qualification, index) => (
            <div
              key={`${qualification}-${index}`}
              className="flex items-center gap-2 bg-gray-100 p-2 rounded">
              <span className="flex-1">{qualification}</span>
              <Button
                type="button"
                icon={<Trash2 />}
                className="p-button-danger p-button-text"
                onClick={() => removeEducation(index)}
              />
            </div>
          ))}
        </div>
      </Field>

      <FormSection title="Profile Tables" note="Optional. Each table shows on the faculty profile page.">
        <div className="flex flex-col gap-6">
          {PROFILE_SECTIONS.map(({ name, title, columns }) => (
            <RowListEditor
              key={name}
              title={title}
              columns={columns}
              rows={values[name]}
              onChange={(rows) => changeRows(name, rows)}
              errors={rowErrors[name]}
              idPrefix={`row-${name}`}
            />
          ))}
        </div>
      </FormSection>
    </FormDialog>
  );
};

export default FacultyFormModal;
