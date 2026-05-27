import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Support", href: "#support" },
];

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-[#0d1117]/80 border-b border-[#1f2630]/60">
      <nav className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/babil-logo-mark.png"
            alt="Babil"
            width={32}
            height={32}
            priority
          />
          <span className="text-xl font-semibold tracking-tight text-[#ff8c42]">
            Babil
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm text-[#cbd2da]">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="hover:text-white transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#download"
          className="inline-flex items-center justify-center rounded-full bg-[#2ee5a8] px-5 py-2 text-sm font-semibold text-[#0d1117] hover:bg-[#3df0b6] transition-colors"
        >
          Download
        </a>
      </nav>
    </header>
  );
}
