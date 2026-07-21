import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Home as HomeIcon, Compass } from "lucide-react";

function VacantLotIllustration() {
    return (
        <svg viewBox="0 0 420 300" className="w-full max-w-md" fill="none">
            <ellipse cx="210" cy="230" rx="170" ry="30" fill="#d9603a" opacity="0.08" />

            <path d="M40 250 L380 250 L340 190 L80 190 Z" fill="#1c1917" stroke="#292524" strokeWidth="1.5" />
            <g stroke="#d9603a" strokeOpacity="0.12" strokeWidth="1">
                <path d="M120 190 L95 250" />
                <path d="M170 190 L157 250" />
                <path d="M220 190 L220 250" />
                <path d="M270 190 L283 250" />
                <path d="M320 190 L345 250" />
                <path d="M80 210 L340 210" />
                <path d="M85 230 L335 230" />
            </g>

            <rect
                x="140" y="205" width="140" height="35"
                fill="none" stroke="#d9603a" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.55"
            />
            {[[140, 205], [280, 205], [140, 240], [280, 240]].map(([x, y], i) => (
                <g key={i}>
                    <line x1={x} y1={y} x2={x} y2={y - 14} stroke="#d9603a" strokeWidth="2" />
                    <circle cx={x} cy={y - 14} r="2.5" fill="#d9603a" />
                </g>
            ))}

            {[60, 100, 300, 355, 200].map((x, i) => (
                <path
                    key={i}
                    d={`M${x} 250 q3 -10 0 -14 M${x} 250 q6 -8 4 -13 M${x} 250 q-6 -8 -4 -13`}
                    stroke="#4C8A72"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                />
            ))}

            <g transform="translate(300 130) rotate(-6)">
                <line x1="0" y1="0" x2="0" y2="70" stroke="#7a5c44" strokeWidth="5" strokeLinecap="round" />
                <rect x="-38" y="-34" width="76" height="40" rx="4" fill="#1c1917" stroke="#d9603a" strokeWidth="2" />
                <text x="0" y="-15" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="13" fill="#f5f5f4" fontWeight="600">
                    LOT
                </text>
                <text x="0" y="1" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="16" fill="#d9603a" fontWeight="700">
                    404
                </text>
            </g>

            <g transform="translate(276 92)">
                <path d="M0 6 Q4 0 9 5 Q13 0 17 6 Q10 3 9 8 Q8 3 0 6 Z" fill="#e8794f" />
            </g>
            <g transform="translate(95 175) rotate(8)">
                <line x1="0" y1="0" x2="0" y2="14" stroke="#d9603a" strokeWidth="2" />
                <circle cx="0" cy="0" r="2.5" fill="#d9603a" />
            </g>
        </svg>
    );
}

export default function NotFound() {
    const location = useLocation();

    return (
        <div className="archivio-page min-h-screen w-full bg-[#100e0c] text-stone-100">
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

            <Navbar />

            <div className="mx-auto flex max-w-4xl flex-col items-center px-6 pb-24 pt-16 text-center sm:pt-24">
                <VacantLotIllustration />

                <p className="mt-8 text-xs font-medium uppercase tracking-[0.3em] text-orange-500">
                    404 — Vacant lot
                </p>
                <h1 className="mt-3 font-serif text-4xl text-stone-50 sm:text-5xl">
                    Nothing's been built here.
                </h1>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-stone-400">
                    The address checks out, but there's no building on it, this page
                    either never existed or was taken down. Might be worth double
                    checking the link.
                </p>

                <div className="mt-6 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs text-stone-500">
                    {location.pathname}
                </div>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 rounded-full border border-stone-700 px-6 py-3 text-sm text-stone-200 transition hover:border-stone-500"
                    >
                        <HomeIcon size={15} /> Back home
                    </Link>
                    <Link
                        to="/explore"
                        className="flex items-center justify-center gap-2 rounded-full bg-orange-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-orange-600"
                    >
                        <Compass size={15} /> Explore Archivio
                    </Link>
                </div>
            </div>
        </div>
    );
}