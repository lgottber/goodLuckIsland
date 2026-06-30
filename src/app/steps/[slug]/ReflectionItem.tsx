export default function ReflectionItem({ prompt }: { prompt: string }) {
  return (
    <div className="step-reflection-item">
      <span className="step-reflection-dot" aria-hidden="true" />
      <span>{prompt}</span>
    </div>
  );
}
