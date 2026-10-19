import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

// Filters kept in the URL (/faculty?q=singh&department=CSE), so they survive a
// reload, the back button and a shared link. An empty filter is left out of the URL.
//   const [filters, setFilter] = useUrlFilters(["q", "department"]);
export const useUrlFilters = (names) => {
  const [params, setParams] = useSearchParams();

  const filters = Object.fromEntries(names.map((name) => [name, params.get(name) || ""]));

  const setFilter = useCallback(
    (name, value) =>
      setParams(
        (previous) => {
          const next = new URLSearchParams(previous);
          if (value) next.set(name, value);
          else next.delete(name);
          return next;
        },
        { replace: true }
      ),
    [setParams]
  );

  return [filters, setFilter];
};
