"use client";

import { useState, useEffect, useRef } from "react";
import { fetchJournalEntry, saveJournalEntry } from "../lib/journalApi";
import { useDebounce } from "../hooks/useDebounce";
import "./journal-entry.css";

interface Props {
  userId: string;
  stepSlug: string;
}

export default function JournalEntry({ userId, stepSlug }: Props) {
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [isDirty, setIsDirty] = useState(false);
  const debouncedBody = useDebounce(body, 500);
  const loadedRef = useRef(false);

  useEffect(() => {
    loadedRef.current = false;
    setBody("");
    setIsDirty(false);
    setStatus("idle");
    fetchJournalEntry(userId, stepSlug)
      .then((entry) => {
        if (entry?.body) setBody(entry.body);
        loadedRef.current = true;
      })
      .catch(() => { loadedRef.current = true; });
  }, [userId, stepSlug]);

  useEffect(() => {
    if (!isDirty || !userId || !loadedRef.current) return;
    setStatus("saving");
    saveJournalEntry(userId, stepSlug, debouncedBody)
      .then(() => setStatus("saved"))
      .catch(() => setStatus("error"));
  }, [debouncedBody, userId, stepSlug, isDirty]);

  return (
    <div className="journal-entry">
      <label className="journal-entry-label" htmlFor="journal-body">
        Your Reflection
      </label>
      <textarea
        id="journal-body"
        className="journal-entry-textarea"
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
          setIsDirty(true);
          setStatus("idle");
        }}
        placeholder="Write your thoughts here…"
        rows={6}
      />
      <span className={`journal-entry-status${status === "error" ? " journal-entry-status--error" : ""}`}>
        {status === "saving" && "Saving…"}
        {status === "saved" && "Saved"}
        {status === "error" && "Failed to save. Please try again."}
      </span>
    </div>
  );
}
