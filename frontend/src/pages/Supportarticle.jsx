import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight, Mail, ThumbsUp, ThumbsDown } from "lucide-react";
import { getCategory, getArticle } from "../components/SupportContent";
import SupportHero from "../components/SupportHero";
import Navbar from "../components/Navbar";

export default function SupportArticle() {
    const { categoryId, articleId } = useParams();
    const category = getCategory(categoryId);
    const article = getArticle(categoryId, articleId);
    const [feedback, setFeedback] = useState(null);

    if (!category || !article) {
        return (
            <section className="min-h-screen bg-black text-white">
                <SupportHero compact />
                <div className="px-6 pb-24 text-center">
                    <p className="text-stone-400">That article doesn't exist.</p>
                    <Link to="/support" className="mt-4 inline-block text-orange-500 hover:underline">
                        Back to support
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="archivio-page w-full min-h-screen bg-[#100e0c] text-stone-100">
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

            <Navbar />
            <SupportHero compact />

            <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 sm:pb-24">
                <nav className="mb-6 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-stone-500 sm:gap-x-2 sm:text-sm">
                    <Link to="/support" className="transition hover:text-stone-300">
                        Home
                    </Link>
                    <ChevronRight className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
                    <Link to="/support" className="transition hover:text-stone-300">
                        Browse knowledge base
                    </Link>
                    <ChevronRight className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
                    <Link to={`/support/${categoryId}`} className="transition hover:text-stone-300">
                        {category.label}
                    </Link>
                    <ChevronRight className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
                    <span className="text-stone-300">{article.section}</span>
                </nav>

                <div className="rounded-3xl border border-white/10 bg-stone-950 px-5 py-8 sm:px-12 sm:py-12">
                    <h1 className="mb-2 font-serif text-xl text-stone-50 sm:text-3xl">
                        {article.title}
                    </h1>
                    <p className="mb-6 text-sm text-stone-500 sm:mb-8">{article.updated}</p>

                    {article.steps ? (
                        <>
                            <p className="mb-4 text-sm text-stone-300 sm:text-base">{article.intro}</p>
                            <ol className="flex flex-col gap-3">
                                {article.steps.map((step, i) => (
                                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-stone-300 sm:text-[15px]">
                                        <span className="shrink-0 font-serif text-stone-500">{i + 1}.</span>
                                        <span>{step}</span>
                                    </li>
                                ))}
                            </ol>
                        </>
                    ) : (
                        <p className="text-sm leading-relaxed text-stone-300 sm:text-[15px]">
                            {article.content}
                        </p>
                    )}

                    <div className="mt-12 pt-8 text-center sm:mt-16 sm:pt-10">
                        {feedback === null ? (
                            <>
                                <p className="mb-4 font-serif text-base text-stone-100 sm:text-lg">
                                    Was this article helpful?
                                </p>
                                <div className="flex justify-center gap-3">
                                    <button
                                        onClick={() => setFeedback("yes")}
                                        className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-stone-200 transition hover:border-white/30 hover:bg-white/5 sm:px-5 sm:py-2.5"
                                    >
                                        <ThumbsUp className="h-4 w-4" />
                                        Yes
                                    </button>
                                    <button
                                        onClick={() => setFeedback("no")}
                                        className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-stone-200 transition hover:border-white/30 hover:bg-white/5 sm:px-5 sm:py-2.5"
                                    >
                                        <ThumbsDown className="h-4 w-4" />
                                        No
                                    </button>
                                </div>
                            </>
                        ) : (
                            <p className="text-sm text-stone-400">
                                {feedback === "yes"
                                    ? "Glad it helped."
                                    : "Thanks, we'll use this to improve the article."}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-6 rounded-3xl border border-white/10 bg-stone-950 p-5 text-center sm:mt-8 sm:p-6">
                    <p className="mb-4 text-sm text-stone-400">
                        Still didn't answer your question?
                    </p>
                    <a
                        href="mailto:support@archivio.com"
                        className="inline-flex items-center gap-2 rounded-full bg-[#9a4520] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#d9603a] sm:px-5 sm:py-2.5"
                    >
                        <Mail className="h-4 w-4" />
                        Email support
                    </a>
                </div>
            </div>
        </section>
    );
}