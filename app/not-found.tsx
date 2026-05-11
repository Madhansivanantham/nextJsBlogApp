import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mt-2">Page Not Found</h2>
        <p className="text-gray-500 mt-4 max-w-md">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
      </div>
      <div className="flex gap-4 mt-6">
        <Link
          href="/"
          className="rounded bg-black px-6 py-3 text-white hover:bg-gray-800 transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/blog"
          className="rounded border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Browse Blog
        </Link>
      </div>
    </div>
  );
}