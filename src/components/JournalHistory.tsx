"use client";

import { useState } from "react";
import { fetchJournalHistory, type JournalHistoryEntry } from "../lib/journalApi";
import JournalHistoryItem from "./JournalHistoryItem";

export default function JournalHistory({ stepSlug }: { stepSlug: string }) {
  const [expanded, setExpanded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [entries, setEntries] = useState<JournalHistoryEntry[]>([]);

  function handleToggle() {
    const next = !expanded;
    setExpanded(next);
    if (next && !loaded) {
      fetchJournalHistory(stepSlug)
        .then(setEntries)
        .catch(() => {})
        .finally(() => setLoaded(true));
    }
  }

  return (
    <div className="journal-history">
      <button type="button" className="journal-history-toggle" onClick={handleToggle}>
        {expanded ? "Hide past entries" : "View past entries"}
      </button>
      {expanded && (
        <div className="journal-history-list">
          {!loaded && <p className="journal-history-status">Loading…</p>}
          {loaded && entries.length === 0 && (
            <p className="journal-history-status">No past entries yet.</p>
          )}
          {entries.map((entry) => (
            <JournalHistoryItem key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}
