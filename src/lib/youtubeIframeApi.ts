let apiPromise: Promise<YTNamespace> | null = null;

// The YouTube IFrame API loads asynchronously and signals readiness via a
// single global callback -- this wraps that in a promise and shares one
// script tag/load across every player on the page, since multiple
// components (featured player, video modal) may mount TrackedYouTubeEmbed
// instances over the page's lifetime.
export function loadYouTubeIframeApi(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT);

  if (!apiPromise) {
    apiPromise = new Promise((resolve) => {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        if (window.YT) resolve(window.YT);
      };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    });
  }

  return apiPromise;
}
