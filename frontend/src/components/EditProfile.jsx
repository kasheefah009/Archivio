import React, { useState } from "react";
import { X } from "lucide-react";
import { userStore } from "../store/useStore";
import { getAvatarUrl } from "../utils/getAvatarUrl";

const ROLES = ["Enthusiast", "Architect", "Student", "Firm"];

const INTERESTS = [
    "Minimalism", "Concrete", "Coastal", "Sustainable",
    "Japanese-inspired", "Glass & Steel", "Timber & Warmth",
    "Landscape", "Interiors", "Materials",
];

function AsteriskSpinner({ size = 16 }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className="animate-spin"
            style={{ animationDuration: "0.7s" }}
        >
            <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="2" x2="12" y2="22" />
                <line x1="4.2" y1="7" x2="19.8" y2="17" />
                <line x1="19.8" y1="7" x2="4.2" y2="17" />
            </g>
        </svg>
    );
}

export default function EditProfileModal({ open, onClose }) {
    const { user, updateProfile } = userStore();

    const [form, setForm] = useState({
        username: user?.username || "",
        bio: user?.bio || "",
        role: user?.role || "",
        location: user?.location || "",
        website: user?.website || "",
    });
    const [interests, setInterests] = useState(user?.interests || []);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    if (!open) return null;

    const handleChange = (field) => (e) =>
        setForm((f) => ({ ...f, [field]: e.target.value }));

    const toggleInterest = (tag) => {
        setInterests((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const handleSave = async () => {
        if (!form.username.trim()) {
            setError("Add a name so people know who you are.");
            return;
        }
        setError("");
        setSaving(true);

        try {
            await updateProfile({ ...form, interests });
            onClose();
        } catch (err) {
            setError("Something went wrong saving your changes. Try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/10 bg-[#1c1917]"
            >
                <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
                    <h2 className="font-serif text-lg text-stone-50">Edit profile</h2>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="flex h-8 w-8 items-center justify-center rounded-full text-stone-500 transition hover:bg-white/5 hover:text-stone-200"
                    >
                        <X size={16} />
                    </button>
                </div>

                <div className="px-6 py-6">
                    <div className="mb-7 flex flex-col items-center">
                        <div className="h-20 w-20 overflow-hidden rounded-full border border-stone-700 bg-[#141210]">
                            {user?._id && (
                                <img src={getAvatarUrl(user._id)} alt={user.username} className="h-full w-full object-cover" />
                            )}
                        </div>
                    </div>

                    <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-xs text-stone-400">Name</label>
                            <input
                                value={form.username}
                                onChange={handleChange("username")}
                                className="w-full rounded-lg border border-stone-700 bg-transparent px-3.5 py-2.5 text-sm text-stone-100 outline-none transition focus:border-orange-600"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-xs text-stone-400">Website</label>
                            <input
                                value={form.website}
                                onChange={handleChange("website")}
                                placeholder="yourportfolio.com"
                                className="w-full rounded-lg border border-stone-700 bg-transparent px-3.5 py-2.5 text-sm text-stone-100 placeholder-stone-500 outline-none transition focus:border-orange-600"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-xs text-stone-400">Location</label>
                        <input
                            value={form.location}
                            onChange={handleChange("location")}
                            placeholder="e.g. Lagos, Nigeria"
                            className="w-full rounded-lg border border-stone-700 bg-transparent px-3.5 py-2.5 text-sm text-stone-100 placeholder-stone-500 outline-none transition focus:border-orange-600"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-xs text-stone-400">Role</label>
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

                    <div className="mb-4">
                        <label className="mb-2 block text-xs text-stone-400">Bio</label>
                        <textarea
                            value={form.bio}
                            maxLength={160}
                            onChange={handleChange("bio")}
                            rows={2}
                            className="w-full resize-none rounded-lg border border-stone-700 bg-transparent px-3.5 py-2.5 text-sm text-stone-100 outline-none transition focus:border-orange-600"
                        />
                    </div>

                    <div className="mb-2">
                        <label className="mb-2 block text-xs text-stone-400">Interests</label>
                        <div className="flex flex-wrap gap-2">
                            {INTERESTS.map((tag) => {
                                const selected = interests.includes(tag);
                                return (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => toggleInterest(tag)}
                                        className={`rounded-full border px-3 py-1.5 text-xs transition ${selected
                                                ? "border-orange-600 bg-orange-700/15 text-orange-400"
                                                : "border-stone-700 text-stone-400 hover:border-stone-500 hover:text-stone-200"
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-white/5 px-6 py-4">
                    <button
                        onClick={onClose}
                        disabled={saving}
                        className="rounded-full border border-stone-700 px-5 py-2.5 text-sm text-stone-300 transition hover:border-stone-500 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className={`flex items-center justify-center rounded-full bg-black text-white transition disabled:opacity-90 ${saving ? "h-10 w-10" : "px-6 py-2.5 text-sm font-medium"
                            }`}
                    >
                        {saving ? <AsteriskSpinner /> : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}