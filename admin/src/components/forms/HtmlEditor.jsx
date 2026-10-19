import { InputTextarea } from "primereact/inputtextarea";
import { FileUp } from "lucide-react";

// Textarea for HTML content, with a button to load it from an .html file.
// Scripts, inline styles and classes are removed on the website, which applies
// its own fonts and colours.
const HtmlEditor = ({ value, onChange, label = "HTML content" }) => {
  const loadFile = async (event) => {
    const file = event.target.files[0];
    event.target.value = "";
    if (!file) return;
    const doc = new DOMParser().parseFromString(await file.text(), "text/html");
    onChange(doc.body.innerHTML.trim());
  };
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      <InputTextarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={9}
        className="w-full p-3 font-mono text-xs"
        placeholder="<h2>Heading</h2><p>Your content...</p>"
      />
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-emerald-800 px-4 py-2 text-sm font-medium text-emerald-800 transition-colors hover:bg-emerald-800 hover:text-white">
          <FileUp size={16} />
          Load from .html file
          <input type="file" accept=".html,.htm,text/html" onChange={loadFile} className="hidden" />
        </label>
        <span className="text-xs text-gray-500">
          Scripts, inline styles and classes are removed; the site&apos;s fonts and colours apply.
        </span>
      </div>
    </div>
  );
};

export default HtmlEditor;
