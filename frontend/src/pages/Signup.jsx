import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { userStore } from "../store/useStore"
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { api } from "../api/api"
import Navbar from "../components/Navbar";

import Archivio1 from "../assets/Archivio 1.jpg";
import Archivio2 from "../assets/Archivio 2.jpg";
import Archivio3 from "../assets/Archivio 3.jpg";
import Archivio4 from "../assets/Archivio 4.jpg";
import Archivio5 from "../assets/Archivio 5.jpg";
import Archivio6 from "../assets/Archivio 6.jpg";
import Archivio7 from "../assets/Archivio 7.jpg";
import Archivio8 from "../assets/Archivio 8.jpg";


const TextCard = ({ eyebrow, title, body, tall }) => (
    <div
        className={`flex flex-col justify-between rounded-2xl border border-white/10 bg-[#1c1917] p-6 ${tall ? "h-[280px]" : "h-[220px]"
            }`}
    >
        <div>
            {eyebrow && (
                <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-orange-500/80">
                    {eyebrow}
                </p>
            )}
            <p className="font-serif text-2xl leading-snug text-stone-100">{title}</p>
        </div>
        {body && <p className="text-sm leading-relaxed text-stone-400">{body}</p>}
    </div>
);

const PaletteCard = () => {
    const colors = ["#c1653a", "#8f8478", "#a8926b", "#b7bfa0", "#8f9a94", "#4d443b"];
    return (
        <div className="h-[300px] rounded-2xl border border-white/10 bg-[#1c1917] p-6">
            <p className="mb-1 font-serif text-2xl leading-snug text-stone-100">
                Material
                <br />
                Palette
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
                {colors.map((c) => (
                    <span
                        key={c}
                        className="h-12 w-12 rounded-full"
                        style={{ backgroundColor: c }}
                    />
                ))}
            </div>
        </div>
    );
};

const ImgCard = ({ src, alt, h }) => (
    <div
        className="overflow-hidden rounded-2xl border border-white/10 bg-[#1c1917]"
        style={{ height: h }}
    >
        <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
    </div>
);

const col1 = [
    <ImgCard key="1a" src={Archivio1} alt="Modern house exterior" h={340} />,
    <ImgCard key="1b" src={Archivio2} alt="Interior hallway" h={420} />,
    <TextCard
        key="1c"
        eyebrow="Wabi-sabi"
        title="A study of form and natural light."
    />,
    <ImgCard key="1d" src={Archivio3} alt="Concrete facade" h={300} />,
];

const col2 = [
    <ImgCard key="2a" src={Archivio4} alt="Floor plan sketch" h={280} />,
    <TextCard
        key="2b"
        eyebrow="Courtyard living"
        title="Privacy, light, connection."
        tall
    />,
    <ImgCard key="2c" src={Archivio5} alt="Dining room table" h={380} />,
    <ImgCard key="2d" src={Archivio6} alt="Stone fireplace" h={260} />,
];

const col3 = [
    <ImgCard key="3a" src={Archivio7} alt="Architectural rendering" h={320} />,
    <PaletteCard key="3b" />,
    <ImgCard key="3c" src={Archivio8} alt="Reading nook" h={340} />,
    <TextCard
        key="3d"
        eyebrow="Philosophy"
        title="Timeless spaces, thoughtful design."
        tall
    />,
];

