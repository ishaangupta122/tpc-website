import { Search } from "lucide-react";

// Search box plus an optional dropdown, used by the list pages.
//   filter  { value, onChange, allLabel, options: [{ value, label }] }
const FilterBar = ({ search, onSearch, placeholder = "Search...", filter }) => (
  <div className="flex flex-col sm:flex-row gap-4">
    <div className="relative flex-1">
      <input
        type="search"
        placeholder={placeholder}
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
    </div>
    {filter && (
      <select
        value={filter.value}
        onChange={(e) => filter.onChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800 bg-white">
        <option value="">{filter.allLabel}</option>
        {filter.options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    )}
  </div>
);

export default FilterBar;
