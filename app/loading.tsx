export default function Loading() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* <h2>Loading...... </h2> */}
      {/* <h3>Please wait:)</h3> */}
      {/* Title Skeleton */}
      <div className="h-8 w-1/3 bg-gray-300 rounded mb-4 animate-pulse"></div>

      {/* Subtitle Skeleton */}
      <div className="h-4 w-1/2 bg-gray-200 rounded mb-8 animate-pulse"></div>

      {/* Cards Skeleton */}
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-4 border rounded-lg bg-white shadow-sm"
          >
            <div className="h-5 w-1/2 bg-gray-300 rounded mb-2 animate-pulse"></div>
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>

    </div>
  );
}