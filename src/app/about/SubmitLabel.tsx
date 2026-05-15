export default function SubmitLabel({ submitted }: { submitted: boolean }) {
  if (submitted) return <>Message Sent!</>;
  return "Send Message";
}
