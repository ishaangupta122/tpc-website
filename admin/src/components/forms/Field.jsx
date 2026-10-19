// Label + control wrapper used by every form.
//   id     lets the form scroll to this field when it has an error
//   error  message shown under the control (the control gets a red border)
const Field = ({ label, required, hint, id, error, children }) => (
  <div id={id ? `field-${id}` : undefined} className={error ? "field-error" : undefined}>
    <label className="block text-sm font-medium text-gray-700">
      {label}
      {required && "*"}
    </label>
    {children}
    {error ? (
      <p role="alert" className="mt-1 text-sm text-red-600">
        {error}
      </p>
    ) : (
      hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>
    )}
  </div>
);

export default Field;
