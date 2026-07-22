import mongoose from "mongoose"
import dns from "node:dns"

// Force a public, SRV-capable DNS resolver so `mongodb+srv://` lookups don't
// fail with `querySrv ECONNREFUSED _mongodb` on hosts whose local resolver
// (systemd-resolved, captive portals, restrictive corp DNS) refuses SRV.
// Override by setting DNS_SERVERS="1.1.1.1,8.8.8.8" in .env if needed.
const dnsServers = (process.env.DNS_SERVERS || "8.8.8.8,1.1.1.1,8.8.4.4")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
dns.setServers(dnsServers)

// Cached across serverless invocations. Without this, every fresh function
// instance calls mongoose.connect() again from scratch — slow (full TLS
// handshake + auth each time) and, under any concurrent traffic, can exhaust
// Atlas's connection limit. `global` persists across warm reuses of the same
// instance, so a cached connection gets reused instead of reconnecting.
let cached = global.mongooseConn
if (!cached) {
    cached = global.mongooseConn = { conn: null, promise: null }
}

export const connectDB = async (uri, { timeoutMs = 15000 } = {}) => {
    if (cached.conn) return cached.conn

    if (!cached.promise) {
        cached.promise = mongoose.connect(uri, {
            serverSelectionTimeoutMS: timeoutMs,
            // Prefer IPv4 — some networks resolve AAAA records that then time out.
            family: 4,
            // Fail fast and loud instead of silently queuing queries for 10s
            // and then throwing the exact "buffering timed out" error you saw.
            bufferCommands: false,
        })
    }

    cached.conn = await cached.promise
    return cached.conn
}

export const disconnectDB = () => mongoose.disconnect()