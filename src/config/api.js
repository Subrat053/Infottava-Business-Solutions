const isLocalHost =
  typeof window !== "undefined" &&
  /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname);

const rawApiBase = (import.meta.env.VITE_API_URL || "").trim();

// Keep local development working even if VITE_API_URL is not set.
export const API_BASE_URL = (rawApiBase || (isLocalHost ? "http://localhost:5000" : "")).replace(/\/+$/, "");

export const apiUrl = (path) => {
  if (!path) return API_BASE_URL || "";
  if (/^https?:\/\//i.test(path)) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return API_BASE_URL ? `${API_BASE_URL}${normalizedPath}` : normalizedPath;
};