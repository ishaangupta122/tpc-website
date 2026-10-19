import { PenBoxIcon, Plus } from "lucide-react";
import { Button } from "primereact/button";

// Title, subtitle and an optional primary action: "Add ..." (green) or, with
// `isEdit`, an update action (orange, like the Update buttons in the dialogs).
const PageHeader = ({ title, subtitle, actionLabel, onAction, isEdit = false }) => (
  <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-neutral-200/60">
    <div>
      <h1 className="text-2xl font-bold text-neutral-800">{title}</h1>
      {subtitle && <p className="text-neutral-500">{subtitle}</p>}
    </div>
    {actionLabel && (
      <Button
        icon={isEdit ? <PenBoxIcon /> : <Plus />}
        label={actionLabel}
        className={`${isEdit ? "p-button-warning" : "p-button-success"} space-x-2`}
        onClick={onAction}
      />
    )}
  </div>
);

export default PageHeader;
