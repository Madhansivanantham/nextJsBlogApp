"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function AdminPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 🔹 Sidebar */}
      {/* <aside className="w-64 bg-gray-900 text-white p-5 hidden md:block">
        <h2 className="text-2xl font-bold mb-8">DevBlog</h2>

        <nav className="space-y-4">
          <Link
            href="/admin"
            className="block px-3 py-2 rounded-lg bg-gray-800"
          >
            Dashboard
          </Link>

          <Link
            href="/add-blog"
            className="block px-3 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Add Blog
          </Link>

          <Link
            href="/articles"
            className="block px-3 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Articles
          </Link>
        </nav>
      </aside> */}

      {/* 🔹 Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm">
          <h1 className="text-2xl font-semibold">Dashboard</h1>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {session?.user?.email}
            </span>

            {/* <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
            >
              Logout
            </button> */}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-gray-500 text-sm">Total Posts</h2>
            <p className="text-3xl font-bold mt-2">12</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-gray-500 text-sm">Total Views</h2>
            <p className="text-3xl font-bold mt-2">1,240</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-gray-500 text-sm">Comments</h2>
            <p className="text-3xl font-bold mt-2">56</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-5 rounded-xl shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/add-blog"
              className="px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              + Add New Blog
            </Link>

            <Link
              href="/articles"
              className="px-5 py-3 border rounded-lg hover:bg-gray-100 transition"
            >
              View Articles
            </Link>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Posts</h2>

          <ul className="divide-y">
            <li className="flex justify-between py-3 hover:bg-gray-50 px-2 rounded">
              <span>JavaScript Basics</span>
              <div className="flex gap-3 text-sm">
                <button className="text-blue-500 hover:underline">
                  Edit
                </button>
                <button className="text-red-500 hover:underline">
                  Delete
                </button>
              </div>
            </li>

            <li className="flex justify-between py-3 hover:bg-gray-50 px-2 rounded">
              <span>Next.js Guide</span>
              <div className="flex gap-3 text-sm">
                <button className="text-blue-500 hover:underline">
                  Edit
                </button>
                <button className="text-red-500 hover:underline">
                  Delete
                </button>
              </div>
            </li>

            <li className="flex justify-between py-3 hover:bg-gray-50 px-2 rounded">
              <span>Tailwind Tips</span>
              <div className="flex gap-3 text-sm">
                <button className="text-blue-500 hover:underline">
                  Edit
                </button>
                <button className="text-red-500 hover:underline">
                  Delete
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}