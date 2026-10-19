// The website's standard table.
//   columns  [{ header, render?: (row, index) => node, key?: field name,
//               className?: text style for the cells, default grey }]
//   rowKey   (row, index) => unique key
const DataTable = ({ columns, rows, rowKey }) => (
  <div className="border border-gray-200 rounded-lg">
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg whitespace-nowrap">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                className="px-4 py-3 text-left text-sm font-semibold text-gray-600 sm:px-6">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.map((row, index) => (
            <tr key={rowKey(row, index)} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td
                  key={column.header}
                  className={`px-4 py-4 sm:px-6 text-sm ${column.className || "text-gray-600"}`}>
                  {column.render ? column.render(row, index) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default DataTable;
