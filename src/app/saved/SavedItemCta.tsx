export default function SavedItemCta({ type }: { type: string }) {
  if (type === "podcast") return <>Listen Now</>;
  return <>Read Now</>;
}
