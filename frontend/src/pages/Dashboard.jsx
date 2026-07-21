import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import AccessDeniedGate from "../components/AccessDeniedGate";
import { MapPin, Calendar, Play, X, Pencil, Compass } from "lucide-react";
import { userStore } from "../store/useStore";
import { getAssetUrl } from "../utils/getAssetUrl";
import EditProfile from "../components/EditProfile";

const FEED = [
    {
        id: 1,
        type: "image",
        seed: "feed-1",
        h: 520,
        title: "Cliffside Retreat",
        meta: "Saved from Projects",
        date: "2 days ago",
    },
    {
        id: 2,
        type: "video",
        seed: "feed-2",
        h: 640,
        title: "Walkthrough: Concrete Poetry",
        meta: "A short tour through raw-concrete details",
        date: "4 days ago",
    },
    {
        id: 3,
        type: "image",
        seed: "feed-3",
        h: 400,
        title: "Sunken Courtyard Villa",
        meta: "Popular in Coastal Escapes",
        date: "5 days ago",
    },
    {
        id: 4,
        type: "image",
        seed: "feed-4",
        h: 600,
        title: "Minimal Timber Cabin",
        meta: "From Greenline Collective",
        date: "1 week ago",
    },
    {
        id: 5,
        type: "video",
        seed: "feed-5",
        h: 460,
        title: "Site Visit: Harbor Crossing",
        meta: "Behind the scenes at the pavilion build",
        date: "1 week ago",
    },
    {
        id: 6,
        type: "image",
        seed: "feed-6",
        h: 560,
        title: "Warm Study Nook",
        meta: "Saved from Warm Interiors",
        date: "2 weeks ago",
    },
    {
        id: 7,
        type: "image",
        seed: "feed-7",
        h: 700,
        title: "Glass Atrium Exchange",
        meta: "From Studio ARQ",
        date: "2 weeks ago",
    },
    {
        id: 8,
        type: "image",
        seed: "feed-8",
        h: 480,
        title: "Desert Modern Home",
        meta: "Following Voss Desert Studio",
        date: "3 weeks ago",
    },
];

function FeedTile({ item, onOpen }) {
    return (
        <button
            onClick={() => onOpen(item)}
            className="group relative mb-3 block w-full overflow-hidden rounded-lg text-left"
            style={{ breakInside: "avoid" }}
        >
            <img
                src={`https://picsum.photos/seed/${item.seed}/600/${item.h}`}
                alt={item.title}
                className="w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                style={{ height: item.h / 2 }}
            />

            {item.type === "video" && (
                <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm">
                    <Play size={12} className="ml-0.5" fill="currentColor" />
                </span>
            )}

            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/0 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-xs font-medium text-white">{item.title}</p>
                <p className="text-[11px] text-stone-300">{item.date}</p>
            </div>
        </button>
    );
}

