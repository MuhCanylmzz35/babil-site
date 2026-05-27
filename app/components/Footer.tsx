export default function Footer() {
  return (
    <footer className="border-t border-[#1f2630] mt-auto">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-[#8b95a5]">
          © {new Date().getFullYear()} Babil. All rights reserved.
        </div>
        <div className="flex gap-6 text-sm text-[#cbd2da]">
          <a href="/privacy" className="hover:text-white transition-colors">
            Privacy
          </a>
          <a href="/terms" className="hover:text-white transition-colors">
            Terms
          </a>
          <a
            href="mailto:salimcanylmz35@gmail.com"
            className="hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
