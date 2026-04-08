import Link from "next/link";
import Navbar from "@/app/ui/navbar";

export default function Header() {
  return (
    <header className="border-b border-stone-200 bg-white sticky top-0 z-10">
      <div className="w-full px-10 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-stone-900 text-lg">
          devblog
        </Link>
        {/* <div className="flex gap-10">
          <Link href="/" className="text-sm text-stone-500 hover:text-stone-900">
          Articles
        </Link>
        <Link href="/" className="text-sm text-stone-500 hover:text-stone-900">
          Home
        </Link>
        </div> */}
        <Navbar></Navbar>
      </div>
    </header>
  );
}