function MarqueeColumn({ items, duration, reverse }) {
    return (
        <div className="relative h-full flex-1 overflow-hidden">
            <div
                className="flex flex-col gap-5"
                style={{
                    animation: `${reverse ? "scrollDown" : "scrollUp"} ${duration}s linear infinite`,
                }}
            >
                {items}
                {items}
            </div>
        </div>
    );
}

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });

    const { signup } = userStore();

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (field) => (e) => {
        setForm((f) => ({ ...f, [field]: e.target.value }));
        if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
    };

    const validate = () => {
        const next = {};

        if (!form.username.trim()) {
            next.username = "Username is required.";
        } else if (form.username.trim().length < 6) {
            next.username = "Username must be at least 6 characters.";
        }

        if (!form.email.trim()) {
            next.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
            next.email = "Enter a valid email address.";
        }

        if (!form.password) {
            next.password = "Password is required.";
        } else if (form.password.length < 8) {
            next.password = "Password must be at least 8 characters.";
        }

        return next;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            console.log("Create account:", form);
        }
        try {
            await signup(form)

            toast.success("Account created successfully", { theme: "light" })
            navigate("/")

        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message, { theme: "light" })
            }
        } finally {
            setIsLoading(false)
        }
    }


    return (

        <div className="archivio-page min-h-screen w-full bg-[#141210] text-stone-100">
            <style>{`
        .archivio-page { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .archivio-page .font-serif { font-family: 'Fraunces', ui-serif, Georgia, serif; }

       
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

        @keyframes scrollUp {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        @keyframes scrollDown {
          from { transform: translateY(-50%); }
          to { transform: translateY(0); }
        }
        .moodboard-pause:hover .marquee-track {
          animation-play-state: paused;
        }
      `}</style>

            <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
                <div className="flex items-center justify-center px-6 py-16 sm:px-12 lg:px-20">
                    <div className="w-full max-w-md">
                        <div className="mb-10 flex items-center gap-3">
                            <svg
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#d9603a"
                                strokeWidth="1.5"
                            >
                                <path d="M3 21V9l4-3v15" />
                                <path d="M11 21V6l4-3v18" />
                                <path d="M19 21V11l2-1v11" />
                            </svg>
                            <span className="text-sm font-semibold tracking-[0.25em] text-stone-200">
                                ARCHIVIO
                            </span>
                        </div>

                        <h1 className="font-serif text-5xl leading-[1.1] text-stone-50">
                            Create your
                            <br />
                            <span className="text-orange-600">account</span>
                        </h1>
                        <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-stone-400">
                            Join Archivio to discover inspiring architecture, save your
                            favorite ideas, and plan your dream spaces.
                        </p>

                        <form method="POST" onSubmit={handleSubmit} className="mt-9 space-y-5">
                            <div>
                                <label className="mb-2 block text-sm text-stone-400">
                                    Username
                                </label>
                                <div className="relative">
                                    <User
                                        size={18}
                                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-500"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Enter your username"
                                        value={form.username}
                                        onChange={handleChange("username")}
                                        aria-invalid={!!errors.username}
                                        className={`w-full rounded-lg border bg-transparent py-3 pl-11 pr-4 text-sm text-stone-100 placeholder-stone-500 outline-none transition focus:border-orange-600 ${errors.username ? "border-red-500" : "border-stone-700"
                                            }`}
                                    />
                                </div>
                                {errors.username && (
                                    <p className="mt-1.5 text-xs text-red-500">{errors.username}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-stone-400">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail
                                        size={18}
                                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-500"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={form.email}
                                        onChange={handleChange("email")}
                                        aria-invalid={!!errors.email}
                                        className={`w-full rounded-lg border bg-transparent py-3 pl-11 pr-4 text-sm text-stone-100 placeholder-stone-500 outline-none transition focus:border-orange-600 ${errors.email ? "border-red-500" : "border-stone-700"
                                            }`}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-stone-400">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock
                                        size={18}
                                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-500"
                                    />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a password"
                                        value={form.password}
                                        onChange={handleChange("password")}
                                        aria-invalid={!!errors.password}
                                        className={`w-full rounded-lg border bg-transparent py-3 pl-11 pr-11 text-sm text-stone-100 placeholder-stone-500 outline-none transition focus:border-orange-600 ${errors.password ? "border-red-500" : "border-stone-700"
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((s) => !s)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>
                                )}
                            </div>

                            <button onClick={handleSubmit}
                                type="submit"
                                className="mt-2 w-full rounded-lg bg-orange-700 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 active:scale-[0.99]"
                            >
                                {isLoading ? 'creating...' : 'Create Account'}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-stone-400">
                            Already have an account?{" "}
                            <Link to="/login" className="font-medium text-orange-500 hover:text-orange-400">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="moodboard-pause relative hidden overflow-hidden bg-[#141210] lg:block">
                    <div
                        className="absolute inset-0 flex gap-5 p-6"
                        style={{ transform: "rotate(40deg) scale(1.25)" }}
                    >
                        <MarqueeColumn items={col1} duration={38} />
                        <MarqueeColumn items={col2} duration={46} reverse />
                        <MarqueeColumn items={col3} duration={42} />
                    </div>

                </div>
            </div>
        </div>
    );
}

