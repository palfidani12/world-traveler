import { DocumentsManager } from "@/components/documents/documents-manager";

export default async function TripDocumentsPage({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;

  return (
    <>
      <h2 className="text-3xl font-bold text-[#20323e]">Documents</h2>
      <p className="mt-2 text-[#607582]">Store passports, confirmations, tickets, and trip notes in one place.</p>

      <div className="mt-6">
        <DocumentsManager tripId={tripId} />
      </div>
    </>
  );
}
