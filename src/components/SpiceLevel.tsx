import { Flame } from "lucide-react";
import type { SpiceLevel } from "@/data/products";

const levelMap: Record<SpiceLevel, number> = {
  Mild: 1,
  Medium: 2,
  Hot: 3,
  "Extra Hot": 4,
};

export default function SpiceLevelBadge({ level }: { level: SpiceLevel }) {
  const n = levelMap[level];
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/70">
      <span className="flex gap-0.5">
        {[1, 2, 3, 4].map((i) => (
          <Flame
            key={i}
            className={`h-3.5 w-3.5 ${i <= n ? "text-primary fill-primary/30" : "text-foreground/15"}`}
          />
        ))}
      </span>
      {level}
    </span>
  );
}
