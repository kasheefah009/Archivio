export function getAvatarUrl(seed) {
    if (!seed) return null;
    return `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(seed)}`;
}