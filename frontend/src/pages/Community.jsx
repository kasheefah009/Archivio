import { useState, useRef, useEffect }from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Users, Home as HomeIcon } from "lucide-react";

function Reveal({ children, delay = 0, className = "" }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    io.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-500 ease-out ${className}`}
            style={{
                transitionDelay: `${delay}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(14px)",
            }}
        >
            {children}
        </div>
    );
}
export default function Community() {
  return (
    <div className="archivio-page flex min-h-screen w-full flex-col bg-[#100e0c] text-stone-100">
      <style>{`
        .archivio-page { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .archivio-page .font-serif { font-family: 'Fraunces', ui-serif, Georgia, serif; }
      `}</style>

      <Navbar active="Explore" />
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
       < Reveal>
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-orange-700/15 text-orange-500">
          <Users size={24} />
        </div>
        </Reveal>
        <Reveal>
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-orange-500">
          Coming Soon
        </p>
        <h1 className="font-serif text-4xl text-stone-50 sm:text-5xl">
          Community is on its way
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-stone-400">
          We're still building this part of Archivio. A place to meet
          architects, share your work, and talk shop. Check back soon.
        </p>
        </Reveal>
        <Reveal>
        <Link
          to="/"
          className="mt-9 flex items-center gap-2 rounded-full border border-stone-700 px-6 py-3 text-sm text-stone-200 transition hover:border-stone-500"
        >
          <HomeIcon size={15} /> Back Home
        </Link>
        </Reveal>
      </div>
    </div>
  );
}