import { useCallback, useMemo } from "react";
import { placementsApi } from "../api";
import { createResourceContext } from "./createResourceContext";
import { useCrudState } from "./useCrudState";

const toDepartmentPayload = (form) => ({
  department: form.department.trim(),
  approvedIntake: Number(form.approvedIntake),
  companiesVisited: Number(form.companiesVisited),
  studentsPlaced: Number(form.studentsPlaced),
  avgPackage: String(form.avgPackage),
});

// The backend stores one record per year with a list of departments; the
// admin works with one row per department. The hook returns:
//   { rows, years, loading, error, refresh, addRow, updateRow, removeRow }
export const { Provider: PlacementsProvider, useResource: usePlacements } =
  createResourceContext("Placements", () => {
    const { items, loading, error, refresh, ensureLoaded } = useCrudState(
      placementsApi.list
    );

    const rows = useMemo(
      () =>
        items
          .flatMap((placement) =>
            placement.departments.map((dept) => ({
              ...dept,
              year: placement.year,
              placementId: placement._id,
              isOnlyDepartment: placement.departments.length === 1,
            }))
          )
          .sort((a, b) => String(b.year).localeCompare(String(a.year))),
      [items]
    );

    const years = useMemo(() => [...new Set(rows.map((r) => r.year))], [rows]);

    // Adding to an existing year merges the department into that year.
    const addRow = useCallback(
      async (form) => {
        await placementsApi.addDepartment(
          form.year.trim(),
          toDepartmentPayload(form)
        );
        await refresh();
      },
      [refresh]
    );

    const updateRow = useCallback(
      async (row, form) => {
        await placementsApi.updateDepartment(
          row.placementId,
          row._id,
          toDepartmentPayload(form)
        );
        await refresh();
      },
      [refresh]
    );

    // Removing a year's last department removes the (empty) year too.
    const removeRow = useCallback(
      async (row) => {
        if (row.isOnlyDepartment) await placementsApi.remove(row.placementId);
        else await placementsApi.removeDepartment(row.placementId, row._id);
        await refresh();
      },
      [refresh]
    );

    return useMemo(
      () => ({
        rows,
        years,
        loading,
        error,
        refresh,
        ensureLoaded,
        addRow,
        updateRow,
        removeRow,
      }),
      [rows, years, loading, error, refresh, ensureLoaded, addRow, updateRow, removeRow]
    );
  });
