import toast from "react-hot-toast";
import { CheckCircle2, XCircle, X } from "lucide-react";

function Toast({ t, variant, title, subtitle }) {
    const isSuccess = variant === "success";

    return (
        <div
            className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border border-white/10 bg-[#1c1917] px-4 py-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.45)] ${t.visible ? "archivio-toast-in" : "archivio-toast-out"
                }`}
        >
            <span className={`mt-0.5 shrink-0 ${isSuccess ? "text-orange-500" : "text-red-500"}`}>
                {isSuccess ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
            </span>
            <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-stone-100">{title}</p>
                {subtitle && <p className="mt-0.5 text-xs leading-snug text-stone-400">{subtitle}</p>}
            </div>
            <button
                onClick={() => toast.dismiss(t.id)}
                aria-label="Dismiss"
                className="mt-0.5 shrink-0 text-stone-500 transition hover:text-stone-300"
            >
                <X size={14} />
            </button>
        </div>
    );
}

export function showSuccess(title, subtitle) {
    return toast.custom(
        (t) => <Toast t={t} variant="success" title={title} subtitle={subtitle} />,
        { duration: 2000 }
    );
}

export function showError(title, subtitle) {
    return toast.custom(
        (t) => <Toast t={t} variant="error" title={title} subtitle={subtitle} />,
        { duration: 2000 }
    );
}