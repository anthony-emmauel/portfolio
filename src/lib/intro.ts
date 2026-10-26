// The changelog intro (Figma 611:11802). Decided before first paint so the
// overlay never flashes: home page only, default view only, once per session,
// never with prefers-reduced-motion. If storage is unavailable it doesn't play.
export const INTRO_KEY = "ea:intro";

export const introBootScript = `(function(){try{if(location.pathname!=="/"||location.search)return;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;if(sessionStorage.getItem(${JSON.stringify(
  INTRO_KEY,
)}))return;sessionStorage.setItem(${JSON.stringify(INTRO_KEY)},"1");document.documentElement.setAttribute("data-intro","play")}catch(e){}})();`;

/** Total length: the last of four covers finishes crossfading at ≈5.7s. */
export const INTRO_MS = 5800;
