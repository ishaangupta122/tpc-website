import { useCallback, useEffect, useState } from "react";
import { principalApi } from "../../api";
import { useDialogs } from "../../hooks/useDialogs";
import PageContainer from "../../components/ui/PageContainer";
import PageHeader from "../../components/ui/PageHeader";
import DetailsCard, { DetailRow } from "../../components/ui/DetailsCard";
import PrincipalFormModal from "./PrincipalFormModal";

// The Principal page is a single record, shown as a details card.
const PrincipalPage = () => {
  const dialogs = useDialogs();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await principalApi.get();
      // The API answers {} until something has been saved.
      setRecord(data && data._id ? data : null);
    } catch (err) {
      setError(err.message || "Could not load the Principal page.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <PageContainer>
      <PageHeader
        title="Principal"
        subtitle="Manage the principal's message and key highlights"
        actionLabel={record ? "Edit Principal Page" : "Add Principal Page"}
        isEdit={Boolean(record)}
        onAction={() => (record ? dialogs.openEdit(record) : dialogs.openAdd())}
      />

      <DetailsCard
        loading={loading}
        error={error}
        onRetry={refresh}
        isEmpty={!record}
        emptyMessage="Nothing saved yet. The website shows its built-in content.">
        {record && (
          <>
            <DetailRow label="Principal Name">{record.name || "—"}</DetailRow>
            <DetailRow label="Photo">
              {record.image ? (
                <img
                  src={record.image}
                  alt={record.name}
                  className="h-32 w-32 rounded-md border border-neutral-300 object-cover object-top"
                />
              ) : (
                "—"
              )}
            </DetailRow>
            <DetailRow label="Message">
              {record.message ? (
                <div className="space-y-3">
                  {record.message
                    .split(/\n\s*\n/)
                    .filter((paragraph) => paragraph.trim())
                    .map((paragraph, i) => (
                      <p key={i} className="whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}
                </div>
              ) : (
                "—"
              )}
            </DetailRow>
            <DetailRow label="Key Highlights">
              {(record.highlights || []).length === 0 ? (
                "—"
              ) : (
                <div className="space-y-4">
                  {record.highlights.map((card, i) => (
                    <div key={i}>
                      <p className="font-semibold text-emerald-900">{card.title}</p>
                      <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-gray-700 marker:text-emerald-800">
                        {(card.points || []).map((point, j) => (
                          <li key={j}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </DetailRow>
          </>
        )}
      </DetailsCard>

      <PrincipalFormModal
        isOpen={dialogs.formOpen}
        onClose={dialogs.close}
        principal={dialogs.formItem}
        onSaved={refresh}
      />
    </PageContainer>
  );
};

export default PrincipalPage;
