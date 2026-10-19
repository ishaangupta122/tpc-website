import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import Field from "./Field";
import { DIALOG_WIDTH } from "./dialogWidth";

// Read-only detail dialog.
//   fields  [{ label, value, type: "text" | "textarea" | "image" }]
//   extra   optional content shown below the fields (e.g. the page layout)
//   width   dialog width (default: the shared DIALOG_WIDTH)
const ViewDialog = ({ header, visible, onHide, fields, extra, width = DIALOG_WIDTH }) => (
  <Dialog
    header={header}
    visible={visible}
    onHide={onHide}
    style={{ width, maxWidth: "96vw" }}
    draggable={false}
    breakpoints={{ "960px": "94vw" }}>
    <div className="space-y-4">
      {fields.map(({ label, value, type = "text" }) => (
        <Field key={label} label={label}>
          {type === "image" ? (
            <div className="h-48 w-1/2 mb-4">
              <img
                src={value}
                alt={label}
                className="h-full w-full border border-neutral-300 object-cover rounded-md"
              />
            </div>
          ) : type === "textarea" ? (
            <InputTextarea
              value={value ?? ""}
              rows={5}
              cols={50}
              readOnly
              className="w-full p-2"
            />
          ) : (
            <InputText value={value ?? ""} readOnly className="w-full p-2" />
          )}
        </Field>
      ))}
      {extra}
      <div className="flex justify-end">
        <Button
          type="button"
          label="Close"
          className="p-button-danger"
          onClick={onHide}
        />
      </div>
    </div>
  </Dialog>
);

export default ViewDialog;
