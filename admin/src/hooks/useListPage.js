import { useMemo, useState } from "react";
import { useDialogs } from "./useDialogs";
import { useConfirmDelete } from "./useConfirmDelete";
import { matchesSearch } from "../utils/search";

// Everything a list page needs besides its table: add/edit/view dialogs, the
// search box (and an optional dropdown filter), and delete with confirmation.
//   items          the resource's records
//   remove         (id) => Promise, from the resource hook
//   searchFields   record fields the search box looks in
//   filterField    record field the dropdown filter compares (omit for no filter)
//   itemLabel      (item) => text used in the "Are you sure" message
//   deletedMessage toast shown after deleting, e.g. "Course deleted."
export const useListPage = ({
  items,
  remove,
  searchFields,
  filterField,
  itemLabel,
  deletedMessage,
}) => {
  const dialogs = useDialogs();
  const confirmDelete = useConfirmDelete();
  const [search, setSearch] = useState("");
  const [filterValue, setFilterValue] = useState("");

  // Joined so callers can pass a fresh array each render without re-filtering.
  const searchKey = searchFields.join("|");
  const rows = useMemo(
    () =>
      items.filter(
        (item) =>
          matchesSearch(item, searchKey.split("|"), search) &&
          (!filterField || filterValue === "" || item[filterField] === filterValue)
      ),
    [items, searchKey, search, filterField, filterValue]
  );

  const handleDelete = (item) =>
    confirmDelete({
      message: `Are you sure you want to delete "${itemLabel(item)}" ?`,
      onConfirm: () => remove(item._id),
      successMessage: deletedMessage,
    });

  return { dialogs, search, setSearch, filterValue, setFilterValue, rows, handleDelete };
};
