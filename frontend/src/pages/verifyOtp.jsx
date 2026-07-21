import { useState, useEffect, useRef, useCallback } from "react";
import { Mail, ArrowLeft, CheckCircle2, RefreshCcw } from "lucide-react";

function Logo({ size = 26 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#d9603a" strokeWidth="1.5">
            <path d="M3 21V9l4-3v15" />
            <path d="M11 21V6l4-3v18" />
            <path d="M19 21V11l2-1v11" />
        </svg>
    );
}

function maskEmail(email) {
    const [name, domain] = email.split("@");
    if (!domain) return email;
    const visibleCount = Math.min(2, name.length);
    const visible = name.slice(0, visibleCount);
    const masked = "*".repeat(Math.max(name.length - visibleCount, 3));
    return `${visible}${masked}@${domain}`;
}

const CODE_LENGTH = 6;
const RESEND_SECONDS = 45;

function OtpInput({ value, onChange, status, disabled }) {
    const refs = useRef([]);

    const setDigit = (index, digit) => {
        const chars = value.split("");
        chars[index] = digit;
        onChange(chars.join("").slice(0, CODE_LENGTH));
    };

    const handleChange = (index) => (e) => {
        const raw = e.target.value.replace(/\D/g, "");
        if (!raw) {
            setDigit(index, "");
            return;
        }
        const digit = raw.slice(-1);
        setDigit(index, digit);
        if (index < CODE_LENGTH - 1) refs.current[index + 1]?.focus();
    };

    const handleKeyDown = (index) => (e) => {
        if (e.key === "Backspace") {
            if (value[index]) {
                setDigit(index, "");
            } else if (index > 0) {
                refs.current[index - 1]?.focus();
                setDigit(index - 1, "");
            }
        } else if (e.key === "ArrowLeft" && index > 0) {
            refs.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < CODE_LENGTH - 1) {
            refs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
        if (!pasted) return;
        onChange(pasted.padEnd(value.length, ""));
        const nextFocusIndex = Math.min(pasted.length, CODE_LENGTH - 1);
        refs.current[nextFocusIndex]?.focus();
    };

    return (
        <div
            className={`flex justify-center gap-2.5 sm:gap-3 ${status === "error" ? "animate-[shake_0.45s_ease-in-out]" : ""
                }`}
        >
            {Array.from({ length: CODE_LENGTH }).map((_, i) => (
                <input
                    key={i}
                    ref={(el) => (refs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value[i] || ""}
                    disabled={disabled}
                    onChange={handleChange(i)}
                    onKeyDown={handleKeyDown(i)}
                    onPaste={handlePaste}
                    onFocus={(e) => e.target.select()}
                    className={`h-14 w-11 rounded-xl border bg-[#1c1917] text-center text-xl font-medium text-stone-100 outline-none transition sm:h-16 sm:w-13 ${status === "error"
                        ? "border-red-500"
                        : status === "success"
                            ? "border-emerald-500"
                            : value[i]
                                ? "border-orange-600"
                                : "border-stone-700"
                        } focus:border-orange-600 disabled:opacity-60`}
                />
            ))}
        </div>
    );
}

export default function Verify({ email, onVerified, onUseDifferentEmail }) {
    const [code, setCode] = useState("");
    const [status, setStatus] = useState("idle");
    const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

    const maskedEmail = maskEmail(email || "");
    const isComplete = code.length === CODE_LENGTH;

    useEffect(() => {
        if (secondsLeft <= 0) return;
        const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
        return () => clearInterval(id);
    }, [secondsLeft]);

    useEffect(() => {
        if (status === "success") {
            const t = setTimeout(() => onVerified?.(), 100);
            return () => clearTimeout(t);
        }
    }, [status, onVerified]);

    const verifyCode = useCallback(async (otp) => {
        await new Promise((r) => setTimeout(r, 900));
        return otp === "123456";
    }, []);

    const handleSubmit = useCallback(
        async (otp) => {
            if (otp.length !== CODE_LENGTH || status === "checking") return;
            setStatus("checking");
            const ok = await verifyCode(otp);
            if (ok) {
                setStatus("success");
            } else {
                setStatus("error");
                setTimeout(() => {
                    setStatus("idle");
                    setCode("");
                }, 900);
            }
        },
        [status, verifyCode]
    );

    useEffect(() => {
        if (isComplete && status === "idle") {
            handleSubmit(code);
        }
    }, [isComplete, code, status, handleSubmit]);

    const handleResend = () => {
        if (secondsLeft > 0) return;
        setSecondsLeft(RESEND_SECONDS);
        setCode("");
        setStatus("idle");
    };

    return (
        <div className="archivio-page flex min-h-screen w-full items-center justify-center bg-[#141210] px-6 py-16 text-stone-100">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..900&family=Inter:wght@400;500;600;700&display=swap');
        .archivio-page { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .archivio-page .font-serif { font-family: 'Fraunces', ui-serif, Georgia, serif; }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        @keyframes popIn {
          0% { transform: scale(0.6); opacity: 0; }
          60% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        html, body, .archivio-page {
          scrollbar-width: thin;
          scrollbar-color: #b45526 #1c1917;
        }
        ::-webkit-scrollbar { width: 11px; }
        ::-webkit-scrollbar-track { background: #141210; }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #d9603a, #9a4520);
          border-radius: 999px;
          border: 3px solid #141210;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #e8794f, #b45526);
        }
      `}</style>

            <div className="w-full max-w-md">
                <div className="mb-10 flex items-center justify-center gap-2.5">
                    <Logo />
                    <span className="text-sm font-semibold tracking-[0.25em] text-stone-200">ARCHIVIO</span>
                </div>

                {status !== "success" ? (
                    <div className="rounded-3xl border border-white/10 bg-[#1c1917]/60 p-8 sm:p-10">
                        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-700/15 text-orange-500">
                            <Mail size={24} />
                        </div>

                        <h1 className="text-center font-serif text-3xl text-stone-50">Verify your email</h1>
                        <p className="mx-auto mt-3 max-w-xs text-center text-sm leading-relaxed text-stone-400">
                            We sent a 6-digit code to{" "}
                            <span className="font-medium text-stone-200">{maskedEmail}</span>. Enter it
                            below to continue.
                        </p>

                        <div className="mt-8">
                            <OtpInput value={code} onChange={setCode} status={status} disabled={status === "checking"} />
                        </div>

                        <div className="mt-5 min-h-[20px] text-center text-sm">
                            {status === "error" && (
                                <span className="text-red-500">That code didn't match. Try again.</span>
                            )}
                            {status === "checking" && (
                                <span className="inline-flex items-center gap-2 text-stone-400">
                                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-stone-600 border-t-orange-500" />
                                    Verifying…
                                </span>
                            )}
                        </div>

                        <button
                            onClick={() => handleSubmit(code)}
                            disabled={!isComplete || status === "checking"}
                            className="mt-4 w-full rounded-lg bg-orange-700 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Verify Account
                        </button>

                        <div className="mt-6 text-center text-sm text-stone-400">
                            {secondsLeft > 0 ? (
                                <span>
                                    Resend code in{" "}
                                    <span className="text-stone-200">
                                        0:{String(secondsLeft).padStart(2, "0")}
                                    </span>
                                </span>
                            ) : (
                                <button
                                    onClick={handleResend}
                                    className="inline-flex items-center gap-1.5 font-medium text-orange-500 hover:text-orange-400"
                                >
                                    <RefreshCcw size={13} /> Resend code
                                </button>
                            )}
                        </div>

                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onUseDifferentEmail?.();
                            }}
                            className="mt-6 flex items-center justify-center gap-1.5 text-xs text-stone-500 hover:text-stone-300"
                        >
                            <ArrowLeft size={13} /> Use a different email
                        </a>
                    </div>
                ) : (
                    <div
                        className="rounded-3xl border border-emerald-500/20 bg-[#1c1917]/60 p-10 text-center"
                        style={{ animation: "popIn 0.5s ease-out" }}
                    >
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                            <CheckCircle2 size={30} />
                        </div>
                        <h1 className="font-serif text-3xl text-stone-50">You're verified</h1>
                        <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-stone-400">
                            Your account is confirmed. Taking you to Archivio now.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}