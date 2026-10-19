import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { UploadCloud } from "lucide-react";
import { departmentsApi } from "../../api";
import { useNotify } from "../../context/NotificationContext";
import { checkPdf } from "../../constants/uploads";
import { useFieldErrors } from "../../hooks/useFieldErrors";
import { RESOURCE_TYPES } from "../../constants/departments";
import { newKey } from "../../utils/blocks";
import Field from "../../components/forms/Field";
import FormDialog from "../../components/forms/FormDialog";
import HtmlEditor from "../../components/forms/HtmlEditor";
import { AddButton, FormSection, GroupCard, RemoveButton } from "../../components/forms/FormParts";

const toValues = (department) => ({
  pages: (department?.pages || []).map((page) => ({
    _key: newKey(),
    title: page.title,
    slug: page.slug,
    type: page.type || "page",
    html: page.html || "",
    file: page.fileUrl || "",
    fileName: page.fileUrl ? page.fileUrl.split("/").pop() : "",
    url: page.url || "",
  })),
});

const emptyPage = () => ({
  _key: newKey(),
  title: "",
  slug: "",
  type: "page",
  html: "",
  file: "",
  fileName: "",
  url: "",
});

// Edit the "Other Pages" of one department: HTML pages, PDF documents and links.
const DepartmentFormModal = ({ isOpen, onClose, department, onSaved }) => {
  const notify = useNotify();
  const [values, setValues] = useState(() => toValues(department));
  const [uploading, setUploading] = useState(null);
  const { errors, clear, reset, fail, show } = useFieldErrors();

  useEffect(() => {
    if (isOpen) {
      setValues(toValues(department));
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, department]);

  const setPage = (key, patch) => {
    setValues((prev) => ({
      ...prev,
      pages: prev.pages.map((page) => (page._key === key ? { ...page, ...patch } : page)),
    }));
    clear(`page-${key}`);
  };

  const uploadPdf = async (key, file) => {
    const field = `pdf-${key}`;
    const problem = checkPdf(file);
    if (problem) {
      show({ [field]: problem });
      return;
    }
    setUploading(key);
    try {
      const { url, name } = await departmentsApi.uploadPdf(file);
      setPage(key, { file: url, fileName: name });
      clear(field);
    } catch (err) {
      // The message goes under the upload box; anything unexpected is a toast.
      if (!show({ [field]: err.fields?.file || err.message })) notify.error(err.message);
    } finally {
      setUploading(null);
    }
  };

  const handleSubmit = async () => {
    const found = {};
    const titles = new Set();
    values.pages.forEach((page) => {
      const key = `page-${page._key}`;
      const title = page.title.trim();
      if (!title) found[key] = "Enter the title.";
      else if (titles.has(title.toLowerCase())) found[key] = "Another item already has this title.";
      else if (page.type === "page" && !page.html.trim()) found[key] = "Enter the page content (HTML).";
      else if (page.type === "pdf" && !page.file) found[key] = "Upload the PDF.";
      else if (page.type === "link" && !/^https?:\/\/\S+$/i.test(page.url.trim()))
        found[key] = "Enter a link starting with http:// or https://";
      titles.add(title.toLowerCase());
    });
    if (Object.keys(found).length) fail(found);

    await departmentsApi.save(
      department.key,
      values.pages.map(({ title, slug, type, html, file, url }) => ({
        title,
        slug,
        type,
        html: type === "page" ? html : "",
        file: type === "pdf" ? file : "",
        url: type === "link" ? url.trim() : "",
      }))
    );
    notify.success(`${department.name} updated.`);
    await onSaved();
  };

  return (
    <FormDialog
      onFieldErrors={show}
      entity="Department"
      isEdit
      header={`Update ${department?.name || "Department"}`}
      visible={isOpen}
      onHide={() => {
        reset();
        onClose();
      }}
      onSubmit={handleSubmit}>
      <FormSection
        title="Other Pages"
        note="Shown on the department page. Add an HTML page, a PDF document or a link."
        action={
          <AddButton
            onClick={() => setValues((prev) => ({ ...prev, pages: [...prev.pages, emptyPage()] }))}>
            Add item
          </AddButton>
        }>
        {values.pages.length === 0 ? (
          <p className="rounded-md border border-dashed border-gray-300 py-4 text-center text-xs text-gray-500">
            No items yet.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {values.pages.map((page, index) => (
              <GroupCard
                key={page._key}
                id={`field-page-${page._key}`}
                error={errors[`page-${page._key}`]}
                title={`Item ${index + 1}`}
                actions={
                  <RemoveButton
                    onClick={() =>
                      setValues((prev) => ({
                        ...prev,
                        pages: prev.pages.filter((p) => p._key !== page._key),
                      }))
                    }
                  />
                }>
                <div className="flex flex-col gap-4">
                  <div className="grid gap-4 sm:grid-cols-[14rem_minmax(0,1fr)]">
                    <Field label="Type">
                      <Dropdown
                        value={page.type}
                        options={RESOURCE_TYPES}
                        onChange={(e) => setPage(page._key, { type: e.value })}
                        className="w-full"
                      />
                    </Field>
                    <Field label="Title" required>
                      <InputText
                        value={page.title}
                        onChange={(e) => setPage(page._key, { title: e.target.value })}
                        placeholder="e.g. Laboratories"
                        className="w-full p-2"
                      />
                    </Field>
                  </div>

                  {page.type === "page" && (
                    <HtmlEditor
                      label="Page Content (HTML)"
                      value={page.html}
                      onChange={(html) => setPage(page._key, { html })}
                    />
                  )}

                  {page.type === "pdf" && (
                    <Field label="PDF File" required id={`pdf-${page._key}`} error={errors[`pdf-${page._key}`]}>
                      {page.file && (
                        <p className="mb-2 text-sm text-gray-700">
                          Current file:{" "}
                          <a
                            href={page.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-800 underline">
                            {page.fileName || "Open"}
                          </a>
                        </p>
                      )}
                      <label className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-5 text-center text-sm text-gray-600 transition-colors hover:border-emerald-600 hover:bg-emerald-50">
                        <UploadCloud size={22} className="text-emerald-800" />
                        <span>
                          {uploading === page._key
                            ? "Uploading..."
                            : page.file
                              ? "Replace the PDF"
                              : "Click to upload a PDF"}
                        </span>
                        <span className="text-xs text-gray-500">PDF, up to 20 MB</span>
                        <input
                          type="file"
                          accept="application/pdf,.pdf"
                          disabled={uploading === page._key}
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            e.target.value = "";
                            if (file) uploadPdf(page._key, file);
                          }}
                        />
                      </label>
                    </Field>
                  )}

                  {page.type === "link" && (
                    <Field label="Link" required>
                      <InputText
                        value={page.url}
                        onChange={(e) => setPage(page._key, { url: e.target.value })}
                        placeholder="e.g. https://example.com/syllabus"
                        className="w-full p-2"
                      />
                    </Field>
                  )}
                </div>
              </GroupCard>
            ))}
          </div>
        )}
      </FormSection>
    </FormDialog>
  );
};

export default DepartmentFormModal;
