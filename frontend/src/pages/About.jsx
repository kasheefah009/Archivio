import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
    ArrowRight,
    Sparkles,
    Users,
    Layers,
    Heart,
    MapPin,
    Search,
    Lock,
    MessageCircle,
    UserPlus,
    Quote,
} from "lucide-react";

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

function AboutHeader() {
    return (
        <div className="mx-auto max-w-3xl px-6 pb-10 pt-15 text-center sm:pt-20">
            <Reveal>
                <h1 className="font-serif text-4xl leading-tight text-stone-50 sm:text-5xl">
                    About <span className="text-orange-500">Archivio</span>
                </h1>
            </Reveal>
        </div>
    );
}


function StorySection() {
    return (
        <section className="mx-auto max-w-5xl px-6 py-10">
            <Reveal>
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                    <div className="overflow-hidden rounded border border-white/10">
                        <img
                            src="/images/About/About.jpg"
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div>
                        <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-orange-500">
                            Our Story
                        </p>
                        <h2 className="font-serif text-3xl text-stone-50">
                            Built by people tired of losing track of good ideas.
                        </h2>
                        <p className="mt-4 text-sm leading-relaxed text-stone-400">
                            Every architect we talked to had the same three tools: a
                            Pinterest board nobody organized, a screenshots folder with 400
                            unsorted images, and a browser full of tabs they swore they'd
                            get back to.
                        </p>
                        <p className="mt-4 text-sm leading-relaxed text-stone-400">
                            Archivio is what we wished existed instead one place to keep
                            what inspires you, organized the way architects actually think,
                            with real people curating it rather than an algorithm guessing
                            at your taste.
                        </p>
                    </div>
                </div>
            </Reveal>
        </section>
    );
}

function Timeline() {
    const milestones = [
        { year: "2023", title: "A shared folder, and nowhere to put it", desc: "Two people, one overflowing screenshots folder, and a running joke about building something better." },
        { year: "2024", title: "Archivio opens to the first 500", desc: "A closed beta, mostly friends of friends, built around the first few hundred curated projects." },
        { year: "2025", title: "Collections and the archive grow up", desc: "Curated collections, a real editorial voice, and the first architects joining as contributors, not just readers." },
        { year: "2026", title: "Building the community, properly", desc: "A directory of working and aspiring architects — the part of Archivio we're most excited to finish." },
    ];

    return (
        <section className="mx-auto max-w-3xl border-t border-white/5 px-6 py-16">
            <Reveal>

                <p className="mb-2 text-center text-xs font-medium uppercase tracking-[0.2em] text-orange-500">
                    Our Journey
                </p>
                <h2 className="mb-12 text-center font-serif text-3xl text-stone-50">
                    How we got here.
                </h2>

                <div className="relative pl-8">
                    <div className="absolute bottom-2 left-[7px] top-2 w-px bg-white/10" />
                    {milestones.map((m) => (
                        <div key={m.year} className="relative mb-10 last:mb-0">
                            <span className="absolute -left-8 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-orange-600 bg-[#100e0c]" />
                            <p className="text-xs font-medium uppercase tracking-wide text-orange-500">{m.year}</p>
                            <p className="mt-1.5 font-serif text-xl text-stone-100">{m.title}</p>
                            <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-stone-500">{m.desc}</p>
                        </div>
                    ))}
                </div>
            </Reveal>
        </section>
    );
}

