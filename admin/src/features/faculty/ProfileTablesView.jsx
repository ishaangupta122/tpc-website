import { PROFILE_SECTIONS } from "./profileSections";

// Read-only publications, conferences and books of a faculty member.
const ProfileTablesView = ({ faculty }) => {
  const existing = PROFILE_SECTIONS.filter(({ name }) => (faculty?.[name] || []).length > 0);
  if (existing.length === 0) return null;
  return (
  <section className="border-t border-gray-200 pt-5">
    <h3 className="text-base font-semibold text-emerald-900">Profile Tables</h3>
    <div className="mt-4 flex flex-col gap-6">
      {existing.map(({ name, title, columns }) => {
        const rows = faculty[name];
        return (
          <div key={name}>
            <h4 className="mb-2 text-sm font-semibold text-gray-900">{title}</h4>
              <div className="overflow-x-auto rounded-lg border border-gray-300 bg-white">
                <table className="min-w-full text-sm">
                  <thead className="border-b border-gray-200 bg-emerald-50 text-left text-xs uppercase tracking-wide text-emerald-900">
                    <tr>
                      <th className="px-3 py-2">#</th>
                      {columns.map(({ key, label }) => (
                        <th key={key} className="whitespace-nowrap px-3 py-2">
                          {label.replace(" (optional)", "")}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {rows.map((row, i) => (
                      <tr key={i}>
                        <td className="px-3 py-2 text-gray-400">{i + 1}</td>
                        {columns.map(({ key }) => (
                          <td key={key} className="px-3 py-2 text-gray-700">
                            {row[key] || "—"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          </div>
        );
      })}
    </div>
  </section>
  );
};

export default ProfileTablesView;
