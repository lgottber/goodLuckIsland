import InterestTagItem from "./InterestTagItem";

export default function InterestTagList({ tags, onRemove }) {
  return (
    <div className="tag-list tag-list--spaced">
      {tags.map((tag) => (
        <InterestTagItem key={tag} tag={tag} onRemove={onRemove} />
      ))}
    </div>
  );
}
