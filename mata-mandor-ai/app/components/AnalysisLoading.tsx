export default function AnalysisLoading() {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="h-4 w-36 bg-neutral-100 rounded" />
        <div className="h-4 w-4 bg-neutral-100 rounded" />
      </div>

      <div className="p-5 md:p-6 space-y-8">
        {/* Image + Summary skeleton */}
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex-1 rounded-xl bg-neutral-100 min-h-[180px]" />
          <div className="shrink-0 w-full sm:w-64 bg-neutral-50 rounded-2xl p-5 space-y-3">
            <div className="h-4 w-28 bg-neutral-100 rounded" />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3 bg-white rounded-xl">
                <div className="h-3 w-24 bg-neutral-100 rounded" />
                <div className="h-3 w-16 bg-neutral-100 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Analysis text skeleton */}
        <div className="space-y-2">
          <div className="h-4 w-32 bg-neutral-100 rounded" />
          <div className="h-3 w-full bg-neutral-50 rounded" />
          <div className="h-3 w-3/4 bg-neutral-50 rounded" />
        </div>

        {/* Table skeleton */}
        <div className="space-y-3">
          <div className="h-4 w-40 bg-neutral-100 rounded" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 py-3 border-b border-border/40">
              <div className="w-8 h-8 rounded bg-neutral-100" />
              <div className="flex-1 space-y-1">
                <div className="h-3 w-32 bg-neutral-100 rounded" />
              </div>
              <div className="h-3 w-12 bg-neutral-100 rounded" />
              <div className="h-3 w-16 bg-neutral-100 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Loading indicator */}
      <div className="flex items-center justify-center gap-3 py-6 border-t border-border/60">
        <div className="w-5 h-5 border-2 border-neutral-300 border-t-foreground rounded-full animate-spin" />
        <p className="text-[13px] font-medium text-neutral-500">
          AI sedang menganalisis foto Anda...
        </p>
      </div>
    </div>
  );
}
