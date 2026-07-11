"use client";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import NavBar from "../../components/NavBarDynamic";
import BackpackContent from "./BackpackContent";
import { useUserDataStore } from "../../lib/stores/userDataStore";
import "./backpack.css";

export default function BackpackPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth0();
  const userId = user?.sub ?? "";
  const router = useRouter();

  const progress = useUserDataStore((state) => state.progress);
  const badges = useUserDataStore((state) => state.badges);
  const profile = useUserDataStore((state) => state.profile);
  const ensureProgress = useUserDataStore((state) => state.ensureProgress);
  const ensureBadges = useUserDataStore((state) => state.ensureBadges);
  const ensureProfile = useUserDataStore((state) => state.ensureProfile);
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
    ensureProgress(userId);
    ensureBadges();
    ensureProfile(userId);
  }, [userId, ensureProgress, ensureBadges, ensureProfile]);

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
