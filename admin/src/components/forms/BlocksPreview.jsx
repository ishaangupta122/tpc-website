import { BLOCK_TYPES } from "./blockTypes";
import { FormSection, GroupCard } from "./FormParts";

// Read-only summary of an item's page-builder layout, for the view dialog.
const Detail = ({ label, children }) => (
  <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-3 text-sm">
    <dt className="text-gray-500">{label}</dt>
    <dd className="min-w-0 break-words text-gray-800">{children}</dd>
  </div>
);

const Thumb = ({ src, className = "" }) => (
  <img
    src={src}
    alt=""
    className={`rounded-md border border-gray-300 object-cover ${className}`}
  />
);

const Summary = ({ block }) => {
  switch (block.type) {
    case "heading":
      return (
        <dl className="space-y-2">
          <Detail label="Heading">
            <span className="text-base font-semibold text-emerald-900">{block.text}</span>
          </Detail>
        </dl>
      );
    case "text":
      return (
        <dl className="space-y-2">
          <Detail label="Text">
            <span className="line-clamp-5 whitespace-pre-line">{block.text}</span>
          </Detail>
        </dl>
      );
    case "imagetext":
      return (
        <div className="space-y-3">
          {/* Mini layout: the photo sits on the side the admin chose. */}
          <div
            className={`flex items-start gap-4 ${
              block.side === "right" ? "flex-row-reverse" : ""
            }`}>
            {block.image && <Thumb src={block.image} className="h-28 w-40 shrink-0" />}
            <p className="line-clamp-5 min-w-0 flex-1 whitespace-pre-line text-sm text-gray-700">
              {block.text}
            </p>
          </div>
          <dl>
            <Detail label="Layout">Photo on the {block.side}</Detail>
          </dl>
        </div>
      );
    case "gallery":
      return (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {(block.images || []).map((src, i) => (
              <Thumb key={src + i} src={src} className="h-24 w-32" />
            ))}
          </div>
          <dl className="space-y-2">
            <Detail label="Layout">
              {block.cols === 1 ? "1 column" : `${block.cols} columns`}
            </Detail>
            <Detail label="Photos">{(block.images || []).length}</Detail>
            {block.text && <Detail label="Caption">{block.text}</Detail>}
          </dl>
        </div>
      );
    case "html":
      return (
        <pre
          tabIndex={0}
          className="max-h-64 overflow-auto whitespace-pre-wrap break-words rounded bg-gray-100 p-3 font-mono text-xs text-gray-700">
          {block.html}
        </pre>
      );
    default:
      return null;
  }
};

const BlocksPreview = ({ blocks = [] }) => (
  <FormSection title="Detail page layout">
    {blocks.length === 0 ? (
      <p className="text-sm text-gray-500">
        Default layout: the main image with the description.
      </p>
    ) : (
      <div className="flex flex-col gap-3">
        {blocks.map((block, i) => {
          const info = BLOCK_TYPES[block.type];
          if (!info) return null;
          return (
            <GroupCard key={i} title={`${i + 1}. ${info.label}`}>
              <Summary block={block} />
            </GroupCard>
          );
        })}
      </div>
    )}
  </FormSection>
);

export default BlocksPreview;
