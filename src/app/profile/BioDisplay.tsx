export default function BioDisplay({ bio }: { bio: string }) {
  return (
    <>
      <span className="bio-quote">&ldquo;</span>
      <p className="bio-text">{bio}</p>
    </>
  );
}
