const isAbsoluteUrl = (url: string) => /^https?:\/\//i.test(url);

const deriveBaseFromLocation = () => {
  if (typeof window === 'undefined') return '/';
  const [first] = window.location.pathname.split('/').filter(Boolean);
  return first ? `/${first}` : '/';
};

/**
 * Возвращает ссылку на ассет с учетом базового пути (gh-pages подпапка).
 * Абсолютные URL возвращаются как есть.
 */
export const getAssetUrl = (path: string): string => {
  if (!path) return path;
  if (isAbsoluteUrl(path)) return path;

  const normalizedPath = path.replace(/^\//, '');
  const base =
    import.meta?.env?.BASE_URL && import.meta.env.BASE_URL !== '/'
      ? import.meta.env.BASE_URL
      : deriveBaseFromLocation();

  return `${base.replace(/\/$/, '')}/${normalizedPath}`;
};
