import type { NextConfig } from "next";

// GitHub Pages serves this project from /FIAWECHUB (project page).
// basePath is inlined at build time, so we only apply it for production
// builds and keep `next dev` running at the root locally.
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/FIAWECHUB" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Expose the prefix to the client so static asset URLs (e.g. images
  // referenced by string) can be built correctly under the sub-path.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  devIndicators: false,
  images: {
    // Next.js image optimization needs a server; GitHub Pages is static-only.
    unoptimized: true,
  },
};

export default nextConfig;
