// Helpers for the achievement page builder.
export const newKey = () => Math.random().toString(36).slice(2);

// Adds a client-side React key to blocks loaded from the server.
export const withKeys = (blocks = []) =>
  blocks.map((block) => ({ ...block, _key: newKey() }));

// Blocks as sent to the backend (the React key is dropped).
export const serializeBlocks = (blocks) =>
  JSON.stringify(blocks.map((block) => {
    const rest = { ...block };
    delete rest._key;
    return rest;
  }));

// Problems that would leave a block empty or half-filled: an object keyed by
// the block's `_key` with a short message each (empty when all blocks are
// fine). Checked before saving; the builder shows each message on its block.
export const validateBlocks = (blocks) => {
  const errors = {};
  const filled = (value) => (value || "").trim() !== "";
  blocks.forEach((block) => {
    let message = "";
    if (block.type === "heading" && !filled(block.text))
      message = "Enter the heading, or remove this block.";
    else if (block.type === "text" && !filled(block.text))
      message = "Enter the text, or remove this block.";
    else if (block.type === "imagetext" && !block.image) message = "Add a photo.";
    else if (block.type === "imagetext" && !filled(block.text)) message = "Enter the text.";
    else if (block.type === "gallery" && (block.images || []).length === 0)
      message = "Add at least one photo, or remove this block.";
    else if (block.type === "html" && !filled(block.html))
      message = "Enter the HTML, or remove this block.";
    if (message) errors[block._key] = message;
  });
  return errors;
};
