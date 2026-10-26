/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    // v2 slugs → v2.3 slugs (match the Figma breadcrumbs)
    return [
      { source: "/work/system-one", destination: "/work/systemone", permanent: true },
      { source: "/work/onecart-redesign", destination: "/work/onecart", permanent: true },
      // Previous CV filename (shared links keep working)
      { source: "/resume/Emmanuel%20Anthony%20CVpdf.pdf", destination: "/resume/Emmanuel-Anthony-CV.pdf", permanent: true },
    ];
  },
};

export default nextConfig;
