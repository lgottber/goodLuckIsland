export default function ListenButton({ url }: { url: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="btn-watch">
      Listen on Spotify/Apple
    </a>
  );
}
