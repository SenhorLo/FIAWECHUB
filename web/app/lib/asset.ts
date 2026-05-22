// Prefixes static assets in /public with the deploy base path.
//
// next/link and _next/* bundles get basePath applied automatically, but
// image `src` strings (next/image and plain <img>) do NOT — so anything
// pointing at /public must go through here to work on GitHub Pages, where
// the site is served from /FIAWECHUB. In dev the prefix is empty.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string): string => `${BASE_PATH}${path}`;
