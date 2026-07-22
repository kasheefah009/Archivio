import express from "express"
import userRoute from "./routes/userRoute.js"
import { connectDB } from "./config/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

const allowedOrigins = [
    "http://localhost:5173",
    "https://archivio-tan.vercel.app",
]

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use(async (req, res, next) => {
    const uri = process.env.MONGODB_URI
    if (!uri || uri.includes("<db_password>")) {
        console.error("MONGODB_URI is missing or still contains <db_password> placeholder. Update .env and retry.")
        return res.status(500).json({ message: "Server misconfigured — database URI missing." })
    }
    try {
        await connectDB(uri)
        next()
    } catch (err) {
        console.error("MongoDB connection failed:", err.message)
        return res.status(503).json({ message: "Database connection failed. Please try again." })
    }
})

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Archivio API, designed for Archivio users" });
});
app.use("/api", userRoute)

if (!process.env.VERCEL) {
    const uri = process.env.MONGODB_URI
    if (uri && !uri.includes("<db_password>")) {
        connectDB(uri)
            .then(() => console.log("MongoDB connected"))
            .catch((err) => console.error("MongoDB connection failed:", err.message))
    }

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })
}

export default app