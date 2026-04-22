// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                port: '',
                pathname: '/v0/b/seo-agency-786.firebasestorage.app/o/**',
            },
            {
                protocol: 'https',
                hostname: 'ik.imagekit.io',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '**.cloudinary.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
                pathname: '/**',
            },
        ],
        // For development, you can also allow all domains temporarily
        // uncomment the line below for testing only
        // domains: ['firebasestorage.googleapis.com', 'ik.imagekit.io'],
    },
    reactStrictMode: true,
}

module.exports = nextConfig