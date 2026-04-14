import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from 'next/link';

export const metadata = {
  title: "devblog",
  description: "A simple developer blog.",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  console.log('Testin Git Change.....')
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />

        <div className="min-h-screen flex flex-col lg:flex-row">

          <aside className="w-full lg:w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white p-5 shadow-xl">
            <h2 className="text-xl font-bold mb-6 text-slate-100">Dashboard</h2>

            <nav className="flex flex-col gap-3 ">
              <Link className="hover:text-slate-200 transition-colors duration-200 flex items-center gap-2" href="/">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </Link>
              <Link className="hover:text-slate-200 transition-colors duration-200 flex items-center gap-2" href="/blog">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Blog
              </Link>
            </nav>
          </aside>


          <main className="flex-1 min-w-0 p-6 bg-slate-50">
            {children}
          </main>
        </div>
        <Footer></Footer>
      </body>
    </html>
  );
}