function FeedItemModal({ item, onClose }) {
    useEffect(() => {
        if (!item) return;
        document.body.style.overflow = "hidden";
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [item, onClose]);

    if (!item) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 py-8 sm:py-14"
            onClick={onClose}
        >
            <div
                className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#141210] shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
                style={{ animation: "feedModalIn 0.3s ease-out" }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
                >
                    <X size={18} />
                </button>

                <div className="bg-black">
                    {item.type === "video" ? (
                        <video controls autoPlay className="max-h-[60vh] w-full">
                            <source src="/videos/archivio-hero.mp4" type="video/mp4" />
                        </video>
                    ) : (
                        <img
                            src={`https://picsum.photos/seed/${item.seed}/1200/800`}
                            alt={item.title}
                            className="max-h-[60vh] w-full object-contain"
                        />
                    )}
                </div>

                <div className="px-6 py-5 sm:px-8">
                    <h3 className="font-serif text-2xl text-stone-50">{item.title}</h3>
                    <p className="mt-1.5 text-sm text-stone-400">{item.meta}</p>
                    <p className="mt-3 text-xs text-stone-600">{item.date}</p>
                </div>
            </div>
        </div>
    );
}


export default function Dashboard() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const { user: rawUser } = userStore();
    const isNewUser = !rawUser?.savedCount;

    const user = {
        name: rawUser?.username || "Archivio Member",
        role: rawUser?.role || null,
        location: rawUser?.location || null,
        joined: rawUser?.createdAt
            ? `Member since ${new Date(rawUser.createdAt).toLocaleString("en-US", { month: "short", year: "numeric" })}`
            : null,
        bio: rawUser?.bio || null,
        avatar: rawUser?.avatar || null,
        stats: [
            { label: "Saved", value: rawUser?.savedCount ?? 0 },
            { label: "Boards", value: rawUser?.boardsCount ?? 0 },
            { label: "Following", value: rawUser?.followingCount ?? 0 },
            { label: "Followers", value: rawUser?.followersCount ?? 0 },
        ],
    };

    return (
        <div className="archivio-page min-h-screen w-full bg-[#100e0c] text-stone-100">
            <style>{`
        .archivio-page { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .archivio-page .font-serif { font-family: 'Fraunces', ui-serif, Georgia, serif; }

        @keyframes feedModalIn {
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

            <Navbar />

            <AccessDeniedGate>
                <div className="mx-auto max-w-6xl px-6 pb-16 pt-14 sm:pt-20">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
                        <div className="relative mx-auto w-full max-w-xs lg:mx-0">
                            <div className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border-2 border-orange-700/40" />
                            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
                                <img
                                    src={getAssetUrl(user.avatar) || "https://picsum.photos/seed/archivio-portrait/500/625"}
                                    alt={user.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col justify-center">
                            <h1 className="font-serif text-4xl leading-tight text-stone-50 sm:text-5xl">
                                {user.name}
                            </h1>
                            {user.role && (
                                <p className="mt-2 text-sm font-medium text-orange-500">{user.role}</p>
                            )}

                            {(user.location || user.joined) && (
                                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-stone-500">
                                    {user.location && (
                                        <span className="flex items-center gap-1.5">
                                            <MapPin size={12} /> {user.location}
                                        </span>
                                    )}
                                    {user.joined && (
                                        <span className="flex items-center gap-1.5">
                                            <Calendar size={12} /> {user.joined}
                                        </span>
                                    )}
                                </div>
                            )}

                            {user.bio && (
                                <p className="mt-5 max-w-md text-sm leading-relaxed text-stone-400">
                                    {user.bio}
                                </p>
                            )}

                            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                                {user.stats.map((s, i) => (
                                    <React.Fragment key={s.label}>
                                        {i > 0 && <span className="text-stone-700">&middot;</span>}
                                        <span className="text-stone-200">
                                            <span className="font-medium text-stone-50">{s.value}</span> {s.label}
                                        </span>
                                    </React.Fragment>
                                ))}
                            </div>

                            <button
                                onClick={() => setEditProfileOpen(true)}
                                className="mt-6 inline-flex w-fit items-center gap-1.5 border-b border-orange-600/40 pb-0.5 text-sm text-orange-500 transition hover:border-orange-400 hover:text-orange-400 cursor-pointer"
                            >
                                <Pencil size={13} /> Edit profile
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-6xl px-6 pb-24">
                    <div className="mb-5 border-t border-white/5 pt-8">
                        <p className="text-xs uppercase tracking-[0.2em] text-stone-600">Recent Activity</p>
                        <h2 className="mt-1 font-serif text-2xl text-stone-50">Your Feed</h2>
                    </div>

                    {isNewUser ? (
                        <div className="mx-auto flex max-w-3xl flex-col items-center rounded-2xl border border-white/10 px-8 py-16 text-center">
                            <p className="text-2xl">😔</p>
                            <h3 className="mt-4 font-serif text-xl text-stone-100">
                                You don't have any content yet
                            </h3>
                            <p className="mt-2.5 text-sm leading-relaxed text-stone-500">
                                It's ok everyone starts here. Save a few projects or
                                collections you like, and they'll start showing up in your
                                feed. In the meantime, here's some inspiration to get you
                                started.
                            </p>
                            <Link
                                to="/projects"
                                className="mt-6 flex items-center gap-2 rounded-full bg-orange-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600"
                            >
                                <Compass size={15} /> Get Inspired
                            </Link>
                        </div>
                    ) : (
                        <div className="columns-2 gap-3 sm:columns-3 lg:columns-4">
                            {FEED.map((item) => (
                                <FeedTile key={item.id} item={item} onOpen={setSelectedItem} />
                            ))}
                        </div>
                    )}
                </div>

                <FeedItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
                <EditProfile open={editProfileOpen} onClose={() => setEditProfileOpen(false)} />
            </AccessDeniedGate>
        </div>
    );
}