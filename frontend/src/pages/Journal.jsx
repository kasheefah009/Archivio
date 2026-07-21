import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AccessDeniedGate from "../components/AccessDeniedGate";
import Footer from "../components/Footer";
import {
    ArrowRight,
    ArrowLeft,
    X,
    Clock,
    Calendar,
    Mail,
    ChevronDown,
    LayoutGrid,
    List,
    Compass,
    Leaf,
    Layers as LayersIcon,
    PenTool,
    Users,
    Newspaper,
    ImageOff,
} from "lucide-react";

const TOPICS = {
    Design: { bg: "bg-orange-700", text: "text-orange-400", icon: PenTool },
    Sustainability: { bg: "bg-emerald-700", text: "text-emerald-400", icon: Leaf },
    Materials: { bg: "bg-amber-700", text: "text-amber-400", icon: LayersIcon },
    Practice: { bg: "bg-sky-700", text: "text-sky-400", icon: Compass },
    Culture: { bg: "bg-rose-700", text: "text-rose-400", icon: Users },
    News: { bg: "bg-stone-600", text: "text-stone-400", icon: Newspaper },
};

function BrickHero({ onSelectTopic }) {
    const [dropped, setDropped] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setDropped(true), 150);
        return () => clearTimeout(t);
    }, []);

    const bricks = [
        { label: "Design", rotate: -6, x: "4%", shape: "triangle", blurb: "Form, light, and how rooms feel." },
        { label: "Materials", rotate: 4, x: "21%", shape: "circle", blurb: "Concrete, timber, stone, and steel." },
        { label: "Sustainability", rotate: -3, x: "38%", shape: "diamond", blurb: "Building for the long term." },
        { label: "Practice", rotate: 5, x: "55%", shape: "triangle", blurb: "How studios actually work." },
        { label: "Culture", rotate: -5, x: "72%", shape: "circle", blurb: "Heritage, context, community." },
        { label: "News", rotate: 3, x: "89%", shape: "diamond", blurb: "What's happening right now." },
    ];

    const Shape = ({ shape }) => {
        if (shape === "triangle") {
            return <div className="absolute bottom-0 left-1/2 h-24 w-32 -translate-x-1/2 bg-black/15" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />;
        }
        if (shape === "circle") {
            return <div className="absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-black/15" />;
        }
        return <div className="absolute bottom-2 left-1/2 h-20 w-20 -translate-x-1/2 rotate-45 bg-black/15" />;
    };

    return (
        <div className="pt-14 sm:pt-20">
            <div className="mx-auto max-w-3xl px-6 pb-16 text-center">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-orange-500">
                    Archivio Journal
                </p>
                <h1 className="font-serif text-4xl leading-tight text-stone-50 sm:text-6xl">
                    Ideas that shape spaces.
                </h1>
                <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-stone-400">
                    Essays from Archivio, and the wider conversation happening across
                    architecture right now pick a topic below, or scroll past to see
                    everything.
                </p>
            </div>

            <div className="mx-auto mb-20 hidden h-72 max-w-5xl px-6 sm:relative sm:block">
                {bricks.map((b, i) => {
                    const style = TOPICS[b.label];
                    const Icon = style.icon;
                    return (
                        <button
                            key={b.label}
                            onClick={() => onSelectTopic(b.label)}
                            className={`absolute flex h-64 w-44 -translate-x-1/2 flex-col justify-between overflow-hidden rounded-2xl ${style.bg} p-4 text-left shadow-xl shadow-black/40 transition-transform hover:-translate-y-1.5`}
                            style={{
                                left: b.x,
                                top: dropped ? 0 : -320,
                                transform: `translateX(-50%) rotate(${dropped ? b.rotate : b.rotate - 20}deg)`,
                                opacity: dropped ? 1 : 0,
                                transition: `top 0.85s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 100}ms, transform 0.85s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 100}ms, opacity 0.3s ease-out ${i * 100}ms`,
                            }}
                        >
                            <Shape shape={b.shape} />

                            <p className="relative z-10 text-xs leading-snug text-white/85">{b.blurb}</p>

                            <span className="relative z-10 flex w-fit items-center gap-2 rounded-full bg-black/30 px-3 py-2 backdrop-blur-sm">
                                <Icon size={13} className="text-white" />
                                <span className="text-xs font-medium text-white">{b.label}</span>
                            </span>
                        </button>
                    );
                })}
            </div>

            <div className="mx-auto mb-14 grid max-w-md grid-cols-2 gap-3 px-6 sm:hidden">
                {bricks.map((b, i) => {
                    const style = TOPICS[b.label];
                    const Icon = style.icon;
                    return (
                        <button
                            key={b.label}
                            onClick={() => onSelectTopic(b.label)}
                            className={`relative flex h-36 flex-col justify-between overflow-hidden rounded-2xl ${style.bg} p-3.5 text-left transition-all duration-500 ease-out`}
                            style={{
                                opacity: dropped ? 1 : 0,
                                transform: dropped ? "translateY(0)" : "translateY(-24px)",
                                transitionDelay: `${i * 80}ms`,
                            }}
                        >
                            <Shape shape={b.shape} />
                            <span className="relative z-10 flex w-fit items-center gap-1.5 rounded-full bg-black/30 px-2.5 py-1.5">
                                <Icon size={12} className="text-white" />
                                <span className="text-[11px] font-medium text-white">{b.label}</span>
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

const ARTICLES = [
    {
        id: "natural-materials", tag: "Materials", source: "Archivio Studio",
        title: "The Beauty of Natural Materials in Modern Architecture",
        date: "May 20, 2024", read: "6 min read",
        image: "/images/Journals/Journal1.jpg",
        excerpt: "Why raw timber, stone, and clay are making a comeback and what it costs to build with them honestly.",
        body: ["For most of the twentieth century, architecture chased smooth, uniform surfaces that hid where they came from. Natural materials have quietly pushed back, not out of nostalgia, but because they age in ways manufactured surfaces can't fake.",
            "Timber left unfinished silvers in the sun. Rammed earth walls hold the faint striations of each compacted layer.",
            "The tradeoff is real: natural materials are less forgiving and more expensive to source responsibly. But the result is a building that keeps developing character long after the ribbon-cutting."],
    },
    {
        id: "light-and-space", tag: "Design", source: "Archivio Studio",
        title: "How Light Shapes Our Experience of Space",
        date: "May 12, 2024", read: "5 min read",
        image: "/images/Journals/Journal3.jpg",
        excerpt: "Light isn't a finishing touch it's one of the earliest and most consequential decisions in any floor plan.",
        body: ["Most conversations about a building's design start with walls, then furniture, then color. Light usually arrives last. That ordering gets it backwards.",
            "The angle of a single window can decide whether a room feels like a retreat or a corridor.",
            "It's also, increasingly, a sustainability question. A well-lit room needs less artificial lighting and often less heating."],
    },
    {
        id: "low-carbon-cities", tag: "Sustainability", source: "Global Structures Weekly",
        title: "Why Low-Carbon Concrete Is Finally Going Mainstream",
        date: "May 15, 2024", read: "5 min read",
        image: "/images/Journals/Journal2.jpg",
        excerpt: "A wave of new concrete formulations is cutting embodied carbon by up to 40% — and major contractors are starting to specify it by default.",
        body: ["Concrete has been architecture's hardest sustainability problem for a decade — it's everywhere, and there's been no easy substitute at scale.",
            "Newer low-clinker and geopolymer formulations are changing that math, with several now certified for structural use in major markets.",
            "The bigger obstacle isn't the technology anymore. It's getting specification standards and insurers to catch up."],
    },
    {
        id: "material-honesty", tag: "Materials", source: "Archivio Studio",
        title: "Material Honesty: Letting Materials Speak",
        date: "May 5, 2024", read: "6 min read",
        image: "/images/Journals/Journal4.jpg",
        excerpt: "Why we choose natural, raw, and timeless materials that age beautifully instead of hiding behind finishes.",
        body: ["A material that's honest about what it is doesn't need constant maintenance to keep pretending otherwise.",
            "This isn't an aesthetic shortcut honest materials are often harder to detail correctly, since there's nowhere to hide a mistake.",
            "The payoff is a building that improves with age instead of just deteriorating toward its next renovation."],
    },
    {
        id: "adaptive-reuse-boom", tag: "Practice", source: "The Built Environment Review",
        title: "Adaptive Reuse Is Quietly Becoming the Default, Not the Exception",
        date: "May 2, 2024", read: "7 min read",
        image: "/images/Journals/Journal6.jpg",
        excerpt: "Rising material costs and stricter carbon regulation are pushing more firms toward renovation over demolition.",
        body: ["For years, adaptive reuse was treated as a niche specialty the thing you did with a landmark building, not a default strategy.",
            "That's shifting fast. Embodied-carbon regulations in several major cities now effectively penalize demolition on large commercial projects.",
            "Firms that built reuse expertise early are suddenly the ones with the fullest pipelines."],
    },
    {
        id: "concept-to-reality", tag: "Practice", source: "Archivio Studio",
        title: "Inside Our Process: From Concept to Reality",
        date: "Apr 20, 2024", read: "7 min read",
        image: "/images/Journals/Journal7.jpg",
        excerpt: "A look at our design methodology and how ideas evolve into meaningful, buildable spaces.",
        body: ["Every project starts the same unglamorous way: a site visit, a long list of constraints, and a client who usually wants three contradictory things at once.",
            "The real work of architecture happens in reconciling those contradictions long before a single rendering exists.",
            "By the time a project reaches construction drawings, most of the hardest decisions are already behind it."],
    },
    {
        id: "architecture-and-culture", tag: "Culture", source: "Archivio Studio",
        title: "Architecture and Culture: A Continuous Dialogue",
        date: "Apr 15, 2024", read: "5 min read",
        image: "/images/Journals/Journal9.jpg",
        excerpt: "How context, heritage, and community inform the way we design.",
        body: ["Buildings don't get to opt out of their surroundings. A courtyard house that works beautifully in Kyoto solves problems that don't exist in Lagos.",
            "The architects we admire most treat local context as a design constraint worth understanding deeply.",
            "That's a slower, harder way to work. It's also the only way buildings end up actually belonging where they're built."],
    },
    {
        id: "skyline-preservation-fight", tag: "News", source: "Urban Forum Daily",
        title: "The Fight Over What Counts as 'Historic' Is Heating Up",
        date: "Apr 18, 2024", read: "4 min read",
        image: "/images/Journals/Journal8.jpg",
        excerpt: "As cities densify, preservation boards are facing pressure to reconsider what actually deserves protected status.",
        body: ["Preservation law was largely written for buildings over a century old. Now boards are being asked to rule on structures from the 1980s.",
            "Developers argue rigid preservation rules are worsening housing shortages in already-dense cities.",
            "Preservationists counter that once a building's gone, the argument about whether it mattered is over."],
    },
    {
        id: "wabi-house-update", tag: "News", source: "Archivio Studio",
        title: "Project Update: Wabi House Takes Shape",
        date: "Apr 10, 2024", read: "3 min read",
        image: "/images/Journals/Journal10.jpg",
        excerpt: "Progress update on Wabi House as construction advances on site in Kyoto.",
        body: ["Rammed-earth walls are now complete on the ground floor, and the timber screen system arrives on site next month.",
            "The maple tree at the center of the courtyard survived the excavation phase without needing to be relocated.",
            "We'll share full photography once the interior finishes are in, likely early next quarter."],
    },
    {
        id: "ai-in-architecture", tag: "Practice", source: "Design Futures Quarterly",
        title: "What Architecture Firms Are Actually Using AI For",
        date: "Apr 5, 2024", read: "6 min read",
        image: "/images/Journals/AI.jpg",
        excerpt: "The real adoption is happening in code compliance checks and early-stage massing studies, not the parts people assume.",
        body: ["The public conversation about AI in architecture is dominated by image generation. Inside firms, it's a much smaller part of the story.",
            "Code compliance review a famously tedious, error-prone process is where several mid-size firms report the biggest time savings.",
            "Massing and daylight studies that used to take a junior architect a day now run in minutes."],
    },
    {
        id: "timeless-tranquility", tag: "Design", source: "Archivio Studio",
        title: "Timeless Homes That Define Tranquility",
        date: "May 5, 2024", read: "7 min read",
        image: "/images/Journals/Journal5.jpg",
        excerpt: "A look at the handful of design decisions that separate a house that photographs well from one that actually feels calm to live in.",
        body: ["Tranquility in a home is rarely about any single dramatic gesture it's closer to the absence of friction.",
            "The homes that hold up over decades share a few quiet habits: restrained material palettes, sightlines that connect rather than fragment rooms.",
            "None of this photographs as dramatically as a cantilevered roof. But it's the difference between a house that impresses and one that still feels right five years later."],
    },
    {
        id: "housing-density-debate", tag: "Culture", source: "Urban Forum Daily",
        title: "The Missing Middle: Why Mid-Density Housing Keeps Losing",
        date: "Mar 28, 2024", read: "5 min read",
        image: "/images/Journals/Journal12.jpg",
        excerpt: "Townhomes and small multi-unit buildings solve real problems so why do they keep getting zoned out?",
        body: ["'Missing middle' housing duplexes, triplexes, small walk-up buildings sits in an awkward political gap between single-family advocates and high-rise developers.",
            "It's often the most contextually appropriate density for existing neighborhoods, but zoning maps in most cities simply don't have a category for it.",
            "A handful of cities rewriting their codes in the last two years are being watched closely as test cases."],
    },
    {
        id: "mass-timber-rise", tag: "Materials", source: "Global Structures Weekly",
        title: "Mass Timber Is Finally Clearing Its Biggest Regulatory Hurdle",
        date: "Mar 22, 2024", read: "5 min read", image: null,
        excerpt: "Updated fire codes in several countries now permit timber high-rises well past the old height caps.",
        body: ["Mass timber has spent a decade proving itself technically capable of mid- and high-rise construction the holdup has always been fire code.",
            "Several major jurisdictions have now revised their codes based on multi-year burn testing, clearing timber towers up to 18 stories.",
            "Insurers are catching up more slowly than regulators, which remains the real bottleneck for most developers."],
    },
    {
        id: "office-to-residential", tag: "Practice", source: "The Built Environment Review",
        title: "Converting Empty Offices Into Housing Is Harder Than It Looks",
        date: "Mar 18, 2024", read: "6 min read", image: null,
        excerpt: "Floor plates built for offices rarely translate cleanly to livable apartments here's why so many conversions stall.",
        body: ["The math looks obvious from a distance: cities have empty office towers and a housing shortage, so convert one into the other.",
            "In practice, most office floor plates are too deep for good residential daylighting, and structural grids rarely align with apartment layouts.",
            "The conversions that do work tend to be older, narrower buildings not the glass towers everyone pictures first."],
    },
    {
        id: "courtyard-typology", tag: "Design", source: "Archivio Studio",
        title: "Why the Courtyard Keeps Coming Back",
        date: "Mar 14, 2024", read: "5 min read", image: null,
        excerpt: "An ancient typology solving a very modern problem: privacy without isolation.",
        body: ["The courtyard house predates almost every other residential typology still in common use and it's having a quiet resurgence on tight urban lots.",
            "Unlike a backyard, a courtyard is fully enclosed by the building itself, so every room can open onto outdoor space without sacrificing privacy.",
            "It changes how a house feels to move through rooms orient inward toward a shared center rather than outward toward a fence line."],
    },
    {
        id: "embodied-carbon-standard", tag: "Sustainability", source: "Design Futures Quarterly",
        title: "The New Embodied Carbon Standard Everyone's Scrambling to Meet",
        date: "Mar 10, 2024", read: "4 min read", image: null,
        excerpt: "A handful of cities have quietly made embodied carbon disclosure mandatory on large projects and more are following.",
        body: ["Operational carbon how much energy a building uses once occupied has dominated green building policy for years.",
            "Embodied carbon, the emissions from materials and construction itself, is catching up fast as the next regulatory target.",
            "Firms without an in-house carbon accounting process are increasingly losing bids to ones that do."],
    },
    {
        id: "concrete-poetry-notes", tag: "Materials", source: "Archivio Studio",
        title: "Notes on Concrete as a Finished Surface",
        date: "Mar 6, 2024", read: "5 min read", image: null,
        excerpt: "Board-formed, polished, or left raw — concrete is one of the most misunderstood materials in residential design.",
        body: ["Concrete has an image problem it doesn't entirely deserve associated with parking garages more than warmth or craft.",
            "Board-formed concrete carries the grain of the timber it was poured against, a texture no other material replicates.",
            "The skill isn't in choosing concrete. It's in choosing where to leave it alone."],
    },
    {
        id: "small-firms-big-projects", tag: "Practice", source: "Urban Forum Daily",
        title: "How Small Firms Are Winning Projects Twice Their Size",
        date: "Mar 2, 2024", read: "6 min read", image: null,
        excerpt: "A handful of five-person studios are landing civic commissions that used to go exclusively to the big names.",
        body: ["Procurement reform in several cities has quietly opened the door for smaller firms to bid on projects that once required a decade of prior civic work to even qualify for.",
            "The firms winning tend to lean hard into a specific expertise passive design, adaptive reuse rather than trying to compete as generalists.",
            "It's a meaningfully different path into large-scale work than the traditional 'grow the firm first' model."],
    },
];

function ArticleImage({ article, className }) {
    if (article.image) {
        return <img src={article.image} alt={article.title} className={className} />;
    }
    return (
        <div className={`flex items-center justify-center bg-[#141210] ${className}`}>
            <ImageOff size={20} className="text-stone-700" />
        </div>
    );
}

function ArticleCard({ article, onOpen, view }) {
    const style = TOPICS[article.tag] || TOPICS.News;

    if (view === "list") {
        return (
            <button
                onClick={() => onOpen(article)}
                className="flex w-full items-center gap-4 border-b border-white/5 py-5 text-left transition hover:bg-white/[0.02]"
            >
                <ArticleImage article={article} className="h-20 w-24 shrink-0 overflow-hidden rounded-xl object-cover sm:h-24 sm:w-32" />
                <div className="min-w-0 flex-1">
                    <span className={`mb-1.5 inline-block rounded-full ${style.bg} px-2.5 py-0.5 text-[10px] font-medium text-white`}>
                        {article.tag}
                    </span>
                    <p className="truncate text-sm font-medium text-stone-100 sm:text-base">{article.title}</p>
                    <p className="mt-1 text-xs text-stone-500">
                        {article.source} &middot; {article.date} &middot; {article.read}
                    </p>
                </div>
            </button>
        );
    }

    return (
        <button onClick={() => onOpen(article)} className="group flex h-full w-full flex-col text-left">
            <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10">
                <ArticleImage article={article} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <span className={`absolute left-3 top-3 rounded-full ${style.bg} px-2.5 py-1 text-[10px] font-medium text-white`}>
                    {article.tag}
                </span>
            </div>
            <p className="line-clamp-2 text-sm font-medium leading-snug text-stone-100">{article.title}</p>
            <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-stone-500">{article.excerpt}</p>
            <p className="mt-3 text-[11px] text-stone-600">
                {article.source} &middot; {article.date} &middot; {article.read}
            </p>
        </button>
    );
}

function ControlsBar({ topic, setTopic, sort, setSort, view, setView }) {
    return (
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-3">
                <div className="relative">
                    <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="appearance-none rounded-full border border-stone-700 bg-[#1c1917] py-2 pl-4 pr-9 text-xs text-stone-200 outline-none transition focus:border-orange-600"
                    >
                        <option value="All">Filter by Topic</option>
                        {Object.keys(TOPICS).map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                    <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-500" />
                </div>

                <div className="relative">
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="appearance-none rounded-full border border-stone-700 bg-[#1c1917] py-2 pl-4 pr-9 text-xs text-stone-200 outline-none transition focus:border-orange-600"
                    >
                        <option value="latest">Sort by: Latest</option>
                        <option value="oldest">Sort by: Oldest</option>
                    </select>
                    <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-500" />
                </div>
            </div>

            <div className="flex items-center gap-1 self-start rounded-full border border-stone-700 p-1 sm:self-auto">
                <button
                    onClick={() => setView("grid")}
                    aria-label="Grid view"
                    className={`flex h-7 w-7 items-center justify-center rounded-full transition ${view === "grid" ? "bg-orange-700 text-white" : "text-stone-500 hover:text-stone-300"
                        }`}
                >
                    <LayoutGrid size={13} />
                </button>
                <button
                    onClick={() => setView("list")}
                    aria-label="List view"
                    className={`flex h-7 w-7 items-center justify-center rounded-full transition ${view === "list" ? "bg-orange-700 text-white" : "text-stone-500 hover:text-stone-300"
                        }`}
                >
                    <List size={13} />
                </button>
            </div>
        </div>
    );
}

function Pagination({ page, setPage, totalPages }) {
    return (
        <div className="mt-12 flex items-center justify-center gap-2">
            <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Previous page"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-700 text-stone-400 transition hover:border-orange-600 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-30"
            >
                <ArrowLeft size={14} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-medium transition ${page === n ? "bg-orange-700 text-white" : "text-stone-400 hover:bg-white/5 hover:text-stone-200"
                        }`}
                >
                    {n}
                </button>
            ))}

            <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Next page"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-700 text-stone-400 transition hover:border-orange-600 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-30"
            >
                <ArrowRight size={14} />
            </button>
        </div>
    );
}

function StudioAndNewsletterBand({ studioArticle, onOpen }) {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    return (
        <section className="mx-auto max-w-6xl px-6 pb-24">
            <div className="grid grid-cols-1 gap-6 rounded-3xl border border-white/10 bg-[#1c1917] p-6 sm:p-8 lg:grid-cols-[1.1fr_1.4fr] lg:items-center">
                {studioArticle && (
                    <button
                        onClick={() => onOpen(studioArticle)}
                        className="group flex items-center gap-4 text-left"
                    >
                        <ArticleImage
                            article={studioArticle}
                            className="h-20 w-24 shrink-0 overflow-hidden rounded-xl object-cover transition duration-700 group-hover:scale-105 sm:h-24 sm:w-28"
                        />
                        <div className="min-w-0">
                            <p className="text-xs uppercase tracking-wide text-orange-500">From Our Studio</p>
                            <p className="mt-1 truncate text-sm font-medium leading-snug text-stone-100">
                                {studioArticle.title}
                            </p>
                        </div>
                    </button>
                )}

                <div className="flex flex-col gap-4 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
                    <div>
                        <p className="flex items-center gap-1.5 text-sm text-stone-200">
                            <Mail size={14} className="text-orange-500" /> New perspective
                        </p>
                        <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-stone-500">
                            One email, no noise, straight to your inbox.
                        </p>
                    </div>

                    {subscribed ? (
                        <p className="text-sm text-orange-400">You're on the list. Thank you.</p>
                    ) : (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (email.trim()) setSubscribed(true);
                            }}
                            className="flex w-full gap-2 sm:w-auto"
                        >
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@email.com"
                                className="w-full min-w-0 rounded-full border border-stone-700 bg-transparent px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 outline-none transition focus:border-orange-600 sm:w-56"
                            />
                            <button
                                type="submit"
                                className="shrink-0 rounded-full bg-orange-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600"
                            >
                                Subscribe
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}

function ArticleModal({ article, onClose }) {
    useEffect(() => {
        if (!article) return;
        document.body.style.overflow = "hidden";
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [article, onClose]);

    if (!article) return null;
    const style = TOPICS[article.tag] || TOPICS.News;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 py-8 sm:py-14" onClick={onClose}>
            <div className="absolute inset-0 bg-black/70 backdrop-blur-lg" />
            <div
                className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#141210] shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
                style={{ animation: "articleModalIn 0.35s ease-out" }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
                >
                    <X size={18} />
                </button>

                <ArticleImage article={article} className="h-56 w-full object-cover sm:h-72" />

                <div className="max-h-[60vh] overflow-y-auto px-6 py-7 sm:px-9 sm:py-8">
                    <span className={`mb-3 inline-block rounded-full ${style.bg} px-3 py-1 text-[11px] font-medium text-white`}>
                        {article.tag}
                    </span>
                    <h2 className="font-serif text-3xl leading-snug text-stone-50">{article.title}</h2>

                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-stone-500">
                        <span>{article.source}</span>
                        <span className="flex items-center gap-1.5"><Calendar size={12} /> {article.date}</span>
                        <span className="flex items-center gap-1.5"><Clock size={12} /> {article.read}</span>
                    </div>

                    <p className="mt-5 text-sm font-medium leading-relaxed text-stone-300">{article.excerpt}</p>

                    <div className="mt-5 space-y-4">
                        {article.body.map((para, i) => (
                            <p key={i} className="text-sm leading-relaxed text-stone-400">{para}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const PAGE_SIZE = 12;
const TOTAL_PAGES = 4;
export default function Journal() {
    const [topic, setTopic] = useState("All");
    const [sort, setSort] = useState("latest");
    const [view, setView] = useState("grid");
    const [page, setPage] = useState(1);
    const [selectedArticle, setSelectedArticle] = useState(null);

    useEffect(() => setPage(1), [topic, sort]);

    const filtered = (topic === "All" ? ARTICLES : ARTICLES.filter((a) => a.tag === topic))
        .slice()
        .sort((a, b) => {
            const diff = new Date(b.date) - new Date(a.date);
            return sort === "latest" ? diff : -diff;
        });

    const studioArticle = ARTICLES.find((a) => a.tag === "News" && a.source === "Archivio Studio") || ARTICLES[0];

    return (
        <div className="archivio-page relative min-h-screen w-full bg-[#100e0c] text-stone-100">
            <style>{`
        .archivio-page { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .archivio-page .font-serif { font-family: 'Fraunces', ui-serif, Georgia, serif; }
 
        @keyframes articleModalIn {
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

            <Navbar active="Journal" />
            <AccessDeniedGate>

                <BrickHero onSelectTopic={setTopic} />

                <div className="mx-auto max-w-7xl px-6 pb-16">
                    <ControlsBar topic={topic} setTopic={setTopic} sort={sort} setSort={setSort} view={view} setView={setView} />

                    {page > 1 ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-700 py-20 text-center">
                            <Newspaper size={22} className="mb-3 text-stone-700" />
                            <p className="text-sm text-stone-400">No more articles yet.</p>
                            <p className="mt-1 text-xs text-stone-600">Check back soon, we're adding new ones regularly.</p>
                            <button
                                onClick={() => setPage(1)}
                                className="mt-4 text-xs font-medium text-orange-500 hover:text-orange-400"
                            >
                                Back to page 1
                            </button>
                        </div>
                    ) : filtered.length === 0 ? (
                        <p className="py-16 text-center text-sm text-stone-500">
                            No articles under this topic yet.
                        </p>
                    ) : view === "list" ? (
                        <div>
                            {filtered.slice(0, PAGE_SIZE).map((a) => (
                                <ArticleCard key={a.id} article={a} onOpen={setSelectedArticle} view="list" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 items-stretch gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
                            {filtered.slice(0, PAGE_SIZE).map((a) => (
                                <ArticleCard key={a.id} article={a} onOpen={setSelectedArticle} view="grid" />
                            ))}
                        </div>
                    )}

                    <Pagination page={page} setPage={setPage} totalPages={TOTAL_PAGES} />
                </div>

                <StudioAndNewsletterBand studioArticle={studioArticle} onOpen={setSelectedArticle} />
            </AccessDeniedGate>
            <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
            <Footer />
        </div>
    );
}