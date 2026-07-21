import { useState } from "react";
import { Link } from "react-router-dom";
import {
    HiOutlineLockClosed,
    HiOutlineEye,
    HiOutlineEyeOff,
} from "react-icons/hi";
import { Home } from "lucide-react";
import { motion } from "framer-motion";


const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (

        <section className="dm-sans-font h-screen bg-[#FDF1EE] flex items-center justify-center px-6">

            <Link to="/" className="absolute right-10 top-8 flex items-center gap-2 rounded-full border border-white/50 bg-white/20 px-5 py-3 text-sm font-medium text-gray-700 backdrop-blur-xl transition hover:bg-white/30 shadow-lg" >
                <Home size={18} />
                Back Home
            </Link>
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                    duration: 0.3,
                    ease: "easeOut",
                }}
                className=" w-full max-w-md rounded-[28px] bg-white-600 shadow-xl border border-gray-100 p-10">

                {/* Icon */}
                <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-2xl border border-orange-300 flex items-center justify-center">
                        <HiOutlineLockClosed
                            className="text-gray-500"
                            size={38}
                        />
                    </div>
                </div>

                {/* Heading */}

                <div className="text-center mt-6">

                    <h1 className="dm-sans-font text-3xl font-bold text-[#1F2937]">
                        Reset your password
                    </h1>

                    <p className="mt-3 text-gray-500 leading-7">
                        Create a new password to secure your account.
                    </p>

                </div>

                {/* Password */}

                <div className="mt-8">

                    <div className="relative mt-2">

                        <HiOutlineLockClosed
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            size={20}
                        />

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            className="w-full h-14 rounded-xl border border-gray-200 pl-12 pr-12 outline-none focus:border-orange-500"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            {showPassword ? (
                                <HiOutlineEyeOff size={22} />
                            ) : (
                                <HiOutlineEye size={22} />
                            )}
                        </button>

                    </div>

                </div>


                <div className="mt-6">

                    <div className="relative mt-2">

                        <HiOutlineLockClosed
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            size={20}
                        />

                        <input
                            type={showConfirm ? "text" : "password"}
                            placeholder="Confirm new password"
                            className="w-full h-14 rounded-xl border border-gray-200 pl-12 pr-12 outline-none focus:border-orange-500"
                        />

                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            {showConfirm ? (
                                <HiOutlineEyeOff size={22} />
                            ) : (
                                <HiOutlineEye size={22} />
                            )}
                        </button>

                    </div>

                </div>
                {/* Button */}

                <button className="w-full h-14 mt-8 rounded-xl bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-200 cursor-pointer transition text-white font-semibold">
                    Reset Password
                </button>

            </motion.div>

        </section>

    );
};

export default ResetPassword;