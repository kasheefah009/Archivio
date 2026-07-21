import { Link } from "react-router-dom";

function InstagramIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
        </svg>
    );
}
function TwitterIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
            <path d="M18.9 2h3.4l-7.4 8.5L23.6 22h-6.8l-5.3-7-6.1 7H2l7.9-9L1.6 2h7l4.8 6.4L18.9 2zm-1.2 18h1.9L6.4 3.9H4.4L17.7 20z" />
        </svg>
    );
}
function LinkedinIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
            <path d="M4.98 3.5a2.5 2.5 0 11.02 5 2.5 2.5 0 01-.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.2 1.44-2.2 2.96V21H9z" />
        </svg>
    );
}

function Logo({ size = 26 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#d9603a" strokeWidth="1.5">
            <path d="M3 21V9l4-3v15" />
            <path d="M11 21V6l4-3v18" />
            <path d="M19 21V11l2-1v11" />
        </svg>
    );
}

function Footer() {
    const links = [
        { label: "Home", to: "/" },
        { label: "Explore", to: "/explore" },
        { label: "About", to: "/about" },
        { label: "Contact", to: "/contact" },
    ];

    return (
        <footer className="relative overflow-hidden bg-[#161310] px-6 pb-8 pt-20 lg:px-10">
            {/* Faint line-art skyline instead of a wordmark — a row of simple
          building silhouettes drawn as outlines, echoing the logo's mark. */}
            <svg
                aria-hidden="true"
                viewBox="0 0 1400 260"
                preserveAspectRatio="xMidYMax slice"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full text-white/[0.06] sm:h-56"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
            >

                <rect x="40" y="140" width="160" height="120" />
                <line x1="40" y1="175" x2="200" y2="175" />
                <line x1="40" y1="210" x2="200" y2="210" />
                <line x1="90" y1="140" x2="90" y2="260" />
                <line x1="150" y1="140" x2="150" y2="260" />


                <path d="M230 260V150l60-40 60 40v110" />
                <line x1="230" y1="200" x2="350" y2="200" />

                <rect x="430" y="60" width="90" height="200" />
                <line x1="430" y1="100" x2="520" y2="100" />
                <line x1="430" y1="140" x2="520" y2="140" />
                <line x1="430" y1="180" x2="520" y2="180" />
                <line x1="430" y1="220" x2="520" y2="220" />

                <path d="M580 260v-70a45 45 0 0 1 90 0v70" />

                <path d="M740 260v-90h70v-40h80v130" />

                <rect x="940" y="110" width="180" height="150" />
                <line x1="975" y1="110" x2="975" y2="260" />
                <line x1="1010" y1="110" x2="1010" y2="260" />
                <line x1="1045" y1="110" x2="1045" y2="260" />
                <line x1="1080" y1="110" x2="1080" y2="260" />

                <path d="M1170 260V180l45-30 45 30v80" />

                <rect x="1300" y="40" width="60" height="220" />
                <line x1="1300" y1="90" x2="1360" y2="90" />
                <line x1="1300" y1="140" x2="1360" y2="140" />
                <line x1="1300" y1="190" x2="1360" y2="190" />
            </svg>

            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
                    <div className="flex items-center gap-2.5">
                        <Logo size={22} />
                        <span className="text-sm font-semibold tracking-[0.25em] text-stone-100">ARCHIVIO</span>
                    </div>

                    <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
                        {links.map((l) => (
                            <Link
                                key={l.label}
                                to={l.to}
                                className="text-sm text-stone-400 transition hover:text-orange-400"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4 text-stone-500">
                        <a href="#" aria-label="Instagram" className="transition hover:text-orange-500"><InstagramIcon className="h-4 w-4" /></a>
                        <a href="#" aria-label="Twitter" className="transition hover:text-orange-500"><TwitterIcon className="h-4 w-4" /></a>
                        <a href="#" aria-label="LinkedIn" className="transition hover:text-orange-500"><LinkedinIcon className="h-4 w-4" /></a>
                    </div>
                </div>

                <p className="mt-16 text-center text-xs text-stone-600 sm:text-left">
                    &copy; 2026 Archivio. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
export default Footer;

