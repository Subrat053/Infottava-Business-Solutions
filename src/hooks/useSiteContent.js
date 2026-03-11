import { useState, useEffect } from 'react';
import { getSiteContent } from '../admin2/api';

let cache = null;

/**
 * A hook to fetch and provide all site content.
 * It uses a simple in-memory cache to avoid refetching on every component mount.
 */
export const useSiteContent = () => {
  const [content, setContent] = useState(cache);

  useEffect(() => {
    if (!cache) {
      const siteContent = getSiteContent();
      cache = siteContent;
      setContent(siteContent);
    }
  }, []);

  return content;
};

/**
 * Helper to safely get a value from the content object.
 * 'g' stands for 'get'.
 */
export const g = (content, page, key, defaultValue) => {
  // This function is simple now but can be expanded for i18n, etc.
  return content?.[page]?.[key] ?? defaultValue;
};

/**
 * Helper to safely get a JSON/array value from the content object.
 * 'gj' stands for 'get JSON'.
 */
export const gj = (content, page, key, defaultValue) => {
  return content?.[page]?.[key] ?? defaultValue;
};