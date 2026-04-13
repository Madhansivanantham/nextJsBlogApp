export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500">
        <span>© {new Date().getFullYear()} devblog. Built with Next.js.</span>
        <span>All rights reserved.</span>
      </div>
    </footer>
  );
}