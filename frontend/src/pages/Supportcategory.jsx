import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight, FileText } from "lucide-react";
import { getCategory, getArticlesByCategory } from "../components/SupportContent";
import SupportHero from "../components/SupportHero";
import Navbar from "../components/Navbar";

export default function SupportCategory() {
    const { categoryId } = useParams();
    const category = getCategory(categoryId);
    const articles = getArticlesByCategory(categoryId);

    const sections = useMemo(() => {
        const order = [];
        const map = {};
        articles.forEach((a) => {
            if (!map[a.section]) {
                map[a.section] = [];
                order.push(a.section);
            }
            map[a.section].push(a);
        });
        return order.map((name) => ({ name, items: map[name] }));
    }, [articles]);

    if (!category) {
        return (
            <section className="min-h-screen bg-black text-white">
                <Navbar />
                <SupportHero compact />
                <div className="px-6 pb-24 text-center">
                    <p className="text-stone-400">That support topic doesn't exist.</p>
                    <Link to="/support" className="mt-4 inline-block text-orange-500 hover:underline">
                        Back to support
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="archivio-page min-h-screen bg-[#100e0c] text-stone-100">
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
                <nav className="mb-6 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-stone-500 sm:mb-8 sm:gap-x-2 sm:text-sm">
                    <Link to="/support" className="transition hover:text-stone-300">
                        Home
                    </Link>
                    <ChevronRight className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
                    <Link to="/support" className="transition hover:text-stone-300">
                        Browse knowledge base
                    </Link>
                    <ChevronRight className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
                    <span className="text-stone-300">{category.label}</span>
                </nav>

                <h1 className="mb-3 font-serif text-2xl text-stone-50 sm:text-3xl lg:text-4xl">
                    {category.label}
                </h1>
                <p className="mb-10 text-sm text-stone-400 sm:mb-12 sm:text-base">
                    {category.description}
                </p>

                {sections.map((section) => (
                    <div key={section.name} className="mb-10 last:mb-0 sm:mb-12">
                        <h2 className="mb-4 font-serif text-lg text-stone-100 sm:text-xl">
                            {section.name}
                        </h2>
                        <div className="flex flex-col gap-3">
                            {section.items.map((article) => (
                                <Link
                                    key={article.id}
                                    to={`/support/${categoryId}/${article.id}`}
                                    className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 transition hover:border-white/25 hover:bg-white/[0.06] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-5"
                                >
                                    <div className="flex items-start gap-3">
                                        <FileText className="mt-0.5 h-4 w-4 shrink-0 text-stone-500" />
                                        <div>
                                            <p className="font-medium text-stone-100">{article.title}</p>
                                            <p className="text-sm text-stone-500">{article.description}</p>
                                        </div>
                                    </div>
                                    <span className="shrink-0 pl-7 text-xs text-stone-600 sm:pl-0">
                                        {article.updated}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}