import SkillList, { type SkillNode } from "./SkillList";

export type SkillCategory = {
  title: string;
  items: SkillNode[];
};

export default function SkillCategorySection({ category }: { category: SkillCategory }) {
  return (
    <div className="skills-section">
      <h2>{category.title}</h2>
      <SkillList items={category.items} />
    </div>
  );
}
