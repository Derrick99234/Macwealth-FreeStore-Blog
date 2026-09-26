"use client";

interface PaginationProps {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ current, total, onPageChange }: PaginationProps) {
  const pages = [];
  for (let i = 1; i <= Math.min(total, 5); i++) {
    pages.push(i);
  }
  if (total > 5) pages.push(-1);

  return (
    <div className="px-md py-sm bg-surface-container-low border-t border-outline-variant flex items-center justify-between">
      <span className="text-meta-data text-on-surface-variant font-meta-data">
        Showing 1 to {Math.min(5, total)} of {total} results
      </span>
      <div className="flex items-center gap-xs">
        <button
          onClick={() => onPageChange(current - 1)}
          disabled={current === 1}
          className="p-xs text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all active:scale-90 disabled:opacity-30"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        {pages.map((p, i) =>
          p === -1 ? (
            <span key={`ellipsis-${i}`} className="px-sm py-xs text-on-surface-variant font-ui-label">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`px-sm py-xs rounded-lg font-ui-label text-ui-label transition-all ${
                p === current
                  ? "bg-primary text-on-primary"
                  : "hover:bg-surface-container-high text-on-surface-variant"
              }`}
            >
              {p}
            </button>
          )
        )}
        <button
          onClick={() => onPageChange(current + 1)}
          disabled={current === total}
          className="p-xs text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all active:scale-90 disabled:opacity-30"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
