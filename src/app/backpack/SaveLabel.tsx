import Icon from "../../components/Icon";

export default function SaveLabel({ saved }: { saved: boolean }) {
  if (saved) return <><Icon name="check" size={13} /> Saved!</>;
  return "Save Reflection";
}
