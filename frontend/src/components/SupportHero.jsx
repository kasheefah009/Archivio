import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { ARTICLES } from "./SupportContent";

export default function SupportHero({ compact = false }) {
    const [query, setQuery] = useState("");

    const matchingArticles = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return [];
        return ARTICLES.filter(
            (a) =>
                a.title.toLowerCase().includes(q) ||
                a.description.toLowerCase().includes(q)
        ).slice(0, 6);
    }, [query]);

    return (
        <div
            className={` mb-6 mx-auto max-w-4xl px-4 text-center sm:px-6 ${compact ? "pt-10 pb-8 sm:pt-16 sm:pb-10" : "pt-14 pb-10 sm:pt-24 sm:pb-16"
                }`}
        >
            <h1
                className={`mb-6 font-serif text-stone-50 sm:mb-8 ${compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl lg:text-5xl"
                    }`}
            >
                How can we help today?
            </h1>

            <div className="relative mx-auto max-w-xl text-left">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500 sm:left-5 sm:h-5 sm:w-5" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for an answer"
                    className="w-full rounded-full border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-sm text-stone-50 placeholder:text-stone-500 outline-none transition focus:border-orange-500/50 focus:bg-white/[0.07] sm:py-4 sm:pl-14 sm:pr-6 sm:text-base"
                />

                {query.trim() && (
                    <div className="absolute left-0 right-0 top-full z-10 mt-2 max-h-72 overflow-y-auto rounded-2xl border border-white/10 bg-stone-950 p-2">
                        {matchingArticles.length > 0 ? (
                            matchingArticles.map((a) => (
                                <Link
                                    key={`${a.categoryId}-${a.id}`}
                                    to={`/support/${a.categoryId}/${a.id}`}
                                    onClick={() => setQuery("")}
                                    className="block rounded-xl px-3 py-2.5 transition hover:bg-white/5 sm:px-4 sm:py-3"
                                >
                                    <p className="text-sm font-medium text-stone-100">{a.title}</p>
                                    <p className="text-xs text-stone-500">{a.description}</p>
                                </Link>
                            ))
                        ) : (
                            <p className="px-3 py-2.5 text-sm text-stone-500 sm:px-4 sm:py-3">
                                No results for "{query}".
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}