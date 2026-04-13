export default function Loading() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Title Skeleton */}
      <div className="h-12 w-1/2 bg-slate-300 rounded-lg mb-4 animate-pulse mx-auto"></div>

      {/* Subtitle Skeleton */}
      <div className="h-6 w-2/3 bg-slate-200 rounded-lg mb-12 animate-pulse mx-auto"></div>

      {/* Cards Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="p-6 border border-slate-200 rounded-xl bg-white shadow-lg"
          >
            <div className="h-6 w-3/4 bg-slate-300 rounded mb-3 animate-pulse"></div>
            <div className="h-4 w-full bg-slate-200 rounded mb-4 animate-pulse"></div>
            <div className="h-4 w-full bg-slate-200 rounded mb-4 animate-pulse"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-300 animate-pulse"></div>
                <div className="h-4 w-16 bg-slate-200 rounded animate-pulse"></div>
              </div>
              <div className="h-4 w-12 bg-slate-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}