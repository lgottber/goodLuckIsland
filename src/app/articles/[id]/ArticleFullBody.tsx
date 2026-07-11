"use client";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { apiFetch } from "../../../lib/apiClient";

interface Props {
  articleId: number;
  teaserHtml: string;
}

interface ArticleResponse {
  body: string;
  fullAccess: boolean;
}

// The server always renders the logged-out teaser (see articles/[id]/page.tsx
// and the api/content/articles/[id] route it shares this shape with) -- once
// Auth0 confirms the visitor is a member, this swaps it for the full body via
// an authenticated fetch, and drops the sign-up/log-in prompt.
export default function ArticleFullBody({ articleId, teaserHtml }: Props) {
  const { isAuthenticated } = useAuth0();
  const [fullBody, setFullBody] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    let cancelled = false;
    apiFetch<ArticleResponse>(`/content/articles/${articleId}`)
      .then((res) => {
        if (!cancelled && res.fullAccess) setFullBody(res.body);
      })
      .catch(() => {
        // Leave the teaser in place on failure.
      });
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, articleId]);

  if (fullBody !== null) {
    return (
      <div
        className="article-detail-content"
        dangerouslySetInnerHTML={{ __html: fullBody }}
      />
    );
  }

  return (
    <>
      <div
        className="article-detail-content"
        dangerouslySetInnerHTML={{ __html: teaserHtml }}
      />
      <p className="article-detail-gate">
        <a href="/signup">Sign up</a> or <a href="/auth/login">log in</a> to
        view the entire article for free.
      </p>
    </>
  );
}
