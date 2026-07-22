import { useEffect, useState } from "react";
import { fetchPatreonLink } from "../lib/patreonApi";

export function usePatreonLink(): string | null {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchPatreonLink()
      .then((link) => setUrl(link.url))
      .catch(() => setUrl(null));
  }, []);

  return url;
}
