import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
    ArrowRight,
    ArrowLeft,
    Compass,
    Bookmark,
    Users,
    Sparkles,
    Quote,
    ChevronLeft,
    ChevronRight,
    ShieldCheck,
    FolderHeart,
    MessageCircle,
    ArrowRight as ArrowRightIcon,
    Heart,
    GraduationCap,
    BookOpen,
    Globe,
    Building2,
    Ruler,
    PenTool,
    Square,
    Waves,
    Leaf,
    Layers,
    TreePine,
    Trees,
    Sofa,
} from "lucide-react";
import { userStore } from "../store/useStore";


function Reveal({ children, delay = 0, className = "" }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    io.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-500 ease-out ${className}`}
            style={{
                transitionDelay: `${delay}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(14px)",
            }}
        >
            {children}
        </div>
    );
}

function Counter({ target, duration = 1400 }) {
    const [value, setValue] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    let start = null;
                    let frame;
                    const step = (ts) => {
                        if (start === null) start = ts;
                        const progress = Math.min((ts - start) / duration, 1);
                        setValue(Math.round(progress * target));
                        if (progress < 1) frame = requestAnimationFrame(step);
                    };
                    frame = requestAnimationFrame(step);
                }
            },
            { threshold: 0.4 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [target, duration]);

    return <span ref={ref}>{value.toLocaleString()}</span>;
}


const BADGE_MESSAGES = [
    { text: "Loved by architects", icons: [Compass, Users, Heart] },
    { text: "Used by students", icons: [GraduationCap, BookOpen, Globe] },
    { text: "Trusted by firms", icons: [Building2, Ruler, PenTool] },
];

function RotatingBadge() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % BADGE_MESSAGES.length);
        }, 3500);
        return () => clearInterval(id);
    }, []);

    const current = BADGE_MESSAGES[index];

    return (
        <div className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-black/50 px-3 py-1.5 backdrop-blur-md sm:gap-2.5 sm:px-4 sm:py-2">
            <span
                key={index}
                className="text-[11px] font-medium text-white/85 sm:text-xs"
                style={{ animation: "heroBadgeFade 0.4s ease-out" }}
            >
                {current.text}
            </span>
            <span className="flex items-center gap-1">
                {current.icons.map((Icon, i) => (
                    <span
                        key={i}
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-white/80 sm:h-6 sm:w-6"
                    >
                        <Icon size={11} />
                    </span>
                ))}
            </span>
        </div>
    );
}

