import JournalEntry from "../../../components/JournalEntry";

export default function StepJournalCard({ userId, stepSlug }: { userId: string; stepSlug: string }) {
  return (
    <div className="step-card">
      <p className="step-card-title">Journal</p>
      <JournalEntry userId={userId} stepSlug={stepSlug} />
    </div>
  );
}
