import Icon from "../../components/Icon";

export default function SavedTypeLabel({ type }: { type: string }) {
  if (type === "podcast") return <><Icon name="mic" size={12} /> Podcast</>;
  return <><Icon name="file" size={12} /> Article</>;
}
