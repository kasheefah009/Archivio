import { useState, useEffect, useRef } from "react";
import { X, Camera } from "lucide-react";
import { userStore } from "../store/useStore";
import { getAssetUrl } from "../utils/getAssetUrl";

const ROLES = ["Enthusiast", "Architect", "Student", "Firm"];

export default function EditProfile({ open, onClose }) {
    const { user, updateProfile } = userStore();
    const fileInputRef = useRef(null);

    const [avatarPreview, setAvatarPreview] = useState(null);
    const [form, setForm] = useState({
        username: "",
        role: "",
        location: "",
        website: "",
        bio: "",
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (open && user) {
            setForm({
                username: user.username || "",
                role: user.role || "",
                location: user.location || "",
                website: user.website || "",
                bio: user.bio || "",
            });
            setAvatarPreview(null);
            setError("");
        }
    }, [open, user]);

    useEffect(() => {
        if (!open) return;
        document.body.style.overflow = "hidden";
        const onKey = (e) => e.key === "Escape" && !saving && onClose();
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [open, saving, onClose]);

    if (!open) return null;

    const handleChange = (field) => (e) =>
        setForm((f) => ({ ...f, [field]: e.target.value }));

    const handleAvatarPick = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setAvatarPreview(URL.createObjectURL(file));
        setForm((f) => ({ ...f, avatarFile: file }));
    };

    const handleSave = async () => {
        if (!form.username.trim()) {
            setError("Name can't be empty.");
            return;
        }
        setError("");
        setSaving(true);
        try {
            const payload = new FormData();
            payload.append("username", form.username);
            payload.append("role", form.role);
            payload.append("location", form.location);
            payload.append("website", form.website);
            payload.append("bio", form.bio);
            if (form.avatarFile) payload.append("avatar", form.avatarFile);

            await updateProfile(payload);
            onClose();
        } catch (err) {
            setError("Something went wrong saving your changes. Try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-10 backdrop-blur-sm sm:py-16"
            onClick={() => !saving && onClose()}
        >
            <style>{`
        @keyframes editModalIn {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        /* The loading spinner — a two-tone ring that rotates, with a
           softer pulsing glow behind it rather than a plain spin. */
        @keyframes ringSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.35; transform: scale(0.9); }
          50% { opacity: 0.7; transform: scale(1.15); }
        }
      `}</style>

            <div
                className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#141210] shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
                style={{ animation: "editModalIn 0.3s ease-out" }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
                    <h2 className="font-serif text-xl text-stone-50">Edit profile</h2>
                    <button
                        onClick={() => !saving && onClose()}
                        disabled={saving}
                        aria-label="Close"
                        className="text-stone-500 transition hover:text-stone-300 disabled:opacity-40"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
                    <div className="mb-6 flex flex-col items-center">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={saving}
                            className="group relative h-20 w-20 overflow-hidden rounded-full border border-stone-700 bg-[#1c1917] text-xl font-medium text-stone-300"
                        >
                            {avatarPreview ? (
                                <img src={avatarPreview} alt="Preview" className="h-full w-full object-cover" />
                            ) : user?.avatar ? (
                                <img src={getAssetUrl(user.avatar)} alt={user.username} className="h-full w-full object-cover" />
                            ) : (
                                <span className="flex h-full w-full items-center justify-center">
                                    {form.username?.[0]?.toUpperCase() || "?"}
                                </span>
                            )}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
                                <Camera size={16} className="text-white" />
                            </div>
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarPick}
                            className="hidden"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-1.5 block text-xs text-stone-400">Name</label>
                        <input
                            value={form.username}
                            onChange={handleChange("username")}
                            disabled={saving}
                            className="w-full rounded-lg border border-stone-700 bg-transparent px-3.5 py-2.5 text-sm text-stone-100 outline-none transition focus:border-orange-600 disabled:opacity-50"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-1.5 block text-xs text-stone-400">Role</label>
                        <div className="flex flex-wrap gap-2">
                            {ROLES.map((role) => (
                                <button
                                    key={role}
                                    type="button"
                                    disabled={saving}
                                    onClick={() => setForm((f) => ({ ...f, role }))}
                                    className={`rounded-full border px-3.5 py-1.5 text-xs transition disabled:opacity-50 ${form.role === role
                                        ? "border-orange-600 bg-orange-700/15 text-orange-400"
                                        : "border-stone-700 text-stone-400 hover:border-stone-500"
                                        }`}
                                >
                                    {role}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-3">
                        <div>
                            <label className="mb-1.5 block text-xs text-stone-400">Location</label>
                            <input
                                value={form.location}
                                onChange={handleChange("location")}
                                disabled={saving}
                                placeholder="e.g. Lagos, Nigeria"
                                className="w-full rounded-lg border border-stone-700 bg-transparent px-3.5 py-2.5 text-sm text-stone-100 placeholder-stone-600 outline-none transition focus:border-orange-600 disabled:opacity-50"
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs text-stone-400">Website</label>
                            <input
                                value={form.website}
                                onChange={handleChange("website")}
                                disabled={saving}
                                placeholder="yourportfolio.com"
                                className="w-full rounded-lg border border-stone-700 bg-transparent px-3.5 py-2.5 text-sm text-stone-100 placeholder-stone-600 outline-none transition focus:border-orange-600 disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs text-stone-400">Bio</label>
                        <textarea
                            value={form.bio}
                            onChange={handleChange("bio")}
                            disabled={saving}
                            rows={3}
                            maxLength={160}
                            className="w-full resize-none rounded-lg border border-stone-700 bg-transparent px-3.5 py-2.5 text-sm text-stone-100 outline-none transition focus:border-orange-600 disabled:opacity-50"
                        />
                    </div>

                    {error && <p className="mt-3 text-xs text-red-500">{error}</p>}
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-white/5 px-6 py-4">
                    <button
                        onClick={onClose}
                        disabled={saving}
                        className="rounded-full border border-stone-700 px-5 py-2.5 text-sm text-stone-300 transition hover:border-stone-500 disabled:opacity-40"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex h-10 w-24 items-center justify-center rounded-full bg-orange-700 text-sm font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed"
                    >
                        {saving ? (
                            <span className="relative flex h-4 w-4 items-center justify-center">
                                <span
                                    className="absolute h-4 w-4 rounded-full bg-white/40"
                                    style={{ animation: "glowPulse 1.1s ease-in-out infinite" }}
                                />
                                <span
                                    className="relative h-4 w-4 rounded-full border-2 border-white/25 border-t-white"
                                    style={{ animation: "ringSpin 0.7s linear infinite" }}
                                />
                            </span>
                        ) : (
                            "Save"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}