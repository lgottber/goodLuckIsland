import type { EarnedBadge } from "../../lib/badgesApi";

export default function ProfileBadgeItem({ badge }: { badge: EarnedBadge }) {
  return (
    <div className="profile-badge" title={badge.name}>
      <img src={`/badges/${badge.image}`} alt={badge.name} className="profile-badge-img" />
      <div className="profile-badge-label">{badge.name}</div>
    </div>
  );
}
