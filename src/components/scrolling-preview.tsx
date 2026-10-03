"use client";

import { motion, useInView, useReducedMotion, type Transition } from "motion/react";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

// Pan speed (CSS px/sec). Duration is derived from this so every card scrolls
// at the same visual speed — longer pages just take proportionally longer.
const PAN_SPEED = 70;
const PAUSE = 1.2; // seconds held at top and bottom

// A page only pans if it overflows the frame by at least this fraction of the
// frame height. Anything shorter (landscape/square screenshots) is shown
// "cover" instead, so any image looks right with no per-image config.
const MIN_SCROLL_OVERFLOW = 0.2;

// Mesh backdrop when a card has neither a `bg` image nor a `bgGradient` —
// dark enough to stay quiet behind any screenshot.
const FALLBACK_BG =
  "radial-gradient(120% 100% at 20% 0%, #312e81 0%, transparent 60%), " +
  "radial-gradient(120% 120% at 90% 100%, #1e3a8a 0%, transparent 60%), " +
  "#0f172a";

// Ambient gallery cycle. Slow hold, quick crossfade, near-imperceptible zoom
// drift so the cut never reads as a snap. The zoom is constant motion (linear);
// the fade is an entering element (strong ease-out, never ease-in).
const HOLD = 3.8; // seconds each slide stays up
const FADE = 0.7; // crossfade duration
const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

/**
 * Card preview: a screenshot floating over a wallpaper. Tall landing pages pan
 * top → bottom → back like a scroll-through recording; normal (landscape/square)
 * screenshots are shown "cover", centered. Detection is automatic from the
 * image's natural ratio — drop in any image and it just works.
 *
 * Pass `gallery` (2+ images) to crossfade through every shot instead — a slow
 * ambient preview of the product, with dots to jump between slides. The timer
 * only ticks while the card is on screen and never under reduced motion (the
 * dots still work there — they swap instantly). `startDelayMs` staggers cards
 * so a grid of cyclers doesn't swap in sync.
 *
 * Backdrop order: `bg` image → `bgGradient` → the built-in mesh. `bg` (the
 * wallpaper) is optional; omit it for a gradient.
 *
 * Layout/backgrounds are inline-styled because this project's Tailwind config
 * can't emit opacity-modified theme colors or arbitrary `bg-[length:…]` — those
 * utilities silently no-op.
 */
