import { useState } from "react";
import Field from "./Field";
import { InputText } from "primereact/inputtext";
import { IMAGE_ACCEPT, MAX_IMAGE_MB, checkImage } from "../../constants/uploads";

// File picker for an image, with a preview of the current one when editing.
// A file that is the wrong type or too large is refused here, with the reason
// shown under the field (`error` is for messages from the form's own checks).
const ImageInput = ({ label = "Image", required, currentUrl, onChange, error }) => {
  const [pickError, setPickError] = useState("");

  const handleChange = (event) => {
    const file = event.target.files[0] || null;
    const problem = file ? checkImage(file) : "";
    setPickError(problem);
    if (problem) event.target.value = "";
    onChange(problem ? null : file);
  };

  return (
    <Field
      label={label}
      required={required && !currentUrl}
      id="image"
      error={pickError || error}
      hint={`JPG or PNG, up to ${MAX_IMAGE_MB} MB.`}>
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
        accept={IMAGE_ACCEPT}
        onChange={handleChange}
        className="w-full p-2"
      />
    </Field>
  );
};

export default ImageInput;
