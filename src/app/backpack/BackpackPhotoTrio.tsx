import PictureImage from "../../components/PictureImage";

export default function BackpackPhotoTrio() {
  return (
    <div className="backpack-photo-trio">
      <div className="backpack-photo-item">
        <PictureImage
          name="/hiking_couple.png"
          alt="A couple hiking together on a scenic mountain trail"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="backpack-photo-item">
        <PictureImage
          name="/tools.gif"
          alt="Animated graphic showing a collection of tools ready for the journey ahead"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="backpack-photo-item">
        <PictureImage
          name="/solo_hiking.jpg"
          alt="Person hiking solo through a lush nature trail"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
    </div>
  );
}
