import DOMPurify from "dompurify";

// Renders the page-builder blocks of an achievement. Admins choose only the
// blocks, their order, content and layout orientation; all styling is fixed
// here (emerald headings, gray body text) so pages match the rest of the site.

// Masonry columns: every photo keeps its own aspect ratio.
const GALLERY_COLS = {
  2: "columns-2",
  3: "columns-2 md:columns-3",
  4: "columns-2 md:columns-4",
};

const paragraphs = (text) =>
  (text || "").split(/\n{2,}/).filter((p) => p.trim());

const Paragraphs = ({ text }) => (
  <div className="space-y-4 text-base md:text-lg leading-relaxed text-gray-800">
    {paragraphs(text).map((p, i) => (
      <p key={i} className="whitespace-pre-line">{p}</p>
    ))}
  </div>
);

const sanitize = (html) =>
  DOMPurify.sanitize(html || "", {
    FORBID_ATTR: ["style", "class", "target"],
    FORBID_TAGS: ["style", "form", "input", "button", "textarea", "select", "iframe"],
  });

const Block = ({ block }) => {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="text-xl md:text-2xl font-semibold text-emerald-900">
          {block.text}
        </h2>
      );

    case "text":
      return <Paragraphs text={block.text} />;

    case "imagetext":
      return (
        <div
          className={`grid items-center gap-6 md:gap-8 ${
            !block.image
              ? ""
              : block.side === "right"
                ? "md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
                : "md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
          }`}>
          {block.image && (
            <img
              src={block.image}
              alt=""
              className={`mx-auto h-auto max-h-[480px] w-auto max-w-full rounded-md shadow-lg ${block.side === "right" ? "md:order-2" : ""}`}
              loading="lazy"
            />
          )}
          <Paragraphs text={block.text} />
        </div>
      );

    case "gallery": {
      // No photos: nothing to show (and a leftover caption is not shown alone).
      if (!(block.images || []).length) return null;
      const single = block.cols === 1;
      return (
        <figure>
          {single ? (
            <div className="flex flex-col items-center gap-4">
              {(block.images || []).map((src, i) => (
                <img
                  key={src + i}
                  src={src}
                  alt=""
                  className="h-auto max-h-[480px] w-auto max-w-full rounded-md shadow-lg"
                  loading="lazy"
                />
              ))}
            </div>
          ) : (
            <div className={`gap-3 ${GALLERY_COLS[block.cols] || GALLERY_COLS[3]}`}>
              {(block.images || []).map((src, i) => (
                <img
                  key={src + i}
                  src={src}
                  alt=""
                  className="mb-3 block h-auto w-full break-inside-avoid rounded-md shadow-md"
                  loading="lazy"
                />
              ))}
            </div>
          )}
          {block.text && (
            <figcaption className="mt-3 text-center text-sm text-gray-600">
              {block.text}
            </figcaption>
          )}
        </figure>
      );
    }

    case "html":
      return (
        <div
          className="rich-html"
          dangerouslySetInnerHTML={{ __html: sanitize(block.html) }}
        />
      );

    default:
      return null;
  }
};

const BlockRenderer = ({ blocks }) => (
  <div className="space-y-8">
    {blocks.map((block, i) => (
      <section key={i}>
        <Block block={block} />
      </section>
    ))}
  </div>
);

export default BlockRenderer;
