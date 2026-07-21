import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import AuthGate from "../components/AuthGate";
import {
    ArrowRight,
    ArrowLeft,
    LayoutGrid,
    FolderHeart,
    Home as HomeIcon,
    Sofa,
    Trees,
    Layers,
    Grid2x2,
    Building2,
    Briefcase,
    ShoppingBag,
    BedDouble,
    Landmark,
    BookOpen,
    Tent,
    Hammer,
    Recycle,
    Map,
    Armchair,
    Lightbulb,
    TreePine,
    Minus,
    Waves,
    Users,
} from "lucide-react";
import Footer from "../components/Footer";

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

const PRIMARY = [
    {
        label: "Projects",
        to: "/projects",
        desc: "Every completed project in the Archivio archive, from single-family homes to supertall towers.",
        seed: "explore-projects",
        image: "/images/Explore/Projects.jpg",
        icon: LayoutGrid,
    },
    {
        label: "Collections",
        to: "/collections",
        desc: "Themes and ideas curated by our team, from Concrete Poetry to Desert Modern.",
        seed: "explore-collections",
        image: "/images/Explore/Collections.jpg",
        icon: FolderHeart,
    },
    {
        label: "Journal",
        to: "/journal",
        desc: "Read our latest articles on architecture, design, and culture.",
        seed: "explore-journal",
        image: "/images/Explore/Articles.jpg",
        icon: BookOpen,
    },
    {
        label: "Community",
        to: "/community",
        desc: "Connect with other members of the Archivio community.",
        seed: "explore-community",
        image: "/images/Explore/Community.jpg",
        icon: Users,
    },

];


const CATEGORIES = [
    { label: "Houses", icon: HomeIcon },
    { label: "Interiors", icon: Sofa },
    { label: "Landscapes", icon: Trees },
    { label: "Materials", icon: Layers },
    { label: "Concepts", icon: Grid2x2 },
];

const CATEGORY_META = {
    houses: {
        label: "Houses", icon: HomeIcon, accent: "orange",
        tagline: "Where the archive started, and where most people start too.",
        note: "If you only explore one category, make it this one it's the widest cross-section of what we cover.",
    },
    interiors: {
        label: "Interiors", icon: Sofa, accent: "amber",
        tagline: "Rooms, light, and the small decisions that make a space feel considered.",
        note: "Less about furniture shopping, more about why a room feels the way it feels.",
    },
    landscapes: {
        label: "Landscapes", icon: Trees, accent: "emerald",
        tagline: "Architecture and its surroundings, treated as one design problem.",
        note: "Courtyards, gardens, and the buildings that were designed around a tree rather than in spite of one.",
    },
    materials: {
        label: "Materials", icon: Layers, accent: "stone",
        tagline: "Concrete, timber, stone, and steel — studied up close.",
        note: "The most technical category here, and the one our team argues about most.",
    },
    concepts: {
        label: "Concepts", icon: Grid2x2, accent: "indigo",
        tagline: "Ideas before they became buildings.",
        note: "Sketches, diagrams, and the early thinking most finished projects hide.",
    },

};

const ACCENT_STYLES = {
    orange: { text: "text-orange-500", bg: "bg-orange-700", ring: "border-orange-600/40", glow: "bg-orange-600" },
    amber: { text: "text-amber-500", bg: "bg-amber-700", ring: "border-amber-600/40", glow: "bg-amber-600" },
    emerald: { text: "text-emerald-500", bg: "bg-emerald-700", ring: "border-emerald-600/40", glow: "bg-emerald-600" },
    stone: { text: "text-stone-400", bg: "bg-stone-600", ring: "border-stone-500/40", glow: "bg-stone-500" },
    indigo: { text: "text-indigo-400", bg: "bg-indigo-700", ring: "border-indigo-600/40", glow: "bg-indigo-600" },
    rose: { text: "text-rose-500", bg: "bg-rose-700", ring: "border-rose-600/40", glow: "bg-rose-600" },
    sky: { text: "text-sky-500", bg: "bg-sky-700", ring: "border-sky-600/40", glow: "bg-sky-600" },
    yellow: { text: "text-yellow-500", bg: "bg-yellow-700", ring: "border-yellow-600/40", glow: "bg-yellow-600" },
    red: { text: "text-red-500", bg: "bg-red-800", ring: "border-red-700/40", glow: "bg-red-700" },
    violet: { text: "text-violet-500", bg: "bg-violet-700", ring: "border-violet-600/40", glow: "bg-violet-600" },
    teal: { text: "text-teal-500", bg: "bg-teal-700", ring: "border-teal-600/40", glow: "bg-teal-600" },
    lime: { text: "text-lime-500", bg: "bg-lime-700", ring: "border-lime-600/40", glow: "bg-lime-600" },
};

