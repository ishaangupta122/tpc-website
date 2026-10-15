import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const controlClass =
  "rounded-full p-2 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white transition-colors";

// Full-screen image preview shared by the home page and the gallery page.
//   index === null  -> closed
//   onNavigate must be a state setter (it is called with a function).
// Keyboard: Esc closes, Left/Right move (wrapping), Home/End jump, Tab stays
// inside the dialog. Also: click outside to close, swipe on touch screens,
// page scroll is locked while open and focus returns to the thumbnail on close.
const Lightbox = ({ images, index, onClose, onNavigate }) => {
  const total = images.length;
  const open = index !== null && index >= 0 && index < total;
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const lastFocused = useRef(null);
  const touchStartX = useRef(null);

  // Functional update: always steps from the latest index, so fast or held-down
  // arrow keys never skip or repeat an image.
  const go = useCallback(
    (delta) => onNavigate((current) => (current + delta + total) % total),
    [total, onNavigate]
  );

  // Lock page scroll, move focus into the dialog, restore both on close.
  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      lastFocused.current?.focus?.();
    };
  }, [open]);

  // Keyboard controls.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
      } else if (event.key === "Home") {
        event.preventDefault();
        onNavigate(0);
      } else if (event.key === "End") {
        event.preventDefault();
        onNavigate(total - 1);
      } else if (event.key === "Tab" && dialogRef.current) {
        // Keep keyboard focus inside the dialog.
        const buttons = dialogRef.current.querySelectorAll("button");
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, go, onClose, onNavigate, total]);

  // Preload the neighbouring images so next/previous feel instant.
  useEffect(() => {
    if (!open || total < 2) return;
    [(index + 1) % total, (index - 1 + total) % total].forEach((i) => {
      const img = new Image();
      img.src = images[i].imageUrl;
    });
  }, [open, index, total, images]);

  if (!open) return null;
  const image = images[index];

  const onTouchEnd = (event) => {
    if (touchStartX.current === null || total < 2) return;
    const dx = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 50) go(dx > 0 ? -1 : 1);
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={onTouchEnd}>
      <button
        ref={closeRef}
        type="button"
        aria-label="Close preview"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className={`absolute top-6 right-6 md:right-10 ${controlClass}`}>
        <X className="h-7 w-7" />
      </button>

      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className={`absolute left-3 md:left-6 top-1/2 -translate-y-1/2 ${controlClass}`}>
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className={`absolute right-3 md:right-6 top-1/2 -translate-y-1/2 ${controlClass}`}>
            <ChevronRight className="h-8 w-8" />
          </button>
        </>
      )}

      <figure
        className="flex max-w-full flex-col items-center gap-3"
        onClick={(e) => e.stopPropagation()}>
        <img
          src={image.imageUrl}
          alt={image.description || "Campus"}
          className="max-h-[78vh] max-w-[90vw] md:max-w-4xl md:max-h-[85vh] rounded-lg object-contain shadow-2xl"
        />
        <figcaption className="text-center text-white">
          {image.description && (
            <p className="text-sm text-white/90">{image.description}</p>
          )}
          <p className="text-xs text-white/70" aria-live="polite">
            {index + 1} / {total}
          </p>
        </figcaption>
      </figure>
    </div>
  );
};

export default Lightbox;