const ScrollingPreview = ({
  src,
  alt,
  bg,
  bgGradient,
  gallery,
  startDelayMs = 0,
}: {
  src: string;
  alt: string;
  bg?: string;
  bgGradient?: string;
  gallery?: string[];
  startDelayMs?: number;
}) => {
  const reduceMotionRaw = useReducedMotion();
  // useReducedMotion() is null on the server and resolves during the first
  // client render — reading it directly would render different HTML on each
  // side (a hydration mismatch) for anyone with reduced-motion enabled. Like
  // usePerfProfile's `ready` flag, assume full motion until mounted so the
  // first client render always matches SSR, then apply the real preference.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const reduceMotion = mounted && !!reduceMotionRaw;
  const rootRef = useRef<HTMLDivElement>(null);
  // ~a third of the card visible counts as "looking at it".
  const inView = useInView(rootRef, { amount: 0.3 });
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scrollPx, setScrollPx] = useState(0);
  const [bgReady, setBgReady] = useState(false);
  const [frame, setFrame] = useState(0);

  const galleryMode = !!gallery && gallery.length > 1;
  const cycling = galleryMode && !reduceMotion;
  // Instant swaps under reduced motion — the dots stay usable, nothing moves
  // on its own.
  const fadeDur = reduceMotion ? 0 : FADE;

  useEffect(() => {
    if (galleryMode) return;
    let cancelled = false;
    const img = new window.Image();
    const compute = () => {
      const vp = viewportRef.current;
      if (cancelled || !vp || !img.naturalWidth) return;
      const ratio = img.naturalHeight / img.naturalWidth;
      const displayedHeight = vp.clientWidth * ratio; // height at bg-size "100% auto"
      const overflow = displayedHeight - vp.clientHeight;
      // Only pages meaningfully taller than the frame pan; the rest go "cover".
      setScrollPx(overflow > vp.clientHeight * MIN_SCROLL_OVERFLOW ? overflow : 0);
    };
    img.onload = compute;
    img.src = src;
    if (img.complete) compute();
    window.addEventListener("resize", compute);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", compute);
    };
  }, [src, galleryMode]);

  // Preload every gallery shot up front so the first cycle never flashes blank.
  useEffect(() => {
    if (!galleryMode || !gallery) return;
    const loaders = gallery.map((g) => {
      const img = new window.Image();
      img.src = g;
      return img;
    });
    return () => {
      loaders.forEach((img) => {
        img.src = "";
      });
    };
  }, [gallery, galleryMode]);

  // Chained timeout (not setInterval) so off-screen / unmount retargets cleanly
  // instead of firing a stale tick.
  const startedRef = useRef(false);
  useEffect(() => {
    if (!galleryMode || !gallery || !cycling || !inView) return;
    const wait = startedRef.current ? HOLD : HOLD + startDelayMs / 1000;
    const t = window.setTimeout(() => {
      startedRef.current = true;
      setFrame((f) => (f + 1) % gallery.length);
    }, wait * 1000);
    return () => window.clearTimeout(t);
  }, [gallery, galleryMode, cycling, inView, frame, startDelayMs]);

  // Per-slide overflow for gallery portraits: a tall shot (phone screenshots
  // are typically 2:1+) pans top→bottom like the single-image path instead of
  // cover-cropping to an unrecognizable band. Landscape shots stay cover.
  const [pans, setPans] = useState<number[]>([]);
  useEffect(() => {
    if (!galleryMode || !gallery) return;
    let cancelled = false;
    const compute = () => {
      const el = viewportRef.current;
      if (!el || cancelled) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      let pending = gallery.length;
      const out = new Array<number>(gallery.length).fill(0);
      const done = () => {
        if (--pending === 0 && !cancelled) setPans(out);
      };
      gallery.forEach((g, i) => {
        const img = new window.Image();
        img.onload = () => {
          if (!cancelled && img.naturalWidth) {
            const overflow = w * (img.naturalHeight / img.naturalWidth) - h;
            out[i] = overflow > h * MIN_SCROLL_OVERFLOW ? overflow : 0;
          }
          done();
        };
        img.onerror = done;
        img.src = g;
      });
    };
    compute();
    window.addEventListener("resize", compute);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", compute);
    };
  }, [gallery, galleryMode]);

  // Preload the wallpaper so a missing/404 file falls back to the gradient
  // instead of rendering a broken background.
  useEffect(() => {
    if (!bg) {
      setBgReady(false);
      return;
    }
    let cancelled = false;
    const img = new window.Image();
    img.onload = () => !cancelled && setBgReady(true);
    img.onerror = () => !cancelled && setBgReady(false);
    img.src = bg;
    return () => {
      cancelled = true;
    };
  }, [bg]);

  const scrolls = scrollPx > 0;
  const animate = !reduceMotion && scrolls;

  const pan = scrollPx / PAN_SPEED;
  const total = pan * 2 + PAUSE * 2;
  const times = [
    0,
    pan / total,
    (pan + PAUSE) / total,
    (pan * 2 + PAUSE) / total,
    1,
  ];

  const backdrop =
    bgReady && bg ? `url("${bg}")` : bgGradient ?? FALLBACK_BG;

  // Pan loops, one per tall gallery slide (same speed as the single-image
  // path). Memoized so unrelated re-renders don't restart a slide mid-pan —
  // only a new measurement does.
  const panAnims = useMemo<Array<{
    keyframes: string[];
    transition: Transition;
  } | null>>(() => {
    if (!gallery) return [];
    return gallery.map((_, i) => {
      const px = pans[i] ?? 0;
      if (!(px > 0)) return null;
      const panDur = px / PAN_SPEED;
      const tot = panDur * 2 + PAUSE * 2;
      return {
        keyframes: ["50% 0%", "50% 100%", "50% 100%", "50% 0%", "50% 0%"],
        transition: {
          duration: tot,
          ease: "easeInOut",
          repeat: Infinity,
          times: [
            0,
            panDur / tot,
            (panDur + PAUSE) / tot,
            (panDur * 2 + PAUSE) / tot,
            1,
          ],
        },
      };
    });
  }, [gallery, pans]);

  const shotStyle: CSSProperties = {
    position: "absolute",
    left: 22,
    right: 22,
    top: 20,
    bottom: 0,
    overflow: "hidden",
    borderRadius: 10,
    boxShadow:
      "0 24px 50px -12px rgba(8,20,55,0.55), 0 8px 18px -8px rgba(8,20,55,0.45)",
    border: "1px solid rgba(255,255,255,0.18)",
  };

  const slideStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    backgroundRepeat: "no-repeat",
  };

  // Manual jump. stopPropagation matters: the whole card is a dialog trigger,
  // so an un-stopped click would open the modal instead. Spans, not buttons —
  // the trigger already renders a <button> and nested buttons are invalid HTML.
  const jumpTo = (i: number) => (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setFrame(i);
  };

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0"
      role="img"
      aria-label={alt}
    >
      {/* wallpaper background (falls back to a gradient when `bg` is absent) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#0f172a",
          backgroundImage: backdrop,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* floating screenshot panel */}
      <div ref={viewportRef} className="sp-shot" style={shotStyle}>
        {galleryMode && gallery ? (
          <>
            {gallery.map((g, i) => {
              const pan = panAnims[i];
              // The pan runs only in full motion; under reduced motion a tall
              // slide parks at the top instead of cover-cropping the middle.
              const panning = !!pan && !reduceMotion;
              return (
                <motion.div
                  key={g}
                  // initial={false}: first paint lands on the correct frame with no
                  // entrance animation — the card shouldn't announce itself.
                  initial={false}
                  animate={{
                    opacity: i === frame ? 1 : 0,
                    scale: i === frame && !reduceMotion ? 1.04 : 1,
                    ...(panning ? { backgroundPosition: pan.keyframes } : {}),
                  }}
                  transition={{
                    opacity: { duration: fadeDur, ease: EASE_OUT },
                    scale: { duration: HOLD + FADE, ease: "linear" },
                    ...(panning ? { backgroundPosition: pan.transition } : {}),
                  }}
                  style={{
                    ...slideStyle,
                    backgroundImage: `url("${g}")`,
                    backgroundSize: pan ? "100% auto" : "cover",
                    backgroundPosition: pan ? "50% 0%" : "center",
                  }}
                />
              );
            })}
            {/* slide dots: proof of motion and manual control in one. Above the
                title gradient (z-20), re-enabled for pointer events, and every
                press is stopped before it can reach the dialog trigger. */}
            <div
              style={{
                position: "absolute",
                right: 10,
                bottom: 10,
                zIndex: 20,
                display: "flex",
                gap: 6,
                pointerEvents: "auto",
              }}
            >
              {gallery.map((g, i) => (
                <motion.span
                  key={g}
                  role="button"
                  tabIndex={0}
                  aria-label={`Show screenshot ${i + 1} of ${gallery.length}`}
                  onClick={jumpTo(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") jumpTo(i)(e);
                  }}
                  initial={false}
                  animate={{
                    opacity: i === frame ? 1 : 0.4,
                    scale: i === frame ? 1 : 0.7,
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  style={{
                    display: "block",
                    width: 6,
                    height: 6,
                    borderRadius: 9999,
                    backgroundColor: "#fff",
                    cursor: "pointer",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.5)",
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          <motion.div
            style={{
              ...slideStyle,
              backgroundImage: `url("${src}")`,
              // Tall pages fill width and pan; normal images cover the frame.
              backgroundSize: scrolls ? "100% auto" : "cover",
              backgroundPosition: scrolls ? "50% 0%" : "center",
            }}
            animate={
              animate
                ? {
                  backgroundPosition: [
                    "50% 0%",
                    "50% 100%",
                    "50% 100%",
                    "50% 0%",
                    "50% 0%",
                  ],
                }
                : undefined
            }
            transition={
              animate
                ? { duration: total, ease: "easeInOut", repeat: Infinity, times }
                : undefined
            }
          />
        )}
      </div>
    </div>
  );
};

export default ScrollingPreview;
