import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import AccessDeniedGate from "../components/AccessDeniedGate";
import { Link } from "react-router-dom"
import Footer from "../components/Footer";
import {
    ArrowRight,
    Play,
    MapPin,
    Ruler,
    Home as HomeIcon,
    CheckCircle2,
    Leaf,
    UserSearch,
    PenTool,
    Hammer,
    Truck,
    X,
    User,
    Calendar,
} from "lucide-react";

function CountUp({ target, duration = 900 }) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        let start = null;
        let frame;
        const step = (ts) => {
            if (start === null) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            setValue(Math.round(progress * target));
            if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
    }, [target, duration]);

    return <span>{value}</span>;
}

const TICKER_WORDS = [
    "RESIDENTIAL", "COMMERCIAL", "PUBLIC", "COASTAL", "DESERT", "URBAN", "PAVILION", "TOWER", "RETREAT", "STUDIO",
];

function ProjectsHeader({ count }) {
    const title = "Projects";
    return (
        <div className="pt-14 sm:pt-20">
            <div className="mb-14 overflow-hidden border-y border-white/5 py-2.5">
                <div
                    className="flex w-max gap-8 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.3em] text-stone-600 [animation:tickerScroll_28s_linear_infinite]"
                >
                    {[...TICKER_WORDS, ...TICKER_WORDS, ...TICKER_WORDS].map((w, i) => (
                        <span key={i} className="flex items-center gap-8">
                            {w} <span className="text-orange-600/40">&middot;</span>
                        </span>
                    ))}
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-6 pb-16">
                <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.6fr_1fr]">
                    <div>
                        <p
                            className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-orange-500"
                            style={{ animation: "headerRise 0.5s ease-out both" }}
                        >
                            Our Work
                        </p>
                        <h1 className="font-serif text-4xl leading-none text-stone-50 sm:text-6xl lg:text-[6.5rem]">
                            {title.split("").map((ch, i) => (
                                <span
                                    key={i}
                                    className="inline-block"
                                    style={{ animation: "charRise 0.55s ease-out both", animationDelay: `${i * 0.035}s` }}
                                >
                                    {ch === " " ? "\u00A0" : ch}
                                </span>
                            ))}
                        </h1>
                    </div>
                    <div
                        className="relative border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pb-1 lg:pl-6 lg:pt-0"
                        style={{ animation: "headerRise 0.6s ease-out 0.25s both" }}
                    >
                        <span className="absolute -top-[7px] left-1.5 h-3 w-3 animate-ping lg:-left-[7px] lg:top-1.5 rounded-full bg-orange-600/40" />
                        <span className="absolute -top-[7px] left-1.5 h-3 w-3 rounded-full bg-orange-600 lg:-left-[7px] lg:top-1.5" />
                        <p className="font-serif text-5xl text-stone-50">
                            <CountUp target={count} />
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-wide text-stone-500">
                            Projects completed to date
                        </p>
                    </div>
                </div>

                <p
                    className="mt-9 max-w-xl text-sm leading-relaxed text-stone-400"
                    style={{ animation: "headerRise 0.6s ease-out 0.15s both" }}
                >
                    Every project here started as a site visit and a set of constraints —
                    a budget, a climate, a family's list of contradictions. What follows
                    is how each one got resolved: in concrete, timber, glass, and a fair
                    amount of arguing over window placement. Scroll through the full
                    archive below, or narrow it by type.
                </p>
            </div>
        </div>
    );
}

