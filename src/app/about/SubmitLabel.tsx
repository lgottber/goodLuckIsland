import Icon from "../../components/Icon";

export default function SubmitLabel({ submitted }: { submitted: boolean }) {
  if (submitted) return <><Icon name="check" size={14} /> Message Sent!</>;
  return "Send Message";
}
