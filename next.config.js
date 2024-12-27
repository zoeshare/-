/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
    loader: 'custom',
    path: './',
  },
  // 确保资源在正确的基础路径下
  basePath: '',
  assetPrefix: process.env.NODE_ENV === 'production' ? './' : '',
  // 允许视频文件
  webpack: (config) => {
    // 修改图片和媒体文件的输出路径
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|mp4|webm)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name][ext]',
        publicPath: './'
      }
    });

    // 确保 publicPath 正确
    config.output = {
      ...config.output,
      publicPath: './',
      assetModuleFilename: 'static/media/[name][ext]'
    };

    return config;
  },
  // 禁用实验性功能
  experimental: {
    images: {
      unoptimized: true,
    },
  },
}

module.exports = nextConfig 