const STYLES = [
    { label: "Minimalism", icon: Square },
    { label: "Concrete", icon: Building2 },
    { label: "Coastal", icon: Waves },
    { label: "Sustainable", icon: Leaf },
    { label: "Glass & Steel", icon: Layers },
    { label: "Timber & Warmth", icon: TreePine },
    { label: "Landscape", icon: Trees },
    { label: "Interiors", icon: Sofa },
];
function Hero() {
    const { isLoggedIn } = userStore();

    return (
        <section className="relative min-h-[88vh] w-full overflow-hidden bg-black">
            <style>{`
        @keyframes heroBadgeFade {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .hero-pulse-dot { animation: heroPulse 1.8s ease-in-out infinite; }
      `}</style>
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full scale-105 object-cover"
                style={{ filter: "blur(2px)" }}
            >
                <source src="/videos/Archivio-hero.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 flex min-h-[88vh] flex-col items-center justify-center px-6 pt-8 text-center">
                <div className="mb-10">
                    <RotatingBadge />
                </div>
                <h1 className="font-serif italic leading-[0.95] text-5xl text-white sm:text-6xl lg:text-7xl">
                    <span className="mix-blend-overlay">buildings worth</span>
                    <br />
                    <span className="mix-blend-overlay">remembering</span>
                </h1>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-white/80 sm:text-sm">
                    discover | save | discuss
                </p>

                <Link
                    to={isLoggedIn ? "/explore" : "/signup"}
                    className="group mt-8 flex items-center gap-3 rounded-full border border-white/20 bg-white/5 py-2 pl-2 pr-5 backdrop-blur-md transition hover:bg-white/10"
                >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-700 text-white">
                        <Compass size={15} />
                    </span>
                    <span className="text-sm text-white">
                        <span className="text-white/70">start</span>{" "}
                        <span className="font-semibold">exploring</span>
                    </span>
                    <ArrowRight size={15} className="text-white/70 transition group-hover:translate-x-0.5" />
                </Link>

                <div className="mt-5 flex items-center gap-2 text-xs text-white/60">
                    <span className="hero-pulse-dot h-1.5 w-1.5 rounded-full bg-orange-500" />
                    new buildings added every week
                </div>

                <div className="mt-16 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-4">
                    {STYLES.map(({ label, icon: Icon }) => (
                        <span key={label} className="flex items-center gap-2 text-white/70">
                            <Icon size={16} />
                            <span className="text-sm font-medium">{label}</span>
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
const MEMBER_CITIES = [
    "LAGOS", "TOKYO", "COPENHAGEN", "MEXICO CITY", "SINGAPORE", "ACCRA", "WARSAW", "BANGALORE", "AUSTIN", "DUBAI",
];

function TrustStrip() {
    return (
        <section className="border-y border-white/5 py-8 ">
            <div className="overflow-hidden">
                <div className="flex w-max gap-10 whitespace-nowrap text-xs font-medium uppercase tracking-[0.3em] text-stone-600 [animation:tickerScroll_32s_linear_infinite]">
                    {[...MEMBER_CITIES, ...MEMBER_CITIES, ...MEMBER_CITIES].map((c, i) => (
                        <span key={i} className="flex items-center gap-10">
                            {c} <span className="text-orange-600/40">&middot;</span>
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}

function StatsRow() {
    const stats = [
        { value: 12400, suffix: "+", label: "Members worldwide" },
        { value: 340, suffix: "", label: "Curated collections" },
        { value: 1200, suffix: "+", label: "Projects archived" },
        { value: 58, suffix: "", label: "Countries represented" },
    ];
    return (
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:display-none">
            <div className="grid grid-cols-2 place-items-center gap-8 sm:grid-cols-4">
                {stats.map((s) => (
                    <Reveal key={s.label}>
                        <div className="text-center sm:text-left">
                            <p className="font-serif text-4xl text-stone-50 sm:text-5xl">
                                <Counter target={s.value} />
                                {s.suffix}
                            </p>
                            <p className="mt-1.5 text-xs text-stone-500">{s.label}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}

function FeatureBento() {
    return (
        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
            <Reveal>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-orange-500">
                    What Archivio Is
                </p>
                <h2 className="max-w-lg font-serif text-4xl text-stone-50">
                    One place for everything you love about architecture.
                </h2>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
                <Reveal delay={80}>
                    <div className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-[#1c1917] transition hover:border-orange-600/30">
                        <div className="h-48 overflow-hidden">
                            <img src="/images/Home/Discover.jpg" alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                        </div>
                        <div className="p-6">
                            <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-orange-700/15 text-orange-500">
                                <Compass size={17} />
                            </span>
                            <h3 className="font-serif text-xl text-stone-50">Discover</h3>
                            <p className="mt-2 text-sm leading-relaxed text-stone-400">
                                Browse an ever-growing archive organized the way architects
                                actually think by material, by mood, by typology.
                            </p>
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={160}>
                    <div className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-[#1c1917] transition hover:border-orange-600/30">
                        <div className="h-48 overflow-hidden">
                            <img src="/images/Home/Connect.jpg" alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                        </div>
                        <div className="p-6">
                            <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-orange-700/15 text-orange-500">
                                <Users size={17} />
                            </span>
                            <h3 className="font-serif text-xl text-stone-50">Connect</h3>
                            <p className="mt-2 text-sm leading-relaxed text-stone-400">
                                Meet working architects and aspiring ones in the same place.
                                Ask questions. Get answers from people who've actually done it.
                            </p>
                        </div>
                    </div>
                </Reveal>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {[
                    { icon: Bookmark, title: "Save & organize", desc: "Boards for whatever you're chasing right now.", seed: "feat-save" },
                    { icon: Sparkles, title: "Curated by people", desc: "Assembled by our team, not an algorithm.", seed: "feat-curated" },
                    { icon: ShieldCheck, title: "Your boards, private", desc: "Public by default doesn't mean it has to be.", seed: "feat-privacy" },
                ].map(({ icon: Icon, title, desc, seed }, i) => (
                    <Reveal key={title} delay={i * 100}>
                        <div className="h-full rounded-2xl border border-white/10 bg-[#1c1917] p-6 transition hover:border-orange-600/30">
                            <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-orange-700/15 text-orange-500">
                                <Icon size={15} />
                            </span>
                            <h3 className="text-base font-medium text-stone-100">{title}</h3>
                            <p className="mt-1.5 text-xs leading-relaxed text-stone-500">{desc}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}


function SpotlightCarousel() {
    const wrapRef = useRef(null);
    const trackRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    io.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const scroll = (dir) => trackRef.current?.scrollBy({ left: dir * 336, behavior: "smooth" });

    const boards = [
        { name: "Minimal Living", creator: "Amara Okoye", count: 24, seeds: ["b1-1", "b1-2", "b1-3", "b1-4"] },
        { name: "Coastal Escapes", creator: "Daniel Reyes", count: 18, seeds: ["b2-1", "b2-2", "b2-3", "b2-4"] },
        { name: "Concrete Studies", creator: "Tomasz Kowal", count: 31, seeds: ["b3-1", "b3-2", "b3-3", "b3-4"] },
        { name: "Warm Interiors", creator: "Jasmine Lee", count: 12, seeds: ["b4-1", "b4-2", "b4-3", "b4-4"] },
        { name: "Japanese Influence", creator: "Kwame Asante", count: 19, seeds: ["b5-1", "b5-2", "b5-3", "b5-4"] },
        { name: "Vertical Living", creator: "Priya Nair", count: 9, seeds: ["b6-1", "b6-2", "b6-3", "b6-4"] },
    ];

    return (
        <section ref={wrapRef} className="overflow-hidden py-10">
            <div className="mx-auto mb-8 flex max-w-7xl items-end justify-between px-6 lg:px-10">
                <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-orange-500">
                        Community Boards
                    </p>
                    <h2 className="font-serif text-3xl text-stone-50 sm:text-4xl">
                        What people are building right now.
                    </h2>
                </div>
                <div className="hidden gap-2 sm:flex">
                    <button
                        onClick={() => scroll(-1)}
                        aria-label="Scroll left"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-stone-300 transition hover:border-orange-500 hover:text-orange-500"
                    >
                        <ArrowLeft size={16} />
                    </button>
                    <button
                        onClick={() => scroll(1)}
                        aria-label="Scroll right"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-stone-300 transition hover:border-orange-500 hover:text-orange-500"
                    >
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>

            <div
                ref={trackRef}
                className="flex gap-5 overflow-x-auto scroll-smooth px-6 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:px-10 [&::-webkit-scrollbar]:hidden"
                style={{
                    transform: visible ? "translateX(0)" : "translateX(8%)",
                    opacity: visible ? 1 : 0,
                    transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease-out",
                }}
            >
                {boards.map((b) => (
                    <div
                        key={b.name}
                        className="w-72 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#1c1917] sm:w-80"
                    >
                        <div className="grid h-40 grid-cols-2 gap-0.5">
                            {b.seeds.map((seed) => (
                                <div key={seed} className="overflow-hidden bg-[#141210]">
                                    <img src={`https://picsum.photos/seed/${seed}/300/300`} alt="" className="h-full w-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <div className="p-4">
                            <p className="text-sm font-medium text-stone-100">{b.name}</p>
                            <p className="mt-1 text-xs text-stone-500">
                                {b.count} saved by {b.creator}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function ChaosSection() {
    return (
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <div className="grid grid-cols-1 items-center gap-12 rounded-3xl border border-white/10 bg-[#1c1917] p-8 sm:p-14 lg:grid-cols-2">
                <Reveal>
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-orange-500">
                        Before Archivio
                    </p>
                    <h2 className="font-serif text-3xl text-stone-50 sm:text-4xl">
                        Your inspiration, scattered everywhere.
                    </h2>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-400">
                        A screenshot folder with 400 unsorted images. Three
                        half abandoned Pinterest boards. A browser with forty tabs you
                        swore you'd get back to. Archivio is the one place all of it was
                        supposed to live in the first place.
                    </p>
                    <Link
                        to="/signup"
                        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-orange-500 hover:text-orange-400"
                    >
                        Start organizing
                    </Link>
                </Reveal>

                <Reveal delay={120}>
                    <div className="grid grid-cols-3 gap-3">

                        {[
                            "/images/Home/chaos1.jpg",
                            "/images/Home/chaos2.jpg",
                            "/images/Home/chaos3.jpg",
                            "/images/Home/chaos4.jpg",
                            "/images/Home/chaos5.jpg",
                            "/images/Home/chaos6.jpg",
                        ].map((src, i) => (
                            <div
                                key={src}
                                className="aspect-square overflow-hidden rounded-xl border border-white/10"
                                style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (2 + i)}deg)` }}
                            >
                                <img src={src} alt="" className="h-full w-full object-cover opacity-70" />
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}


function PillarCard({ title, body, icon: Icon, color }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-white/10">
            <div
                className="relative aspect-square w-full"
                style={{
                    background: `radial-gradient(circle at 32% 24%, ${color}33, transparent 62%), #0d0c0b`,
                }}
            >
                <div
                    className="pointer-events-none absolute inset-6 rounded-lg border"
                    style={{ borderColor: `${color}33` }}
                />
                <div className="flex h-full w-full items-center justify-center">
                    <Icon
                        size={56}
                        strokeWidth={1.25}
                        style={{ color, filter: `drop-shadow(0 0 22px ${color}55)` }}
                    />
                </div>
            </div>

            <div className="bg-[#141210] px-6 py-7 text-center">
                <h3 className="font-serif italic lowercase text-2xl text-stone-50 mb-2">
                    {title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">{body}</p>
            </div>
        </div>
    );
}

const PILLARS = [
    {
        title: "Discovery",
        body: "Every building here is vetted by people who actually study architecture.",
        icon: Compass,
        color: "#E8734A",
    },
    {
        title: "Collections",
        body: "Save what stays with you, organized your way, not a platform's.",
        icon: FolderHeart,
        color: "#4C8A72",
    },
    {
        title: "Conversation",
        body: "Comments and critiques turn a photo into a real discussion.",
        icon: MessageCircle,
        color: "#D9B65B",
    },
];

function PillarsSection() {
    return (
        <section className=" px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="font-serif italic font-normal leading-[1.05] text-4xl sm:text-5xl lg:text-6xl text-stone-50">
                    Pillars Of <span className="text-orange-600">Archivio</span>
                </h2>
                <p className="mt-4 mb-16 lg:mb-20 text-sm sm:text-base text-stone-100">
                    The three ideas Archivio is built on
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
                    {PILLARS.map((pillar, i) => (
                        <PillarCard key={i} {...pillar} />
                    ))}
                </div>
            </div>
        </section>
    );
}
function Testimonial() {
    return (
        <section className="relative min-h-[75vh] w-full overflow-hidden bg-[#0a0908]">
            <style>{`
        @keyframes compassSweep {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .compass-arm {
          transform-origin: 250px 250px;
          animation: compassSweep 16s linear infinite;
        }
        @keyframes needleGlow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .needle-tip { animation: needleGlow 3s ease-in-out infinite; }
      `}</style>

            <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage:
                        "linear-gradient(#d9603a 1px, transparent 1px), linear-gradient(90deg, #d9603a 1px, transparent 1px)",
                    backgroundSize: "36px 36px",
                }}
            />
            <div
                className="absolute inset-0 opacity-[0.1]"
                style={{
                    backgroundImage:
                        "linear-gradient(#d9603a 1.5px, transparent 1.5px), linear-gradient(90deg, #d9603a 1.5px, transparent 1.5px)",
                    backgroundSize: "180px 180px",
                }}
            />

            <div className="absolute left-6 top-6 flex flex-col items-center text-orange-500/50 sm:left-10 sm:top-10">
                <svg width="22" height="22" viewBox="0 0 22 22">
                    <path d="M11 2 L14 11 L11 20 L8 11 Z" fill="currentColor" opacity="0.6" />
                </svg>
                <span className="mt-1 text-[10px] tracking-widest">N</span>
            </div>

            <div className="absolute bottom-6 right-6 w-52 border border-orange-500/25 bg-black/40 px-3 py-2.5 font-mono text-[10px] leading-relaxed text-orange-200/70 backdrop-blur-sm sm:bottom-10 sm:right-10">
                <div className="flex justify-between"><span>SHEET</span><span>COMMUNITY&ndash;01</span></div>
                <div className="flex justify-between"><span>STATUS</span><span className="text-orange-400">COMING SOON</span></div>
                <div className="flex justify-between"><span>SCALE</span><span>1 : 1</span></div>
                <div className="flex justify-between"><span>DRAWN BY</span><span>ARCHIVIO</span></div>
            </div>

            <div className="relative z-10 flex min-h-[75vh] items-center justify-center px-6">
                <svg viewBox="0 0 500 500" className="w-full max-w-[420px]">
                    <circle
                        cx="250" cy="250" r="160"
                        fill="none" stroke="#d9603a" strokeWidth="1.5" strokeDasharray="4 5" opacity="0.55"
                    />

                    <g className="compass-arm">
                        <line x1="250" y1="250" x2="250" y2="90" stroke="#d9603a" strokeWidth="1.5" />
                        <circle cx="250" cy="250" r="4" className="needle-tip" fill="#e8794f" />
                        <path d="M250 90 L246 100 L254 100 Z" fill="#e8794f" />
                        <circle cx="250" cy="130" r="5" fill="none" stroke="#d9603a" strokeWidth="1.5" />
                    </g>

                    <text x="250" y="228" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="34" fill="#f5f5f4" letterSpacing="2">
                        COMMUNITY
                    </text>
                    <text x="250" y="256" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="13" fill="#e8794f" letterSpacing="4">
                        COMING SOON
                    </text>

                    <g stroke="#d9603a" strokeWidth="1" opacity="0.6">
                        <line x1="140" y1="300" x2="360" y2="300" />
                        <line x1="140" y1="294" x2="140" y2="306" />
                        <line x1="360" y1="294" x2="360" y2="306" />
                    </g>
                    <text x="250" y="320" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fill="#d9603a" letterSpacing="1" opacity="0.75">
                        0 ROOMS BUILT &middot; &infin; POSSIBILITIES
                    </text>
                </svg>
            </div>
        </section>
    );
}

function ReceiptsGrid() {
    const quotes = [
        { name: "Daniel Reyes", role: "Architect, Mexico City", text: "The collections are the first thing I check every morning. Genuinely." },
        { name: "Priya Nair", role: "Student, Bangalore", text: "Found my thesis advisor's old professor answering questions in Community. Wild." },
        { name: "Tomasz Kowal", role: "Architect, Warsaw", text: "Finally a place that isn't trying to sell me a course." },
        { name: "Jasmine Lee", role: "Student, Singapore", text: "The material studies alone were worth signing up for." },
        { name: "Kwame Asante", role: "Architect, Accra", text: "I've referred three colleagues this month." },
        { name: "Lauren Feeney", role: "Enthusiast, Austin", text: "It's the only app I open before I've had coffee." },
    ];

    return (
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
            <Reveal>
                <h2 className="mb-10 text-center font-serif text-3xl text-stone-50">
                    People seem to like it here.
                </h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {quotes.map((q, i) => (
                    <Reveal key={q.name} delay={(i % 3) * 80}>
                        <div className="h-full rounded-2xl border border-white/10 bg-[#1c1917] p-5">
                            <p className="text-sm leading-relaxed text-stone-300">&ldquo;{q.text}&rdquo;</p>
                            <p className="mt-4 text-xs text-stone-500">
                                <span className="text-stone-300">{q.name}</span> &middot; {q.role}
                            </p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}

function Newsletter() {
    const [email, setEmail] = useState("");
    return (
        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#1c1917] px-8 py-14 sm:px-14">
                <svg className="pointer-events-none absolute -right-10 bottom-0 h-56 w-56 text-white/5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.6">
                    <path d="M3 21V9l4-3v15" />
                    <path d="M11 21V6l4-3v18" />
                    <path d="M19 21V11l2-1v11" />
                </svg>
                <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                    <div>
                        <h2 className="font-serif text-3xl text-stone-50">
                            Stay <span className="text-orange-600">inspired.</span>
                            <br />
                            Join our community.
                        </h2>
                        <p className="mt-3 max-w-sm text-sm text-stone-400">
                            Get the latest projects, articles, and design insights straight
                            to your inbox.
                        </p>
                    </div>
                    <form onSubmit={(e) => e.preventDefault()} className="flex w-full max-w-md gap-3">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email address"
                            className="w-full rounded-full border border-stone-700 bg-transparent px-5 py-3 text-sm text-stone-100 placeholder-stone-500 outline-none transition focus:border-orange-600"
                        />
                        <button type="submit" className="shrink-0 rounded-full bg-orange-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-orange-600">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}


export default function Home() {
    return (
        <div className="archivio-page min-h-screen w-full bg-[#100e0c] text-stone-100">
            <style>{`
        .archivio-page { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .archivio-page .font-serif { font-family: 'Fraunces', ui-serif, Georgia, serif; }

        html, body, .archivio-page {
          scrollbar-width: thin;
          scrollbar-color: #b45526 #1c1917;
        }
        ::-webkit-scrollbar { width: 11px; }
        ::-webkit-scrollbar-track { background: #100e0c; }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #d9603a, #9a4520);
          border-radius: 999px;
          border: 3px solid #100e0c;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #e8794f, #b45526);
        }

        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>

            <Navbar active="Home" />

            <Hero />
            <TrustStrip />
            <StatsRow />
            <FeatureBento />
            <SpotlightCarousel />
            <PillarsSection />
            <ChaosSection />
            <Testimonial />
            <ReceiptsGrid />
            <Newsletter />
            <Footer />
        </div>
    );
}