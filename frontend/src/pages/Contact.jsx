import { useState } from "react";
import Navbar from "../components/Navbar";
import {
    ArrowRight,
    Lock,
    Store,
    Mail,
    Phone,
    Clock,
    ChevronDown,
    CheckCircle2,
} from "lucide-react";
import Footer from "../components/Footer";

function InstagramIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
        </svg>
    );
}
function PinterestIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.63 7.86 6.35 9.32-.09-.79-.17-2.01.04-2.88.19-.79 1.23-5.02 1.23-5.02s-.31-.63-.31-1.55c0-1.45.84-2.53 1.89-2.53.89 0 1.32.67 1.32 1.47 0 .9-.57 2.24-.87 3.48-.25 1.04.52 1.89 1.55 1.89 1.86 0 3.29-1.96 3.29-4.78 0-2.5-1.8-4.25-4.36-4.25-2.97 0-4.71 2.23-4.71 4.53 0 .9.34 1.86.78 2.38.09.1.1.19.07.3-.08.32-.25 1.02-.29 1.16-.05.19-.15.23-.35.14-1.32-.61-2.14-2.53-2.14-4.07 0-3.32 2.41-6.37 6.96-6.37 3.65 0 6.49 2.6 6.49 6.08 0 3.63-2.29 6.55-5.46 6.55-1.07 0-2.07-.55-2.41-1.21l-.66 2.5c-.24.92-.88 2.08-1.31 2.78.99.3 2.03.47 3.12.47 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
        </svg>
    );
}
function LinkedinIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
            <path d="M4.98 3.5a2.5 2.5 0 11.02 5 2.5 2.5 0 01-.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.2 1.44-2.2 2.96V21H9z" />
        </svg>
    );
}

const SOCIALS = [
    { label: "Instagram", Icon: InstagramIcon },
    { label: "Pinterest", Icon: PinterestIcon },
    { label: "LinkedIn", Icon: LinkedinIcon },
];

const PROJECT_TYPES = [
    "Residential",
    "Commercial",
    "Hospitality",
    "Interior Design",
    "Other",
];

const CONTACT_ITEMS = [
    {
        icon: Store,
        label: "Studio",
        lines: ["123 Architecture Way", "Lagos, Nigeria"],
    },
    {
        icon: Mail,
        label: "Email",
        lines: ["hello@archivio.studio"],
    },
    {
        icon: Phone,
        label: "Phone",
        lines: ["+234 801 234 5678"],
    },
    {
        icon: Clock,
        label: "Working Hours",
        lines: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 2:00 PM"],
    },
];



