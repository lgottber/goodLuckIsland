import type { JournalHistoryEntry } from "../lib/journalApi";

export default function JournalHistoryItem({ entry }: { entry: JournalHistoryEntry }) {
  return (
    <div className="journal-history-item">
      <p className="journal-history-item-date">
        {new Date(entry.created_at).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <p className="journal-history-item-body">{entry.body}</p>
    </div>
  );
}
