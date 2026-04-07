export default function BioDisplay({ bio }) {
  return (
    <>
      <span className="bio-quote">&ldquo;</span>
      <p className="bio-text">{bio}</p>
    </>
  );
}
