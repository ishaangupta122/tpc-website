// Upload limits: keep in step with the backend (storage.constants.ts).
export const MAX_IMAGE_MB = 5;
export const MAX_PDF_MB = 20;
export const IMAGE_ACCEPT = "image/png,image/jpeg";

const tooBig = (file, megabytes) => file.size > megabytes * 1024 * 1024;
const sizeText = (file) => `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

// Each check returns a message for the field, or "" when the file is fine.
export const checkImage = (file) => {
  if (!["image/jpeg", "image/png"].includes(file.type))
    return "Choose a JPG or PNG image.";
  if (tooBig(file, MAX_IMAGE_MB))
    return `This image is too large (${sizeText(file)}). The limit is ${MAX_IMAGE_MB} MB.`;
  return "";
};

export const checkPdf = (file) => {
  if (file.type !== "application/pdf" && !/\.pdf$/i.test(file.name))
    return "Choose a PDF file.";
  if (tooBig(file, MAX_PDF_MB))
    return `This file is too large (${sizeText(file)}). The limit is ${MAX_PDF_MB} MB.`;
  return "";
};
