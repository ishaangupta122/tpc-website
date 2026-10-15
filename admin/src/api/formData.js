// Builds the multipart body the backend's upload endpoints expect.
//   data       plain fields; null/undefined are skipped, arrays are sent as
//              `key[]` entries so the backend receives a real array
//   file       optional File for the upload field
//   fileField  name of the upload field (`image` or `file`). A same-named key
//              in `data` is ignored: it holds the *current* URL, which must
//              never be sent back as if it were a new upload.
export const buildFormData = (data = {}, file = null, fileField = "image") => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === fileField || value === undefined || value === null) return;
    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(`${key}[]`, item));
    } else {
      formData.append(key, value);
    }
  });

  if (file) formData.append(fileField, file);
  return formData;
};
