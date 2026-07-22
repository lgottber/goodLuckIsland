export type SkillNode = {
  text: string;
  children?: SkillNode[];
};

export default function SkillList({ items }: { items: SkillNode[] }) {
  return (
    <ul className="skills-list">
      {items.map((item) => (
        <li key={item.text}>
          {item.text}
          {item.children && <SkillList items={item.children} />}
        </li>
      ))}
    </ul>
  );
}
