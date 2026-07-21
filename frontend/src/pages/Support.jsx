import { Link } from "react-router-dom";
import { Folder } from "lucide-react";
import { CATEGORIES, getArticleCount } from "../components/SupportContent";
import SupportHero from "../components/SupportHero";
import Navbar from "../components/Navbar";

export default function Support() {
    return (
        <section className="archivio-page min-h-screen bg-[#100e0c] text-white">
            <Navbar />
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

            <SupportHero />

            <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 sm:pb-24">
                <h2 className="mb-6 font-serif text-xl text-stone-50 sm:mb-8 sm:text-2xl">
                    Browse knowledge base
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                    {CATEGORIES.map(({ id, label, description, swatch }) => (
                        <Link
                            key={id}
                            to={`/support/${id}`}
                            className="group rounded-2xl border border-white/10 bg-stone-950 p-6 text-center transition hover:border-white/25 hover:bg-white/[0.03] sm:p-8"
                        >
                            <div
                                className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-colors sm:mb-5 sm:h-12 sm:w-12"
                                style={{ backgroundColor: `${swatch}22` }}
                            >
                                <Folder className="h-5 w-5" style={{ color: swatch }} />
                            </div>
                            <h3 className="mb-2 font-serif text-base text-stone-50 sm:text-lg">{label}</h3>
                            <p className="mb-4 text-sm text-stone-400">{description}</p>
                            <p className="text-xs text-stone-500">
                                {getArticleCount(id)} articles
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}