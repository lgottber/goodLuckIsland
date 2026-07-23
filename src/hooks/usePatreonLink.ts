import { useEffect, useState } from "react";
import { fetchPatreonLink } from "../lib/patreonApi";

export function usePatreonLink(): string | null {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchPatreonLink()
      .then((link) => {
        if (!cancelled) setUrl(link.url);
      })
      .catch(() => {
        if (!cancelled) setUrl(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return url;
}
