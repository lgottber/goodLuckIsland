import Icon from "../../components/Icon";

export default function SavedItemCta({ type }: { type: string }) {
  if (type === "podcast") return <>Listen Now <Icon name="arrow-right" size={12} /></>;
  return <>Read Now <Icon name="arrow-right" size={12} /></>;
}
