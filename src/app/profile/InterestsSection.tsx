"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { fetchInterests } from "../../lib/interestsApi";
import InterestsList from "./InterestsList";

export default function InterestsSection() {
  const [interests, setInterests] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchInterests()
      .then(setInterests)
      .catch(() => setInterests([]))
      .finally(() => setLoaded(true));
  }, []);

  let content: ReactNode;
  if (!loaded) {
    content = <p className="info-row-value empty">Loading…</p>;
  } else if (interests.length === 0) {
    content = (
      <p className="info-row-value empty">
        No interests yet — browse some content to build your profile.
      </p>
    );
  } else {
    content = <InterestsList interests={interests} />;
  }

  return content;
}
