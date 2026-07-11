"use client";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import NavBar from "../../components/NavBarDynamic";
import BackpackContent from "./BackpackContent";
import { fetchUserProgress } from "../../lib/sevenStepApi";
import type { UserProgress } from "../../lib/sevenStepApi";
import { fetchUserBadges } from "../../lib/badgesApi";
import type { EarnedBadge } from "../../lib/badgesApi";
import { fetchProfile } from "../../lib/profileApi";
import type { Tables } from "../../types/supabase";
import "./backpack.css";

export default function BackpackPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth0();
  const userId = user?.sub ?? "";
  const router = useRouter();

  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [badges, setBadges] = useState<EarnedBadge[]>([]);
  const [profile, setProfile] = useState<Tables<"users"> | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/");
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!userId) return;
    fetchUserProgress(userId).then(setProgress).catch(() => {});
    fetchUserBadges().then(setBadges).catch(() => {});
    fetchProfile(userId).then(setProfile).catch(() => {});
  }, [userId]);

  return (
    <>
      <NavBar activePage="backpack" largeAvatar />

      <div className="backpack-page">
        <div className="backpack-header">
          <p className="backpack-eyebrow">Good Luck Island Collective</p>
          <h1>My Backpack</h1>
          <p>
            Your personal retirement toolkit. Work through each section at your
            own pace — every step brings your next chapter into clearer focus.
          </p>
        </div>

        {loading && <p className="backpack-loading">Loading your backpack…</p>}

        {loadError && (
          <p className="backpack-load-error">
            Could not load your backpack data. Please try again later.
          </p>
        )}

        {!loading && !loadError && (
          <BackpackContent progress={progress} badges={badges} profile={profile} />
        )}
      </div>
    </>
  );
}
