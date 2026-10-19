import { InputText } from "primereact/inputtext";
import { AddButton, GroupCard, RemoveButton } from "./FormParts";

// Editable list of table rows (publications, conferences, books...).
//   title    heading of this table
//   columns  [{ key, label, placeholder, wide }]; `wide` spans the full row,
//            the others sit two to a row
//   rows     array of objects keyed by column
//   onChange (rows) => void
//   errors   { [rowIndex]: message } shown on the entry that has the problem
//   idPrefix used to give each entry an id, so the form can scroll to it
const RowListEditor = ({ title, columns, rows, onChange, errors = {}, idPrefix = "row" }) => {
  const emptyRow = () => Object.fromEntries(columns.map(({ key }) => [key, ""]));
  const setCell = (index, key, value) =>
    onChange(rows.map((row, i) => (i === index ? { ...row, [key]: value } : row)));

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
        <AddButton onClick={() => onChange([...rows, emptyRow()])}>Add entry</AddButton>
      </div>

      {rows.length === 0 ? (
        <p className="mt-3 rounded-md border border-dashed border-gray-300 py-4 text-center text-xs text-gray-500">
          No entries yet.
        </p>
      ) : (
        <div className="mt-3 flex flex-col gap-3">
          {rows.map((row, index) => (
            <GroupCard
              key={index}
              id={`${idPrefix}-${index}`}
              title={`Entry ${index + 1}`}
              error={errors[index]}
              actions={<RemoveButton onClick={() => onChange(rows.filter((_, i) => i !== index))} />}>
              <div className="grid gap-3 sm:grid-cols-2">
                {columns.map(({ key, label, placeholder, wide }) => (
                  <div key={key} className={`flex flex-col gap-1 ${wide ? "sm:col-span-2" : ""}`}>
                    <label className="text-sm font-medium text-gray-700">{label}</label>
                    <InputText
                      value={row[key] || ""}
                      onChange={(e) => setCell(index, key, e.target.value)}
                      placeholder={placeholder}
                      className="w-full p-2"
                    />
                  </div>
                ))}
              </div>
            </GroupCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default RowListEditor;
