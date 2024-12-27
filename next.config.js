/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    loader: 'custom',
    loaderFile: './src/utils/imageLoader.ts',
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // 静态资源配置
  assetPrefix: process.env.NODE_ENV === 'production' ? '.' : '',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|mp4|webm|avif|webp)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name][ext]'
      }
    });

    return config;
  },
  // 基础路径配置
  basePath: '',
  trailingSlash: true,
}

module.exports = nextConfig 