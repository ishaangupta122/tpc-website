import { Search } from "lucide-react";

// Search box plus an optional dropdown filter.
//   filter  { value, onChange, allLabel, options: [{ label, value }] }
const FilterBar = ({ search, onSearchChange, placeholder = "Search...", filter }) => (
  <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-lg border border-neutral-200/60">
    <div className="relative flex-grow">
      <input
        type="search"
        placeholder={placeholder}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500"
      />
      <Search className="w-5 h-5 absolute left-3 top-2.5 text-neutral-400" />
    </div>
    {filter && (
      <select
        value={filter.value}
        onChange={(e) => filter.onChange(e.target.value)}
        className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500">
        <option value="">{filter.allLabel}</option>
        {filter.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )}
  </div>
);

export default FilterBar;
