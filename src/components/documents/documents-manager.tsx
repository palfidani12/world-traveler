"use client";

import { useEffect, useState } from "react";

import type { Document } from "@/types/document";
import { documentsRepository } from "@/lib/firestore";

type DocumentsManagerProps = {
  tripId: string;
};

export function DocumentsManager({ tripId }: DocumentsManagerProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<Document["type"]>("OTHER");
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const loadDocuments = async () => {
    try {
      const rows = await documentsRepository.listByTripId(tripId);
      setDocuments(rows);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load documents.");
    }
  };

  useEffect(() => {
    void loadDocuments();
  }, [tripId]);

  const handleSave = async () => {
    if (!title.trim() || !fileName.trim() || !fileUrl.trim()) {
      setMessage("Please provide title, filename, and file URL.");
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      const now = new Date().toISOString();
      await documentsRepository.create({
        id: `doc-${Date.now()}`,
        tripId,
        title: title.trim(),
        type,
        fileUrl: fileUrl.trim(),
        fileName: fileName.trim(),
        fileSize: 0,
        uploadedBy: "user-1",
        uploadedAt: now,
        isShared: false,
        tags: [],
        createdAt: now,
        updatedAt: now,
      });

      setTitle("");
      setFileName("");
      setFileUrl("");
      setType("OTHER");
      setMessage("Document metadata saved.");
      await loadDocuments();
    } catch (error) {
      console.error(error);
      setMessage("Failed to save document.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#cad8e1] bg-white p-5">
        <h3 className="text-lg font-semibold text-[#20323e]">Add Document Metadata</h3>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Document title"
            className="h-11 rounded-xl border border-[#dfe7ec] bg-[#fafcfd] px-4 text-[#29404f] outline-none"
          />

          <select
            value={type}
            onChange={(event) => setType(event.target.value as Document["type"])}
            className="h-11 rounded-xl border border-[#dfe7ec] bg-[#fafcfd] px-4 text-[#29404f] outline-none"
          >
            <option value="PASSPORT">Passport</option>
            <option value="VISA">Visa</option>
            <option value="TICKET">Ticket</option>
            <option value="BOOKING_CONFIRMATION">Booking Confirmation</option>
            <option value="INSURANCE">Insurance</option>
            <option value="ITINERARY">Itinerary</option>
            <option value="OTHER">Other</option>
          </select>

          <input
            value={fileName}
            onChange={(event) => setFileName(event.target.value)}
            placeholder="File name"
            className="h-11 rounded-xl border border-[#dfe7ec] bg-[#fafcfd] px-4 text-[#29404f] outline-none"
          />

          <input
            value={fileUrl}
            onChange={(event) => setFileUrl(event.target.value)}
            placeholder="File URL"
            className="h-11 rounded-xl border border-[#dfe7ec] bg-[#fafcfd] px-4 text-[#29404f] outline-none"
          />
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="mt-4 rounded-full bg-[#075f7d] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#064f68]"
        >
          {isSaving ? "Saving..." : "Save Metadata"}
        </button>

        {message && <p className="mt-3 text-sm text-[#546974]">{message}</p>}
      </div>

      <div className="rounded-2xl border border-[#cad8e1] bg-[#f8fbfd] p-5">
        <h3 className="text-lg font-semibold text-[#20323e]">Saved Documents</h3>
        <div className="mt-4 space-y-3">
          {documents.length === 0 && <p className="text-sm text-[#5f7481]">No documents saved yet.</p>}
          {documents.map((item) => (
            <div key={item.id} className="rounded-xl border border-[#dfe7ec] bg-white p-3">
              <p className="font-semibold text-[#29404f]">{item.title}</p>
              <p className="text-sm text-[#607582]">{item.type} • {item.fileName}</p>
              <a href={item.fileUrl} target="_blank" rel="noreferrer" className="text-sm text-[#075f7d]">
                Open document
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
