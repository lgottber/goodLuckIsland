"use client";

import { useEffect, useState } from "react";
import { fetchEarnedBadges } from "../../lib/badgesApi";
import type { EarnedBadge } from "../../lib/badgesApi";
import ProfileBadgeItem from "./ProfileBadgeItem";

export default function ProfileBadges({ userId }: { userId: string }) {
  const [badges, setBadges] = useState<EarnedBadge[]>([]);

  useEffect(() => {
    if (!userId) return;
    fetchEarnedBadges().then(setBadges).catch(() => {});
  }, [userId]);

  if (!userId || badges.length === 0) return null;

  return (
    <div className="profile-stats-wrap">
      <div className="profile-badges-row">
        {badges.map((badge) => (
          <ProfileBadgeItem key={badge.id} badge={badge} />
        ))}
      </div>
    </div>
  );
}
