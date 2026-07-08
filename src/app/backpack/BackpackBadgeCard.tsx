import type { EarnedBadge } from "../../lib/badgesApi";

interface Props {
  badge: EarnedBadge;
}

export default function BackpackBadgeCard({ badge }: Props) {
  return (
    <div className="backpack-badge-card">
      <img src={`/badges/${badge.image_slug}.webp`} alt={badge.name} />
      <p className="backpack-badge-name">{badge.name}</p>
    </div>
  );
}
