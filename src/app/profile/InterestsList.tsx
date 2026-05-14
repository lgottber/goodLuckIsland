export default function InterestsList({ interests }: { interests: string[] }) {
  return (
    <div className="tag-list">
      {interests.map((tag, i) => (
        <span
          key={tag}
          className={`tag ${["tag-teal", "tag-navy", "tag-outline"][i % 3]}`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
