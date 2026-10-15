import { Eye, PenBoxIcon, Trash2 } from "lucide-react";
import { Button } from "primereact/button";

// View / edit / delete buttons for a table row; omit a handler to hide it.
const RowActions = ({ onView, onEdit, onDelete }) => (
  <div className="flex gap-1">
    {onView && (
      <Button
        icon={<Eye />}
        className="p-button-text p-button-info"
        onClick={onView}
        tooltip="View"
      />
    )}
    {onEdit && (
      <Button
        icon={<PenBoxIcon />}
        className="p-button-text p-button-warning"
        onClick={onEdit}
        tooltip="Edit"
      />
    )}
    {onDelete && (
      <Button
        icon={<Trash2 />}
        className="p-button-text p-button-danger"
        onClick={onDelete}
        tooltip="Delete"
      />
    )}
  </div>
);

export default RowActions;
