import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
    return (
        <>
            <style>{`
        @keyframes archivio-toast-in {
          from { opacity: 0; transform: translateY(-10px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes archivio-toast-out {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to   { opacity: 0; transform: translateY(-10px) scale(0.96); }
        }
        .archivio-toast-in { animation: archivio-toast-in 0.25s ease-out; }
        .archivio-toast-out { animation: archivio-toast-out 0.2s ease-in forwards; }
      `}</style>
            <Toaster
                position="top-right"
                gutter={10}
                toastOptions={{
                    style: { background: "transparent", boxShadow: "none", padding: 0, margin: 0 },
                }}
            />
        </>
    );
}