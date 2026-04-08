import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from 'next/link';

export const metadata = {
  title: "devblog",
  description: "A simple developer blog.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />

        <div className="min-h-screen flex">

          <aside className="w-64 bg-gray-800 text-white p-5">
            <h2 className="text-xl font-bold mb-6">Dashboard</h2>

            <nav className="flex flex-col gap-3 ">
              <Link className="hover:text-stone-200 " href="/">Home</Link>
              <Link className="hover:text-stone-200 " href="/blog">Blog</Link>

            </nav>
          </aside>


          <main className="flex-1 p-6 bg-gray-100">
            {children}
          </main>
        </div>
        <Footer></Footer>
      </body>
    </html>
  );
}