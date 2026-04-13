import Link from "next/link";
import Navbar from "@/app/ui/navbar";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
      <div className="w-full px-10 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-slate-900 text-xl hover:text-slate-700 transition-colors">
          devblog
        </Link>
        <Navbar></Navbar>
      </div>
    </header>
  );
}