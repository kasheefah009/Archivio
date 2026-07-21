import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, ArrowRight, X } from "lucide-react";
import { userStore } from "../store/useStore";
import Navbar from "../components/Navbar";
import AccessDeniedGate from "../components/AccessDeniedGate";

const ROLES = ["Enthusiast", "Architect", "Student", "Firm"];

const INTERESTS = [
    "Minimalism",
    "Concrete",
    "Coastal",
    "Sustainable",
    "Japanese-inspired",
    "Glass & Steel",
    "Timber & Warmth",
    "Landscape",
    "Interiors",
    "Materials",
];

export default function SetupProfile() {
    const navigate = useNavigate();
    const { user, updateProfile } = userStore();
    const fileInputRef = useRef(null);

    const [avatarPreview, setAvatarPreview] = useState(null);
    const [form, setForm] = useState({
        username: user?.username || "",
        bio: "",
        role: "",
        location: "",
        website: "",
    });
    const [interests, setInterests] = useState([]);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const BIO_LIMIT = 160;

    const handleChange = (field) => (e) =>
        setForm((f) => ({ ...f, [field]: e.target.value }));

    const toggleInterest = (tag) => {
        setInterests((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const handleAvatarPick = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setAvatarPreview(URL.createObjectURL(file));
        setForm((f) => ({ ...f, avatarFile: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.username.trim()) {
            setError("Add a username so people know who you are.");
            return;
        }
        setError("");
        setSaving(true);

        try {
            const payload = new FormData();
            payload.append("username", form.username);
            payload.append("bio", form.bio);
            payload.append("role", form.role);
            payload.append("location", form.location);
            payload.append("website", form.website);
            payload.append("interests", JSON.stringify(interests));
            if (form.avatarFile) payload.append("avatar", form.avatarFile);

            await updateProfile(payload);

            navigate("/dashboard");
        } catch (err) {
            setError("Something went wrong saving your profile. Try again.");
        } finally {
            setSaving(false);
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

            <Navbar />
            <AccessDeniedGate>
                <div className="mx-auto max-w-2xl px-6 py-16">
                    <div className="mb-10 text-center">
                        <h1 className="font-serif text-4xl text-stone-50">Set up your profile</h1>
                        <p className="mt-3 text-sm text-stone-400">
                            Tell us a bit about yourself so we can personalize what you see.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="rounded-3xl border border-white/10 bg-[#1c1917]/60 p-8 sm:p-10"
                    >
                        {/* Avatar */}
                        <div className="mb-8 flex flex-col items-center">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="group relative h-24 w-24 overflow-hidden rounded-full border border-stone-700 bg-[#141210]"
                            >
                                {avatarPreview ? (
                                    <img src={avatarPreview} alt="Avatar preview" className="h-full w-full object-cover" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-stone-600">
                                        <Camera size={22} />
                                    </div>
                                )}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
                                    <Camera size={18} className="text-white" />
                                </div>
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarPick}
                                className="hidden"
                            />
                            <p className="mt-2 text-xs text-stone-500">Click to upload a photo</p>
                        </div>

                        <div className="mb-5">
                            <label className="mb-2 block text-sm text-stone-300">Display name</label>
                            <input
                                value={form.username}
                                onChange={handleChange("username")}
                                placeholder="How should we show your name?"
                                className="w-full rounded-lg border border-stone-700 bg-transparent px-4 py-3 text-sm text-stone-100 placeholder-stone-500 outline-none transition focus:border-orange-600"
                            />
                        </div>

                        <div className="mb-5">
                            <div className="mb-2 flex items-center justify-between">
                                <label className="text-sm text-stone-300">Bio</label>
                                <span className="text-xs text-stone-600">
                                    {form.bio.length}/{BIO_LIMIT}
                                </span>
                            </div>
                            <textarea
                                value={form.bio}
                                maxLength={BIO_LIMIT}
                                onChange={handleChange("bio")}
                                rows={3}
                                placeholder="A short line about what draws you to architecture."
                                className="w-full resize-none rounded-lg border border-stone-700 bg-transparent px-4 py-3 text-sm text-stone-100 placeholder-stone-500 outline-none transition focus:border-orange-600"
                            />
                        </div>

                        <div className="mb-5">
                            <label className="mb-2 block text-sm text-stone-300">You are a/an...</label>
                            <div className="flex flex-wrap gap-2">
                                {ROLES.map((role) => (
                                    <button
                                        key={role}
                                        type="button"
                                        onClick={() => setForm((f) => ({ ...f, role }))}
                                        className={`rounded-full border px-4 py-2 text-xs transition ${form.role === role
                                            ? "border-orange-600 bg-orange-700/15 text-orange-400"
                                            : "border-stone-700 text-stone-400 hover:border-stone-500 hover:text-stone-200"
                                            }`}
                                    >
                                        {role}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm text-stone-300">Location <span className="text-stone-600">(optional)</span></label>
                                <input
                                    value={form.location}
                                    onChange={handleChange("location")}
                                    placeholder="e.g. Lagos, Nigeria"
                                    className="w-full rounded-lg border border-stone-700 bg-transparent px-4 py-3 text-sm text-stone-100 placeholder-stone-500 outline-none transition focus:border-orange-600"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm text-stone-300">Website <span className="text-stone-600">(optional)</span></label>
                                <input
                                    value={form.website}
                                    onChange={handleChange("website")}
                                    placeholder="yourportfolio.com"
                                    className="w-full rounded-lg border border-stone-700 bg-transparent px-4 py-3 text-sm text-stone-100 placeholder-stone-500 outline-none transition focus:border-orange-600"
                                />
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="mb-2 block text-sm text-stone-300">
                                What are you into? <span className="text-stone-600">(pick a few)</span>
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {INTERESTS.map((tag) => {
                                    const selected = interests.includes(tag);
                                    return (
                                        <button
                                            key={tag}
                                            type="button"
                                            onClick={() => toggleInterest(tag)}
                                            className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs transition ${selected
                                                ? "border-orange-600 bg-orange-700/15 text-orange-400"
                                                : "border-stone-700 text-stone-400 hover:border-stone-500 hover:text-stone-200"
                                                }`}
                                        >
                                            {tag}
                                            {selected && <X size={12} />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

                        <div className="flex items-center justify-between">
                            <button
                                type="button"
                                onClick={() => navigate("/dashboard")}
                                className="text-sm text-stone-500 hover:text-stone-300"
                            >
                                Skip for now
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center gap-2 rounded-full bg-orange-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {saving ? (
                                    <>
                                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                        Saving…
                                    </>
                                ) : (
                                    <>
                                        Save Profile <ArrowRight size={15} />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </AccessDeniedGate>
        </div>
    );
}