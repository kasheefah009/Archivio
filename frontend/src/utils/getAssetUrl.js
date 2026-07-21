const ASSET_BASE_URL = import.meta.env.VITE_ASSET_BASE_URL || "http://localhost:3000";

export function getAssetUrl(path) {
    if (!path) return null;
    if (/^https?:\/\//i.test(path)) return path;
    return `${ASSET_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}