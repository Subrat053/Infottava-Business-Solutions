import { useState, useEffect } from "react";

const API = "http://localhost:5000";

// Module-level cache so all components share one fetch
let _cache = null;
let _pending = null;

export function useSiteContent() {
  const [content, setContent] = useState(_cache || {});

  useEffect(() => {
    if (_cache) {
      setContent(_cache);
      return;
    }
    if (!_pending) {
      _pending = fetch(`${API}/api/admin/content/public`)
        .then((r) => r.json())
        .then((data) => {
          _cache = data.success ? data.data : {};
          return _cache;
        })
        .catch(() => ({}));
    }
    _pending.then((data) => setContent(data || {}));
  }, []);

  return content;
}

/** Get a string value, falling back to `fallback` if not in DB */
export const g = (c, section, key, fallback = "") => {
  const v = c?.[section]?.[key];
  return v !== undefined && v !== null && v !== "" ? String(v) : fallback;
};

/** Get a JSON array/object, falling back to `fallback` if not in DB or parse error */
export const gj = (c, section, key, fallback = []) => {
  const v = c?.[section]?.[key];
  if (!v) return fallback;
  if (typeof v === "object") return v;
  try {
    return JSON.parse(v);
  } catch {
    return fallback;
  }
};

/** Invalidate the cache so next useSiteContent() call re-fetches */
export const invalidateContentCache = () => {
  _cache = null;
  _pending = null;
};
