import loader from "../assets/loading.svg";

const Loader = () => {
    return (
        <div className="fixed inset-0 overflow-hidden bg-gradient-to-br bg-[#141210] from-orange-50 via-white to-amber-50 flex items-center justify-center z-50">
            <div className="absolute top-28 left-16 w-7 h-7 rounded-full bg-orange-400/60 blur-sm animate-pulse" />
            <div className="absolute bottom-24 right-16 w-7 h-7 rounded-full bg-amber-400/60 blur-sm animate-pulse" />

            <div className="fixed inset-0 flex items-center justify-center shadow-2xl z-50">

                {/* <img
                    src={loader}
                    alt="Loading"
                    className="w-50 h-50 mx-auto"
                />
            </div> */}
                <div className="flex justify-center gap-3 mt-8">
                    <span className="w-5 h-5 rounded-full bg-orange-500 animate-bounce" />
                    <span
                        className="w-5 h-5 rounded-full bg-orange-300 animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                    />

                    <span
                        className="w-5 h-5 rounded-full bg-orange-200 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                    />

                    <span
                        className="w-5 h-5 rounded-full bg-orange-100 animate-bounce"
                        style={{ animationDelay: "0.3s" }}
                    />

                    <span
                        className="w-5 h-5 rounded-full bg-orange-50 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                    />
                </div>
            </div>
        </div>
    );

};

export default Loader;

