const RAW_SITE_URL = import.meta.env.VITE_SITE_URL || "https://infotattvabusinesssolutions.com";

export const SITE_URL = RAW_SITE_URL.replace(/\/+$/, "");
export const BRAND_NAME = "Infottava Business Solutions";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;

export function buildCanonicalUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}
