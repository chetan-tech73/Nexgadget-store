/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
        ],
    },
    experimental: {
        optimizeCss: false,
        optimizePackageImports: [],
    },
};

export default nextConfig;
