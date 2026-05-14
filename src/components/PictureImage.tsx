type PictureImageProps = {
  name?: string;
  alt: string;
  sizes?: string;
  className?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
};

function deriveWebpSrc(name: string): string | null {
  if (name.startsWith("https://images.unsplash.com")) {
    return name.includes("?") ? `${name}&fm=webp` : `${name}?fm=webp`;
  }
  if (!name.startsWith("/")) return null;
  const dot = name.lastIndexOf(".");
  if (dot === -1) return null;
  if (name.slice(dot).toLowerCase() === ".webp") return null;
  return `${name.slice(0, dot)}.webp`;
}

export default function PictureImage({
  name,
  alt,
  sizes,
  className,
  width,
  height,
  style,
}: PictureImageProps) {
  if (!name) return null;
  const dot = name.lastIndexOf(".");
  if (dot !== -1 && name.slice(dot).toLowerCase() === ".gif") {
    return (
      <img
        src={name}
        alt={alt}
        sizes={sizes}
        className={className}
        width={width}
        height={height}
        style={style}
        loading="lazy"
      />
    );
  }
  const webpSrc = deriveWebpSrc(name);
  return (
    <picture>
      {webpSrc && (
        <source srcSet={webpSrc} type="image/webp" sizes={sizes} />
      )}
      <img
        src={name}
        alt={alt}
        sizes={sizes}
        className={className}
        width={width}
        height={height}
        style={style}
        loading="lazy"
      />
    </picture>
  );
}
