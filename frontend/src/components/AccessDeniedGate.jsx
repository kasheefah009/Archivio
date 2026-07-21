import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import { userStore } from "../store/useStore";

export default function AccessDeniedGate({ children }) {
    const { isLoggedIn } = userStore();

    if (isLoggedIn) return children;

    return (
        <div className="flex min-h-[80vh] w-full items-center justify-center bg-[#100e0c] px-6 text-stone-100">
            <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#1c1917] p-8 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-orange-700/40 text-orange-500">
                    <ShieldAlert size={26} />
                </div>
                <h1 className="font-serif text-2xl text-stone-50">Access Denied</h1>
                <p className="mt-2.5 text-sm leading-relaxed text-stone-400">
                    You must be logged in to view this page.
                </p>
                <Link
                    to="/login"
                    className="mt-6 block w-full rounded-lg bg-orange-700 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                    Go to Login
                </Link>
            </div>
        </div>
    );
}