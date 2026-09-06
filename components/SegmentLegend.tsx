import { cn } from "@/lib/utils";
import { segmentThemes, type SegmentName } from "@/data/segments";

export function SegmentLegend({
  segments,
  tone = "light",
  className
}: {
  segments: SegmentName[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <ul
      aria-label="Legenda de segmentos"
      className={cn("flex flex-wrap gap-2", className)}
    >
      {segments.map((segment) => {
        const theme = segmentThemes[segment];

        return (
          <li
            key={segment}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[0.66rem] font-black uppercase tracking-[0.1em]",
              tone === "dark"
                ? "border-white/12 bg-white/[0.04] text-white/68"
                : "border-navy/12 bg-white/50 text-ink-muted"
            )}
          >
            <span
              aria-hidden
              className="h-2 w-2 rounded-full shadow-[0_0_10px_currentColor]"
              style={{ backgroundColor: theme.color, color: theme.color }}
            />
            {theme.label}
          </li>
        );
      })}
    </ul>
  );
}

