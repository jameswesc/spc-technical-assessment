/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'phpstack-454602-4173726.cloudwaysapps.com',
                port: '',
                pathname: '/sites/default/files/**',
            },
        ],
    },
}

export default nextConfig
