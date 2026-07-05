export default function ListenButton({ url }: { url: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <button type="button" className="btn-watch">
        Listen on Spotify/Apple
      </button>
    </a>
  );
}
