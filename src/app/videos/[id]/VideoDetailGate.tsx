interface Props {
  isMembersOnly: boolean;
}

export default function VideoDetailGate({ isMembersOnly }: Props) {
  if (!isMembersOnly) return null;
  return (
    <p className="video-detail-gate">
      <a href="/signup">Sign up</a> or <a href="/auth/login">log in</a> to
      watch this members-only video for free.
    </p>
  );
}
