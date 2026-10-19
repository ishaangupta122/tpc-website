import { useEffect, useState } from "react";

// Default achievement page (used when the admin hasn't built a custom layout).
// The layout adapts to the photo:
//   - portrait / square / small photo  -> photo beside the description
//   - wide landscape photo             -> photo on top, description below
// The photo always keeps its own aspect ratio and is never upscaled.

const SIDE_BY_SIDE_RATIO = 1.25; // width / height below this: photo goes aside
const SMALL_PHOTO_WIDTH = 560; // px: narrower photos are not stretched

const paragraphs = (text) =>
  (text || "").split(/\n\s*\n/).filter((p) => p.trim());

const Description = ({ text }) => {
  const [lead, ...rest] = paragraphs(text);
  if (!lead) return null;
  return (
    <div className="space-y-5 text-base leading-relaxed text-gray-700 md:text-lg">
      <p className="whitespace-pre-line text-lg font-medium leading-relaxed text-gray-900 md:text-xl">
        {lead}
      </p>
      {rest.map((p, i) => (
        <p key={i} className="whitespace-pre-line">
          {p}
        </p>
      ))}
    </div>
  );
};

const AchievementDefaultLayout = ({ image, title, description }) => {
  const [size, setSize] = useState(null);

  // Read the photo's real size once, so the layout is chosen before it shows.
  useEffect(() => {
    if (!image) return;
    const probe = new window.Image();
    probe.onload = () => setSize({ w: probe.naturalWidth, h: probe.naturalHeight });
    probe.onerror = () => setSize({ w: 1, h: 1 });
    probe.src = image;
    return () => {
      probe.onload = null;
      probe.onerror = null;
    };
  }, [image]);

  if (!image) return <Description text={description} />;

  if (!size) {
    return <div className="aspect-[16/9] w-full animate-pulse rounded-xl bg-gray-100" aria-hidden="true" />;
  }

  const sideBySide = size.w / size.h < SIDE_BY_SIDE_RATIO || size.w < SMALL_PHOTO_WIDTH;

  const photo = (
    <figure className={sideBySide ? "" : "flex justify-center"}>
      <img
        src={image}
        alt={title}
        width={size.w}
        height={size.h}
        className={`h-auto rounded-xl shadow-lg ring-1 ring-black/5 ${
          sideBySide ? "w-full" : "w-auto max-w-full"
        }`}
        // Never wider than the file itself; the height follows the aspect ratio.
        style={sideBySide ? { maxWidth: `${size.w}px` } : { maxHeight: "560px" }}
      />
    </figure>
  );

  return sideBySide ? (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
      <div className="mx-auto w-full max-w-md lg:max-w-none">{photo}</div>
      <Description text={description} />
    </div>
  ) : (
    <div className="space-y-8">
      {photo}
      <div className="mx-auto max-w-4xl">
        <Description text={description} />
      </div>
    </div>
  );
};

export default AchievementDefaultLayout;
