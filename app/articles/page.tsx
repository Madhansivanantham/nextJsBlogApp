import Link from 'next/link'
import type { Metadata } from 'next';
import { generateCommonMetadata, keywords } from '@/lib/metadata';

export const metadata: Metadata = generateCommonMetadata(
  'Getting Started with Next.js - Comprehensive Guide',
  'Learn Next.js from the basics. Discover why Next.js is the perfect choice for building fast, SEO-friendly web applications with built-in features and optimized rendering.',
  '/articles',
  undefined,
  ['Next.js', 'getting started', 'React', 'tutorial', 'web development', ...keywords.articles]
);

export default function ArticlesPage() {
  return (
    <>


      <article className="min-h-screen py-16 px-6 bg-slate-50">
        <div className="max-w-2xl mx-auto">

          <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-10 group-hover:-translate-x-1 duration-300">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Getting Started with Next.js
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-3 text-sm text-slate-500 mb-10">
            <span className="font-medium text-slate-700">Madhan</span>
            <span>•</span>
            <span>April 8, 2026</span>
            <span>•</span>
            <span>5 min read</span>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-slate-200 mb-14" />

          {/* Content */}
          <div className="space-y-10 text-slate-700 leading-8 text-lg">

            <p>
              Next.js is a powerful React framework that helps developers build
              fast, scalable, and SEO-friendly web applications with ease.
            </p>

            <p>
              It comes with built-in features like file-based routing,
              server-side rendering (SSR), static site generation (SSG).
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">
              Why Choose Next.js?
            </h2>

            <p>
              With Next.js, you don’t have to configure complex tooling. It
              provides everything you need to build production-ready apps.
            </p>

            <ul className="list-disc pl-6 space-y-3">
              <li>⚡ Fast performance with optimized rendering</li>
              <li>📁 Simple file-based routing</li>
              <li>🔍 SEO-friendly pages</li>
              <li>🧩 Built-in API routes</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-16 mb-4">
              Project Structure
            </h2>

            <p>
              The App Router in Next.js allows you to organize your project using
              layouts, ....
            </p>

            <pre className="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm mt-6">
              {`app/
 ├── layout.tsx
 ├── page.tsx
 ├── articles/
 │    └── page.tsx`}
            </pre>

            <h2 className="text-2xl font-semibold text-gray-900 mt-16 mb-4">
              Conclusion
            </h2>

            <p>
              Next.js simplifies modern web development by combining powerful
              features with an intuitive developer experience. Whether you're
              building a blog, dashboard.
            </p>

          </div>

        </div>
      </article>
      {/* <Footer></Footer> */}
    </>
  );
}