export default function Contact() {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        projectType: "",
        subject: "",
        message: "",
    });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle");

    const handleChange = (field) => (e) => {
        setForm((f) => ({ ...f, [field]: e.target.value }));
        if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
    };

    const validate = () => {
        const next = {};
        if (!form.fullName.trim()) next.fullName = "Enter your full name.";
        if (!form.email.trim()) {
            next.email = "Enter your email.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
            next.email = "Enter a valid email.";
        }
        if (!form.message.trim()) next.message = "Tell us a bit about your project.";
        return next;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        setStatus("sending");
        try {
            // await api.post("/contact", form), I dont yet have an endpoint to connect it to, later, i guess.
            await new Promise((r) => setTimeout(r, 900));
            setStatus("sent");
            setForm({ fullName: "", email: "", projectType: "", subject: "", message: "" });
        } catch {
            setStatus("idle");
            setErrors({ message: "Something went wrong sending your message. Try again." });
        }
    };

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

            <Navbar active="Contact" />

            <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
                    <div className="rounded-3xl border border-white/10 bg-[#1c1917]/60 p-8 sm:p-10">
                        {status === "sent" ? (
                            <div className="flex flex-col items-center justify-center py-14 text-center">
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                                    <CheckCircle2 size={26} />
                                </div>
                                <h2 className="font-serif text-2xl text-stone-50">Message sent</h2>
                                <p className="mx-auto mt-2 max-w-xs text-sm text-stone-400">
                                    Thanks for reaching out we'll get back to you within
                                    a couple of business days.
                                </p>
                                <button
                                    onClick={() => setStatus("idle")}
                                    className="mt-6 text-sm font-medium text-orange-500 hover:text-orange-400"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <>
                                <h2 className="font-serif text-2xl text-stone-50 sm:text-3xl">
                                    Send us a message
                                </h2>
                                <p className="mt-1.5 text-sm text-stone-400">
                                    Fill out the form below and we'll get back to you as
                                    soon as possible.
                                </p>

                                <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <input
                                                value={form.fullName}
                                                onChange={handleChange("fullName")}
                                                placeholder="Full Name"
                                                className={`w-full rounded-lg border bg-transparent px-4 py-3 text-sm text-stone-100 placeholder-stone-500 outline-none transition focus:border-orange-600 ${errors.fullName ? "border-red-500" : "border-stone-700"
                                                    }`}
                                            />
                                            {errors.fullName && (
                                                <p className="mt-1.5 text-xs text-red-500">{errors.fullName}</p>
                                            )}
                                        </div>
                                        <div>
                                            <input
                                                type="email"
                                                value={form.email}
                                                onChange={handleChange("email")}
                                                placeholder="Email Address"
                                                className={`w-full rounded-lg border bg-transparent px-4 py-3 text-sm text-stone-100 placeholder-stone-500 outline-none transition focus:border-orange-600 ${errors.email ? "border-red-500" : "border-stone-700"
                                                    }`}
                                            />
                                            {errors.email && (
                                                <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <select
                                            value={form.projectType}
                                            onChange={handleChange("projectType")}
                                            className="w-full appearance-none rounded-lg border border-stone-700 bg-transparent px-4 py-3 text-sm text-stone-100 outline-none transition focus:border-orange-600"
                                        >
                                            <option value="" disabled className="bg-[#1c1917] text-stone-500">
                                                Project Type
                                            </option>
                                            {PROJECT_TYPES.map((t) => (
                                                <option key={t} value={t} className="bg-[#1c1917] text-stone-100">
                                                    {t}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown
                                            size={16}
                                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-500"
                                        />
                                    </div>

                                    <input
                                        value={form.subject}
                                        onChange={handleChange("subject")}
                                        placeholder="Subject"
                                        className="w-full rounded-lg border border-stone-700 bg-transparent px-4 py-3 text-sm text-stone-100 placeholder-stone-500 outline-none transition focus:border-orange-600"
                                    />

                                    <div>
                                        <textarea
                                            value={form.message}
                                            onChange={handleChange("message")}
                                            rows={5}
                                            placeholder="Tell us about your project"
                                            className={`w-full resize-none rounded-lg border bg-transparent px-4 py-3 text-sm text-stone-100 placeholder-stone-500 outline-none transition focus:border-orange-600 ${errors.message ? "border-red-500" : "border-stone-700"
                                                }`}
                                        />
                                        {errors.message && (
                                            <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>
                                        )}
                                    </div>

                                    <div className="flex flex-col items-start gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                                        <button
                                            type="submit"
                                            disabled={status === "sending"}
                                            className="flex items-center gap-2 rounded-lg bg-orange-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {status === "sending" ? (
                                                <>
                                                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                                    Sending…
                                                </>
                                            ) : (
                                                <>
                                                    Send Message <ArrowRight size={15} />
                                                </>
                                            )}
                                        </button>

                                        <div className="flex items-center gap-2 text-xs text-stone-500">
                                            <Lock size={13} />
                                            <span>
                                                We respect your privacy.
                                                <br className="hidden sm:block" /> Your information
                                                is safe with us.
                                            </span>
                                        </div>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-[#1c1917]/60 p-8">
                        <h2 className="font-serif text-2xl text-stone-50">Contact Information</h2>

                        <div className="mt-6 space-y-6">
                            {CONTACT_ITEMS.map(({ icon: Icon, label, lines }) => (
                                <div key={label} className="flex items-start gap-3.5">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-orange-700/40 text-orange-500">
                                        <Icon size={15} />
                                    </span>
                                    <div>
                                        <p className="text-xs font-medium text-orange-500">{label}</p>
                                        {lines.map((line) => (
                                            <p key={line} className="text-sm text-stone-300">
                                                {line}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 border-t border-white/5 pt-6">
                            <p className="mb-3 text-sm text-stone-300">Follow Us</p>
                            <div className="flex gap-2.5">
                                {SOCIALS.map(({ label, Icon }) => (
                                    <a
                                        key={label}
                                        href="#"
                                        aria-label={label}
                                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-stone-700 text-stone-400 transition hover:border-orange-600 hover:text-orange-500"
                                    >
                                        <Icon className="h-4 w-4" />
                                    </a>
                                ))}
                                <a
                                    href="#"
                                    aria-label="Behance"
                                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-stone-700 text-xs font-semibold text-stone-400 transition hover:border-orange-600 hover:text-orange-500"
                                >
                                    Be
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
