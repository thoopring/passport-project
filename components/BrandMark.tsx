import type { CSSProperties } from "react";

interface Props {
  /** Rendered height in px. Width is derived from the aspect ratio. */
  size?: number;
  /** Override tone for dark backgrounds; default uses `--text-primary`. */
  color?: string;
  /** Pass through a className for utility styling. */
  className?: string;
  /** Whether to render just the mark (no wordmark). Useful for favicons. */
  markOnly?: boolean;
  style?: CSSProperties;
}

/**
 * Gliddy wordmark.
 *
 * Design: lowercase "gliddy" in a rounded sans-serif feel. The two `i` dots
 * are tilted slightly right to suggest a smooth glide — the core brand
 * metaphor (trips that glide together effortlessly). Kept fully SVG so it
 * scales, stays crisp at any size, and inherits the page text color by
 * default so it recolors for dark modes and alt surfaces automatically.
 */
export default function BrandMark({
  size = 22,
  color,
  className,
  markOnly = false,
  style,
}: Props) {
  const fill = color ?? "currentColor";

  // Mark-only variant: the two tilted dots on a gentle baseline curve.
  if (markOnly) {
    return (
      <svg
        height={size}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="gliddy"
        role="img"
        className={className}
        style={style}
      >
        <path
          d="M2 18 Q 12 10, 22 18"
          stroke={fill}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
        <circle cx="8" cy="7" r="2.2" fill={fill} transform="rotate(15 8 7)" />
        <circle cx="16" cy="7" r="2.2" fill={fill} transform="rotate(15 16 7)" />
      </svg>
    );
  }

  // Full wordmark: lowercase "gliddy" set at ~22px for inline header use.
  // Uses Pretendard via font inheritance so it stays consistent with the
  // rest of the UI and renders correctly on systems without the font file.
  return (
    <span
      className={className}
      style={{
        fontFamily:
          "'Pretendard Variable', Pretendard, var(--font-sans), Inter, system-ui, sans-serif",
        fontWeight: 800,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: "-0.035em",
        color: fill,
        display: "inline-flex",
        alignItems: "baseline",
        ...style,
      }}
    >
      gliddy
    </span>
  );
}
