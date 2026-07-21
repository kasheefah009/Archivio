import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { userStore } from "../store/useStore";

function AuthGate({ children, title, subtitle }) {
  const { isLoggedIn } = userStore();

  if (isLoggedIn) return children;

  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center bg-[#100e0c] px-6 py-24 text-center text-stone-100">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-orange-700/40 text-orange-500">
        <Lock size={26} />
      </div>
      <h1 className="font-serif text-3xl text-stone-50 sm:text-4xl">
        {title || "Sign in to continue"}
      </h1>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-stone-400">
        {subtitle ||
          "Create an account or log in to unlock this part of Archivio."}
      </p>
      <div className="mt-7 flex flex-row gap-3 sm:flex-row">
        <Link
          to="/login"
          className="rounded-full border border-stone-700 px-6 py-3 text-sm font-medium text-stone-200 transition hover:border-orange-600 hover:text-orange-400"
        >
          Log In
        </Link>
        <Link
          to="/signup"
          className="flex items-center justify-center gap-2 rounded-full bg-orange-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-orange-600"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default AuthGate;