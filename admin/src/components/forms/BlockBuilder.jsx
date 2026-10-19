import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import {
  ArrowDown,
  ArrowUp,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import { uploadBlockImage } from "../../api";
import { checkImage } from "../../constants/uploads";
import { newKey } from "../../utils/blocks";
import { BLOCK_TYPES as TYPES } from "./blockTypes";
import { FormSection, GroupCard } from "./FormParts";
import HtmlEditor from "./HtmlEditor";

// Page builder for a detail page (achievements, events, success stories). The admin picks the blocks,
// their order, content and (where it applies) the layout orientation. All
// styling is fixed by the website, so every page stays consistent.


const newBlock = (type) => ({
  _key: newKey(),
  type,
  text: "",
  html: "",
  image: "",
  images: [],
  side: "left",
  cols: 3,
});

const Label = ({ children }) => (
  <label className="mb-1 block text-sm font-medium text-gray-700">
    {children}
  </label>
);

// Segmented control for choosing between a few layout options.
const Segmented = ({ value, options, onChange }) => (
  <div className="inline-flex rounded-lg border border-gray-300 bg-gray-100 p-0.5">
    {options.map((option) => (
      <button
        key={option.value}
        type="button"
        onClick={() => onChange(option.value)}
        className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
          value === option.value
            ? "bg-white font-medium text-emerald-900 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}>
        {option.label}
      </button>
    ))}
  </div>
);

// Uploads photos one by one. A photo that is the wrong type or too large (or
// that the server refuses) is skipped and the reason is returned as `error`,
// to be shown under the upload box.
const useImageUpload = () => {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const upload = async (files) => {
    setBusy(true);
    setError("");
    const urls = [];
    const problems = [];
    for (const file of files) {
      const problem = checkImage(file);
      if (problem) {
        problems.push(`${file.name}: ${problem}`);
        continue;
      }
      try {
        urls.push(await uploadBlockImage(file));
      } catch (err) {
        problems.push(`${file.name}: ${err.fields?.image || err.message}`);
      }
    }
    setError(problems.join("\n"));
    setBusy(false);
    return urls;
  };
  return { busy, error, upload };
};

// Click-to-upload drop area.
const Dropzone = ({ multiple, busy, error, onFiles, children }) => (
  <>
    <label className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-5 text-center text-sm text-gray-600 transition-colors hover:border-emerald-600 hover:bg-emerald-50">
      <UploadCloud size={22} className="text-emerald-800" />
      <span>{busy ? "Uploading..." : children}</span>
      <span className="text-xs text-gray-500">JPG or PNG, up to 5 MB</span>
      <input
        type="file"
        accept="image/png,image/jpeg"
        multiple={multiple}
        disabled={busy}
        className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files);
          e.target.value = "";
          if (files.length) onFiles(files);
        }}
      />
    </label>
    {error && (
      <p role="alert" className="mt-1 whitespace-pre-line text-sm text-red-600">
        {error}
      </p>
    )}
  </>
);

const ImagePicker = ({ value, onUploaded }) => {
  const { busy, error, upload } = useImageUpload();
  return (
    <div>
      <Label>Photo</Label>
      {value && (
        <div className="relative mb-2 inline-block">
          <img src={value} alt="" className="h-32 rounded-md border border-gray-300 object-cover" />
          <button
            type="button"
            aria-label="Remove photo"
            onClick={() => onUploaded("")}
            className="absolute -right-2 -top-2 rounded-full bg-red-600 p-1 text-white shadow">
            <X size={12} />
          </button>
        </div>
      )}
      <Dropzone busy={busy} error={error} onFiles={async (files) => {
        const [url] = await upload(files.slice(0, 1));
        if (url) onUploaded(url);
      }}>
        {value ? "Replace photo" : "Click to upload a photo"}
      </Dropzone>
    </div>
  );
};

