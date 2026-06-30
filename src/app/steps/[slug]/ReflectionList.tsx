import ReflectionItem from "./ReflectionItem";

const DEFAULT_PROMPTS = [
  "What stood out to you most as you worked through this section?",
  "What surprised you about yourself in this process?",
  "What is one small action you can take based on what you've discovered here?",
];

export default function ReflectionList({ prompts }: { prompts: string[] }) {
  const items = prompts.length > 0 ? prompts : DEFAULT_PROMPTS;
  return (
    <div className="step-reflections">
      {items.map((prompt) => (
        <ReflectionItem key={prompt} prompt={prompt} />
      ))}
    </div>
  );
}