function FilterBar({ active, setActive }) {
    const filters = ["All Projects", "Residential", "Commercial", "Public"];
    const activeIndex = filters.indexOf(active);
    const tabRefs = useRef([]);
    const [indicator, setIndicator] = useState({ left: 0, width: 0 });

    useEffect(() => {
        const el = tabRefs.current[activeIndex];
        if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    }, [activeIndex, filters.length]);

    return (
        <div className="relative mb-10 overflow-x-auto border-b border-white/10">
            <div className="relative flex w-max min-w-full">
                <div
                    className="absolute bottom-[-1px] h-[1px] bg-orange-600 transition-all duration-300 ease-out"
                    style={{ left: indicator.left, width: indicator.width }}
                />
                {filters.map((f, i) => (
                    <button
                        key={f}
                        ref={(el) => (tabRefs.current[i] = el)}
                        onClick={() => setActive(f)}
                        className={`whitespace-nowrap px-5 py-3 text-center text-xs font-medium uppercase tracking-wide transition-colors ${active === f ? "text-orange-500" : "text-stone-500 hover:text-stone-300"
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>
        </div>
    );
}


function ProjectRow({ project, onOpen, reverse, video, index }) {
    const stats = [
        { icon: Ruler, label: "Area", value: project.area },
        { icon: HomeIcon, label: "Typology", value: project.typology },
        { icon: CheckCircle2, label: "Status", value: project.status },
    ];

    return (
        <div
            className={`relative grid grid-cols-1 items-center gap-8 overflow-hidden border-b border-white/5 py-14 first:pt-0 lg:grid-cols-2 lg:gap-14 ${reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
        >
            <span
                className={`pointer-events-none absolute top-0 select-none font-serif text-[110px] leading-none text-white/[0.025] sm:text-[160px] lg:text-[220px] ${reverse ? "right-0" : "left-0"
                    }`}
            >
                {String(index + 1).padStart(2, "0")}
            </span>

            {/* Image */}
            <div className="relative">
                <button
                    onClick={() => onOpen(project)}
                    className="group relative block h-72 w-full overflow-hidden rounded-2xl border border-white/10 sm:h-96"
                >
                    <img
                        src={project.image || `https://picsum.photos/seed/${project.seed}/900/700`}
                        alt={project.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    {video && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 text-white backdrop-blur-sm transition group-hover:scale-110">
                                <Play size={16} className="ml-0.5" fill="currentColor" />
                            </span>
                        </div>
                    )}
                </button>
                <p className="mt-2.5 flex items-center justify-between text-[11px] text-stone-600">
                    <span>Fig. {String(index + 1).padStart(2, "0")} &mdash; {project.title}</span>
                    <span>{project.year}</span>
                </p>
            </div>

            <div className="relative">
                <p className="mb-2 flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-wide text-orange-500">
                    <span className="text-stone-600">{String(index + 1).padStart(2, "0")}</span>
                    {project.category}
                </p>
                <h3 className="font-serif text-3xl text-stone-50 sm:text-4xl">{project.title}</h3>
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-stone-500">
                    <MapPin size={12} /> {project.location} &middot; {project.year}
                </p>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-stone-400">
                    {project.summary}
                </p>

                {project.detail && (
                    <p className="mt-3 max-w-lg text-xs italic leading-relaxed text-stone-500">
                        {project.detail}
                    </p>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                    {[project.category, project.sustainability, project.architect]
                        .filter(Boolean)
                        .map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full border border-stone-700 px-3 py-1 text-[11px] text-stone-400"
                            >
                                {tag}
                            </span>
                        ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                    {stats.map(({ icon: Icon, label, value }) => (
                        <span key={label} className="flex items-center gap-1.5 text-xs text-stone-500">
                            <Icon size={12} className="text-orange-500" /> {value}
                        </span>
                    ))}
                </div>

                <button
                    onClick={() => onOpen(project)}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-orange-500 hover:text-orange-400"
                >
                    View Project <ArrowRight size={14} />
                </button>
            </div>
        </div>
    );
}

function PullQuote() {
    return (
        <div className="relative overflow-hidden border-b border-white/5 py-16 text-center">
            <span className="font-serif text-6xl leading-none text-orange-600/20">&ldquo;</span>
            <p className="mx-auto -mt-4 max-w-xl font-serif text-2xl leading-snug text-stone-100 sm:text-3xl">
                Great architecture is a dialogue between people and place.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-stone-500">
                &mdash; Tadao Ando
            </p>
        </div>
    );
}

function ProcessSection() {
    const steps = [
        { n: "01", icon: UserSearch, title: "Discover", desc: "Understanding your vision and goals." },
        { n: "02", icon: PenTool, title: "Design", desc: "Crafting thoughtful and intentional solutions." },
        { n: "03", icon: Hammer, title: "Develop", desc: "Refining every detail with precision and care." },
        { n: "04", icon: Truck, title: "Deliver", desc: "Bringing spaces to life with excellence." },
    ];
    return (
        <div className="mb-6 rounded-2xl border border-white/10 bg-[#1c1917] p-8 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_2fr]">
                <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-orange-500">
                        Our Process
                    </p>
                    <h2 className="font-serif text-3xl text-stone-50">From concept to completion</h2>
                    <p className="mt-3 text-sm leading-relaxed text-stone-400">
                        A thoughtful, collaborative process that turns ideas into
                        timeless spaces.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                    {steps.map(({ n, icon: Icon, title, desc }) => (
                        <div key={n}>
                            <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-orange-700/40 text-orange-500">
                                <Icon size={17} />
                            </span>
                            <p className="mb-1 text-xs text-stone-600">{n}</p>
                            <p className="text-sm font-medium text-stone-100">{title}</p>
                            <p className="mt-1 text-xs leading-relaxed text-stone-500">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const PROJECTS = {
    cliffside: {
        title: "Cliffside Retreat",
        location: "Big Sur, California",
        year: "2024",
        category: "Residential",
        seed: "proj-cliffside",
        image: "/images/Projects/Cliffside-Retreat.jpg",
        summary:
            "A serene coastal retreat that harmonizes with its surroundings, blending raw materials with thoughtful craftsmanship.",
        description:
            "Cliffside Retreat sits on a narrow shelf of land overlooking the Pacific, designed to feel like an extension of the rock beneath it rather than an object placed upon it. Board-formed concrete walls hold the heat of the day long into the evening, while a cantilevered glass volume opens the main living space entirely to the horizon. The brief was simple: disappear into the landscape without disappearing from it. Every material raw concrete, weathered cedar, unpolished stone was chosen to age visibly, so the house continues to change with the coastline around it long after construction ends.",
        architect: "Studio ARQ",
        area: "4,850 sq ft",
        typology: "Residential",
        status: "Completed",
        sustainability: "LEED Gold",
        gallery: ["proj-cliffside-2", "proj-cliffside-3", "proj-cliffside-4"],
        detail:
            "Notable detail: the concrete was poured in three separate stages to control the curing color across each wall.",
    },
    wabi: {
        title: "Wabi House",
        location: "Kyoto, Japan",
        year: "2023",
        category: "Residential",
        seed: "proj-wabi",
        image: "/images/Projects/Wabi-House.jpg",
        summary: "A quiet study of imperfection, drawing directly from wabi-sabi principles.",
        description:
            "Wabi House was designed around restraint fewer materials, softer light, and a deliberate embrace of imperfection. Rammed-earth walls carry the subtle irregularities of their casting, left exposed rather than smoothed away, while shoji-inspired screens filter daylight into shifting patterns across the tatami floors throughout the day. The courtyard at its center isn't decorative; it's the organizing idea of the whole house, pulling every room toward a shared view of a single maple tree that changes with the seasons.",
        architect: "Kenji Nakamura Architects",
        area: "2,200 sq ft",
        typology: "Residential",
        status: "Completed",
        sustainability: "Passive Design",
        gallery: ["proj-wabi-2", "proj-wabi-3", "proj-wabi-4"],
        detail:
            "Notable detail: no two rammed-earth panels are the same color, each batch used soil from a slightly different depth on site.",
    },
    forest: {
        title: "Forest Pavilion",
        location: "Portland, Oregon",
        year: "2023",
        category: "Public",
        seed: "proj-forest",
        image: "/images/Projects/Forest-Pavilion.jpg",
        summary: "An open-air gathering pavilion built almost entirely from timber salvaged on-site.",
        description:
            "Forest Pavilion began with a constraint: build using only timber cleared from the site itself during construction, nothing trucked in. The result is a low, circular structure with a perforated roof that lets dappled light move across the floor throughout the day, mimicking the forest canopy it replaced. It's used for everything from community dinners to quiet reading there's no fixed program, just a covered, elevated clearing that invites people to decide what it's for.",
        architect: "Greenline Collective",
        area: "1,400 sq ft",
        typology: "Public / Community",
        status: "Completed",
        sustainability: "100% Site-Sourced Timber",
        gallery: ["proj-forest-2", "proj-forest-3", "proj-forest-4"],
        detail:
            "Notable detail: every beam is numbered and mapped back to the exact tree it came from, on a plaque inside the pavilion.",
    },
    aurea: {
        title: "Aurea Office",
        location: "Dubai, UAE",
        year: "2022",
        category: "Commercial",
        seed: "proj-aurea",
        image: "/images/Projects/Aurea-Office.jpg",
        summary: "A concrete-and-glass workspace designed around light control in an extreme climate.",
        description:
            "Aurea Office reimagines the desert curtain wall as a climate instrument rather than a liability. A perforated concrete brise-soleil wraps the glazed facade, casting shifting geometric shadows across the interior while cutting direct solar gain by nearly half. Inside, open-plan floors are broken up by concrete cores that double as thermal mass, keeping the building cooler through the hottest parts of the day without leaning entirely on mechanical cooling.",
        architect: "Studio ARQ",
        area: "38,000 sq ft",
        typology: "Commercial / Office",
        status: "Completed",
        sustainability: "Passive Solar Shading",
        gallery: ["proj-aurea-2", "proj-aurea-3", "proj-aurea-4"],
        detail:
            "Notable detail: the brise-soleil pattern was generated from the client's original 1980s logo, scaled up 400x.",
    },
    horizons: {
        title: "Horizons Museum",
        location: "Austin, Texas",
        year: "2022",
        category: "Public",
        seed: "proj-horizons",
        image: "/images/Projects/Horizons-Museum.jpg",
        summary: "A sunken gallery organized around a single oculus and a living tree at its center.",
        description:
            "Horizons Museum is built almost entirely below grade, with a single circular oculus at its heart opening onto a courtyard where an existing oak tree was preserved and built around rather than removed. Gallery spaces radiate outward from this central void, each lit primarily by reflected daylight bounced down through the oculus rather than artificial fixtures. The effect is a museum that changes character across the day and across seasons, tracking the tree and the sky rather than staying static.",
        architect: "Marchetti & Boone",
        area: "22,600 sq ft",
        typology: "Public / Cultural",
        status: "Completed",
        sustainability: "Daylight-First Design",
        gallery: ["proj-horizons-2", "proj-horizons-3", "proj-horizons-4"],
        detail:
            "Notable detail: the oculus opening was sized down twice during construction to protect the tree's root system.",
    },
    desert: {
        title: "Desert House",
        location: "Scottsdale, Arizona",
        year: "2021",
        category: "Residential",
        seed: "proj-desert",
        image: "/images/Projects/Desert-House.jpg",
        summary: "A low, horizontal home designed to frame the Sonoran desert rather than compete with it.",
        description:
            "Desert House sits low and long against the horizon, deliberately kept to a single story so nothing interrupts the view of the surrounding mountains. Deep roof overhangs shade a continuous run of glazing along the main living spaces, while the material palette board-formed concrete, rusted steel, native stone was chosen specifically to weather into the surrounding landscape rather than stand apart from it. At dusk, the house all but disappears into the desert it was built to frame.",
        architect: "Voss Desert Studio",
        area: "3,600 sq ft",
        typology: "Residential",
        status: "Completed",
        sustainability: "Passive Cooling",
        gallery: ["proj-desert-2", "proj-desert-3", "proj-desert-4"],
        detail:
            "Notable detail: the steel cladding was pre-rusted in a saltwater bath before installation to skip a decade of natural weathering.",
    },
    meridian: {
        title: "Meridian Spire",
        location: "Dubai, UAE",
        year: "2025",
        category: "Commercial",
        seed: "proj-meridian",
        image: "/images/Projects/Meridian-Spire.jpg",
        summary: "A supertall mixed-use tower designed around wind load rather than in spite of it.",
        description:
            "Meridian Spire tapers and twists as it rises, a form driven almost entirely by structural engineering rather than aesthetics each setback reduces vortex shedding at height, letting the tower stand taller with a lighter structural core than a straight-sided design would allow. The lower third houses retail and office space; the upper two-thirds are residential, each unit wrapped in a double-skin facade that manages solar gain in one of the hottest climates on earth. At just under 600 meters, it's currently the tallest building in Archivio's archive.",
        architect: "Halcyon & Voss",
        area: "3.2M sq ft",
        typology: "Mixed-Use / Supertall",
        status: "Completed",
        sustainability: "Double-Skin Facade",
        gallery: ["proj-meridian-2", "proj-meridian-3", "proj-meridian-4"],
        detail:
            "Notable detail: the tower's taper angle changed four times during structural review before wind-tunnel testing approved the final form.",
    },
    harborBridge: {
        title: "Harbor Crossing Pavilion",
        location: "Copenhagen, Denmark",
        year: "2023",
        category: "Public",
        seed: "proj-harbor",
        image: "/images/Projects/Harbor-Pavilion.jpg",
        summary: "A pedestrian bridge and gathering pavilion spanning the inner harbor.",
        description:
            "Harbor Crossing Pavilion began life as a simple pedestrian bridge brief and grew into something closer to a piece of public infrastructure that people actually want to linger on. A widened midpoint holds a covered pavilion used for markets and small performances, while the structure itself a shallow steel arch clad in reclaimed timber decking was engineered to flex slightly underfoot, a deliberate choice that makes the crossing feel more like a boardwalk than a piece of civil engineering.",
        architect: "Nordvik Studio",
        area: "1,800 sq ft (pavilion)",
        typology: "Public / Infrastructure",
        status: "Completed",
        sustainability: "Reclaimed Timber Cladding",
        gallery: ["proj-harbor-2", "proj-harbor-3", "proj-harbor-4"],
        detail:
            "Notable detail: the deck was deliberately over-specified to flex early models that didn't move underfoot tested as less trustworthy with focus groups.",
    },
    glassAtrium: {
        title: "Glass Atrium Exchange",
        location: "Singapore",
        year: "2024",
        category: "Commercial",
        seed: "proj-atrium",
        image: "/images/Projects/Glass-Atrium.jpg",
        summary: "A trading floor and office complex organized around a nine-story planted atrium.",
        description:
            "Glass Atrium Exchange stacks its office floors around a central nine-story void filled with terraced planting, designed to pull daylight and natural ventilation deep into the building's core rather than relying entirely on mechanical systems. The atrium doubles as informal meeting space staircases wrap its perimeter instead of hiding in a service core, encouraging people to move through the planting rather than around it.",
        architect: "Studio ARQ",
        area: "410,000 sq ft",
        typology: "Commercial / Office",
        status: "Completed",
        sustainability: "Biophilic Atrium Design",
        gallery: ["proj-atrium-2", "proj-atrium-3", "proj-atrium-4"],
        detail:
            "Notable detail: the atrium's planting was chosen entirely from species that thrive on reflected, not direct, sunlight.",
    },
};

function ProjectModal({ project, onClose }) {
    useEffect(() => {
        if (!project) return;
        document.body.style.overflow = "hidden";
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [project, onClose]);

    if (!project) return null;

    const stats = [
        { icon: Ruler, label: "Area", value: project.area },
        { icon: HomeIcon, label: "Typology", value: project.typology },
        { icon: CheckCircle2, label: "Status", value: project.status },
        { icon: Leaf, label: "Sustainability", value: project.sustainability },
    ];

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 py-8 sm:py-14"
            onClick={onClose}
        >
            <div
                className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#141210] shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
                style={{ animation: "projectModalIn 0.35s ease-out" }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
                >
                    <X size={18} />
                </button>

                <div className="h-64 w-full overflow-hidden sm:h-80">
                    <img
                        src={project.image || `https://picsum.photos/seed/${project.seed}/1200/700`}
                        alt={project.title}
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="max-h-[60vh] overflow-y-auto px-6 py-7 sm:px-10 sm:py-9">
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-orange-500">
                        {project.category}
                    </p>
                    <h2 className="font-serif text-3xl text-stone-50 sm:text-4xl">{project.title}</h2>

                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-stone-400">
                        <span className="flex items-center gap-1.5">
                            <MapPin size={12} /> {project.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Calendar size={12} /> {project.year}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <User size={12} /> {project.architect}
                        </span>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {stats.map(({ icon: Icon, label, value }) => (
                            <div key={label} className="rounded-xl border border-white/10 bg-[#1c1917] p-3.5">
                                <Icon size={14} className="mb-2 text-orange-500" />
                                <p className="text-[10px] text-stone-500">{label}</p>
                                <p className="text-xs text-stone-200">{value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-7">
                        <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
                            About this project
                        </p>
                        <p className="text-sm leading-relaxed text-stone-300">{project.description}</p>
                    </div>

                    {project.gallery?.length > 0 && (
                        <div className="mt-7 grid grid-cols-3 gap-3">
                            {project.gallery.map((seed) => (
                                <div key={seed} className="h-24 overflow-hidden rounded-xl border border-white/10 sm:h-32">
                                    <img
                                        src={project.image || `https://picsum.photos/seed/${seed}/400/400`}
                                        alt=""
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


function CtaBand() {
    return (
        <div className="relative mb-12 overflow-hidden rounded-2xl bg-gradient-to-r from-orange-800 to-orange-700 px-8 py-10 sm:px-12">
            <svg
                className="pointer-events-none absolute -right-6 -top-6 h-48 w-48 text-white/10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.6"
            >
                <path d="M3 21V9l4-3v15" />
                <path d="M11 21V6l4-3v18" />
                <path d="M19 21V11l2-1v11" />
            </svg>
            <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                <div>
                    <h2 className="font-serif text-3xl text-white">Have a project in mind?</h2>
                    <p className="mt-1.5 text-sm text-orange-100">
                        Let's create something timeless together.
                    </p>
                </div>
                <Link
                    to="/contact"
                    className="flex shrink-0 items-center gap-2 rounded-full bg-[#100e0c] px-6 py-3 text-sm font-medium text-white transition hover:bg-black"
                >
                    Start a Conversation <ArrowRight size={15} />
                </Link>
            </div>
        </div>
    );
}

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState("All Projects");
    const [selectedProject, setSelectedProject] = useState(null);

    const allProjects = Object.values(PROJECTS);
    const filteredProjects =
        activeFilter === "All Projects"
            ? allProjects
            : allProjects.filter((p) => p.category === activeFilter);

    return (
        <div className="archivio-page relative min-h-screen w-full bg-[#100e0c] text-stone-100">
            <style>{`
        .archivio-page { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .archivio-page .font-serif { font-family: 'Fraunces', ui-serif, Georgia, serif; }

        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        @keyframes headerRise {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes charRise {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes projectModalIn {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

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


            <Navbar active="Projects" />


            <AccessDeniedGate>
                <ProjectsHeader count={allProjects.length} />

                <div className="mx-auto max-w-5xl px-6 pb-20 sm:px-8">
                    <FilterBar active={activeFilter} setActive={setActiveFilter} />

                    <div>
                        {filteredProjects.map((project, i) => (
                            <React.Fragment key={project.title}>
                                <ProjectRow
                                    project={project}
                                    onOpen={setSelectedProject}
                                    reverse={i % 2 === 1}
                                    video={project.title === "Forest Pavilion"}
                                    index={i}
                                />
                                {i === 2 && <PullQuote />}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="mt-20">
                        <ProcessSection />
                        <CtaBand />
                    </div>
                </div>
            </AccessDeniedGate>

            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            <Footer />
        </div>
    );
}