const GalleryPicker = ({ images, onChange }) => {
  const { busy, error, upload } = useImageUpload();
  return (
    <div>
      <Label>Photos</Label>
      {images.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {images.map((src, i) => (
            <div key={src + i} className="relative">
              <img src={src} alt="" className="h-20 w-28 rounded-md border border-gray-300 object-cover" />
              <button
                type="button"
                aria-label="Remove photo"
                onClick={() => onChange(images.filter((_, j) => j !== i))}
                className="absolute -right-2 -top-2 rounded-full bg-red-600 p-1 text-white shadow">
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
      <Dropzone multiple busy={busy} error={error} onFiles={async (files) => onChange([...images, ...(await upload(files))])}>
        Click to add photos (select several at once)
      </Dropzone>
    </div>
  );
};

const BlockFields = ({ block, set }) => {
  switch (block.type) {
    case "heading":
      return (
        <div>
          <Label>Heading</Label>
          <InputText
            value={block.text}
            onChange={(e) => set({ text: e.target.value })}
            placeholder="e.g. About the event"
            className="w-full p-2"
          />
        </div>
      );
    case "text":
      return (
        <div>
          <Label>Text</Label>
          <InputTextarea
            value={block.text}
            onChange={(e) => set({ text: e.target.value })}
            placeholder="Write the paragraph here."
            rows={5}
            className="w-full p-2"
          />
          <p className="mt-1 text-xs text-gray-500">Leave a blank line to start a new paragraph.</p>
        </div>
      );
    case "imagetext":
      return (
        <div className="space-y-4">
          <div>
            <Label>Layout</Label>
            <Segmented
              value={block.side}
              onChange={(side) => set({ side })}
              options={[
                { value: "left", label: "Photo left" },
                { value: "right", label: "Photo right" },
              ]}
            />
          </div>
          <ImagePicker value={block.image} onUploaded={(image) => set({ image })} />
          <div>
            <Label>Text</Label>
            <InputTextarea
              value={block.text}
              onChange={(e) => set({ text: e.target.value })}
              placeholder="Text shown beside the photo."
              rows={4}
              className="w-full p-2"
            />
          </div>
        </div>
      );
    case "gallery":
      return (
        <div className="space-y-4">
          <div>
            <Label>Layout</Label>
            <Segmented
              value={block.cols}
              onChange={(cols) => set({ cols })}
              options={[1, 2, 3, 4].map((n) => ({ value: n, label: n === 1 ? "1 column" : `${n} columns` }))}
            />
          </div>
          <GalleryPicker
            images={block.images}
            // Removing the last photo also clears the caption: it belongs to the photos.
            onChange={(images) => set(images.length ? { images } : { images, text: "" })}
          />
          {block.images.length > 0 && (
            <div>
              <Label>Caption for all photos (optional)</Label>
              <InputText
                value={block.text}
                onChange={(e) => set({ text: e.target.value })}
                placeholder="e.g. Students receiving the award"
                className="w-full p-2"
              />
            </div>
          )}
        </div>
      );
    case "html":
      return <HtmlEditor value={block.html} onChange={(html) => set({ html })} />;
    default:
      return null;
  }
};

const IconButton = ({ label, onClick, disabled, danger, children }) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    onClick={onClick}
    disabled={disabled}
    className={`rounded-md p-1.5 transition-colors disabled:opacity-30 ${
      danger ? "text-red-600 hover:bg-red-50" : "text-gray-600 hover:bg-gray-100"
    }`}>
    {children}
  </button>
);

const BlockBuilder = ({ blocks, onChange, errors = {} }) => {
  const update = (key, patch) =>
    onChange(blocks.map((b) => (b._key === key ? { ...b, ...patch } : b)));
  const move = (index, step) => {
    const next = [...blocks];
    [next[index], next[index + step]] = [next[index + step], next[index]];
    onChange(next);
  };

  return (
    <FormSection title="Detail page layout" note="Adding any block replaces the default page.">
      <div className="space-y-3">
        {blocks.map((block, index) => (
          <GroupCard
            key={block._key}
            id={`block-${block._key}`}
            title={`${index + 1}. ${TYPES[block.type].label}`}
            error={errors[block._key]}
            actions={
              <>
                <IconButton label="Move up" disabled={index === 0} onClick={() => move(index, -1)}>
                  <ArrowUp size={16} />
                </IconButton>
                <IconButton label="Move down" disabled={index === blocks.length - 1} onClick={() => move(index, 1)}>
                  <ArrowDown size={16} />
                </IconButton>
                <IconButton
                  label="Remove block"
                  danger
                  onClick={() => onChange(blocks.filter((b) => b._key !== block._key))}>
                  <Trash2 size={16} />
                </IconButton>
              </>
            }>
            <BlockFields block={block} set={(patch) => update(block._key, patch)} />
          </GroupCard>
        ))}
      </div>

      <div className={blocks.length ? "mt-4" : ""}>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Add a block</p>
        {/* 6-column grid: first row 3 tiles, second row 2 wider tiles, so no empty gap. */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-6">
          {Object.entries(TYPES).map(([type, { label, hint }], i) => (
            <button
              key={type}
              type="button"
              onClick={() => onChange([...blocks, newBlock(type)])}
              className={`flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-left transition-colors hover:border-emerald-700 hover:bg-emerald-50 ${
                i < 3 ? "sm:col-span-2" : "sm:col-span-3"
              } ${i === Object.keys(TYPES).length - 1 ? "col-span-2" : ""}`}>
              <span>
                <span className="block text-sm font-medium text-gray-800">{label}</span>
                <span className="block text-xs text-gray-500">{hint}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </FormSection>
  );
};

export default BlockBuilder;
