"use client";

import { useState } from "react";

const CHIP_CLASS =
  "rounded-full border border-border bg-surface px-3.5 py-1.5 font-mono text-xs font-medium text-foreground-muted";

export default function ChipList({
  items,
  limit = 6,
}: {
  items: string[];
  limit?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  const hidden = items.length - limit;

  return (
    <ul className="flex flex-wrap gap-2">
      {visible.map((item) => (
        <li key={item} className={CHIP_CLASS}>
          {item}
        </li>
      ))}
      {!expanded && hidden > 0 && (
        <li>
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className={`${CHIP_CLASS} text-accent-600 hover:bg-surface-alt`}
          >
            Ver mais (+{hidden})
          </button>
        </li>
      )}
    </ul>
  );
}
