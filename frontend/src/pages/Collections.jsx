import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowRight, X, Layers } from "lucide-react";
import AccessDeniedGate from "../components/AccessDeniedGate";


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
    "CONCRETE", "TIMBER", "GLASS", "LIGHT", "FORM", "TEXTURE", "STONE", "STEEL", "CRAFT", "SPACE",
];

function CollectionsHeader({ count }) {
    const title = "Collections";
    return (
        <div className="pt-14 sm:pt-20">
            <div className="mb-14 overflow-hidden border-y border-white/5 py-2.5">
                <div
                    className="flex w-max gap-8 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.3em] text-stone-600 [animation:tickerScroll_28s_linear_infinite]"
                >
                    {[...TICKER_WORDS, ...TICKER_WORDS, ...TICKER_WORDS].map((w, i) => (
                        <span key={i} className="flex items-center gap-8">
                            {w} <span className="text-orange-600/40">.</span>
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
                            Curated by Archivio
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
                            Collections curated so far
                        </p>
                    </div>
                </div>

                <p
                    className="mt-9 max-w-xl text-sm leading-relaxed text-stone-400"
                    style={{ animation: "headerRise 0.6s ease-out 0.15s both" }}
                >
                    Some ideas keep showing up across completely unrelated projects
                    a material, a mood, a way of handling light. When that happens
                    enough times, we pull it into its own collection. These aren't
                    algorithmic groupings; someone on our team actually sat down and
                    decided these belonged together.
                </p>
            </div>
        </div>
    );
}

function FilterBar({ active, setActive }) {
    const filters = ["All", "Residential", "Interiors", "Landscape", "Materials"];
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
                    className="absolute bottom-[-1px] h-[2px] bg-orange-600 transition-all duration-300 ease-out"
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

const COLLECTIONS = [
    {
        id: "minimal-living",
        note:
            "This is the collection we point people to first the clearest expression of \u201cless, but considered.\u201d",
        tags: ["Restraint", "Natural Light", "Open Plan"],
        name: "Minimal Living",
        count: "82 Projects",
        filterCategory: "Interiors",
        seed: "col-minimal",
        image: "/images/Collections/Minimal-Living.jpg",
        summary: "Simplicity, function, and beauty in perfect balance.",
        description:
            "Minimal Living gathers homes built around restraint fewer materials, quieter palettes, and rooms designed to hold only what's necessary. These are spaces where the architecture does the talking, letting light, proportion, and texture carry the design instead of ornament.",
        gallery: ["col-minimal-2", "col-minimal-3", "col-minimal-4"],
    },
    {
        id: "coastal-escapes",
        note:
            "Nearly every project here failed at least one storm-load review before getting it right.",
        tags: ["Salt-Air Durability", "Deep Overhangs", "Weathering"],
        name: "Coastal Escapes",
        count: "67 Projects",
        filterCategory: "Landscape",
        seed: "col-coastal",
        image: "/images/Collections/Coastal-Escape.jpg",
        summary: "Homes that embrace the beauty of the coast.",
        description:
            "Coastal Escapes is a study in weathering homes designed to age alongside salt air, shifting light, and open horizons. Expect deep overhangs, durable materials, and a shared instinct to open rather than shelter from the view.",
        gallery: ["col-coastal-2", "col-coastal-3", "col-coastal-4"],
    },
    {
        id: "concrete-poetry",
        note:
            "We rejected more submissions from this category than any other raw concrete is easy to get badly wrong.",
        tags: ["Board-Formed", "Thermal Mass", "Patina"],
        name: "Concrete Poetry",
        count: "54 Projects",
        filterCategory: "Materials",
        seed: "col-concrete",
        image: "/images/Collections/Concrete-Poetry.jpg",
        summary: "Exploring form, texture, and raw expression.",
        description:
            "Concrete Poetry looks at raw concrete not as a cost-saving default but as a deliberate material choice valued for the way it holds formwork texture, ages with weather staining, and carries thermal mass through a building's life.",
        gallery: ["col-concrete-2", "col-concrete-3", "col-concrete-4"],
    },
    {
        id: "warm-interiors",
        note:
            "The throughline isn't a material, it's a feeling every one of these is a room you'd actually want to sit in.",
        tags: ["Timber", "Soft Light", "Texture"],
        name: "Warm Interiors",
        count: "73 Projects",
        filterCategory: "Interiors",
        seed: "col-warm",
        image: "/images/Collections/Warm-Interiors.jpg",
        summary: "Inviting spaces that feel like home.",
        description:
            "Warm Interiors is the counterpoint to minimalism-for-its-own-sake rooms built around texture, timber, and soft light that invite you to stay rather than admire from a distance. Comfort here isn't an afterthought, it's the brief.",
        gallery: ["col-warm-2", "col-warm-3", "col-warm-4"],
    },
    {
        id: "outdoor-harmony",
        note:
            "Half of these technically have more usable square footage outside than in.",
        tags: ["Courtyards", "Sliding Walls", "Landscape-First"],
        name: "Outdoor Harmony",
        count: "38 Projects",
        filterCategory: "Landscape",
        seed: "col-outdoor",
        image: "/images/Collections/Outdoor-Harmony.jpg",
        summary: "Bringing architecture closer to nature.",
        description:
            "Outdoor Harmony collects projects where the line between inside and outside barely exists courtyards, sliding walls, and gardens treated as rooms in their own right rather than an afterthought around the building's edges.",
        gallery: ["col-outdoor-2", "col-outdoor-3", "col-outdoor-4"],
    },
    {
        id: "japanese-influence",
        note:
            "Several architects here have never visited Japan the influence traveled through proportion and restraint, not pilgrimage.",
        tags: ["Wabi-Sabi", "Joinery", "Framed Views"],
        name: "Japanese Influence",
        count: "45 Projects",
        filterCategory: "Interiors",
        seed: "col-japan",
        image: "/images/Collections/Japanese-Influence.jpg",
        summary: "Restraint, natural materials, and quiet detail.",
        description:
            "Japanese Influence draws from wabi-sabi and traditional joinery an appreciation for imperfection, natural aging, and craftsmanship that doesn't need to announce itself. Screens, tatami-scaled proportions, and framed views recur throughout.",
        gallery: ["col-japan-2", "col-japan-3", "col-japan-4"],
    },
    {
        id: "glass-and-steel",
        note:
            "Structural engineers get more credit than architects for most of what's in this collection, and they'd probably agree.",
        tags: ["Slender Frames", "Transparency", "Precision"],
        name: "Glass & Steel",
        count: "29 Projects",
        filterCategory: "Materials",
        seed: "col-glass",
        image: "/images/Collections/Glass-Steel.jpg",
        summary: "Precision, transparency, and structural honesty.",
        description:
            "Glass & Steel is for projects that let their structure show slender steel frames, uninterrupted glazing, and a refusal to hide how the building actually holds itself up. Often the most technically demanding homes in the archive.",
        gallery: ["col-glass-2", "col-glass-3", "col-glass-4"],
    },
    {
        id: "desert-modern",
        note:
            "Every project here was designed assuming the building will eventually lose the fight with the landscape, gracefully.",
        tags: ["Deep Shade", "Thermal Mass", "Arid Palette"],
        name: "Desert Modern",
        count: "31 Projects",
        filterCategory: "Landscape",
        seed: "col-desert",
        image: "/images/Collections/Desert-Modern.jpg",
        summary: "Low, horizontal homes built for extreme light.",
        description:
            "Desert Modern gathers houses designed against harsh sun rather than in spite of it deep shade, thermal mass, and a material palette chosen to blend into (and eventually disappear into) an arid landscape.",
        gallery: ["col-desert-2", "col-desert-3", "col-desert-4"],
    },
    {
        id: "vertical-living",
        note:
            "Added this collection after privacy at height kept coming up as its own unsolved design problem.",
        tags: ["Double-Height Voids", "Borrowed Light", "Density"],
        name: "Vertical Living",
        count: "42 Projects",
        filterCategory: "Residential",
        seed: "col-vertical",
        image: "/images/Collections/Vertical-Living.jpg",
        summary: "High-rise homes designed around light, air, and privacy at scale.",
        description:
            "Vertical Living looks at what changes when a home is stacked forty floors up instead of sitting on the ground how architects design for privacy without walls, borrow light through double-height voids, and still make a single floor of a tower feel like somewhere to actually live rather than just occupy.",
        gallery: ["col-vertical-2", "col-vertical-3", "col-vertical-4"],
    },
    {
        id: "sustainable-futures",
        note:
            "None of these were retrofitted to be sustainable after the fact that was the brief from day one, in every case.",
        tags: ["Net-Zero", "Passive Systems", "Responsible Sourcing"],
        name: "Sustainable Futures",
        count: "58 Projects",
        filterCategory: "Materials",
        seed: "col-sustainable",
        image: "/images/Collections/Sustainable-Future.jpg",
        summary: "Buildings designed around their environmental footprint from day one.",
        description:
            "Sustainable Futures isn't a style, it's a constraint every project here was designed around passive heating and cooling, responsibly sourced materials, or net-zero energy targets from the earliest sketches, rather than certified after the fact.",
        gallery: ["col-sustainable-2", "col-sustainable-3", "col-sustainable-4"],
    },
    {
        id: "adaptive-reuse",
        note:
            "Our favorite kind of project you can still find the ghost of the old building if you know where to look.",
        tags: ["Renovation", "Industrial Shell", "Preservation"],
        name: "Adaptive Reuse",
        count: "24 Projects",
        filterCategory: "Interiors",
        seed: "col-reuse",
        image: "/images/Collections/Adaptive-Reuse.jpg",
        summary: "Old buildings given new purpose without erasing their history.",
        description:
            "Adaptive Reuse collects projects that chose renovation over demolition factories turned into lofts, warehouses turned into galleries where the architectural challenge was less about building something new and more about listening to what a structure already wanted to become.",
        gallery: ["col-reuse-2", "col-reuse-3", "col-reuse-4"],
    },
];

function CollectionRow({ collection, onOpen, reverse, index }) {
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

            <div className="relative">
                <button
                    onClick={() => onOpen(collection)}
                    className="group relative block h-72 w-full overflow-hidden rounded-2xl border border-white/10 sm:h-96"
                >
                    <img
                        src={collection.image || `https://picsum.photos/seed/${collection.seed}/900/700`}
                        alt={collection.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                </button>
                <p className="mt-2.5 flex items-center justify-between text-[11px] text-stone-600">
                    <span>Fig. {String(index + 1).padStart(2, "0")} - {collection.name}</span>
                    <span>{collection.count}</span>
                </p>
            </div>

            <div className="relative">
                <p className="mb-2 flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-wide text-orange-500">
                    <span className="text-stone-600">{String(index + 1).padStart(2, "0")}</span>
                    <Layers size={11} /> {collection.count}
                </p>
                <h3 className="font-serif text-3xl text-stone-50 sm:text-4xl">{collection.name}</h3>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-stone-400">
                    {collection.summary}
                </p>

                {collection.note && (
                    <p className="mt-3 max-w-lg text-xs italic leading-relaxed text-stone-500">
                        {collection.note}
                    </p>
                )}

                {collection.tags?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {collection.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full border border-stone-700 px-3 py-1 text-[11px] text-stone-400"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <button
                    onClick={() => onOpen(collection)}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-orange-500 hover:text-orange-400"
                >
                    View Collection <ArrowRight size={14} />
                </button>
            </div>
        </div>
    );
}

function CollectionModal({ collection, onClose }) {
    useEffect(() => {
        if (!collection) return;
        document.body.style.overflow = "hidden";
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [collection, onClose]);

    if (!collection) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 py-8 sm:py-14"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-lg" />
            <div
                className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#141210] shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
                style={{ animation: "collectionModalIn 0.35s ease-out" }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
                >
                    <X size={18} />
                </button>

                <div className="h-56 w-full overflow-hidden sm:h-72">
                    <img
                        src={collection.image || `https://picsum.photos/seed/${collection.seed}/900/700`}
                        alt={collection.name}
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="px-6 py-7 sm:px-9 sm:py-8">
                    <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.2em] text-orange-500">
                        <Layers size={12} /> {collection.count}
                    </p>
                    <h2 className="font-serif text-3xl text-stone-50">{collection.name}</h2>

                    <p className="mt-4 text-sm leading-relaxed text-stone-300">
                        {collection.description}
                    </p>

                    {collection.gallery?.length > 0 && (
                        <div className="mt-6 grid grid-cols-3 gap-3">
                            {collection.gallery.map((seed) => (
                                <div key={seed} className="h-24 overflow-hidden rounded-xl border border-white/10 sm:h-28">
                                    <img
                                        src={collection.image || `https://picsum.photos/seed/${seed}/400/400`}
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


export default function Collections() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [selectedCollection, setSelectedCollection] = useState(null);

    const visible =
        activeFilter === "All"
            ? COLLECTIONS
            : COLLECTIONS.filter((c) => c.filterCategory === activeFilter);

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

        @keyframes collectionModalIn {
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


            <Navbar active="Collections" />


            <AccessDeniedGate>
                <CollectionsHeader count={COLLECTIONS.length} />

                <div className="mx-auto max-w-5xl px-6 pb-20 sm:px-8">
                    <FilterBar active={activeFilter} setActive={setActiveFilter} />
                    <div>
                        {visible.map((collection, i) => (
                            <CollectionRow
                                key={collection.id}
                                collection={collection}
                                onOpen={setSelectedCollection}
                                reverse={i % 2 === 1}
                                index={i}
                            />
                        ))}
                    </div>
                </div>
            </AccessDeniedGate>

            <CollectionModal collection={selectedCollection} onClose={() => setSelectedCollection(null)} />
            <Footer />
        </div>
    );
}