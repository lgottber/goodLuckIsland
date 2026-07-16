interface Props {
  tags: string[];
}

export default function TagPills({ tags }: Props) {
  if (tags.length === 0) return null;
  return (
    <div className="content-tag-pills">
      {tags.map((tag) => (
        <span key={tag} className="content-tag-pill">
          {tag}
        </span>
      ))}
    </div>
  );
}
