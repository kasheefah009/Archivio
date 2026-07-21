import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AccessDeniedGate from "../components/AccessDeniedGate";
import { userStore } from "../store/useStore";
import { getAvatarUrl } from "../utils/getAvatarUrl";
import {
  User,
  Bell,
  Pencil,
  Check,
  X,
  Users,
  Plus,
  Upload as UploadIcon,
} from "lucide-react";

const SECTIONS = [
  { key: "account", label: "Account", icon: User },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "team", label: "Team", icon: Users },
];

function EditableRow({ label, value, onSave, type = "text", placeholder }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!draft.trim()) return;
    setSaving(true);
    setError("");
    try {
      await onSave(draft.trim());
      setEditing(false);
    } catch (err) {
      setError(err?.message || "Couldn't save that change. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="border-b border-white/5 py-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-stone-200">{label}</p>
        {!editing && (
          <button
            onClick={() => {
              setDraft(value);
              setError("");
              setEditing(true);
            }}
            className="flex items-center gap-1.5 text-xs font-medium text-orange-500 hover:text-orange-400"
          >
            <Pencil size={12} /> Edit
          </button>
        )}
      </div>

      {editing ? (
        <div className="mt-3">
          <div className="flex items-center gap-2">
            <input
              type={type}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={placeholder}
              autoFocus
              disabled={saving}
              className="w-full rounded-lg border border-stone-700 bg-transparent px-3.5 py-2.5 text-sm text-stone-100 placeholder-stone-500 outline-none transition focus:border-orange-600 disabled:opacity-50"
            />
            <button
              onClick={handleSave}
              disabled={saving}
              aria-label="Save"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-700 text-white transition hover:bg-orange-600 disabled:opacity-50"
            >
              <Check size={15} />
            </button>
            <button
              onClick={() => {
                setEditing(false);
                setError("");
              }}
              disabled={saving}
              aria-label="Cancel"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-stone-700 text-stone-400 transition hover:text-stone-200 disabled:opacity-50"
            >
              <X size={15} />
            </button>
          </div>
          {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
        </div>
      ) : (
        <p className="mt-1 text-sm text-stone-500">{value || "—"}</p>
      )}
    </div>
  );
}

function PasswordRow({ onChangePassword }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.current) {
      setError("Enter your current password.");
      return;
    }
    if (form.next.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (form.next !== form.confirm) {
      setError("New passwords don't match.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      await onChangePassword({ currentPassword: form.current, newPassword: form.next });
      setEditing(false);
      setForm({ current: "", next: "", confirm: "" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err?.message || "Current password is incorrect.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="border-b border-white/5 py-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-stone-200">Password</p>
        {!editing && (
          <button
            onClick={() => {
              setError("");
              setEditing(true);
            }}
            className="flex items-center gap-1.5 text-xs font-medium text-orange-500 hover:text-orange-400"
          >
            <Pencil size={12} /> Change
          </button>
        )}
      </div>

      {editing ? (
        <form onSubmit={handleSubmit} className="mt-3 space-y-3">
          <input
            type="password"
            required
            placeholder="Current password"
            value={form.current}
            disabled={saving}
            onChange={(e) => setForm((f) => ({ ...f, current: e.target.value }))}
            className="w-full rounded-lg border border-stone-700 bg-transparent px-3.5 py-2.5 text-sm text-stone-100 placeholder-stone-500 outline-none transition focus:border-orange-600 disabled:opacity-50"
          />
          <input
            type="password"
            required
            placeholder="New password"
            value={form.next}
            disabled={saving}
            onChange={(e) => setForm((f) => ({ ...f, next: e.target.value }))}
            className="w-full rounded-lg border border-stone-700 bg-transparent px-3.5 py-2.5 text-sm text-stone-100 placeholder-stone-500 outline-none transition focus:border-orange-600 disabled:opacity-50"
          />
          <input
            type="password"
            required
            placeholder="Confirm new password"
            value={form.confirm}
            disabled={saving}
            onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))}
            className="w-full rounded-lg border border-stone-700 bg-transparent px-3.5 py-2.5 text-sm text-stone-100 placeholder-stone-500 outline-none transition focus:border-orange-600 disabled:opacity-50"
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-orange-700 px-4 py-2 text-xs font-medium text-white transition hover:bg-orange-600 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save password"}
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => {
                setEditing(false);
                setError("");
                setForm({ current: "", next: "", confirm: "" });
              }}
              className="rounded-lg border border-stone-700 px-4 py-2 text-xs text-stone-400 transition hover:text-stone-200 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <p className="mt-1 text-sm text-stone-500">
          {success ? (
            <span className="text-green-500">Password updated.</span>
          ) : (
            "••••••••"
          )}
        </p>
      )}
    </div>
  );
}


