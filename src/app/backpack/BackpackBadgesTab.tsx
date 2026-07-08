import BackpackBadgeCard from "./BackpackBadgeCard";
import type { EarnedBadge } from "../../lib/badgesApi";

interface Props {
  badges: EarnedBadge[];
}

export default function BackpackBadgesTab({ badges }: Props) {
  if (badges.length === 0) {
    return (
      <p className="backpack-badges-empty">
        No badges earned yet — keep going!
      </p>
    );
  }

  return (
    <div className="backpack-badges-grid">
      {badges.map((badge) => (
        <BackpackBadgeCard key={badge.id} badge={badge} />
      ))}
    </div>
  );
}
