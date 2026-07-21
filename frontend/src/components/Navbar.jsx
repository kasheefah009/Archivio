import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { userStore } from "../store/useStore";
import { getAvatarUrl } from "../utils/getAvatarUrl";
import {
    Search,
    X,
    Menu,
    Hammer,
    ChevronDown,
    LayoutGrid,
    FolderHeart,
    Bookmark,
    Users,
    Settings,
    Sun,
    Moon,
    MonitorSmartphone,
    ArrowUpRight,
    LogOut,
    Home as HomeIcon,
    Sofa,
    Trees,
    Layers,
    BookOpen,
} from "lucide-react";

function Logo({ size = 26 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#d9603a" strokeWidth="1.5">
            <path d="M3 21V9l4-3v15" />
            <path d="M11 21V6l4-3v18" />
            <path d="M19 21V11l2-1v11" />
        </svg>
    );
}

function SearchModal({ open, onClose }) {
    const [query, setQuery] = useState("");
    const [searchedFor, setSearchedFor] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
            const t = setTimeout(() => inputRef.current?.focus(), 350);
            const onKey = (e) => e.key === "Escape" && onClose();
            window.addEventListener("keydown", onKey);
            return () => {
                document.body.style.overflow = "";
                window.removeEventListener("keydown", onKey);
                clearTimeout(t);
            };
        } else {
            const t = setTimeout(() => {
                setQuery("");
                setSearchedFor(null);
            }, 300);
            return () => clearTimeout(t);
        }
    }, [open, onClose]);

    const suggestions = [
        "Minimalist homes",
        "Concrete architecture",
        "Coastal retreats",
        "Sustainable design",
        "Japanese-inspired interiors",
        "Glass pavilions",
    ];

    const runSearch = (term) => {
        const trimmed = term.trim();
        if (!trimmed) return;
        setQuery(trimmed);
        setSearchedFor(trimmed);
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-start justify-center transition-all duration-300 ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                }`}
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />

            <div
                className={`relative z-10 mt-[12vh] w-full max-w-2xl px-6 transition-all duration-500 ease-out ${open ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-95 opacity-0"
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    aria-label="Close search"
                    className="absolute -top-14 right-6 text-stone-400 transition hover:text-white"
                >
                    <X size={22} />
                </button>

                {searchedFor === null ? (
                    <div key="search-form" style={{ animation: "navModalFade 0.35s ease-out" }}>
                        <div className="mb-8 flex justify-center">
                            <div
                                className={`flex items-center justify-center rounded-full bg-orange-700/15 text-orange-500 transition-all duration-500 ${open ? "h-16 w-16" : "h-8 w-8"
                                    }`}
                            >
                                <Search size={open ? 26 : 16} />
                            </div>
                        </div>

                        <p className="mb-6 text-center font-serif text-3xl leading-snug text-stone-50">
                            What architectural design
                            <br />
                            are you looking for?
                        </p>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                runSearch(query);
                            }}
                            className="relative"
                        >
                            <Search size={18} className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-stone-500" />
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Try 'concrete house' or 'coastal retreat'"
                                className="w-full rounded-full border border-stone-700 bg-[#1c1917] py-4 pl-12 pr-5 text-sm text-stone-100 placeholder-stone-500 outline-none transition focus:border-orange-600"
                            />
                        </form>

                        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
                            {suggestions.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => runSearch(s)}
                                    className="rounded-full border border-stone-700 px-4 py-2 text-xs text-stone-300 transition hover:border-orange-600 hover:text-orange-400"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div
                        key="coming-soon"
                        className="rounded-3xl border border-white/10 bg-[#1c1917] px-8 py-12 text-center"
                        style={{ animation: "navModalFade 0.4s ease-out" }}
                    >
                        <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center">
                            <span className="absolute inset-0 animate-ping rounded-full bg-orange-600/20" />
                            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-orange-700/15 text-orange-500">
                                <Hammer size={26} />
                            </span>
                        </div>

                        <span className="mb-4 inline-block rounded-full border border-orange-600/40 bg-orange-700/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-orange-400">
                            Under construction
                        </span>

                        <h3 className="font-serif text-2xl text-stone-50">
                            We're still building this part of Archivio
                        </h3>
                        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-stone-400">
                            Search for <span className="text-stone-200">&ldquo;{searchedFor}&rdquo;</span>{" "}
                            isn't live yet — our team is still crafting the full search
                            experience. Check back soon.
                        </p>

                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <button
                                onClick={() => setSearchedFor(null)}
                                className="rounded-full border border-stone-700 px-5 py-2.5 text-sm text-stone-300 transition hover:border-orange-600 hover:text-orange-400"
                            >
                                Try another search
                            </button>
                            <button
                                onClick={onClose}
                                className="rounded-full bg-orange-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600"
                            >
                                Keep browsing
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function maskEmail(email = "") {
    const [name, domain] = email.split("@");
    if (!domain) return email;
    const visible = name.slice(0, 4);
    return `${visible}${"…"}@${domain}`;
}

function ProfileMenu({ user, onLogout }) {
    const [open, setOpen] = useState(false);
    const [theme, setTheme] = useState("dark"); //work on this later
    const ref = useRef(null);

    useEffect(() => {
        if (!open) return;
        const onClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        document.addEventListener("mousedown", onClickOutside);
        window.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onClickOutside);
            window.removeEventListener("keydown", onKey);
        };
    }, [open]);

    const quickLinks = [
        { label: "Dashboard", icon: LayoutGrid, to: "/dashboard" },
    ];
    const companyLinks = [
        { label: "Support", external: true },
    ];

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-1.5 rounded-full border border-transparent p-0.5 pr-1.5 transition hover:border-white/10"
                aria-haspopup="menu"
                aria-expanded={open}
            >
                <img
                    src={getAvatarUrl(user._id) || "https://picsum.photos/seed/archivio-portrait/500/625"}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover"
                />
                <ChevronDown size={14} className={`text-stone-400 transition ${open ? "rotate-180" : ""}`} />
            </button>

            <div
                className={`absolute right-0 top-full z-40 mt-3 w-72 origin-top-right rounded-2xl border border-white/10 bg-[#1c1917] shadow-2xl shadow-black/40 transition-all duration-150 ${open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
                    }`}
                role="menu"
            >

                <div className="px-4 pb-3 pt-4">
                    <p className="text-sm font-medium text-stone-100">{user.name}</p>
                    <p className="truncate text-xs text-stone-500">{maskEmail(user.email)}</p>
                    <Link
                        to="/profile/setup"
                        onClick={() => setOpen(false)}
                        className="mt-3 block w-full rounded-full bg-white/5 py-2 text-center text-xs font-medium text-stone-200 transition hover:bg-white/10"
                    >
                        Set up profile
                    </Link>
                </div>

                <div className="h-px bg-white/5" />

                {/* Quick links into the dashboard */}
                <div className="py-1.5">
                    {quickLinks.map(({ label, icon: Icon, to }) => (
                        <Link
                            key={label}
                            to={to}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-stone-200 transition hover:bg-white/5"
                        >
                            <Icon size={15} className="text-stone-400" />
                            {label}
                        </Link>
                    ))}
                    <Link
                        to="/settings"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-stone-200 transition hover:bg-white/5"
                    >
                        <Settings size={15} className="text-stone-400" />
                        Settings
                    </Link>
                </div>

                <div className="h-px bg-white/5" />

                <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-sm text-stone-200">Theme</span>
                    <div className="flex items-center gap-1 rounded-full bg-black/30 p-1">
                        {[
                            { key: "light", icon: Sun },
                            { key: "dark", icon: Moon },
                            { key: "system", icon: MonitorSmartphone },
                        ].map(({ key, icon: Icon }) => (
                            <button
                                key={key}
                                onClick={() => setTheme(key)}
                                aria-label={`${key} theme`}
                                className={`flex h-6 w-6 items-center justify-center rounded-full transition ${theme === key ? "bg-orange-700 text-white" : "text-stone-500 hover:text-stone-300"
                                    }`}
                            >
                                <Icon size={12} />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="h-px bg-white/5" />

                <div className="py-1.5">
                    {companyLinks.map(({ label, external }) => (
                        <Link
                            key={label}
                            to="/support"
                            className="flex items-center justify-between px-4 py-2 text-sm text-stone-200 transition hover:bg-white/5"
                        >
                            {label}
                            {external && <ArrowUpRight size={13} className="text-stone-500" />}
                        </Link>
                    ))}
                </div>

                <div className="h-px bg-white/5" />

                <button
                    onClick={onLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-stone-300 transition hover:bg-red-500/10 hover:text-red-400"
                >
                    <LogOut size={15} />
                    Log out
                </button>

                <div className="flex items-center justify-between border-t border-white/5 px-4 py-3 text-[11px] text-stone-600">
                    <div className="flex gap-3">
                        <a href="#" className="hover:text-stone-400">Privacy</a>
                        <a href="#" className="hover:text-stone-400">Terms</a>
                        <span>&copy; 2026</span>
                    </div>
                </div>
            </div>
        </div>
    );
}


const EXPLORE_ITEMS = [
    { label: "Projects", to: "/projects" },
    { label: "Collections", to: "/collections" },
    { label: "Journal", to: "/journal" },
    { label: "Community", to: "/community" },
];

function ExploreMenu({ isActive }) {
    const { isLoggedIn } = userStore();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!open) return;
        const onClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        document.addEventListener("mousedown", onClickOutside);
        window.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onClickOutside);
            window.removeEventListener("keydown", onKey);
        };
    }, [open]);

    return (
        <div className="relative flex items-center gap-1" ref={ref}>
            <Link
                to="/explore"
                className={`relative text-sm transition-colors ${isActive ? "text-orange-500" : "text-stone-300 hover:text-white"
                    }`}
            >
                Explore
                {isActive && (
                    <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-orange-500" />
                )}
            </Link>
            {isLoggedIn && (
                <>
                    <button
                        onClick={() => setOpen((o) => !o)}
                        aria-label="Open explore menu"
                        aria-expanded={open}
                        className="text-stone-400 transition hover:text-white"
                    >
                        <ChevronDown size={13} className={`transition-transform ${open ? "rotate-180" : ""}`} />
                    </button>

                    <div
                        className={`absolute left-1/2 top-full z-40 mt-3 w-64 -translate-x-1/2 origin-top rounded-2xl border border-white/10 bg-[#1c1917] p-2 shadow-2xl shadow-black/40 transition-all duration-150 ${open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
                            }`}
                    >
                        <div className="flex flex-col">
                            {EXPLORE_ITEMS.map(({ label, to }) => (
                                <Link
                                    key={label}
                                    to={to}
                                    onClick={() => setOpen(false)}
                                    className="rounded-lg px-3.5 py-2.5 text-sm text-stone-200 transition hover:bg-white/5 hover:text-white"
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                        <Link
                            to="/explore"
                            onClick={() => setOpen(false)}
                            className="mt-2 flex items-center justify-center gap-1.5 rounded-xl border-t border-white/5 px-3 py-3 text-sm font-medium text-orange-500 transition hover:bg-white/5"
                        >
                            See everything on Explore
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}


const NAV_LINKS = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
];

export default function Navbar({ active }) {
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileExploreOpen, setMobileExploreOpen] = useState(false);
    const location = useLocation();

    const { user, isLoggedIn, logOut } = userStore();

    const isActive = (link) => {
        if (active) return link.label === active;
        if (link.to === "/") return location.pathname === "/";
        return location.pathname.startsWith(link.to);
    };

    const isExploreActive =
        active === "Explore" ||
        ["/explore", "/projects", "/collections", "/journal", "/community"].some((p) => location.pathname.startsWith(p));

    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    return (
        <>
            <style>{`
        @keyframes navModalFade {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes mobileMenuIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

            <header className="sticky top-0 z-30 border-b border-white/5 bg-[#100e0c]/80 backdrop-blur-md relative">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
                    <Link to="/" className="flex items-center gap-2.5">
                        <Logo />
                        <span className="text-sm font-semibold tracking-[0.25em] text-stone-100 lg:block hidden">ARCHIVIO</span>
                    </Link>

                    <nav className="hidden items-center gap-8 md:flex">
                        <Link
                            to="/"
                            className={`relative text-sm transition-colors ${isActive(NAV_LINKS[0]) ? "text-orange-500" : "text-stone-300 hover:text-white"
                                }`}
                        >
                            Home
                            {isActive(NAV_LINKS[0]) && (
                                <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-orange-500" />
                            )}
                        </Link>

                        <ExploreMenu isActive={isExploreActive} />

                        {NAV_LINKS.slice(1).map((link) => (
                            <Link
                                key={link.label}
                                to={link.to}
                                className={`relative text-sm transition-colors ${isActive(link) ? "text-orange-500" : "text-stone-300 hover:text-white"
                                    }`}
                            >
                                {link.label}
                                {isActive(link) && (
                                    <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-orange-500" />
                                )}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4 sm:gap-5">
                        <button
                            onClick={() => setSearchOpen(true)}
                            aria-label="Search"
                            className="text-stone-300 transition hover:text-white"
                        >
                            <Search size={18} />
                        </button>

                        <div className="hidden items-center gap-5 md:flex">
                            {isLoggedIn && user ? (
                                <ProfileMenu user={user} onLogout={logOut} />
                            ) : (
                                <>
                                    <Link to="/login" className="text-sm text-stone-300 transition hover:text-white">
                                        Log in
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="rounded-full bg-orange-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
                                    >
                                        Sign up
                                    </Link>
                                </>
                            )}
                        </div>

                        {isLoggedIn && user && (
                            <div className="md:hidden">
                                <ProfileMenu user={user} onLogout={logOut} />
                            </div>
                        )}
                        <button
                            onClick={() => setMobileOpen((o) => !o)}
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                            aria-expanded={mobileOpen}
                            className="text-stone-300 transition hover:text-white md:hidden"
                        >
                            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {mobileOpen && (
                    <div
                        className="absolute left-0 right-0 top-full max-h-[calc(100vh-73px)] overflow-y-auto border-t border-white/5 bg-[#100e0c] px-6 py-4 shadow-xl shadow-black/40 md:hidden"
                        style={{ animation: "mobileMenuIn 0.2s ease-out" }}
                    >
                        <nav className="flex flex-col gap-1">
                            <Link
                                to="/"
                                className={`rounded-lg px-3 py-2.5 text-sm transition ${isActive(NAV_LINKS[0])
                                    ? "bg-orange-700/15 text-orange-500"
                                    : "text-stone-300 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                Home
                            </Link>


                            {isLoggedIn ? (
                                <>
                                    <div className={`flex items-center justify-between rounded-lg pr-2 text-sm transition ${isExploreActive
                                        ? "bg-orange-700/15 text-orange-500"
                                        : "text-stone-300 hover:bg-white/5 hover:text-white"
                                        }`}
                                    >
                                        <Link to="/explore" className="flex-1 px-3 py-2.5">
                                            Explore
                                        </Link>
                                        <button
                                            onClick={() => setMobileExploreOpen((o) => !o)}
                                            aria-expanded={mobileExploreOpen}
                                            aria-label="Toggle Explore submenu"
                                            className="p-2"
                                        >
                                            <ChevronDown size={14} className={`transition-transform ${mobileExploreOpen ? "rotate-180" : ""}`} />
                                        </button>
                                    </div>
                                    {mobileExploreOpen && (
                                        <div className="ml-2 flex flex-col gap-0.5 border-l border-white/5 pl-3">
                                            {EXPLORE_ITEMS.map(({ label, to }) => (
                                                <Link
                                                    key={label}
                                                    to={to}
                                                    className="rounded-lg px-3 py-2 text-sm text-stone-400 transition hover:bg-white/5 hover:text-white"
                                                >
                                                    {label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link
                                    to="/explore"
                                    className={`rounded-lg px-3 py-2.5 text-sm transition ${isExploreActive
                                        ? "bg-orange-700/15 text-orange-500"
                                        : "text-stone-300 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    Explore
                                </Link>
                            )}

                            {NAV_LINKS.slice(1).map((link) => (
                                <Link
                                    key={link.label}
                                    to={link.to}
                                    className={`rounded-lg px-3 py-2.5 text-sm transition ${isActive(link)
                                        ? "bg-orange-700/15 text-orange-500"
                                        : "text-stone-300 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {!(isLoggedIn && user) && (
                            <div className="mt-4 flex flex-col gap-2 border-t border-white/5 pt-4">
                                <Link
                                    to="/login"
                                    className="rounded-lg px-3 py-2.5 text-center text-sm text-stone-300 transition hover:bg-white/5 hover:text-white"
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/signup"
                                    className="rounded-full bg-orange-700 px-3 py-2.5 text-center text-sm font-medium text-white transition hover:bg-orange-600"
                                >
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </header>

            <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
}