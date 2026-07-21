import { useState } from "react";
import { Mail, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom"
import { userStore } from "../store/useStore"

function BackgroundArt() {
    return (
        <svg
            className="pointer-events-none absolute inset-x-0 bottom-0 h-64 w-full text-white/[0.06] sm:h-80"
            viewBox="0 0 1400 320"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            preserveAspectRatio="xMidYMax slice"
        >
            <rect x="60" y="140" width="260" height="160" />
            <line x1="60" y1="190" x2="320" y2="190" />
            <line x1="140" y1="140" x2="140" y2="300" />
            <line x1="240" y1="140" x2="240" y2="300" />
            <path d="M400 300V160l90-50 90 50v140" />
            <line x1="400" y1="220" x2="580" y2="220" />
            <rect x="720" y="110" width="220" height="190" />
            <line x1="720" y1="180" x2="940" y2="180" />
            <line x1="800" y1="110" x2="800" y2="300" />
            <line x1="860" y1="110" x2="860" y2="300" />
            <path d="M1020 300V150l70-40 70 40v150" />
            <line x1="1150" y1="300" x2="1150" y2="120" />
            <line x1="1150" y1="120" x2="1300" y2="120" />
            <line x1="1300" y1="120" x2="1300" y2="300" />
        </svg>
    );
}

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [status, setStatus] = useState("idle");

    const { forgotPassword } = userStore();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setError("Enter your email address.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Enter a valid email address.");
            return;
        }

        setError("");
        setStatus("sending");

        try {
            await forgotPassword({ email });

            setStatus("sent");
        } catch (error) {
            setStatus("idle");
        }
    };
    return (
        <div className="archivio-page relative min-h-screen w-full overflow-hidden bg-[#100e0c] text-stone-100">
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

        @keyframes popIn {
          0% { transform: scale(0.6); opacity: 0; }
          60% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
            <Navbar />
            <BackgroundArt />

            <div className="relative z-10 flex min-h-[calc(100vh-73px)] items-center justify-center px-6 py-16">
                <div
                    className="w-full max-w-md rounded-3xl border border-white/10 bg-[#141210]/80 p-8 backdrop-blur-sm sm:p-10"
                    style={{ animation: status === "sent" ? "popIn 0.45s ease-out" : undefined }}
                >
                    {status !== "sent" ? (
                        <>
                            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-orange-700/40 text-orange-500">
                                <Lock size={22} />
                            </div>

                            <h1 className="text-center font-serif text-3xl text-stone-50">
                                Forgot your password?
                            </h1>
                            <p className="mx-auto mt-3 max-w-xs text-center text-sm leading-relaxed text-stone-400">
                                Enter your email address and we'll send you a link to
                                reset your password.
                            </p>

                            <form onSubmit={handleSubmit} className="mt-8">
                                <label className="mb-2 block text-sm text-stone-300">Email address</label>
                                <div className={`relative ${error ? "animate-[shake_0.4s_ease-in-out]" : ""}`}>
                                    <Mail size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (error) setError("");
                                        }}
                                        placeholder="Enter your email address"
                                        className={`w-full rounded-lg border bg-transparent py-3 pl-11 pr-4 text-sm text-stone-100 placeholder-stone-500 outline-none transition focus:border-orange-600 ${error ? "border-red-500" : "border-stone-700"
                                            }`}
                                    />
                                </div>
                                {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}

                                <button
                                    type="submit"
                                    disabled={status === "sending"}
                                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-orange-700 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {status === "sending" ? (
                                        <>
                                            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                            Sending…
                                        </>
                                    ) : (
                                        <>
                                            Send Reset Link <ArrowRight size={16} />
                                        </>
                                    )}
                                </button>
                            </form>

                            <p className="mt-6 text-center text-sm">
                                <Link to="/login" className="font-medium text-orange-500 hover:text-orange-400">
                                    Back to login
                                </Link>
                            </p>
                        </>
                    ) : (
                        <div className="text-center">
                            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                                <CheckCircle2 size={26} />
                            </div>
                            <h1 className="font-serif text-3xl text-stone-50">Check your email</h1>
                            <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-stone-400">
                                We've sent a password reset link to{" "}
                                <span className="text-stone-200">{email}</span>. It'll expire
                                in 30 minutes.
                            </p>

                            <button
                                onClick={() => setStatus("idle")}
                                className="mt-6 text-sm text-stone-500 hover:text-stone-300"
                            >
                                Didn't get it? Try a different email
                            </button>

                            <div className="my-6 flex items-center gap-4">
                                <div className="h-px flex-1 bg-stone-800" />
                                <span className="text-xs text-stone-500">or</span>
                                <div className="h-px flex-1 bg-stone-800" />
                            </div>

                            <p className="text-center text-sm">
                                <Link to="/login" className="font-medium text-orange-500 hover:text-orange-400">
                                    Back to login
                                </Link>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}