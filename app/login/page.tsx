"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-10 pb-40">
    

      {/* 🔹 Right Side (Login Card) */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          {/* Title */}
          <h2 className="text-2xl font-semibold mb-2 text-center">
            Welcome Back Dev:)
          </h2>

          <p className="text-gray-500 text-center mb-6">
            Login to continue to your dashboard
          </p>

          {/* Google Button */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/admin" })}
            className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            <span className="font-medium">Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Info */}
          <p className="text-sm text-gray-500 text-center">
            Only authenticated users can create and manage blog posts.
          </p>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-blue-500 hover:underline"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}