function ValuesSection() {
    const values = [
        { icon: Sparkles, title: "Curated, not algorithmic", desc: "Every collection here was assembled by someone who actually sat down and decided it belonged together." },
        { icon: Users, title: "Built for a community", desc: "Not just a library a place to actually talk to the people who make this stuff for a living." },
        { icon: Layers, title: "Depth over volume", desc: "We'd rather have one well-written essay than ten thin ones. Same goes for projects and collections." },
        { icon: Heart, title: "Made with care", desc: "Small details, the way a page loads, the words on a button matter to us more than they probably should." },
    ];

    return (
        <section className="mx-auto max-w-5xl border-t border-white/5 px-6 py-16">
            <Reveal>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-orange-500">
                    What We Believe
                </p>
            </Reveal>
            <Reveal>
                <h2 className="mb-10 max-w-2xl font-serif text-3xl text-stone-50">
                    A few things we won't compromise on.
                </h2>
                <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
                    {values.map(({ icon: Icon, title, desc }) => (
                        <div key={title} className="flex gap-4">
                            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-orange-700/40 text-orange-500">
                                <Icon size={16} />
                            </span>
                            <div>
                                <p className="text-sm font-medium text-stone-100">{title}</p>
                                <p className="mt-1.5 text-sm leading-relaxed text-stone-500">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Reveal>
        </section>
    );
}

function TeamSection() {
    const team = [
        { name: "Kasheefah Adedokun", role: "Founder & Editorial Lead", seed: "team-kasheefah" },
        { name: "Marcus Webb", role: "Co-founder & Engineering", seed: "team-marcus" },
        { name: "Sofia Marín", role: "Curation & Collections", seed: "team-sofia" },
        { name: "Nathaniel Cho", role: "Community & Partnerships", seed: "team-nathaniel" },
    ];

    return (
        <section className="mx-auto max-w-5xl border-t border-white/5 px-6 py-16">
            <Reveal>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-orange-500">
                    The Team
                </p>
                <h2 className="mb-10 max-w-md font-serif text-3xl text-stone-50">
                    Small team. Strong opinions about buildings.
                </h2>
                <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-4">
                    {team.map((p) => (
                        <div key={p.name}>
                            <div className="mb-3 aspect-square overflow-hidden rounded-2xl border border-white/10">
                                <img
                                    src={`https://picsum.photos/seed/${p.seed}/300/300`}
                                    alt={p.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <p className="text-sm font-medium text-stone-100">{p.name}</p>
                            <p className="mt-0.5 text-xs text-stone-500">{p.role}</p>
                        </div>
                    ))}
                </div>
            </Reveal>
        </section>
    );
}

function CommunityTeaser() {
    const [email, setEmail] = useState("");
    const [joined, setJoined] = useState(false);

    return (
        <section className="mx-auto max-w-6xl px-6 py-20">
            <Reveal>
                <div className="text-center">
                    <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-orange-600/40 bg-orange-700/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-orange-400">
                        <Sparkles size={11} /> Coming Soon
                    </span>
                    <h2 className="mx-auto max-w-5xl font-serif text-4xl leading-tight text-stone-50 sm:text-5xl">
                        Where architects find their people.
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-stone-400">
                        A directory of working and aspiring architects, built into
                        Archivio ask questions, get real advice, and meet people who
                        actually build things for a living. We're putting the finishing
                        touches on it now.
                    </p>

                    {joined ? (
                        <p className="mt-7 text-sm text-orange-400">
                            You're on the list, we'll email you the moment it's live.
                        </p>
                    ) : (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (email.trim()) setJoined(true);
                            }}
                            className="mx-auto mt-7 flex max-w-md flex-row gap-3 sm:flex-row"
                        >
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@email.com"
                                className="w-full rounded-full border border-stone-700 bg-[#1c1917] px-5 py-3 text-sm text-stone-100 placeholder-stone-500 outline-none transition focus:border-orange-600"
                            />
                            <button
                                type="submit"
                                className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-orange-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-orange-600"
                            >
                                Join the waitlist
                            </button>
                        </form>
                    )}
                </div>

                <div className="relative mt-16 overflow-hidden rounded-3xl border border-orange-700/20 bg-gradient-to-b from-orange-950/40 to-[#100e0c] p-6 sm:p-10">
                    <div className="relative z-10 mx-auto mb-8 flex max-w-lg items-center gap-3 rounded-full border border-white/10 bg-[#1c1917] px-5 py-4 shadow-xl shadow-black/30">
                        <Search size={16} className="shrink-0 text-stone-500" />
                        <span className="flex-1 truncate text-sm text-stone-300">
                            Find architects who work with concrete, near Lagos.
                        </span>
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-700 text-white">
                            <ArrowRight size={13} />
                        </span>
                    </div>

                    <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#1c1917]">
                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#100e0c]/50 backdrop-blur-[2px]">
                            <span className="flex items-center gap-2 rounded-full border border-white/10 bg-[#141210] px-4 py-2 text-xs text-stone-300">
                                <Lock size={12} /> Preview — not live yet
                            </span>
                        </div>

                        <div className="grid grid-cols-[140px_1fr] opacity-70">
                            <div className="border-r border-white/5 bg-[#141210] p-4">
                                <p className="mb-4 flex items-center gap-1.5 text-xs font-medium text-stone-300">
                                    <UserPlus size={12} className="text-orange-500" /> Community
                                </p>
                                <div className="space-y-2 text-[11px] text-stone-500">
                                    <p className="rounded-md bg-orange-700/15 px-2 py-1.5 text-orange-400">Directory</p>
                                    <p className="px-2 py-1.5">Discussions</p>
                                    <p className="px-2 py-1.5">Mentorship</p>
                                    <p className="px-2 py-1.5">My Messages</p>
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="mb-3 text-xs text-stone-400">Working Architects</p>
                                {[
                                    { name: "Amara Okoye", role: "Passive Design", loc: "Lagos" },
                                    { name: "Daniel Reyes", role: "Adaptive Reuse", loc: "Mexico City" },
                                    { name: "Tomasz Kowal", role: "Glass & Steel", loc: "Warsaw" },
                                ].map((p) => (
                                    <div key={p.name} className="flex items-center justify-between border-b border-white/5 py-2.5 text-xs">
                                        <span className="flex items-center gap-2 text-stone-300">
                                            <MessageCircle size={11} className="text-stone-600" /> {p.name}
                                        </span>
                                        <span className="text-stone-500">{p.role}</span>
                                        <span className="flex items-center gap-1 text-stone-600">
                                            <MapPin size={10} /> {p.loc}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>
        </section>
    );
}

export default function About() {
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

            <Navbar active="About" />

            <AboutHeader />
            <StorySection />
            <Timeline />
            <ValuesSection />
            <TeamSection />
            <CommunityTeaser />
            <Footer />
        </div>
    );
}