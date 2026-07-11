import PictureImage from "../../../components/PictureImage";

interface Props {
  image: string | null;
  title: string;
}

export default function ArticleCoverImage({ image, title }: Props) {
  if (!image) return null;
  return (
    <div className="article-detail-img">
      <PictureImage
        name={image}
        alt={`Article cover image: ${title}`}
        sizes="(max-width: 768px) 100vw, 720px"
      />
    </div>
  );
}
