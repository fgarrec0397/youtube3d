/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

// const withPWA = require("@granity/next-pwa")({
//     dest: "public",
//     buildExcludes: [/app-build-manifest\.json/],
// });

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        appDir: true,
        transpilePackages: [
            "@granity/engine",
            "@granity/eslint-config",
            "@granity/helpers",
            "@granity/prettier-config",
            "@granity/three",
            "@granity/ui",
            "@granity/widgets",
            "@react-three/drei",
            "@mui/material",
        ],
    },
    async rewrites() {
        return [
            {
                source: "/server/:path*",
                destination: "http://localhost:5001/:path*",
            },
            {
                source: "/assets/:path*",
                destination: "http://localhost:3000/assets/:path*",
            },
        ];
    },
};

module.exports = withBundleAnalyzer(nextConfig);
