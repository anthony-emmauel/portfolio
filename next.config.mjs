/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // v2 slugs → v2.3 slugs (match the Figma breadcrumbs)
    return [
      { source: "/work/system-one", destination: "/work/systemone", permanent: true },
      { source: "/work/onecart-redesign", destination: "/work/onecart", permanent: true },
    ];
  },
};

export default nextConfig;