function CategoryDetail({ slug, onBack }) {
    const meta = CATEGORY_META[slug];
    const style = ACCENT_STYLES[meta?.accent || "orange"];
    const Icon = meta?.icon || LayoutGrid;

    const HOUSE_IMAGES = [
        "/images/Categories/Houses/Category-house1.jpg",
        "/images/Categories/Houses/Category-house2.jpg",
        "/images/Categories/Houses/Category-house3.jpg",
        "/images/Categories/Houses/Category-house4.jpg",
        "/images/Categories/Houses/Category-house5.jpg",
        "/images/Categories/Houses/Category-house6.jpg",
        "/images/Categories/Houses/Category-house7.jpg",
        "/images/Categories/Houses/Category-house8.jpg",
    ];
    const INTERIOR_IMAGES = [
        "/images/Categories/Interiors/Category-interior1.jpg",
        "/images/Categories/Interiors/Category-interior2.jpg",
        "/images/Categories/Interiors/Category-interior3.jpg",
        "/images/Categories/Interiors/Category-interior4.jpg",
        "/images/Categories/Interiors/Category-interior5.jpg",
        "/images/Categories/Interiors/Category-interior6.jpg",
        "/images/Categories/Interiors/Category-interior7.jpg",
        "/images/Categories/Interiors/Category-interior8.jpg",
    ];
    const LANDSCAPE_IMAGES = [
        "/images/Categories/Landscapes/Category-landscape1.jpg",
        "/images/Categories/Landscapes/Category-landscape2.jpg",
        "/images/Categories/Landscapes/Category-landscape3.jpg",
        "/images/Categories/Landscapes/Category-landscape4.jpg",
        "/images/Categories/Landscapes/Category-landscape5.jpg",
        "/images/Categories/Landscapes/Category-landscape6.jpg",
        "/images/Categories/Landscapes/Category-landscape7.jpg",
        "/images/Categories/Landscapes/Category-landscape8.jpg",
    ];
    const MATERIAL_IMAGES = [
        "/images/Categories/Materials/Category-material1.jpg",
        "/images/Categories/Materials/Category-material2.jpg",
        "/images/Categories/Materials/Category-material3.jpg",
        "/images/Categories/Materials/Category-material4.jpg",
        "/images/Categories/Materials/Category-material5.jpg",
        "/images/Categories/Materials/Category-material6.jpg",
        "/images/Categories/Materials/Category-material7.jpg",
        "/images/Categories/Materials/Category-material8.jpg",
    ];
    const CONCEPT_IMAGES = [
        "/images/Categories/Concepts/Category-concept1.jpg",
        "/images/Categories/Concepts/Category-concept2.jpg",
        "/images/Categories/Concepts/Category-concept3.jpg",
        "/images/Categories/Concepts/Category-concept4.jpg",
        "/images/Categories/Concepts/Category-concept5.jpg",
        "/images/Categories/Concepts/Category-concept6.jpg",
        "/images/Categories/Concepts/Category-concept7.jpg",
        "/images/Categories/Concepts/Category-concept8.jpg",
    ];

    const results = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        image: slug === "houses" ? HOUSE_IMAGES[i]
            : slug === "interiors" ? INTERIOR_IMAGES[i]
                : slug === "landscapes" ? LANDSCAPE_IMAGES[i]
                    : slug === "materials" ? MATERIAL_IMAGES[i]
                        : slug === "concepts" ? CONCEPT_IMAGES[i]
                            : null,
        seed: `${slug}-result-${i}`,
        title: `${meta?.label || "Category"} study ${i + 1}`,
    }));

    const others = Object.entries(CATEGORY_META).filter(([key]) => key !== slug);

    if (!meta) {
        return (
            <div className="mx-auto max-w-lg px-6 py-24 text-center">
                <p className="text-sm text-stone-500">We couldn't find that category.</p>
                <button onClick={onBack} className="mt-4 text-sm font-medium text-orange-500 hover:text-orange-400">
                    Back to Explore
                </button>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
            <button
                onClick={onBack}
                className="mb-8 flex items-center gap-1.5 text-sm text-stone-500 transition hover:text-stone-300"
            >
                <ArrowLeft size={14} /> All categories
            </button>

            <div className="relative mb-12 overflow-hidden rounded-3xl border border-white/10 bg-[#1c1917] px-8 py-14 sm:px-14">
                <div className={`pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full ${style.glow} opacity-[0.15] blur-3xl`} />
                <div className={`pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full ${style.glow} opacity-10 blur-3xl`} />

                <span className={`relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-full ${style.bg} text-white`}>
                    <Icon size={20} />
                </span>
                <h1 className="relative z-10 font-serif text-4xl text-stone-50 sm:text-5xl">{meta.label}</h1>
                <p className={`relative z-10 mt-3 max-w-lg text-sm leading-relaxed ${style.text}`}>{meta.tagline}</p>
                <p className="relative z-10 mt-4 max-w-lg text-xs italic leading-relaxed text-stone-500">
                    {meta.note}
                </p>
            </div>

            <div className="mb-4 flex items-center justify-between">
                <h2 className="font-serif text-2xl text-stone-50">In this category</h2>
                <span className="text-xs text-stone-500">{results.length} results</span>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {results.map((r) => (
                    <a
                        key={r.id}
                        href="#"
                        className={`group block overflow-hidden rounded-2xl border border-white/10 transition hover:${style.ring}`}
                    >
                        <div className="aspect-[4/3] overflow-hidden">
                            <img
                                src={r.image || `https://picsum.photos/seed/${r.seed}/400/300`}
                                alt={r.title}
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = `https://picsum.photos/seed/${r.seed}/400/300`;
                                }}
                                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                            />
                        </div>
                        <div className="p-3">
                            <p className="truncate text-xs text-stone-300">{r.title}</p>
                        </div>
                    </a>
                ))}
            </div>

            <div className="mt-14 border-t border-white/5 pt-8">
                <p className="mb-4 text-xs uppercase tracking-wide text-stone-500">Other categories</p>
                <div className="flex flex-wrap gap-2">
                    {others.slice(0, 8).map(([key, m]) => (
                        <Link
                            key={key}
                            to={`/explore?category=${key}`}
                            className="rounded-full border border-stone-700 px-3.5 py-1.5 text-xs text-stone-400 transition hover:border-stone-500 hover:text-stone-200"
                        >
                            {m.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Explore() {
    const [searchParams, setSearchParams] = useSearchParams();
    const categorySlug = searchParams.get("category");

    return (
        <div className="archivio-page relative min-h-screen w-full bg-[#100e0c] text-stone-100">
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
      `}</style>

            <Navbar active="Explore" />

            <AuthGate
                title="Sign in to explore Archivio"
                subtitle="Create a free account or log in to browse everything Archivio has to offer."
            >
                {categorySlug ? (
                    <CategoryDetail slug={categorySlug} onBack={() => setSearchParams({})} />
                ) : (
                    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
                        <Reveal>
                            <div className="mb-14 text-center">
                                <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-orange-500">
                                    Start Here
                                </p>
                                <h1 className="font-serif text-5xl text-stone-50 sm:text-6xl">Explore Archivio</h1>
                                <p className="mx-auto mt-4 max-w-lg text-sm text-stone-400">
                                    Two ways in: browse everything we've built, or dive into a
                                    theme someone else has already curated for you.
                                </p>
                            </div>

                            <div className="mb-16 grid grid-cols-1 gap-5 sm:grid-cols-2">
                                {PRIMARY.map(({ label, to, desc, seed, image, icon: Icon }) => (
                                    <Link
                                        key={label}
                                        to={to}
                                        className="group relative block h-72 overflow-hidden rounded-3xl border border-white/10"
                                    >
                                        <img
                                            src={image || `https://picsum.photos/seed/${seed}/900/700`}
                                            alt={label}
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = `https://picsum.photos/seed/${seed}/900/700`;
                                            }}
                                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                        <div className="absolute inset-x-0 bottom-0 p-7">
                                            <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-orange-700/90 text-white">
                                                <Icon size={16} />
                                            </span>
                                            <h2 className="font-serif text-3xl text-stone-50">{label}</h2>
                                            <p className="mt-1.5 max-w-sm text-sm text-stone-300">{desc}</p>
                                            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-orange-500">
                                                Browse {label} <ArrowRight size={14} />
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </Reveal>

                        <div>
                            <Reveal>
                                <h2 className="mb-1 font-serif text-2xl text-stone-50">Or jump straight to a category</h2>
                                <p className="mb-6 text-sm text-stone-500">{CATEGORIES.length} ways to narrow things down.</p>
                                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
                                    {CATEGORIES.map(({ label, icon: Icon }) => (
                                        <Link
                                            key={label}
                                            to={`/explore?category=${label.toLowerCase().replace(/\s+/g, "-")}`}
                                            className="group flex items-center gap-3 rounded-xl border border-white/10 bg-[#1c1917] px-4 py-3.5 transition hover:border-orange-600/50"
                                        >
                                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-700/15 text-orange-500 transition group-hover:bg-orange-700 group-hover:text-white">
                                                <Icon size={14} />
                                            </span>
                                            <span className="text-sm text-stone-200">{label}</span>
                                        </Link>
                                    ))}
                                </div>
                            </Reveal>
                        </div>
                    </div>
                )}
            </AuthGate>
            <Footer />
        </div>
    );
}