function ManageAccountSection({ onLogout, onDeleteAccount }) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await onLogout();
    } catch (err) {
      setError(err?.message || "Couldn't log out. Try again.");
      setLoggingOut(false);
    }
  };

  const handleDelete = async () => {
    if (!deletePassword) {
      setDeleteError("Enter your password to confirm.");
      return;
    }
    setDeleting(true);
    setDeleteError("");
    try {
      await onDeleteAccount({ currentPassword: deletePassword });
    } catch (err) {
      setDeleteError(err?.message || "Couldn't delete your account. Try again.");
      setDeleting(false);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="mb-1 text-base font-medium text-stone-100">Manage account</h2>
      <p className="mb-5 text-sm text-stone-500">Session and account-level actions.</p>

      {error && <p className="mb-4 text-xs text-red-500">{error}</p>}

      <div className="flex items-center justify-between border-b border-white/5 py-4">
        <div>
          <p className="text-sm text-stone-200">Log out</p>
          <p className="text-xs text-stone-500">Sign out of Archivio on this device.</p>
        </div>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="rounded-lg border border-stone-700 px-4 py-2 text-xs font-medium text-stone-300 transition hover:border-stone-500 disabled:opacity-50"
        >
          {loggingOut ? "Logging out..." : "Log out"}
        </button>
      </div>

      <div className="py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-red-400">Delete account</p>
            <p className="text-xs text-stone-500">Permanently remove your account and saved data.</p>
          </div>
          {!confirmingDelete && (
            <button
              onClick={() => setConfirmingDelete(true)}
              className="rounded-lg border border-red-900 px-4 py-2 text-xs font-medium text-red-400 transition hover:bg-red-950/40"
            >
              Delete
            </button>
          )}
        </div>

        {confirmingDelete && (
          <div className="mt-4 rounded-lg border border-red-900/40 bg-red-950/10 p-4">
            <p className="mb-3 text-xs text-stone-400">
              Enter your password to permanently delete your account. This can't be undone.
            </p>
            <input
              type="password"
              value={deletePassword}
              disabled={deleting}
              onChange={(e) => setDeletePassword(e.target.value)}
              placeholder="Current password"
              autoFocus
              className="mb-3 w-full rounded-lg border border-stone-700 bg-transparent px-3.5 py-2.5 text-sm text-stone-100 placeholder-stone-500 outline-none transition focus:border-red-600 disabled:opacity-50"
            />
            {deleteError && <p className="mb-3 text-xs text-red-500">{deleteError}</p>}
            <div className="flex gap-2">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-lg bg-red-600 px-3.5 py-2 text-xs font-medium text-white transition hover:bg-red-500 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Confirm delete"}
              </button>
              <button
                onClick={() => {
                  setConfirmingDelete(false);
                  setDeletePassword("");
                  setDeleteError("");
                }}
                disabled={deleting}
                className="rounded-lg border border-stone-700 px-3.5 py-2 text-xs text-stone-400 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


function NotificationsSection() {
  return (
    <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-stone-700 px-6 text-center">
      <Bell className="mb-3 h-6 w-6 text-stone-600" />
      <p className="mb-1 text-sm font-medium text-stone-200">No notifications yet</p>
      <p className="max-w-xs text-sm text-stone-500">
        You'll get notified when someone replies or mentions you.
      </p>
    </div>
  );
}


const SWATCHES = ["#E8734A", "#4C8A72", "#B8933A", "#4A6FA5"];

function CreateTeamModal({ onClose, onCreate }) {
  const [name, setName] = useState("");
  const [invite, setInvite] = useState("");
  const [invites, setInvites] = useState([]);

  const addInvite = () => {
    const email = invite.trim();
    if (email && !invites.includes(email)) {
      setInvites((prev) => [...prev, email]);
      setInvite("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate({ name: name.trim(), invites });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#1c1917] p-6"
      >
        <h3 className="mb-4 font-serif text-xl text-stone-50">Create a team</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Team name"
            className="w-full rounded-lg border border-stone-700 bg-transparent px-3.5 py-2.5 text-sm text-stone-100 placeholder-stone-500 outline-none transition focus:border-orange-600"
          />

          <div className="flex items-center gap-2">
            <input
              value={invite}
              onChange={(e) => setInvite(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addInvite();
                }
              }}
              placeholder="Invite by email"
              className="w-full rounded-lg border border-stone-700 bg-transparent px-3.5 py-2.5 text-sm text-stone-100 placeholder-stone-500 outline-none transition focus:border-orange-600"
            />
            <button
              type="button"
              onClick={addInvite}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-stone-700 text-stone-300 transition hover:border-stone-500"
            >
              <Plus size={15} />
            </button>
          </div>

          {invites.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {invites.map((email) => (
                <span
                  key={email}
                  className="rounded-full bg-white/5 px-3 py-1 text-xs text-stone-300"
                >
                  {email}
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              className="rounded-lg bg-orange-700 px-4 py-2 text-xs font-medium text-white transition hover:bg-orange-600"
            >
              Create team
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-stone-700 px-4 py-2 text-xs text-stone-400 transition hover:text-stone-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TeamSection() {
  const [team, setTeam] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative">
      <div className="mx-auto max-w-lg pt-6 text-center">
        <h2 className="mb-3 font-serif text-3xl leading-tight text-stone-50">
          Collaborate with
          <br />
          your team.
        </h2>
        <p className="mx-auto mb-6 max-w-sm text-sm text-stone-400">
          Invite your team members and start saving inspiration together, add
          comments, tag each other and more.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition hover:bg-stone-200"
        >
          {team ? "Manage team" : "Create team"}
        </button>
      </div>

      <div className="mt-10 flex justify-center">
        <div className="pointer-events-none relative w-full max-w-lg select-none">
          <div className="rounded-2xl border border-white/10 bg-[#1c1917] p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-lg text-stone-50">Saved</h3>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-stone-300">
                {team?.name || "Team"}
              </span>
            </div>

            <div className="mb-4 flex items-center gap-2">
              <span className="rounded-full bg-white/5 px-3.5 py-1.5 text-xs font-medium text-stone-400">
                Mobile
              </span>
              <span className="rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-black">
                Web
              </span>
              <span className="ml-auto flex items-center gap-1.5 rounded-full bg-white/5 px-3.5 py-1.5 text-xs font-medium text-stone-300">
                <UploadIcon size={12} /> Upload
              </span>
            </div>

            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-stone-500">
              Projects &amp; Collections
            </p>

            <div className="grid grid-cols-4 gap-2">
              {SWATCHES.map((color) => (
                <div
                  key={color}
                  className="flex h-14 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${color}22` }}
                >
                  <div
                    className="h-6 w-6 rounded-md"
                    style={{ backgroundColor: color }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="absolute -bottom-6 left-4 w-64 rounded-xl border border-white/10 bg-[#1c1917] p-3 text-left shadow-lg">
            <div className="flex items-start gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-700/30 text-xs font-medium text-orange-400">
                A
              </div>
              <div>
                <p className="text-xs font-medium text-stone-200">
                  Andrea <span className="font-normal text-stone-500">10m ago</span>
                </p>
                <p className="text-xs text-stone-400">
                  I love this facade detail, could we try something similar
                  for the pavilion project?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <CreateTeamModal
          onClose={() => setShowModal(false)}
          onCreate={({ name, invites }) => {
            setTeam({ name, invites });
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

export default function Settings() {
  const [activeSection, setActiveSection] = useState("account");
  const navigate = useNavigate();

  const {
    user,
    updateProfile,
    changePassword,
    logOut: logout,
    deleteProfile: deleteAccount,
  } = userStore();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleDeleteAccount = async ({ currentPassword }) => {
    await deleteAccount({ currentPassword });
    navigate("/");
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
        <div className="flex min-h-[calc(100vh-64px)] w-full flex-col lg:flex-row">
          <nav className="flex gap-1 overflow-x-auto border-b border-white/5 px-6 py-4 lg:w-64 lg:shrink-0 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r lg:px-6 lg:py-10">
            {SECTIONS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm transition ${activeSection === key
                  ? "bg-orange-700/15 text-orange-500"
                  : "text-stone-400 hover:bg-white/5 hover:text-stone-200"
                  }`}
              >
                <Icon size={16} /> {label}
              </button>
            ))}
          </nav>

          <div className="flex-1 px-6 py-10 sm:px-10 sm:py-14">
            <div className="max-w-2xl">
              {activeSection === "account" && (
                <>
                  <div className="mb-8 flex items-center gap-5">
                    <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#1c1917] text-2xl font-medium text-stone-300">
                      {user?._id ? (
                        <img
                          src={getAvatarUrl(user._id)}
                          alt={user.username}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        user?.username?.[0]?.toUpperCase() || "?"
                      )}
                    </div>
                    <div>
                      <h1 className="font-serif text-2xl text-stone-50">{user?.username}</h1>
                      <p className="text-sm text-stone-500">{user?.email}</p>
                    </div>
                  </div>

                  <h2 className="mb-1 text-base font-medium text-stone-100">Personal details</h2>
                  <p className="mb-2 text-sm text-stone-500">Update your name, email, and password.</p>

                  <EditableRow
                    label="Name"
                    value={user?.username}
                    onSave={(v) => updateProfile({ username: v })}
                  />
                  <EditableRow
                    label="Email address"
                    value={user?.email}
                    type="email"
                    onSave={(v) => updateProfile({ email: v })}
                  />
                  <PasswordRow onChangePassword={(payload) => changePassword(payload)} />

                  <ManageAccountSection onLogout={handleLogout} onDeleteAccount={handleDeleteAccount} />
                </>
              )}

              {activeSection === "notifications" && <NotificationsSection />}

              {activeSection === "team" && <TeamSection />}
            </div>
          </div>
        </div>
      </AccessDeniedGate>
    </div>
  );
}