"use client";

import { useEffect, useState } from "react";
import Icon from "../../components/Icon";
import StepLinkAction from "./StepLinkAction";
import { fetchStepLinks, type StepLink } from "../../lib/stepLinksApi";
import type { StepKey } from "../../lib/sevenStepApi";

interface Props {
  stepKey: StepKey;
  definition: string;
  chapter: string;
  isComplete: boolean;
}

// Generic replacement for the 4 bespoke *Drawer.tsx components (#103) --
// links are now admin-managed (goodLuckAdmin's "7-Step Links" tab) instead
// of hardcoded per pillar. Definition/chapter still come from the static
// PILLARS array in SevenShieldPillars.tsx since customDrawer fully replaces
// PillarItem's fallback markup (confirmed in PillarItem.tsx) -- this
// component has to re-render that part itself.
export default function StepLinksDrawer({ stepKey, definition, chapter, isComplete }: Props) {
  const [links, setLinks] = useState<StepLink[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchStepLinks(stepKey)
      .then((result) => {
        if (!cancelled) setLinks(result);
      })
      .catch(() => {
        if (!cancelled) setLinks([]);
      });
    return () => {
      cancelled = true;
    };
  }, [stepKey]);

  return (
    <div className="pillar-custom-drawer">
      <p className="pillar-definition">{definition}</p>
      <p className="pillar-chapter">
        <Icon name="book" size={11} />
        {chapter}
      </p>
      {links && links.length > 0 && (
        <div className="pillar-drawer-actions">
          {links.map((link) => (
            <StepLinkAction key={link.id} link={link} isComplete={isComplete} />
          ))}
        </div>
      )}
      {links && links.length === 0 && <p className="pillar-coming-soon-inline">Coming soon.</p>}
    </div>
  );
}
