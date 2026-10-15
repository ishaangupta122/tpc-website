import Field from "./Field";
import { InputText } from "primereact/inputtext";

// File picker for an image, with a preview of the current one when editing.
const ImageInput = ({ label = "Image", required, currentUrl, onChange }) => (
  <Field label={label} required={required && !currentUrl}>
    {currentUrl && (
      <div className="h-48 w-1/2 mb-4">
        <img
          src={currentUrl}
          alt={label}
          className="h-full w-full border border-neutral-300 object-cover rounded-md"
        />
      </div>
    )}
    <InputText
      type="file"
      name="image"
      required={required && !currentUrl}
      accept="image/*"
      onChange={(e) => onChange(e.target.files[0] || null)}
      className="w-full p-2"
    />
  </Field>
);

export default ImageInput;
