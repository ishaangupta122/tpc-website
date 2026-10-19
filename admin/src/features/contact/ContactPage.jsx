import { useCallback, useEffect, useState } from "react";
import { contactApi } from "../../api";
import { useDialogs } from "../../hooks/useDialogs";
import PageContainer from "../../components/ui/PageContainer";
import PageHeader from "../../components/ui/PageHeader";
import DetailsCard, { DetailRow } from "../../components/ui/DetailsCard";
import ContactFormModal from "./ContactFormModal";

// The contact details are a single record, shown as a details card.
const ContactPage = () => {
  const dialogs = useDialogs();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await contactApi.get();
      // The API answers {} until something has been saved.
      setRecord(data && data._id ? data : null);
    } catch (err) {
      setError(err.message || "Could not load the contact details.");
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
        title="Contact"
        subtitle="Manage the college contact details"
        actionLabel={record ? "Edit Contact Details" : "Add Contact Details"}
        isEdit={Boolean(record)}
        onAction={() => (record ? dialogs.openEdit(record) : dialogs.openAdd())}
      />

      <DetailsCard
        loading={loading}
        error={error}
        onRetry={refresh}
        isEmpty={!record}
        emptyMessage="Nothing saved yet. The website shows its built-in contact details.">
        {record && (
          <>
            <DetailRow label="College Name">{record.name}</DetailRow>
            <DetailRow label="Address">
              {(record.address || "").split("\n").map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </DetailRow>
            <DetailRow label="Phone Numbers">{(record.phones || []).join(", ")}</DetailRow>
            <DetailRow label="Email">{record.email}</DetailRow>
            <DetailRow label="Office Hours">{record.hours || "—"}</DetailRow>
          </>
        )}
      </DetailsCard>

      <ContactFormModal
        isOpen={dialogs.formOpen}
        onClose={dialogs.close}
        contact={dialogs.formItem}
        onSaved={refresh}
      />
    </PageContainer>
  );
};

export default ContactPage;
