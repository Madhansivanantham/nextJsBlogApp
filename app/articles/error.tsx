"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Articles Error</h1>
      <p className="text-gray-500">An error occurred while loading articles.</p>
      <button
        onClick={() => reset()}
        className="rounded bg-black px-4 py-2 text-white"
      >
        Try again
      </button>
    </div>
  )
}